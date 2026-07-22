import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readJson, rootDir, wikiManifestPath, wikiSyncStatePath } from './lib.mjs';
import { buildManagedNotionPayload, validateSyncState } from './notion-sync.mjs';

const manifest = readJson(wikiManifestPath);
const state = existsSync(wikiSyncStatePath) ? readJson(wikiSyncStatePath) : null;
const pageUrlBySlug = Object.fromEntries((state?.pages ?? []).map((page) => [page.slug, page.url]));
const payloads = new Map(manifest.pages.map((page) => {
  const source = readFileSync(join(rootDir, page.file), 'utf8');
  return [page.slug, buildManagedNotionPayload(page, source, pageUrlBySlug)];
}));
const errors = validateSyncState(manifest, state, payloads);

if (errors.length > 0) {
  process.stderr.write(`${errors.map((error) => `- ${error}`).join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(`Notion sync state valid: ${state.pages.length} verified pages for ${state.contentFingerprint}\n`);
