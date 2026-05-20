import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: { authorization?: string };
      authUser?: { id: string; email: string | null };
      authSessionId?: string;
    }>();

    const session = await this.authService.getSessionFromBearerHeader(
      request.headers.authorization,
    );
    request.authUser = {
      id: session.user.id,
      email: session.user.email ?? null,
    };
    request.authSessionId = session.id;
    return true;
  }
}

