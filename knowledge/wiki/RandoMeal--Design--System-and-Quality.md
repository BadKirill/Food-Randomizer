# Design system and product quality

Foundation v1 is implemented and validated in the canonical Figma file and repository token source; component contracts, full interaction states and mobile adoption remain target work.

Status: **mixed**
Authority: **product-design-source-of-truth**

## Rules and patterns

- Use the design anti-slop skill for every Figma or user-facing UI task.
- Use the single canonical Figma file declared in design/figma-project.json for every project design operation.
- Product safety, accessibility, signed discovery decisions, project tokens, and approved brand choices override the anti-slop catalog.
- New work requires creation review; existing work starts with audit unless immediate fixes are authorized.
- DESIGN.md is legacy reference and cannot define the final brand or navigation.
- Foundation v1 has five collections and exactly 78 variables: 33 primitives, 29 semantic colors, seven spacing values, five radii and four sizes.
- Ivory, Graphite and Paprika are the approved base palette; success, warning, danger and disabled are explicit semantic states.
- Fraunces and Source Sans 3 are the approved SIL Open Font License 1.1 families for display and interface text.
- Every token has Web, iOS and Android syntax, and the minimum touch target is 44 px.
- Ivory text on the Paprika brand background must remain at or above WCAG AA contrast; Foundation v1 validates at 4.67:1.
- Only the Light color mode is approved; dark mode requires separate validation.

## Source coverage

- `.agents/skills/design-anti-slop/agents/openai.yaml` — 4 indexed sections: interface, display_name, short_description, default_prompt. Sections: .agents/skills/design-anti-slop/agents/openai.yaml (L1–5); interface (L1–5); display_name (L2–2); short_description (L3–3); default_prompt (L4–5)
- `.agents/skills/design-anti-slop/references/catalog.md` — 36 indexed sections: Project interpretation, Каталог слоп-теллов (правила детекции и фиксы), Баны (чинить всегда), T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый), T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах), …. Sections: .agents/skills/design-anti-slop/references/catalog.md (L1–242); Project interpretation (L1–6); Каталог слоп-теллов (правила детекции и фиксы) (L7–242); Баны (чинить всегда) (L17–68); T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый) (L19–24); T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах) (L25–30); T1 · Цветной border-left как акцент — ban · вес 4/6 («canonical AI dashboard tile») (L31–36); T2 · Эмодзи вместо иконок в UI-хроме — ban · вес 4/6, Reddit 0.5% (L37–42)
- `.agents/skills/design-anti-slop/SKILL.md` — 7 indexed sections: Design anti-slop for RandoMeal, Приоритет источников, Режимы, Обязательный workflow, Интерпретация каталога в мобильном продукте, …. Sections: .agents/skills/design-anti-slop/SKILL.md (L1–100); Design anti-slop for RandoMeal (L6–100); Приоритет источников (L11–23); Режимы (L24–32); Обязательный workflow (L33–59); Интерпретация каталога в мобильном продукте (L60–71); Figma и реализация (L72–82); Формат аудита (L83–100)
- `DESIGN.md` — 20 indexed sections: Food Randomizer Design System (Starbucks-Inspired), 1. Design Direction, 2. Brand Tokens, Color Tokens, Radius Tokens, …. Sections: DESIGN.md (L1–218); Food Randomizer Design System (Starbucks-Inspired) (L1–218); 1. Design Direction (L3–19); 2. Brand Tokens (L20–82); Color Tokens (L22–46); Radius Tokens (L47–58); Spacing Tokens (L59–70); Shadow Tokens (L71–82)
- `design/figma-project.json` — 6 indexed sections: schemaVersion, project, policy, file, allowedFileKeys, …. Sections: design/figma-project.json (L1–19); schemaVersion (L2–2); project (L3–3); policy (L4–4); file (L5–9); allowedFileKeys (L10–12); operations (L13–19)
- `design/foundations.tokens.json` — 8 indexed sections: schemaVersion, system, version, figmaFileKey, colorMode, …. Sections: design/foundations.tokens.json (L1–1020); schemaVersion (L2–2); system (L3–3); version (L4–4); figmaFileKey (L5–5); colorMode (L6–6); typography (L7–100); effectStyles (L101–128)
- `docs/product/figma-governance.md` — 4 indexed sections: Canonical Figma file governance, Canonical project file, Deny-by-default rules, Ownership and handoff. Sections: docs/product/figma-governance.md (L1–42); Canonical Figma file governance (L1–42); Canonical project file (L3–15); Deny-by-default rules (L16–36); Ownership and handoff (L37–42)
- `docs/product/quality-and-design.md` — 10 indexed sections: Design and quality operating model, 1. Design workflow, Foundation v1, 2. QA strategy, 3. Critical invariant suite, …. Sections: docs/product/quality-and-design.md (L1–229); Design and quality operating model (L1–229); 1. Design workflow (L3–94); Foundation v1 (L54–94); 2. QA strategy (L95–116); 3. Critical invariant suite (L117–151); 4. AI evaluation (L152–167); 5. Accessibility and localization gates (L168–176)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Single versus shortlist evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Agent governance](RandoMeal--Governance--Agents)
- Related: [Canonical Figma file governance](RandoMeal--Governance--Canonical-Figma), [QA, security, and release gates](RandoMeal--Quality--QA-Strategy), [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map), [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt)
- Superseded by: none

## Retrieval tags

`design` · `figma` · `tokens` · `components` · `accessibility` · `anti slop` · `дизайн` · `фигма`
