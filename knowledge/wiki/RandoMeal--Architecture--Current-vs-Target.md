# Current versus target migration map

Reuse, refactor, replace, and build decisions separating the working MVP from the accepted product architecture.

Status: **mixed**
Authority: **migration-audit**

## Rules and patterns

- Treat audit machine versions and test counts as historical snapshots until re-verified.
- Reuse operational NestJS, Prisma, Expo, auth, ownership, and test foundations where behavior remains valid.
- Refactor flat modules and the monolithic mobile shell incrementally behind stable contracts.
- Do not confuse target-only analytics, AI, photo, recommendation, or offline capabilities with current implementation.

## Source coverage

- `apps/api/README.md` — 5 indexed sections: API App, Responsibilities, Environment, Scripts, Dish list pagination and search. Sections: apps/api/README.md (L1–51); API App (L1–51); Responsibilities (L5–11); Environment (L12–27); Scripts (L28–38); Dish list pagination and search (L39–51)
- `apps/mobile/README.md` — 2 indexed sections: Mobile App, API Base URL strategy. Sections: apps/mobile/README.md (L1–15); Mobile App (L1–15); API Base URL strategy (L5–15)
- `docs/product/audit-and-migration.md` — 13 indexed sections: Current-state audit and migration matrix, 0. Discovery correction (2026-07-14), 1. Verified baseline, 2. Reuse / refactor / replace, 3. Critical gaps against the PRD, …. Sections: docs/product/audit-and-migration.md (L1–145); Current-state audit and migration matrix (L1–145); 0. Discovery correction (2026-07-14) (L7–23); 1. Verified baseline (L24–34); 2. Reuse / refactor / replace (L35–62); 3. Critical gaps against the PRD (L63–80); 4. Migration slices (L81–121); Slice A - foundation without UX change (L83–93)
- `README.md` — 10 indexed sections: Food Randomizer Monorepo Blueprint, Stack, Repo Layout, Environment Strategy, Mobile, …. Sections: README.md (L1–120); Food Randomizer Monorepo Blueprint (L1–120); Stack (L12–18); Repo Layout (L19–27); Environment Strategy (L28–45); Mobile (L29–36); API (L37–45); Local Development (L46–64)

## Graph relations

- Depends on: [Target product architecture](RandoMeal--Architecture--Target)
- Related: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map), [Current backend bootstrap and cross-cutting behavior](RandoMeal--Backend--Bootstrap), [Current mobile shell](RandoMeal--Mobile--Current-Shell)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`audit` · `migration` · `reuse` · `rewrite` · `current target` · `аудит` · `миграция` · `переиспользовать`
