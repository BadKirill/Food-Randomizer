import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async ensureUser(userId: string) {
    await this.prisma.user.upsert({
      where: { id: userId },
      create: { id: userId },
      update: {},
    });
  }

  async getRecentSelections(userId: string, limit: number) {
    return this.prisma.dishHistory.findMany({
      where: { userId },
      orderBy: { shownAt: 'desc' },
      take: limit,
      select: {
        dishId: true,
        clickIdx: true,
      },
    });
  }

  async getNextClickIndex(userId: string) {
    const latest = await this.prisma.dishHistory.findFirst({
      where: { userId },
      orderBy: { clickIdx: 'desc' },
      select: { clickIdx: true },
    });

    return (latest?.clickIdx ?? 0) + 1;
  }

  async addSelection(params: { userId: string; dishId: string; clickIdx: number }) {
    return this.prisma.dishHistory.create({
      data: {
        userId: params.userId,
        dishId: params.dishId,
        clickIdx: params.clickIdx,
      },
    });
  }
}
