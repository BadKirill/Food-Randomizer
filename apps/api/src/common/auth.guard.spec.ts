import type { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const getSessionFromBearerHeader = jest.fn();
  const authServiceMock = { getSessionFromBearerHeader } as any;

  const buildContext = (authorization?: string) => {
    const request: any = {
      headers: { authorization },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;

    return { context, request };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('attaches authUser and authSessionId to request', async () => {
    getSessionFromBearerHeader.mockResolvedValue({
      id: 'session-1',
      user: { id: 'user-1', email: 'u@food.app' },
    });

    const guard = new AuthGuard(authServiceMock);
    const { context, request } = buildContext('Bearer token-1');

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(getSessionFromBearerHeader).toHaveBeenCalledWith('Bearer token-1');
    expect(request.authUser).toEqual({ id: 'user-1', email: 'u@food.app' });
    expect(request.authSessionId).toBe('session-1');
  });
});
