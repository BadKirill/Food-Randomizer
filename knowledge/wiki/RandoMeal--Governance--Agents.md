# Agent governance

Mandatory project instructions, design workflow, repository safety, selective knowledge retrieval, and the source-code comment prohibition.

Status: **current**
Authority: **canonical**

## Rules and patterns

- Use the RandoMeal knowledge skill before code changes, reviews, architecture, data, API, QA, or design work.
- Use the design anti-slop skill before creating, reviewing, or changing user-facing design or UI.
- Do not add source-code comments, TODO or FIXME notes, commented-out code, or explanatory blocks.
- Preserve unrelated dirty work and use additive database migrations.

## Source coverage

- `.agents/skills/design-anti-slop/agents/openai.yaml` — 4 indexed sections: interface, display_name, short_description, default_prompt. Sections: .agents/skills/design-anti-slop/agents/openai.yaml (L1–5); interface (L1–5); display_name (L2–2); short_description (L3–3); default_prompt (L4–5)
- `.agents/skills/design-anti-slop/references/catalog.md` — 36 indexed sections: Project interpretation, Каталог слоп-теллов (правила детекции и фиксы), Баны (чинить всегда), T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый), T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах), …. Sections: .agents/skills/design-anti-slop/references/catalog.md (L1–242); Project interpretation (L1–6); Каталог слоп-теллов (правила детекции и фиксы) (L7–242); Баны (чинить всегда) (L17–68); T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый) (L19–24); T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах) (L25–30); T1 · Цветной border-left как акцент — ban · вес 4/6 («canonical AI dashboard tile») (L31–36); T2 · Эмодзи вместо иконок в UI-хроме — ban · вес 4/6, Reddit 0.5% (L37–42)
- `.agents/skills/design-anti-slop/SKILL.md` — 7 indexed sections: Design anti-slop for RandoMeal, Приоритет источников, Режимы, Обязательный workflow, Интерпретация каталога в мобильном продукте, …. Sections: .agents/skills/design-anti-slop/SKILL.md (L1–96); Design anti-slop for RandoMeal (L6–96); Приоритет источников (L11–23); Режимы (L24–32); Обязательный workflow (L33–55); Интерпретация каталога в мобильном продукте (L56–67); Figma и реализация (L68–78); Формат аудита (L79–96)
- `.agents/skills/randomeal-knowledge/agents/openai.yaml` — 10 indexed sections: interface, display_name, short_description, default_prompt, policy, …. Sections: .agents/skills/randomeal-knowledge/agents/openai.yaml (L1–12); interface (L1–4); display_name (L2–2); short_description (L3–3); default_prompt (L4–4); policy (L5–6); allow_implicit_invocation (L6–6); dependencies (L7–12)
- `.agents/skills/randomeal-knowledge/references/wiki-sync-protocol.md` — 5 indexed sections: Native GitHub Wiki MCP sync protocol, Preconditions, Upsert, Verification, Failure behavior. Sections: .agents/skills/randomeal-knowledge/references/wiki-sync-protocol.md (L1–43); Native GitHub Wiki MCP sync protocol (L1–43); Preconditions (L6–16); Upsert (L17–26); Verification (L27–35); Failure behavior (L36–43)
- `.agents/skills/randomeal-knowledge/SKILL.md` — 6 indexed sections: RandoMeal Knowledge, Retrieval workflow, Retrieval agent, Change lifecycle, External GitHub Wiki synchronization, …. Sections: .agents/skills/randomeal-knowledge/SKILL.md (L1–95); RandoMeal Knowledge (L6–95); Retrieval workflow (L12–38); Retrieval agent (L39–54); Change lifecycle (L55–70); External GitHub Wiki synchronization (L71–84); Handoff (L85–95)
- `.codex/agents/knowledge-retriever.toml` — toml file knowledge-retriever.toml. Sections: .codex/agents/knowledge-retriever.toml (L1–13)
- `AGENTS.md` — 5 indexed sections: RandoMeal agent instructions, Mandatory knowledge workflow, Mandatory design workflow, Repository safety, Source code comments. Sections: AGENTS.md (L1–48); RandoMeal agent instructions (L1–48); Mandatory knowledge workflow (L3–21); Mandatory design workflow (L22–34); Repository safety (L35–40); Source code comments (L41–48)
- `AI_CONTEXT.md` — 14 indexed sections: AI Context, Project, Product Rules, Architecture, Stack, …. Sections: AI_CONTEXT.md (L1–242); AI Context (L1–242); Project (L3–18); Product Rules (L19–29); Architecture (L30–49); Stack (L50–80); Production Database (L81–100); Deployment (L101–121)

## Graph relations

- Depends on: [Knowledge system](RandoMeal--Governance--Knowledge-System)
- Related: [Design system and product quality](RandoMeal--Design--System-and-Quality), [QA, security, and release gates](RandoMeal--Quality--QA-Strategy)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Superseded by: none

## Retrieval tags

`agents` · `skill` · `rules` · `comments` · `design anti slop` · `агент` · `правила` · `комментарии`
