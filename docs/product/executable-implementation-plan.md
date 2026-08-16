# Executable product implementation plan

Status: active execution source of truth

Last updated: 2026-08-16

This document turns the product blueprint into a dependency-ordered queue that a human team or a
coding agent can execute without reconstructing strategy from chat history. It complements
`delivery-plan.md`: that file defines product phases and gates; this file defines operational
stages, current status, handoff evidence, branch boundaries and completion checks.

## Naming boundary

Execution Stage 0 and Stage 1 below are operational setup and prototype work. They do not mean that
the product discovery programme called Stage 0 is complete. Product discovery remains open until
Decision Gate D0 is signed from participant evidence.

## Status vocabulary

- `COMPLETE`: deliverables exist and the listed checks passed.
- `READY`: dependencies are satisfied and work may start.
- `BLOCKED`: a named decision or external dependency prevents safe execution.
- `PENDING`: an earlier stage must complete first.
- `CONDITIONAL`: work starts only if its entry gate passes.
- `CONTINUOUS`: recurring operating work after release.

## Current status

| Stage | Status | Outcome |
| ---: | --- | --- |
| 0 | COMPLETE | PR #82 is merged to `main`; work continues from a fresh short-lived branch. |
| 1 | COMPLETE | Equal-fidelity research boards and six clickable prototype flows exist in canonical Figma. |
| 2 | READY | The verified A/B/H Maze study is live; recruit participants, complete the workbook and sign D0. |
| 3 | READY IN PARALLEL | Establish engineering, content and analytics baselines without encoding D0. |
| 4-11 | PENDING | Reversible product foundations and Closed Beta 1. |
| 12-19 | CONDITIONAL | Expansion, monetization, hardening and post-launch operation. |

## Dependency path

`0 → 1 → 2/D0 → 8 → 9 → 10 → 11 → 18 → 19`

Stages `3-7` may run in parallel with Stage 2 only where they remain presentation-policy neutral.
Stages `12-17` retain their own evidence gates and must not be pulled forward because they are
technically attractive.

## Mandatory execution contract

Every implementation task must:

1. use the RandoMeal knowledge workflow and read the generated context packet;
2. name the invariant, affected contract and rollback path before editing;
3. preserve unrelated work and use a short-lived `codex/*` or team-approved branch;
4. change shared contracts before providers and UI consumers;
5. use additive migrations and never rewrite an applied migration;
6. add analytics ownership and privacy treatment for new user-visible behavior;
7. run narrow affected checks before the full relevant workspace suite;
8. update the catalog and generated local Wiki after material repository changes;
9. use only the allowlisted canonical Figma file for design work;
10. avoid source-code comments and express intent through names, types and module boundaries.

## Cross-stage definition of done

A stage is complete only when its repository artifacts, tests, operational checks, rollback path
and documentation are current. A merged branch or visually complete screen is not sufficient by
itself. Product decisions require signed evidence; release decisions require current CI and
environment evidence.

## Stage 0 — Delivery baseline and branch hygiene

Status: `COMPLETE`

Objective: start product execution from an integrated, reviewable baseline.

Completed work:

- merged PR #82 containing the knowledge workflow, canonical Figma governance, Core Design System
  v1 and the DS-based mobile wireframe pass;
- fetched and verified `origin/main` at merge commit `f42255b`;
- created `codex/stage-0-1-research-prototype` from that merged mainline;
- retained short-lived branch and focused pull-request boundaries.

Exit evidence: PR #82 is present in `main`, the new branch has no missing parent changes, and the
canonical Figma guard succeeds.

Rollback: close the current branch without merging. No runtime, database or external Wiki state was
changed by this stage.

## Stage 1 — Research prototype readiness

Status: `COMPLETE`

Objective: make the H3 choice-cardinality test runnable while preserving a reversible launch
policy.

Completed work:

- created A single, B shortlist and H hybrid flows; A/B are equal-fidelity bounds and H is now the
  founder-selected hierarchical candidate;
- created C bounded feed/search control and separate D pantry-first H7 exercise;
- added safe-empty and offline recovery paths;
- added small-iPhone, representative Android and 125% large-text evidence frames;
- added moderator protocol, success/failure criteria, outcome routing and analytics ownership;
- created six top-level clickable prototype flows with valid navigation targets;
- ran design anti-slop creation review, font, touch-target, destination and placeholder audits.

Primary handoff: [`stage-0-research-prototype.md`](stage-0-research-prototype.md).

Exit evidence: 27 runner frames, 48 interactive sources, zero invalid destinations, zero
interactive targets below 44 px, zero gradients, zero placeholders, and only Fraunces and Source
Sans 3.

Rollback: delete only page `08 · Stage 0 Research Prototype` after an explicit design rollback.
Original concept, flow and P0 wireframe evidence remains untouched.

## Stage 2 — Participant research and Decision Gate D0

Status: `READY`

Objective: validate the founder-selected Hybrid interaction against the Single and Shortlist bounds,
then confirm it or record the evidence-backed replacement/pivot.

Preparation complete:

- published the live A/B/H Maze study at <https://t.maze.co/574247931>;
- connected only the canonical Figma file and configured A1/A7, B1/B6 and H1/H4 start/goal pairs;
- added identical five-point confidence and cooking-intent questions to every variant;
- added format-preference, forced-friction and open trust questions after comparison;
- disabled Clips and participant PII collection, enabled response tracking and one response per
  device;
- completed a no-tracking preview from screener through thank-you and verified `Task complete` for
  all three prototype goals.

Operational handoff: [`stage-0-maze-study.md`](stage-0-maze-study.md).

Tasks:

1. recruit 12 completed interviews in batches of three, using the locked segment quotas;
2. use Maze alternating randomized order, inspect position counts after each batch and continue
   recruitment when needed so A/B/H appears equally often in each position;
3. run C after direct-decision tasks and D as a separate H7 exercise;
4. record recent incidents before opinions, then timing, first choice, hesitation, rejection,
   forced trade-off and whether cooking would actually start;
5. enter one participant-level result per hypothesis in the workbook;
6. review all six locked thresholds without changing them after collection begins;
7. sign `GO_HYBRID` when the preferred hierarchy passes, or explicitly replace it with
   `GO_SINGLE`, `PIVOT_SHORTLIST`, another pivot or `STOP`;
8. record dissent, rejected alternatives and the evidence quality assessment.

Deliverables: completed discovery workbook, research synthesis, signed D0 record, updated product
brief and approved P0/P1/P2 scope.

Exit criteria: the arithmetic threshold and qualitative evidence review are both complete. If the
result is still ambiguous, approve a server-assigned beta experiment rather than choosing from
preference or click-through rate.

Rollback: no product rollback is needed; retain the evidence and keep presentation policy
unresolved.

## Stage 3 — Engineering, content and analytics baseline

Status: `READY IN PARALLEL`

Objective: establish trustworthy before-state evidence while Stage 2 runs.

Tasks:

1. pin Node and package-manager versions and make preflight fail on mismatch;
2. verify clean install, build, test and environment setup locally and in CI;
3. capture API/mobile performance, coverage, restore time and production topology;
4. export every dish and related record with checksum and no deletion;
5. produce duplicate, completeness, parsing, safety and coverage reports;
6. map every dish to migrate, repair, review, archive later or exclude;
7. instrument and validate the legacy recommendation funnel before navigation changes;
8. freeze legacy event definitions by schema and app version;
9. establish reproducible baseline dashboards for conversion, time, retention, crash-free users
   and latency.

Exit criteria: clean checkout is reproducible, every current dish has a disposition, and baseline
metrics can be regenerated from versioned definitions.

Rollback: baseline instrumentation is additive and may be disabled without changing existing user
behavior.

## Stage 4 — Product v2 contracts and database foundation

Status: `PENDING`

Objective: create reversible contracts and persistence that support one to three results without
encoding the D0 outcome.

Tasks:

1. split identity, profile, catalog, recommendation, interaction, analytics, entitlement and
   configuration contracts;
2. add problem-details errors, correlation headers, idempotency and contract fixtures;
3. add recommendation session, exposure and ordered result contracts, including Hybrid
   `selectionRole` and typed factual tradeoff comparisons against position 1;
4. add profiles, ingredients, taxonomy, content versions, saved, cooking, plan, entitlement,
   usage, feature config and outbox tables through additive migrations;
5. implement dry-run, restartable backfills and reconciliation reports;
6. retain legacy DTO exports and reads until mobile cutover completes.

Exit criteria: API and mobile compile against the same schemas, production-shaped migrations and
backfills pass, and legacy reads remain unchanged.

Rollback: disable v2 routes and forward-fix migrations; never drop legacy data during this stage.

## Stage 5 — Product identity and guest migration

Status: `PENDING`

Objective: preserve useful guest behavior across restart, signup, export and deletion.

Tasks:

1. add product and anonymous identities;
2. resolve `X-Anonymous-Id` on the server;
3. backfill one product identity per existing user;
4. implement transactional, idempotent and concurrency-tested guest-account merge;
5. add export/deletion workflow skeleton and auditable state transitions;
6. verify saved, recommendation and cooking ownership reconciliation.

Exit criteria: guest history survives restart and signup, duplicate merges are harmless, and
deletion/export paths are testable.

Rollback: retain the legacy user identifier adapter while the new resolver is feature-flagged.

## Stage 6 — Analytics and observability foundation

Status: `PENDING`

Objective: make every recommendation and decision traceable without making analytics a runtime
dependency.

Tasks:

1. implement the typed event registry and client/server ownership table;
2. add no-op adapters when PostHog EU or Sentry configuration is absent;
3. persist server events through the product outbox and idempotent dispatcher;
4. dual-write legacy and canonical recommendation events with shared correlation;
5. distinguish server generation from client-confirmed exposure;
6. persist presentation mode, result count, position, selection role, typed tradeoff code,
   assignment, policy and experiment version;
7. configure privacy filters, release/environment tags and dashboard definitions;
8. validate loss, duplication, ordering and schema compatibility.

Exit criteria: request, session, exposure, recommendation and event records reconcile; analytics
failure never blocks a recommendation; duplicate delivery does not duplicate metrics.

Rollback: disable adapters or dispatcher while retaining outbox data for replay.

## Stage 7 — Feature configuration and entitlement skeleton

Status: `PENDING`

Objective: control rollout and usage server-side before monetization exists.

Tasks:

1. add revisioned feature configuration and an allowlisted public endpoint;
2. add audit history and environment-safe defaults;
3. add plan and entitlement resolution;
4. implement atomic usage reserve, commit and release;
5. seed anonymous and free plans;
6. add kill switches for new modules and presentation policy.

Exit criteria: the server can disable a module and enforce concurrent limits; the client cannot
grant access to itself. Real paywalls remain disabled.

Rollback: restore the previous config revision and default all basic decision behavior to free.

## Stage 8 — Mobile platform migration

Status: `PENDING AFTER D0 FOR POLICY-SPECIFIC UI`

Objective: move the legacy Expo client onto a maintainable shell while preserving a kill-switched
legacy path.

Tasks:

1. upgrade Expo one major version at a time with build and test evidence at each step;
2. introduce Expo Router and typed route boundaries;
3. add application providers, TanStack Query, Zustand and localization foundations;
4. add API client correlation, error normalization and offline policy;
5. keep the current MVP available behind `legacy_mvp`;
6. verify iOS/Android deep links, safe areas, keyboard behavior and development builds.

Exit criteria: signed development builds run on representative iOS and Android devices; legacy
behavior remains reachable and tested.

Rollback: turn on `legacy_mvp` and ship the last compatible client build.

## Stage 9 — Mobile design system and application shell

Status: `PENDING`

Objective: implement the reviewed Figma contract in reusable React Native primitives.

Tasks:

1. map semantic color, spacing, radius, size and typography tokens into code;
2. implement Button, Icon Button, Choice Chip, Text Field, Checkbox, Switch, notices, skeletons,
   media, status panels, list rows, app bars, sheets, dialogs and product cards;
3. cover default, pressed, focused, loading, disabled, error, empty, offline and missing-media
   states;
4. implement accessibility names, roles, order, 44 px targets, large-text reflow and reduced motion;
5. build onboarding and the application shell from approved Figma nodes;
6. add component tests, visual checks and Code Connect only after matching source components exist.

Exit criteria: state, accessibility and supported-size matrices pass. No launch navigation or D0
mode is inferred from exploratory boards.

Rollback: keep new shell and components behind flags while the legacy client remains available.

## Stage 10 — Recommendation engine v1

Status: `PENDING`

Objective: deliver a deterministic, explainable and safe recommendation core without AI.

Tasks:

1. implement hard filters and elimination-reason counts;
2. implement component scoring, repeat/similarity penalties and seeded top-pool selection;
3. separate ordered ranking from versioned presentation policy;
4. persist immutable context, config, assignment, exposure ordering, score explanations and
   deterministic Hybrid tradeoff deltas against position 1;
5. add idempotent interaction writes and bounded no-result explanations;
6. execute safety, reproducibility, small-pool and latency test matrices.

Exit criteria: identical context/config/seed produces identical ranking across presentation modes;
hard constraints never weaken; P95 target passes; no AI provider is called.

Rollback: switch recommendation traffic to the legacy provider and preserve new audit records.

## Stage 11 — Core decision experience and Closed Beta 1

Status: `PENDING`

Objective: ship the D0-approved decision surface as a complete vertical slice.

Tasks:

1. build quick and advanced context filters;
2. render the founder-preferred Hybrid hierarchy from one exposure contract while preserving the
   server-assigned Single and Shortlist rollback modes;
3. implement loading, success, empty, error, offline and explanation states;
4. implement accept, another, save and basic rejection flows;
5. move personal catalog management out of the primary decision path;
6. add saved APIs/UI, guest persistence and merge coverage;
7. add Maestro first-value, replacement, recovery and save journeys;
8. validate analytics cardinality, position, selection role, tradeoff code, time-to-decision and
   cooking-start semantics;
9. verify rollback flags and supported content coverage.

Exit criteria: a guest reaches a committed meal decision in under 30 seconds in usability testing;
hard constraints are fully tested; empty-rate and decision metrics are trustworthy by presentation
mode.

Rollback: switch to legacy MVP or the prior presentation policy without changing ranking data.

## Stage 12 — Rejection, cooking and personalization v2

Status: `CONDITIONAL AFTER BETA EVIDENCE`

Objective: learn from behavior without turning one rejection into a permanent ban.

Tasks:

1. implement transient, learned, session-exclusion and permanent rejection semantics;
2. implement cooking session state and history deletion;
3. add explicit and learned preferences with evidence, confidence, decay and reset;
4. add similarity features and Engine v2 scoring;
5. expose explanations and user correction for every learned signal;
6. measure repeated cook and D7 decision outcomes.

Exit criteria: hidden dishes never return, transient rejection stays transient, learned preferences
are explainable and deletion propagates.

Rollback: disable learned weights while preserving explicit preferences and immutable evidence.

## Stage 13 — Open Beta measurement gate

Status: `CONDITIONAL`

Objective: determine whether the product creates repeated trusted decisions, not engagement noise.

Tasks:

1. pre-register decision-rate, time, D7 and safety guardrails;
2. validate event quality and denominator definitions;
3. segment results by presentation mode, ICP, constraints and content coverage;
4. review empty, regeneration, rejection and abandonment drivers;
5. decide continue, narrow, change policy or stop.

Exit criteria: trustworthy dashboards can evaluate the registered targets and no card-click proxy
is substituted for a meal decision.

Rollback: pause acquisition and retain the beta cohort for diagnosis.

## Stage 14 — AI recipe adaptation

Status: `CONDITIONAL ON H6 OR MEASURED FAKE-DOOR DEMAND`

Objective: rescue verified-recipe near misses without making model output the source of truth.

Tasks:

1. add provider interface, prompt registry and versioned asynchronous jobs;
2. snapshot the immutable base recipe and create a separate structured variant;
3. validate schema, units, hard constraints, coherence and nutrition from structured ingredients;
4. add bounded repair, fallback, cache, cost and usage accounting;
5. build preset/free-prompt, diff, warning, retry and accept/save UI;
6. run versioned AI evaluation and human culinary/safety review.

Exit criteria: base recipe is immutable, backend validation is mandatory, the user sees a diff,
safety/schema rejection and cost per accepted result are known.

Rollback: disable the provider and return to canonical recipes without data loss.

## Stage 15 — Manual Pantry

Status: `CONDITIONAL ON H7`

Objective: ship Pantry only if repeated value exceeds setup and maintenance cost.

Tasks:

1. implement ingredient search, recent/frequent items and deletion;
2. keep quantity and expiry optional;
3. implement strict and flexible match semantics;
4. expose coverage and missing/optional ingredients;
5. feed coverage into scoring and explanations;
6. verify identity merge, export and deletion behavior.

Exit criteria: strict mode never recommends a missing required ingredient; all pantry items are
user-confirmed; adoption and recommendation lift are measurable.

Rollback: disable Pantry scoring and retain user data for export/deletion only.

## Stage 16 — Photo recognition

Status: `CONDITIONAL ON PANTRY RETENTION AND PRIVACY APPROVAL`

Objective: reduce Pantry input cost without silently adding uncertain items.

Tasks:

1. approve DPIA, retention, deletion and permission copy;
2. add signed upload, compression and progress;
3. implement asynchronous recognition with confidence;
4. require confirmation or correction before adding items;
5. add limits, abuse controls, accuracy and correction analytics;
6. retain manual fallback.

Exit criteria: nothing is added without confirmation, deletion is auditable, and repeated use and
correction rate are known.

Rollback: disable uploads and recognition while manual Pantry remains available.

## Stage 17 — Subscription validation and implementation

Status: `CONDITIONAL ON RETENTION, PREMIUM VALUE AND UNIT ECONOMICS`

Objective: monetize automation without removing basic safe decision value.

Tasks:

1. validate demand with retained users and fake doors;
2. configure store products and RevenueCat only after the gate passes;
3. implement signed webhooks and reconciliation;
4. cover purchase, trial, restore, grace, cancel, refund and expiry;
5. place paywalls after a demonstrated value moment;
6. run sandbox and offline-state matrices.

Exit criteria: backend entitlement matches store state, restore works, expiry does not delete data,
and basic safe recommendation remains free.

Rollback: disable paid offerings and resolve all users to the free plan without deleting data.

## Stage 18 — Production hardening and store release

Status: `PENDING`

Objective: release a secure, observable and rollback-safe product.

Tasks:

1. complete migration restore and forward-fix rehearsals;
2. run contract, integration, Testcontainers, Maestro, accessibility, k6 and ZAP suites;
3. verify SLOs, alerts, runbooks, backups, retention and incident ownership;
4. complete privacy, export/deletion and store disclosure reviews;
5. build signed release candidates and execute staged rollout;
6. verify kill switches, config rollback and previous-client compatibility.

Exit criteria: current CI and environment evidence passes every release gate; on-call can detect,
diagnose and roll back critical paths.

Rollback: stop rollout, restore the prior client/API/config versions and forward-fix data.

## Stage 19 — Product operating loop

Status: `CONTINUOUS AFTER RELEASE`

Objective: operate RandoMeal as a measurable decision product.

Recurring work:

1. review decision rate, P50/P75 time, abandonment, empty, rejection, safety, latency and crashes;
2. reconcile event delivery and content coverage;
3. review recommendation explanations and hard-filter incidents;
4. audit learned preferences, model evaluations and cost where applicable;
5. prioritize only evidence-backed improvements;
6. update architecture records, the executable plan and rollback runbooks after material change.

Exit criteria: none; this is the permanent product and engineering cadence.

## Reuse, refactor and rewrite boundary

Reuse:

- TypeScript npm workspaces, NestJS, Prisma and PostgreSQL;
- existing API health/auth/catalog foundations that satisfy new boundaries;
- shared contract packaging and current test harnesses;
- canonical recipes and ownership after audit;
- Core Design System v1 tokens, components and Figma artifacts.

Refactor:

- identity into explicit product and anonymous identities;
- recommendation generation into ranking plus presentation policy;
- analytics into typed client/server ownership with outbox delivery;
- mobile data access into query, state and route boundaries;
- legacy catalog management out of the primary decision path.

Rewrite behind flags:

- the legacy random-result mobile flow;
- presentation-specific recommendation UI;
- any cross-module data access that bypasses public application boundaries;
- fragile or unverifiable event semantics.

Do not rewrite stable infrastructure merely to match a preferred style. Replace only when the
migration audit, contract or acceptance gate demonstrates that refactoring cannot preserve the
required behavior safely.

## Standard task handoff template

Every stage task or agent handoff should include:

- objective and linked stage;
- selected knowledge nodes and authoritative source paths;
- current, target and legacy classification;
- affected contracts, tables, routes, events and Figma nodes;
- invariant and failure behavior;
- implementation steps in dependency order;
- narrow tests, full checks and manual verification;
- feature flag, migration and rollback procedure;
- documentation and catalog updates;
- unresolved decision requiring human approval.
