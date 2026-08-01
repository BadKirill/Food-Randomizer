import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readJson, rootDir, wikiManifestPath, wikiSyncStatePath } from './lib.mjs';
import { buildManagedNotionPayload, planNotionSync } from './notion-sync.mjs';

const manifest = readJson(wikiManifestPath);
const state = existsSync(wikiSyncStatePath) ? readJson(wikiSyncStatePath) : null;
const pageMapIndex = process.argv.indexOf('--page-map-base64');
const bootstrapPageMap = pageMapIndex >= 0
  ? JSON.parse(Buffer.from(process.argv[pageMapIndex + 1], 'base64url').toString('utf8'))
  : {};
const pageUrlBySlug = {
  ...Object.fromEntries((state?.pages ?? []).map((page) => [page.slug, page.url])),
  ...bootstrapPageMap,
};
const payloads = new Map(manifest.pages.map((page) => {
  const source = readFileSync(join(rootDir, page.file), 'utf8');
  return [page.slug, buildManagedNotionPayload(page, source, pageUrlBySlug)];
}));
const plan = planNotionSync(manifest, payloads, state);
const slugIndex = process.argv.indexOf('--slug');
const requestedSlug = slugIndex >= 0 ? process.argv[slugIndex + 1] : null;
const selected = requestedSlug ? plan.filter((page) => page.slug === requestedSlug) : plan;

if (requestedSlug && selected.length === 0) {
  process.stderr.write(`Unknown managed page slug: ${requestedSlug}\n`);
  process.exit(1);
}

if (process.argv.includes('--summary-json')) {
  process.stdout.write(`${JSON.stringify({
    baseline: manifest.externalSync.baseline,
    target: manifest.externalSync.target,
    contentFingerprint: manifest.contentFingerprint,
    pages: selected.map(({ slug, title, action }) => ({ slug, title, action })),
  }, null, 2)}\n`);
} else if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify({
    schemaVersion: 1,
    baseline: manifest.externalSync.baseline,
    target: manifest.externalSync.target,
    contentFingerprint: manifest.contentFingerprint,
    pages: selected,
  }, null, 2)}\n`);
} else {
  const counts = Object.fromEntries(['create', 'update', 'skip'].map((action) => [action, selected.filter((page) => page.action === action).length]));
  process.stdout.write(`Notion sync plan: ${counts.create} create, ${counts.update} update, ${counts.skip} skip\n`);
}
