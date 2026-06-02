import { z } from 'zod';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/auth.guard';
import { CurrentUser, type AuthUser } from '../../common/current-user.decorator';
import { DishesRepository } from './dishes.repository';

const CreateDishRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).optional(),
  ingredients: z.array(z.string().min(1)).min(1),
  steps: z.array(z.string().min(1)).min(1),
  addOnOptions: z.array(z.string().min(1)).default([]),
});

const UpdateDishRequestSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).optional(),
  ingredients: z.array(z.string().min(1)).optional(),
  steps: z.array(z.string().min(1)).optional(),
  addOnOptions: z.array(z.string().min(1)).optional(),
});

const ListDishesQuerySchema = z.object({
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).optional(),
  archived: z.enum(['active', 'archived', 'all']).default('active'),
});

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesRepository: DishesRepository) {}

  private static readonly OWNER_ONLY_MESSAGE =
    'Only the creator can edit or archive this dish';

  @Post()
  @UseGuards(AuthGuard)
  async create(@CurrentUser() user: AuthUser, @Body() body: unknown) {
    const parsed = CreateDishRequestSchema.parse(body);
    const dish = await this.dishesRepository.createDish({
      ...parsed,
      createdById: user.id,
      createdBy: user.email ?? user.id,
    });
    return this.mapDishDetail(dish);
  }

  @Get()
  async list(@Query() query: unknown) {
    const parsed = ListDishesQuerySchema.parse(query);
    return this.dishesRepository.listApprovedBasic(parsed.dishType, parsed.archived);
  }

  @Get(':dishId')
  async getById(@Param('dishId') dishId: string) {
    const dish = await this.dishesRepository.findApprovedById(dishId);
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return this.mapDishDetail(dish);
  }

  @Patch(':dishId')
  @UseGuards(AuthGuard)
  async update(
    @CurrentUser() user: AuthUser,
    @Param('dishId') dishId: string,
    @Body() body: unknown,
  ) {
    const parsed = UpdateDishRequestSchema.parse(body);
    const dish = await this.dishesRepository.updateDish(dishId, user.id, {
      ...parsed,
      description: parsed.description ?? null,
    });
    if (!dish) {
      const existing = await this.dishesRepository.findApprovedByIdAnyArchive(dishId);
      if (!existing) {
        throw new NotFoundException('Dish not found');
      }
      throw new ForbiddenException(DishesController.OWNER_ONLY_MESSAGE);
    }
    return this.mapDishDetail(dish);
  }

  @Delete(':dishId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async archive(@CurrentUser() user: AuthUser, @Param('dishId') dishId: string) {
    const archived = await this.dishesRepository.archiveDish(dishId, user.id);
    if (!archived) {
      const existing = await this.dishesRepository.findApprovedByIdAnyArchive(dishId);
      if (!existing) {
        throw new NotFoundException('Dish not found');
      }
      throw new ForbiddenException(DishesController.OWNER_ONLY_MESSAGE);
    }
    return {
      id: archived.id,
      archivedAt: archived.archivedAt,
    };
  }

  @Post(':dishId/unarchive')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async unarchive(@CurrentUser() user: AuthUser, @Param('dishId') dishId: string) {
    const unarchived = await this.dishesRepository.unarchiveDish(dishId, user.id);
    if (!unarchived) {
      const existing = await this.dishesRepository.findApprovedByIdAnyArchive(dishId);
      if (!existing) {
        throw new NotFoundException('Dish not found');
      }
      if (!existing.createdById || existing.createdById !== user.id) {
        throw new ForbiddenException(DishesController.OWNER_ONLY_MESSAGE);
      }
      throw new NotFoundException('Dish not found');
    }
    return {
      id: unarchived.id,
      archivedAt: unarchived.archivedAt,
    };
  }

  private mapDishDetail(dish: Awaited<ReturnType<DishesRepository['createDish']>>) {
    return {
      id: dish.id,
      name: dish.name,
      description: dish.description,
      dishType: dish.dishType,
      createdById: dish.createdById,
      createdBy: dish.createdBy,
      archivedAt: dish.archivedAt,
      ingredients: dish.ingredients.map((i) => ({
        name: i.name,
        amount: i.amount,
        unit: i.unit,
        optional: i.optional,
      })),
      steps: dish.steps.map((s) => s.text),
      addOnGroups: dish.addGroups.map((g) => ({
        groupKey: g.groupKey,
        options: g.options.map((o) => o.value),
      })),
    };
  }
}
