import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const script = join(dirname(fileURLToPath(import.meta.url)), 'check-figma-governance.mjs');
const canonicalKey = 'DP7ujNqthXzWwwu1mnFhfj';
const unauthorizedKey = 'x'.repeat(22);

function run(args) {
  return spawnSync(process.execPath, [script, ...args], {
    encoding: 'utf8'
  });
}

test('accepts the canonical file key', () => {
  const result = run(['--file-key', canonicalKey]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Canonical Figma file verified/);
});

test('rejects another file key', () => {
  const result = run(['--file-key', unauthorizedKey]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /is not authorized/);
});

test('accepts the canonical design URL', () => {
  const result = run(['--url', `https://www.figma.com/design/${canonicalKey}`]);
  assert.equal(result.status, 0);
});

test('rejects a non-design URL even with the canonical key', () => {
  const result = run(['--url', `https://www.figma.com/board/${canonicalKey}`]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /URL is not authorized/);
});
