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
- After every material repository change, update affected catalog facts, run
  `npm run knowledge:update`, then run `npm run knowledge:check` before handoff.
- Mirror changed managed Wiki pages only through an MCP with explicit native GitHub Wiki page
  list/read/create/update and post-write verification tools. If the repository Wiki is disabled or
  those tools are unavailable, report external sync as blocked. Never substitute `git push`, `gh`,
  ordinary repository content tools, browser automation, or an unverified success claim.

## Mandatory design workflow

- For every task that creates, reviews, or changes user-facing UI, Figma files, screenshots,
  design tokens, component libraries, React Native/Expo UI, or web/admin UI, use the repo skill
  `$design-anti-slop` from `.agents/skills/design-anti-slop/SKILL.md` before taking design action.
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
