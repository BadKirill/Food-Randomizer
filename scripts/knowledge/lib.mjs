import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const catalogPath = join(rootDir, 'knowledge/catalog.json');
export const indexPath = join(rootDir, 'knowledge/index.json');
export const wikiDir = join(rootDir, 'knowledge/wiki');
export const wikiManifestPath = join(rootDir, 'knowledge/wiki-manifest.json');
export const wikiSyncStatePath = join(rootDir, 'knowledge/wiki-sync-state.json');

const generatedPatterns = [
  'knowledge/index.json',
  'knowledge/wiki/**',
  'knowledge/wiki-manifest.json',
  'knowledge/wiki-sync-state.json',
];

const binaryExtensions = new Set([
  '.avif',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.pdf',
  '.png',
  '.webp',
  '.woff',
  '.woff2',
  '.zip',
]);

const languageByExtension = new Map([
  ['.cjs', 'javascript'],
  ['.css', 'css'],
  ['.env', 'environment'],
  ['.js', 'javascript'],
  ['.json', 'json'],
  ['.jsx', 'javascript-react'],
  ['.md', 'markdown'],
  ['.mjs', 'javascript'],
  ['.prisma', 'prisma'],
  ['.sh', 'shell'],
  ['.sql', 'sql'],
  ['.toml', 'toml'],
  ['.ts', 'typescript'],
  ['.tsx', 'typescript-react'],
  ['.yaml', 'yaml'],
  ['.yml', 'yaml'],
]);

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export function toRepoPath(path) {
  return posix.normalize(path.replaceAll('\\', '/'));
}

export function globToRegex(pattern) {
  let result = '^';
  for (let index = 0; index < pattern.length; index += 1) {
    const character = pattern[index];
    const next = pattern[index + 1];
    if (character === '*' && next === '*') {
      const after = pattern[index + 2];
      if (after === '/') {
        result += '(?:.*/)?';
        index += 2;
      } else {
        result += '.*';
        index += 1;
      }
    } else if (character === '*') {
      result += '[^/]*';
    } else if (character === '?') {
      result += '[^/]';
    } else {
      result += character.replace(/[|\\{}()[\]^$+?.]/g, '\\$&');
    }
  }
  return new RegExp(`${result}$`);
}

export function matchesGlob(path, pattern) {
  return globToRegex(pattern).test(path);
}

export function isGeneratedPath(path) {
  return generatedPatterns.some((pattern) => matchesGlob(path, pattern));
}

export function listRepositoryFiles() {
  const output = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    { cwd: rootDir, encoding: 'utf8' },
  );
  return output
    .split('\0')
    .filter(Boolean)
    .map(toRepoPath)
    .filter((path) => existsSync(join(rootDir, path)) && statSync(join(rootDir, path)).isFile())
    .sort((left, right) => left.localeCompare(right));
}

function languageForPath(path) {
  const basename = posix.basename(path);
  if (basename === 'Dockerfile') return 'dockerfile';
  if (basename.startsWith('.env')) return 'environment';
  if (basename === '.gitignore' || basename === '.dockerignore' || basename === '.npmrc' || basename === '.nvmrc') {
    return 'configuration';
  }
  return languageByExtension.get(extname(path).toLowerCase()) ?? 'text';
}

function kindForPath(path, language, binary, generated) {
  const basename = posix.basename(path);
  if (generated) return 'generated';
  if (path === 'AGENTS.md' || path === 'AI_CONTEXT.md' || path.startsWith('.codex/')) return 'agent-rule';
  if (path.startsWith('.agents/skills/')) return 'skill';
  if (basename === 'package-lock.json') return 'lockfile';
  if (path.includes('/migrations/')) return 'migration';
  if (/\.(spec|test)\.[cm]?[jt]sx?$/.test(path) || path.includes('/test/')) return 'test';
  if (binary) return 'asset';
  if (language === 'markdown') return 'documentation';
  if (['configuration', 'dockerfile', 'environment', 'json', 'toml', 'yaml'].includes(language)) return 'configuration';
  if (path.startsWith('scripts/')) return 'tooling';
  if (['javascript', 'javascript-react', 'prisma', 'shell', 'sql', 'typescript', 'typescript-react'].includes(language)) return 'source';
  return 'other';
}

function isBinary(path, buffer) {
  return binaryExtensions.has(extname(path).toLowerCase()) || buffer.includes(0);
}

function lineOfOffset(text, offset) {
  return text.slice(0, offset).split('\n').length;
}

function finalizeSections(sections, totalLines) {
  return sections.map((section, index) => {
    let endLine = totalLines;
    for (let nextIndex = index + 1; nextIndex < sections.length; nextIndex += 1) {
      const candidate = sections[nextIndex];
      if (section.depth === undefined || candidate.depth === undefined || candidate.depth <= section.depth) {
        endLine = Math.max(section.line, candidate.line - 1);
        break;
      }
    }
    return { ...section, endLine };
  });
}

function markdownSections(lines) {
  const sections = [];
  let fence = null;
  lines.forEach((line, index) => {
    const fenceMatch = /^\s*(```|~~~)/.exec(line);
    if (fenceMatch) {
      fence = fence === fenceMatch[1] ? null : fence ?? fenceMatch[1];
      return;
    }
    if (fence) return;
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (match) {
      sections.push({ kind: 'heading', title: match[2], line: index + 1, depth: match[1].length });
    }
  });
  return sections;
}

function codeSections(text) {
  const patterns = [
    { kind: 'class', pattern: /(?:export\s+)?(?:default\s+)?class\s+([A-Za-z_$][\w$]*)/g },
    { kind: 'function', pattern: /(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/g },
    { kind: 'interface', pattern: /(?:export\s+)?interface\s+([A-Za-z_$][\w$]*)/g },
    { kind: 'type', pattern: /(?:export\s+)?type\s+([A-Za-z_$][\w$]*)\s*=/g },
    { kind: 'enum', pattern: /(?:export\s+)?enum\s+([A-Za-z_$][\w$]*)/g },
    { kind: 'schema', pattern: /export\s+const\s+([A-Za-z_$][\w$]*Schema)\s*=/g },
    { kind: 'export', pattern: /export\s+const\s+([A-Za-z_$][\w$]*)\s*=/g },
  ];
  const sections = [];
  for (const { kind, pattern } of patterns) {
    for (const match of text.matchAll(pattern)) {
      sections.push({ kind, title: match[1], line: lineOfOffset(text, match.index) });
    }
  }
  const testPattern = /\b(describe|it|test)\(\s*['"`]([^'"`]+)['"`]/g;
  for (const match of text.matchAll(testPattern)) {
    sections.push({ kind: match[1] === 'describe' ? 'test-suite' : 'test-case', title: match[2], line: lineOfOffset(text, match.index) });
  }
  return sections
    .sort((left, right) => left.line - right.line || left.kind.localeCompare(right.kind))
    .filter((section, index, all) => index === 0 || section.line !== all[index - 1].line || section.title !== all[index - 1].title);
}

function prismaSections(lines) {
  const sections = [];
  lines.forEach((line, index) => {
    const match = /^\s*(model|enum|generator|datasource)\s+([A-Za-z_$][\w$]*)/.exec(line);
    if (match) sections.push({ kind: match[1], title: match[2], line: index + 1 });
  });
  return sections;
}

function sqlSections(lines) {
  const sections = [];
  lines.forEach((line, index) => {
    const match = /^\s*(CREATE\s+(?:UNIQUE\s+)?(?:TABLE|INDEX)|ALTER\s+TABLE|DROP\s+(?:TABLE|INDEX))\s+(?:IF\s+(?:NOT\s+)?EXISTS\s+)?["`]?([\w.]+)/i.exec(line);
    if (match) sections.push({ kind: match[1].toLowerCase().replaceAll(/\s+/g, '-'), title: match[2], line: index + 1 });
  });
  return sections;
}

function configSections(lines, language) {
  const sections = [];
  lines.forEach((line, index) => {
    let match;
    if (language === 'toml') match = /^\s*\[+([^\]]+)\]+/.exec(line);
    if (language === 'yaml') {
      const stepMatch = /^\s*-\s+name:\s*(.+?)\s*$/.exec(line);
      const keyMatch = /^(\s*)([A-Za-z0-9_.-]+):(?:\s|$)/.exec(line);
      if (stepMatch) {
        sections.push({ kind: 'step', title: stepMatch[1], line: index + 1, depth: 3 });
        return;
      }
      if (keyMatch) {
        sections.push({ kind: 'section', title: keyMatch[2], line: index + 1, depth: Math.floor(keyMatch[1].length / 2) + 1 });
        return;
      }
    }
    if (language === 'shell') match = /^([A-Za-z_][\w]*)\s*\(\)\s*\{/.exec(line);
    if (language === 'dockerfile') match = /^\s*(FROM|RUN|COPY|ENTRYPOINT|CMD|HEALTHCHECK)\s+(.+)/i.exec(line);
    if (match) sections.push({ kind: language === 'shell' ? 'function' : 'section', title: match[1], line: index + 1 });
  });
  return sections;
}

function jsonSections(text) {
  try {
    const value = JSON.parse(text);
    if (!value || Array.isArray(value) || typeof value !== 'object') return [];
    const lines = text.split('\n');
    return Object.keys(value).flatMap((key) => {
      const expression = new RegExp(`^\\s*"${key.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')}"\\s*:`);
      const line = lines.findIndex((candidate) => expression.test(candidate));
      return line >= 0 ? [{ kind: 'key', title: key, line: line + 1 }] : [];
    });
  } catch {
    return [];
  }
}

function extractSections(text, language, path) {
  const lines = text.split('\n');
  let sections = [];
  if (language === 'markdown') sections = markdownSections(lines);
  if (['javascript', 'javascript-react', 'typescript', 'typescript-react'].includes(language)) sections = codeSections(text);
  if (language === 'prisma') sections = prismaSections(lines);
  if (language === 'sql') sections = sqlSections(lines);
  if (['dockerfile', 'shell', 'toml', 'yaml'].includes(language)) sections = configSections(lines, language);
  if (language === 'json') sections = jsonSections(text);
  if (language === 'environment') {
    sections = lines.flatMap((line, index) => {
      const match = /^([A-Za-z_][A-Za-z0-9_]*)=/.exec(line);
      return match ? [{ kind: 'environment-key', title: match[1], line: index + 1 }] : [];
    });
  }
  const rooted = [
    { kind: 'file', title: path, line: 1, depth: 0 },
    ...sections.map((section) => ({ ...section, depth: section.depth ?? 1 })),
  ];
  return finalizeSections(rooted, lines.length);
}

function extractImports(text, language) {
  if (!['javascript', 'javascript-react', 'typescript', 'typescript-react'].includes(language)) return [];
  const imports = new Set();
  const patterns = [
    /\bfrom\s+['"]([^'"]+)['"]/g,
    /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) imports.add(match[1]);
  }
  return [...imports].sort((left, right) => left.localeCompare(right));
}

function extractRoutes(text) {
  const controller = /@Controller\(\s*['"]([^'"]*)['"]\s*\)/.exec(text)?.[1] ?? null;
  const routes = [];
  const pattern = /@(Get|Post|Put|Patch|Delete)\(\s*(?:['"]([^'"]*)['"])?\s*\)/g;
  for (const match of text.matchAll(pattern)) {
    const method = match[1].toUpperCase();
    const route = [controller, match[2]].filter(Boolean).join('/').replaceAll(/\/{2,}/g, '/');
    routes.push({ method, path: `/${route}`, line: lineOfOffset(text, match.index) });
  }
  return routes;
}

function summarizeFile(path, language, sections, routes, binary) {
  if (binary) return `${language} binary asset`;
  if (routes.length > 0) return `${routes.length} HTTP route${routes.length === 1 ? '' : 's'}: ${routes.map((route) => `${route.method} ${route.path}`).join(', ')}`;
  const meaningfulSections = sections.filter((section) => section.kind !== 'file');
  if (meaningfulSections.length > 0) {
    const names = meaningfulSections.slice(0, 5).map((section) => section.title).join(', ');
    return `${meaningfulSections.length} indexed section${meaningfulSections.length === 1 ? '' : 's'}: ${names}${meaningfulSections.length > 5 ? ', …' : ''}`;
  }
  return `${language} file ${posix.basename(path)}`;
}

function resolveImport(sourcePath, importedPath, fileSet) {
  if (!importedPath.startsWith('.')) return null;
  const base = toRepoPath(normalize(join(dirname(sourcePath), importedPath)));
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.mjs`,
    `${base}.json`,
    `${base}/index.ts`,
    `${base}/index.tsx`,
    `${base}/index.js`,
  ];
  return candidates.find((candidate) => fileSet.has(candidate)) ?? null;
}

function catalogNodeIdsForPath(path, catalog) {
  return catalog.nodes
    .filter((node) => node.sources.some((pattern) => matchesGlob(path, pattern)))
    .map((node) => node.id);
}

export function buildIndex(catalog = readJson(catalogPath)) {
  const repositoryFiles = listRepositoryFiles();
  const fileSet = new Set(repositoryFiles.filter((path) => !isGeneratedPath(path)));
  const files = repositoryFiles.map((path) => {
    if (isGeneratedPath(path)) {
      const nodeIds = catalogNodeIdsForPath(path, catalog);
      return {
        id: `file:${path}`,
        path,
        language: 'generated',
        kind: 'generated',
        binary: false,
        generated: true,
        bytes: null,
        lines: null,
        sha256: null,
        summary: 'Managed output validated by deterministic re-render',
        nodeIds,
        imports: [],
        localDependencies: [],
        routes: [],
        sections: [],
      };
    }
    const absolutePath = join(rootDir, path);
    const buffer = readFileSync(absolutePath);
    const language = languageForPath(path);
    const binary = isBinary(path, buffer);
    const kind = kindForPath(path, language, binary, false);
    const text = binary ? '' : buffer.toString('utf8');
    const sections = binary ? [] : extractSections(text, language, path).map((section, index) => ({ id: `section:${path}#${index + 1}`, ...section }));
    const imports = binary ? [] : extractImports(text, language);
    const routes = binary ? [] : extractRoutes(text);
    return {
      id: `file:${path}`,
      path,
      language,
      kind,
      binary,
      generated: false,
      bytes: buffer.byteLength,
      lines: binary ? null : text.split('\n').length,
      sha256: sha256(buffer),
      summary: summarizeFile(path, language, sections, routes, binary),
      nodeIds: catalogNodeIdsForPath(path, catalog),
      imports,
      localDependencies: imports.map((entry) => resolveImport(path, entry, fileSet)).filter(Boolean),
      routes,
      sections,
      symbols: sections.filter((section) => !['file', 'heading', 'key', 'section', 'environment-key', 'step'].includes(section.kind)).map((section) => ({
        id: `symbol:${path}#${section.kind}:${section.title}:${section.line}`,
        kind: section.kind,
        name: section.title,
        line: section.line,
        endLine: section.endLine,
      })),
    };
  });
  const contentFingerprint = sha256(files.filter((file) => !file.generated).map((file) => `${file.path}:${file.sha256}`).join('\n'));
  const countBy = (values) => Object.fromEntries([...new Set(values)].sort().map((value) => [value, values.filter((entry) => entry === value).length]));
  return {
    schemaVersion: 1,
    catalogSchemaVersion: catalog.schemaVersion,
    contentFingerprint,
    coverage: {
      repositoryFiles: repositoryFiles.length,
      indexedFiles: files.length,
      binaryFiles: files.filter((file) => file.binary).length,
      filesWithSections: files.filter((file) => file.sections.length > 0).length,
      generatedManaged: repositoryFiles.filter((path) => isGeneratedPath(path)),
    },
    stats: {
      filesByKind: countBy(files.map((file) => file.kind)),
      filesByLanguage: countBy(files.map((file) => file.language)),
      filesByNode: Object.fromEntries(catalog.nodes.map((node) => [node.id, files.filter((file) => file.nodeIds.includes(node.id)).length])),
      sections: files.reduce((total, file) => total + file.sections.length, 0),
      symbols: files.reduce((total, file) => total + (file.symbols?.length ?? 0), 0),
      routes: files.reduce((total, file) => total + file.routes.length, 0),
      localRelations: files.reduce((total, file) => total + file.localDependencies.length, 0),
    },
    files,
  };
}

export function filesForNode(index, nodeId) {
  return index.files.filter((file) => file.nodeIds.includes(nodeId));
}

export function nodeById(catalog, nodeId) {
  return catalog.nodes.find((node) => node.id === nodeId) ?? null;
}

export function relatedNodeIds(catalog, selectedIds) {
  const selected = new Set(selectedIds);
  for (const id of selectedIds) {
    const node = nodeById(catalog, id);
    for (const related of [...(node?.dependsOn ?? []), ...(node?.related ?? [])]) selected.add(related);
  }
  return [...selected];
}
