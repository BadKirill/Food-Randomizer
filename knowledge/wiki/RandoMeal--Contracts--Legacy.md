# Legacy shared contracts

Zod schemas for dishes, random selection, and scaffolded AI operations; only a subset is imported by current API code and none by mobile.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Runtime schema use must be verified by imports; declaration alone does not mean an endpoint exists.
- The mobile client currently maintains duplicate manual DTO types and casts responses without shared runtime parsing.
- API and contracts currently use different Zod major versions and the exception filter tolerates cross-copy error shapes.
- Contract changes require narrow API and mobile compatibility tests.

## Source coverage

- `apps/api/test/mocks/contracts.ts` — 1 indexed section: RandomNextRequestSchema. Sections: apps/api/test/mocks/contracts.ts (L1–7); RandomNextRequestSchema (L3–7)
- `packages/contracts/src/index.ts` — 27 indexed sections: IngredientSchema, AddOnGroupSchema, DishSchema, RandomNextRequestSchema, ResolvedAddOnGroupSchema, …. Sections: packages/contracts/src/index.ts (L1–119); IngredientSchema (L3–9); AddOnGroupSchema (L10–14); DishSchema (L15–26); RandomNextRequestSchema (L27–31); ResolvedAddOnGroupSchema (L32–35); RandomNextResponseSchema (L36–45); GenerateDishRequestSchema (L46–53)

## Graph relations

- Depends on: [Workspace runtime and tooling](RandoMeal--Tooling--Workspace)
- Related: [Product v2 contracts scaffold](RandoMeal--Contracts--Product-v2), [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface)
- Supersedes: none
- Superseded by: [Product v2 contracts scaffold](RandoMeal--Contracts--Product-v2)

## Retrieval tags

`zod` · `contracts` · `schemas` · `legacy` · `контракты` · `схемы`
