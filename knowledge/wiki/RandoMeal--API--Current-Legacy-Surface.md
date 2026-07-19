# Current legacy API surface

Unversioned NestJS auth, dishes, randomizer, health, and root routes with local Zod parsing; legacy API documentation contains unimplemented target claims.

Status: **mixed**
Authority: **current-code-over-legacy-docs**

## Rules and patterns

- Current controller code is authoritative for implemented routes; docs/api-spec.md is not.
- Current routes have no global /v1 prefix, OpenAPI surface, or problem+json envelope.
- Controller-local Zod schemas and the shared exception filter define current transport validation behavior.
- The live mobile/API contract script can skip when TEST_API_BASE_URL is absent and is not a standalone proof of coverage.

## Source coverage

- `apps/api/src/app.controller.ts` — 1 HTTP route: GET /. Sections: apps/api/src/app.controller.ts (L1–13); AppController (L5–13)
- `apps/api/src/modules/auth/auth.controller.ts` — 3 HTTP routes: POST /auth/register, POST /auth/login, POST /auth/logout. Sections: apps/api/src/modules/auth/auth.controller.ts (L1–43); AuthController (L19–43)
- `apps/api/src/modules/dishes/dishes.controller.ts` — 6 HTTP routes: POST /dishes, GET /dishes, GET /dishes/:dishId, PATCH /dishes/:dishId, DELETE /dishes/:dishId, POST /dishes/:dishId/unarchive. Sections: apps/api/src/modules/dishes/dishes.controller.ts (L1–197); DishesController (L50–197)
- `apps/api/src/modules/health/health.controller.ts` — 1 HTTP route: GET /health. Sections: apps/api/src/modules/health/health.controller.ts (L1–14); HealthController (L4–14)
- `apps/api/src/modules/randomizer/randomizer.controller.ts` — 2 HTTP routes: GET /random, POST /random/next. Sections: apps/api/src/modules/randomizer/randomizer.controller.ts (L1–39); RandomizerController (L14–39)
- `docs/api-spec.md` — 17 indexed sections: API Spec (v1 draft), Health, `GET /health`, Dishes, `POST /dishes`, …. Sections: docs/api-spec.md (L1–89); API Spec (v1 draft) (L1–89); Health (L5–8); `GET /health` (L6–8); Dishes (L9–22); `POST /dishes` (L10–12); `GET /dishes/:dishId` (L13–17); `GET /dishes` (L18–22)
- `scripts/test-mobile-api-contract.mjs` — javascript file test-mobile-api-contract.mjs. Sections: scripts/test-mobile-api-contract.mjs (L1–98)

## Graph relations

- Depends on: [Current backend bootstrap and cross-cutting behavior](RandoMeal--Backend--Bootstrap), [Legacy shared contracts](RandoMeal--Contracts--Legacy)
- Related: [Target API v2 contract](RandoMeal--API--Target-v2), [Current mobile API and authentication](RandoMeal--Mobile--API-Auth)
- Supersedes: none
- Superseded by: [Target API v2 contract](RandoMeal--API--Target-v2)

## Retrieval tags

`api` · `controller` · `route` · `rest` · `legacy` · `эндпоинт` · `контроллер`
