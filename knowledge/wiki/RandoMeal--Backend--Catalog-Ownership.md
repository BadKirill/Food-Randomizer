# Current dish catalog and ownership

Dish CRUD repository and controller with creator-only edit/archive behavior, filtering, pagination, transactional child replacement, and legacy ownership constraints.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Only the creator can update, archive, or unarchive a dish.
- Legacy rows without creator identity remain locked until explicitly assigned.
- Archiving uses archivedAt and list filters must preserve owner and visibility semantics.
- Current catalog content is not sufficient evidence for target dietary safety.

## Source coverage

- `apps/api/prisma/migrations/20260519111000_dish_type_archive_creator/migration.sql` — 1 indexed section: Dish. Sections: apps/api/prisma/migrations/20260519111000_dish_type_archive_creator/migration.sql (L1–9); Dish (L5–9)
- `apps/api/prisma/migrations/20260519204000_backfill_dish_type_vegan/migration.sql` — sql file migration.sql. Sections: apps/api/prisma/migrations/20260519204000_backfill_dish_type_vegan/migration.sql (L1–6)
- `apps/api/src/modules/dishes/dishes.controller.spec.ts` — 7 indexed sections: DishesController ownership enforcement, passes authenticated user id when creating a dish, uses paginated repository listing when page/search is requested, returns forbidden when updating dish owned by another user, returns forbidden when archiving dish owned by another user, …. Sections: apps/api/src/modules/dishes/dishes.controller.spec.ts (L1–145); DishesController ownership enforcement (L4–23); passes authenticated user id when creating a dish (L24–52); uses paginated repository listing when page/search is requested (L53–72); returns forbidden when updating dish owned by another user (L73–93); returns forbidden when archiving dish owned by another user (L94–110); returns forbidden when unarchiving dish owned by another user (L111–127); returns forbidden when unarchiving legacy dish without creator (L128–145)
- `apps/api/src/modules/dishes/dishes.controller.ts` — 6 HTTP routes: POST /dishes, GET /dishes, GET /dishes/:dishId, PATCH /dishes/:dishId, DELETE /dishes/:dishId, POST /dishes/:dishId/unarchive. Sections: apps/api/src/modules/dishes/dishes.controller.ts (L1–197); DishesController (L50–197)
- `apps/api/src/modules/dishes/dishes.repository.spec.ts` — 6 indexed sections: DishesRepository, does not update when dish is missing, does not update when user is not owner, does not update when dish has no creator, archives only owner dishes, …. Sections: apps/api/src/modules/dishes/dishes.repository.spec.ts (L1–105); DishesRepository (L3–46); does not update when dish is missing (L47–56); does not update when user is not owner (L57–66); does not update when dish has no creator (L67–76); archives only owner dishes (L77–92); unarchives only archived dishes owned by user (L93–105)
- `apps/api/src/modules/dishes/dishes.repository.ts` — 2 indexed sections: DishWithRelations, DishesRepository. Sections: apps/api/src/modules/dishes/dishes.repository.ts (L1–357); DishWithRelations (L4–8); DishesRepository (L9–357)

## Graph relations

- Depends on: [Current authentication and sessions](RandoMeal--Backend--Auth-Sessions), [Current Prisma data model](RandoMeal--Data--Current-Prisma)
- Related: [Current mobile dish management flow](RandoMeal--Mobile--Manage-Flow), [Seed and legacy content](RandoMeal--Data--Seed-Content)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`dishes` · `catalog` · `ownership` · `archive` · `repository` · `блюда` · `каталог`
