import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const userCreate = jest.fn();
  const userFindUnique = jest.fn();
  const userSessionCreate = jest.fn();
  const userSessionFindUnique = jest.fn();

  const prismaMock = {
    user: {
      create: userCreate,
      findUnique: userFindUnique,
    },
    userSession: {
      create: userSessionCreate,
      findUnique: userSessionFindUnique,
    },
  } as any;

  const originalSecret = process.env.SESSION_SECRET;
  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SESSION_SECRET = 'test-session-secret';
    service = new AuthService(prismaMock);
  });

  afterAll(() => {
    process.env.SESSION_SECRET = originalSecret;
  });

  it('register creates lowercase email user and returns session token', async () => {
    userCreate.mockResolvedValue({ id: 'u-1', email: 'test@food.app' });
    userSessionCreate.mockResolvedValue({ id: 's-1' });

    const result = await service.register({
      email: '  TEST@Food.App ',
      password: 'supersecure123',
    });

    expect(userCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: 'test@food.app',
          passwordHash: expect.any(String),
        }),
      }),
    );
    expect(result.user.id).toBe('u-1');
    expect(result.token).toEqual(expect.any(String));
    expect(result.expiresAt).toEqual(expect.any(String));
  });

  it('login rejects invalid credentials', async () => {
    userFindUnique.mockResolvedValue(null);

    await expect(
      service.login({ email: 'none@food.app', password: 'badpass123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('register returns readable conflict for existing email', async () => {
    userCreate.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: 'test',
      }),
    );

    await expect(
      service.register({ email: 'test@food.app', password: 'password123' }),
    ).rejects.toThrow(ConflictException);
  });

  it('getSessionFromBearerHeader rejects missing bearer token', async () => {
    await expect(service.getSessionFromBearerHeader(undefined)).rejects.toThrow(
      'Missing bearer token',
    );

    await expect(service.getSessionFromBearerHeader('Basic abc')).rejects.toThrow(
      'Missing bearer token',
    );
  });

  it('getSessionFromBearerHeader rejects unknown, revoked, and expired sessions', async () => {
    userSessionFindUnique.mockResolvedValueOnce(null);
    await expect(service.getSessionFromBearerHeader('Bearer unknown-token')).rejects.toThrow(
      'Invalid or expired session',
    );

    userSessionFindUnique.mockResolvedValueOnce({
      id: 's-revoked',
      revokedAt: new Date(),
      expiresAt: new Date(Date.now() + 60_000),
      user: { id: 'u-1', email: 'test@food.app' },
    });
    await expect(service.getSessionFromBearerHeader('Bearer revoked-token')).rejects.toThrow(
      'Invalid or expired session',
    );

    userSessionFindUnique.mockResolvedValueOnce({
      id: 's-expired',
      revokedAt: null,
      expiresAt: new Date(Date.now() - 60_000),
      user: { id: 'u-1', email: 'test@food.app' },
    });
    await expect(service.getSessionFromBearerHeader('Bearer expired-token')).rejects.toThrow(
      'Invalid or expired session',
    );
  });

  it('getSessionFromBearerHeader returns active session', async () => {
    const activeSession = {
      id: 's-active',
      revokedAt: null,
      expiresAt: new Date(Date.now() + 60_000),
      user: { id: 'u-1', email: 'test@food.app' },
    };
    userSessionFindUnique.mockResolvedValue(activeSession);

    await expect(service.getSessionFromBearerHeader('Bearer active-token')).resolves.toEqual(
      activeSession,
    );
  });
});
