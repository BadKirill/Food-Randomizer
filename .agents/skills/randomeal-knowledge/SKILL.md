---
name: randomeal-knowledge
description: Build a selective, source-backed RandoMeal context packet from the verified local General snapshot and repository knowledge graph. Use before every code change, code review, architecture, database, API, mobile, analytics, QA, infrastructure, agent-rule, product-document, or design task in this repository; also use when asked about project structure, patterns, reuse, contradictions, implementation status, catalog updates, indexing, or explicitly requested Notion Wiki synchronization. Do not use as a substitute for the mandatory design-anti-slop workflow on user-facing design tasks.
---

# RandoMeal Knowledge

Use the verified local General AI snapshot first, then the repository catalog and deterministic
index to retrieve the smallest trustworthy project context for the task. Keep shared principles,
project facts, current implementation, accepted target architecture, discovery gates, and legacy
references explicitly separated. Ordinary retrieval is local-only.

## Retrieval workflow

1. State that this skill is selecting local shared and repository context for the task.
2. Read `knowledge/general-ai-baseline.md` before planning or coding. Verify its raw and canonical
   body hashes against `knowledge/wiki-manifest.json` and the last verified proof in
   `knowledge/wiki-sync-state.json` without contacting Notion.
3. Collect the task text and known paths. For an existing change, include paths from
   `git diff --name-only` and `git diff --name-only --cached` without modifying the worktree.
4. Ensure `knowledge/index.json` exists. If it is absent, run `npm run knowledge:update` before
   retrieval and report that the skill caused generated knowledge files to change.
5. Run:

   ```sh
   npm run knowledge:query -- --query "<task text>" --paths <comma-separated-paths>
   ```

6. Read only the selected catalog nodes and the source ranges in the context packet first.
7. Expand to direct dependencies, contracts, and narrow tests only when the first packet lacks
   enough evidence.
8. Use repository-wide search only when the packet is empty, stale, or contradictory. State why
   the fallback was necessary.
9. Do not call Notion during ordinary retrieval, indexing, rendering, querying, validation, code,
   commit, or pull-request work. Read external Wiki state only when the user explicitly requests it
   or an operator invokes the dedicated synchronization workflow in
   `references/notion-sync-protocol.md`.

Apply this source hierarchy:

1. `knowledge/general-ai-baseline.md` is the verified local working baseline for planning, coding
   quality, verification, knowledge maintenance, safety, change control, and definition of done.
2. Canonical repository sources and the project catalog govern RandoMeal facts, implementation,
   contracts, product decisions, and accepted project-specific specializations.
3. The external `General AI Wiki` is the shared upstream source and `Food-Randomizer Wiki` is the
   external project mirror, but neither is read during ordinary work.
4. A project rule may strengthen or specialize the shared baseline. If it weakens or contradicts a
   shared guarantee, stop and reconcile both sources instead of choosing silently.

Within the project layer, never treat a generated summary as stronger evidence than its source.
Apply this precedence:

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

The retrieval agent must return the local baseline snapshot verification and must not contact
Notion unless the assigned task explicitly requests external Wiki work or names a dedicated sync
command. For an explicit external task it also returns the workspace/root identity, managed pages
checked, read-back results, and any local-versus-remote divergence.

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
6. Stop after the local lifecycle unless external Wiki work was explicitly requested or a dedicated
   synchronization workflow was separately invoked.
7. For an explicit external workflow, follow `references/notion-sync-protocol.md`, require
   immediate pre-write fetch and post-write read-back, update `knowledge/wiki-sync-state.json` only
   after verification, and run `npm run knowledge:notion:check`.

Do not hand off a material change with a stale index or Wiki bundle.

## External Notion Wiki synchronization

Read `references/notion-sync-protocol.md` only when external Wiki state is explicitly requested or a
dedicated synchronization workflow is invoked. Catalog, index, local Wiki, commit, and pull-request
work alone do not authorize Notion access.

An invoked external synchronization is fail-closed. It is successful only after the configured
Notion MCP matches the workspace and targets, every write is read back, canonical body hashes are
verified, and the proof is recorded in `knowledge/wiki-sync-state.json`. External mirror freshness
is not a completion condition for ordinary local work when no external workflow was requested.

If an invoked external workflow encounters unavailable access, wrong identity, moved pages,
divergence, partial writes, or a read-back mismatch, report the exact blocker and do not claim the
external synchronization completed. Preserve unmanaged Notion pages and never delete or overwrite
divergent content without explicit user authorization. Never substitute browser automation, direct
API scripts, GitHub Wiki, or an unverified statement of success.

No automatic Notion read, write, or mirror-freshness gate is enabled for commits or pull requests.
Adding one requires a separate explicit policy decision.

## Handoff

Report:

- the selected knowledge nodes used for the work;
- catalog facts added or changed;
- index coverage and fingerprint;
- local Wiki page count and manifest status;
- local General AI snapshot verification and whether external Wiki work was invoked;
- when invoked, Notion workspace and target identity, created, updated, skipped, and verified page
  counts or the exact blocker;
- validation and affected product tests.
