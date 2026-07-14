# RandoMeal agent instructions

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
