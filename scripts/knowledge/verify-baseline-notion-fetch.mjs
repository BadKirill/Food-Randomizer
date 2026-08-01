import { readJson, wikiManifestPath } from './lib.mjs';
import { verifyBaselineNotionFetch } from './notion-sync.mjs';

function argument(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : null;
}

const fetchBase64 = argument('fetch-base64');
if (!fetchBase64) {
  process.stderr.write('Required argument: --fetch-base64\n');
  process.exit(1);
}

const manifest = readJson(wikiManifestPath);
const baseline = manifest.externalSync.baseline;
const fetchText = Buffer.from(fetchBase64, 'base64url').toString('utf8');
const verification = verifyBaselineNotionFetch(fetchText, baseline);
const verifiedAt = new Date().toISOString();

process.stdout.write(`${JSON.stringify({
  ...verification,
  baselinePage: {
    id: baseline.pageId,
    title: baseline.pageTitle,
    url: baseline.pageUrl,
    snapshotSha256: baseline.snapshotSha256,
    bodySha256: verification.parsed.bodySha256,
    fetchSha256: verification.parsed.fetchSha256,
    verified: verification.ok,
    verifiedAt,
  },
}, null, 2)}\n`);

if (!verification.ok) process.exit(1);
