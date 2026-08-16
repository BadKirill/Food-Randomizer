# Target product architecture

Target modular monolith, Expo mobile architecture, PostgreSQL data model, event outbox, analytics, reliability, storage, and future queue boundaries.

Status: **target**
Authority: **accepted-architecture**

## Rules and patterns

- Retain TypeScript npm workspaces, Expo React Native, NestJS, Prisma, and PostgreSQL.
- Separate ranking from presentation policy and persist reproducibility inputs for every exposure.
- Module repositories cannot query another module's tables outside its public application boundary.
- Introduce Redis and BullMQ only when queue or cache use cases ship.

## Source coverage

- `docs/product/architecture.md` — 14 indexed sections: Target product architecture, 0. Product constraint on architecture, 1. Technology stack, 2. Runtime topology, 3. Backend boundaries, …. Sections: docs/product/architecture.md (L1–301); Target product architecture (L1–301); 0. Product constraint on architecture (L7–20); 1. Technology stack (L21–52); 2. Runtime topology (L53–73); 3. Backend boundaries (L74–111); 4. Recommendation architecture (L112–158); 5. Mobile architecture (L159–184)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Hybrid choice-cardinality evidence gate](RandoMeal--Product--Choice-Cardinality-Gate)
- Related: [Target product data model](RandoMeal--Data--Target-Model), [Target API v2 contract](RandoMeal--API--Target-v2), [Analytics and measurement plan](RandoMeal--Analytics--Measurement)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Superseded by: none

## Retrieval tags

`architecture` · `stack` · `modular monolith` · `backend` · `mobile` · `архитектура` · `стек`
