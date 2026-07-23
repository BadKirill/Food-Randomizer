# Knowledge Protocol

## Retrieval

1. Run the knowledge query with the task text and every known changed path.
2. Read the selected catalog nodes and their listed source ranges before opening broader files.
3. Read direct dependencies, contracts, and narrow tests when the first packet is insufficient.
4. Use repository-wide search only after the packet is empty, stale, or contradictory.
5. Classify evidence as current, target, legacy, mixed, or generated before making a decision.
6. Fetch and verify the Notion pages mapped to selected nodes before a material change.
7. After a material change, update affected catalog rules, regenerate the index and Wiki bundle, validate both, and complete verified Notion synchronization.

## Limits

- Maximum selected nodes: 7
- Maximum primary files displayed per node: 12
- Repository-wide reading is a fallback, not the default.

## Update and external mirror

1. Treat knowledge/catalog.json as canonical and knowledge/wiki as a generated human-readable mirror.
2. Before implementation, fetch the configured Notion identity, root, and managed pages mapped to the selected graph nodes.
3. Regenerate knowledge/wiki-manifest.json and plan changed managed pages against knowledge/wiki-sync-state.json.
4. Upsert only changed managed child pages under the configured root and preserve every unmanaged page.
5. Fetch immediately before every update and stop if remote content diverged from the last verified state.
6. Read every written page back and verify its managed key, local source hash, canonical body hash, and internal page links.
7. Record synchronization only after every attempted page verifies, then run knowledge:notion:check.
8. Never substitute browser automation, direct API scripts, GitHub Wiki, Git operations, or an unverified claim for Notion MCP synchronization.

External sync mode: **fail-closed-at-handoff**.
