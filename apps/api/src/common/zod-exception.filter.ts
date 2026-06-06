import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { ZodError } from 'zod';

type ZodLikeError = {
  issues: Array<{ path: PropertyKey[]; message: string }>;
};

function isZodLikeError(exception: unknown): exception is ZodLikeError {
  return (
    exception instanceof ZodError ||
    (typeof exception === 'object' &&
      exception !== null &&
      Array.isArray((exception as { issues?: unknown }).issues))
  );
}

@Catch()
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (isZodLikeError(exception)) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Validation failed',
        message: 'Please check the submitted fields.',
        details: exception.issues.map((issue) => ({
          field: issue.path.map(String).join('.') || 'request',
          message: issue.message,
        })),
      });
      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const payload = exception.getResponse();
      const message =
        typeof payload === 'string'
          ? payload
          : Array.isArray((payload as { message?: unknown }).message)
            ? (payload as { message: string[] }).message.join(', ')
            : String(
                (payload as { message?: unknown }).message ?? exception.message,
              );

      response.status(statusCode).json({
        statusCode,
        error: HttpStatus[statusCode] ?? 'Request failed',
        message,
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.',
    });
  }
}
