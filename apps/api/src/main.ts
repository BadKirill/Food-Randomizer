import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function parseCorsOrigins(value?: string): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function assertRequiredEnv() {
  const requiredVars = ['DATABASE_URL'];
  const missing = requiredVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }

  const writeToken = process.env.DISHES_WRITE_TOKEN?.trim();
  if (!writeToken) {
    throw new Error('DISHES_WRITE_TOKEN must be set');
  }
  if (
    writeToken === 'REPLACE_WITH_STRONG_SECRET_TOKEN' ||
    writeToken === 'dev-write-token-change-me'
  ) {
    throw new Error('DISHES_WRITE_TOKEN is using an insecure placeholder value');
  }
}

async function bootstrap() {
  assertRequiredEnv();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const origins = parseCorsOrigins(process.env.CORS_ORIGINS);
  app.enableCors({
    origin: origins.length > 0 ? origins : true,
    credentials: true,
  });

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
  logger.log(`API listening on port ${port}`);
}

bootstrap();
