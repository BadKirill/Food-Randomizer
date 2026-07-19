# RandoMeal repository knowledge graph

This directory is the compact entry point for agents and humans working on RandoMeal.

## Canonical and generated files

- `catalog.json` is the canonical semantic tree: authority, status, rules, source patterns,
  relations, routing aliases, and the selective-reading policy.
- `index.json` is generated from every tracked or non-ignored untracked repository file. It stores
  metadata, hashes, extracted sections, symbols, imports, local dependencies, routes, and node
  assignments. Managed generated outputs remain represented without recursive self-hashes.
- `wiki/` is the generated human-readable Wiki bundle.
- `wiki-manifest.json` owns external page slugs and SHA-256 values for verified MCP synchronization.
- `wiki-sync-state.json`, when present, is evidence from the last verified external MCP sync. Its
  absence means no external sync has been proven.

## Selective retrieval

Run:

```sh
npm run knowledge:query -- --query "change authentication session expiry" --paths apps/api/src/modules/auth/auth.service.ts
```

The result is a context packet containing no more than seven semantic nodes, their governing
rules, and the narrow source ranges to read first. A broad repository scan is allowed only when
the packet is empty, stale, or contradictory.

## Update lifecycle

Run:

```sh
npm run knowledge:update
npm run knowledge:check
```

Every material code, contract, schema, product, QA, design, infrastructure, or agent-rule change
must update affected catalog facts in the same change. The update command regenerates the complete
file index and local Wiki bundle.

## External GitHub Wiki

External synchronization is deliberately fail-closed. It succeeds only when an attached MCP server
exposes native GitHub Wiki page list, read, create, update, and post-write verification operations.
The agent compares the remote page hashes with `wiki-manifest.json`, writes only changed managed
pages, reads them back, and records verified revisions in `wiki-sync-state.json`.

If the repository Wiki is disabled or native Wiki MCP operations are unavailable, synchronization
is blocked. Git pushes, `gh`, normal repository file writes, browser automation, or an unverified
success claim are not substitutes.
