import { DishesRepository } from './dishes.repository';

describe('DishesRepository', () => {
  const findApprovedById = jest.fn();
  const dishUpdate = jest.fn();
  const dishFindFirst = jest.fn();

  const prismaMock = {
    dish: {
      update: dishUpdate,
      findFirst: dishFindFirst,
    },
    $transaction: jest.fn(async (callback: (tx: any) => Promise<any>) =>
      callback({
        dish: {
          update: dishUpdate,
          findUniqueOrThrow: jest.fn().mockResolvedValue({ id: 'dish-1' }),
        },
        dishIngredient: {
          deleteMany: jest.fn(),
          createMany: jest.fn(),
        },
        dishStep: {
          deleteMany: jest.fn(),
          createMany: jest.fn(),
        },
        dishAddOption: {
          deleteMany: jest.fn(),
          createMany: jest.fn(),
        },
        dishAddOptionGroup: {
          deleteMany: jest.fn(),
          create: jest.fn().mockResolvedValue({ id: 'group-1' }),
        },
      }),
    ),
  } as any;

  let repository: DishesRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new DishesRepository(prismaMock);
    jest.spyOn(repository, 'findApprovedById').mockImplementation(findApprovedById);
  });

  it('does not update when dish is missing', async () => {
    findApprovedById.mockResolvedValue(null);

    const result = await repository.updateDish('dish-1', 'user-1', {
      name: 'new',
    });

    expect(result).toBeNull();
  });

  it('does not update when user is not owner', async () => {
    findApprovedById.mockResolvedValue({ id: 'dish-1', createdById: 'owner-1' });

    const result = await repository.updateDish('dish-1', 'user-2', {
      name: 'new',
    });

    expect(result).toBeNull();
  });

  it('does not update when dish has no creator', async () => {
    findApprovedById.mockResolvedValue({ id: 'dish-1', createdById: null });

    const result = await repository.updateDish('dish-1', 'user-1', {
      name: 'new',
    });

    expect(result).toBeNull();
  });

  it('archives only owner dishes', async () => {
    findApprovedById.mockResolvedValue({ id: 'dish-1', createdById: 'owner-1' });
    dishUpdate.mockResolvedValue({ id: 'dish-1', archivedAt: new Date() });

    const ok = await repository.archiveDish('dish-1', 'owner-1');
    expect(ok?.id).toBe('dish-1');

    findApprovedById.mockResolvedValue({ id: 'dish-1', createdById: 'owner-1' });
    const denied = await repository.archiveDish('dish-1', 'other-user');
    expect(denied).toBeNull();

    findApprovedById.mockResolvedValue({ id: 'dish-1', createdById: null });
    const deniedNoCreator = await repository.archiveDish('dish-1', 'owner-1');
    expect(deniedNoCreator).toBeNull();
  });

  it('unarchives only archived dishes owned by user', async () => {
    dishFindFirst.mockResolvedValueOnce(null);
    const missing = await repository.unarchiveDish('dish-1', 'owner-1');
    expect(missing).toBeNull();

    dishFindFirst.mockResolvedValueOnce({ id: 'dish-1', archivedAt: new Date() });
    dishUpdate.mockResolvedValueOnce({ id: 'dish-1', archivedAt: null });

    const ok = await repository.unarchiveDish('dish-1', 'owner-1');
    expect(ok).toEqual({ id: 'dish-1', archivedAt: null });
  });
});
