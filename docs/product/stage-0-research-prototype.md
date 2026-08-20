# Stage 0 research prototype handoff

Status: creation-reviewed v2 research artifact; the published Maze study still uses the v1 A/B/H
entry until its separately confirmed migration; product discovery evidence remains pending

Canonical artifact:
[Stage 0 Research Prototype](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=187-2)

Created: 2026-08-11

Revised: 2026-08-20

Live study:
[Stage 0 · Weeknight Meal Decision · A/B/H](https://t.maze.co/574247931)

Operational contract:
[`stage-0-maze-study.md`](stage-0-maze-study.md)

## Purpose

The prototype now contains two deliberately separate layers:

1. an end-to-end product journey that starts before any meal is chosen, collects a small amount of
   situational context and ends at the first cooking step;
2. focused A/B/H comparison stimuli for the H3 choice-cardinality gate.

The full journey uses the founder-selected hybrid candidate—one dominant answer plus two quieter,
tradeoff-labelled alternatives—without presenting a preselected meal on entry. The focused
comparison still tests that hierarchy against a single-result narrow bound and an equally weighted
shortlist broad bound. Feed/search is a bounded H3 control and Pantry-first remains a separate H7
exercise.

This artifact completes execution Stage 1. It does not complete product discovery Stage 0 or sign
Decision Gate D0.

## Canonical structure

The page is `08 · Stage 0 Research Prototype` (`187:2`). The reviewed documentation board is
`Stage 0 Research Prototype · v1` (`187:3`).

| Board section | Figma node | Purpose |
| --- | --- | --- |
| Research contract | `187:4` | Research question, participant task and session boundary |
| Experiment stimuli A/B/H | `187:5` | Equal-fidelity direct-decision comparisons |
| Controls C/D | `187:6` | Bounded browse/search and separate Pantry-first exercise |
| Recovery paths | `187:7` | Safe-empty, offline and restored-context states |
| Responsive evidence | `187:8` | Small iPhone, Android and 125% large-text checks |
| Moderator and analytics | `187:9` | Hidden protocol, outcome routing, events and privacy |

The original concept boards and P0 mobile wireframes remain preserved as evidence. This page is a
new research layer, not a destructive redraw.

## End-to-end participant journey

The corrected study entry is `Runner E1 · Welcome` (`270:1517`). It starts from the user job rather
than from a recommendation that appears already selected. The Maze goal is `Runner E8 · Cooking`
(`270:1524`).

| Step | Figma node | Participant decision |
| --- | --- | --- |
| E1 · Welcome | `270:1517` | Understand the promise, hard limits and guest-session boundary |
| E2 · Priority | `270:1518` | Choose Quick & easy, Comforting or Lighter |
| E3 · Time | `270:1519` | Choose 15 min, 25 min or 40+ min |
| E4 · Ingredients | `270:1520` | See an empty ingredient state and choose a pantry item or skip |
| E5 · Ingredients selected | `270:1521` | Confirm a bounded placeholder selection before matching |
| E6 · Recommendation | `270:1522` | Evaluate one dominant meal plus two quieter factual alternatives |
| E7 · Recipe | `270:1523` | Review ingredients and begin cooking or adjust ingredients |
| E8 · Cooking | `270:1524` | Reach the observable start-cooking outcome |

The intake is intentionally short. It exposes three situational decisions—priority, time and
optional ingredients—while hard dietary restrictions remain persistent and non-relaxable.
Ingredient chips are prototype fixtures rather than Pantry or recommendation-engine claims.

## Focused comparison starting points

The original A/B/H and control runners remain available for focused follow-up tasks. They are no
longer suitable as the first exposure to the product because they begin at the recommendation
decision. Select a start frame and press Present:

| Flow | Start node | Research role |
| --- | --- | --- |
| A | `203:823` | One trusted recommendation plus Another |
| B | `203:1788` | Shortlist of two to three |
| H | `204:1149` | Preferred candidate: one lead answer plus two factual tradeoff options |
| C | `204:2035` | Familiar bounded browse/search control |
| D | `204:2161` | Separate Pantry-first H7 exercise |
| Recovery | `204:2319` | No-safe-match and offline recovery |

The page now contains 35 top-level runner frames: the original 27 focused frames and eight end-to-end
journey frames. Its transitions cover context selection, optional ingredient selection and skip,
acceptance, alternative selection, adjustment, replacement, recipe open, cooking start, Pantry
change/skip and recovery.

## Corrective design pass

The 2026-08-20 pass corrected the defects observed in the published study preview:

- the participant no longer enters on a meal that looks preselected;
- the journey begins with an explicit job and an unselected priority state;
- the disabled ingredient CTA becomes enabled only after a visible selection, while skipping
  ingredients remains possible;
- all direct 350 px actions are centered at 20 px side margins inside 390 px mobile frames;
- the H runner no longer exposes an internal research annotation to participants;
- the recommendation keeps the approved hybrid hierarchy and labels alternatives with factual
  benefit/cost tradeoffs;
- recipe and cooking states are included so Maze can measure behavior through the actual outcome.

## Moderator protocol

1. hide the moderator and analytics board from the participant;
2. use a balanced order for A, B and H so each direct-decision stimulus appears equally often in
   each position;
3. treat H as the founder-selected candidate and A/B as bounded comparisons, without revealing
   that preference to the participant;
4. run C after the direct-decision exercises;
5. run D separately and do not compare it as an H3 cardinality variant;
6. read the same participant task for every direct-decision stimulus;
7. stop when the participant would genuinely begin cooking or leave;
8. record timing, first interaction, hesitation, backtracks, misclicks, rejection reason,
   perceived effort, confidence and whether cooking would start;
9. ask the forced trade-off between accepting a plausible answer too soon and reviewing more
   choices before trusting one;
10. do not ask only which screen the participant likes.

Success means reaching Start cooking without moderator help while understanding why the meal fits.
Failure includes leaving, misunderstanding safety, needing an explanation, failing to recover or
falling into browsing without deciding.

Route the evidence to `GO_SINGLE`, `PIVOT_SHORTLIST`, `GO_HYBRID`, another explicit pivot or
`STOP`. Product planning may target H, but production rollout remains reversible until the signed
decision.

## Analytics annotation contract

Client-owned events represented in the artifact:

- `pick_clicked`;
- `recommendation_exposure_shown`;
- `recommendation_shown`;
- `recommendation_selected`;
- `another_option_clicked`;
- `not_for_me_clicked`;
- `recipe_opened`.

For H, exposure and selection payloads also carry `selection_role=primary|alternative` and a typed
`tradeoff_code` for positions 2-3. Analytics never receives free-form tradeoff copy.

Server-owned events represented in the artifact:

- `recommendation_empty`;
- `rejection_reason_selected`;
- `cooking_started`.

The intended funnel is:

`pick_clicked → recommendation_exposure_shown → recommendation_shown → recommendation_selected → recipe_opened → cooking_started`

These annotations define intended production instrumentation. The Figma prototype does not claim
that product analytics is implemented. Event payloads must use typed summaries and stable codes;
they must not include names, email, raw free text, voice, photos, exact Pantry contents or health
details.

## Responsive and accessibility evidence

| Evidence frame | Node | Result |
| --- | --- | --- |
| A small iPhone, 345 by 750 | `198:744` | Separate 44 px Start cooking and Another actions; no overlap |
| B Android, 412 by 915 | `198:748` | Three options and bounded None fit action remain visible |
| Recovery at 125% text, 390 by 844 | `198:752` | Safety message reflows without truncation; both recovery actions remain visible |

These are focused evidence frames, not a claim that every downstream screen has complete platform,
localization or keyboard coverage.

## Creation review evidence

The final structural audit verified:

- 35 top-level runner frames, including eight frames in the end-to-end journey;
- seven intended research entry points: one end-to-end entry and six focused comparison/control
  entries;
- 61 interactive reaction sources;
- zero invalid prototype destinations;
- zero interactive sources below 44 px in either dimension;
- zero misaligned direct 350 px actions in 390 px runner frames;
- zero placeholder nodes;
- zero gradient fills;
- only Fraunces and Source Sans 3;
- equal dishes, explanation depth and cooking CTA semantics across A, B and H;
- A and B remain equal-fidelity cardinality bounds; H is intentionally hierarchical and its two
  alternatives show `Easier · 120 kcal more` and `More protein · 15 min longer` as research copy;
- no unbounded feed in C;
- D remains visibly and behaviorally separate from H3;
- safe-empty and offline recovery never relax hard restrictions;
- English copy and layer naming throughout the new artifact.

The 2026-08-14 founder-direction alignment changed the shared Hybrid component at `157:54`, the
concept reference at `168:145`, the P0 reference at `176:138`, the H board stimulus at `192:1167`
and the clickable H start at `204:1149`. The follow-up audit found no missing fonts, gradients,
placeholders, undersized reaction sources or clipped tradeoff copy.

The 2026-08-20 creation review inspected Welcome, Priority, Time, both ingredient states,
Recommendation, Recipe and Cooking screenshots. It found no overlapping copy, clipped action,
participant-facing research note or premature selection. The only visible font families are the
SIL Open Font License 1.1 families Fraunces and Source Sans 3.

## Remaining research work

The A/B/H Maze study is published and the full no-tracking v1 preview passed on 2026-08-16. Its
configuration, privacy boundary, verified links and operating protocol are recorded in
`stage-0-maze-study.md`. The v2 end-to-end entry must not be described as live until the Maze block
has been versioned, previewed and published through the study builder.

1. version the Maze prototype task so the first product exposure starts at E1 and succeeds at E8;
2. preview the entire v2 path and verify task completion before recruiting participants;
3. recruit and run the live participant protocol in batches of three;
4. enter participant-level evidence in the discovery workbook;
5. run bounded browse/search control C after the direct-decision exercises and Pantry-first D as a
   separate H7 exercise rather than as cardinality variants;
6. review the six locked thresholds and segment concentration;
7. sign D0 with dissent and rejected alternatives;
8. confirm the founder-selected hybrid policy or define the evidence-backed bound/pivot that
   replaces it;
9. only then convert the selected interaction into final launch navigation and production UI.
