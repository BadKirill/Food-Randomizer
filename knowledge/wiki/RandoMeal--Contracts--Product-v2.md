# Product v2 contracts scaffold

Additive Zod contracts for actor identity, recommendation requests and exposures, interactions, entitlements, configuration, and product events; not yet wired to API or mobile.

Status: **target**
Authority: **accepted-contract-scaffold**

## Rules and patterns

- Treat these schemas as target scaffolding until concrete API and mobile imports exist.
- Preserve additive compatibility while legacy endpoints remain active.
- Event names and property meaning require analytics compatibility review when changed.
- Identity and recommendation schemas must align with database and API idempotency design.

## Source coverage

- `packages/contracts/src/index.ts` — 27 indexed sections: IngredientSchema, AddOnGroupSchema, DishSchema, RandomNextRequestSchema, ResolvedAddOnGroupSchema, …. Sections: packages/contracts/src/index.ts (L1–119); IngredientSchema (L3–9); AddOnGroupSchema (L10–14); DishSchema (L15–26); RandomNextRequestSchema (L27–31); ResolvedAddOnGroupSchema (L32–35); RandomNextResponseSchema (L36–45); GenerateDishRequestSchema (L46–53)
- `packages/contracts/src/product-v2.ts` — 31 indexed sections: ProductIdentityHeadersSchema, DietTypeSchema, MealTypeSchema, RecommendationGoalSchema, PantryModeSchema, …. Sections: packages/contracts/src/product-v2.ts (L1–288); ProductIdentityHeadersSchema (L8–15); DietTypeSchema (L16–16); MealTypeSchema (L17–17); RecommendationGoalSchema (L18–26); PantryModeSchema (L27–27); RecommendationPresentationModeSchema (L28–33); RecommendationContextSchema (L34–54)

## Graph relations

- Depends on: [Target API v2 contract](RandoMeal--API--Target-v2), [Analytics and measurement plan](RandoMeal--Analytics--Measurement)
- Related: [Legacy shared contracts](RandoMeal--Contracts--Legacy), [Target product data model](RandoMeal--Data--Target-Model)
- Supersedes: [Legacy shared contracts](RandoMeal--Contracts--Legacy)
- Superseded by: none

## Retrieval tags

`product v2` · `recommendation` · `events` · `identity` · `entitlements` · `контракты v2`
