import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export type AuthUser = {
  id: string;
  email: string | null;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<{ authUser?: AuthUser }>();
    if (!request.authUser) {
      throw new UnauthorizedException('Missing authenticated user');
    }
    return request.authUser;
  },
);

