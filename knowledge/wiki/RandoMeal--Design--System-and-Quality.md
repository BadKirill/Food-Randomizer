# Design system and product quality

Figma variables, semantic tokens, component contracts, accessibility, complete interaction states, content trust, responsive behavior, and anti-slop creation review.

Status: **target**
Authority: **product-design-source-of-truth**

## Rules and patterns

- Use the design anti-slop skill for every Figma or user-facing UI task.
- Product safety, accessibility, signed discovery decisions, project tokens, and approved brand choices override the anti-slop catalog.
- New work requires creation review; existing work starts with audit unless immediate fixes are authorized.
- DESIGN.md is legacy reference and cannot define the final brand or navigation.

## Source coverage

- `.agents/skills/design-anti-slop/agents/openai.yaml` — 4 indexed sections: interface, display_name, short_description, default_prompt. Sections: .agents/skills/design-anti-slop/agents/openai.yaml (L1–5); interface (L1–5); display_name (L2–2); short_description (L3–3); default_prompt (L4–5)
- `.agents/skills/design-anti-slop/references/catalog.md` — 36 indexed sections: Project interpretation, Каталог слоп-теллов (правила детекции и фиксы), Баны (чинить всегда), T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый), T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах), …. Sections: .agents/skills/design-anti-slop/references/catalog.md (L1–242); Project interpretation (L1–6); Каталог слоп-теллов (правила детекции и фиксы) (L7–242); Баны (чинить всегда) (L17–68); T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый) (L19–24); T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах) (L25–30); T1 · Цветной border-left как акцент — ban · вес 4/6 («canonical AI dashboard tile») (L31–36); T2 · Эмодзи вместо иконок в UI-хроме — ban · вес 4/6, Reddit 0.5% (L37–42)
- `.agents/skills/design-anti-slop/SKILL.md` — 7 indexed sections: Design anti-slop for RandoMeal, Приоритет источников, Режимы, Обязательный workflow, Интерпретация каталога в мобильном продукте, …. Sections: .agents/skills/design-anti-slop/SKILL.md (L1–96); Design anti-slop for RandoMeal (L6–96); Приоритет источников (L11–23); Режимы (L24–32); Обязательный workflow (L33–55); Интерпретация каталога в мобильном продукте (L56–67); Figma и реализация (L68–78); Формат аудита (L79–96)
- `DESIGN.md` — 20 indexed sections: Food Randomizer Design System (Starbucks-Inspired), 1. Design Direction, 2. Brand Tokens, Color Tokens, Radius Tokens, …. Sections: DESIGN.md (L1–218); Food Randomizer Design System (Starbucks-Inspired) (L1–218); 1. Design Direction (L3–19); 2. Brand Tokens (L20–82); Color Tokens (L22–46); Radius Tokens (L47–58); Spacing Tokens (L59–70); Shadow Tokens (L71–82)
- `docs/product/quality-and-design.md` — 9 indexed sections: Design and quality operating model, 1. Design workflow, 2. QA strategy, 3. Critical invariant suite, 4. AI evaluation, …. Sections: docs/product/quality-and-design.md (L1–186); Design and quality operating model (L1–186); 1. Design workflow (L3–51); 2. QA strategy (L52–73); 3. Critical invariant suite (L74–108); 4. AI evaluation (L109–124); 5. Accessibility and localization gates (L125–133); 6. CI and release gates (L134–164)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Single versus shortlist evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Agent governance](RandoMeal--Governance--Agents)
- Related: [QA, security, and release gates](RandoMeal--Quality--QA-Strategy), [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map), [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt)
- Superseded by: none

## Retrieval tags

`design` · `figma` · `tokens` · `components` · `accessibility` · `anti slop` · `дизайн` · `фигма`
