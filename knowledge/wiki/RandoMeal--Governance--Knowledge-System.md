# Knowledge system

Verified local General AI snapshot, deterministic project catalog and index, selective query, local Wiki renderer, explicit read-back-verified Notion synchronization, validation gates, repo skill, and read-only retrieval agent.

Status: **current**
Authority: **canonical**

## Rules and patterns

- The verified knowledge/general-ai-baseline.md snapshot is the normal working source for cross-project planning and coding principles; the external General AI Wiki is shared upstream and the catalog is canonical for RandoMeal facts, contracts, and approved specializations.
- Every repository file receives an index record; generated outputs use managed records without recursive self-hashes.
- Ordinary retrieval verifies the local General snapshot first, returns project evidence paths and line ranges, and never contacts Notion.
- External General or project Wiki access requires an explicit user request or separately invoked dedicated synchronization workflow.
- An invoked external synchronization fails closed until every intended write is read back, body-hash verified, and recorded in the sync state; external mirror freshness is not an ordinary local completion gate.
- No automatic Notion read, write, or freshness gate runs on commit or pull request.

## Source coverage

- `.agents/skills/randomeal-knowledge/agents/openai.yaml` — 10 indexed sections: interface, display_name, short_description, default_prompt, policy, …. Sections: .agents/skills/randomeal-knowledge/agents/openai.yaml (L1–12); interface (L1–4); display_name (L2–2); short_description (L3–3); default_prompt (L4–4); policy (L5–6); allow_implicit_invocation (L6–6); dependencies (L7–12)
- `.agents/skills/randomeal-knowledge/references/notion-sync-protocol.md` — 8 indexed sections: Explicit Notion Wiki MCP synchronization protocol, Fixed target, Explicit General Wiki pull, Local preparation, Explicit General Wiki push, …. Sections: .agents/skills/randomeal-knowledge/references/notion-sync-protocol.md (L1–101); Explicit Notion Wiki MCP synchronization protocol (L1–101); Fixed target (L12–26); Explicit General Wiki pull (L27–40); Local preparation (L41–55); Explicit General Wiki push (L56–69); Explicit project Wiki upsert (L70–80); Read-back and state (L81–88)
- `.agents/skills/randomeal-knowledge/SKILL.md` — 6 indexed sections: RandoMeal Knowledge, Retrieval workflow, Retrieval agent, Change lifecycle, External Notion Wiki synchronization, …. Sections: .agents/skills/randomeal-knowledge/SKILL.md (L1–132); RandoMeal Knowledge (L6–132); Retrieval workflow (L13–58); Retrieval agent (L59–79); Change lifecycle (L80–99); External Notion Wiki synchronization (L100–119); Handoff (L120–132)
- `.codex/agents/knowledge-retriever.toml` — toml file knowledge-retriever.toml. Sections: .codex/agents/knowledge-retriever.toml (L1–17)
- `knowledge/catalog.json` — 6 indexed sections: schemaVersion, project, readingPolicy, syncPolicy, nodes, …. Sections: knowledge/catalog.json (L1–931); schemaVersion (L2–2); project (L3–7); readingPolicy (L8–26); syncPolicy (L27–62); nodes (L63–864); routes (L865–931)
- `knowledge/general-ai-baseline.md` — 10 indexed sections: General Rules for AI Coding Agents, Cross-Project Source Hierarchy, Shared-Baseline Change Synchronization, Evidence Before Action, Minimal and Focused Code, …. Sections: knowledge/general-ai-baseline.md (L1–67); General Rules for AI Coding Agents (L1–67); Cross-Project Source Hierarchy (L3–8); Shared-Baseline Change Synchronization (L9–16); Evidence Before Action (L17–24); Minimal and Focused Code (L25–31); Anti-Slop Standard (L32–36); Verification and Reverification (L37–43)
- `knowledge/README.md` — 5 indexed sections: RandoMeal repository knowledge graph, Canonical and generated files, Selective retrieval, Ordinary local lifecycle, Explicit external Notion workflow. Sections: knowledge/README.md (L1–71); RandoMeal repository knowledge graph (L1–71); Canonical and generated files (L5–22); Selective retrieval (L23–34); Ordinary local lifecycle (L35–51); Explicit external Notion workflow (L52–71)
- `scripts/knowledge/index-repository.mjs` — javascript file index-repository.mjs. Sections: scripts/knowledge/index-repository.mjs (L1–10)
- `scripts/knowledge/lib.mjs` — 35 indexed sections: rootDir, catalogPath, indexPath, wikiDir, wikiManifestPath, …. Sections: scripts/knowledge/lib.mjs (L1–447); rootDir (L7–7); catalogPath (L8–8); indexPath (L9–9); wikiDir (L10–10); wikiManifestPath (L11–11); wikiSyncStatePath (L12–53); sha256 (L54–57)
- `scripts/knowledge/notion-sync.mjs` — 17 indexed sections: managedOwner, normalizeLineEndings, canonicalNotionBody, stripPageTitle, tableCells, …. Sections: scripts/knowledge/notion-sync.mjs (L1–249); managedOwner (L3–4); normalizeLineEndings (L5–8); canonicalNotionBody (L9–20); stripPageTitle (L21–27); tableCells (L28–46); isTableSeparator (L47–51); convertMarkdownTables (L52–77)
- `scripts/knowledge/notion-sync.spec.mjs` — 9 indexed sections: rewrites managed links and preserves external links, converts markdown tables to Notion table blocks, builds and verifies a managed Notion payload, rejects a body that changed while keeping the declared hash, verifies a bounded shared baseline without owning child Wikis, …. Sections: scripts/knowledge/notion-sync.spec.mjs (L1–219); rewrites managed links and preserves external links (L28–32); converts markdown tables to Notion table blocks (L33–40); builds and verifies a managed Notion payload (L41–62); rejects a body that changed while keeping the declared hash (L63–82); verifies a bounded shared baseline without owning child Wikis (L83–110); rejects a stale or unbounded shared baseline (L111–135); plans create, update, and skip without deleting unmanaged pages (L136–150)
- `scripts/knowledge/plan-notion-sync.mjs` — javascript file plan-notion-sync.mjs. Sections: scripts/knowledge/plan-notion-sync.mjs (L1–49)
- `scripts/knowledge/query-knowledge.mjs` — 7 indexed sections: argument, tokens, includesToken, scoreNode, matchedRouteIds, …. Sections: scripts/knowledge/query-knowledge.mjs (L1–141); argument (L3–7); tokens (L8–11); includesToken (L12–15); scoreNode (L16–53); matchedRouteIds (L54–66); selectNodes (L67–93); contextPacket (L94–141)
- `scripts/knowledge/render-wiki.mjs` — 11 indexed sections: pageLink, wikiPageTitle, sourceList, renderHome, renderSidebar, …. Sections: scripts/knowledge/render-wiki.mjs (L1–218); pageLink (L7–10); wikiPageTitle (L11–17); sourceList (L18–25); renderHome (L26–61); renderSidebar (L62–74); renderProtocol (L75–98); renderNode (L99–135)
- `scripts/knowledge/validate-knowledge.mjs` — 1 indexed section: findDependencyCycle. Sections: scripts/knowledge/validate-knowledge.mjs (L1–118); findDependencyCycle (L39–118)
- `scripts/knowledge/validate-notion-sync.mjs` — javascript file validate-notion-sync.mjs. Sections: scripts/knowledge/validate-notion-sync.mjs (L1–21)
- `scripts/knowledge/verify-baseline-notion-fetch.mjs` — 1 indexed section: argument. Sections: scripts/knowledge/verify-baseline-notion-fetch.mjs (L1–36); argument (L4–36)
- `scripts/knowledge/verify-notion-fetch.mjs` — 1 indexed section: argument. Sections: scripts/knowledge/verify-notion-fetch.mjs (L1–59); argument (L6–59)

## Graph relations

- Depends on: none
- Related: [Complete repository inventory](RandoMeal--Governance--Repository-Inventory), [Continuous integration and test runners](RandoMeal--Delivery--CI)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`knowledge` · `graph` · `catalog` · `index` · `wiki` · `notion` · `mcp` · `контекст` · `дерево знаний` · `поиск`
