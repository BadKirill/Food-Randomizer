# Production deployment and operations

API container build, GHCR publication, Oracle VM SSH deployment, production Compose, startup migration behavior, HTTPS setup, and operational runbooks.

Status: **current**
Authority: **current-code-and-runbooks**

## Rules and patterns

- The current deployment pulls an image and updates the Oracle VM through GitHub Actions and SSH.
- Database migrations run as part of API startup and need zero-downtime compatibility discipline.
- Production secrets are injected externally and must never enter repository or knowledge content.
- Target Sentry, object storage, worker, PostHog, and RevenueCat operations are not current infrastructure.

## Source coverage

- `.github/workflows/deploy.yml` — 72 indexed sections: name, on, workflow_run, workflows, types, …. Sections: .github/workflows/deploy.yml (L1–134); name (L1–2); on (L3–9); workflow_run (L4–7); workflows (L5–5); types (L6–6); branches (L7–7); workflow_dispatch (L8–9)
- `apps/api/Dockerfile` — 22 indexed sections: FROM, COPY, COPY, COPY, COPY, …. Sections: apps/api/Dockerfile (L1–40); FROM (L1–3); COPY (L4–4); COPY (L5–7); COPY (L8–8); COPY (L9–10); RUN (L11–13); COPY (L14–14)
- `docker-compose.prod.yml` — 14 indexed sections: services, api, image, env_file, command, …. Sections: docker-compose.prod.yml (L1–18); services (L1–18); api (L2–18); image (L3–3); env_file (L4–5); command (L6–6); extra_hosts (L7–8); ports (L9–10)
- `docs/deployment-oracle.md` — 14 indexed sections: Oracle Deployment Guide (API + DB), Recommended production topology, 1) Prepare Oracle VM, 2) Configure production environment (`apps/api/.env.prod`), Important: URL-encode special password characters, …. Sections: docs/deployment-oracle.md (L1–140); Oracle Deployment Guide (API + DB) (L1–140); Recommended production topology (L3–9); 1) Prepare Oracle VM (L10–14); 2) Configure production environment (`apps/api/.env.prod`) (L15–48); Important: URL-encode special password characters (L40–48); 3) Deploy API container (L49–55); 4) Verify deployment (L56–67)
- `docs/https-nginx-letsencrypt.md` — 10 indexed sections: API HTTPS Setup (Nginx + Let's Encrypt), 1) DNS, 2) Keep API internal in Docker, 3) Install Nginx + Certbot on server, 4) Nginx reverse proxy config, …. Sections: docs/https-nginx-letsencrypt.md (L1–81); API HTTPS Setup (Nginx + Let's Encrypt) (L1–81); 1) DNS (L5–8); 2) Keep API internal in Docker (L9–12); 3) Install Nginx + Certbot on server (L13–18); 4) Nginx reverse proxy config (L19–44); 5) Issue TLS certificate (L45–51); 6) Firewall / OCI security list (L52–57)
- `docs/releases/v0.2.0.md` — 7 indexed sections: Release v0.2.0, Included scope, Runtime endpoints, Required secrets (names only), API_ENV_PROD required keys, …. Sections: docs/releases/v0.2.0.md (L1–42); Release v0.2.0 (L1–42); Included scope (L7–11); Runtime endpoints (L12–15); Required secrets (names only) (L16–23); API_ENV_PROD required keys (L24–31); Smoke checks after deploy (L32–38); Rollback (L39–42)
- `scripts/deploy-api.sh` — shell file deploy-api.sh. Sections: scripts/deploy-api.sh (L1–64)
- `scripts/oracle-vm-bootstrap.sh` — shell file oracle-vm-bootstrap.sh. Sections: scripts/oracle-vm-bootstrap.sh (L1–23)

## Graph relations

- Depends on: [Workspace runtime and tooling](RandoMeal--Tooling--Workspace), [Current Prisma data model](RandoMeal--Data--Current-Prisma)
- Related: [Continuous integration and test runners](RandoMeal--Delivery--CI), [Target product architecture](RandoMeal--Architecture--Target)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`deploy` · `docker` · `oracle` · `ghcr` · `https` · `production` · `деплой` · `прод`
