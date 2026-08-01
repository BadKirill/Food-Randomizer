import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalogPath, filesForNode, indexPath, readJson, rootDir, sha256, stableJson, wikiDir, wikiManifestPath } from './lib.mjs';
import { canonicalNotionBody } from './notion-sync.mjs';

function pageLink(title, slug) {
  return `[${title}](${slug})`;
}

function wikiPageTitle(file, content) {
  const heading = /^#\s+(.+?)\s*$/m.exec(content)?.[1];
  if (heading) return heading;
  if (file === '_Sidebar.md') return 'Knowledge Navigation';
  return basename(file, '.md').replaceAll('-', ' ');
}

function sourceList(files) {
  if (files.length === 0) return ['No current repository files are assigned.'];
  return files.map((file) => {
    const sections = file.sections.slice(0, 8).map((section) => `${section.title} (L${section.line}–${section.endLine})`).join('; ');
    return `- \`${file.path}\` — ${file.summary}${sections ? `. Sections: ${sections}` : ''}`;
  });
}

function renderHome(catalog, index) {
  const groups = new Map();
  for (const node of catalog.nodes) {
    const items = groups.get(node.group) ?? [];
    items.push(node);
    groups.set(node.group, items);
  }
  const lines = [
    '# RandoMeal Knowledge Graph',
    '',
    catalog.project.summary,
    '',
    '## Selective reading protocol',
    '',
    `Start with the catalog, select no more than ${catalog.readingPolicy.maxNodes} relevant nodes, then read only the listed source ranges. Use repository-wide search only when the selected packet lacks evidence.`,
    '',
    '## Coverage',
    '',
    `- Repository files discovered: ${index.coverage.repositoryFiles}`,
    `- Files indexed semantically or by metadata: ${index.coverage.indexedFiles}`,
    `- Binary assets indexed by metadata: ${index.coverage.binaryFiles}`,
    `- Files with extracted sections: ${index.coverage.filesWithSections}`,
    `- Content fingerprint: \`${index.contentFingerprint}\``,
    '',
    '## Knowledge tree',
    '',
  ];
  for (const [group, nodes] of groups) {
    lines.push(`### ${group}`, '');
    nodes.forEach((node) => lines.push(`- ${pageLink(node.title, node.wikiSlug)} — ${node.summary}`));
    lines.push('');
  }
  lines.push('## Complete file index', '', `See ${pageLink('File Index', 'File-Index')} for every indexed source and extracted section.`, '');
  return `${lines.join('\n').trimEnd()}\n`;
}

function renderSidebar(catalog) {
  const lines = ['- [Home](Home)', '- [Knowledge Protocol](Knowledge-Protocol)', '- [File Index](File-Index)'];
  let group = null;
  for (const node of catalog.nodes) {
    if (node.group !== group) {
      group = node.group;
      lines.push(`- **${group}**`);
    }
    lines.push(`  - ${pageLink(node.title, node.wikiSlug)}`);
  }
  return `${lines.join('\n').trimEnd()}\n`;
}

function renderProtocol(catalog) {
  const lines = [
    '# Knowledge Protocol',
    '',
    '## Retrieval',
    '',
    ...catalog.readingPolicy.steps.map((step, index) => `${index + 1}. ${step}`),
    '',
    '## Limits',
    '',
    `- Maximum selected nodes: ${catalog.readingPolicy.maxNodes}`,
    `- Maximum primary files displayed per node: ${catalog.readingPolicy.maxFilesPerNode}`,
    '- Repository-wide reading is a fallback, not the default.',
    '',
    '## Update and external mirror',
    '',
    ...catalog.syncPolicy.steps.map((step, index) => `${index + 1}. ${step}`),
    '',
    `External sync mode: **${catalog.syncPolicy.mode}**.`,
    '',
  ];
  return `${lines.join('\n').trimEnd()}\n`;
}

function renderNode(node, catalog, index) {
  const files = filesForNode(index, node.id);
  const dependencies = node.dependsOn.map((id) => catalog.nodes.find((candidate) => candidate.id === id)).filter(Boolean);
  const related = node.related.map((id) => catalog.nodes.find((candidate) => candidate.id === id)).filter(Boolean);
  const supersedes = node.supersedes.map((id) => catalog.nodes.find((candidate) => candidate.id === id)).filter(Boolean);
  const supersededBy = node.supersededBy.map((id) => catalog.nodes.find((candidate) => candidate.id === id)).filter(Boolean);
  const lines = [
    `# ${node.title}`,
    '',
    node.summary,
    '',
    `Status: **${node.status}**`,
    `Authority: **${node.authority}**`,
    '',
    '## Rules and patterns',
    '',
    ...node.rules.map((rule) => `- ${rule}`),
    '',
    '## Source coverage',
    '',
    ...sourceList(files),
    '',
    '## Graph relations',
    '',
    `- Depends on: ${dependencies.length > 0 ? dependencies.map((entry) => pageLink(entry.title, entry.wikiSlug)).join(', ') : 'none'}`,
    `- Related: ${related.length > 0 ? related.map((entry) => pageLink(entry.title, entry.wikiSlug)).join(', ') : 'none'}`,
    `- Supersedes: ${supersedes.length > 0 ? supersedes.map((entry) => pageLink(entry.title, entry.wikiSlug)).join(', ') : 'none'}`,
    `- Superseded by: ${supersededBy.length > 0 ? supersededBy.map((entry) => pageLink(entry.title, entry.wikiSlug)).join(', ') : 'none'}`,
    '',
    '## Retrieval tags',
    '',
    node.tags.map((tag) => `\`${tag}\``).join(' · '),
    '',
  ];
  return `${lines.join('\n').trimEnd()}\n`;
}

function renderFileIndex(index) {
  const lines = [
    '# Complete File Index',
    '',
    `Fingerprint: \`${index.contentFingerprint}\``,
    '',
    '| File | Language | Knowledge nodes | Summary |',
    '| --- | --- | --- | --- |',
  ];
  for (const file of index.files) {
    lines.push(`| \`${file.path}\` | ${file.language} | ${file.nodeIds.join(', ')} | ${file.summary.replaceAll('|', '\\|')} |`);
  }
  lines.push('', '## Managed generated files', '');
  index.coverage.generatedManaged.forEach((path) => lines.push(`- \`${path}\``));
  lines.push('');
  return `${lines.join('\n').trimEnd()}\n`;
}

export function buildWikiPages(catalog, index) {
  const pages = new Map([
    ['Home.md', renderHome(catalog, index)],
    ['_Sidebar.md', renderSidebar(catalog)],
    ['Knowledge-Protocol.md', renderProtocol(catalog)],
    ['File-Index.md', renderFileIndex(index)],
  ]);
  for (const node of catalog.nodes) pages.set(`${node.wikiSlug}.md`, renderNode(node, catalog, index));
  return pages;
}

export function buildWikiManifest(catalog, index, pages) {
  const snapshotPath = join(rootDir, catalog.syncPolicy.baseline.snapshotFile);
  const snapshot = readFileSync(snapshotPath, 'utf8');
  const baseline = {
    ...catalog.syncPolicy.baseline,
    snapshotSha256: sha256(snapshot),
    bodySha256: sha256(canonicalNotionBody(snapshot)),
  };
  return {
    schemaVersion: 3,
    owner: 'randomeal-knowledge',
    repository: catalog.project.repository,
    contentFingerprint: index.contentFingerprint,
    externalSync: {
      provider: catalog.syncPolicy.provider,
      mode: catalog.syncPolicy.mode,
      requiredCapability: catalog.syncPolicy.requiredCapability,
      baseline,
      target: catalog.syncPolicy.target,
    },
    pages: [...pages].map(([file, content]) => {
      const node = catalog.nodes.find((candidate) => `${candidate.wikiSlug}.md` === file) ?? null;
      return {
        file: `knowledge/wiki/${file}`,
        slug: basename(file, '.md'),
        title: wikiPageTitle(file, content),
        group: node?.group ?? 'System',
        sha256: sha256(content),
        nodeId: node?.id ?? null,
      };
    }),
  };
}

export function renderWiki() {
  const catalog = readJson(catalogPath);
  const index = readJson(indexPath);
  const pages = buildWikiPages(catalog, index);
  mkdirSync(wikiDir, { recursive: true });
  const ownedNames = new Set(pages.keys());
  for (const file of readdirSync(wikiDir)) {
    if (file.endsWith('.md') && !ownedNames.has(file)) unlinkSync(join(wikiDir, file));
  }
  for (const [file, content] of pages) writeFileSync(join(wikiDir, file), content);
  const manifest = buildWikiManifest(catalog, index, pages);
  writeFileSync(wikiManifestPath, stableJson(manifest));
  return manifest;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const manifest = renderWiki();
  process.stdout.write(`Rendered ${manifest.pages.length} Wiki pages\n`);
}
