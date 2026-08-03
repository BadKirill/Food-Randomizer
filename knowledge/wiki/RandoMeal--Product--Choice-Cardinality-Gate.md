# Single versus shortlist evidence gate

The launch interaction may show one recommendation, two or three ranked options, or a hybrid; Stage 0 evidence must choose the policy. Concept 01 now provides equal-fidelity single and shortlist stimuli without resolving the gate.

Status: **target**
Authority: **discovery-gate**

## Rules and patterns

- Keep ranking cardinality server-owned and versioned.
- Never hard-code one recommendation as a proven product truth.
- Measure time to decision, acceptance, replacement, abandonment, trust, and safety separately by policy.
- Do not build final launch navigation or recommendation UI before the Stage 0 gate is signed.
- Use Decision flow concept 01 only as equal-fidelity Stage 0 stimuli; its D0-A and D0-B screens do not resolve the gate.

## Source coverage

- `docs/product/decision-flow-concept-01.md` — 5 indexed sections: Decision flow concept 01, Product intent, Component contracts, Design constraints, Creation review. Sections: docs/product/decision-flow-concept-01.md (L1–66); Decision flow concept 01 (L1–66); Product intent (L10–25); Component contracts (L26–37); Design constraints (L38–50); Creation review (L51–66)
- `docs/product/delivery-plan.md` — 27 indexed sections: Dependency-ordered delivery plan, Operating rules for implementers, Phase 0 - decisions, discovery and baseline (2-3 weeks), P0-01 Product discovery and choice-model gate, P0-02 Engineering baseline, …. Sections: docs/product/delivery-plan.md (L1–288); Dependency-ordered delivery plan (L1–288); Operating rules for implementers (L7–21); Phase 0 - decisions, discovery and baseline (2-3 weeks) (L22–82); P0-01 Product discovery and choice-model gate (L28–42); P0-02 Engineering baseline (L43–51); P0-03 Content audit (L52–61); P0-04 Analytics baseline (L62–73)
- `docs/product/discovery-decisions.md` — 7 indexed sections: Discovery decisions and implementation gates, 1. Accepted direction, 2. Open hypotheses, 3. Stage 0 protocol and locked thresholds, 4. H3 concept-test contract, …. Sections: docs/product/discovery-decisions.md (L1–134); Discovery decisions and implementation gates (L1–134); 1. Accepted direction (L13–27); 2. Open hypotheses (L28–44); 3. Stage 0 protocol and locked thresholds (L45–69); 4. H3 concept-test contract (L70–104); 5. Content gate (L105–121); 6. Implementation consequences (L122–134)
- `docs/product/quality-and-design.md` — 13 indexed sections: Design and quality operating model, 1. Design workflow, Foundation v1, Decision flow concept 01, Client flow skeleton, …. Sections: docs/product/quality-and-design.md (L1–275); Design and quality operating model (L1–275); 1. Design workflow (L3–140); Foundation v1 (L58–98); Decision flow concept 01 (L99–110); Client flow skeleton (L111–125); P0 mobile wireframes pass 01 (L126–140); 2. QA strategy (L141–162)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy)
- Related: [Target recommendation engine](RandoMeal--Architecture--Recommendation-Engine), [Analytics and measurement plan](RandoMeal--Analytics--Measurement), [Design system and product quality](RandoMeal--Design--System-and-Quality)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`single` · `shortlist` · `hybrid` · `experiment` · `H3` · `одно блюдо` · `2-3 варианта` · `гипотеза`
