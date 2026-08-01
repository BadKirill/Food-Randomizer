import { sha256 } from './lib.mjs';

export const managedOwner = 'randomeal-knowledge';

export function normalizeLineEndings(value) {
  return value.replaceAll('\r\n', '\n').replaceAll('\r', '\n');
}

export function canonicalNotionBody(value) {
  const unescaped = ['\\', '*', '~', '`', '$', '[', ']', '<', '>', '{', '}', '|', '^', ':']
    .reduce((text, character) => text.replaceAll(`\\${character}`, character), normalizeLineEndings(value));
  return unescaped
    .replace(/\[([A-Za-z0-9._-]+)]\(https?:\/\/\1\/?\)/g, '$1')
    .replace(/<mention-page url="([^"]+)">[^<]*<\/mention-page>/g, '<mention-page url="$1"/>')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

function stripPageTitle(value) {
  const lines = normalizeLineEndings(value).split('\n');
  if (/^#\s+/.test(lines[0] ?? '')) lines.shift();
  while (lines[0] === '') lines.shift();
  return lines.join('\n').trimEnd();
}

function tableCells(line) {
  const content = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells = [];
  let current = '';
  let escaped = false;
  for (const character of content) {
    if (character === '|' && !escaped) {
      cells.push(current.trim());
      current = '';
    } else {
      current += character;
    }
    escaped = character === '\\' && !escaped;
    if (character !== '\\') escaped = false;
  }
  cells.push(current.trim());
  return cells;
}

function isTableSeparator(line) {
  const cells = tableCells(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

export function convertMarkdownTables(value) {
  const lines = normalizeLineEndings(value).split('\n');
  const output = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].trim().startsWith('|') || !lines[index + 1]?.trim().startsWith('|') || !isTableSeparator(lines[index + 1])) {
      output.push(lines[index]);
      continue;
    }
    const rows = [tableCells(lines[index])];
    index += 2;
    while (index < lines.length && lines[index].trim().startsWith('|')) {
      rows.push(tableCells(lines[index]));
      index += 1;
    }
    index -= 1;
    output.push('<table fit-page-width="true" header-row="true">');
    for (const row of rows) {
      output.push('\t<tr>');
      row.forEach((cell) => output.push(`\t\t<td>${cell}</td>`));
      output.push('\t</tr>');
    }
    output.push('</table>');
  }
  return output.join('\n');
}

export function rewriteManagedLinks(value, pageUrlBySlug) {
  return value.replace(/\[([^\]]+)]\(([^)]+)\)/g, (match, label, target) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) return match;
    const slug = target.replace(/^\.\//, '').replace(/\.md(?=#|$)/, '').split('#')[0];
    const url = pageUrlBySlug[slug];
    return url ? `<mention-page url="${url}">${label}</mention-page>` : label;
  });
}

function normalizeListIndentation(value) {
  return value.replace(/^( {2})+/gm, (spaces) => '\t'.repeat(spaces.length / 2));
}

export function buildManagedNotionPayload(page, source, pageUrlBySlug = {}) {
  const managedKey = `${managedOwner}:${page.slug}`;
  const stripped = stripPageTitle(source);
  const withTables = convertMarkdownTables(stripped);
  const withLinks = rewriteManagedLinks(withTables, pageUrlBySlug);
  const body = normalizeListIndentation(withLinks).trim();
  const bodySha256 = sha256(canonicalNotionBody(body));
  const content = [
    '<callout icon="🔄" color="gray_bg">',
    `\t**Managed RandoMeal knowledge mirror**<br>Managed key: \`${managedKey}\`<br>Source SHA-256: \`${page.sha256}\`<br>Body SHA-256: \`${bodySha256}\``,
    '</callout>',
    '---',
    body,
  ].join('\n');
  return { managedKey, body, bodySha256, content };
}

export function parseNotionPageFetch(value) {
  const text = normalizeLineEndings(value).trimEnd();
  const pageUrl = /<page url="([^"]+)"/.exec(text)?.[1] ?? null;
  const propertiesMatch = /<properties>\n([\s\S]*?)\n<\/properties>/.exec(text);
  let title = null;
  if (propertiesMatch) {
    try {
      title = JSON.parse(propertiesMatch[1]).title ?? null;
    } catch {
      title = null;
    }
  }
  const pageContentStart = propertiesMatch ? propertiesMatch.index + propertiesMatch[0].length : -1;
  const pageContentEnd = text.lastIndexOf('\n</page>');
  const outerContent = pageContentStart >= 0 && pageContentEnd > pageContentStart
    ? text.slice(pageContentStart, pageContentEnd).replace(/^\n/, '').trimEnd()
    : '';
  const contentMatch = /^<content>\n([\s\S]*)\n<\/content>$/.exec(outerContent);
  const content = contentMatch?.[1] ?? outerContent;
  return {
    title,
    pageUrl,
    content,
    bodySha256: sha256(canonicalNotionBody(content)),
    fetchSha256: sha256(text),
  };
}

export function extractBaselinePolicy(content, baseline) {
  const start = content.indexOf(baseline.contentStartHeading);
  const end = content.indexOf(`\n${baseline.contentEndHeading}`, start);
  if (start < 0 || end < 0 || end <= start) return null;
  return content.slice(start, end).trim();
}

export function verifyBaselineNotionFetch(value, baseline) {
  const page = parseNotionPageFetch(value);
  const policy = extractBaselinePolicy(page.content, baseline);
  const bodySha256 = policy ? sha256(canonicalNotionBody(policy)) : null;
  const checks = {
    title: page.title === baseline.pageTitle,
    pageUrl: page.pageUrl === baseline.pageUrl,
    policyBounds: policy !== null,
    bodySha256: bodySha256 === baseline.bodySha256,
  };
  return {
    ok: Object.values(checks).every(Boolean),
    checks,
    parsed: {
      ...page,
      policy,
      bodySha256,
    },
  };
}

export function parseNotionFetchText(value) {
  const page = parseNotionPageFetch(value);
  const content = page.content;
  const marker = /Managed key: `([^`]+)`<br>Source SHA-256: `([a-f0-9]{64})`<br>Body SHA-256: `([a-f0-9]{64})`/.exec(content);
  const calloutEnd = content.indexOf('</callout>');
  const divider = calloutEnd >= 0 ? content.indexOf('---', calloutEnd) : -1;
  const body = divider >= 0 ? content.slice(divider + 3).replace(/^\n/, '').trim() : '';
  return {
    title: page.title,
    pageUrl: page.pageUrl,
    managedKey: marker?.[1] ?? null,
    sourceSha256: marker?.[2] ?? null,
    declaredBodySha256: marker?.[3] ?? null,
    body,
    bodySha256: sha256(canonicalNotionBody(body)),
    fetchSha256: page.fetchSha256,
  };
}

export function verifyNotionFetch(value, expected) {
  const parsed = parseNotionFetchText(value);
  const checks = {
    title: parsed.title === expected.title,
    managedKey: parsed.managedKey === expected.managedKey,
    sourceSha256: parsed.sourceSha256 === expected.sourceSha256,
    declaredBodySha256: parsed.declaredBodySha256 === expected.bodySha256,
    bodySha256: parsed.bodySha256 === expected.bodySha256,
  };
  return { ok: Object.values(checks).every(Boolean), checks, parsed };
}

export function planNotionSync(manifest, payloads, state = null) {
  const statePages = new Map((state?.pages ?? []).map((page) => [page.slug, page]));
  return manifest.pages.map((page) => {
    const remote = statePages.get(page.slug) ?? null;
    const payload = payloads.get(page.slug);
    let action = 'skip';
    if (!remote) action = 'create';
    else if (remote.sourceSha256 !== page.sha256 || remote.bodySha256 !== payload.bodySha256 || remote.verified !== true) action = 'update';
    return { ...page, ...payload, action, remote };
  });
}

export function validateSyncState(manifest, state, payloads) {
  const errors = [];
  if (!state) return ['Missing knowledge/wiki-sync-state.json'];
  if (state.schemaVersion !== 3) errors.push('Sync state schemaVersion must be 3');
  if (state.provider !== manifest.externalSync.provider) errors.push('Sync state provider does not match manifest');
  if (state.repository !== manifest.repository) errors.push('Sync state repository does not match manifest');
  if (state.contentFingerprint !== manifest.contentFingerprint) errors.push('Sync state content fingerprint is stale');
  if (state.workspace?.id !== manifest.externalSync.target.workspaceId) errors.push('Sync state workspace does not match manifest');
  if (state.baselinePage?.id !== manifest.externalSync.baseline.pageId) errors.push('Sync state General AI Wiki page does not match manifest');
  if (state.baselinePage?.title !== manifest.externalSync.baseline.pageTitle) errors.push('Sync state General AI Wiki title does not match manifest');
  if (state.baselinePage?.url !== manifest.externalSync.baseline.pageUrl) errors.push('Sync state General AI Wiki URL does not match manifest');
  if (state.baselinePage?.snapshotSha256 !== manifest.externalSync.baseline.snapshotSha256) errors.push('Sync state General AI Wiki snapshot hash does not match manifest');
  if (state.baselinePage?.bodySha256 !== manifest.externalSync.baseline.bodySha256) errors.push('Sync state General AI Wiki body hash does not match manifest');
  if (!/^[a-f0-9]{64}$/.test(state.baselinePage?.fetchSha256 ?? '')) errors.push('Invalid General AI Wiki fetch hash');
  if (state.baselinePage?.verified !== true) errors.push('Unverified General AI Wiki baseline');
  if (state.rootPage?.id !== manifest.externalSync.target.rootPageId) errors.push('Sync state root page does not match manifest');
  if (state.rootPage?.title !== manifest.externalSync.target.rootPageTitle) errors.push('Sync state root page title does not match manifest');
  if (state.rootPage?.url !== manifest.externalSync.target.rootPageUrl) errors.push('Sync state root page URL does not match manifest');
  if (!/^[a-f0-9]{64}$/.test(state.rootPage?.fetchSha256 ?? '')) errors.push('Invalid root page fetch hash');
  const statePages = new Map();
  for (const page of state.pages ?? []) {
    if (statePages.has(page.slug)) errors.push(`Duplicate sync state slug: ${page.slug}`);
    statePages.set(page.slug, page);
  }
  for (const page of manifest.pages) {
    const remote = statePages.get(page.slug);
    const payload = payloads.get(page.slug);
    if (!remote) {
      errors.push(`Missing sync state page: ${page.slug}`);
      continue;
    }
    if (remote.nodeId !== page.nodeId) errors.push(`Node mismatch for ${page.slug}`);
    if (remote.title !== page.title) errors.push(`Title mismatch for ${page.slug}`);
    if (remote.sourceSha256 !== page.sha256) errors.push(`Source hash mismatch for ${page.slug}`);
    if (remote.bodySha256 !== payload.bodySha256) errors.push(`Body hash mismatch for ${page.slug}`);
    if (!remote.pageId || !remote.url) errors.push(`Missing Notion identity for ${page.slug}`);
    if (!/^[a-f0-9]{64}$/.test(remote.fetchSha256 ?? '')) errors.push(`Invalid fetch hash for ${page.slug}`);
    if (remote.verified !== true) errors.push(`Unverified sync state page: ${page.slug}`);
  }
  if (statePages.size !== manifest.pages.length) errors.push('Sync state page count does not match manifest');
  return errors;
}
