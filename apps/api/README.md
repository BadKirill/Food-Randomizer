# API App

NestJS backend for Food Randomizer.

## Responsibilities
- Dish CRUD
- Randomizer endpoint
- AI generation/inference/vision endpoints
- History and analytics
- Health endpoint (`GET /health`)

## Environment
Use:
- `.env.dev` for local development
- `.env.prod` for production deployment

Required vars:
- `PORT`
- `DATABASE_URL`
- `CORS_ORIGINS` (comma-separated)
- `SESSION_SECRET`

Optional auth protection:
- `AUTH_LOGIN_RATE_LIMIT` (default `10`)
- `AUTH_REGISTER_RATE_LIMIT` (default `5`)
- `AUTH_RATE_LIMIT_WINDOW_MS` (default `900000`, or 15 minutes)

## Scripts
- `npm run start:dev`
- `npm run build`
- `npm run start:prod`
- `npm run start:prod:migrate`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:migrate:deploy`
- `npm run prisma:assign-legacy-owner -- owner@example.com --dry-run`
- `npm run prisma:assign-legacy-owner -- owner@example.com`

## Dish list pagination and search
Existing requests such as `GET /dishes?archived=active` still return a plain array.

Requests using `search`, `page`, or `limit` return a paginated response:

```text
GET /dishes?search=tofu&dishType=vegan&page=1&limit=20
```

```json
{"items":[],"page":1,"limit":20,"total":0,"totalPages":0}
```
