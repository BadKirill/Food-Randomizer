import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './common/auth.guard';
import { RequestLoggerMiddleware } from './common/request-logger.middleware';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { HealthController } from './modules/health/health.controller';
import { RandomizerController } from './modules/randomizer/randomizer.controller';
import { RandomizerService } from './modules/randomizer/randomizer.service';
import { DishesController } from './modules/dishes/dishes.controller';
import { DishesRepository } from './modules/dishes/dishes.repository';
import { HistoryRepository } from './modules/history/history.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    HealthController,
    RandomizerController,
    DishesController,
  ],
  providers: [
    AppService,
    PrismaService,
    DishesRepository,
    HistoryRepository,
    RandomizerService,
    AuthService,
    AuthGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
