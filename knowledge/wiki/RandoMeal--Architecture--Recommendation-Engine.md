# Target recommendation engine

Fail-closed hard filters, configurable scoring, seeded selection, versioned presentation policy, persisted exposures, reasons, and reproducibility metadata.

Status: **target**
Authority: **accepted-architecture**

## Rules and patterns

- Allergy, diet, explicit bans, permanent exclusions, and critical equipment are fail-closed hard constraints.
- Persist component scores, seed, algorithm and configuration versions, candidate pool, reasons, and ordered exposure membership.
- The client cannot choose arbitrary result cardinality.
- An empty safe result explains the constraint and relaxes only soft filters after confirmation.

## Source coverage

- `docs/product/api-v2.md` — 12 indexed sections: REST API v2 surface, Common protocol, Identity and auth, Profile and configuration, Catalog and saved, …. Sections: docs/product/api-v2.md (L1–131); REST API v2 surface (L1–131); Common protocol (L6–31); Identity and auth (L32–42); Profile and configuration (L43–54); Catalog and saved (L55–64); Recommendations and interactions (L65–90); `POST /recommendations` (L67–90)
- `docs/product/architecture.md` — 14 indexed sections: Target product architecture, 0. Product constraint on architecture, 1. Technology stack, 2. Runtime topology, 3. Backend boundaries, …. Sections: docs/product/architecture.md (L1–294); Target product architecture (L1–294); 0. Product constraint on architecture (L7–17); 1. Technology stack (L18–49); 2. Runtime topology (L50–70); 3. Backend boundaries (L71–108); 4. Recommendation architecture (L109–151); 5. Mobile architecture (L152–177)
- `packages/contracts/src/product-v2.ts` — 31 indexed sections: ProductIdentityHeadersSchema, DietTypeSchema, MealTypeSchema, RecommendationGoalSchema, PantryModeSchema, …. Sections: packages/contracts/src/product-v2.ts (L1–288); ProductIdentityHeadersSchema (L8–15); DietTypeSchema (L16–16); MealTypeSchema (L17–17); RecommendationGoalSchema (L18–26); PantryModeSchema (L27–27); RecommendationPresentationModeSchema (L28–33); RecommendationContextSchema (L34–54)

## Graph relations

- Depends on: [Single versus shortlist evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Target product data model](RandoMeal--Data--Target-Model), [Target API v2 contract](RandoMeal--API--Target-v2)
- Related: [Current randomizer and history](RandoMeal--Backend--Randomizer-History), [Analytics and measurement plan](RandoMeal--Analytics--Measurement)
- Supersedes: [Current randomizer and history](RandoMeal--Backend--Randomizer-History)
- Superseded by: none

## Retrieval tags

`recommendation` · `ranking` · `hard filters` · `scoring` · `exposure` · `рекомендация` · `ранжирование`
