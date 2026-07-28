# Canonical Figma file governance

Deny-by-default project governance allowing all RandoMeal design operations only in one canonical Figma file.

Status: **current**
Authority: **canonical**

## Rules and patterns

- The only authorized RandoMeal Figma file key is DP7ujNqthXzWwwu1mnFhfj.
- Run npm run figma:guard with the target file key before every Figma MCP read or write.
- Deny every Figma project operation whose file key differs from the canonical allowlist.
- Do not create or adopt another project Figma file without explicit user approval and an atomic governance, catalog, Wiki, and integration migration.
- CI rejects repository URLs and explicit file-key declarations for non-canonical Figma design, FigJam, Slides, or legacy files.
- The canonical file contains Foundation v1 with five collections, 78 variables, ten text styles, two elevation styles, and variable-bound documentation.

## Source coverage

- `.agents/skills/design-anti-slop/SKILL.md` — 7 indexed sections: Design anti-slop for RandoMeal, Приоритет источников, Режимы, Обязательный workflow, Интерпретация каталога в мобильном продукте, …. Sections: .agents/skills/design-anti-slop/SKILL.md (L1–100); Design anti-slop for RandoMeal (L6–100); Приоритет источников (L11–23); Режимы (L24–32); Обязательный workflow (L33–59); Интерпретация каталога в мобильном продукте (L60–71); Figma и реализация (L72–82); Формат аудита (L83–100)
- `.github/workflows/ci.yml` — 114 indexed sections: name, on, pull_request, branches, push, …. Sections: .github/workflows/ci.yml (L1–164); name (L1–2); on (L3–8); pull_request (L4–5); branches (L5–5); push (L6–8); branches (L7–8); jobs (L9–164)
- `AGENTS.md` — 5 indexed sections: RandoMeal agent instructions, Mandatory knowledge workflow, Mandatory design workflow, Repository safety, Source code comments. Sections: AGENTS.md (L1–67); RandoMeal agent instructions (L1–67); Mandatory knowledge workflow (L3–29); Mandatory design workflow (L30–53); Repository safety (L54–59); Source code comments (L60–67)
- `design/figma-project.json` — 6 indexed sections: schemaVersion, project, policy, file, allowedFileKeys, …. Sections: design/figma-project.json (L1–19); schemaVersion (L2–2); project (L3–3); policy (L4–4); file (L5–9); allowedFileKeys (L10–12); operations (L13–19)
- `design/foundations.tokens.json` — 8 indexed sections: schemaVersion, system, version, figmaFileKey, colorMode, …. Sections: design/foundations.tokens.json (L1–1020); schemaVersion (L2–2); system (L3–3); version (L4–4); figmaFileKey (L5–5); colorMode (L6–6); typography (L7–100); effectStyles (L101–128)
- `docs/product/figma-governance.md` — 4 indexed sections: Canonical Figma file governance, Canonical project file, Deny-by-default rules, Ownership and handoff. Sections: docs/product/figma-governance.md (L1–42); Canonical Figma file governance (L1–42); Canonical project file (L3–15); Deny-by-default rules (L16–36); Ownership and handoff (L37–42)
- `package.json` — 8 indexed sections: name, private, version, engines, packageManager, …. Sections: package.json (L1–57); name (L2–2); private (L3–3); version (L4–4); engines (L5–7); packageManager (L8–8); workspaces (L9–12); scripts (L13–50)
- `scripts/check-figma-governance.mjs` — 1 indexed section: fail. Sections: scripts/check-figma-governance.mjs (L1–107); fail (L14–107)

## Graph relations

- Depends on: [Agent governance](RandoMeal--Governance--Agents), [Design system and product quality](RandoMeal--Design--System-and-Quality), [Knowledge system](RandoMeal--Governance--Knowledge-System)
- Related: [Workspace runtime and tooling](RandoMeal--Tooling--Workspace), [Current mobile theme and visual debt](RandoMeal--Mobile--Theme-Debt)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`figma` · `design governance` · `allowlist` · `file key` · `mcp` · `фигма` · `дизайн` · `ограничения`
