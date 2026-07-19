import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { buildIndex, indexPath, readJson, stableJson, catalogPath } from './lib.mjs';

const catalog = readJson(catalogPath);
const index = buildIndex(catalog);
mkdirSync(dirname(indexPath), { recursive: true });
writeFileSync(indexPath, stableJson(index));
process.stdout.write(`Indexed ${index.coverage.indexedFiles} files with fingerprint ${index.contentFingerprint.slice(0, 12)}\n`);
