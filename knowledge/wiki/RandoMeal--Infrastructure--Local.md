# Local runtime and environment

Local PostgreSQL Docker Compose, API and mobile environment examples, runtime safety checks, and development setup documentation.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Environment examples may expose key names and roles but never real secret values.
- PostgreSQL 16 is the supported local and CI baseline.
- Mobile cleartext development policy is controlled by app.config.ts and must align with its environment documentation.
- Secrets and local environment files remain ignored and outside the knowledge index.

## Source coverage

- `.env.example` — 6 indexed sections: NODE_ENV, PORT, CORS_ORIGINS, DISHES_WRITE_TOKEN, SESSION_SECRET, …. Sections: .env.example (L1–10); NODE_ENV (L2–2); PORT (L3–3); CORS_ORIGINS (L4–4); DISHES_WRITE_TOKEN (L5–5); SESSION_SECRET (L6–8); DATABASE_URL (L9–10)
- `.gitignore` — configuration file .gitignore. Sections: .gitignore (L1–41)
- `apps/api/.dockerignore` — configuration file .dockerignore. Sections: apps/api/.dockerignore (L1–7)
- `apps/api/.env.example` — 9 indexed sections: NODE_ENV, PORT, DATABASE_URL, SESSION_SECRET, CORS_ORIGINS, …. Sections: apps/api/.env.example (L1–10); NODE_ENV (L1–1); PORT (L2–2); DATABASE_URL (L3–3); SESSION_SECRET (L4–4); CORS_ORIGINS (L5–5); DISHES_WRITE_TOKEN (L6–6); AUTH_LOGIN_RATE_LIMIT (L7–7)
- `apps/mobile/.env.example` — 2 indexed sections: EXPO_PUBLIC_API_BASE_URL, EXPO_PUBLIC_DEFAULT_LOGIN_EMAIL. Sections: apps/mobile/.env.example (L1–3); EXPO_PUBLIC_API_BASE_URL (L1–1); EXPO_PUBLIC_DEFAULT_LOGIN_EMAIL (L2–3)
- `apps/mobile/.gitignore` — configuration file .gitignore. Sections: apps/mobile/.gitignore (L1–42)
- `docker-compose.yml` — 13 indexed sections: services, postgres, image, container_name, restart, …. Sections: docker-compose.yml (L1–17); services (L1–14); postgres (L2–14); image (L3–3); container_name (L4–4); restart (L5–5); environment (L6–9); POSTGRES_USER (L7–7)
- `docs/environment.md` — 5 indexed sections: Environment Files, Files kept in Git, Local setup, Production setup, Safety check. Sections: docs/environment.md (L1–49); Environment Files (L1–49); Files kept in Git (L5–12); Local setup (L13–22); Production setup (L23–39); Safety check (L40–49)

## Graph relations

- Depends on: [Workspace runtime and tooling](RandoMeal--Tooling--Workspace)
- Related: [Production deployment and operations](RandoMeal--Infrastructure--Production)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`docker compose` · `environment` · `postgres` · `local` · `env` · `локальная среда`
