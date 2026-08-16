# Current mobile theme and visual debt

The mobile app still uses a large global StyleSheet with hard-coded warm orange and cream values. The reviewed Foundation v1 target now exists in the repository and canonical Figma file, but mobile has not yet migrated to it.

Status: **mixed**
Authority: **current-code-over-legacy-design-doc**

## Rules and patterns

- Current code is orange and cream while DESIGN.md describes a legacy green Starbucks-like direction.
- Product quality constraints and approved future brand choices override DESIGN.md.
- Build semantic tokens and reusable state-complete components before screen-scale polish.
- Figma and code must share token and component contracts.
- Migrate mobile through a separate tested implementation task; the presence of Foundation v1 does not mean the current theme already consumes it.

## Source coverage

- `apps/mobile/src/theme/index.ts` — 1 indexed section: styles. Sections: apps/mobile/src/theme/index.ts (L1–756); styles (L3–756)
- `DESIGN.md` — 20 indexed sections: Food Randomizer Design System (Starbucks-Inspired), 1. Design Direction, 2. Brand Tokens, Color Tokens, Radius Tokens, …. Sections: DESIGN.md (L1–218); Food Randomizer Design System (Starbucks-Inspired) (L1–218); 1. Design Direction (L3–19); 2. Brand Tokens (L20–82); Color Tokens (L22–46); Radius Tokens (L47–58); Spacing Tokens (L59–70); Shadow Tokens (L71–82)
- `design/foundations.tokens.json` — 8 indexed sections: schemaVersion, system, version, figmaFileKey, colorMode, …. Sections: design/foundations.tokens.json (L1–1020); schemaVersion (L2–2); system (L3–3); version (L4–4); figmaFileKey (L5–5); colorMode (L6–6); typography (L7–100); effectStyles (L101–128)
- `docs/product/quality-and-design.md` — 14 indexed sections: Design and quality operating model, 1. Design workflow, Foundation v1, Core Design System v1, Decision flow concept 01, …. Sections: docs/product/quality-and-design.md (L1–305); Design and quality operating model (L1–305); 1. Design workflow (L3–170); Foundation v1 (L60–100); Core Design System v1 (L101–111); Decision flow concept 01 (L112–129); Client flow skeleton (L130–149); P0 mobile wireframes pass 01 (L150–170)

## Graph relations

- Depends on: [Design system and product quality](RandoMeal--Design--System-and-Quality), [Current mobile shell](RandoMeal--Mobile--Current-Shell)
- Related: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Superseded by: [Design system and product quality](RandoMeal--Design--System-and-Quality)

## Retrieval tags

`theme` · `styles` · `tokens` · `colors` · `design debt` · `тема` · `стили` · `токены`
