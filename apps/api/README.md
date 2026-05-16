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

## Scripts
- `npm run start:dev`
- `npm run build`
- `npm run start:prod`
- `npm run start:prod:migrate`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:migrate:deploy`
