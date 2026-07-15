# Dependency-ordered delivery plan

This backlog is intended to be executable by the current team or another coding model. Work in
order. Do not start a later phase until its entry dependencies are satisfied. Each change uses a
short-lived branch, focused migration and rollback-safe feature flag.

## Operating rules for implementers

Before every task:

1. read this blueprint, the PRD and affected existing tests;
2. inspect `git status` and preserve unrelated work;
3. state the invariant and rollback path;
4. add/modify contracts before providers and UI;
5. use additive migrations and never rewrite applied SQL;
6. run the narrow tests, then the full affected workspace suite;
7. update tracking/architecture documentation when semantics change.

Do not introduce microservices, ML ranking, real payments, photo recognition or social features
before their phase exit criteria.

## Phase 0 - decisions, discovery and baseline (2-3 weeks)

Run discovery, engineering baseline and content export in parallel. No Phase 2 recommendation UX
may be approved until Decision Gate D0 is signed. Reversible Phase 1 foundations may begin only if
they do not encode a choice-model outcome.

### P0-01 Product discovery and choice-model gate

- Complete 12 interviews in batches of three; add up to three only if evidence is unstable.
- Include two contrast users and at least six who recently used a recipe/AI alternative.
- Log exact evidence and one participant-level result per H1-H10 in the supplied workbook.
- Compare equal-fidelity, randomized A (one + Another) and B (shortlist 2-3) concepts.
- Test feed/search as the H3 control and Pantry-first separately as H7; do not combine them.
- Run the current MVP task protocol and record completion, time, misclicks and severity.
- Produce Product Brief, chosen ICP/JTBD, value proposition, trust requirements and provisional
  P0/P1/P2 scope.

Acceptance: evidence quality is reviewed; all six locked scorecard thresholds are completed; the
team signs one outcome: `GO_SINGLE`, `GO_HYBRID`, `PIVOT_SHORTLIST`, another explicit pivot, or
`STOP`. The decision record includes dissent and rejected alternatives.

### P0-02 Engineering baseline

- Pin Node/package manager; document setup and make `preflight` fail on wrong versions.
- Add CODEOWNERS, PR template, protected branch checks and dependency update policy.
- Capture current API/mobile performance, test coverage, production topology and restore time.
- Configure separate dev/stage/prod environments and no-production-data test fixtures.

Acceptance: clean checkout installs, builds and tests from documented commands in CI and locally.

### P0-03 Content audit

- Export all dishes and related records with backup checksum.
- Generate duplicate, completeness, parsing, safety and coverage reports.
- Define canonical ingredient/unit/taxonomy dictionaries and human review workflow.

Acceptance: every current dish has a migration disposition; the workbook contains actual export
data; every proposed beta coverage cell is Healthy/Strong and meets its 8/10 target minimum, or is
explicitly removed from launch scope; no data is deleted.

### P0-04 Analytics baseline

- Instrument or verify current MVP events before navigation changes.
- Freeze event definitions by schema/app version and measure event loss/duplication.
- Establish current pick-to-recipe-open conversion, time-to-open, repeat behavior, crash-free users
  and recommendation/API latency.
- Document canonical mapping for legacy `pick_tapped`, `pick_again_tapped`, diet-filter, Random and
  Manage events.

Acceptance: a versioned baseline dashboard is reproducible; instrumentation QA passes; no redesign
metric depends on an event that did not exist in the baseline.

### Decision Gate D0

- `GO_SINGLE`: Phase 2 launches single, while backend/contracts retain 1-3 result support.
- `GO_HYBRID`: Phase 2 launches a primary result with optional visible alternatives.
- `PIVOT_SHORTLIST`: Phase 2 launches two or three ranked results, not an unbounded feed.
- Other pivot: rewrite the affected scope/order and approve an ADR before Phase 1 proceeds beyond
  generic foundations.
- `STOP`: stop product build and preserve only research/baseline assets.

## Phase 1 - data, analytics and monetization foundation (2-3 weeks)

### P1-01 V2 contracts and API conventions

- Split contracts by identity, profile, catalog, recommendation, interaction, analytics,
  entitlement and config.
- Add problem details, correlation headers, idempotency semantics and contract fixtures.
- Model a recommendation exposure with server-owned `single`, `shortlist` or `hybrid` policy,
  one to three ordered results and stable experiment assignment.
- Keep legacy DTO exports until mobile migration completes.

Acceptance: API and mobile compile against the same v2 schemas; compatibility tests pass.

### P1-02 Identity and guest migration

- Add ProductIdentity and AnonymousIdentity tables.
- Add `X-Anonymous-Id` middleware and identity resolver.
- Backfill one identity per existing user; implement transactional guest-account merge.
- Add deletion/export workflow skeleton and audit logs.

Acceptance: guest history survives restart and signup; merge is idempotent and concurrency-tested.

### P1-03 Product schema expansion

- Add profiles, ingredient catalog, dish metadata/taxonomy, recommendation session/exposure/result,
  interaction, saved, cooking, plan, entitlement, usage, feature config and event/outbox tables.
- Add publish policy and all uniqueness/index/check constraints.
- Create dry-run/restartable backfills and reconciliation report.

Acceptance: production-shaped migration succeeds; legacy reads remain unchanged; all user recipes
and ownership relationships reconcile exactly.

### P1-04 Analytics and observability

- Add typed event registry and no-op adapters for missing configuration.
- Install PostHog EU client/server and Sentry mobile/API with privacy filters.
- Add product event/outbox dispatcher, release/environment tags and dashboard definitions.
- Dual-write current Random outcomes to canonical recommendation events with shared correlation,
  while keeping legacy baseline names queryable by app/schema version.
- Distinguish server generation from client-confirmed exposure; persist presentation mode, result
  count, positions and assignment on all choice-model events.

Acceptance: every current recommendation is traceable by request/session/recommendation/event;
analytics failure never blocks recommendation; duplicate delivery does not duplicate metrics.

### P1-05 Feature config and entitlement skeleton

- Add server config revisions, allowlisted public config endpoint and audit trail.
- Add plan/entitlement resolution and atomic usage reservation/commit/release.
- Seed `anonymous` and `free` plans; real paywall remains disabled.

Acceptance: server can remotely disable new modules and alter bounded scoring/limits; client cannot
grant itself access or bypass a concurrent limit.

Phase exit: current MVP still works, all recommendations are logged, entitlement APIs work, and
catalog migration completeness is measurable.

## Phase 2 - new core UX and recommendation engine v1 (3-5 weeks)

### P2-01 Mobile platform migration

- Upgrade Expo one major at a time with tests/build after each step.
- Introduce Expo Router, app providers, TanStack Query, Zustand, i18n and shared UI foundations.
- Keep legacy app accessible behind `legacy_mvp`; add kill switches and deep-link tests.

Acceptance: signed development builds work on iOS/Android; legacy behavior and tests pass.

### P2-02 Design system and shell

- Implement tokens, Button, Chip, Card, Input, Sheet, Modal, Skeleton, Empty/Error/Offline states,
  image fallback and accessible navigation.
- Build onboarding and Home from approved Figma specs.
- Build single, shortlist and optional hybrid recommendation compositions from the same card
  primitives; activate only the D0-approved mode.

Acceptance: component/state/accessibility checklist passes at supported sizes and font scales.

### P2-03 Recommendation engine v1

- Implement hard-filter policies with elimination reason counts.
- Implement component scoring, repeat/similarity penalties and seeded ordered top-pool selection.
- Separate ranking from versioned presentation policy; persist immutable session, exposure,
  context/config/assignment/score explanation and idempotent interactions.
- Add small-pool/no-result explanations without ever weakening hard constraints.

Acceptance: invariant matrix passes; the same context/config/seed has identical hard-filter and
score results across presentation modes; exposure ordering is reproducible; P95 server target is
met; AI is not called.

### P2-04 Recommendation experience

- Build quick/advanced filters, loading/success/empty/error screens and explanation.
- Add Cook this, Another option, Save and basic Not for me.
- Render the D0-approved single/shortlist/hybrid surface from one exposure contract; use server
  assignment and kill switch, never a client-selected result count.
- Move Manage to Saved -> My recipes; keep common catalog editing out of primary navigation.

Acceptance: guest reaches a committed meal decision in <30 seconds in usability test; exposure
cardinality and position analytics are correct; retry and offline states are bounded.

### P2-05 Favorites and beta readiness

- Add saved APIs/UI and guest persistence/account merge.
- Add Maestro first-value and save journeys; instrument complete funnel.
- Content reviewers approve coverage for supported beta combinations.

Phase exit / Closed Beta 1: 100% tested hard constraints, <2% empty target measurable, exposure
depth/position, regeneration and time-to-decision measurable by presentation mode, rollback flag
verified.

## Phase 3 - feedback and personalization v2 (3-4 weeks)

- Implement rejection reason semantics: transient, learned weight, session exclusion, permanent.
- Add cooking session state machine, history deletion and repeated-cook signal.
- Add explicit and learned preferences with evidence, confidence, decay and user correction/reset.
- Add similarity features (primary ingredient, cuisine, meal form) and Engine v2 scoring.
- Add fake doors for photo scan, family profile and weekly planning.

Acceptance: transient rejection never creates a permanent ban; hidden dish never returns; every
learned preference is explainable/correctable; history deletion propagates.

Phase exit / Open Beta: the pre-registered session decision-rate target and D7 target can be
evaluated from trustworthy dashboards by presentation mode. Do not substitute card clicks for a
meal decision.

## Phase 4 - AI adaptation (3-5 weeks)

Entry gate: H6 has concrete near-miss recovery evidence from Stage 0 or a measured fake door. A
general statement that AI sounds useful is insufficient.

- Add provider interface implementation, prompt registry/versioning and asynchronous job state.
- Snapshot base recipe version; produce a separate structured RecipeVariant.
- Validate JSON, units, hard constraints and recipe coherence; calculate nutrition from ingredient
  data, never model prose.
- Add bounded repair/fallback, deduplicated cache, cost/tokens/latency and usage accounting.
- Build action presets, free prompt, diff preview, warnings, retry and accept/save flows.
- Run versioned AI evaluation and human culinary/safety review.

Acceptance: original is immutable; backend validation and entitlement are mandatory; user sees a
diff; schema/safety rejection <5% beta hypothesis; cost per successful accepted variant is known.

## Phase 5 - manual Pantry (2-3 weeks)

Entry gate: H7 shows that repeated Pantry value exceeds setup/maintenance effort. If Decision Gate
D0 is `PIVOT_PANTRY`, stop and re-plan the core sequence via ADR instead of silently treating this
later phase as the new P0.

- Implement ingredient search, recent/frequent items, quantities/expiry optional and deletion.
- Implement strict and flexible matching, coverage percentage and missing/optional lists.
- Feed Pantry coverage into scoring and explanations.
- Keep manual Pantry free for beta; measure adoption and recommendation lift.

Acceptance: strict mode never proposes a missing required ingredient; every item is user-confirmed;
Pantry data merges/deletes correctly.

## Phase 6 - photo recognition (4-6 weeks)

- Complete photo DPIA/privacy/retention policy and signed upload pipeline.
- Add camera/library permissions, compression, upload progress and deletion.
- Implement async recognition with confidence, confirmation/correction and no auto-add.
- Add rate/usage limits, abuse controls, accuracy/correction analytics and fallback to manual.

Acceptance: uncertain items are clear, nothing is added without confirmation, image deletion is
auditable, correction rate and repeated use are measurable.

## Phase 7 - real subscriptions (only after product gates)

Entry gates: repeat use exists, Premium feature has demonstrated value, AI unit economics are
known, limits/fake doors show demand, and basic free value is stable.

- Configure App Store/Google Play products and RevenueCat entitlements/offerings.
- Add development builds, sandbox purchase matrix, signed webhooks and reconciliation job.
- Implement trial, purchase, restore, grace, cancellation, expiry and subscription management.
- Add paywalls only after a demonstrated value moment and run price/paywall experiments.

Acceptance: backend access matches store state under renewal/cancel/refund/offline webhook cases;
restore works; expiration does not delete data; free safety/basic recommendation remains available.

## Phase 8 - post-monetization options

Prioritize from measured demand: shopping list, household Pantry/profiles, sync, import and weekly
planning. Each begins with a fresh architecture/privacy review. Social network, public comments,
medical advice, delivery and premature ML/microservices remain out of scope.

## Release task template

Copy this for every implementation slice:

```text
Task ID / feature:
PRD requirement and success metric:
Dependencies:
Contracts/API changes:
Schema migration + backfill + rollback/forward-fix:
Domain invariants:
Mobile states and accessibility:
Events + properties + owner:
Feature flag / config / entitlement:
Unit / integration / E2E / load / security tests:
Privacy and retention impact:
Observability and alert:
Rollout: internal -> 5% -> 25% -> 100%:
Acceptance evidence:
Runbook and rollback command/procedure:
```
