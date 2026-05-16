# Oracle Deployment Guide (API + DB)

## Recommended production topology
- Keep `apps/mobile` as client project.
- Deploy `apps/api` to Oracle VM (Docker container).
- Use managed PostgreSQL if available, otherwise PostgreSQL on separate Oracle VM.
- Keep AI keys and DB credentials only on backend env.

## 1) Prepare Oracle VM
```bash
bash ./scripts/oracle-vm-bootstrap.sh
```

## 2) Configure production environment
Copy and edit API env:
```bash
cp apps/api/.env.prod apps/api/.env.prod.local
```
Set real values for:
- `DATABASE_URL`
- `CORS_ORIGINS`
- `PORT` (optional)

Then replace `apps/api/.env.prod` on server with your secure value source.

## 3) Deploy API container
```bash
bash ./scripts/deploy-api.sh
```

## 4) Verify
- Health endpoint: `GET /health`
- Logs:
```bash
docker compose -f docker-compose.prod.yml logs -f api
```

## 5) Database migrations during deploy
`start:prod:migrate` runs `prisma migrate deploy` before starting API.

## Split-ready structure
This monorepo can be split later with minimal work:
- Frontend repo candidate: `apps/mobile`
- Backend repo candidate: `apps/api`
- Shared contracts can remain package or move to API repo.
