# Verified Notion Wiki MCP sync protocol

Use this protocol only with the connected Notion MCP. The repository catalog is canonical; the
configured `Food-Randomizer Wiki` page is a human-readable external mirror.

## Fixed target

Read the target from `knowledge/wiki-manifest.json`. Verify all of these values before reading or
writing managed pages:

- provider is `notion`;
- connected workspace ID equals the manifest workspace ID;
- root page ID and title equal the manifest root page;
- every managed child stays beneath that root;
- the connector exposes identity, fetch, search, create-pages, and update-page operations.

An empty root with no sync state is a valid bootstrap condition. Any later missing or moved managed
page is divergence.

## Pre-change retrieval

1. Run the repository knowledge query and select no more than seven catalog nodes.
2. Read `knowledge/wiki-manifest.json` and `knowledge/wiki-sync-state.json`.
3. Fetch Notion identity and the configured root.
4. Map selected node IDs to managed pages through the manifest and sync state.
5. Fetch only those mapped pages and verify title, managed key, local source SHA-256, canonical body
   SHA-256, and the stored full fetch SHA-256.
6. Report the checked pages and every mismatch in the context packet.

Do not begin a material change when a mapped page is stale, manually edited, moved, missing, or
unreadable. Reconcile remote-only content into canonical repository sources or obtain explicit user
authorization before overwriting it.

## Local preparation

1. Update semantic facts in `knowledge/catalog.json`.
2. Run `npm run knowledge:update` and `npm run knowledge:check`.
3. Run `npm run knowledge:notion:plan -- --json`.
4. Read the local files and hashes named by the plan.
5. Preserve every Notion page that is not owned by the manifest.

The generated Notion payload contains a managed metadata envelope and a deterministic body. Internal
Wiki links are rewritten to absolute Notion page mentions once all page URLs are known. The expected
remote hash is calculated from canonicalized body content, not from the raw local Markdown or a
self-asserted marker.

## Bootstrap and upsert

1. Search beneath the configured root for an exact managed key before creating a page.
2. Create missing pages as children of the configured root. Initial bootstrap creates every managed
   page without deleting or moving existing user pages.
3. Record every created page ID and URL before rendering internal Notion page mentions.
4. Fetch each existing managed page immediately before an update and compare its full fetch hash
   with the last verified state.
5. Stop on any remote divergence. Do not silently replace manual changes.
6. Update only pages whose expected local or remote payload hash changed.
7. Never delete, archive, move, or rename a remote page without explicit user authorization.

## Verification and state

1. Fetch every created or updated page through the same Notion MCP.
2. Verify its title, managed key, source SHA-256, and canonical managed body SHA-256.
3. Verify every internal managed link resolves to the page URL recorded for its target slug.
4. Compute SHA-256 for the complete normalized fetch text to detect later manual changes.
5. Build `knowledge/wiki-sync-state.json` only after all attempted writes verify successfully.
6. Record provider, workspace, root, repository, index fingerprint, verification timestamp, and for
   every page: slug, node ID, page ID, URL, title, local source hash, expected body hash, complete
   fetch hash, and verification result.
7. Run `npm run knowledge:notion:check`, `npm run knowledge:check`, and the changed-path knowledge
   query after the state file is written.

## Failure behavior

- Wrong identity, missing capability, permission failure, conflicting managed key, unexpected child
  content, partial write, async failure, or hash mismatch is a failed external sync.
- Do not update the sync state after a partial or unverified operation.
- Preserve the valid local catalog, index, Wiki bundle, manifest, and the last verified sync state.
- Report which pages were created, updated, skipped, verified, failed, or not attempted.
- Never substitute browser automation, direct API scripts, GitHub Wiki, Git operations, or an
  unverified statement of success.
