# Current AI boundary scaffold

Provider interface, legacy AI Zod schemas, and Prisma storage models exist, but there are no provider adapters, controllers, jobs, validation pipeline, or shipped AI endpoints.

Status: **mixed**
Authority: **current-code**

## Rules and patterns

- Do not describe AI generation, inference, or vision as implemented product capability.
- Future AI output must be schema-validated, safety-checked, cost-observed, and non-authoritative for hard dietary constraints.
- Raw prompts and responses require privacy and retention controls before persistence.
- Normal recommendations must remain available without AI.

## Source coverage

- `apps/api/prisma/schema.prisma` — 16 indexed sections: client, db, DishSource, DishStatus, DishType, …. Sections: apps/api/prisma/schema.prisma (L1–156); client (L1–4); db (L5–9); DishSource (L10–15); DishStatus (L16–21); DishType (L22–27); User (L28–38); UserSession (L39–51)
- `apps/api/src/modules/ai/ai-provider.interface.ts` — 1 indexed section: AIProvider. Sections: apps/api/src/modules/ai/ai-provider.interface.ts (L1–18); AIProvider (L12–18)
- `packages/contracts/src/index.ts` — 27 indexed sections: IngredientSchema, AddOnGroupSchema, DishSchema, RandomNextRequestSchema, ResolvedAddOnGroupSchema, …. Sections: packages/contracts/src/index.ts (L1–119); IngredientSchema (L3–9); AddOnGroupSchema (L10–14); DishSchema (L15–26); RandomNextRequestSchema (L27–31); ResolvedAddOnGroupSchema (L32–35); RandomNextResponseSchema (L36–45); GenerateDishRequestSchema (L46–53)

## Graph relations

- Depends on: [Current backend bootstrap and cross-cutting behavior](RandoMeal--Backend--Bootstrap), [Legacy shared contracts](RandoMeal--Contracts--Legacy)
- Related: [Target product architecture](RandoMeal--Architecture--Target), [Analytics and measurement plan](RandoMeal--Analytics--Measurement)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`ai` · `provider` · `vision` · `generation` · `scaffold` · `ии` · `распознавание`
