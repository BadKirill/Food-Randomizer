# Knowledge system

Deterministic catalog, repository index, selective query, Wiki renderer, validation gate, repo skill, and read-only retrieval agent.

Status: **current**
Authority: **canonical**

## Rules and patterns

- The catalog is the canonical semantic graph; the index and Wiki bundle are deterministic derivatives.
- Every repository file receives an index record; generated outputs use managed records without recursive self-hashes.
- Retrieval must return evidence paths and line ranges, not unsupported summaries.
- External Wiki sync fails closed unless a native Wiki MCP writes and reads back every managed page.

## Source coverage

- `.agents/skills/randomeal-knowledge/agents/openai.yaml` — 10 indexed sections: interface, display_name, short_description, default_prompt, policy, …. Sections: .agents/skills/randomeal-knowledge/agents/openai.yaml (L1–12); interface (L1–4); display_name (L2–2); short_description (L3–3); default_prompt (L4–4); policy (L5–6); allow_implicit_invocation (L6–6); dependencies (L7–12)
- `.agents/skills/randomeal-knowledge/references/wiki-sync-protocol.md` — 5 indexed sections: Native GitHub Wiki MCP sync protocol, Preconditions, Upsert, Verification, Failure behavior. Sections: .agents/skills/randomeal-knowledge/references/wiki-sync-protocol.md (L1–43); Native GitHub Wiki MCP sync protocol (L1–43); Preconditions (L6–16); Upsert (L17–26); Verification (L27–35); Failure behavior (L36–43)
- `.agents/skills/randomeal-knowledge/SKILL.md` — 6 indexed sections: RandoMeal Knowledge, Retrieval workflow, Retrieval agent, Change lifecycle, External GitHub Wiki synchronization, …. Sections: .agents/skills/randomeal-knowledge/SKILL.md (L1–95); RandoMeal Knowledge (L6–95); Retrieval workflow (L12–38); Retrieval agent (L39–54); Change lifecycle (L55–70); External GitHub Wiki synchronization (L71–84); Handoff (L85–95)
- `.codex/agents/knowledge-retriever.toml` — toml file knowledge-retriever.toml. Sections: .codex/agents/knowledge-retriever.toml (L1–13)
- `knowledge/catalog.json` — 6 indexed sections: schemaVersion, project, readingPolicy, syncPolicy, nodes, …. Sections: knowledge/catalog.json (L1–820); schemaVersion (L2–2); project (L3–7); readingPolicy (L8–24); syncPolicy (L25–37); nodes (L38–753); routes (L754–820)
- `knowledge/README.md` — 5 indexed sections: RandoMeal repository knowledge graph, Canonical and generated files, Selective retrieval, Update lifecycle, External GitHub Wiki. Sections: knowledge/README.md (L1–52); RandoMeal repository knowledge graph (L1–52); Canonical and generated files (L5–16); Selective retrieval (L17–28); Update lifecycle (L29–41); External GitHub Wiki (L42–52)
- `scripts/knowledge/index-repository.mjs` — javascript file index-repository.mjs. Sections: scripts/knowledge/index-repository.mjs (L1–10)
- `scripts/knowledge/lib.mjs` — 34 indexed sections: rootDir, catalogPath, indexPath, wikiDir, wikiManifestPath, …. Sections: scripts/knowledge/lib.mjs (L1–446); rootDir (L7–7); catalogPath (L8–8); indexPath (L9–9); wikiDir (L10–10); wikiManifestPath (L11–52); sha256 (L53–56); readJson (L57–60)
- `scripts/knowledge/query-knowledge.mjs` — 7 indexed sections: argument, tokens, includesToken, scoreNode, matchedRouteIds, …. Sections: scripts/knowledge/query-knowledge.mjs (L1–141); argument (L3–7); tokens (L8–11); includesToken (L12–15); scoreNode (L16–53); matchedRouteIds (L54–66); selectNodes (L67–93); contextPacket (L94–141)
- `scripts/knowledge/render-wiki.mjs` — 10 indexed sections: pageLink, sourceList, renderHome, renderSidebar, renderProtocol, …. Sections: scripts/knowledge/render-wiki.mjs (L1–195); pageLink (L6–9); sourceList (L10–17); renderHome (L18–53); renderSidebar (L54–66); renderProtocol (L67–90); renderNode (L91–127); renderFileIndex (L128–145)
- `scripts/knowledge/validate-knowledge.mjs` — 1 indexed section: findDependencyCycle. Sections: scripts/knowledge/validate-knowledge.mjs (L1–93); findDependencyCycle (L28–93)

## Graph relations

- Depends on: none
- Related: [Complete repository inventory](RandoMeal--Governance--Repository-Inventory), [Continuous integration and test runners](RandoMeal--Delivery--CI)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`knowledge` · `graph` · `catalog` · `index` · `wiki` · `mcp` · `контекст` · `дерево знаний` · `поиск`
