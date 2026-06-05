import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const CurrentSessionId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{ authSessionId?: string }>();
    if (!request.authSessionId) {
      throw new UnauthorizedException('Missing authenticated session');
    }
    return request.authSessionId;
  },
);
