import type { Dish } from '@food/contracts';

export type SelectionHistoryItem = {
  dishId: string;
  clickIndex: number;
};

export type RandomizerResult = {
  selectedDish: Dish;
  cooldownApplied: number;
  fallbackRelaxationUsed: boolean;
};

export class RandomizerService {
  pickNextDish(params: {
    dishes: Dish[];
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

    // Relax cooldown if candidate set becomes empty, but keep no-immediate-repeat rule.
    while (eligible.length === 0 && cooldown > 0) {
      cooldown -= 1;
      fallbackRelaxationUsed = true;
      eligible = this.filterEligible(dishes, history, cooldown, lastDishId);
    }

    if (eligible.length === 0) {
      // Final fallback: if only one dish exists, allow it.
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
    dishes: Dish[],
    history: SelectionHistoryItem[],
    cooldownClicks: number,
    lastDishId?: string,
  ): Dish[] {
    const cooldownDishIds = new Set(
      history.slice(0, cooldownClicks).map((item) => item.dishId),
    );

    return dishes.filter((dish) => {
      if (lastDishId && dish.id === lastDishId) return false;
      if (cooldownDishIds.has(dish.id)) return false;
      return true;
    });
  }
}
