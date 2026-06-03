# Environment Files

Real environment files are local-only and must not be committed.

## Files kept in Git

- `.env.example`
- `apps/api/.env.example`
- `apps/mobile/.env.example`

Use these as templates only.

## Local setup

```bash
cp .env.example .env.dev
cp apps/api/.env.example apps/api/.env.dev
cp apps/mobile/.env.example apps/mobile/.env.dev
```

Then edit the copied `.env.dev` files for your machine.

## Production setup

Production values live in GitHub Actions secrets, not in the repository.

Set `API_ENV_PROD` in `GitHub -> Settings -> Secrets and variables -> Actions` with:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://<user>:<password_encoded>@<db-host>:5432/food_randomizer?schema=public
CORS_ORIGINS=https://randomeal.app,https://www.randomeal.app
DISHES_WRITE_TOKEN=<your-long-random-write-token>
SESSION_SECRET=<your-long-random-session-secret>
```

During deploy, GitHub Actions writes this secret to `apps/api/.env.prod` on the server.

## Safety check

Run this before pushing env-related changes:

```bash
npm run check:env
```

The check fails if any non-example `.env` file is tracked by Git.
