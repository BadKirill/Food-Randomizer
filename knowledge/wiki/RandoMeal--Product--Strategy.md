# Product strategy and discovery gates

RandoMeal is a decision engine rather than a recipe generator or catalog; discovery evidence gates implementation assumptions.

Status: **target**
Authority: **product-source-of-truth**

## Rules and patterns

- Optimize for a trusted decision and start of cooking in less than 30 seconds, not content browsing.
- AI can adapt canonical recipes but cannot be required for normal recommendations.
- Hard safety and discovery gates override feature breadth and legacy UI assumptions.
- Do not treat Stage 0 hypotheses or beta targets as validated facts.

## Source coverage

- `docs/product/discovery-decisions.md` — 7 indexed sections: Discovery decisions and implementation gates, 1. Accepted direction, 2. Open hypotheses, 3. Stage 0 protocol and locked thresholds, 4. H3 concept-test contract, …. Sections: docs/product/discovery-decisions.md (L1–128); Discovery decisions and implementation gates (L1–128); 1. Accepted direction (L13–27); 2. Open hypotheses (L28–44); 3. Stage 0 protocol and locked thresholds (L45–69); 4. H3 concept-test contract (L70–98); 5. Content gate (L99–115); 6. Implementation consequences (L116–128)
- `docs/product/README.md` — 4 indexed sections: RandoMeal product engineering blueprint, Product invariant, Decision status, Change protocol. Sections: docs/product/README.md (L1–47); RandoMeal product engineering blueprint (L1–47); Product invariant (L24–31); Decision status (L32–37); Change protocol (L38–47)

## Graph relations

- Depends on: none
- Related: [Single versus shortlist evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Target product architecture](RandoMeal--Architecture--Target), [Analytics and measurement plan](RandoMeal--Analytics--Measurement)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Superseded by: none

## Retrieval tags

`product` · `discovery` · `decision engine` · `strategy` · `продукт` · `исследование` · `решение`
