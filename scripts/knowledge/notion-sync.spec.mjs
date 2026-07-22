import assert from 'node:assert/strict';
import test from 'node:test';
import { sha256 } from './lib.mjs';
import {
  buildManagedNotionPayload,
  canonicalNotionBody,
  convertMarkdownTables,
  planNotionSync,
  rewriteManagedLinks,
  validateSyncState,
  verifyNotionFetch,
} from './notion-sync.mjs';

const source = '# Example\n\nSee [Target](Target) and [Docs](https://example.com).\n\n| Name | Value |\n| --- | --- |\n| One | Two |\n';
const page = {
  file: 'knowledge/wiki/Example.md',
  slug: 'Example',
  title: 'Example',
  group: 'System',
  sha256: sha256(source),
  nodeId: null,
};

test('rewrites managed links and preserves external links', () => {
  const result = rewriteManagedLinks('See [Target](Target) and [Docs](https://example.com).', { Target: 'https://app.notion.com/p/target' });
  assert.equal(result, 'See <mention-page url="https://app.notion.com/p/target">Target</mention-page> and [Docs](https://example.com).');
});

test('converts markdown tables to Notion table blocks', () => {
  const result = convertMarkdownTables('| Name | Value |\n| --- | --- |\n| One | Two |');
  assert.match(result, /<table fit-page-width="true" header-row="true">/);
  assert.match(result, /<td>Name<\/td>/);
  assert.match(result, /<td>Two<\/td>/);
  assert.doesNotMatch(result, /\| --- \|/);
});

test('builds and verifies a managed Notion payload', () => {
  const payload = buildManagedNotionPayload(page, source, { Target: 'https://app.notion.com/p/target' });
  const fetchText = [
    'Here is the result of "view":',
    '<page url="https://app.notion.com/p/example">',
    '<ancestor-path></ancestor-path>',
    '<properties>',
    '{"title":"Example"}',
    '</properties>',
    payload.content,
    '</page>',
  ].join('\n');
  const verification = verifyNotionFetch(fetchText, {
    title: page.title,
    managedKey: payload.managedKey,
    sourceSha256: page.sha256,
    bodySha256: payload.bodySha256,
  });
  assert.equal(verification.ok, true);
  assert.equal(verification.parsed.bodySha256, sha256(canonicalNotionBody(payload.body)));
});

test('rejects a body that changed while keeping the declared hash', () => {
  const payload = buildManagedNotionPayload(page, source);
  const fetchText = [
    '<page url="https://app.notion.com/p/example">',
    '<properties>',
    '{"title":"Example"}',
    '</properties>',
    payload.content.replace('See Target', 'See Changed Target'),
    '</page>',
  ].join('\n');
  const verification = verifyNotionFetch(fetchText, {
    title: page.title,
    managedKey: payload.managedKey,
    sourceSha256: page.sha256,
    bodySha256: payload.bodySha256,
  });
  assert.equal(verification.ok, false);
  assert.equal(verification.checks.bodySha256, false);
});

test('plans create, update, and skip without deleting unmanaged pages', () => {
  const payload = buildManagedNotionPayload(page, source);
  const manifest = { pages: [page] };
  const created = planNotionSync(manifest, new Map([[page.slug, payload]]), null);
  assert.equal(created[0].action, 'create');
  const skipped = planNotionSync(manifest, new Map([[page.slug, payload]]), {
    pages: [{ slug: page.slug, sourceSha256: page.sha256, bodySha256: payload.bodySha256, verified: true }, { slug: 'Unmanaged' }],
  });
  assert.equal(skipped[0].action, 'skip');
  const updated = planNotionSync(manifest, new Map([[page.slug, payload]]), {
    pages: [{ slug: page.slug, sourceSha256: '0'.repeat(64), bodySha256: payload.bodySha256, verified: true }],
  });
  assert.equal(updated[0].action, 'update');
});

test('requires a complete current verified sync state', () => {
  const payload = buildManagedNotionPayload(page, source);
  const manifest = {
    repository: 'BadKirill/Food-Randomizer',
    contentFingerprint: '1'.repeat(64),
    externalSync: {
      provider: 'notion',
      target: { workspaceId: 'workspace', rootPageId: 'root' },
    },
    pages: [page],
  };
  const state = {
    schemaVersion: 2,
    provider: 'notion',
    repository: manifest.repository,
    contentFingerprint: manifest.contentFingerprint,
    workspace: { id: 'workspace' },
    rootPage: { id: 'root' },
    pages: [{
      slug: page.slug,
      nodeId: page.nodeId,
      title: page.title,
      sourceSha256: page.sha256,
      bodySha256: payload.bodySha256,
      fetchSha256: '2'.repeat(64),
      pageId: 'page-id',
      url: 'https://app.notion.com/p/page-id',
      verified: true,
    }],
  };
  assert.deepEqual(validateSyncState(manifest, state, new Map([[page.slug, payload]])), []);
  state.pages[0].verified = false;
  assert.match(validateSyncState(manifest, state, new Map([[page.slug, payload]])).join('\n'), /Unverified/);
});
