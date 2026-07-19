# Knowledge Protocol

## Retrieval

1. Run the knowledge query with the task text and every known changed path.
2. Read the selected catalog nodes and their listed source ranges before opening broader files.
3. Read direct dependencies, contracts, and narrow tests when the first packet is insufficient.
4. Use repository-wide search only after the packet is empty, stale, or contradictory.
5. Classify evidence as current, target, legacy, mixed, or generated before making a decision.
6. After a material change, update affected catalog rules, regenerate the index and Wiki bundle, and validate both.

## Limits

- Maximum selected nodes: 7
- Maximum primary files displayed per node: 12
- Repository-wide reading is a fallback, not the default.

## Update and external mirror

1. Treat knowledge/catalog.json as canonical and knowledge/wiki as a generated human-readable mirror.
2. Regenerate knowledge/wiki-manifest.json and compare its page hashes with the remote Wiki.
3. Upsert only changed managed pages and preserve external pages that are not owned by the manifest.
4. Read every written page back through the same MCP and verify its normalized SHA-256.
5. Record external synchronization only after all page hashes are verified.
6. If native Wiki MCP capability is absent or the repository Wiki is disabled, report synchronization as blocked.
7. Never substitute git push, gh, regular repository files, browser automation, or an unverified claim for Wiki MCP synchronization.

External sync mode: **fail-closed**.
