# Native GitHub Wiki MCP sync protocol

Use this protocol only with tools that explicitly operate on GitHub Wiki pages. General repository
content tools are insufficient because GitHub Wiki is a separate content system.

## Preconditions

1. Confirm the MCP is authenticated for the repository in `knowledge/catalog.json`.
2. Confirm the repository Wiki is enabled and initialized.
3. Discover explicit Wiki page list, read, create, update, and revision or content verification
   operations.
4. Run `npm run knowledge:check` and stop if the local graph is stale.
5. Read `knowledge/wiki-manifest.json` and the referenced local page files.

If any precondition fails, report external synchronization as blocked. Do not use another transport.

## Upsert

1. List remote Wiki pages.
2. Match only pages whose slugs appear in the local manifest.
3. Read each matching remote page and compute SHA-256 after normalizing line endings to LF.
4. Skip pages whose hash equals the local manifest.
5. Create missing managed pages and update changed managed pages.
6. Preserve every remote page not owned by the manifest.
7. Do not delete a previously managed page without explicit user authorization.

## Verification

1. Read every created or updated page back through the same Wiki MCP.
2. Normalize line endings to LF and verify SHA-256 against the manifest.
3. Record repository, slug, remote revision identifier, local hash, verification result, and index
   fingerprint in `knowledge/wiki-sync-state.json`.
4. Write the sync state only when all managed page writes in the operation verify successfully.
5. Run `npm run knowledge:check` again after the sync-state file enters repository coverage.

## Failure behavior

- A missing native Wiki tool, disabled Wiki, permission error, partial write, revision conflict, or
  hash mismatch is a failed external sync.
- Preserve the valid local Wiki bundle and manifest.
- Report exactly which pages verified, failed, or were not attempted.
- Never claim that the external Wiki mirrors the catalog without successful post-write reads.
