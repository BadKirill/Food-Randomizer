import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { WriteTokenGuard } from '../src/common/write-token.guard';
import { DishesController } from '../src/modules/dishes/dishes.controller';
import { DishesRepository } from '../src/modules/dishes/dishes.repository';
import { HistoryRepository } from '../src/modules/history/history.repository';
import { RandomizerController } from '../src/modules/randomizer/randomizer.controller';
import { RandomizerService } from '../src/modules/randomizer/randomizer.service';

describe('API endpoints (e2e)', () => {
  let app: INestApplication<App>;

  const dishesRepositoryMock = {
    listApprovedBasic: jest.fn(),
    findApprovedById: jest.fn(),
    createDish: jest.fn(),
    updateDish: jest.fn(),
    archiveDish: jest.fn(),
    findApprovedWithRelations: jest.fn(),
  };

  const historyRepositoryMock = {
    ensureUser: jest.fn(),
    getRecentSelections: jest.fn(),
    getNextClickIndex: jest.fn(),
    addSelection: jest.fn(),
  };

  const sampleDishDetail = {
    id: 'dish-1',
    name: 'Tofu Bowl',
    description: 'Simple meal',
    dishType: 'vegan' as const,
    createdBy: 'community',
    archivedAt: null,
    ingredients: [{ name: 'tofu', amount: null, unit: null, optional: false }],
    steps: [{ text: 'Cook tofu' }],
    addGroups: [
      {
        groupKey: 'can_add',
        options: [{ value: 'sesame' }],
      },
    ],
  };

  const appServiceMock = {
    getHello: jest.fn(() => 'Hello World!'),
  };

  const originalWriteToken = process.env.DISHES_WRITE_TOKEN;

  beforeAll(async () => {
    process.env.DISHES_WRITE_TOKEN = 'test-write-token';

    dishesRepositoryMock.listApprovedBasic.mockImplementation((dishType?: string) => {
      const all = [
        {
          id: 'dish-usual',
          name: 'Usual Pasta',
          description: 'pasta',
          dishType: 'usual',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'dish-vegan',
          name: 'Vegan Bowl',
          description: 'bowl',
          dishType: 'vegan',
          createdAt: new Date().toISOString(),
        },
      ];

      if (!dishType) return all;
      return all.filter((d) => d.dishType === dishType);
    });

    dishesRepositoryMock.findApprovedById.mockImplementation((id: string) => {
      if (id === 'dish-1') return sampleDishDetail;
      return null;
    });

    dishesRepositoryMock.createDish.mockResolvedValue(sampleDishDetail);
    dishesRepositoryMock.updateDish.mockResolvedValue(sampleDishDetail);
    dishesRepositoryMock.archiveDish.mockResolvedValue({
      id: 'dish-1',
      archivedAt: new Date().toISOString(),
    });

    historyRepositoryMock.ensureUser.mockResolvedValue(undefined);
    historyRepositoryMock.getRecentSelections.mockResolvedValue([]);
    historyRepositoryMock.getNextClickIndex.mockResolvedValue(1);
    historyRepositoryMock.addSelection.mockResolvedValue(undefined);

    dishesRepositoryMock.findApprovedWithRelations.mockImplementation((dishType?: string) => {
      const all = [
        {
          id: 'dish-usual',
          name: 'Usual Pasta',
          description: 'pasta',
          source: 'manual',
          status: 'approved',
          dishType: 'usual',
          ingredients: [{ name: 'pasta', amount: null, unit: null, optional: false }],
          steps: [{ text: 'Boil pasta' }],
          addGroups: [{ groupKey: 'can_add', options: [{ value: 'olive oil' }] }],
        },
        {
          id: 'dish-vegan',
          name: 'Vegan Bowl',
          description: 'bowl',
          source: 'manual',
          status: 'approved',
          dishType: 'vegan',
          ingredients: [{ name: 'tofu', amount: null, unit: null, optional: false }],
          steps: [{ text: 'Cook tofu' }],
          addGroups: [{ groupKey: 'can_add', options: [{ value: 'sesame' }] }],
        },
      ];

      if (!dishType) return all;
      return all.filter((d) => d.dishType === dishType);
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController, DishesController, RandomizerController],
      providers: [
        WriteTokenGuard,
        RandomizerService,
        { provide: AppService, useValue: appServiceMock },
        { provide: DishesRepository, useValue: dishesRepositoryMock },
        { provide: HistoryRepository, useValue: historyRepositoryMock },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    process.env.DISHES_WRITE_TOKEN = originalWriteToken;
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET / returns hello world', async () => {
    await request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('GET /dishes filters by dishType', async () => {
    const response = await request(app.getHttpServer())
      .get('/dishes?dishType=vegan')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].dishType).toBe('vegan');
    expect(dishesRepositoryMock.listApprovedBasic).toHaveBeenCalledWith('vegan');
  });

  it('POST /dishes rejects missing write token', async () => {
    await request(app.getHttpServer())
      .post('/dishes')
      .send({
        name: 'Dish',
        ingredients: ['a'],
        steps: ['b'],
        addOnOptions: [],
      })
      .expect(401);
  });

  it('POST /dishes creates dish with valid write token', async () => {
    const response = await request(app.getHttpServer())
      .post('/dishes')
      .set('Authorization', 'Bearer test-write-token')
      .send({
        name: 'Dish',
        dishType: 'vegan',
        ingredients: ['tofu'],
        steps: ['cook'],
        addOnOptions: ['sesame'],
      })
      .expect(201);

    expect(response.body.name).toBe('Tofu Bowl');
    expect(dishesRepositoryMock.createDish).toHaveBeenCalled();
  });

  it('PATCH /dishes/:id updates dish with valid token', async () => {
    await request(app.getHttpServer())
      .patch('/dishes/dish-1')
      .set('Authorization', 'Bearer test-write-token')
      .send({
        name: 'Updated',
        dishType: 'vegetarian',
      })
      .expect(200);

    expect(dishesRepositoryMock.updateDish).toHaveBeenCalledWith(
      'dish-1',
      expect.objectContaining({
        name: 'Updated',
        dishType: 'vegetarian',
      }),
    );
  });

  it('DELETE /dishes/:id archives dish with valid token', async () => {
    const response = await request(app.getHttpServer())
      .delete('/dishes/dish-1')
      .set('Authorization', 'Bearer test-write-token')
      .expect(200);

    expect(response.body.id).toBe('dish-1');
    expect(dishesRepositoryMock.archiveDish).toHaveBeenCalledWith('dish-1');
  });

  it('POST /random/next returns only filtered dish type', async () => {
    const response = await request(app.getHttpServer())
      .post('/random/next')
      .send({
        userId: 'u-1',
        cooldownClicks: 4,
        dishType: 'vegan',
      })
      .expect(201);

    expect(response.body.dish.dishType).toBe('vegan');
    expect(dishesRepositoryMock.findApprovedWithRelations).toHaveBeenCalledWith('vegan');
  });
});
