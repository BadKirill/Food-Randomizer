---
name: randomeal-knowledge
description: Build a selective, source-backed RandoMeal context packet and keep the repository knowledge graph current. Use before every code change, code review, architecture, database, API, mobile, analytics, QA, infrastructure, agent-rule, product-document, or design task in this repository; also use when asked about project structure, patterns, reuse, contradictions, implementation status, catalog updates, indexing, or GitHub Wiki synchronization. Do not use as a substitute for the mandatory design-anti-slop workflow on user-facing design tasks.
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
6. Attempt external Wiki synchronization through the required native Wiki MCP workflow.

Do not hand off a material change with a stale index or Wiki bundle.

## External GitHub Wiki synchronization

Read `references/wiki-sync-protocol.md` whenever catalog or Wiki pages changed, or whenever external
Wiki state is requested.

Synchronization is fail-closed. It is successful only after a connected MCP with explicit GitHub
Wiki page operations writes changed managed pages, reads them back, and verifies their hashes
against `knowledge/wiki-manifest.json`.

If the repository Wiki is disabled or the native Wiki MCP operations are unavailable, stop only the
external synchronization step, report the exact blocker, and keep the local catalog, index, Wiki
bundle, and manifest valid. Never substitute Git pushes, `gh`, ordinary repository content tools,
browser automation, or an unverified statement of success.

## Handoff

Report:

- the selected knowledge nodes used for the work;
- catalog facts added or changed;
- index coverage and fingerprint;
- local Wiki page count and manifest status;
- external Wiki MCP status, including verified page count or the exact blocker;
- validation and affected product tests.
