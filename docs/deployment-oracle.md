# Oracle Deployment Guide (API + DB)

## Recommended production topology
- Keep `apps/mobile` as client project.
- Deploy `apps/api` to Oracle VM (Docker container).
- Use Oracle managed PostgreSQL in private subnet.
- Keep AI keys and DB credentials only on backend env.

## 1) Prepare Oracle VM
```bash
bash ./scripts/oracle-vm-bootstrap.sh
```

## 2) Configure production environment (`apps/api/.env.prod`)
Set real values:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://<user>:<password_encoded>@<db-private-ip>:5432/food_randomizer?schema=public
CORS_ORIGINS=http://<api-public-ip>:8081
```

### Important: URL-encode special password characters
If password contains symbols like `#` or `!`, encode them in `DATABASE_URL`:
- `#` -> `%23`
- `!` -> `%21`

Example:
- Real password: `Qw45#531RemR4m!`
- Encoded in URL: `Qw45%23531RemR4m%21`

## 3) Deploy API container
```bash
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build api
```

## 4) Verify deployment
```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs --tail=100 api
curl http://localhost:3000/health
```

Expected health response:
```json
{"status":"ok","service":"food-randomizer-api"}
```

## 5) Verify DB is used over private VCN
On API VM:
```bash
grep DATABASE_URL apps/api/.env.prod
nc -zv <db-private-ip> 5432
docker compose -f docker-compose.prod.yml logs --tail=50 api
```

Expected logs should show Prisma connecting to private IP (for example `10.x.x.x:5432`).

## 6) Public API reachability
From your local machine:
```bash
curl http://<api-public-ip>:3000/health
```

If it fails, allow inbound TCP `3000` in OCI security rules for your source IP.

## 7) Runtime details now reflected in repo
- API startup command is configured in `docker-compose.prod.yml`:
  - `npm run prisma:migrate:deploy && node dist/apps/api/src/main.js`
- `apps/api/package.json` includes required runtime deps for `ValidationPipe`:
  - `class-validator`
  - `class-transformer`

## Split-ready structure
This monorepo can be split later with minimal work:
- Frontend repo candidate: `apps/mobile`
- Backend repo candidate: `apps/api`
- Shared contracts can remain package or move to API repo.
