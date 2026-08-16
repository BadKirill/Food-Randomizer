# RandoMeal product engineering blueprint

This directory is the implementation source of truth for turning the existing MVP into the
product described in `RandoMeal Product Requirements`, version 2.0, as constrained by the Stage 0
discovery package. Discovery gates override unvalidated product assumptions; accepted safety and
engineering invariants remain in force.

Read in this order:

1. [`discovery-decisions.md`](discovery-decisions.md) - validated direction, open hypotheses and
   product gates that control implementation.
2. [`architecture.md`](architecture.md) - target stack, boundaries, runtime architecture, and
   target data model.
3. [`data-model.md`](data-model.md) - table-level database design, constraints and indexes.
4. [`api-v2.md`](api-v2.md) - target REST surface and behavior.
5. [`audit-and-migration.md`](audit-and-migration.md) - what exists, what is reusable, and what
   must be refactored or built.
6. [`analytics.md`](analytics.md) - identity, event ownership, tracking plan, metrics, dashboards,
   and privacy rules.
7. [`quality-and-design.md`](quality-and-design.md) - design delivery, QA strategy, security,
   accessibility, and release gates.
8. [`delivery-plan.md`](delivery-plan.md) - dependency-ordered, AI-ready execution plan.
9. [`executable-implementation-plan.md`](executable-implementation-plan.md) - operational Stage
   0-19 queue, status, branch boundaries, exit checks and rollback handoff.
10. [`stage-0-research-prototype.md`](stage-0-research-prototype.md) - canonical Figma research
    prototype nodes, moderator protocol, analytics annotations and creation-review evidence.
11. [`stage-0-maze-study.md`](stage-0-maze-study.md) - live A/B/H Maze study, participant flow,
    privacy settings, verified links, operating protocol and evidence handoff.

## Product invariant

RandoMeal is a decision engine, not a recipe catalog. The primary flow must move a user from
uncertainty to a safe, explainable meal decision in less than 30 seconds without a browsing feed.
The founder-selected working direction is one dominant recommendation plus two quieter alternatives
with factual benefit/cost labels. Stage 0 still validates this hybrid candidate against the single
and equally weighted shortlist bounds, so presentation remains server-owned and reversible. AI may
adapt a canonical recipe, but it must not be required to produce a normal recommendation.

## Decision status

Architecture decisions in these files are `Accepted` for implementation unless a later ADR
explicitly supersedes them. Product assumptions and beta targets remain hypotheses until the gates
in `discovery-decisions.md` are passed. The hybrid hierarchy is an approved working direction, not
a claim of participant validation.

## Change protocol

Any change to a hard dietary invariant, identity model, event semantics, entitlement checks, or
recommendation scoring contract requires:

- an ADR in `docs/adr/`;
- updated contracts and tests in the same pull request;
- an additive database migration with a rollback or forward-fix procedure;
- an analytics compatibility note when event meaning changes.
