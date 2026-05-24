# Food Randomizer Monorepo Blueprint

AI-ready cross-platform architecture for a Food Randomizer app (iOS + Android) with:
- Random dish selection with cooldown rules
- Structured recipe storage
- AI generation of new dishes
- AI ingredient/step inference
- AI image-based dish recognition

## Stack
- Mobile: React Native + Expo + TypeScript
- API: Node.js + NestJS + TypeScript
- DB: PostgreSQL + Prisma
- Containerization: Docker + Compose
- Shared contracts: TypeScript + Zod

## Repo Layout
- `apps/mobile`: React Native app (frontend)
- `apps/api`: NestJS API (backend)
- `packages/contracts`: Shared DTOs/schemas
- `docs`: architecture and deployment docs
- `scripts`: deployment/bootstrap scripts

This layout is intentionally split-ready. We keep one repo now, but `apps/mobile` and `apps/api` can be moved into separate repos later with minimal changes.

## Environment Strategy
### Mobile
- `apps/mobile/.env.dev`
- `apps/mobile/.env.prod`

Key variable:
- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_ALLOW_CLEARTEXT_HTTP`

### API
- `apps/api/.env.dev`
- `apps/api/.env.prod`

Key variables:
- `PORT`
- `DATABASE_URL`
- `CORS_ORIGINS` (comma-separated)

## Local Development
1. Start DB
```bash
npm run dev:db
```

2. Start API
```bash
npm run dev:api
```

3. Start mobile
```bash
npm run dev:mobile
```

## Production Deploy (Oracle-ready)
- Build/deploy API container:
```bash
npm run deploy:api
```

- Full Oracle setup guide:
`docs/deployment-oracle.md`

- HTTPS reverse-proxy setup (Nginx + Let's Encrypt):
`docs/https-nginx-letsencrypt.md`

## Verification
- Health endpoint: `GET /health`
- API tests:
```bash
npm run test:api
```

## Test Matrix
- Unit tests (API + mobile):
```bash
npm run test:unit
```

- Integration tests (API <-> DB with real Postgres):
```bash
npm run test:integration
```

- Critical-path e2e (API endpoint flow):
```bash
npm run test:e2e:critical
```

- Mobile->API/API->mobile contract checks:
```bash
TEST_API_BASE_URL=http://localhost:3000 \
npm run test:contract:mobile-api
```

- Full headless suite:
```bash
npm run test:headless
```

- Full suite in background (logs to `/tmp/food-randomizer-tests.log`):
```bash
npm run test:background
```

- Headful mobile mode for emulator-visible test sessions:
```bash
npm run test:headful:mobile
```
