# General Rules for AI Coding Agents
This page defines the mandatory baseline for every current and future project in this workspace. Project-specific rules may specialize or strengthen it, but they must not weaken quality, truthfulness, security, or knowledge-maintenance requirements.
## Cross-Project Source Hierarchy
1. Read this shared baseline before planning or writing code in any project.
2. Then read the project's repository instructions, canonical knowledge sources, and narrow project Wiki for product facts, implementation details, technical contracts, approved specializations, and recorded contradictions.
3. General AI Wiki governs cross-project planning, coding quality, verification, knowledge maintenance, safety, change control, and definition of done. Project sources govern project facts and shipped behavior.
4. Project rules may strengthen or specialize this baseline, but they must not silently weaken a shared guarantee.
5. When shared and project authorities genuinely conflict, stop, record the contradiction in the project knowledge system, and reconcile both sources before implementation.
## Shared-Baseline Change Synchronization
- A principle-level change affects evidence, planning, coding quality, verification, knowledge maintenance, safety, change control, or definition-of-done rules across projects.
- Product behavior, architecture, contracts, dependencies, migrations, operational details, and project exceptions remain in the narrow project Wiki unless they establish a reusable cross-project principle.
- External Wiki synchronization is opt-in. Routine planning, local indexing, commits, and pull-request work must not contact or write Notion unless the user explicitly requests synchronization or an operator invokes a dedicated sync command.
- Prepare principle-level changes in the verified local snapshot. Publish only the bounded policy section through an explicit targeted General Wiki update; preserve the page title, Local Wikis section, child pages, and unrelated content.
- Fetch immediately before an explicit write and compare the policy-body and complete fetch hashes with the initiating project's last verified state. Stop on a concurrent edit instead of overwriting it.
- Fetch immediately after an explicit write, verify the intended policy-body and complete fetch hashes, and record the proof in the initiating project's sync state.
- An external mirror is required for a task only when the user explicitly requests it or a dedicated synchronization command is invoked. No automatic per-commit or per-pull-request synchronization is enabled; decide that policy separately before adding automation.
## Evidence Before Action
- Read the repository-level instructions, relevant Wiki pages, and matching knowledge-graph nodes before changing code.
- Use selective reading: inspect the rules, source ranges, dependencies, and tests relevant to the task before expanding to a repository-wide search.
- Base decisions on current code, configuration, tests, and canonical documentation. When sources conflict, verify the implementation and explicitly distinguish current, target, proposed, and superseded states.
- When authoritative sources conflict and the project does not define precedence, do not choose the most convenient interpretation. Record the conflict and request a decision.
- Never invent files, APIs, behavior, test results, completed actions, or statuses. If something is unknown, state what is unknown and what evidence is missing.
- Do not implement a target-state plan as if it were current behavior unless the task explicitly authorizes that change.
- Never silently reduce the requested scope, replace a requirement with an easier substitute, or report a partial result as complete.
## Minimal and Focused Code
- Change only what is required for the task. Preserve unrelated and user-owned work.
- Reuse existing modules, dependencies, conventions, and patterns before introducing anything new.
- Do not add a dependency, framework, architectural layer, abstraction, or feature without a demonstrated need.
- Solve the task with the fewest reasonable lines while preserving clarity, correctness, and testability. Do not use code golf or hidden magic.
- Keep functions and modules small and focused, with low complexity and shallow nesting. Use precise domain names.
- Do not add source-code comments, TODO, FIXME, commented-out code, or implementation-narrating blocks. Code must explain itself through names and structure.
## Anti-Slop Standard
- Remove generic AI slop: unnecessary wrappers, premature abstractions, duplication, decorative complexity, vague names, repetitive prose, obvious explanations, and unsupported claims.
- Do not add silent fallbacks or defensive branches that hide errors or change behavior without evidence.
- Code, documentation, and interfaces must be specific to the product and task rather than resemble a reusable AI template.
- User-facing work must follow the project's canonical design system, tokens, and approved decisions. Do not introduce arbitrary AI-style visual clichés.
## Verification and Reverification
- Support every behavior change with focused tests. Run narrow checks first, then the complete relevant suite based on the change's blast radius.
- Every bug fix must include a regression test that would fail before the fix and pass after it whenever the behavior can be tested.
- Before completion, run the project's formatter, linters, Ruff or ESLint, type checks, tests, build, security checks, and knowledge checks as applicable.
- After the final edit, review the complete diff and rerun the affected lint, Ruff, type, and test checks.
- Do not disable rules, weaken gates, suppress errors, or update snapshots only to obtain a green result. Fix the underlying cause.
- Never claim a check passed without an actual successful result. If a check cannot run, state exactly what was not verified and why.
## Wiki and Knowledge Graph
- English is the default language for every project and all project artifacts. Use another language within a project only when the user explicitly requests it.
- All Wiki pages and agent-facing documentation must therefore be written in English unless the user explicitly requests another language.
- Treat the repository-local knowledge system as the source of truth and external Wikis as verified mirrors unless a project explicitly defines another canonical source.
- After changes to structure, public contracts, data, user flows, CI, or documented behavior, update the local Wiki, catalog, routing index, file inventory, and knowledge graph as applicable.
- Synchronize every required external Wiki mirror and verify the written content by reading it back before reporting success.
- If synchronization is blocked by missing access or credentials, complete all available local updates and report the unsynchronized state explicitly.
- Documentation must clearly separate current behavior, target behavior, proposals, assumptions, and superseded information.
## Safety and Change Control
- Do not work directly on protected branches. Use the project's branch and review workflow.
- Never merge, rebase, force-push, weaken branch protection, bypass approvals, or perform another high-risk action without explicit authorization.
- Protect secrets, permissions, user data, and existing unfinished work. Use the least privilege required for external actions and verify their results.
- If uncertainty could materially change scope, security, data, public behavior, or an irreversible action, stop and request clarification. Otherwise make the smallest reversible assumption and label it.
- Changes to data, schemas, configuration, or external state must be reversible or include a clear, verified recovery plan.
## Definition of Done
A task is complete only when all applicable conditions are true:
- The requested scope is delivered with no unrelated changes.
- The final diff has been self-reviewed for correctness, simplicity, security, and accidental edits.
- Required checks pass after the final changes, including lint or Ruff and the relevant tests.
- Behavior changes have adequate tests and known failures are not hidden.
- The Wiki, catalog, indexes, and knowledge graph are current.
- Required external Wiki mirrors are synchronized and read-back verified, or the exact blocker is reported.
- The handoff states what changed, what was actually verified, what was not verified, and what risks or limitations remain.
