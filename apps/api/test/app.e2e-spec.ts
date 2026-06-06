import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AuthGuard } from '../src/common/auth.guard';
import { AuthRateLimitGuard } from '../src/common/auth-rate-limit.guard';
import { ZodExceptionFilter } from '../src/common/zod-exception.filter';
import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { DishesController } from '../src/modules/dishes/dishes.controller';
import { DishesRepository } from '../src/modules/dishes/dishes.repository';
import { HistoryRepository } from '../src/modules/history/history.repository';
import { RandomizerController } from '../src/modules/randomizer/randomizer.controller';
import { RandomizerService } from '../src/modules/randomizer/randomizer.service';

describe('API endpoints (e2e)', () => {
  let app: INestApplication<App>;

  const dishesRepositoryMock = {
    listApprovedBasic: jest.fn(),
    listApprovedPaginated: jest.fn(),
    findApprovedById: jest.fn(),
    createDish: jest.fn(),
    updateDish: jest.fn(),
    archiveDish: jest.fn(),
    unarchiveDish: jest.fn(),
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

  const authServiceMock = {
    getSessionFromBearerHeader: jest.fn(),
    revokeSession: jest.fn(),
  };

  beforeAll(async () => {
    authServiceMock.getSessionFromBearerHeader.mockImplementation(
      (header?: string) => {
        if (header !== 'Bearer test-session-token') {
          throw new UnauthorizedException('Invalid or expired session');
        }
        return {
          id: 'session-1',
          user: { id: 'user-1', email: 'tester@foodrandomizer.app' },
        };
      },
    );

    dishesRepositoryMock.listApprovedBasic.mockImplementation(
      (
        dishType?: string,
        archived: 'active' | 'archived' | 'all' = 'active',
      ) => {
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

        let result = all;
        if (dishType) result = result.filter((d) => d.dishType === dishType);
        if (archived === 'archived') return [];
        return result;
      },
    );

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
    dishesRepositoryMock.unarchiveDish.mockResolvedValue({
      id: 'dish-1',
      archivedAt: null,
    });

    historyRepositoryMock.ensureUser.mockResolvedValue(undefined);
    historyRepositoryMock.getRecentSelections.mockResolvedValue([]);
    historyRepositoryMock.getNextClickIndex.mockResolvedValue(1);
    historyRepositoryMock.addSelection.mockResolvedValue(undefined);

    dishesRepositoryMock.findApprovedWithRelations.mockImplementation(
      (dishType?: string) => {
        const all = [
          {
            id: 'dish-usual',
            name: 'Usual Pasta',
            description: 'pasta',
            source: 'manual',
            status: 'approved',
            dishType: 'usual',
            ingredients: [
              { name: 'pasta', amount: null, unit: null, optional: false },
            ],
            steps: [{ text: 'Boil pasta' }],
            addGroups: [
              { groupKey: 'can_add', options: [{ value: 'olive oil' }] },
            ],
          },
          {
            id: 'dish-vegan',
            name: 'Vegan Bowl',
            description: 'bowl',
            source: 'manual',
            status: 'approved',
            dishType: 'vegan',
            ingredients: [
              { name: 'tofu', amount: null, unit: null, optional: false },
            ],
            steps: [{ text: 'Cook tofu' }],
            addGroups: [
              { groupKey: 'can_add', options: [{ value: 'sesame' }] },
            ],
          },
        ];

        if (!dishType) return all;
        return all.filter((d) => d.dishType === dishType);
      },
    );

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [
        AppController,
        AuthController,
        DishesController,
        RandomizerController,
      ],
      providers: [
        AuthGuard,
        AuthRateLimitGuard,
        RandomizerService,
        { provide: AppService, useValue: appServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: DishesRepository, useValue: dishesRepositoryMock },
        { provide: HistoryRepository, useValue: historyRepositoryMock },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new ZodExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET / returns hello world', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('GET /dishes filters by dishType', async () => {
    const response = await request(app.getHttpServer())
      .get('/dishes?dishType=vegan')
      .set('Authorization', 'Bearer test-session-token')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].dishType).toBe('vegan');
    expect(dishesRepositoryMock.listApprovedBasic).toHaveBeenCalledWith(
      'vegan',
      'active',
    );
  });

  it('GET /dishes supports archived filter', async () => {
    await request(app.getHttpServer())
      .get('/dishes?archived=all')
      .set('Authorization', 'Bearer test-session-token')
      .expect(200);
    expect(dishesRepositoryMock.listApprovedBasic).toHaveBeenCalledWith(
      undefined,
      'all',
    );
  });

  it('GET /dishes supports pagination and search', async () => {
    dishesRepositoryMock.listApprovedPaginated.mockResolvedValue({
      items: [],
      page: 2,
      limit: 5,
      total: 0,
      totalPages: 0,
    });

    const response = await request(app.getHttpServer())
      .get('/dishes?search=tofu&page=2&limit=5')
      .set('Authorization', 'Bearer test-session-token')
      .expect(200);

    expect(response.body).toEqual({
      items: [],
      page: 2,
      limit: 5,
      total: 0,
      totalPages: 0,
    });
    expect(dishesRepositoryMock.listApprovedPaginated).toHaveBeenCalledWith({
      archived: 'active',
      dishType: undefined,
      search: 'tofu',
      page: 2,
      limit: 5,
    });
  });

  it('returns readable validation errors', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'not-an-email', password: 'short' })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.message).toBe('Please check the submitted fields.');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'email' })]),
    );
  });

  it('POST /dishes rejects missing auth token', async () => {
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

  it('GET /dishes and dish details reject missing auth token', async () => {
    await request(app.getHttpServer()).get('/dishes').expect(401);
    await request(app.getHttpServer()).get('/dishes/dish-1').expect(401);
  });

  it('POST /dishes creates dish with valid auth token', async () => {
    const response = await request(app.getHttpServer())
      .post('/dishes')
      .set('Authorization', 'Bearer test-session-token')
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
      .set('Authorization', 'Bearer test-session-token')
      .send({
        name: 'Updated',
        dishType: 'vegetarian',
      })
      .expect(200);

    expect(dishesRepositoryMock.updateDish).toHaveBeenCalledWith(
      'dish-1',
      'user-1',
      expect.objectContaining({
        name: 'Updated',
        dishType: 'vegetarian',
      }),
    );
  });

  it('DELETE /dishes/:id archives dish with valid token', async () => {
    const response = await request(app.getHttpServer())
      .delete('/dishes/dish-1')
      .set('Authorization', 'Bearer test-session-token')
      .expect(200);

    expect(response.body.id).toBe('dish-1');
    expect(dishesRepositoryMock.archiveDish).toHaveBeenCalledWith(
      'dish-1',
      'user-1',
    );
  });

  it('POST /dishes/:id/unarchive unarchives dish with valid token', async () => {
    const response = await request(app.getHttpServer())
      .post('/dishes/dish-1/unarchive')
      .set('Authorization', 'Bearer test-session-token')
      .expect(200);

    expect(response.body.id).toBe('dish-1');
    expect(response.body.archivedAt).toBeNull();
    expect(dishesRepositoryMock.unarchiveDish).toHaveBeenCalledWith(
      'dish-1',
      'user-1',
    );
  });

  it('POST /auth/logout revokes the current session', async () => {
    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', 'Bearer test-session-token')
      .expect(200);

    expect(authServiceMock.revokeSession).toHaveBeenCalledWith('session-1');
  });

  it('POST /random/next returns only filtered dish type', async () => {
    const response = await request(app.getHttpServer())
      .post('/random/next')
      .set('Authorization', 'Bearer test-session-token')
      .send({
        userId: 'spoofed-client-user',
        cooldownClicks: 4,
        dishType: 'vegan',
      })
      .expect(201);

    expect(response.body.dish.dishType).toBe('vegan');
    expect(dishesRepositoryMock.findApprovedWithRelations).toHaveBeenCalledWith(
      'vegan',
    );
    expect(historyRepositoryMock.ensureUser).toHaveBeenCalledWith('user-1');
    expect(historyRepositoryMock.getRecentSelections).toHaveBeenCalledWith(
      'user-1',
      20,
    );
    expect(historyRepositoryMock.getNextClickIndex).toHaveBeenCalledWith(
      'user-1',
    );
    expect(historyRepositoryMock.addSelection).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'user-1',
      }),
    );
  });

  it('GET /random returns a filtered dish without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/random?dishType=vegan&cooldownClicks=4')
      .expect(200);

    expect(response.body.dish.dishType).toBe('vegan');
    expect(dishesRepositoryMock.findApprovedWithRelations).toHaveBeenCalledWith(
      'vegan',
    );
    expect(historyRepositoryMock.ensureUser).not.toHaveBeenCalled();
    expect(historyRepositoryMock.addSelection).not.toHaveBeenCalled();
  });

  it('POST /random/next returns 404 when there are no dishes', async () => {
    dishesRepositoryMock.findApprovedWithRelations.mockReturnValueOnce([]);

    const response = await request(app.getHttpServer())
      .post('/random/next')
      .set('Authorization', 'Bearer test-session-token')
      .send({
        cooldownClicks: 4,
      })
      .expect(404);

    expect(response.body.message).toBe('No dishes available');
  });
});
