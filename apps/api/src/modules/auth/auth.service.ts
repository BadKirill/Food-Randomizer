import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../../prisma/prisma.service';

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = {
  email: string;
  password: string;
};

const SESSION_TTL_DAYS = 30;

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: RegisterInput) {
    const email = input.email.trim().toLowerCase();
    const passwordHash = this.hashPassword(input.password);
    let user: { id: string; email: string | null };
    try {
      user = await this.prisma.user.create({
        data: {
          email,
          passwordHash,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('User with this email already exists. Please login.');
      }
      throw error;
    }
    return this.createSessionForUser(user.id, user.email ?? null);
  }

  async login(input: LoginInput) {
    const email = input.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordOk = this.verifyPassword(input.password, user.passwordHash);
    if (!passwordOk) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.createSessionForUser(user.id, user.email ?? null);
  }

  async revokeSession(sessionId: string) {
    await this.prisma.userSession.updateMany({
      where: {
        id: sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return { ok: true };
  }

  private async createSessionForUser(userId: string, email: string | null) {
    const token = randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(token);
    const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

    await this.prisma.userSession.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });

    return {
      token,
      user: {
        id: userId,
        email,
      },
      expiresAt: expiresAt.toISOString(),
    };
  }

  async getSessionFromBearerHeader(authorizationHeader?: string) {
    if (!authorizationHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const token = authorizationHeader.slice('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const tokenHash = this.hashToken(token);
    const session = await this.prisma.userSession.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    return session;
  }

  private hashToken(token: string): string {
    const sessionSecret = process.env.SESSION_SECRET ?? 'dev-session-secret-change-me';
    return createHash('sha256').update(`${sessionSecret}:${token}`).digest('hex');
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, passwordHash: string): boolean {
    const [salt, storedHash] = passwordHash.split(':');
    if (!salt || !storedHash) {
      return false;
    }
    const computedHash = scryptSync(password, salt, 64);
    const stored = Buffer.from(storedHash, 'hex');
    if (stored.length !== computedHash.length) {
      return false;
    }
    return timingSafeEqual(stored, computedHash);
  }
}
