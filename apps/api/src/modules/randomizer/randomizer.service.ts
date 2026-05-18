import type { RandomNextResponse } from '@food/contracts';
import { Injectable } from '@nestjs/common';
import { DishesRepository, type DishWithRelations } from '../dishes/dishes.repository';
import { HistoryRepository } from '../history/history.repository';

export type SelectionHistoryItem = {
  dishId: string;
  clickIndex: number;
};

export type RandomizerResult = {
  selectedDish: RandomNextResponse['dish'];
  cooldownApplied: number;
  fallbackRelaxationUsed: boolean;
};

@Injectable()
export class RandomizerService {
  constructor(
    private readonly dishesRepository: DishesRepository,
    private readonly historyRepository: HistoryRepository,
  ) {}

  async getNextForUser(params: {
    userId: string;
    cooldownClicks: number;
  }): Promise<RandomNextResponse> {
    await this.historyRepository.ensureUser(params.userId);

    const dishesFromDb = await this.dishesRepository.findApprovedWithRelations();
    const mappedDishes = dishesFromDb.map((dish) => this.mapDish(dish));

    const historyRows = await this.historyRepository.getRecentSelections(
      params.userId,
      Math.max(params.cooldownClicks, 20),
    );
    const history: SelectionHistoryItem[] = historyRows.map((row) => ({
      dishId: row.dishId,
      clickIndex: row.clickIdx,
    }));

    const picked = this.pickNextDish({
      dishes: mappedDishes,
      history,
      cooldownClicks: params.cooldownClicks,
    });

    const clickIdx = await this.historyRepository.getNextClickIndex(params.userId);
    await this.historyRepository.addSelection({
      userId: params.userId,
      dishId: picked.selectedDish.id,
      clickIdx,
    });

    return {
      dish: picked.selectedDish,
      selectionMeta: {
        cooldownApplied: picked.cooldownApplied,
        fallbackRelaxationUsed: picked.fallbackRelaxationUsed,
      },
    };
  }

  pickNextDish(params: {
    dishes: RandomNextResponse['dish'][];
    history: SelectionHistoryItem[];
    cooldownClicks: number;
  }): RandomizerResult {
    const { dishes, history } = params;
    let cooldown = params.cooldownClicks;

    if (dishes.length === 0) {
      throw new Error('No dishes available');
    }

    const lastDishId = history[0]?.dishId;
    let fallbackRelaxationUsed = false;

    let eligible = this.filterEligible(dishes, history, cooldown, lastDishId);

    while (eligible.length === 0 && cooldown > 0) {
      cooldown -= 1;
      fallbackRelaxationUsed = true;
      eligible = this.filterEligible(dishes, history, cooldown, lastDishId);
    }

    if (eligible.length === 0) {
      eligible = dishes;
    }

    const selectedDish = eligible[Math.floor(Math.random() * eligible.length)];

    return {
      selectedDish,
      cooldownApplied: cooldown,
      fallbackRelaxationUsed,
    };
  }

  private filterEligible(
    dishes: RandomNextResponse['dish'][],
    history: SelectionHistoryItem[],
    cooldownClicks: number,
    lastDishId?: string,
  ): RandomNextResponse['dish'][] {
    const cooldownDishIds = new Set(
      history.slice(0, cooldownClicks).map((item) => item.dishId),
    );

    return dishes.filter((dish) => {
      if (lastDishId && dish.id === lastDishId) return false;
      if (cooldownDishIds.has(dish.id)) return false;
      return true;
    });
  }

  private mapDish(dish: DishWithRelations): RandomNextResponse['dish'] {
    return {
      id: dish.id,
      name: dish.name,
      description: dish.description ?? undefined,
      source: dish.source,
      status: dish.status,
      ingredients: dish.ingredients.map((ing) => ({
        name: ing.name,
        amount: ing.amount ?? undefined,
        unit: ing.unit ?? undefined,
        optional: ing.optional,
      })),
      steps: dish.steps.map((s) => s.text),
      addOnGroups: dish.addGroups.map((g) => {
        const options = g.options.map((o) => o.value);
        const selected = options[Math.floor(Math.random() * options.length)];

        return {
          groupKey: g.groupKey,
          options,
          selected,
        };
      }),
    };
  }
}
