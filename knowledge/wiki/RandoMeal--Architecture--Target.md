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

- `docs/product/architecture.md` — 14 indexed sections: Target product architecture, 0. Product constraint on architecture, 1. Technology stack, 2. Runtime topology, 3. Backend boundaries, …. Sections: docs/product/architecture.md (L1–294); Target product architecture (L1–294); 0. Product constraint on architecture (L7–17); 1. Technology stack (L18–49); 2. Runtime topology (L50–70); 3. Backend boundaries (L71–108); 4. Recommendation architecture (L109–151); 5. Mobile architecture (L152–177)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Single versus shortlist evidence gate](RandoMeal--Product--Choice-Cardinality-Gate)
- Related: [Target product data model](RandoMeal--Data--Target-Model), [Target API v2 contract](RandoMeal--API--Target-v2), [Analytics and measurement plan](RandoMeal--Analytics--Measurement)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Superseded by: none

## Retrieval tags

`architecture` · `stack` · `modular monolith` · `backend` · `mobile` · `архитектура` · `стек`
