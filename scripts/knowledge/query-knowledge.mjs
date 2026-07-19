import { catalogPath, filesForNode, indexPath, matchesGlob, nodeById, readJson } from './lib.mjs';

function argument(name, fallback = '') {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] ?? fallback : fallback;
}

function tokens(value) {
  return [...new Set((value.normalize('NFKC').toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}_.:/-]*/gu) ?? []).filter((token) => token.length > 1))];
}

function includesToken(value, token) {
  return value.normalize('NFKC').toLowerCase().includes(token);
}

function scoreNode(node, queryTokens, paths, routeMatches) {
  let score = 0;
  const reasons = [];
  for (const token of queryTokens) {
    if (includesToken(node.id, token)) {
      score += 12;
      reasons.push(`id:${token}`);
    }
    if (includesToken(node.title, token)) {
      score += 9;
      reasons.push(`title:${token}`);
    }
    if (node.tags.some((tag) => includesToken(tag, token))) {
      score += 7;
      reasons.push(`tag:${token}`);
    }
    if (includesToken(node.summary, token) || node.rules.some((rule) => includesToken(rule, token))) {
      score += 4;
      reasons.push(`content:${token}`);
    }
    if (node.sources.some((source) => includesToken(source, token))) {
      score += 3;
      reasons.push(`source:${token}`);
    }
  }
  for (const path of paths) {
    if (node.sources.some((source) => matchesGlob(path, source) || includesToken(path, source.replaceAll('*', '')))) {
      score += 20;
      reasons.push(`path:${path}`);
    }
  }
  if (routeMatches.has(node.id)) {
    score += 30;
    reasons.push('routing-rule');
  }
  return { score, reasons: [...new Set(reasons)] };
}

function matchedRouteIds(catalog, queryTokens, paths) {
  const ids = new Set();
  for (const route of catalog.routes) {
    const termMatch = route.terms.some((term) => queryTokens.some((token) => includesToken(term, token) || includesToken(token, term)));
    const pathMatch = paths.some((path) => route.paths.some((pattern) => matchesGlob(path, pattern)));
    if (termMatch || pathMatch) {
      route.nodes.forEach((id) => ids.add(id));
      route.required.forEach((id) => ids.add(id));
    }
  }
  return ids;
}

function selectNodes(catalog, query, paths, limit) {
  const queryTokens = tokens(query);
  const routeMatches = matchedRouteIds(catalog, queryTokens, paths);
  const scored = catalog.nodes
    .map((node) => ({ node, ...scoreNode(node, queryTokens, paths, routeMatches) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.node.id.localeCompare(right.node.id));
  if (scored.length === 0) {
    for (const fallbackId of catalog.readingPolicy.fallbackNodes) {
      const node = nodeById(catalog, fallbackId);
      if (node) scored.push({ node, score: 1, reasons: ['fallback'] });
    }
  }
  const selected = scored.slice(0, limit);
  const selectedIds = new Set(selected.map((entry) => entry.node.id));
  for (const entry of [...selected]) {
    for (const dependencyId of entry.node.dependsOn) {
      if (selected.length >= limit || selectedIds.has(dependencyId)) continue;
      const dependency = nodeById(catalog, dependencyId);
      if (!dependency) continue;
      selected.push({ node: dependency, score: entry.score - 1, reasons: [`dependency:${entry.node.id}`] });
      selectedIds.add(dependencyId);
    }
  }
  return selected;
}

function contextPacket(catalog, index, selected, query, paths) {
  const lines = [
    '# RandoMeal context packet',
    '',
    `Query: ${query || 'not specified'}`,
    `Paths: ${paths.length > 0 ? paths.join(', ') : 'not specified'}`,
    `Index fingerprint: ${index.contentFingerprint}`,
    '',
    'Read only the nodes and source ranges below first. Expand to direct dependencies only if the evidence is insufficient.',
    '',
  ];
  for (const entry of selected) {
    const files = filesForNode(index, entry.node.id);
    lines.push(`## ${entry.node.title}`, '', entry.node.summary, '', `Why selected: ${entry.reasons.join(', ')}`, '', 'Rules:');
    entry.node.rules.forEach((rule) => lines.push(`- ${rule}`));
    lines.push('', 'Primary sources:');
    files.slice(0, catalog.readingPolicy.maxFilesPerNode).forEach((file) => {
      const ranges = file.sections.slice(0, 4).map((section) => `${section.title} L${section.line}-${section.endLine}`).join('; ');
      lines.push(`- ${file.path}${ranges ? ` — ${ranges}` : ''}`);
    });
    if (files.length > catalog.readingPolicy.maxFilesPerNode) lines.push(`- … ${files.length - catalog.readingPolicy.maxFilesPerNode} more files are available in knowledge/index.json`);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

const catalog = readJson(catalogPath);
const index = readJson(indexPath);
const query = argument('query');
const paths = argument('paths').split(',').map((path) => path.trim()).filter(Boolean);
const limit = Math.min(Math.max(Number(argument('limit', String(catalog.readingPolicy.maxNodes))) || catalog.readingPolicy.maxNodes, 1), catalog.readingPolicy.maxNodes);
const selected = selectNodes(catalog, query, paths, limit);
const output = {
  query,
  paths,
  indexFingerprint: index.contentFingerprint,
  selected: selected.map((entry) => ({
    id: entry.node.id,
    title: entry.node.title,
    score: entry.score,
    reasons: entry.reasons,
    sources: filesForNode(index, entry.node.id).map((file) => file.path),
  })),
};

if (process.argv.includes('--json')) process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
else process.stdout.write(contextPacket(catalog, index, selected, query, paths));
