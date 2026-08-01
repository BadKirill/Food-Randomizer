# RandoMeal repository knowledge graph

This directory is the compact local entry point for agents and humans working on RandoMeal.

## Canonical and generated files

- `general-ai-baseline.md` is the verified local snapshot of the bounded General Wiki policy. It is
  the normal baseline for planning, coding quality, verification, knowledge maintenance, safety,
  change control, and completion.
- `catalog.json` is the canonical semantic tree for RandoMeal authority, status, rules, source
  patterns, relations, routing aliases, and selective reading.
- `index.json` is generated from every tracked or non-ignored untracked repository file. It stores
  metadata, hashes, extracted sections, symbols, imports, local dependencies, routes, and node
  assignments. Managed generated outputs remain represented without recursive self-hashes.
- `wiki/` is the generated local human-readable project Wiki bundle.
- `wiki-manifest.json` derives raw and canonical hashes from the local General snapshot and owns
  deterministic project Wiki page titles, slugs, and hashes. It also pins external Notion targets
  for an explicitly invoked synchronization.
- `wiki-sync-state.json` is the last verified external read-back evidence. Ordinary local work reads
  it only to validate the local snapshot proof; it does not contact Notion or require the external
  project mirror to match the current repository.

## Selective retrieval

Run:

```sh
npm run knowledge:query -- --query "change authentication session expiry" --paths apps/api/src/modules/auth/auth.service.ts
```

The result contains no more than seven semantic nodes, their governing rules, and narrow source
ranges to read first. A broad repository scan is allowed only when the packet is empty, stale, or
contradictory. Retrieval starts from the verified local General snapshot and remains local-only.

## Ordinary local lifecycle

Run:

```sh
npm run knowledge:update
npm run knowledge:check
```

Every material code, contract, schema, product, QA, design, infrastructure, or agent-rule change
updates affected catalog facts in the same change. The update command regenerates the complete file
index, local Wiki bundle, and manifest. Neither command reads or writes Notion.

CI verifies local knowledge freshness and contract tests. It does not read or write external Wiki
content and does not gate a commit or pull request on Notion mirror freshness. No commit/PR Wiki
automation is enabled.

## Explicit external Notion workflow

External Wiki access occurs only after an explicit user request or a separately invoked dedicated
workflow:

```sh
npm run knowledge:notion:plan -- --json
npm run knowledge:notion:check
```

The complete procedure is in
`.agents/skills/randomeal-knowledge/references/notion-sync-protocol.md`. An invoked workflow verifies
the fixed workspace and page targets, fetches immediately before each write, preserves unmanaged
content, reads every write back, verifies canonical hashes, and only then records proof in
`wiki-sync-state.json`.

External synchronization is fail-closed only for that invoked workflow. Browser automation, direct
API scripts, GitHub Wiki, Git operations, and unverified success claims are not substitutes for the
configured Notion MCP and mandatory read-back.
