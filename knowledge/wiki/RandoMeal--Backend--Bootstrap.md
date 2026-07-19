# Current backend bootstrap and cross-cutting behavior

Flat NestJS AppModule, global Zod exception filter, request logging middleware, Prisma lifecycle service, environment validation, and process bootstrap.

Status: **current**
Authority: **current-code**

## Rules and patterns

- The current implementation is a flat module, not the target feature-module architecture.
- Controllers validate transport while services and repositories hold current behavior, though boundaries are inconsistent.
- Request logging exists but target correlation, structured observability, Sentry, and actor-safe tagging do not.
- Global exception behavior must remain compatible during contract migration.

## Source coverage

- `apps/api/src/app.controller.spec.ts` — 3 indexed sections: AppController, root, should return . Sections: apps/api/src/app.controller.spec.ts (L1–23); AppController (L5–16); root (L17–17); should return  (L18–23)
- `apps/api/src/app.controller.ts` — 1 HTTP route: GET /. Sections: apps/api/src/app.controller.ts (L1–13); AppController (L5–13)
- `apps/api/src/app.module.ts` — 1 indexed section: AppModule. Sections: apps/api/src/app.module.ts (L1–48); AppModule (L43–48)
- `apps/api/src/app.service.ts` — 1 indexed section: AppService. Sections: apps/api/src/app.service.ts (L1–9); AppService (L4–9)
- `apps/api/src/common/auth-rate-limit.guard.spec.ts` — 2 indexed sections: AuthRateLimitGuard, blocks repeated login attempts from the same IP. Sections: apps/api/src/common/auth-rate-limit.guard.spec.ts (L1–29); AuthRateLimitGuard (L4–10); blocks repeated login attempts from the same IP (L11–29)
- `apps/api/src/common/auth-rate-limit.guard.ts` — 2 indexed sections: AttemptBucket, AuthRateLimitGuard. Sections: apps/api/src/common/auth-rate-limit.guard.ts (L1–64); AttemptBucket (L10–12); AuthRateLimitGuard (L13–64)
- `apps/api/src/common/auth.guard.spec.ts` — 2 indexed sections: AuthGuard, attaches authUser and authSessionId to request. Sections: apps/api/src/common/auth.guard.spec.ts (L1–42); AuthGuard (L4–25); attaches authUser and authSessionId to request (L26–42)
- `apps/api/src/common/auth.guard.ts` — 1 indexed section: AuthGuard. Sections: apps/api/src/common/auth.guard.ts (L1–31); AuthGuard (L9–31)
- `apps/api/src/common/current-session-id.decorator.ts` — 1 indexed section: CurrentSessionId. Sections: apps/api/src/common/current-session-id.decorator.ts (L1–12); CurrentSessionId (L3–12)
- `apps/api/src/common/current-user.decorator.ts` — 2 indexed sections: AuthUser, CurrentUser. Sections: apps/api/src/common/current-user.decorator.ts (L1–18); AuthUser (L3–7); CurrentUser (L8–18)
- `apps/api/src/common/request-logger.middleware.ts` — 1 indexed section: RequestLoggerMiddleware. Sections: apps/api/src/common/request-logger.middleware.ts (L1–25); RequestLoggerMiddleware (L9–25)
- `apps/api/src/common/write-token.guard.ts` — 1 indexed section: WriteTokenGuard. Sections: apps/api/src/common/write-token.guard.ts (L1–33); WriteTokenGuard (L11–33)
- `apps/api/src/common/zod-exception.filter.spec.ts` — 3 indexed sections: ZodExceptionFilter, returns readable validation details, recognizes Zod-like errors from shared package copies. Sections: apps/api/src/common/zod-exception.filter.spec.ts (L1–48); ZodExceptionFilter (L5–5); returns readable validation details (L6–27); recognizes Zod-like errors from shared package copies (L28–48)
- `apps/api/src/common/zod-exception.filter.ts` — 3 indexed sections: ZodLikeError, isZodLikeError, ZodExceptionFilter. Sections: apps/api/src/common/zod-exception.filter.ts (L1–69); ZodLikeError (L11–14); isZodLikeError (L15–24); ZodExceptionFilter (L25–69)
- `apps/api/src/main.ts` — 3 indexed sections: parseCorsOrigins, assertRequiredEnv, bootstrap. Sections: apps/api/src/main.ts (L1–49); parseCorsOrigins (L5–12); assertRequiredEnv (L13–20); bootstrap (L21–49)
- `apps/api/src/prisma/prisma.service.ts` — 1 indexed section: PrismaService. Sections: apps/api/src/prisma/prisma.service.ts (L1–17); PrismaService (L5–17)

## Graph relations

- Depends on: [Current Prisma data model](RandoMeal--Data--Current-Prisma)
- Related: [Target product architecture](RandoMeal--Architecture--Target), [Current authentication and sessions](RandoMeal--Backend--Auth-Sessions), [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface)
- Supersedes: none
- Superseded by: [Target product architecture](RandoMeal--Architecture--Target)

## Retrieval tags

`nestjs` · `app module` · `bootstrap` · `middleware` · `prisma service` · `бэкенд`
