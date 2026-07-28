import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = join(rootDir, 'design', 'figma-project.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const canonicalKey = manifest.file?.key;
const canonicalUrl = manifest.file?.url;
const allowedFileKeys = manifest.allowedFileKeys;
const keyPattern = /^[A-Za-z0-9]{22}$/;

function fail(message) {
  process.stderr.write(`Figma governance violation: ${message}\n`);
  process.exit(1);
}

if (manifest.schemaVersion !== 1) fail('unsupported manifest schema');
if (manifest.policy !== 'deny-by-default') fail('policy must be deny-by-default');
if (!keyPattern.test(canonicalKey)) fail('canonical file key is invalid');
if (!Array.isArray(allowedFileKeys) || allowedFileKeys.length !== 1) {
  fail('allowedFileKeys must contain exactly one file key');
}
if (allowedFileKeys[0] !== canonicalKey) fail('allowlist does not match the canonical file key');
if (manifest.operations?.allowCreateNewFile !== false) fail('new Figma file creation must be disabled');
if (manifest.operations?.requireGuardBeforeMcpOperation !== true) {
  fail('the MCP operation guard must remain required');
}
if (manifest.operations?.migrationRequiresExplicitUserApproval !== true) {
  fail('canonical file migration must require explicit user approval');
}

const canonicalUrlKey = canonicalUrl?.match(/figma\.com\/design\/([A-Za-z0-9]+)/)?.[1];
if (canonicalUrlKey !== canonicalKey) fail('canonical URL does not match the canonical file key');

const fileKeyArgumentIndex = process.argv.indexOf('--file-key');
if (fileKeyArgumentIndex >= 0) {
  const requestedKey = process.argv[fileKeyArgumentIndex + 1];
  if (requestedKey !== canonicalKey) {
    fail(`requested file key ${requestedKey ?? '<missing>'} is not authorized`);
  }
}

const urlArgumentIndex = process.argv.indexOf('--url');
if (urlArgumentIndex >= 0) {
  const requestedUrl = process.argv[urlArgumentIndex + 1] ?? '';
  const requestedKey = requestedUrl.match(/figma\.com\/design\/([A-Za-z0-9]+)/)?.[1];
  if (requestedKey !== canonicalKey) fail('requested Figma URL is not authorized');
}

const textExtensions = new Set([
  '',
  '.cjs',
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.mts',
  '.scss',
  '.sh',
  '.toml',
  '.ts',
  '.tsx',
  '.txt',
  '.yaml',
  '.yml'
]);
const files = execFileSync('git', ['ls-files', '-co', '--exclude-standard', '-z'], {
  cwd: rootDir,
  encoding: 'utf8'
})
  .split('\0')
  .filter(Boolean);
const figmaUrlPattern = /https?:\/\/(?:www\.)?figma\.com\/(?:design|file|board|slides)\/([A-Za-z0-9]+)/g;
const figmaKeyPatterns = [
  /(?:figmaFileKey|figma_file_key|figma-file-key|--file-key)\s*[:=]?\s*[`'"]?([A-Za-z0-9]{22})/gi,
  /(?:Figma\s+)?file\s+key(?:\s+is)?\s*[:=]\s*[`'"]?([A-Za-z0-9]{22})/gi
];
const violations = [];

for (const file of files) {
  if (!textExtensions.has(extname(file))) continue;
  const path = join(rootDir, file);
  const content = readFileSync(path, 'utf8');
  if (content.includes('\0')) continue;
  for (const match of content.matchAll(figmaUrlPattern)) {
    if (match[1] !== canonicalKey) {
      violations.push(`${relative(rootDir, path)} references unauthorized Figma file ${match[1]}`);
    }
  }
  for (const pattern of figmaKeyPatterns) {
    for (const match of content.matchAll(pattern)) {
      if (match[1] !== canonicalKey) {
        violations.push(`${relative(rootDir, path)} declares unauthorized Figma file key ${match[1]}`);
      }
    }
  }
}

if (violations.length > 0) fail(violations.join('\n'));

process.stdout.write(`Canonical Figma file verified: ${canonicalKey}\n`);
