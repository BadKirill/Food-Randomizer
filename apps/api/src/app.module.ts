import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggerMiddleware } from './common/request-logger.middleware';
import { HealthController } from './modules/health/health.controller';
import { RandomizerController } from './modules/randomizer/randomizer.controller';
import { RandomizerService } from './modules/randomizer/randomizer.service';
import { DishesRepository } from './modules/dishes/dishes.repository';
import { HistoryRepository } from './modules/history/history.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, HealthController, RandomizerController],
  providers: [
    AppService,
    PrismaService,
    DishesRepository,
    HistoryRepository,
    RandomizerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
