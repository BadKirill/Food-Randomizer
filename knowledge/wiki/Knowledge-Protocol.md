# Knowledge Protocol

## Retrieval

1. Read knowledge/general-ai-baseline.md and verify its local raw and canonical body hashes before planning or writing code.
2. Run the knowledge query with the task text and every known changed path.
3. Read the selected catalog nodes and their listed source ranges before opening broader files.
4. Read direct dependencies, contracts, and narrow tests when the first packet is insufficient.
5. Use repository-wide search only after the packet is empty, stale, or contradictory.
6. Classify evidence as current, target, legacy, mixed, or generated before making a decision.
7. Use repository sources and the generated local project Wiki for RandoMeal facts, refinements, contradictions, and technical contracts.
8. After a material change, update affected catalog rules, regenerate the index and local Wiki bundle, and validate both without contacting Notion.

## Limits

- Maximum selected nodes: 7
- Maximum primary files displayed per node: 12
- Repository-wide reading is a fallback, not the default.

## Update and external mirror

1. Use knowledge/general-ai-baseline.md as the verified local working baseline and knowledge/catalog.json as canonical for RandoMeal facts.
2. Keep ordinary indexing, rendering, querying, validation, coding, commit, and pull-request workflows local-only.
3. Read or change external Wiki content only after an explicit user request or a separately invoked dedicated synchronization workflow.
4. For an explicit General Wiki pull or push, verify the fixed identity and bounded policy, preserve Local Wikis and unrelated content, and update the local snapshot only after read-back verification.
5. For an explicit project Wiki sync, regenerate knowledge/wiki-manifest.json and plan managed pages against knowledge/wiki-sync-state.json.
6. Fetch immediately before every write, stop on remote divergence, preserve every unmanaged page, and upsert only intended managed content.
7. Read every written page back and verify the shared policy hash or project managed key, local source hash, canonical body hash, and internal page links as applicable.
8. Record external synchronization proof only after every attempted page verifies, then run knowledge:notion:check.
9. Do not automatically read, write, or gate on external Wiki freshness during commits or pull requests.
10. Never substitute browser automation, direct API scripts, GitHub Wiki, Git operations, or an unverified claim for Notion MCP synchronization.

External sync mode: **explicit-only-with-read-back**.
