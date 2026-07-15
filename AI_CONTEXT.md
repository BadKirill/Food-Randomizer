# AI Context

## Project

Food Randomizer, also called Randomeal, is a mobile-first app for picking a meal when the user cannot decide what to eat.

For all product-v2 work, read `docs/product/README.md` and its linked architecture, data, API,
analytics, quality, migration and delivery documents before changing code. They supersede the MVP
mental model where the documents differ.

The core idea must stay simple:

- A big circular `Random` button on the main screen picks a dish.
- Users can filter by dish type: `all`, `usual`, `vegetarian`, `vegan`.
- Random choosing should work without login.
- Dish management requires login.
- The app should feel cozy, light, food-related, and friendly, not dark/neon or generic-modern.

## Product Rules

- Keep the big random circle and the two-tab concept: `Random` and `Manage`.
- Random flow is public.
- Manage flow is authenticated.
- Only the creator of a dish can edit, archive, or unarchive it.
- Legacy dishes with no creator are locked from edit/archive unless manually assigned a creator.
- Errors shown to users should be readable and friendly, not raw `500`, `502`, or technical text.
- Ownership errors should appear before opening edit mode when possible.
- Mobile UI must respect iOS safe areas, including Dynamic Island/notch/header zones.

## Architecture

This is an npm workspace monorepo.

- `apps/api`: NestJS API.
- `apps/mobile`: Expo React Native mobile app.
- `packages/contracts`: shared API/mobile contracts and types.
- `docs`: operational and architecture documentation.

The mobile app talks only to the API. It should never connect directly to PostgreSQL.

Production API URL:

- `https://api.randomeal.app`

Production app domain:

- `https://randomeal.app`
- `https://www.randomeal.app`

## Stack

API:

- Node.js `>=20.19.4`
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Jest and Supertest for tests
- Zod / validation helpers for readable errors

Mobile:

- Expo SDK 54
- React Native
- TypeScript
- React
- `expo-secure-store` for persisted session tokens
- `react-native-safe-area-context` for iOS/Android safe areas
- Jest and React Native Testing Library

Infrastructure:

- Oracle VM
- Docker / Docker Compose
- PostgreSQL in Docker on the VM
- Nginx reverse proxy
- Let's Encrypt TLS
- GitHub Actions for CI and deploy

## Production Database

The old Oracle managed PostgreSQL database was replaced by PostgreSQL running in Docker on the Oracle VM.

Current production DB concept:

- Docker container: `fr-postgres`
- Database: `food_randomizer`
- User: `pgadmin`
- API container reaches DB through Docker/host networking, commonly via `host.docker.internal`.

Do not put real passwords in committed files.

`DATABASE_URL` lives in:

- GitHub secret `API_ENV_PROD`
- Server file `apps/api/.env.prod`

Prisma URLs may include `?schema=public`, but raw `pg_dump` and some PostgreSQL CLI tools may reject that query parameter.

## Deployment

API deployment uses:

- `docker-compose.prod.yml`
- `scripts/deploy-api.sh`
- GitHub Actions workflow in `.github/workflows/deploy.yml`

The deploy flow should:

- Validate production env.
- Pull or use the API Docker image.
- Start/restart the API service.
- Health-check `http://127.0.0.1:3000/health`.
- Expose production through Nginx at `https://api.randomeal.app/health`.

Past deployment bottleneck:

- Building `npm ci` directly on the small Oracle VM can be very slow.
- Prefer CI-built images and server-side pull/start where possible.

## Auth And Ownership

Implemented direction:

- Random picking can be anonymous.
- Login/register create a real user session.
- Mobile persists session securely.
- Logout should revoke/clear the session.
- Managing dishes requires auth.
- Dish lists include ownership metadata where needed.
- Only creators can mutate their dishes.

Important UX behavior:

- Do not let a random non-creator enter edit mode for someone else's dish.
- Show clear toast/popup-style messages for ownership failures.
- Registering with existing credentials should show a readable duplicate-account error.

## UI And Design

Use `DESIGN.md` as the design source of truth.

Current visual direction:

- Cozy food picker.
- Warm cream backgrounds.
- Soft orange/brown accents.
- Food-inspired playful details.
- Clear typography and large tappable controls.
- Avoid green as primary active text color unless intentionally used as a small food accent.

Important screens/components:

- `RandomScreen`
- `ManageScreen`
- `DishModal`
- `AuthPanel`
- shared API client in `apps/mobile/src/api`
- shared theme/styles in `apps/mobile/src/theme`
- auth/session hook, e.g. `useAuthSession`

## iOS Context

Android has been working well.

iOS-specific lessons:

- Debug builds need Metro reachable from the device.
- If Metro is not reachable, iOS shows `No script URL provided`.
- Release builds embed the JS bundle and should not depend on Metro.
- The app must use safe-area handling so controls are not hidden behind the notch/Dynamic Island/status bar.
- Local network permission may be needed for iOS debug builds that connect to Metro on LAN.

Recent iOS-related setup included:

- `SafeAreaProvider`
- safe-area-aware layout
- iOS local network usage strings in app config
- Xcode/Expo build fixes around local environment

## Common Commands

From repo root:

```sh
npm run dev:api
npm run dev:mobile
npm run dev:db
npm run build:api
npm run test --workspace apps/mobile -- --runInBand
npm run test:e2e --workspace apps/api
npm run test:contract:mobile-api
```

Production server checks:

```sh
curl -i http://127.0.0.1:3000/health
curl -i https://api.randomeal.app/health
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs --tail=120 api
docker ps
```

## Git Workflow Preference

For code changes:

- Always create a new branch.
- Commit changes.
- Push branch.
- Open a PR.
- Do not push directly to `main`.

For small requested docs-only local files, it is acceptable to create the file first and wait for the user to ask for PR.

## Good Places To Look First

- `README.md`: project overview and commands.
- `DESIGN.md`: visual rules.
- `docs/architecture.md`: architecture details.
- `docs/environment.md`: environment variables.
- `docs/api-spec.md`: API behavior.
- `docs/deployment-oracle.md`: Oracle VM deployment notes.
- `apps/mobile/App.tsx` and `apps/mobile/src`: mobile app entry and extracted modules.
- `apps/api/src`: API source.
- `apps/api/prisma/schema.prisma`: database model.

## Current Mental Model

This project is past the MVP stage and is now focused on making the product reliable and pleasant:

- Stable deploys.
- Safe production env handling.
- Public random flow.
- Authenticated management.
- Clear errors.
- Ownership safety.
- Cozy product polish.
- Working Android and iOS builds.
