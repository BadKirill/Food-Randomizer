# Target product data model

Normalized product model for identity, profiles, taxonomy, content versions, recommendation sessions and exposures, interactions, cooking, pantry, entitlements, configuration, and outbox events.

Status: **target**
Authority: **accepted-data-design**

## Rules and patterns

- Identity, safety constraints, recommendation reproducibility, and event delivery have explicit durable models.
- Use database constraints and indexes for invariants that cannot rely on application timing.
- Recipe content is versioned and canonical ingredient taxonomy is separate from display text.
- Profile, interaction, and analytics retention follows documented privacy rules.
- Hybrid recommendations store selection role and a nullable typed tradeoff comparison to the primary result.

## Source coverage

- `docs/product/data-model.md` — 37 indexed sections: Target database model, 1. Identity and profile, `users` (existing, retained), `product_identities`, `anonymous_identities`, …. Sections: docs/product/data-model.md (L1–248); Target database model (L1–248); 1. Identity and profile (L7–47); `users` (existing, retained) (L9–19); `product_identities` (L20–32); `anonymous_identities` (L33–38); `user_profiles` (L39–47); 2. Catalog (L48–100)

## Graph relations

- Depends on: [Target product architecture](RandoMeal--Architecture--Target), [Product strategy and discovery gates](RandoMeal--Product--Strategy)
- Related: [Current Prisma data model](RandoMeal--Data--Current-Prisma), [Target API v2 contract](RandoMeal--API--Target-v2), [Analytics and measurement plan](RandoMeal--Analytics--Measurement)
- Supersedes: [Current Prisma data model](RandoMeal--Data--Current-Prisma)
- Superseded by: none

## Retrieval tags

`target schema` · `tables` · `indexes` · `constraints` · `outbox` · `целевая бд` · `таблицы`
