# Analytics and measurement plan

Actor identity, event ownership, recommendation funnel, experiment dimensions, decision metrics, dashboards, privacy controls, outbox delivery, and observability boundaries.

Status: **target**
Authority: **accepted-analytics-design**

## Rules and patterns

- Measure decision success and time to start cooking rather than catalog engagement.
- For Hybrid, report primary acceptance and alternative rescue separately by typed tradeoff code, with time-to-decision and abandonment guardrails.
- Server owns durable recommendation, exposure, acceptance, rejection, cooking, entitlement, and delivery events.
- Client owns presentation and interaction UX events with stable actor and session correlation.
- Do not send allergy details, sensitive free text, credentials, prompts, or raw model responses to analytics.
- Stage 0 Figma analytics annotations describe intended production instrumentation and do not claim that event delivery is implemented.
- Maze Stage 0 evidence combines observed prototype goal success, direct and indirect paths, time, misclicks and abandonment with five-point confidence and stated cooking intent; stated format preference cannot decide the gate alone.
- The adaptive v4 task can compare interaction paths across serving limit, priority, time, first ingredient anchor, additional ingredient selections, Back revisions, skip, primary and alternative behavior, but Figma variables are private simulation state and do not replace production typed analytics.

## Source coverage

- `docs/product/analytics.md` — 17 indexed sections: Analytics and measurement plan, 1. Tooling decision, 2. Identity, 3. Event ownership, 4. Naming and schema rules, …. Sections: docs/product/analytics.md (L1–217); Analytics and measurement plan (L1–217); 1. Tooling decision (L3–13); 2. Identity (L14–33); 3. Event ownership (L34–45); 4. Naming and schema rules (L46–54); 5. Tracking plan (L55–121); Activation and recommendation (L57–76)
- `docs/product/stage-0-maze-study.md` — 14 indexed sections: Stage 0 Maze study, Links and ownership, Research decision, V6 live contract, Participant flow, …. Sections: docs/product/stage-0-maze-study.md (L1–414); Stage 0 Maze study (L1–414); Links and ownership (L10–36); Research decision (L37–54); V6 live contract (L55–95); Participant flow (L96–139); Screener (L108–122); Context questions (L123–139)
- `docs/product/stage-0-research-prototype.md` — 15 indexed sections: Stage 0 research prototype handoff, Purpose, Canonical structure, Preserved v2 participant journey, Adaptive v4 participant journey, …. Sections: docs/product/stage-0-research-prototype.md (L1–460); Stage 0 research prototype handoff (L1–460); Purpose (L26–46); Canonical structure (L47–63); Preserved v2 participant journey (L64–84); Adaptive v4 participant journey (L85–117); Full-flow v5 comparison journeys (L118–143); Full-flow V6 comparison journeys (L144–178)
- `packages/contracts/src/product-v2.ts` — 31 indexed sections: ProductIdentityHeadersSchema, DietTypeSchema, MealTypeSchema, RecommendationGoalSchema, PantryModeSchema, …. Sections: packages/contracts/src/product-v2.ts (L1–288); ProductIdentityHeadersSchema (L8–15); DietTypeSchema (L16–16); MealTypeSchema (L17–17); RecommendationGoalSchema (L18–26); PantryModeSchema (L27–27); RecommendationPresentationModeSchema (L28–33); RecommendationContextSchema (L34–54)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Hybrid choice-cardinality evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Target product data model](RandoMeal--Data--Target-Model)
- Related: [Product v2 contracts scaffold](RandoMeal--Contracts--Product-v2), [QA, security, and release gates](RandoMeal--Quality--QA-Strategy)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`analytics` · `posthog` · `events` · `metrics` · `funnel` · `experiment` · `аналитика` · `метрики`
