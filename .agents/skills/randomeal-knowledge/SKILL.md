---
name: randomeal-knowledge
description: Build a selective, source-backed RandoMeal context packet and keep the repository knowledge graph plus its verified Notion mirror current. Use before every code change, code review, architecture, database, API, mobile, analytics, QA, infrastructure, agent-rule, product-document, or design task in this repository; also use when asked about project structure, patterns, reuse, contradictions, implementation status, catalog updates, indexing, or Notion Wiki synchronization. Do not use as a substitute for the mandatory design-anti-slop workflow on user-facing design tasks.
---

# RandoMeal Knowledge

Use the repository catalog and deterministic index to retrieve the smallest trustworthy context for
the task. Keep current implementation, accepted target architecture, discovery gates, and legacy
references explicitly separated.

## Retrieval workflow

1. State that this skill is selecting repository context for the task.
2. Collect the task text and known paths. For an existing change, include paths from
   `git diff --name-only` and `git diff --name-only --cached` without modifying the worktree.
3. Ensure `knowledge/index.json` exists. If it is absent, run `npm run knowledge:update` before
   retrieval and report that the skill caused generated knowledge files to change.
4. Run:

   ```sh
   npm run knowledge:query -- --query "<task text>" --paths <comma-separated-paths>
   ```

5. Read only the selected catalog nodes and the source ranges in the context packet first.
6. Expand to direct dependencies, contracts, and narrow tests only when the first packet lacks
   enough evidence.
7. Use repository-wide search only when the packet is empty, stale, or contradictory. State why
   the fallback was necessary.
8. Read `knowledge/wiki-manifest.json` and `knowledge/wiki-sync-state.json`. Fetch Notion identity,
   the configured root, and only the managed Notion pages mapped to the selected nodes. Compare the
   remote managed key, source hash, body hash, and last verified fetch hash before implementation.
9. Treat an empty configured root as a valid bootstrap state only when no sync state exists. Treat
   missing mapped pages, stale fingerprints, hash mismatches, unexpected moves, or manual edits as
   divergence that must be reconciled before a material change.

Never treat a generated summary as stronger evidence than its source. Apply this precedence:

1. `canonical`, `product-source-of-truth`, `discovery-gate`, and accepted product architecture.
2. `current-code` for claims about behavior that exists now.
3. `target` documents for intended behavior that is not yet implemented.
4. `mixed` nodes only after resolving the current and target portions separately.
5. `legacy` nodes as historical context, never as an unqualified decision source.

## Retrieval agent

For a code-change request, use the project custom agent `knowledge-retriever` when custom agents are
available. Give it the task text and known paths. Require a read-only context packet containing:

- selected node IDs and why each was selected;
- current-versus-target classification;
- governing rules and contradictions;
- exact source paths and line ranges;
- direct contracts, database effects, and narrow tests;
- unanswered questions that genuinely block a safe implementation.

The retrieval agent must also return the Notion workspace/root identity, the managed pages checked,
their verification results, and any local-versus-remote divergence. Notion is a human-readable
mirror; canonical repository sources keep the precedence defined above.

The retrieval agent must not edit files, run mutating commands, or make implementation decisions
beyond the evidence it returns. If the custom agent is unavailable, follow the same workflow in the
current agent.

## Change lifecycle

After any material repository change:

1. Update `knowledge/catalog.json` when authority, status, architecture, behavior, contract,
   invariant, pattern, source routing, or a documented contradiction changed.
2. Do not add a catalog fact for mechanical edits that do not change meaning.
3. Run `npm run knowledge:update` so every repository file, section, symbol, import, local relation,
   route, and managed Wiki page is refreshed.
4. Run `npm run knowledge:check` and resolve stale coverage, broken relations, unassigned files,
   dependency cycles, or Wiki drift.
5. Query the changed paths once more and verify the updated packet points to the new sources.
6. Run `npm run knowledge:notion:plan -- --json` and synchronize every planned page through the
   configured Notion MCP workflow.
7. Read every created or updated page back, verify its managed body, update
   `knowledge/wiki-sync-state.json` only after all writes verify, and run
   `npm run knowledge:notion:check`.

Do not hand off a material change with a stale index or Wiki bundle.

## External Notion Wiki synchronization

Read `references/notion-sync-protocol.md` whenever catalog or Wiki pages changed, before reading the
external mirror for implementation context, or whenever external Wiki state is requested.

Synchronization is fail-closed at handoff. It is successful only after the configured Notion MCP
matches the workspace and root in `knowledge/wiki-manifest.json`, writes changed managed child
pages, reads them back, verifies the metadata envelope and canonical body hash, and records the
proof in `knowledge/wiki-sync-state.json`.

If the connector is unavailable, its identity is wrong, the root moved, a managed page changed
outside the repository, a write only partially succeeds, or a read-back hash differs, report the
exact blocker and do not complete the task. Preserve unmanaged Notion pages and never delete or
overwrite divergent content without explicit user authorization. Never substitute browser
automation, direct API scripts, GitHub Wiki, or an unverified statement of success.

## Handoff

Report:

- the selected knowledge nodes used for the work;
- catalog facts added or changed;
- index coverage and fingerprint;
- local Wiki page count and manifest status;
- Notion workspace/root identity, pages consulted before the change, and divergence status;
- external Notion MCP status, including created, updated, skipped, and verified page counts or the
  exact blocker;
- validation and affected product tests.
