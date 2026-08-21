# Product delivery roadmap

Dependency-ordered product delivery from discovery gates through foundations, recommendation beta, measurement, hardening, and later expansion.

Status: **target**
Authority: **accepted-plan**

## Rules and patterns

- Complete discovery exit criteria before irreversible product UI decisions.
- Prefer vertical slices with contracts, persistence, analytics, tests, and operability in the same increment.
- Migrate additively and keep legacy behavior available until replacement acceptance gates pass.
- Release claims must be backed by current tests rather than historical test-count snapshots.
- Execution Stage 0 branch baseline and Stage 1 research prototype are complete; the founder-selected Hybrid direction is documented, while product discovery Stage 0 remains open until participant evidence signs D0.
- Use the executable Stage 0-19 plan for operational status, dependency order, handoff, exit criteria and rollback.
- Stage 2 participant collection uses the versioned Maze v5 study with alternating full-flow A/B/H Welcome-to-Cooking journeys in batches of three; publication and a successful preview do not complete D0.

## Source coverage

- `docs/product/audit-and-migration.md` — 13 indexed sections: Current-state audit and migration matrix, 0. Discovery correction (2026-07-14), 1. Verified baseline, 2. Reuse / refactor / replace, 3. Critical gaps against the PRD, …. Sections: docs/product/audit-and-migration.md (L1–145); Current-state audit and migration matrix (L1–145); 0. Discovery correction (2026-07-14) (L7–23); 1. Verified baseline (L24–34); 2. Reuse / refactor / replace (L35–62); 3. Critical gaps against the PRD (L63–80); 4. Migration slices (L81–121); Slice A - foundation without UX change (L83–93)
- `docs/product/delivery-plan.md` — 27 indexed sections: Dependency-ordered delivery plan, Operating rules for implementers, Phase 0 - decisions, discovery and baseline (2-3 weeks), P0-01 Product discovery and choice-model gate, P0-02 Engineering baseline, …. Sections: docs/product/delivery-plan.md (L1–296); Dependency-ordered delivery plan (L1–296); Operating rules for implementers (L12–26); Phase 0 - decisions, discovery and baseline (2-3 weeks) (L27–88); P0-01 Product discovery and choice-model gate (L33–48); P0-02 Engineering baseline (L49–57); P0-03 Content audit (L58–67); P0-04 Analytics baseline (L68–79)
- `docs/product/executable-implementation-plan.md` — 29 indexed sections: Executable product implementation plan, Naming boundary, Status vocabulary, Current status, Dependency path, …. Sections: docs/product/executable-implementation-plan.md (L1–561); Executable product implementation plan (L1–561); Naming boundary (L12–17); Status vocabulary (L18–26); Current status (L27–37); Dependency path (L38–45); Mandatory execution contract (L46–60); Cross-stage definition of done (L61–67)
- `docs/product/stage-0-maze-study.md` — 13 indexed sections: Stage 0 Maze study, Links and ownership, Research decision, Participant flow, Screener, …. Sections: docs/product/stage-0-maze-study.md (L1–316); Stage 0 Maze study (L1–316); Links and ownership (L9–26); Research decision (L27–44); Participant flow (L45–88); Screener (L57–71); Context questions (L72–88); Full journey contract (L89–121)
- `docs/releases/v0.2.0.md` — 7 indexed sections: Release v0.2.0, Included scope, Runtime endpoints, Required secrets (names only), API_ENV_PROD required keys, …. Sections: docs/releases/v0.2.0.md (L1–42); Release v0.2.0 (L1–42); Included scope (L7–11); Runtime endpoints (L12–15); Required secrets (names only) (L16–23); API_ENV_PROD required keys (L24–31); Smoke checks after deploy (L32–38); Rollback (L39–42)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Current versus target migration map](RandoMeal--Architecture--Current-vs-Target)
- Related: [QA, security, and release gates](RandoMeal--Quality--QA-Strategy), [Production deployment and operations](RandoMeal--Infrastructure--Production)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`delivery` · `roadmap` · `milestone` · `implementation plan` · `план` · `этап` · `разработка`
