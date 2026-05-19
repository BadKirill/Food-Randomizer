import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class WriteTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const configuredToken = process.env.DISHES_WRITE_TOKEN;
    if (!configuredToken) {
      throw new InternalServerErrorException(
        'DISHES_WRITE_TOKEN is not configured',
      );
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers.authorization;
    const tokenFromHeader = authorizationHeader?.startsWith('Bearer ')
      ? authorizationHeader.slice('Bearer '.length).trim()
      : undefined;

    if (!tokenFromHeader || tokenFromHeader !== configuredToken) {
      throw new UnauthorizedException('Invalid write token');
    }

    return true;
  }
}
