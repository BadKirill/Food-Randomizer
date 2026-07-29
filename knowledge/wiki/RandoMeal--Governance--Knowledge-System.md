# Knowledge system

Deterministic catalog, repository index, selective query, local Wiki renderer, verified Notion mirror, validation gates, repo skill, and read-only retrieval agent.

Status: **current**
Authority: **canonical**

## Rules and patterns

- The catalog is the canonical semantic graph; the index and Wiki bundle are deterministic derivatives.
- Every repository file receives an index record; generated outputs use managed records without recursive self-hashes.
- Retrieval must return evidence paths and line ranges and verify the relevant managed Notion pages before implementation.
- External Notion synchronization fails closed at handoff unless every changed managed page is written, read back, body-hash verified, and recorded in the sync state.

## Source coverage

- `.agents/skills/randomeal-knowledge/agents/openai.yaml` — 10 indexed sections: interface, display_name, short_description, default_prompt, policy, …. Sections: .agents/skills/randomeal-knowledge/agents/openai.yaml (L1–12); interface (L1–4); display_name (L2–2); short_description (L3–3); default_prompt (L4–4); policy (L5–6); allow_implicit_invocation (L6–6); dependencies (L7–12)
- `.agents/skills/randomeal-knowledge/references/notion-sync-protocol.md` — 7 indexed sections: Verified Notion Wiki MCP sync protocol, Fixed target, Pre-change retrieval, Local preparation, Bootstrap and upsert, …. Sections: .agents/skills/randomeal-knowledge/references/notion-sync-protocol.md (L1–81); Verified Notion Wiki MCP sync protocol (L1–81); Fixed target (L6–19); Pre-change retrieval (L20–33); Local preparation (L34–46); Bootstrap and upsert (L47–58); Verification and state (L59–71); Failure behavior (L72–81)
- `.agents/skills/randomeal-knowledge/SKILL.md` — 6 indexed sections: RandoMeal Knowledge, Retrieval workflow, Retrieval agent, Change lifecycle, External Notion Wiki synchronization, …. Sections: .agents/skills/randomeal-knowledge/SKILL.md (L1–113); RandoMeal Knowledge (L6–113); Retrieval workflow (L12–44); Retrieval agent (L45–64); Change lifecycle (L65–84); External Notion Wiki synchronization (L85–100); Handoff (L101–113)
- `.codex/agents/knowledge-retriever.toml` — toml file knowledge-retriever.toml. Sections: .codex/agents/knowledge-retriever.toml (L1–15)
- `knowledge/catalog.json` — 6 indexed sections: schemaVersion, project, readingPolicy, syncPolicy, nodes, …. Sections: knowledge/catalog.json (L1–874); schemaVersion (L2–2); project (L3–7); readingPolicy (L8–25); syncPolicy (L26–47); nodes (L48–807); routes (L808–874)
- `knowledge/README.md` — 5 indexed sections: RandoMeal repository knowledge graph, Canonical and generated files, Selective retrieval, Update lifecycle, External Notion Wiki. Sections: knowledge/README.md (L1–57); RandoMeal repository knowledge graph (L1–57); Canonical and generated files (L5–17); Selective retrieval (L18–30); Update lifecycle (L31–46); External Notion Wiki (L47–57)
- `scripts/knowledge/index-repository.mjs` — javascript file index-repository.mjs. Sections: scripts/knowledge/index-repository.mjs (L1–10)
- `scripts/knowledge/lib.mjs` — 35 indexed sections: rootDir, catalogPath, indexPath, wikiDir, wikiManifestPath, …. Sections: scripts/knowledge/lib.mjs (L1–447); rootDir (L7–7); catalogPath (L8–8); indexPath (L9–9); wikiDir (L10–10); wikiManifestPath (L11–11); wikiSyncStatePath (L12–53); sha256 (L54–57)
- `scripts/knowledge/notion-sync.mjs` — 14 indexed sections: managedOwner, normalizeLineEndings, canonicalNotionBody, stripPageTitle, tableCells, …. Sections: scripts/knowledge/notion-sync.mjs (L1–197); managedOwner (L3–4); normalizeLineEndings (L5–8); canonicalNotionBody (L9–20); stripPageTitle (L21–27); tableCells (L28–46); isTableSeparator (L47–51); convertMarkdownTables (L52–77)
- `scripts/knowledge/notion-sync.spec.mjs` — 6 indexed sections: rewrites managed links and preserves external links, converts markdown tables to Notion table blocks, builds and verifies a managed Notion payload, rejects a body that changed while keeping the declared hash, plans create, update, and skip without deleting unmanaged pages, …. Sections: scripts/knowledge/notion-sync.spec.mjs (L1–128); rewrites managed links and preserves external links (L24–28); converts markdown tables to Notion table blocks (L29–36); builds and verifies a managed Notion payload (L37–58); rejects a body that changed while keeping the declared hash (L59–78); plans create, update, and skip without deleting unmanaged pages (L79–93); requires a complete current verified sync state (L94–128)
- `scripts/knowledge/plan-notion-sync.mjs` — javascript file plan-notion-sync.mjs. Sections: scripts/knowledge/plan-notion-sync.mjs (L1–47)
- `scripts/knowledge/query-knowledge.mjs` — 7 indexed sections: argument, tokens, includesToken, scoreNode, matchedRouteIds, …. Sections: scripts/knowledge/query-knowledge.mjs (L1–141); argument (L3–7); tokens (L8–11); includesToken (L12–15); scoreNode (L16–53); matchedRouteIds (L54–66); selectNodes (L67–93); contextPacket (L94–141)
- `scripts/knowledge/render-wiki.mjs` — 11 indexed sections: pageLink, wikiPageTitle, sourceList, renderHome, renderSidebar, …. Sections: scripts/knowledge/render-wiki.mjs (L1–209); pageLink (L6–9); wikiPageTitle (L10–16); sourceList (L17–24); renderHome (L25–60); renderSidebar (L61–73); renderProtocol (L74–97); renderNode (L98–134)
- `scripts/knowledge/validate-knowledge.mjs` — 1 indexed section: findDependencyCycle. Sections: scripts/knowledge/validate-knowledge.mjs (L1–101); findDependencyCycle (L33–101)
- `scripts/knowledge/validate-notion-sync.mjs` — javascript file validate-notion-sync.mjs. Sections: scripts/knowledge/validate-notion-sync.mjs (L1–21)
- `scripts/knowledge/verify-notion-fetch.mjs` — 1 indexed section: argument. Sections: scripts/knowledge/verify-notion-fetch.mjs (L1–59); argument (L6–59)

## Graph relations

- Depends on: none
- Related: [Complete repository inventory](RandoMeal--Governance--Repository-Inventory), [Continuous integration and test runners](RandoMeal--Delivery--CI)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`knowledge` · `graph` · `catalog` · `index` · `wiki` · `notion` · `mcp` · `контекст` · `дерево знаний` · `поиск`
