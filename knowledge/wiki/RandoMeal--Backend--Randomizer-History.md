# Current randomizer and history

Uniform random dish selection, randomized add-ons, optional dish-type filter, authenticated history cooldown, and stateless public random behavior.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Authenticated POST /random/next records history and gradually relaxes cooldown when the candidate pool is small.
- Public GET /random is stateless and does not provide durable repeat avoidance.
- Selection and add-on choice use Math.random and are not reproducible.
- This behavior is a reusable MVP fallback, not the target decision engine.

## Source coverage

- `apps/api/prisma/migrations/20260606120000_api_quality_indexes/migration.sql` — 4 indexed sections: Dish_status_archivedAt_dishType_createdAt_idx, Dish_createdById_archivedAt_idx, DishHistory_userId_clickIdx_idx, DishHistory_dishId_shownAt_idx. Sections: apps/api/prisma/migrations/20260606120000_api_quality_indexes/migration.sql (L1–12); Dish_status_archivedAt_dishType_createdAt_idx (L1–3); Dish_createdById_archivedAt_idx (L4–6); DishHistory_userId_clickIdx_idx (L7–9); DishHistory_dishId_shownAt_idx (L10–12)
- `apps/api/src/modules/history/history.repository.ts` — 1 indexed section: HistoryRepository. Sections: apps/api/src/modules/history/history.repository.ts (L1–48); HistoryRepository (L5–48)
- `apps/api/src/modules/randomizer/randomizer.controller.ts` — 2 HTTP routes: GET /random, POST /random/next. Sections: apps/api/src/modules/randomizer/randomizer.controller.ts (L1–39); RandomizerController (L14–39)
- `apps/api/src/modules/randomizer/randomizer.service.spec.ts` — 6 indexed sections: RandomizerService, throws 404 when no dishes are available, avoids selecting the immediately previous dish, relaxes cooldown when needed and exposes meta about fallback, getNextForUser persists selection history with click index, …. Sections: apps/api/src/modules/randomizer/randomizer.service.spec.ts (L1–160); RandomizerService (L4–21); throws 404 when no dishes are available (L22–31); avoids selecting the immediately previous dish (L32–64); relaxes cooldown when needed and exposes meta about fallback (L65–97); getNextForUser persists selection history with click index (L98–133); getRandom returns a dish without reading or writing user history (L134–160)
- `apps/api/src/modules/randomizer/randomizer.service.ts` — 3 indexed sections: SelectionHistoryItem, RandomizerResult, RandomizerService. Sections: apps/api/src/modules/randomizer/randomizer.service.ts (L1–170); SelectionHistoryItem (L6–10); RandomizerResult (L11–17); RandomizerService (L18–170)

## Graph relations

- Depends on: [Current dish catalog and ownership](RandoMeal--Backend--Catalog-Ownership), [Current authentication and sessions](RandoMeal--Backend--Auth-Sessions)
- Related: [Target recommendation engine](RandoMeal--Architecture--Recommendation-Engine), [Current mobile random flow](RandoMeal--Mobile--Random-Flow)
- Supersedes: none
- Superseded by: [Target recommendation engine](RandoMeal--Architecture--Recommendation-Engine)

## Retrieval tags

`randomizer` · `history` · `cooldown` · `random` · `рандомайзер` · `история`
