# Legacy and contradictory documentation map

README, AI context, original architecture, API spec, and design documents that contain useful MVP context alongside superseded visual, route, capability, or implementation claims.

Status: **legacy**
Authority: **reference-only**

## Rules and patterns

- Product discovery and product engineering documents supersede legacy product, brand, and target-architecture claims.
- Current code supersedes legacy API and capability claims when implementation differs.
- AI, vision, analytics, local cache, and provider-adapter statements in legacy docs may describe intent rather than shipped behavior.
- Keep useful historical context but label it legacy before retrieval or reuse.

## Source coverage

- `AI_CONTEXT.md` — 14 indexed sections: AI Context, Project, Product Rules, Architecture, Stack, …. Sections: AI_CONTEXT.md (L1–242); AI Context (L1–242); Project (L3–18); Product Rules (L19–29); Architecture (L30–49); Stack (L50–80); Production Database (L81–100); Deployment (L101–121)
- `apps/api/README.md` — 5 indexed sections: API App, Responsibilities, Environment, Scripts, Dish list pagination and search. Sections: apps/api/README.md (L1–51); API App (L1–51); Responsibilities (L5–11); Environment (L12–27); Scripts (L28–38); Dish list pagination and search (L39–51)
- `apps/mobile/README.md` — 2 indexed sections: Mobile App, API Base URL strategy. Sections: apps/mobile/README.md (L1–15); Mobile App (L1–15); API Base URL strategy (L5–15)
- `DESIGN.md` — 20 indexed sections: Food Randomizer Design System (Starbucks-Inspired), 1. Design Direction, 2. Brand Tokens, Color Tokens, Radius Tokens, …. Sections: DESIGN.md (L1–218); Food Randomizer Design System (Starbucks-Inspired) (L1–218); 1. Design Direction (L3–19); 2. Brand Tokens (L20–82); Color Tokens (L22–46); Radius Tokens (L47–58); Spacing Tokens (L59–70); Shadow Tokens (L71–82)
- `docs/api-spec.md` — 17 indexed sections: API Spec (v1 draft), Health, `GET /health`, Dishes, `POST /dishes`, …. Sections: docs/api-spec.md (L1–89); API Spec (v1 draft) (L1–89); Health (L5–8); `GET /health` (L6–8); Dishes (L9–22); `POST /dishes` (L10–12); `GET /dishes/:dishId` (L13–17); `GET /dishes` (L18–22)
- `docs/architecture.md` — 16 indexed sections: Architecture, 1) Goals, 2) High-Level System, 3) Layered Design, Mobile (`apps/mobile`), …. Sections: docs/architecture.md (L1–106); Architecture (L1–106); 1) Goals (L6–21); 2) High-Level System (L22–27); 3) Layered Design (L28–46); Mobile (`apps/mobile`) (L30–35); API (`apps/api`) (L36–42); Shared (`packages/contracts`) (L43–46)
- `README.md` — 10 indexed sections: Food Randomizer Monorepo Blueprint, Stack, Repo Layout, Environment Strategy, Mobile, …. Sections: README.md (L1–120); Food Randomizer Monorepo Blueprint (L1–120); Stack (L12–18); Repo Layout (L19–27); Environment Strategy (L28–45); Mobile (L29–36); API (L37–45); Local Development (L46–64)

## Graph relations

- Depends on: [Current versus target migration map](RandoMeal--Architecture--Current-vs-Target)
- Related: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface), [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt)
- Supersedes: none
- Superseded by: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Target product architecture](RandoMeal--Architecture--Target), [Design system and product quality](RandoMeal--Design--System-and-Quality), [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface)

## Retrieval tags

`legacy` · `stale docs` · `contradiction` · `superseded` · `устаревшее` · `противоречие`
