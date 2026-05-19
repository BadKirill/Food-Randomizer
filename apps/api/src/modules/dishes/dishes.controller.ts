import { z } from 'zod';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WriteTokenGuard } from '../../common/write-token.guard';
import { DishesRepository } from './dishes.repository';

const CreateDishRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).optional(),
  createdBy: z.string().min(1).optional(),
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

  @Post()
  @UseGuards(WriteTokenGuard)
  async create(@Body() body: unknown) {
    const parsed = CreateDishRequestSchema.parse(body);
    const dish = await this.dishesRepository.createDish(parsed);
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
  @UseGuards(WriteTokenGuard)
  async update(
    @Param('dishId') dishId: string,
    @Body() body: unknown,
  ) {
    const parsed = UpdateDishRequestSchema.parse(body);
    const dish = await this.dishesRepository.updateDish(dishId, {
      ...parsed,
      description: parsed.description ?? null,
    });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return this.mapDishDetail(dish);
  }

  @Delete(':dishId')
  @HttpCode(200)
  @UseGuards(WriteTokenGuard)
  async archive(@Param('dishId') dishId: string) {
    const archived = await this.dishesRepository.archiveDish(dishId);
    if (!archived) {
      throw new NotFoundException('Dish not found');
    }
    return {
      id: archived.id,
      archivedAt: archived.archivedAt,
    };
  }

  @Post(':dishId/unarchive')
  @HttpCode(200)
  @UseGuards(WriteTokenGuard)
  async unarchive(@Param('dishId') dishId: string) {
    const unarchived = await this.dishesRepository.unarchiveDish(dishId);
    if (!unarchived) {
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
