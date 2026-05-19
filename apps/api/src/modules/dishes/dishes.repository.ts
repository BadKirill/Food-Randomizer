import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export type DishWithRelations = Awaited<
  ReturnType<DishesRepository['findApprovedWithRelations']>
>[number];

@Injectable()
export class DishesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findApprovedWithRelations(dishType?: 'usual' | 'vegetarian' | 'vegan') {
    return this.prisma.dish.findMany({
      where: {
        status: 'approved',
        archivedAt: null,
        dishType: dishType ?? undefined,
      },
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

  async listApprovedBasic(dishType?: 'usual' | 'vegetarian' | 'vegan') {
    return this.prisma.dish.findMany({
      where: {
        status: 'approved',
        archivedAt: null,
        dishType: dishType ?? undefined,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        dishType: true,
        createdAt: true,
      },
    });
  }

  async findApprovedById(dishId: string) {
    return this.prisma.dish.findFirst({
      where: {
        id: dishId,
        status: 'approved',
        archivedAt: null,
      },
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

  async createDish(input: {
    name: string;
    description?: string;
    ingredients: string[];
    steps: string[];
    addOnOptions: string[];
    dishType?: 'usual' | 'vegetarian' | 'vegan';
    createdBy?: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const dish = await tx.dish.create({
        data: {
          name: input.name,
          description: input.description,
          source: 'manual',
          dishType: input.dishType ?? 'usual',
          status: 'approved',
          createdBy: input.createdBy ?? 'community',
        },
      });

      if (input.ingredients.length > 0) {
        await tx.dishIngredient.createMany({
          data: input.ingredients.map((name) => ({
            dishId: dish.id,
            name,
          })),
        });
      }

      if (input.steps.length > 0) {
        await tx.dishStep.createMany({
          data: input.steps.map((text, i) => ({
            dishId: dish.id,
            position: i + 1,
            text,
          })),
        });
      }

      if (input.addOnOptions.length > 0) {
        const group = await tx.dishAddOptionGroup.create({
          data: {
            dishId: dish.id,
            groupKey: 'can_add',
            label: 'Can add',
          },
        });

        await tx.dishAddOption.createMany({
          data: input.addOnOptions.map((value) => ({
            groupId: group.id,
            value,
          })),
        });
      }

      return tx.dish.findUniqueOrThrow({
        where: { id: dish.id },
        include: {
          ingredients: true,
          steps: { orderBy: { position: 'asc' } },
          addGroups: { include: { options: true } },
        },
      });
    });
  }

  async updateDish(
    dishId: string,
    input: {
      name?: string;
      description?: string | null;
      dishType?: 'usual' | 'vegetarian' | 'vegan';
      ingredients?: string[];
      steps?: string[];
      addOnOptions?: string[];
    },
  ) {
    const existing = await this.findApprovedById(dishId);
    if (!existing) {
      return null;
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.dish.update({
        where: { id: dishId },
        data: {
          name: input.name,
          description: input.description,
          dishType: input.dishType,
        },
      });

      if (input.ingredients) {
        await tx.dishIngredient.deleteMany({ where: { dishId } });
        if (input.ingredients.length > 0) {
          await tx.dishIngredient.createMany({
            data: input.ingredients.map((name) => ({ dishId, name })),
          });
        }
      }

      if (input.steps) {
        await tx.dishStep.deleteMany({ where: { dishId } });
        if (input.steps.length > 0) {
          await tx.dishStep.createMany({
            data: input.steps.map((text, i) => ({
              dishId,
              position: i + 1,
              text,
            })),
          });
        }
      }

      if (input.addOnOptions) {
        await tx.dishAddOption.deleteMany({
          where: { group: { dishId } },
        });
        await tx.dishAddOptionGroup.deleteMany({ where: { dishId } });
        if (input.addOnOptions.length > 0) {
          const group = await tx.dishAddOptionGroup.create({
            data: {
              dishId,
              groupKey: 'can_add',
              label: 'Can add',
            },
          });
          await tx.dishAddOption.createMany({
            data: input.addOnOptions.map((value) => ({
              groupId: group.id,
              value,
            })),
          });
        }
      }

      return tx.dish.findUniqueOrThrow({
        where: { id: dishId },
        include: {
          ingredients: true,
          steps: { orderBy: { position: 'asc' } },
          addGroups: { include: { options: true } },
        },
      });
    });
  }

  async archiveDish(dishId: string) {
    const existing = await this.findApprovedById(dishId);
    if (!existing) {
      return null;
    }

    return this.prisma.dish.update({
      where: { id: dishId },
      data: { archivedAt: new Date() },
      select: {
        id: true,
        archivedAt: true,
      },
    });
  }
}
