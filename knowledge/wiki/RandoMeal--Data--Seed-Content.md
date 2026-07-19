# Seed and legacy content

Legacy dish seed, ownership backfill, and data-quality risks that require quarantine, normalization, provenance, and review before product recommendations.

Status: **mixed**
Authority: **current-code-with-audit-constraints**

## Rules and patterns

- Do not treat seed content as verified or allergen-safe product inventory.
- Preserve provenance and quarantine status during migration.
- Normalize ingredients, units, dietary labels, steps, and duplicate content before recommendation eligibility.
- Legacy ownership assignment must be explicit and auditable.

## Source coverage

- `apps/api/prisma/assign-legacy-owner.js` — 1 indexed section: main. Sections: apps/api/prisma/assign-legacy-owner.js (L1–44); main (L6–44)
- `apps/api/prisma/seed.js` — 3 indexed sections: normalizeDishName, parseDetailedSteps, main. Sections: apps/api/prisma/seed.js (L1–581); normalizeDishName (L447–450); parseDetailedSteps (L451–509); main (L510–581)
- `docs/product/audit-and-migration.md` — 13 indexed sections: Current-state audit and migration matrix, 0. Discovery correction (2026-07-14), 1. Verified baseline, 2. Reuse / refactor / replace, 3. Critical gaps against the PRD, …. Sections: docs/product/audit-and-migration.md (L1–145); Current-state audit and migration matrix (L1–145); 0. Discovery correction (2026-07-14) (L7–23); 1. Verified baseline (L24–34); 2. Reuse / refactor / replace (L35–62); 3. Critical gaps against the PRD (L63–80); 4. Migration slices (L81–121); Slice A - foundation without UX change (L83–93)

## Graph relations

- Depends on: [Current Prisma data model](RandoMeal--Data--Current-Prisma)
- Related: [Target product data model](RandoMeal--Data--Target-Model), [Current dish catalog and ownership](RandoMeal--Backend--Catalog-Ownership)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`seed` · `content` · `legacy data` · `backfill` · `recipes` · `контент` · `рецепты`
