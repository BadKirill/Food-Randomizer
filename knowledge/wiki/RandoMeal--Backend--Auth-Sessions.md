# Current authentication and sessions

Email/password auth, opaque bearer sessions stored as secret-derived SHA-256 hashes, guards, current-user decorators, and in-memory IP rate limiting.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Session tokens are opaque and only derived hashes are stored in PostgreSQL.
- Password hashing uses the current synchronous scrypt implementation and needs a separately planned upgrade if changed.
- The in-memory rate limiter is process-local and resets on restart, so it is not a distributed production control.
- Auth changes require unit, mocked E2E, real database E2E, and mobile session regression coverage.

## Source coverage

- `apps/api/prisma/migrations/20260520120000_user_sessions_auth/migration.sql` — 4 indexed sections: UserSession, UserSession_tokenHash_key, UserSession_userId_expiresAt_idx, UserSession. Sections: apps/api/prisma/migrations/20260520120000_user_sessions_auth/migration.sql (L1–18); UserSession (L1–11); UserSession_tokenHash_key (L12–12); UserSession_userId_expiresAt_idx (L13–14); UserSession (L15–18)
- `apps/api/prisma/migrations/20260520133000_user_password_hash/migration.sql` — 1 indexed section: User. Sections: apps/api/prisma/migrations/20260520133000_user_password_hash/migration.sql (L1–2); User (L1–2)
- `apps/api/src/common/auth-rate-limit.guard.spec.ts` — 2 indexed sections: AuthRateLimitGuard, blocks repeated login attempts from the same IP. Sections: apps/api/src/common/auth-rate-limit.guard.spec.ts (L1–29); AuthRateLimitGuard (L4–10); blocks repeated login attempts from the same IP (L11–29)
- `apps/api/src/common/auth-rate-limit.guard.ts` — 2 indexed sections: AttemptBucket, AuthRateLimitGuard. Sections: apps/api/src/common/auth-rate-limit.guard.ts (L1–64); AttemptBucket (L10–12); AuthRateLimitGuard (L13–64)
- `apps/api/src/common/auth.guard.spec.ts` — 2 indexed sections: AuthGuard, attaches authUser and authSessionId to request. Sections: apps/api/src/common/auth.guard.spec.ts (L1–42); AuthGuard (L4–25); attaches authUser and authSessionId to request (L26–42)
- `apps/api/src/common/auth.guard.ts` — 1 indexed section: AuthGuard. Sections: apps/api/src/common/auth.guard.ts (L1–31); AuthGuard (L9–31)
- `apps/api/src/common/current-session-id.decorator.ts` — 1 indexed section: CurrentSessionId. Sections: apps/api/src/common/current-session-id.decorator.ts (L1–12); CurrentSessionId (L3–12)
- `apps/api/src/common/current-user.decorator.ts` — 2 indexed sections: AuthUser, CurrentUser. Sections: apps/api/src/common/current-user.decorator.ts (L1–18); AuthUser (L3–7); CurrentUser (L8–18)
- `apps/api/src/modules/auth/auth.controller.ts` — 3 HTTP routes: POST /auth/register, POST /auth/login, POST /auth/logout. Sections: apps/api/src/modules/auth/auth.controller.ts (L1–43); AuthController (L19–43)
- `apps/api/src/modules/auth/auth.service.spec.ts` — 7 indexed sections: AuthService, register creates lowercase email user and returns session token, login rejects invalid credentials, register returns readable conflict for existing email, getSessionFromBearerHeader rejects missing bearer token, …. Sections: apps/api/src/modules/auth/auth.service.spec.ts (L1–129); AuthService (L5–34); register creates lowercase email user and returns session token (L35–56); login rejects invalid credentials (L57–64); register returns readable conflict for existing email (L65–77); getSessionFromBearerHeader rejects missing bearer token (L78–87); getSessionFromBearerHeader rejects unknown, revoked, and expired sessions (L88–114); getSessionFromBearerHeader returns active session (L115–129)
- `apps/api/src/modules/auth/auth.service.ts` — 3 indexed sections: LoginInput, RegisterInput, AuthService. Sections: apps/api/src/modules/auth/auth.service.ts (L1–139); LoginInput (L6–10); RegisterInput (L11–18); AuthService (L19–139)

## Graph relations

- Depends on: [Current backend bootstrap and cross-cutting behavior](RandoMeal--Backend--Bootstrap), [Current Prisma data model](RandoMeal--Data--Current-Prisma)
- Related: [Current mobile API and authentication](RandoMeal--Mobile--API-Auth), [Target API v2 contract](RandoMeal--API--Target-v2)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`auth` · `session` · `bearer` · `guard` · `rate limit` · `авторизация` · `сессия`
