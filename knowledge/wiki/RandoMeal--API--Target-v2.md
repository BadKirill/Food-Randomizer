# Target API v2 contract

Target versioned REST contract for identity, profiles, recommendations, interactions, cooking, saved content, pantry, entitlements, configuration, analytics, and administration.

Status: **target**
Authority: **accepted-api-design**

## Rules and patterns

- Transport contracts are shared and runtime-validated with Zod.
- Mutation endpoints define idempotency, authorization, error, and analytics semantics.
- Recommendation cardinality remains server policy rather than client input.
- Add target endpoints without breaking the current mobile client until migration gates pass.

## Source coverage

- `docs/product/api-v2.md` — 12 indexed sections: REST API v2 surface, Common protocol, Identity and auth, Profile and configuration, Catalog and saved, …. Sections: docs/product/api-v2.md (L1–131); REST API v2 surface (L1–131); Common protocol (L6–31); Identity and auth (L32–42); Profile and configuration (L43–54); Catalog and saved (L55–64); Recommendations and interactions (L65–90); `POST /recommendations` (L67–90)
- `packages/contracts/src/product-v2.ts` — 31 indexed sections: ProductIdentityHeadersSchema, DietTypeSchema, MealTypeSchema, RecommendationGoalSchema, PantryModeSchema, …. Sections: packages/contracts/src/product-v2.ts (L1–288); ProductIdentityHeadersSchema (L8–15); DietTypeSchema (L16–16); MealTypeSchema (L17–17); RecommendationGoalSchema (L18–26); PantryModeSchema (L27–27); RecommendationPresentationModeSchema (L28–33); RecommendationContextSchema (L34–54)

## Graph relations

- Depends on: [Target product architecture](RandoMeal--Architecture--Target), [Target product data model](RandoMeal--Data--Target-Model)
- Related: [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface), [Product v2 contracts scaffold](RandoMeal--Contracts--Product-v2)
- Supersedes: [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface)
- Superseded by: none

## Retrieval tags

`api v2` · `rest v1` · `idempotency` · `contract` · `target api` · `целевой api`
