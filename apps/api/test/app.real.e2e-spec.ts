import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

const describeIfDatabase = process.env.DATABASE_URL ? describe : describe.skip;

describeIfDatabase('API real e2e (api -> db -> api)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  const randomEmail = () => `test-${Date.now()}-${Math.random()}@randomeal.app`;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await prisma.dishHistory.deleteMany();
    await prisma.dishAddOption.deleteMany();
    await prisma.dishAddOptionGroup.deleteMany();
    await prisma.dishStep.deleteMany();
    await prisma.dishIngredient.deleteMany();
    await prisma.dishImage.deleteMany();
    await prisma.dish.deleteMany();
    await prisma.userSession.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('register -> create dish -> list -> random -> archive -> unarchive critical path', async () => {
    const email = randomEmail();
    const password = 'StrongPass123!';

    const registerRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201);

    const token = registerRes.body.token as string;
    expect(token).toBeTruthy();

    const createRes = await request(app.getHttpServer())
      .post('/dishes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Critical Path Dish',
        description: 'E2E dish',
        dishType: 'vegan',
        ingredients: ['tofu', 'rice'],
        steps: ['cook', 'serve'],
        addOnOptions: ['sesame'],
      })
      .expect(201);

    const dishId = createRes.body.id as string;

    const listRes = await request(app.getHttpServer()).get('/dishes?archived=all').expect(200);
    expect(listRes.body.some((d: { id: string }) => d.id === dishId)).toBe(true);

    const randomRes = await request(app.getHttpServer())
      .post('/random/next')
      .send({ userId: 'e2e-user-1', cooldownClicks: 4, dishType: 'vegan' })
      .expect(201);

    expect(randomRes.body.dish.id).toBe(dishId);

    await request(app.getHttpServer())
      .delete(`/dishes/${dishId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await request(app.getHttpServer())
      .post(`/dishes/${dishId}/unarchive`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('enforces ownership: another user cannot archive dish', async () => {
    const owner = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: randomEmail(), password: 'StrongPass123!' })
      .expect(201);

    const attacker = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: randomEmail(), password: 'StrongPass123!' })
      .expect(201);

    const createRes = await request(app.getHttpServer())
      .post('/dishes')
      .set('Authorization', `Bearer ${owner.body.token}`)
      .send({
        name: 'Owned Dish',
        dishType: 'vegan',
        ingredients: ['a'],
        steps: ['b'],
        addOnOptions: [],
      })
      .expect(201);

    await request(app.getHttpServer())
      .delete(`/dishes/${createRes.body.id}`)
      .set('Authorization', `Bearer ${attacker.body.token}`)
      .expect(404);
  });
});
