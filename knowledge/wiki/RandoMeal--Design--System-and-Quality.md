# Design system and product quality

Foundation v1, a 20-set and 128-variant Core Design System v1, Decision flow concept 01, a 12-lane client flow skeleton, a 16-screen P0 mobile DS v1 pass and a creation-reviewed Stage 0 prototype with an adaptive eight-screen journey, preserved v2 journey and six focused research entries are implemented in canonical Figma; broad launch-platform coverage and mobile code adoption remain target work.

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
- Core Design System v1 contains 20 component sets and exactly 128 variants plus three private icon components; no interactive variant is below the 44 px target.
- The DS v1 concept migration at node 167:26 contains six 390 by 844 screens; Hybrid is the founder-selected hierarchical candidate while Single and Shortlist remain reversible bounds.
- The client-flow mapping at node 170:2 maps 20 flow responsibilities to reusable component contracts without replacing the original sequencing and analytics map.
- P0 Mobile Pass 02 at node 173:71 rebuilds all 16 F01-F04 states at 390 by 844 from Core Design System v1 instances.
- Figma Code Connect remains deferred until matching source components exist; do not create fabricated mappings.
- Decision flow concept 01 uses equal-fidelity D0-A and D0-B screens plus context, accepted and safe-empty states; it is Stage 0 exploration rather than an approved launch interaction.
- Concept 01 local Button, Choice chip and Decision option sets must remain bound to semantic variables and keep mobile controls at least 44 px high.
- The canonical Client flows skeleton at node 58:3 covers 12 lanes and 90 checkpoints but is not approved launch navigation or final UI.
- D0/H3 cardinality, H7 Pantry value and H10 payment remain explicit branches or gates throughout the flow skeleton.
- P0 mobile wireframes pass 01 at node 75:3 contains 16 creation-reviewed 393 by 852 screens for F01-F04 and keeps D0-A single, D0-B shortlist and D0-C hybrid reversible.
- All current visible copy, layer names, reusable component defaults and instance overrides in the canonical Figma file are English; other languages belong only in explicit localization-expansion test artifacts.
- The Stage 0 research prototype page 187:2 contains 75 top-level runner frames: 27 legacy focused runners, preserved v2, v3 and v4 journeys, plus 24 active full-flow v5 A/B/H frames; Flows 10-12 start at nodes 347:2021, 347:3022 and 347:3293.
- The adaptive v4 subtree has 270 nodes, 41 interactive sources, 73 top-level actions and 29 variable-bound texts, with no invalid or cross-version destination and no target below 44 px; its private 12-variable collection is hidden from publishing.
- Every v5 comparison path exposes a non-relaxable no-peanuts limit, editable 1, 2 or 4 servings, working Back navigation and six independent multi-select ingredient chips; the first ingredient anchors the deterministic fixture while extra selections and fixed recipe amounts are disclosed as research limitations.
- The 24 v5 root frames contain no cross-version navigation, interaction target below 44 px, unsupported visible font or visible node outside its mobile root; all three Maze drafts use matching Welcome and Cooking start/goal nodes with interactive components enabled.
- The shared Hybrid component at node 157:54 and reference screens 168:145, 176:138, 192:1167 and 204:1149 show one dominant primary plus two quieter factual tradeoffs.
- Focused small-iPhone node 198:744, Android node 198:748 and 125 percent large-text node 198:752 are creation-reviewed evidence, not complete launch-platform coverage.
- P0 design still requires broader platform, localization, keyboard, safe-area, reduced-motion, imagery and production analytics implementation after D0.

## Source coverage

- `.agents/skills/design-anti-slop/agents/openai.yaml` — 4 indexed sections: interface, display_name, short_description, default_prompt. Sections: .agents/skills/design-anti-slop/agents/openai.yaml (L1–5); interface (L1–5); display_name (L2–2); short_description (L3–3); default_prompt (L4–5)
- `.agents/skills/design-anti-slop/references/catalog.md` — 36 indexed sections: Project interpretation, Каталог слоп-теллов (правила детекции и фиксы), Баны (чинить всегда), T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый), T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах), …. Sections: .agents/skills/design-anti-slop/references/catalog.md (L1–242); Project interpretation (L1–6); Каталог слоп-теллов (правила детекции и фиксы) (L7–242); Баны (чинить всегда) (L17–68); T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый) (L19–24); T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах) (L25–30); T1 · Цветной border-left как акцент — ban · вес 4/6 («canonical AI dashboard tile») (L31–36); T2 · Эмодзи вместо иконок в UI-хроме — ban · вес 4/6, Reddit 0.5% (L37–42)
- `.agents/skills/design-anti-slop/SKILL.md` — 7 indexed sections: Design anti-slop for RandoMeal, Приоритет источников, Режимы, Обязательный workflow, Интерпретация каталога в мобильном продукте, …. Sections: .agents/skills/design-anti-slop/SKILL.md (L1–100); Design anti-slop for RandoMeal (L6–100); Приоритет источников (L11–23); Режимы (L24–32); Обязательный workflow (L33–59); Интерпретация каталога в мобильном продукте (L60–71); Figma и реализация (L72–82); Формат аудита (L83–100)
- `DESIGN.md` — 20 indexed sections: Food Randomizer Design System (Starbucks-Inspired), 1. Design Direction, 2. Brand Tokens, Color Tokens, Radius Tokens, …. Sections: DESIGN.md (L1–218); Food Randomizer Design System (Starbucks-Inspired) (L1–218); 1. Design Direction (L3–19); 2. Brand Tokens (L20–82); Color Tokens (L22–46); Radius Tokens (L47–58); Spacing Tokens (L59–70); Shadow Tokens (L71–82)
- `design/figma-design-system-v1.json` — 10 indexed sections: version, status, reviewedAt, fileKey, fileUrl, …. Sections: design/figma-design-system-v1.json (L1–68); version (L2–2); status (L3–3); reviewedAt (L4–4); fileKey (L5–5); fileUrl (L6–6); fonts (L7–10); foundation (L11–17)
- `design/figma-project.json` — 6 indexed sections: schemaVersion, project, policy, file, allowedFileKeys, …. Sections: design/figma-project.json (L1–19); schemaVersion (L2–2); project (L3–3); policy (L4–4); file (L5–9); allowedFileKeys (L10–12); operations (L13–19)
- `design/foundations.tokens.json` — 8 indexed sections: schemaVersion, system, version, figmaFileKey, colorMode, …. Sections: design/foundations.tokens.json (L1–1020); schemaVersion (L2–2); system (L3–3); version (L4–4); figmaFileKey (L5–5); colorMode (L6–6); typography (L7–100); effectStyles (L101–128)
- `docs/product/client-flow-skeleton.md` — 6 indexed sections: Client flow skeleton, Status, Product constraints represented, Flow inventory, Visual language and review, …. Sections: docs/product/client-flow-skeleton.md (L1–91); Client flow skeleton (L1–91); Status (L3–22); Product constraints represented (L23–39); Flow inventory (L40–56); Visual language and review (L57–75); Next design pass (L76–91)
- `docs/product/decision-flow-concept-01.md` — 6 indexed sections: Decision flow concept 01, Product intent, Component contracts, Design constraints, Creation review, …. Sections: docs/product/decision-flow-concept-01.md (L1–90); Decision flow concept 01 (L1–90); Product intent (L13–28); Component contracts (L29–40); Design constraints (L41–53); Creation review (L54–69); Core Design System v1 migration (L70–90)
- `docs/product/design-system-v1.md` — 11 indexed sections: Core Design System v1, Purpose, Foundations, Component inventory, Migrated product artifacts, …. Sections: docs/product/design-system-v1.md (L1–156); Core Design System v1 (L1–156); Purpose (L10–20); Foundations (L21–39); Component inventory (L40–77); Migrated product artifacts (L78–117); Decision concept (L80–86); Client-flow mapping (L87–93)
- `docs/product/figma-governance.md` — 4 indexed sections: Canonical Figma file governance, Canonical project file, Deny-by-default rules, Ownership and handoff. Sections: docs/product/figma-governance.md (L1–42); Canonical Figma file governance (L1–42); Canonical project file (L3–15); Deny-by-default rules (L16–36); Ownership and handoff (L37–42)
- `docs/product/p0-mobile-wireframes-pass-01.md` — 7 indexed sections: P0 mobile wireframes pass 01, Scope, Product decisions represented, Design-system use, Creation review, …. Sections: docs/product/p0-mobile-wireframes-pass-01.md (L1–113); P0 mobile wireframes pass 01 (L1–113); Scope (L13–32); Product decisions represented (L33–47); Design-system use (L48–58); Creation review (L59–74); Remaining design work (L75–87); Pass 02 · Core Design System v1 (L88–113)
- `docs/product/quality-and-design.md` — 14 indexed sections: Design and quality operating model, 1. Design workflow, Foundation v1, Core Design System v1, Decision flow concept 01, …. Sections: docs/product/quality-and-design.md (L1–305); Design and quality operating model (L1–305); 1. Design workflow (L3–170); Foundation v1 (L60–100); Core Design System v1 (L101–111); Decision flow concept 01 (L112–129); Client flow skeleton (L130–149); P0 mobile wireframes pass 01 (L150–170)
- `docs/product/stage-0-research-prototype.md` — 14 indexed sections: Stage 0 research prototype handoff, Purpose, Canonical structure, Preserved v2 participant journey, Adaptive v4 participant journey, …. Sections: docs/product/stage-0-research-prototype.md (L1–395); Stage 0 research prototype handoff (L1–395); Purpose (L20–39); Canonical structure (L40–56); Preserved v2 participant journey (L57–77); Adaptive v4 participant journey (L78–110); Full-flow v5 comparison journeys (L111–136); Preserved adaptive v3 participant journey (L137–164)

## Graph relations

- Depends on: [Product strategy and discovery gates](RandoMeal--Product--Strategy), [Hybrid choice-cardinality evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Agent governance](RandoMeal--Governance--Agents)
- Related: [Canonical Figma file governance](RandoMeal--Governance--Canonical-Figma), [QA, security, and release gates](RandoMeal--Quality--QA-Strategy), [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map), [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt)
- Superseded by: none

## Retrieval tags

`design` · `figma` · `tokens` · `components` · `accessibility` · `anti slop` · `дизайн` · `фигма`
