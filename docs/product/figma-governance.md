# Canonical Figma file governance

## Canonical project file

RandoMeal has exactly one authorized Figma design file:

- Name: `RandoMeal — Canonical Product Design`
- File key: `DP7ujNqthXzWwwu1mnFhfj`
- URL: [Open the canonical RandoMeal design](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj)
- Machine-readable authority: `design/figma-project.json`

This file is the only permitted target for project design work, including MCP reads and writes,
variables, styles, components, screens, prototypes, screenshots, exports, library generation,
Code Connect and design-to-code inspection.

## Deny-by-default rules

1. Run the repository guard with the target file key before every Figma MCP operation.
2. Stop when a requested, discovered or tool-returned file key differs from the canonical key.
3. Do not create another Figma file for RandoMeal while `allowCreateNewFile` is `false`.
4. Do not copy project work into personal drafts, temporary design files, FigJam boards or Slides.
5. Do not use another Figma file as a project source of truth, fallback, staging area or handoff.
6. Repository Figma URLs and explicit Figma file-key declarations must resolve to the canonical key.
7. A replacement requires explicit user approval and one atomic governance migration updating the
   manifest, AGENTS.md, catalog, generated Wiki, Notion mirror and affected integrations.

Use:

```sh
npm run figma:guard -- --file-key DP7ujNqthXzWwwu1mnFhfj
```

The repository and CI guard cannot change Figma account permissions or prevent a human from opening
other files. It enforces the project contract for agents, repository references and automated
workflows. Connector-level per-file access controls are not available.

## Ownership and handoff

All product design artifacts live in the canonical file. Repository token exports remain reviewed
implementation inputs, but they do not authorize a second design source. Every design handoff must
include the canonical file URL and must not link an alternative Figma document.
