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

## Product invariant

RandoMeal is a decision engine, not a recipe catalog. The primary flow must move a user from
uncertainty to a safe, explainable meal decision in less than 30 seconds without a browsing feed.
Whether the best decision surface contains one recommendation or a ranked shortlist of two or
three is a Stage 0 hypothesis, not an architectural invariant. AI may adapt a canonical recipe,
but it must not be required to produce a normal recommendation.

## Decision status

Architecture decisions in these files are `Accepted` for implementation unless a later ADR
explicitly supersedes them. Product assumptions, interaction cardinality and beta targets remain
hypotheses until the gates in `discovery-decisions.md` are passed.

## Change protocol

Any change to a hard dietary invariant, identity model, event semantics, entitlement checks, or
recommendation scoring contract requires:

- an ADR in `docs/adr/`;
- updated contracts and tests in the same pull request;
- an additive database migration with a rollback or forward-fix procedure;
- an analytics compatibility note when event meaning changes.
