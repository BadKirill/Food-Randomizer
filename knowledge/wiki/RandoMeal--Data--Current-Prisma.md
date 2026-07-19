# Current Prisma data model

MVP PostgreSQL schema for users, sessions, dishes, structured recipe children, history, AI generation records, and image recognition records.

Status: **current**
Authority: **current-code**

## Rules and patterns

- All schema evolution uses additive migrations; applied migrations are immutable.
- Current ingredient values are free-form and cannot enforce target taxonomy or allergen safety.
- Dish updates replace child ingredient, step, and add-on rows transactionally.
- DishHistory clickIdx is not an atomic unique sequence and requires redesign for concurrent recommendation sessions.

## Source coverage

- `apps/api/prisma/migrations/20260519110000_baseline/migration.sql` — 21 indexed sections: User, Dish, DishIngredient, DishStep, DishAddOptionGroup, …. Sections: apps/api/prisma/migrations/20260519110000_baseline/migration.sql (L1–154); User (L8–17); Dish (L18–31); DishIngredient (L32–44); DishStep (L45–55); DishAddOptionGroup (L56–66); DishAddOption (L67–76); DishHistory (L77–87)
- `apps/api/prisma/migrations/20260519111000_dish_type_archive_creator/migration.sql` — 1 indexed section: Dish. Sections: apps/api/prisma/migrations/20260519111000_dish_type_archive_creator/migration.sql (L1–9); Dish (L5–9)
- `apps/api/prisma/migrations/20260519204000_backfill_dish_type_vegan/migration.sql` — sql file migration.sql. Sections: apps/api/prisma/migrations/20260519204000_backfill_dish_type_vegan/migration.sql (L1–6)
- `apps/api/prisma/migrations/20260520120000_user_sessions_auth/migration.sql` — 4 indexed sections: UserSession, UserSession_tokenHash_key, UserSession_userId_expiresAt_idx, UserSession. Sections: apps/api/prisma/migrations/20260520120000_user_sessions_auth/migration.sql (L1–18); UserSession (L1–11); UserSession_tokenHash_key (L12–12); UserSession_userId_expiresAt_idx (L13–14); UserSession (L15–18)
- `apps/api/prisma/migrations/20260520133000_user_password_hash/migration.sql` — 1 indexed section: User. Sections: apps/api/prisma/migrations/20260520133000_user_password_hash/migration.sql (L1–2); User (L1–2)
- `apps/api/prisma/migrations/20260606120000_api_quality_indexes/migration.sql` — 4 indexed sections: Dish_status_archivedAt_dishType_createdAt_idx, Dish_createdById_archivedAt_idx, DishHistory_userId_clickIdx_idx, DishHistory_dishId_shownAt_idx. Sections: apps/api/prisma/migrations/20260606120000_api_quality_indexes/migration.sql (L1–12); Dish_status_archivedAt_dishType_createdAt_idx (L1–3); Dish_createdById_archivedAt_idx (L4–6); DishHistory_userId_clickIdx_idx (L7–9); DishHistory_dishId_shownAt_idx (L10–12)
- `apps/api/prisma/migrations/migration_lock.toml` — toml file migration_lock.toml. Sections: apps/api/prisma/migrations/migration_lock.toml (L1–2)
- `apps/api/prisma/schema.prisma` — 16 indexed sections: client, db, DishSource, DishStatus, DishType, …. Sections: apps/api/prisma/schema.prisma (L1–156); client (L1–4); db (L5–9); DishSource (L10–15); DishStatus (L16–21); DishType (L22–27); User (L28–38); UserSession (L39–51)

## Graph relations

- Depends on: [Workspace runtime and tooling](RandoMeal--Tooling--Workspace)
- Related: [Target product data model](RandoMeal--Data--Target-Model), [Seed and legacy content](RandoMeal--Data--Seed-Content), [Current authentication and sessions](RandoMeal--Backend--Auth-Sessions)
- Supersedes: none
- Superseded by: [Target product data model](RandoMeal--Data--Target-Model)

## Retrieval tags

`prisma` · `postgresql` · `schema` · `migration` · `database` · `база данных` · `модель`
