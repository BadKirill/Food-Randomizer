# RandoMeal agent instructions

## Mandatory knowledge workflow

- For every code change, code review, architecture, database, API, mobile, analytics, QA,
  infrastructure, agent-rule, product-document, or design task, use the repo skill
  `$randomeal-knowledge` from `.agents/skills/randomeal-knowledge/SKILL.md` before taking action.
- For code-change requests, use the read-only project custom agent `knowledge-retriever` when custom
  agents are available. It must query the catalog and return the relevant rules, source ranges,
  contracts, database effects, and narrow tests before implementation. If custom agents are not
  available, follow the same selective retrieval workflow in the current agent.
- Read `knowledge/catalog.json` and the generated context packet first. Select no more than seven
  relevant nodes; broad repository reading is allowed only when the packet is empty, stale, or
  contradictory.
- Before a material change, verify the connected Notion workspace and the `Food-Randomizer Wiki`
  root from `knowledge/wiki-manifest.json`. Read the managed Notion pages mapped to the selected
  nodes in `knowledge/wiki-sync-state.json`, compare their source and body hashes, and report any
  divergence before implementation. A missing initial mirror is valid only during bootstrap.
- After every material repository change, update affected catalog facts, run
  `npm run knowledge:update`, then run `npm run knowledge:check` before external synchronization.
- Mirror changed managed pages only through the Notion MCP configured in
  `knowledge/wiki-manifest.json`. Fetch every page immediately before writing, preserve unmanaged
  pages and manual content, read each write back, verify its managed body hash, update
  `knowledge/wiki-sync-state.json`, then run `npm run knowledge:notion:check` before handoff.
- Do not mark a material change complete while the Notion mirror is stale or unverified. If the
  connector is unavailable or remote content diverged, report the exact blocker and leave the task
  incomplete. Never substitute browser automation, direct Notion API scripts, GitHub Wiki, `git`
  operations, or an unverified success claim for native Notion MCP synchronization.

## Mandatory design workflow

- For every task that creates, reviews, or changes user-facing UI, Figma files, screenshots,
  design tokens, component libraries, React Native/Expo UI, or web/admin UI, use the repo skill
  `$design-anti-slop` from `.agents/skills/design-anti-slop/SKILL.md` before taking design action.
- Use only the canonical Figma file declared in `design/figma-project.json`:
  `https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj`. Its file key
  `DP7ujNqthXzWwwu1mnFhfj` is the sole allowlisted key for every Figma MCP read, write, export,
  screenshot, variable, component, prototype, library, Code Connect, and design-to-code operation.
- Before every Figma MCP operation, run
  `npm run figma:guard -- --file-key DP7ujNqthXzWwwu1mnFhfj`. Stop when any requested, discovered,
  linked, or tool-returned file key differs. Do not inspect, modify, export from, or use another
  Figma file as a project source, fallback, staging area, or handoff.
- Do not call Figma `create_new_file` for this project while the manifest disables it. Replacing the
  canonical file requires explicit user approval and an atomic update to the manifest, AGENTS.md,
  catalog, generated Wiki, verified Notion mirror, and affected integrations.
- Treat `docs/product/discovery-decisions.md` and `docs/product/quality-and-design.md` as product and
  design constraints. The anti-slop catalog cannot override safety, accessibility, signed discovery
  decisions, project tokens, or an explicit user-approved brand choice.
- New design work must run the skill's `creation review` before handoff. Existing design changes
  start with `audit` unless the user explicitly authorizes immediate fixes.
- Keep Figma and code aligned through semantic tokens, shared component contracts, complete states,
  and verification screenshots/tests.

## Repository safety

- Preserve unrelated work in a dirty worktree.
- Use additive database migrations and never rewrite an applied migration.
- Run the narrow affected tests before the full relevant workspace checks.

## Source code comments

- Do not add comments to source code. This includes inline comments, block comments, explanatory
  comments, TODO/FIXME notes, commented-out code, and comments describing what the generated code
  does.
- Express intent through names, types, module boundaries, and small functions instead.
- Preserve pre-existing human-authored comments unless the requested change makes them obsolete.
