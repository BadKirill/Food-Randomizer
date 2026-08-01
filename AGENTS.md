# RandoMeal agent instructions

## Mandatory knowledge workflow

- For every code change, code review, architecture, database, API, mobile, analytics, QA,
  infrastructure, agent-rule, product-document, or design task, use the repo skill
  `$randomeal-knowledge` from `.agents/skills/randomeal-knowledge/SKILL.md` before taking action.
- Before planning or writing code, read the verified local General Wiki snapshot at
  `knowledge/general-ai-baseline.md`. It governs cross-project planning, coding quality,
  verification, knowledge maintenance, safety, and completion standards. Then use the repository
  catalog and generated local project Wiki for RandoMeal facts, refinements, documented
  contradictions, approved specializations, and technical contracts. Project guidance may
  strengthen or specialize the shared baseline but must not silently weaken it.
- For code-change requests, use the read-only project custom agent `knowledge-retriever` when custom
  agents are available. It must query the catalog and return the relevant rules, source ranges,
  contracts, database effects, and narrow tests before implementation. If custom agents are not
  available, follow the same selective retrieval workflow in the current agent.
- Read `knowledge/catalog.json` and the generated context packet first. Select no more than seven
  relevant nodes; broad repository reading is allowed only when the packet is empty, stale, or
  contradictory.
- Ordinary `knowledge:index`, `knowledge:render`, `knowledge:update`, `knowledge:query`, and
  `knowledge:check` workflows are local-only and must not read or write Notion.
- Read or change the external `General AI Wiki` or `Food-Randomizer Wiki` only when the user
  explicitly requests external Wiki work or an operator invokes a dedicated synchronization
  workflow. Never infer external access from an ordinary code, documentation, commit, or pull
  request task.
- After every material repository change, update affected catalog facts, run
  `npm run knowledge:update`, then run `npm run knowledge:check`. External synchronization is not
  part of the ordinary local completion path.
- When external Wiki synchronization is explicitly requested or separately invoked, use only the
  Notion MCP targets in `knowledge/wiki-manifest.json`. Fetch immediately before every write,
  preserve unmanaged pages and manual content, read every write back, verify the bounded General
  policy or managed project body hashes, update `knowledge/wiki-sync-state.json`, and run
  `npm run knowledge:notion:check` before reporting external synchronization success.
- No automatic external Wiki read, write, or freshness gate is enabled for commits or pull
  requests. Any future commit/PR automation requires a separate, explicit policy decision.
- Never substitute browser automation, direct Notion API scripts, GitHub Wiki, `git` operations, or
  an unverified success claim for native Notion MCP synchronization.

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
  catalog, generated local Wiki, and affected integrations. Update the external Notion mirror only
  through an explicitly invoked synchronization workflow.
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
