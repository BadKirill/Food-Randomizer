# Discovery decisions and implementation gates

Status: founder direction selected; Stage 0 validation evidence pending

Inputs: `RandoMeal_Product_Discovery_Stage_0.docx`,
`RandoMeal_Discovery_Workbook.xlsx`, and the founder's competitor analysis

Last updated: 2026-08-14

This file separates accepted strategic direction from hypotheses. Implementation agents must not
turn an untested hypothesis into an irreversible product or data-model decision.

## 1. Accepted direction

- The differentiator is not recipe generation, Pantry, personalization, planning or photo input;
  competitors already combine these functions.
- The initial wedge is constrained weekday cooking: a fast, trusted and explainable decision in
  the user's current situation.
- The product succeeds when the user commits and starts cooking, not when the app maximizes
  recipes viewed, session time or feed engagement.
- Canonical recipes are structured and verified. Normal selection is deterministic/reproducible
  without AI; AI is a later recovery/adaptation layer.
- Guest-first value, hard dietary safety, rejection feedback, repeat protection, event
  instrumentation, remote configuration and content-quality operations remain P0 foundations.
- Search/feed, weekly planning, social import, photo recognition and real payments are not part of
  the initial decision loop without new evidence.

## 2. Founder-selected working direction

The founder selected `hybrid` as the working launch candidate on 2026-08-14:

- one primary recommendation is visually dominant and represents RandoMeal's best answer;
- two alternatives remain visible but quieter, extending coverage without turning the decision
  surface into a catalogue;
- every alternative states one concrete benefit and one concrete cost relative to the primary,
  such as `Easier · 120 kcal more` or `More protein · 15 min longer`;
- tradeoff labels come only from verified structured recipe facts. Vague claims such as `healthier`
  are not allowed unless the product defines and proves the underlying measure;
- all three results pass the same hard-safety filters. An alternative never exists by weakening a
  dietary restriction;
- one meal is selected at a time and the screen retains one dominant cooking CTA.

This is an approved product direction and the default target for design and implementation
planning. It is not participant evidence. Decision Gate D0 now validates or overturns this working
direction by comparing it with the single and shortlist bounds.

## 3. Open hypotheses

| ID    | Hypothesis                                                                                         | Decision affected                 | Evidence required                                                            |
| ----- | -------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| H1/H2 | The problem is frequent and current workarounds have meaningful cost.                              | Proceed, narrow ICP or stop.      | Recent incidents from the target segment, not stated intent.                 |
| H3    | One dominant recommendation plus two quieter, tradeoff-labelled alternatives produces a faster trusted decision than either bound. | Core recommendation presentation. | Balanced A/B/H concept test and, if still ambiguous, instrumented beta experiment. |
| H4    | Users need no more than three situational inputs.                                                  | Home/context interaction.         | Observed selections and time-to-value.                                       |
| H5    | Verified recipes are trusted more than AI-from-scratch.                                            | Content/AI boundary.              | Trust requirements and behavior in concept/MVP tests.                        |
| H6    | AI adaptation rescues a near-miss.                                                                 | Whether AI enters P1.             | Concrete recent use cases and fake-door/usage evidence.                      |
| H7    | Pantry value exceeds setup/maintenance effort.                                                     | Pantry priority and input model.  | Concrete incidents and repeated-use evidence.                                |
| H8/H9 | Repeat avoidance adds value and account-before-value adds friction.                                | Personalization/identity UX.      | MVP behavior and usability evidence.                                         |
| H10   | Users pay for automation, not basic selection.                                                     | Monetization packaging.           | Fake-door and retained-user evidence; track only in Stage 0.                 |

The third research contrast must not combine two questions. `Feed/search` is a negative/control
interaction model for H3. `Pantry-first` is a separate value/input hypothesis for H7. Run and log
them as separate exercises.

## 4. Stage 0 protocol and locked thresholds

Recruit 12 completed interviews in batches of three, adding up to three only if evidence remains
unstable. Include two contrast users and at least six participants who recently used a recipe or
AI alternative. Core candidates cook at least three times per week, face the decision problem at
least weekly and include recurring constraints across at least half the sample.

Evidence order is fixed: observed action, recent concrete incident, current workaround/payment,
then opinion or future intent. Count participants, not repeated quotes.

Do not change these thresholds after data collection starts:

| Signal                                             | Threshold |
| -------------------------------------------------- | --------: |
| Core participants with weekly problem              |       >=8 |
| Core participants with problem at least twice/week |       >=6 |
| Participants with meaningful friction/fallback     |       >=8 |
| Accept one-decision or hybrid concept              |       >=7 |
| Median situational filters selected                |       <=3 |
| Participants with satisfiable trust requirements   |       >=8 |

Overall workbook rule: `GO` when at least five of six criteria pass, `STOP / major pivot` when at
least three fail, otherwise `PIVOT`. This arithmetic is a decision aid, not a substitute for
reviewing evidence quality and segment concentration.

## 5. H3 concept-test contract

Use equal-fidelity, randomized concept cards with the same dish quality, explanation and CTA:

- A — one ranked recommendation plus `Another`, the narrow bound;
- B — two or three equally weighted recommendations visible together, the broad bound;
- H — one dominant recommendation plus two quieter alternatives with explicit benefit/cost labels,
  the founder-selected candidate;
- C — feed/search control, tested only to learn whether browsing is actually desired;
- D — Pantry-first input, tested separately for H7 and never treated as an H3 alternative.

Record first choice, forced trade-off, rejection reasons, time/effort perception and whether the
participant would start cooking. Do not ask only which screen they "like".

Decision outcomes:

- `GO_SINGLE`: clear evidence for A; launch single while retaining server support for
  a shortlist.
- `GO_HYBRID`: H reaches the locked acceptance threshold without worsening time-to-decision,
  abandonment, trust or safety; launch the founder-selected hierarchy.
- `PIVOT_SHORTLIST`: users consistently need visible comparison; launch two or three, never an
  unbounded feed.
- `PIVOT_PANTRY`, `PIVOT_NUTRITION`, `PIVOT_HOUSEHOLD`: a different job dominates; return to scope
  and segment decision before building.
- `STOP`: problem is rare, alternatives are satisfactory or the target segment prefers browsing
  as the job itself.

If qualitative evidence cannot confirm H or select a bound, run a server-assigned beta experiment.
The primary
metric is a successful meal decision; guardrails are time-to-decision, abandonment, rejection,
hard-constraint incidents and D7. Never select a variant on clicks or recipes viewed alone.

The first equal-fidelity A/B implementation reference is the canonical Figma
[`Decision flow concept 01`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=34-5),
documented in `docs/product/decision-flow-concept-01.md`. Its D0-A and D0-B screens are experiment
stimuli only. They do not satisfy this gate until the protocol above is run and the evidence is
signed.

The runnable research artifact is the canonical Figma
[`Stage 0 Research Prototype`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=187-2),
documented in `docs/product/stage-0-research-prototype.md`. It includes randomized A/B-ready flows,
the H diagnostic, separate C and D controls, recovery, moderator guidance and analytics
annotations. Creating the prototype does not satisfy D0; participant evidence and a signed outcome
remain mandatory.

## 6. Content gate

Export the current database into the workbook before enabling the new engine. No coverage status
is currently proven because the Recipe Audit is empty.

For each launch-critical `Diet x Meal type x Max time x Goal` cell, use the workbook thresholds:

- Critical: 0-3 eligible published recipes;
- Weak: 4-7;
- Healthy: 8-15;
- Strong: 16+.

The beta launch matrix must have no Critical cells. Each supported cell must meet its explicit
target minimum (8 or 10 in the current workbook), and every included recipe must pass publication,
completeness, ingredient/allergen and trust review. Unsupported combinations are hidden or
explained; the product must not pretend coverage exists.

## 7. Implementation consequences

- Ranking produces an ordered candidate set. The working `hybrid` policy exposes positions 1-3,
  with position 1 as the primary and positions 2-3 as lower-emphasis alternatives, without
  changing safety, scoring or candidate generation.
- Alternative tradeoffs are deterministic comparisons against position 1 using normalized recipe
  facts such as total time, active effort, calories per serving, protein per serving, Pantry gaps
  and complexity. Store typed codes and numeric deltas; format human copy in the client.
- API, persistence and analytics model an exposure containing 1-3 recommendations. Sequential
  `Another` and simultaneous shortlist exposure remain distinguishable.
- The mobile client targets the founder-selected hybrid hierarchy from shared primitives while
  retaining single and shortlist renderers as bounded research and rollback policies until D0 is
  signed.
- `Random` may remain a legacy mechanism/event name, but launch copy should promise a decision,
  not randomness.
- P0 builds reversible foundations. AI, Pantry and monetization implementation retain their later
  phase entry gates even if interviewees express general interest.
