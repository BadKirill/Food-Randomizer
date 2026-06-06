import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

type AttemptBucket = { count: number; resetAt: number };

@Injectable()
export class AuthRateLimitGuard implements CanActivate {
  private readonly attempts = new Map<string, AttemptBucket>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.path.endsWith('/register') ? 'register' : 'login';
    const limit =
      path === 'register'
        ? this.readLimit('AUTH_REGISTER_RATE_LIMIT', 5)
        : this.readLimit('AUTH_LOGIN_RATE_LIMIT', 10);
    const windowMs = this.readLimit(
      'AUTH_RATE_LIMIT_WINDOW_MS',
      15 * 60 * 1000,
    );
    const key = `${path}:${request.ip ?? request.socket.remoteAddress ?? 'unknown'}`;
    const now = Date.now();
    const bucket = this.attempts.get(key);

    if (!bucket || bucket.resetAt <= now) {
      this.pruneExpiredBuckets(now);
      this.attempts.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (bucket.count >= limit) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((bucket.resetAt - now) / 1000),
      );
      throw new HttpException(
        `Too many ${path} attempts. Please try again in ${retryAfterSeconds} seconds.`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    bucket.count += 1;
    return true;
  }

  private readLimit(name: string, fallback: number): number {
    const value = Number(process.env[name] ?? fallback);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }

  private pruneExpiredBuckets(now: number) {
    if (this.attempts.size < 1_000) return;
    for (const [key, bucket] of this.attempts) {
      if (bucket.resetAt <= now) this.attempts.delete(key);
    }
  }
}
