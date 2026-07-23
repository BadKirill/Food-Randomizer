import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readJson, rootDir, wikiManifestPath } from './lib.mjs';
import { buildManagedNotionPayload, canonicalNotionBody, verifyNotionFetch } from './notion-sync.mjs';

function argument(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : null;
}

const slug = argument('slug');
const fetchBase64 = argument('fetch-base64');
const pageMapBase64 = argument('page-map-base64');

if (!slug || !fetchBase64 || !pageMapBase64) {
  process.stderr.write('Required arguments: --slug, --fetch-base64, --page-map-base64\n');
  process.exit(1);
}

const manifest = readJson(wikiManifestPath);
const page = manifest.pages.find((candidate) => candidate.slug === slug);
if (!page) {
  process.stderr.write(`Unknown managed page slug: ${slug}\n`);
  process.exit(1);
}

const pageUrlBySlug = JSON.parse(Buffer.from(pageMapBase64, 'base64url').toString('utf8'));
const source = readFileSync(join(rootDir, page.file), 'utf8');
const payload = buildManagedNotionPayload(page, source, pageUrlBySlug);
const fetchText = Buffer.from(fetchBase64, 'base64url').toString('utf8');
const verification = verifyNotionFetch(fetchText, {
  title: page.title,
  managedKey: payload.managedKey,
  sourceSha256: page.sha256,
  bodySha256: payload.bodySha256,
});
const expectedCanonical = canonicalNotionBody(payload.body);
const actualCanonical = canonicalNotionBody(verification.parsed.body);
let difference = null;
if (expectedCanonical !== actualCanonical) {
  let index = 0;
  while (index < expectedCanonical.length && expectedCanonical[index] === actualCanonical[index]) index += 1;
  difference = {
    index,
    expected: expectedCanonical.slice(Math.max(0, index - 120), index + 240),
    actual: actualCanonical.slice(Math.max(0, index - 120), index + 240),
  };
}

process.stdout.write(`${JSON.stringify({
  slug,
  sourceSha256: page.sha256,
  bodySha256: payload.bodySha256,
  difference,
  ...verification,
}, null, 2)}\n`);

if (!verification.ok) process.exit(1);
