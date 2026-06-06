import { HttpException } from '@nestjs/common';
import { AuthRateLimitGuard } from './auth-rate-limit.guard';

describe('AuthRateLimitGuard', () => {
  const originalLimit = process.env.AUTH_LOGIN_RATE_LIMIT;

  afterAll(() => {
    process.env.AUTH_LOGIN_RATE_LIMIT = originalLimit;
  });

  it('blocks repeated login attempts from the same IP', () => {
    process.env.AUTH_LOGIN_RATE_LIMIT = '2';
    const guard = new AuthRateLimitGuard();
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          path: '/auth/login',
          ip: '127.0.0.1',
          socket: {},
        }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
    expect(guard.canActivate(context)).toBe(true);
    expect(() => guard.canActivate(context)).toThrow(HttpException);
  });
});
