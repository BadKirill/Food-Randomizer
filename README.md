# Food Randomizer Monorepo Blueprint

AI-ready cross-platform architecture for a Food Randomizer app (iOS + Android) with:
- Random dish selection with cooldown rules
- Structured recipe storage
- AI generation of new dishes
- AI ingredient/step inference
- AI image-based dish recognition

## Proposed Stack
- Mobile: React Native + Expo + TypeScript
- API: Node.js + NestJS (or Fastify) + TypeScript
- DB: PostgreSQL + Prisma
- Queue (later): BullMQ
- Storage: S3-compatible object storage
- Shared contracts: TypeScript + Zod

## Repo Layout
- `apps/mobile`: React Native app (UI + local session state)
- `apps/api`: Backend API (business logic, AI integration, DB access)
- `packages/contracts`: Shared DTOs/schemas used by mobile + API
- `docs`: Architecture notes and initial API spec

## First Build Order
1. Implement manual dishes CRUD + randomizer in API.
2. Connect mobile to `/random/next` and render full dish output.
3. Add AI text generation endpoint and approval flow.
4. Add image recognition endpoint and confidence-based UX.

See:
- `docs/architecture.md`
- `docs/api-spec.md`
- `packages/contracts/src/index.ts`
