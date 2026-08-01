import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildIndex, catalogPath, indexPath, matchesGlob, readJson, stableJson, wikiDir, wikiManifestPath, wikiSyncStatePath } from './lib.mjs';
import { buildWikiManifest, buildWikiPages } from './render-wiki.mjs';

const errors = [];
const catalog = readJson(catalogPath);
const index = readJson(indexPath);
const nodeIds = new Set();
const slugs = new Set();

if (catalog.syncPolicy.provider !== 'notion') errors.push('Knowledge sync provider must be notion');
if (!catalog.syncPolicy.baseline?.pageId) errors.push('Missing General AI Wiki page ID');
if (!catalog.syncPolicy.baseline?.pageUrl) errors.push('Missing General AI Wiki page URL');
if (!catalog.syncPolicy.baseline?.pageTitle) errors.push('Missing General AI Wiki page title');
if (!catalog.syncPolicy.baseline?.snapshotFile) errors.push('Missing local General AI Wiki snapshot path');
if (!catalog.syncPolicy.baseline?.contentStartHeading) errors.push('Missing General AI Wiki policy start heading');
if (!catalog.syncPolicy.baseline?.contentEndHeading) errors.push('Missing General AI Wiki policy end heading');
if (!catalog.syncPolicy.target?.workspaceId) errors.push('Missing Notion workspace ID');
if (!catalog.syncPolicy.target?.rootPageId) errors.push('Missing Notion root page ID');
if (!catalog.syncPolicy.target?.rootPageUrl) errors.push('Missing Notion root page URL');

for (const node of catalog.nodes) {
  if (nodeIds.has(node.id)) errors.push(`Duplicate node id: ${node.id}`);
  if (slugs.has(node.wikiSlug)) errors.push(`Duplicate Wiki slug: ${node.wikiSlug}`);
  nodeIds.add(node.id);
  slugs.add(node.wikiSlug);
}

for (const node of catalog.nodes) {
  for (const relation of [...node.dependsOn, ...node.related, ...node.supersedes, ...node.supersededBy]) {
    if (!nodeIds.has(relation)) errors.push(`Unknown relation ${relation} from ${node.id}`);
  }
  for (const source of node.sources) {
    if (!index.files.some((file) => matchesGlob(file.path, source))) errors.push(`Source pattern ${source} from ${node.id} matches no indexed file`);
  }
}

function findDependencyCycle(nodeId, visiting = new Set(), visited = new Set()) {
  if (visiting.has(nodeId)) return [...visiting, nodeId];
  if (visited.has(nodeId)) return null;
  visiting.add(nodeId);
  const node = catalog.nodes.find((candidate) => candidate.id === nodeId);
  for (const dependencyId of node?.dependsOn ?? []) {
    const cycle = findDependencyCycle(dependencyId, new Set(visiting), visited);
    if (cycle) return cycle;
  }
  visiting.delete(nodeId);
  visited.add(nodeId);
  return null;
}

for (const node of catalog.nodes) {
  const cycle = findDependencyCycle(node.id);
  if (cycle) {
    errors.push(`Dependency cycle: ${cycle.join(' -> ')}`);
    break;
  }
}

for (const route of catalog.routes) {
  for (const id of [...route.nodes, ...route.required]) {
    if (!nodeIds.has(id)) errors.push(`Unknown routing node ${id} in ${route.id}`);
  }
}

for (const file of index.files) {
  if (file.nodeIds.length === 0) errors.push(`Unassigned file: ${file.path}`);
  for (const id of file.nodeIds) {
    if (!nodeIds.has(id)) errors.push(`File ${file.path} references unknown node ${id}`);
  }
  if (!file.generated && !file.binary && file.sections[0]?.kind !== 'file') errors.push(`Missing root section: ${file.path}`);
  for (const section of file.sections) {
    if (section.line < 1 || section.endLine < section.line || section.endLine > file.lines) errors.push(`Invalid section range ${section.id} in ${file.path}`);
  }
  if (file.generated && file.sha256 !== null) errors.push(`Managed generated file has recursive hash: ${file.path}`);
  if (!file.generated && !file.sha256) errors.push(`Source file has no hash: ${file.path}`);
}

const indexedPaths = index.files.map((file) => file.path);
if (new Set(indexedPaths).size !== indexedPaths.length) errors.push('Duplicate file path in knowledge/index.json');
if ([...indexedPaths].sort((left, right) => left.localeCompare(right)).join('\n') !== indexedPaths.join('\n')) errors.push('File index is not sorted');

const expectedIndex = buildIndex(catalog);
if (stableJson(index) !== stableJson(expectedIndex)) errors.push('knowledge/index.json is stale; run npm run knowledge:update');

const expectedPages = buildWikiPages(catalog, index);
for (const [file, expected] of expectedPages) {
  const path = join(wikiDir, file);
  if (!existsSync(path)) errors.push(`Missing Wiki page: ${file}`);
  else if (readFileSync(path, 'utf8') !== expected) errors.push(`Stale Wiki page: ${file}`);
}

const expectedManifest = buildWikiManifest(catalog, index, expectedPages);
if (!existsSync(wikiManifestPath)) errors.push('Missing knowledge/wiki-manifest.json');
else if (readFileSync(wikiManifestPath, 'utf8') !== stableJson(expectedManifest)) errors.push('knowledge/wiki-manifest.json is stale');

if (!existsSync(wikiSyncStatePath)) errors.push('Missing knowledge/wiki-sync-state.json');
else {
  const state = readJson(wikiSyncStatePath);
  const baseline = expectedManifest.externalSync.baseline;
  if (state.baselinePage?.id !== baseline.pageId) errors.push('Local General AI snapshot proof has the wrong page ID');
  if (state.baselinePage?.url !== baseline.pageUrl) errors.push('Local General AI snapshot proof has the wrong page URL');
  if (state.baselinePage?.snapshotSha256 !== baseline.snapshotSha256) errors.push('Local General AI snapshot raw hash is unverified');
  if (state.baselinePage?.bodySha256 !== baseline.bodySha256) errors.push('Local General AI snapshot canonical body hash is unverified');
  if (state.baselinePage?.verified !== true) errors.push('Local General AI snapshot proof is unverified');
}

const manifestTitles = expectedManifest.pages.map((page) => page.title);
if (new Set(manifestTitles).size !== manifestTitles.length) errors.push('Duplicate managed Notion page title');

if (errors.length > 0) {
  process.stderr.write(`${errors.map((error) => `- ${error}`).join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(`Knowledge graph valid: ${index.coverage.indexedFiles} files, ${catalog.nodes.length} nodes, ${expectedPages.size} Wiki pages\n`);
