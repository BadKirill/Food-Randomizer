# Explicit Notion Wiki MCP synchronization protocol

Use this protocol only when the user explicitly requests external Wiki work or an operator invokes
a dedicated `knowledge:notion:*` workflow. Ordinary planning, coding, review, indexing, rendering,
validation, commits, and pull requests use `knowledge/general-ai-baseline.md` and do not contact
Notion.

The verified local snapshot is the working baseline for cross-project principles. The external
`General AI Wiki` is its shared upstream source. The repository catalog is canonical for RandoMeal
facts and contracts; the external `Food-Randomizer Wiki` is their human-readable mirror.

## Fixed target

Read the target from `knowledge/wiki-manifest.json`. Before an external read or write, verify:

- provider is `notion`;
- connected workspace ID equals the manifest workspace ID;
- General Wiki page ID, URL, and title equal the manifest baseline page;
- the bounded General policy begins and ends at the configured headings;
- project root page ID and title equal the manifest target and its parent is the General Wiki;
- every managed child stays beneath that root;
- the connector exposes the operations required by the requested workflow.

Missing, moved, unreadable, or hash-divergent external content is divergence for the invoked sync.
It does not invalidate ordinary local work when no external workflow was requested.

## Explicit General Wiki pull

1. Read `knowledge/wiki-manifest.json` and `knowledge/wiki-sync-state.json`.
2. Fetch the configured Notion identity and General Wiki page.
3. Verify page identity, policy bounds, project-root child relationship, and the complete fetch
   hash used as concurrency evidence.
4. Copy only the bounded policy section into `knowledge/general-ai-baseline.md`.
5. Regenerate the manifest so its raw snapshot and canonical body hashes are derived locally.
6. Verify the fetched bounded policy against the regenerated manifest.
7. Record raw snapshot, canonical body, and complete fetch hashes in
   `knowledge/wiki-sync-state.json` only after verification succeeds.
8. Run `npm run knowledge:check` and read the external page back once more if the workflow also
   changed it.

## Local preparation

1. Update semantic facts in `knowledge/catalog.json`.
2. Run `npm run knowledge:update` and `npm run knowledge:check`.
3. Run `npm run knowledge:notion:plan -- --json` only for an explicitly invoked project Wiki sync.
4. Read the local files and hashes named by the plan.
5. Preserve every Notion page not owned by the manifest.
6. Classify the change as shared-principle or project-specific. Shared-principle scope is limited
   to evidence, planning, coding quality, verification, knowledge maintenance, safety, change
   control, and definition-of-done rules.

The generated project payload contains a managed metadata envelope and deterministic body. Internal
Wiki links are rewritten to absolute Notion page mentions once page URLs are known. Expected remote
hashes are calculated from canonicalized body content.

## Explicit General Wiki push

1. Do not publish RandoMeal-only facts, contracts, architecture, dependencies, migrations,
   operations, or exceptions into the General Wiki.
2. Fetch the General Wiki immediately before writing and compare the bounded policy and complete
   fetch hashes with the last verified state.
3. Reconcile the requested principle into the bounded policy section only. Preserve the page title,
   `Local Wikis` section, child pages, and unrelated content.
4. Use a targeted Notion MCP content update. Never replace the complete General Wiki page.
5. Fetch the page immediately after writing and verify identity, policy bounds, intended canonical
   body hash, complete fetch hash, and project-root child link.
6. Update `knowledge/general-ai-baseline.md` from the verified bounded policy, regenerate its hashes,
   and record proof in `knowledge/wiki-sync-state.json`.

## Explicit project Wiki upsert

1. Search beneath the configured root for an exact managed key before creating a page.
2. Create missing pages only as children of the configured root.
3. Record each created page ID and URL before rendering internal page mentions.
4. Fetch every existing managed page immediately before an update and compare its complete fetch
   hash with the last verified state.
5. Stop on remote divergence. Do not silently replace manual changes.
6. Update only pages whose expected local or remote payload hash changed.
7. Never delete, archive, move, or rename a remote page without explicit user authorization.

## Read-back and state

1. Fetch every created or updated page through the same Notion MCP.
2. Verify title, managed key, source SHA-256, canonical managed body SHA-256, and managed links.
3. Compute SHA-256 for the complete normalized fetch text to detect later manual changes.
4. Update `knowledge/wiki-sync-state.json` only after every attempted write verifies.
5. Run `npm run knowledge:notion:check`, `npm run knowledge:check`, and the changed-path query.

## Failure behavior

- Wrong identity, missing capability, permission failure, conflicting managed key, unexpected child
  content, partial write, async failure, or hash mismatch fails the invoked external sync.
- Do not update sync proof for a partial or unverified operation.
- Preserve the valid local catalog, index, Wiki bundle, manifest, snapshot, and last verified state.
- Report which pages were created, updated, skipped, verified, failed, or not attempted.
- Never substitute browser automation, direct API scripts, GitHub Wiki, Git operations, or an
  unverified statement of success.

No Notion read, write, or mirror-freshness gate is automatic on commit or pull request. Adding one
requires a separate explicit policy decision.
