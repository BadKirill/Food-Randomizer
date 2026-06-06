import { NotFoundException } from '@nestjs/common';
import { RandomizerService } from './randomizer.service';

describe('RandomizerService', () => {
  const dishesRepositoryMock = {
    findApprovedWithRelations: jest.fn(),
  } as any;

  const historyRepositoryMock = {
    ensureUser: jest.fn(),
    getRecentSelections: jest.fn(),
    getNextClickIndex: jest.fn(),
    addSelection: jest.fn(),
  } as any;

  const service = new RandomizerService(dishesRepositoryMock, historyRepositoryMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws 404 when no dishes are available', () => {
    expect(() =>
      service.pickNextDish({
        dishes: [],
        history: [],
        cooldownClicks: 4,
      }),
    ).toThrow(NotFoundException);
  });

  it('avoids selecting the immediately previous dish', () => {
    const result = service.pickNextDish({
      dishes: [
        {
          id: 'dish-1',
          name: 'A',
          dishType: 'vegan',
          ingredients: [{ name: 'x' }],
          steps: ['a'],
          addOnGroups: [],
          source: 'manual',
          status: 'approved',
        },
        {
          id: 'dish-2',
          name: 'B',
          dishType: 'vegan',
          ingredients: [{ name: 'x' }],
          steps: ['a'],
          addOnGroups: [],
          source: 'manual',
          status: 'approved',
        },
      ],
      history: [{ dishId: 'dish-1', clickIndex: 22 }],
      cooldownClicks: 4,
    });

    expect(result.selectedDish.id).toBe('dish-2');
    expect(result.fallbackRelaxationUsed).toBe(false);
    expect(result.cooldownApplied).toBe(4);
  });

  it('relaxes cooldown when needed and exposes meta about fallback', () => {
    const result = service.pickNextDish({
      dishes: [
        {
          id: 'dish-1',
          name: 'A',
          dishType: 'vegan',
          ingredients: [{ name: 'x' }],
          steps: ['a'],
          addOnGroups: [],
          source: 'manual',
          status: 'approved',
        },
        {
          id: 'dish-2',
          name: 'B',
          dishType: 'vegan',
          ingredients: [{ name: 'x' }],
          steps: ['a'],
          addOnGroups: [],
          source: 'manual',
          status: 'approved',
        },
      ],
      history: [{ dishId: 'dish-1', clickIndex: 2 }, { dishId: 'dish-2', clickIndex: 1 }],
      cooldownClicks: 2,
    });

    expect(['dish-1', 'dish-2']).toContain(result.selectedDish.id);
    expect(result.fallbackRelaxationUsed).toBe(true);
    expect(result.cooldownApplied).toBe(1);
  });

  it('getNextForUser persists selection history with click index', async () => {
    dishesRepositoryMock.findApprovedWithRelations.mockResolvedValue([
      {
        id: 'dish-1',
        name: 'Dish 1',
        description: null,
        source: 'manual',
        status: 'approved',
        dishType: 'vegan',
        ingredients: [{ name: 'tofu', amount: null, unit: null, optional: false }],
        steps: [{ text: 'cook', position: 1 }],
        addGroups: [{ groupKey: 'can_add', options: [{ value: 'sesame' }] }],
      },
    ]);
    historyRepositoryMock.ensureUser.mockResolvedValue(undefined);
    historyRepositoryMock.getRecentSelections.mockResolvedValue([]);
    historyRepositoryMock.getNextClickIndex.mockResolvedValue(33);
    historyRepositoryMock.addSelection.mockResolvedValue(undefined);

    const result = await service.getNextForUser({
      userId: 'user-1',
      cooldownClicks: 4,
      dishType: 'vegan',
    });

    expect(historyRepositoryMock.ensureUser).toHaveBeenCalledWith('user-1');
    expect(dishesRepositoryMock.findApprovedWithRelations).toHaveBeenCalledWith('vegan');
    expect(historyRepositoryMock.getNextClickIndex).toHaveBeenCalledWith('user-1');
    expect(historyRepositoryMock.addSelection).toHaveBeenCalledWith({
      userId: 'user-1',
      dishId: 'dish-1',
      clickIdx: 33,
    });
    expect(result.dish.id).toBe('dish-1');
  });

  it('getRandom returns a dish without reading or writing user history', async () => {
    dishesRepositoryMock.findApprovedWithRelations.mockResolvedValue([
      {
        id: 'dish-1',
        name: 'Dish 1',
        description: null,
        source: 'manual',
        status: 'approved',
        dishType: 'vegan',
        ingredients: [{ name: 'tofu', amount: null, unit: null, optional: false }],
        steps: [{ text: 'cook', position: 1 }],
        addGroups: [],
      },
    ]);

    const result = await service.getRandom({
      cooldownClicks: 4,
      dishType: 'vegan',
    });

    expect(result.dish.id).toBe('dish-1');
    expect(historyRepositoryMock.ensureUser).not.toHaveBeenCalled();
    expect(historyRepositoryMock.getRecentSelections).not.toHaveBeenCalled();
    expect(historyRepositoryMock.addSelection).not.toHaveBeenCalled();
  });
});
