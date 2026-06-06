import { ArgumentsHost } from '@nestjs/common';
import { z } from 'zod';
import { ZodExceptionFilter } from './zod-exception.filter';

describe('ZodExceptionFilter', () => {
  it('returns readable validation details', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const host = {
      switchToHttp: () => ({ getResponse: () => ({ status }) }),
    } as unknown as ArgumentsHost;
    const error = z
      .object({ email: z.string().email() })
      .safeParse({ email: 'bad' }).error;

    new ZodExceptionFilter().catch(error, host);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Validation failed',
        message: 'Please check the submitted fields.',
        details: [expect.objectContaining({ field: 'email' })],
      }),
    );
  });

  it('recognizes Zod-like errors from shared package copies', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const host = {
      switchToHttp: () => ({ getResponse: () => ({ status }) }),
    } as unknown as ArgumentsHost;

    new ZodExceptionFilter().catch(
      { issues: [{ path: ['cooldownClicks'], message: 'Must be at least 1' }] },
      host,
    );

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        details: [{ field: 'cooldownClicks', message: 'Must be at least 1' }],
      }),
    );
  });
});
