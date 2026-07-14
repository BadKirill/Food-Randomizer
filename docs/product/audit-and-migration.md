# Current-state audit and migration matrix

Audit date: 2026-07-13

Baseline commit: `abcac59`

## 0. Discovery correction (2026-07-14)

The new discovery package changes the product constraint, not the core stack decision:

- individual features are not differentiation; the wedge is a fast, trusted and explainable meal
  decision for a constrained current situation;
- one recommendation is an open H3 hypothesis, not a fixed requirement;
- ranking, storage and API must support an exposure of 1-3 results, while a server policy selects
  single, shortlist or hybrid presentation;
- feed/search remains a research control, not the default target UX;
- Pantry-first is a separate H7 pivot hypothesis and must not be confused with choice cardinality;
- the supplied Recipe Audit contains no current catalog export, so content readiness remains
  unverified and every displayed coverage count is currently zero.

No frontend rewrite beyond baseline instrumentation and reversible foundations should assume an
H3 outcome before Decision Gate D0.

## 1. Verified baseline

- npm workspace monorepo with `apps/api`, `apps/mobile`, and `packages/contracts`.
- API build passes; API unit tests pass: 27/27.
- Mobile TypeScript check passes; mobile tests pass: 8/8.
- CI builds and tests API against PostgreSQL 16, runs mobile tests/typecheck, and checks an
  app-to-API contract flow.
- Production deploy builds an API image in CI and deploys to an Oracle VM.
- Current machine has system Node 14/npm 6 although the repository requires Node >=20.19.4.
  Development commands are unreliable until the runtime is pinned/activated.

## 2. Reuse / refactor / replace

| Existing asset                     | Decision                              | Reason / target action                                                                                                                      |
| ---------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Monorepo and workspaces            | Reuse                                 | Correct size and split-ready.                                                                                                               |
| NestJS API                         | Reuse + refactor                      | Convert flat providers into bounded modules; preserve routes during migration.                                                              |
| PostgreSQL + Prisma migrations     | Reuse                                 | Add product schema with expand/migrate/contract.                                                                                            |
| `Dish`, ingredients, steps, images | Reuse data + remodel                  | Preserve IDs/ownership; normalize ingredients and enrich canonical recipe fields.                                                           |
| Randomizer logic                   | Reuse tests/intent, replace algorithm | Current selection is uniform random and public history is empty; build persisted sessions, hard filters, scoring and controlled randomness. |
| Auth/session implementation        | Reuse + harden                        | Add product identity merge, Argon2id, RBAC and deletion workflow.                                                                           |
| Ownership rules                    | Reuse                                 | Apply to private recipes; move common-content editing to admin RBAC.                                                                        |
| Shared Zod package                 | Reuse + split by domain               | It is the correct boundary, but one file will not scale.                                                                                    |
| API error filter                   | Reuse + standardize                   | Move to stable problem codes and correlation IDs.                                                                                           |
| Request logger                     | Replace implementation                | Structured redacted logs, latency and trace correlation are required.                                                                       |
| Docker/Oracle deployment           | Reuse for beta                        | Add worker, backups, restore checks and observability; plan managed DB transition.                                                          |
| `App.tsx` (618 lines)              | Incrementally replace                 | Too much orchestration/state; keep legacy flow behind a flag while features move.                                                           |
| `theme/index.ts` (755 lines)       | Extract and evolve                    | Preserve visual values selectively; move tokens and components to shared design system.                                                     |
| `ManageScreen` (527 lines)         | Move, then replace UX                 | User recipe flow goes to Saved; common catalog admin becomes a separate web surface.                                                        |
| `RandomScreen`                     | Use as legacy fallback                | New Home/recommendation flow is a separate feature, not an in-place rewrite.                                                                |
| SecureStore session hook           | Reuse                                 | Extend with anonymous identity and account merge.                                                                                           |
| Current two-tab navigation         | Replace                               | Target tabs are Home, Saved, Pantry and Profile.                                                                                            |
| Existing tests                     | Reuse as regression suite             | Add domain invariants, contract tests, E2E and migration tests.                                                                             |
| Existing seed recipes              | Preserve but quarantine               | Content is free-form and heavily vegan-biased; audit, deduplicate, normalize and verify before recommendation eligibility.                  |
| Existing design document           | Supersede gradually                   | Current Starbucks/green direction conflicts with the later warm non-green product direction and lacks required states/screens.              |

`Random` is retained only as a legacy route/event namespace. Launch copy should describe the
outcome (a trusted decision) rather than the internal selection mechanism.

## 3. Critical gaps against the PRD

1. No guest identity or anonymous history; public random choices cannot personalize or prevent
   repeats across requests.
2. No profile, allergen, exclusions, meal/time/goal/equipment model.
3. Dish data lacks normalized ingredients, meal tags, time, servings, nutrition, allergens,
   equipment, quality and verification state.
4. No recommendation session/recommendation/interaction audit trail or reproducible scoring.
5. No favorites, cooking sessions, preference learning or permanent hide.
6. No analytics SDK, canonical event schema, event outbox, dashboards or consent controls.
7. No feature configuration, entitlements, plan state, usage counters or idempotent reservation.
8. AI is an interface only; no provider adapter, variants, validation, safety, cost or job model.
9. No Pantry, object upload pipeline, photo privacy flow or recognition confirmation.
10. Mobile has no real navigation architecture, i18n, server-state layer, offline model or complete
    accessibility contract.
11. CI lacks lint/typecheck for contracts, migration compatibility, mobile binary E2E, security
    scanning, load smoke tests and release observability checks.

## 4. Migration slices

### Slice A - foundation without UX change

- pin local runtime;
- add v2 contracts, anonymous identity and correlation headers;
- add product identity, profile, config, entitlement, usage, recommendation and event tables;
- dual-write the current Random flow to recommendation/session/events;
- introduce exposure-compatible persistence without changing the legacy screen cardinality;
- install PostHog/Sentry disabled when configuration is absent;
- expose `/v1/config`, `/v1/entitlements`, `/v1/usage`;
- keep current UI and production behavior.

### Slice B - canonical content

- add normalized ingredient/taxonomy tables and enriched dish columns;
- build idempotent import/backfill tooling;
- generate content completeness and coverage reports;
- exclude unverified dishes from the new engine only;
- provide admin review workflow before deleting or merging data.

### Slice C - new mobile shell

- introduce Expo Router and providers;
- add new Home and recommendation flow behind `new_home`;
- render the D0-approved presentation mode from the shared 1-3 result exposure contract;
- migrate auth/profile/saved screens feature by feature;
- retain `legacy_mvp` rollback until beta gates pass.

### Slice D - learning and monetization foundation

- interactions, favorites, cooking history and explicit/learned preference controls;
- server entitlements and atomic usage reservation;
- fake doors and Premium preview only; no store purchases yet.

### Slice E - AI and Pantry

- immutable recipe variants, async AI jobs, validation and cost accounting;
- manual Pantry before photo recognition;
- object storage and privacy/deletion controls before accepting photos.

## 5. Data content risks

The seed catalog is not production-ready. It contains free-form ingredient names/amounts, mixed
units, recipe alternatives inside canonical recipes, and a narrow vegan distribution. Before the
new engine is enabled, produce:

- duplicate groups and proposed canonical IDs;
- parse success/failure report for every ingredient;
- missing required field report;
- hard-constraint verification report;
- `Diet x Meal type x Time x Goal` coverage matrix;
- image licensing/attribution report;
- reviewer identity and verification timestamp.

Do not infer allergen safety solely from dish labels or an LLM. Uncertain content is ineligible.

## 6. Immediate repository hygiene

- Pin Node and package manager and fail fast in preflight.
- Split generated build output from source and keep it untracked.
- Add CODEOWNERS for migrations, contracts, analytics and security-sensitive modules.
- Add PR template fields for migration, event, feature flag, privacy and rollback impact.
- Protect `main`; require API, mobile, migration and critical E2E checks.
