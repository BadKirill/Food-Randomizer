# RandoMeal Knowledge Graph

RandoMeal is a fast, trusted meal-decision engine. The product must move a person from uncertainty to starting to cook without a browsing feed, while preserving hard dietary safety and keeping the single-versus-shortlist interaction as an evidence gate.

## Selective reading protocol

Start with the catalog, select no more than 7 relevant nodes, then read only the listed source ranges. Use repository-wide search only when the selected packet lacks evidence.

## Coverage

- Repository files discovered: 195
- Files indexed semantically or by metadata: 195
- Binary assets indexed by metadata: 4
- Files with extracted sections: 149
- Content fingerprint: `695e6cce0b06ae28e46d4b733ab7f670458386cc6c116f628ceed93ad4426786`

## Knowledge tree

### Governance

- [Knowledge system](RandoMeal--Governance--Knowledge-System) — Verified local General AI snapshot, deterministic project catalog and index, selective query, local Wiki renderer, explicit read-back-verified Notion synchronization, validation gates, repo skill, and read-only retrieval agent.
- [Agent governance](RandoMeal--Governance--Agents) — Shared-baseline precedence, mandatory project instructions, design workflow, repository safety, selective knowledge retrieval, and the source-code comment prohibition.
- [Canonical Figma file governance](RandoMeal--Governance--Canonical-Figma) — Deny-by-default project governance allowing all RandoMeal design operations only in one canonical Figma file.
- [Complete repository inventory](RandoMeal--Governance--Repository-Inventory) — Catch-all coverage node ensuring every tracked or non-ignored untracked repository file is represented even when no specialist node exists yet.

### Product

- [Product strategy and discovery gates](RandoMeal--Product--Strategy) — RandoMeal is a decision engine rather than a recipe generator or catalog; discovery evidence gates implementation assumptions.
- [Single versus shortlist evidence gate](RandoMeal--Product--Choice-Cardinality-Gate) — The launch interaction may show one recommendation, two or three ranked options, or a hybrid; Stage 0 evidence must choose the policy. Concept 01 now provides equal-fidelity single and shortlist stimuli without resolving the gate.
- [Product delivery roadmap](RandoMeal--Product--Delivery-Roadmap) — Dependency-ordered product delivery from discovery gates through foundations, recommendation beta, measurement, hardening, and later expansion.

### Architecture

- [Target product architecture](RandoMeal--Architecture--Target) — Target modular monolith, Expo mobile architecture, PostgreSQL data model, event outbox, analytics, reliability, storage, and future queue boundaries.
- [Current versus target migration map](RandoMeal--Architecture--Current-vs-Target) — Reuse, refactor, replace, and build decisions separating the working MVP from the accepted product architecture.
- [Target recommendation engine](RandoMeal--Architecture--Recommendation-Engine) — Fail-closed hard filters, configurable scoring, seeded selection, versioned presentation policy, persisted exposures, reasons, and reproducibility metadata.

### Data

- [Current Prisma data model](RandoMeal--Data--Current-Prisma) — MVP PostgreSQL schema for users, sessions, dishes, structured recipe children, history, AI generation records, and image recognition records.
- [Target product data model](RandoMeal--Data--Target-Model) — Normalized product model for identity, profiles, taxonomy, content versions, recommendation sessions and exposures, interactions, cooking, pantry, entitlements, configuration, and outbox events.
- [Seed and legacy content](RandoMeal--Data--Seed-Content) — Legacy dish seed, ownership backfill, and data-quality risks that require quarantine, normalization, provenance, and review before product recommendations.

### API and Contracts

- [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface) — Unversioned NestJS auth, dishes, randomizer, health, and root routes with local Zod parsing; legacy API documentation contains unimplemented target claims.
- [Target API v2 contract](RandoMeal--API--Target-v2) — Target versioned REST contract for identity, profiles, recommendations, interactions, cooking, saved content, pantry, entitlements, configuration, analytics, and administration.
- [Legacy shared contracts](RandoMeal--Contracts--Legacy) — Zod schemas for dishes, random selection, and scaffolded AI operations; only a subset is imported by current API code and none by mobile.
- [Product v2 contracts scaffold](RandoMeal--Contracts--Product-v2) — Additive Zod contracts for actor identity, recommendation requests and exposures, interactions, entitlements, configuration, and product events; not yet wired to API or mobile.

### Backend

- [Current backend bootstrap and cross-cutting behavior](RandoMeal--Backend--Bootstrap) — Flat NestJS AppModule, global Zod exception filter, request logging middleware, Prisma lifecycle service, environment validation, and process bootstrap.
- [Current authentication and sessions](RandoMeal--Backend--Auth-Sessions) — Email/password auth, opaque bearer sessions stored as secret-derived SHA-256 hashes, guards, current-user decorators, and in-memory IP rate limiting.
- [Current dish catalog and ownership](RandoMeal--Backend--Catalog-Ownership) — Dish CRUD repository and controller with creator-only edit/archive behavior, filtering, pagination, transactional child replacement, and legacy ownership constraints.
- [Current randomizer and history](RandoMeal--Backend--Randomizer-History) — Uniform random dish selection, randomized add-ons, optional dish-type filter, authenticated history cooldown, and stateless public random behavior.
- [Current AI boundary scaffold](RandoMeal--Backend--AI-Scaffold) — Provider interface, legacy AI Zod schemas, and Prisma storage models exist, but there are no provider adapters, controllers, jobs, validation pipeline, or shipped AI endpoints.

### Mobile

- [Current mobile shell](RandoMeal--Mobile--Current-Shell) — Expo 54 React Native app with a large App orchestrator, manual Random and Manage modes, local hook state, direct fetch flows, and partially extracted screens and modals.
- [Current mobile API and authentication](RandoMeal--Mobile--API-Auth) — Direct fetch client, API URL configuration, manual DTO types, error formatting, and SecureStore-backed bearer session hook.
- [Current mobile random flow](RandoMeal--Mobile--Random-Flow) — Random action, dish-type filter sheet, loading/error state, dish result modal, press animation, and public random API request.
- [Current mobile dish management flow](RandoMeal--Mobile--Manage-Flow) — Authenticated create, edit, list, filter, inspect, archive, and unarchive flows with owner-only feedback and manual form state.
- [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt) — The mobile app still uses a large global StyleSheet with hard-coded warm orange and cream values. The reviewed Foundation v1 target now exists in the repository and canonical Figma file, but mobile has not yet migrated to it.

### Analytics and Quality

- [Analytics and measurement plan](RandoMeal--Analytics--Measurement) — Actor identity, event ownership, recommendation funnel, experiment dimensions, decision metrics, dashboards, privacy controls, outbox delivery, and observability boundaries.
- [Design system and product quality](RandoMeal--Design--System-and-Quality) — Foundation v1, Decision flow concept 01, a 12-lane client flow skeleton and a 16-screen P0 mobile wireframe pass for F01-F04 are implemented and creation-reviewed in the canonical Figma file; platform adaptations, clickable prototyping, broader component coverage and mobile adoption remain target work.
- [QA, security, and release gates](RandoMeal--Quality--QA-Strategy) — Current Jest and E2E suites plus target contract, Testcontainers, Maestro, accessibility, load, security, migration, analytics, and release acceptance gates.

### Delivery and Operations

- [Workspace runtime and tooling](RandoMeal--Tooling--Workspace) — npm workspaces, pinned Node and npm policy, root and package scripts, TypeScript configuration, linting, lockfiles, and environment checks.
- [Continuous integration and test runners](RandoMeal--Delivery--CI) — GitHub Actions API, mobile, and live contract jobs plus local headless, background, and mobile headful runners.
- [Local runtime and environment](RandoMeal--Infrastructure--Local) — Local PostgreSQL Docker Compose, API and mobile environment examples, runtime safety checks, and development setup documentation.
- [Production deployment and operations](RandoMeal--Infrastructure--Production) — API container build, GHCR publication, Oracle VM SSH deployment, production Compose, startup migration behavior, HTTPS setup, and operational runbooks.

### Legacy Reference

- [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map) — README, AI context, original architecture, API spec, and design documents that contain useful MVP context alongside superseded visual, route, capability, or implementation claims.

## Complete file index

See [File Index](File-Index) for every indexed source and extracted section.
