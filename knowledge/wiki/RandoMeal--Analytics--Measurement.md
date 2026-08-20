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

## Source coverage

- `docs/product/analytics.md` — 17 indexed sections: Analytics and measurement plan, 1. Tooling decision, 2. Identity, 3. Event ownership, 4. Naming and schema rules, …. Sections: docs/product/analytics.md (L1–217); Analytics and measurement plan (L1–217); 1. Tooling decision (L3–13); 2. Identity (L14–33); 3. Event ownership (L34–45); 4. Naming and schema rules (L46–54); 5. Tracking plan (L55–121); Activation and recommendation (L57–76)
- `docs/product/stage-0-maze-study.md` — 12 indexed sections: Stage 0 Maze study, Links and ownership, Research decision, Participant flow, Screener, …. Sections: docs/product/stage-0-maze-study.md (L1–194); Stage 0 Maze study (L1–194); Links and ownership (L7–24); Research decision (L25–40); Participant flow (L41–84); Screener (L53–67); Context questions (L68–84); Variant contract (L85–126)
- `docs/product/stage-0-research-prototype.md` — 11 indexed sections: Stage 0 research prototype handoff, Purpose, Canonical structure, End-to-end participant journey, Focused comparison starting points, …. Sections: docs/product/stage-0-research-prototype.md (L1–224); Stage 0 research prototype handoff (L1–224); Purpose (L19–35); Canonical structure (L36–52); End-to-end participant journey (L53–73); Focused comparison starting points (L74–93); Corrective design pass (L94–107); Moderator protocol (L108–132)
- `packages/contracts/src/product-v2.ts` — 31 indexed sections: ProductIdentityHeadersSchema, DietTypeSchema, MealTypeSchema, RecommendationGoalSchema, PantryModeSchema, …. Sections: packages/contracts/src/product-v2.ts (L1–288); ProductIdentityHeadersSchema (L8–15); DietTypeSchema (L16–16); MealTypeSchema (L17–17); RecommendationGoalSchema (L18–26); PantryModeSchema (L27–27); RecommendationPresentationModeSchema (L28–33); RecommendationContextSchema (L34–54)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Hybrid choice-cardinality evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Target product data model](RandoMeal--Data--Target-Model)
- Related: [Product v2 contracts scaffold](RandoMeal--Contracts--Product-v2), [QA, security, and release gates](RandoMeal--Quality--QA-Strategy)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`analytics` · `posthog` · `events` · `metrics` · `funnel` · `experiment` · `аналитика` · `метрики`
