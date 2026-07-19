# Analytics and measurement plan

Actor identity, event ownership, recommendation funnel, experiment dimensions, decision metrics, dashboards, privacy controls, outbox delivery, and observability boundaries.

Status: **target**
Authority: **accepted-analytics-design**

## Rules and patterns

- Measure decision success and time to start cooking rather than catalog engagement.
- Server owns durable recommendation, exposure, acceptance, rejection, cooking, entitlement, and delivery events.
- Client owns presentation and interaction UX events with stable actor and session correlation.
- Do not send allergy details, sensitive free text, credentials, prompts, or raw model responses to analytics.

## Source coverage

- `docs/product/analytics.md` — 17 indexed sections: Analytics and measurement plan, 1. Tooling decision, 2. Identity, 3. Event ownership, 4. Naming and schema rules, …. Sections: docs/product/analytics.md (L1–210); Analytics and measurement plan (L1–210); 1. Tooling decision (L3–13); 2. Identity (L14–33); 3. Event ownership (L34–45); 4. Naming and schema rules (L46–54); 5. Tracking plan (L55–121); Activation and recommendation (L57–76)
- `packages/contracts/src/product-v2.ts` — 31 indexed sections: ProductIdentityHeadersSchema, DietTypeSchema, MealTypeSchema, RecommendationGoalSchema, PantryModeSchema, …. Sections: packages/contracts/src/product-v2.ts (L1–288); ProductIdentityHeadersSchema (L8–15); DietTypeSchema (L16–16); MealTypeSchema (L17–17); RecommendationGoalSchema (L18–26); PantryModeSchema (L27–27); RecommendationPresentationModeSchema (L28–33); RecommendationContextSchema (L34–54)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Single versus shortlist evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Target product data model](RandoMeal--Data--Target-Model)
- Related: [Product v2 contracts scaffold](RandoMeal--Contracts--Product-v2), [QA, security, and release gates](RandoMeal--Quality--QA-Strategy)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`analytics` · `posthog` · `events` · `metrics` · `funnel` · `experiment` · `аналитика` · `метрики`
