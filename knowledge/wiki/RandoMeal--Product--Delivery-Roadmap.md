# Product delivery roadmap

Dependency-ordered product delivery from discovery gates through foundations, recommendation beta, measurement, hardening, and later expansion.

Status: **target**
Authority: **accepted-plan**

## Rules and patterns

- Complete discovery exit criteria before irreversible product UI decisions.
- Prefer vertical slices with contracts, persistence, analytics, tests, and operability in the same increment.
- Migrate additively and keep legacy behavior available until replacement acceptance gates pass.
- Release claims must be backed by current tests rather than historical test-count snapshots.

## Source coverage

- `docs/product/audit-and-migration.md` — 13 indexed sections: Current-state audit and migration matrix, 0. Discovery correction (2026-07-14), 1. Verified baseline, 2. Reuse / refactor / replace, 3. Critical gaps against the PRD, …. Sections: docs/product/audit-and-migration.md (L1–145); Current-state audit and migration matrix (L1–145); 0. Discovery correction (2026-07-14) (L7–23); 1. Verified baseline (L24–34); 2. Reuse / refactor / replace (L35–62); 3. Critical gaps against the PRD (L63–80); 4. Migration slices (L81–121); Slice A - foundation without UX change (L83–93)
- `docs/product/delivery-plan.md` — 27 indexed sections: Dependency-ordered delivery plan, Operating rules for implementers, Phase 0 - decisions, discovery and baseline (2-3 weeks), P0-01 Product discovery and choice-model gate, P0-02 Engineering baseline, …. Sections: docs/product/delivery-plan.md (L1–288); Dependency-ordered delivery plan (L1–288); Operating rules for implementers (L7–21); Phase 0 - decisions, discovery and baseline (2-3 weeks) (L22–82); P0-01 Product discovery and choice-model gate (L28–42); P0-02 Engineering baseline (L43–51); P0-03 Content audit (L52–61); P0-04 Analytics baseline (L62–73)
- `docs/releases/v0.2.0.md` — 7 indexed sections: Release v0.2.0, Included scope, Runtime endpoints, Required secrets (names only), API_ENV_PROD required keys, …. Sections: docs/releases/v0.2.0.md (L1–42); Release v0.2.0 (L1–42); Included scope (L7–11); Runtime endpoints (L12–15); Required secrets (names only) (L16–23); API_ENV_PROD required keys (L24–31); Smoke checks after deploy (L32–38); Rollback (L39–42)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Current versus target migration map](RandoMeal--Architecture--Current-vs-Target)
- Related: [QA, security, and release gates](RandoMeal--Quality--QA-Strategy), [Production deployment and operations](RandoMeal--Infrastructure--Production)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`delivery` · `roadmap` · `milestone` · `implementation plan` · `план` · `этап` · `разработка`
