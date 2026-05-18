import { z } from 'zod';
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DishesRepository } from './dishes.repository';

const CreateDishRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  ingredients: z.array(z.string().min(1)).min(1),
  steps: z.array(z.string().min(1)).min(1),
  addOnOptions: z.array(z.string().min(1)).default([]),
});

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesRepository: DishesRepository) {}

  @Post()
  async create(@Body() body: unknown) {
    const parsed = CreateDishRequestSchema.parse(body);
    const dish = await this.dishesRepository.createDish(parsed);
    return this.mapDishDetail(dish);
  }

  @Get()
  async list() {
    return this.dishesRepository.listApprovedBasic();
  }

  @Get(':dishId')
  async getById(@Param('dishId') dishId: string) {
    const dish = await this.dishesRepository.findApprovedById(dishId);
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return this.mapDishDetail(dish);
  }

  private mapDishDetail(dish: Awaited<ReturnType<DishesRepository['createDish']>>) {
    return {
      id: dish.id,
      name: dish.name,
      description: dish.description,
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
