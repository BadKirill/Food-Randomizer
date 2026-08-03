# Agent governance

Shared-baseline precedence, mandatory project instructions, design workflow, repository safety, selective knowledge retrieval, and the source-code comment prohibition.

Status: **current**
Authority: **canonical**

## Rules and patterns

- Read and locally verify knowledge/general-ai-baseline.md before planning or coding, then use repository sources and the generated local project Wiki for project facts, nuances, contradictions, and technical contracts.
- Project guidance may strengthen or specialize the shared baseline but must not silently weaken a shared guarantee.
- Do not contact external Wiki content during ordinary work; require an explicit request or dedicated synchronization command and mandatory read-back for every external write.
- Do not automate external Wiki access or freshness gates on commit or pull request without a separate explicit policy decision.
- Use the RandoMeal knowledge skill before code changes, reviews, architecture, data, API, QA, or design work.
- Use the design anti-slop skill before creating, reviewing, or changing user-facing design or UI.
- Use only the canonical Figma file key declared in design/figma-project.json and run the deny-by-default guard before every Figma MCP operation.
- Do not add source-code comments, TODO or FIXME notes, commented-out code, or explanatory blocks.
- Preserve unrelated dirty work and use additive database migrations.
- English is the default language for every project and all project artifacts; use another language within a project only when the user explicitly requests it.
- General AI Wiki requires English agent-facing documentation; the existing Russian design-anti-slop skill is a recorded project contradiction that requires a separate translation task rather than silent propagation.

## Source coverage

- `.agents/skills/design-anti-slop/agents/openai.yaml` — 4 indexed sections: interface, display_name, short_description, default_prompt. Sections: .agents/skills/design-anti-slop/agents/openai.yaml (L1–5); interface (L1–5); display_name (L2–2); short_description (L3–3); default_prompt (L4–5)
- `.agents/skills/design-anti-slop/references/catalog.md` — 36 indexed sections: Project interpretation, Каталог слоп-теллов (правила детекции и фиксы), Баны (чинить всегда), T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый), T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах), …. Sections: .agents/skills/design-anti-slop/references/catalog.md (L1–242); Project interpretation (L1–6); Каталог слоп-теллов (правила детекции и фиксы) (L7–242); Баны (чинить всегда) (L17–68); T6 · Indigo/violet акцент и градиент без брифа — ban · вес 6/6, Reddit 2.3% (самый цитируемый) (L19–24); T16 · Нетронутый shadcn/Tailwind-кит — ban · вес 4/6, Reddit 2.5% (№1 в жалобах) (L25–30); T1 · Цветной border-left как акцент — ban · вес 4/6 («canonical AI dashboard tile») (L31–36); T2 · Эмодзи вместо иконок в UI-хроме — ban · вес 4/6, Reddit 0.5% (L37–42)
- `.agents/skills/design-anti-slop/SKILL.md` — 7 indexed sections: Design anti-slop for RandoMeal, Приоритет источников, Режимы, Обязательный workflow, Интерпретация каталога в мобильном продукте, …. Sections: .agents/skills/design-anti-slop/SKILL.md (L1–100); Design anti-slop for RandoMeal (L6–100); Приоритет источников (L11–23); Режимы (L24–32); Обязательный workflow (L33–59); Интерпретация каталога в мобильном продукте (L60–71); Figma и реализация (L72–82); Формат аудита (L83–100)
- `.agents/skills/randomeal-knowledge/agents/openai.yaml` — 10 indexed sections: interface, display_name, short_description, default_prompt, policy, …. Sections: .agents/skills/randomeal-knowledge/agents/openai.yaml (L1–12); interface (L1–4); display_name (L2–2); short_description (L3–3); default_prompt (L4–4); policy (L5–6); allow_implicit_invocation (L6–6); dependencies (L7–12)
- `.agents/skills/randomeal-knowledge/references/notion-sync-protocol.md` — 8 indexed sections: Explicit Notion Wiki MCP synchronization protocol, Fixed target, Explicit General Wiki pull, Local preparation, Explicit General Wiki push, …. Sections: .agents/skills/randomeal-knowledge/references/notion-sync-protocol.md (L1–101); Explicit Notion Wiki MCP synchronization protocol (L1–101); Fixed target (L12–26); Explicit General Wiki pull (L27–40); Local preparation (L41–55); Explicit General Wiki push (L56–69); Explicit project Wiki upsert (L70–80); Read-back and state (L81–88)
- `.agents/skills/randomeal-knowledge/SKILL.md` — 6 indexed sections: RandoMeal Knowledge, Retrieval workflow, Retrieval agent, Change lifecycle, External Notion Wiki synchronization, …. Sections: .agents/skills/randomeal-knowledge/SKILL.md (L1–132); RandoMeal Knowledge (L6–132); Retrieval workflow (L13–58); Retrieval agent (L59–79); Change lifecycle (L80–99); External Notion Wiki synchronization (L100–119); Handoff (L120–132)
- `.codex/agents/knowledge-retriever.toml` — toml file knowledge-retriever.toml. Sections: .codex/agents/knowledge-retriever.toml (L1–17)
- `AGENTS.md` — 5 indexed sections: RandoMeal agent instructions, Mandatory knowledge workflow, Mandatory design workflow, Repository safety, Source code comments. Sections: AGENTS.md (L1–78); RandoMeal agent instructions (L1–78); Mandatory knowledge workflow (L3–39); Mandatory design workflow (L40–64); Repository safety (L65–70); Source code comments (L71–78)
- `AI_CONTEXT.md` — 14 indexed sections: AI Context, Project, Product Rules, Architecture, Stack, …. Sections: AI_CONTEXT.md (L1–242); AI Context (L1–242); Project (L3–18); Product Rules (L19–29); Architecture (L30–49); Stack (L50–80); Production Database (L81–100); Deployment (L101–121)

## Graph relations

- Depends on: [Knowledge system](RandoMeal--Governance--Knowledge-System)
- Related: [Design system and product quality](RandoMeal--Design--System-and-Quality), [Canonical Figma file governance](RandoMeal--Governance--Canonical-Figma), [QA, security, and release gates](RandoMeal--Quality--QA-Strategy)
- Supersedes: [Legacy and contradictory documentation map](RandoMeal--Legacy--Documentation-Map)
- Superseded by: none

## Retrieval tags

`agents` · `skill` · `rules` · `comments` · `design anti slop` · `агент` · `правила` · `комментарии`
