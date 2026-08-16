# Stage 0 research prototype handoff

Status: creation-reviewed research artifact; live Maze A/B/H study is dry-run verified; product
discovery evidence remains pending

Canonical artifact:
[Stage 0 Research Prototype](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=187-2)

Created: 2026-08-11

Live study:
[Stage 0 · Weeknight Meal Decision · A/B/H](https://t.maze.co/574247931)

Operational contract:
[`stage-0-maze-study.md`](stage-0-maze-study.md)

## Purpose

The prototype makes the H3 choice-cardinality test runnable while keeping the launch policy
reversible. It tests the founder-selected hybrid candidate—one dominant answer plus two quieter,
tradeoff-labelled alternatives—against a single-result narrow bound and an equally weighted
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

## Clickable prototype starting points

Figma exposes six prototype starting points. Select a start frame and press Present:

| Flow | Start node | Research role |
| --- | --- | --- |
| A | `203:823` | One trusted recommendation plus Another |
| B | `203:1788` | Shortlist of two to three |
| H | `204:1149` | Preferred candidate: one lead answer plus two factual tradeoff options |
| C | `204:2035` | Familiar bounded browse/search control |
| D | `204:2161` | Separate Pantry-first H7 exercise |
| Recovery | `204:2319` | No-safe-match and offline recovery |

The runner contains 27 top-level frames. Its transitions cover acceptance, alternative selection,
rejection reason, replacement, recipe open, cooking start, Pantry change/skip and recovery.

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

- 27 top-level runner frames;
- six Figma prototype starting points;
- 48 interactive reaction sources;
- zero invalid prototype destinations;
- zero interactive sources below 44 px in either dimension;
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

## Remaining research work

The A/B/H Maze study is published and the full no-tracking preview passed on 2026-08-16. Its
configuration, privacy boundary, verified links and operating protocol are recorded in
`stage-0-maze-study.md`.

1. recruit and run the live participant protocol in batches of three;
2. enter participant-level evidence in the discovery workbook;
3. run bounded browse/search control C after the direct-decision exercises and Pantry-first D as a
   separate H7 exercise rather than as cardinality variants;
4. review the six locked thresholds and segment concentration;
5. sign D0 with dissent and rejected alternatives;
6. confirm the founder-selected hybrid policy or define the evidence-backed bound/pivot that
   replaces it;
7. only then convert the selected interaction into final launch navigation and production UI.
