# RandoMeal repository knowledge graph

This directory is the compact entry point for agents and humans working on RandoMeal.

## Canonical and generated files

- `catalog.json` is the canonical semantic tree: authority, status, rules, source patterns,
  relations, routing aliases, and the selective-reading policy.
- `index.json` is generated from every tracked or non-ignored untracked repository file. It stores
  metadata, hashes, extracted sections, symbols, imports, local dependencies, routes, and node
  assignments. Managed generated outputs remain represented without recursive self-hashes.
- `wiki/` is the generated human-readable Wiki bundle.
- `wiki-manifest.json` owns managed page slugs, deterministic titles and hashes, plus the fixed
  personal Notion workspace and `Food-Randomizer Wiki` root.
- `wiki-sync-state.json` is evidence from the last verified Notion MCP synchronization. It maps
  local nodes to remote page IDs and stores source, body, and complete fetch hashes.

## Selective retrieval

Run:

```sh
npm run knowledge:query -- --query "change authentication session expiry" --paths apps/api/src/modules/auth/auth.service.ts
```

The result is a context packet containing no more than seven semantic nodes, their governing
rules, and the narrow source ranges to read first. A broad repository scan is allowed only when
the packet is empty, stale, or contradictory. Before implementation, the retrieval workflow also
fetches the Notion pages mapped to those nodes and compares them with the last verified state.

## Update lifecycle

Run:

```sh
npm run knowledge:update
npm run knowledge:check
npm run knowledge:notion:plan -- --json
npm run knowledge:notion:check
```

Every material code, contract, schema, product, QA, design, infrastructure, or agent-rule change
must update affected catalog facts in the same change. The update command regenerates the complete
file index and local Wiki bundle. The Notion plan identifies create, update, and skip operations;
the final check accepts only a complete verified state for the current manifest.

## External Notion Wiki

The external mirror is the personal Notion workspace and root declared in `wiki-manifest.json`.
Agents fetch the relevant managed pages before implementation. After a material change they use the
Notion MCP to create or update only managed child pages, preserve unrelated pages, fetch every write
back, verify the managed envelope and canonical body, then update `wiki-sync-state.json`.

Synchronization is fail-closed at handoff. Wrong identity, missing access, manual divergence,
partial writes, missing pages, or hash mismatches keep the task incomplete. Browser automation,
direct API scripts, GitHub Wiki, Git operations, and unverified success claims are not substitutes.
