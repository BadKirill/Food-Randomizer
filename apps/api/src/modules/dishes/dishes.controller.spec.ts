import { NotFoundException } from '@nestjs/common';
import { DishesController } from './dishes.controller';

describe('DishesController ownership enforcement', () => {
  const dishesRepositoryMock = {
    createDish: jest.fn(),
    updateDish: jest.fn(),
    archiveDish: jest.fn(),
    unarchiveDish: jest.fn(),
    listApprovedBasic: jest.fn(),
    findApprovedById: jest.fn(),
  } as any;

  const user = { id: 'user-1', email: 'user-1@food.app' };
  let controller: DishesController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new DishesController(dishesRepositoryMock);
  });

  it('passes authenticated user id when creating a dish', async () => {
    dishesRepositoryMock.createDish.mockResolvedValue({
      id: 'dish-1',
      name: 'Dish',
      description: null,
      dishType: 'vegan',
      createdBy: 'user-1@food.app',
      archivedAt: null,
      ingredients: [],
      steps: [],
      addGroups: [],
    });

    await controller.create(user, {
      name: 'Dish',
      dishType: 'vegan',
      ingredients: ['a'],
      steps: ['b'],
      addOnOptions: [],
    });

    expect(dishesRepositoryMock.createDish).toHaveBeenCalledWith(
      expect.objectContaining({
        createdById: 'user-1',
        createdBy: 'user-1@food.app',
      }),
    );
  });

  it('returns not found when updating dish owned by another user', async () => {
    dishesRepositoryMock.updateDish.mockResolvedValue(null);

    await expect(
      controller.update(user, 'dish-foreign', {
        name: 'Changed',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(dishesRepositoryMock.updateDish).toHaveBeenCalledWith(
      'dish-foreign',
      'user-1',
      expect.objectContaining({ name: 'Changed' }),
    );
  });

  it('returns not found when archiving dish owned by another user', async () => {
    dishesRepositoryMock.archiveDish.mockResolvedValue(null);

    await expect(controller.archive(user, 'dish-foreign')).rejects.toThrow(NotFoundException);
    expect(dishesRepositoryMock.archiveDish).toHaveBeenCalledWith('dish-foreign', 'user-1');
  });

  it('returns not found when unarchiving dish owned by another user', async () => {
    dishesRepositoryMock.unarchiveDish.mockResolvedValue(null);

    await expect(controller.unarchive(user, 'dish-foreign')).rejects.toThrow(NotFoundException);
    expect(dishesRepositoryMock.unarchiveDish).toHaveBeenCalledWith('dish-foreign', 'user-1');
  });
});
