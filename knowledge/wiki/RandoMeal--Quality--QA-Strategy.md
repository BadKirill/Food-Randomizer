# QA, security, and release gates

Current Jest and E2E suites plus target contract, Testcontainers, Maestro, accessibility, load, security, migration, analytics, and release acceptance gates.

Status: **mixed**
Authority: **accepted-quality-design-plus-current-tests**

## Rules and patterns

- Run narrow affected tests before full relevant workspace checks.
- Current CI covers API build, unit coverage, mocked and real E2E, mobile Jest and typecheck, and a live contract smoke.
- Target release gates add deterministic recommendations, migration/backfill, analytics integrity, accessibility, Maestro, k6, ZAP, and store-build checks.
- Historical test counts and skipped smoke tests are not release evidence.

## Source coverage

- `apps/api/src/app.controller.spec.ts` — 3 indexed sections: AppController, root, should return . Sections: apps/api/src/app.controller.spec.ts (L1–23); AppController (L5–16); root (L17–17); should return  (L18–23)
- `apps/api/src/common/auth-rate-limit.guard.spec.ts` — 2 indexed sections: AuthRateLimitGuard, blocks repeated login attempts from the same IP. Sections: apps/api/src/common/auth-rate-limit.guard.spec.ts (L1–29); AuthRateLimitGuard (L4–10); blocks repeated login attempts from the same IP (L11–29)
- `apps/api/src/common/auth.guard.spec.ts` — 2 indexed sections: AuthGuard, attaches authUser and authSessionId to request. Sections: apps/api/src/common/auth.guard.spec.ts (L1–42); AuthGuard (L4–25); attaches authUser and authSessionId to request (L26–42)
- `apps/api/src/common/zod-exception.filter.spec.ts` — 3 indexed sections: ZodExceptionFilter, returns readable validation details, recognizes Zod-like errors from shared package copies. Sections: apps/api/src/common/zod-exception.filter.spec.ts (L1–48); ZodExceptionFilter (L5–5); returns readable validation details (L6–27); recognizes Zod-like errors from shared package copies (L28–48)
- `apps/api/src/modules/auth/auth.service.spec.ts` — 7 indexed sections: AuthService, register creates lowercase email user and returns session token, login rejects invalid credentials, register returns readable conflict for existing email, getSessionFromBearerHeader rejects missing bearer token, …. Sections: apps/api/src/modules/auth/auth.service.spec.ts (L1–129); AuthService (L5–34); register creates lowercase email user and returns session token (L35–56); login rejects invalid credentials (L57–64); register returns readable conflict for existing email (L65–77); getSessionFromBearerHeader rejects missing bearer token (L78–87); getSessionFromBearerHeader rejects unknown, revoked, and expired sessions (L88–114); getSessionFromBearerHeader returns active session (L115–129)
- `apps/api/src/modules/dishes/dishes.controller.spec.ts` — 7 indexed sections: DishesController ownership enforcement, passes authenticated user id when creating a dish, uses paginated repository listing when page/search is requested, returns forbidden when updating dish owned by another user, returns forbidden when archiving dish owned by another user, …. Sections: apps/api/src/modules/dishes/dishes.controller.spec.ts (L1–145); DishesController ownership enforcement (L4–23); passes authenticated user id when creating a dish (L24–52); uses paginated repository listing when page/search is requested (L53–72); returns forbidden when updating dish owned by another user (L73–93); returns forbidden when archiving dish owned by another user (L94–110); returns forbidden when unarchiving dish owned by another user (L111–127); returns forbidden when unarchiving legacy dish without creator (L128–145)
- `apps/api/src/modules/dishes/dishes.repository.spec.ts` — 6 indexed sections: DishesRepository, does not update when dish is missing, does not update when user is not owner, does not update when dish has no creator, archives only owner dishes, …. Sections: apps/api/src/modules/dishes/dishes.repository.spec.ts (L1–105); DishesRepository (L3–46); does not update when dish is missing (L47–56); does not update when user is not owner (L57–66); does not update when dish has no creator (L67–76); archives only owner dishes (L77–92); unarchives only archived dishes owned by user (L93–105)
- `apps/api/src/modules/randomizer/randomizer.service.spec.ts` — 6 indexed sections: RandomizerService, throws 404 when no dishes are available, avoids selecting the immediately previous dish, relaxes cooldown when needed and exposes meta about fallback, getNextForUser persists selection history with click index, …. Sections: apps/api/src/modules/randomizer/randomizer.service.spec.ts (L1–160); RandomizerService (L4–21); throws 404 when no dishes are available (L22–31); avoids selecting the immediately previous dish (L32–64); relaxes cooldown when needed and exposes meta about fallback (L65–97); getNextForUser persists selection history with click index (L98–133); getRandom returns a dish without reading or writing user history (L134–160)
- `apps/api/test/app.e2e-spec.ts` — 16 indexed sections: API endpoints (e2e), GET / returns hello world, GET /dishes filters by dishType, GET /dishes supports archived filter, GET /dishes supports pagination and search, …. Sections: apps/api/test/app.e2e-spec.ts (L1–425); API endpoints (e2e) (L19–201); GET / returns hello world (L202–208); GET /dishes filters by dishType (L209–223); GET /dishes supports archived filter (L224–234); GET /dishes supports pagination and search (L235–264); returns readable validation errors (L265–277); POST /dishes rejects missing auth token (L278–289)
- `apps/api/test/app.real.e2e-spec.ts` — 2 indexed sections: register -> create dish -> list -> random -> archive -> unarchive critical path, enforces ownership: another user cannot archive dish. Sections: apps/api/test/app.real.e2e-spec.ts (L1–143); register -> create dish -> list -> random -> archive -> unarchive critical path (L44–111); enforces ownership: another user cannot archive dish (L112–143)
- `apps/api/test/jest-e2e.json` — 6 indexed sections: moduleFileExtensions, rootDir, testEnvironment, testRegex, moduleNameMapper, …. Sections: apps/api/test/jest-e2e.json (L1–13); moduleFileExtensions (L2–2); rootDir (L3–3); testEnvironment (L4–4); testRegex (L5–5); moduleNameMapper (L6–8); transform (L9–13)
- `apps/api/test/jest-real-e2e.json` — 5 indexed sections: moduleFileExtensions, rootDir, testRegex, transform, testEnvironment. Sections: apps/api/test/jest-real-e2e.json (L1–10); moduleFileExtensions (L2–2); rootDir (L3–3); testRegex (L4–4); transform (L5–7); testEnvironment (L8–10)
- `apps/api/test/mocks/contracts.ts` — 1 indexed section: RandomNextRequestSchema. Sections: apps/api/test/mocks/contracts.ts (L1–7); RandomNextRequestSchema (L3–7)
- `apps/mobile/App.test.tsx` — 10 indexed sections: createJsonResponse, Mobile MVP flows, sends public random request with dishType filter when selected, restores a valid stored session, does not send create request when required fields are empty, …. Sections: apps/mobile/App.test.tsx (L1–333); createJsonResponse (L18–25); Mobile MVP flows (L26–34); sends public random request with dishType filter when selected (L35–76); restores a valid stored session (L77–91); does not send create request when required fields are empty (L92–100); loads selected dish into edit mode and shows Save Changes (L101–150); archives selected dish with DELETE request (L151–210)
- `apps/mobile/jest.config.js` — javascript file jest.config.js. Sections: apps/mobile/jest.config.js (L1–9)
- `apps/mobile/jest.setup.ts` — typescript file jest.setup.ts. Sections: apps/mobile/jest.setup.ts (L1–2)
- `docs/product/quality-and-design.md` — 10 indexed sections: Design and quality operating model, 1. Design workflow, Foundation v1, 2. QA strategy, 3. Critical invariant suite, …. Sections: docs/product/quality-and-design.md (L1–229); Design and quality operating model (L1–229); 1. Design workflow (L3–94); Foundation v1 (L54–94); 2. QA strategy (L95–116); 3. Critical invariant suite (L117–151); 4. AI evaluation (L152–167); 5. Accessibility and localization gates (L168–176)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Continuous integration and test runners](RandoMeal--Delivery--CI)
- Related: [Analytics and measurement plan](RandoMeal--Analytics--Measurement), [Design system and product quality](RandoMeal--Design--System-and-Quality)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`qa` · `tests` · `jest` · `e2e` · `maestro` · `security` · `тесты` · `качество`
