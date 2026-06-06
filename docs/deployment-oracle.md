# Oracle Deployment Guide (API + DB)

## Recommended production topology
- Keep `apps/mobile` as client project.
- Build `apps/api` image in GitHub Actions and push it to GitHub Container Registry.
- Deploy `apps/api` to Oracle VM by pulling the prebuilt Docker image.
- Use PostgreSQL reachable from the API container. Current low-cost setup can use a PostgreSQL Docker container on the same VM.
- Keep AI keys and DB credentials only on backend env.

## 1) Prepare Oracle VM
```bash
bash ./scripts/oracle-vm-bootstrap.sh
```

## 2) Configure production environment (`apps/api/.env.prod`)
Create this file on the server only, or let GitHub Actions write it from the `API_ENV_PROD` secret. Do not commit real `.env` files to Git.
See `docs/environment.md` for the full env-file safety rules.

Set real values:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://<user>:<password_encoded>@<db-private-ip>:5432/food_randomizer?schema=public
CORS_ORIGINS=https://randomeal.app,https://www.randomeal.app
DISHES_WRITE_TOKEN=<your-long-random-write-token>
SESSION_SECRET=<your-long-random-session-secret>
AUTH_LOGIN_RATE_LIMIT=10
AUTH_REGISTER_RATE_LIMIT=5
AUTH_RATE_LIMIT_WINDOW_MS=900000
```

If PostgreSQL runs in Docker on the same VM and exposes port `5432` to the host, use:

```env
DATABASE_URL=postgresql://<user>:<password_encoded>@host.docker.internal:5432/food_randomizer?schema=public
```

`docker-compose.prod.yml` maps `host.docker.internal` to the Linux Docker host gateway for the API container.

### Important: URL-encode special password characters
If password contains symbols like `#` or `!`, encode them in `DATABASE_URL`:
- `#` -> `%23`
- `!` -> `%21`

Example:
- Real password: `<password-with-#-and-!>`
- Encoded in URL: `<password-with-%23-and-%21>`

## 3) Deploy API container
```bash
export API_IMAGE=ghcr.io/badkirill/food-randomizer-api:latest
docker login ghcr.io
bash scripts/deploy-api.sh
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

## 5) Verify DB connectivity
On API VM:
```bash
grep DATABASE_URL apps/api/.env.prod
docker compose -f docker-compose.prod.yml run --rm api sh -lc 'nc -zv host.docker.internal 5432 || true'
docker compose -f docker-compose.prod.yml logs --tail=50 api
```

Expected logs should show Prisma connecting to the DB host from `DATABASE_URL`.

## 6) Public API reachability
From your local machine:
```bash
curl http://<api-public-ip>:3000/health
```

If it fails, allow inbound TCP `3000` in OCI security rules for your source IP.

## 7) Runtime details now reflected in repo
- API startup command is configured in `docker-compose.prod.yml`:
  - `npm run prisma:migrate:deploy && node dist/apps/api/src/main.js`
- API image is configured in `docker-compose.prod.yml`:
  - `${API_IMAGE:-ghcr.io/badkirill/food-randomizer-api:latest}`
- `apps/api/package.json` includes required runtime deps for `ValidationPipe`:
  - `class-validator`
  - `class-transformer`

## 8) Automatic deployment from GitHub to Oracle VM
This repo includes `/.github/workflows/deploy.yml`:
- trigger: successful `CI` on `main` (or manual run)
- action:
  - build and push API image to GitHub Container Registry
  - SSH into API VM
  - reset server repo to `origin/main`
  - write `apps/api/.env.prod` from secret
  - log in to GitHub Container Registry
  - pull the prebuilt image and start the service

### Required GitHub Actions secrets
Set these in: `GitHub -> Settings -> Secrets and variables -> Actions`

- `OCI_API_HOST` (example: `92.5.190.116`)
- `OCI_API_USER` (example: `ubuntu`)
- `OCI_API_SSH_KEY` (private SSH key content, multiline)
- `OCI_API_SSH_PORT` (optional, usually `22`)
- `API_ENV_PROD` (full multiline content of `apps/api/.env.prod`)
- `DEPLOY_REPO_TOKEN` (token with read access to this repository for the VM deploy pull)

Example `API_ENV_PROD` value:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://<user>:<password_encoded>@<db-host>:5432/food_randomizer?schema=public
CORS_ORIGINS=https://randomeal.app,https://www.randomeal.app
DISHES_WRITE_TOKEN=<your-long-random-write-token>
SESSION_SECRET=<your-long-random-secret>
```

For the current same-VM Docker PostgreSQL setup, set `<db-host>` to `host.docker.internal`, not the old OCI managed DB private IP.

### Notes
- Production `apps/api/.env.prod` is intentionally injected from GitHub Secrets during deploy.
- Local `.env.dev` and `.env.prod` files are intentionally ignored by Git. Use `.env.example` files as templates.
- `scripts/deploy-api.sh` pulls the image from `API_IMAGE`, runs `docker compose ... up -d --no-build api`, and health checks `/health`.
- Oracle should not run `npm ci` or build the API image during normal deploys anymore.
- Because deploy uses `git reset --hard origin/main`, local ad-hoc server edits are discarded on every deploy.

## Split-ready structure
This monorepo can be split later with minimal work:
- Frontend repo candidate: `apps/mobile`
- Backend repo candidate: `apps/api`
- Shared contracts can remain package or move to API repo.
