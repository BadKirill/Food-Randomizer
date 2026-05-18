import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export type DishWithRelations = Awaited<
  ReturnType<DishesRepository['findApprovedWithRelations']>
>[number];

@Injectable()
export class DishesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findApprovedWithRelations() {
    return this.prisma.dish.findMany({
      where: { status: 'approved' },
      include: {
        ingredients: true,
        steps: {
          orderBy: { position: 'asc' },
        },
        addGroups: {
          include: {
            options: true,
          },
        },
      },
    });
  }
}
