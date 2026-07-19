# Current mobile theme and visual debt

Large global StyleSheet with hard-coded warm orange and cream values; semantic tokens, component primitives, Figma variables, themes, and accessibility state contracts are not yet implemented.

Status: **mixed**
Authority: **current-code-over-legacy-design-doc**

## Rules and patterns

- Current code is orange and cream while DESIGN.md describes a legacy green Starbucks-like direction.
- Product quality constraints and approved future brand choices override DESIGN.md.
- Build semantic tokens and reusable state-complete components before screen-scale polish.
- Figma and code must share token and component contracts.

## Source coverage

- `apps/mobile/src/theme/index.ts` — 1 indexed section: styles. Sections: apps/mobile/src/theme/index.ts (L1–756); styles (L3–756)
- `DESIGN.md` — 20 indexed sections: Food Randomizer Design System (Starbucks-Inspired), 1. Design Direction, 2. Brand Tokens, Color Tokens, Radius Tokens, …. Sections: DESIGN.md (L1–218); Food Randomizer Design System (Starbucks-Inspired) (L1–218); 1. Design Direction (L3–19); 2. Brand Tokens (L20–82); Color Tokens (L22–46); Radius Tokens (L47–58); Spacing Tokens (L59–70); Shadow Tokens (L71–82)
- `docs/product/quality-and-design.md` — 9 indexed sections: Design and quality operating model, 1. Design workflow, 2. QA strategy, 3. Critical invariant suite, 4. AI evaluation, …. Sections: docs/product/quality-and-design.md (L1–186); Design and quality operating model (L1–186); 1. Design workflow (L3–51); 2. QA strategy (L52–73); 3. Critical invariant suite (L74–108); 4. AI evaluation (L109–124); 5. Accessibility and localization gates (L125–133); 6. CI and release gates (L134–164)

## Graph relations

- Depends on: [Design system and product quality](RandoMeal--Design--System-and-Quality), [Current mobile shell](RandoMeal--Mobile--Current-Shell)
- Related: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Superseded by: [Design system and product quality](RandoMeal--Design--System-and-Quality)

## Retrieval tags

`theme` · `styles` · `tokens` · `colors` · `design debt` · `тема` · `стили` · `токены`
