# Stage 0 research prototype handoff

Status: creation-reviewed full-flow v5 A/B/H research artifact; Maze publication is prepared;
v4, v3 and v2 remain preserved evidence; product discovery evidence remains pending

Canonical artifact:
[Stage 0 Research Prototype](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=187-2)

Created: 2026-08-11

Revised: 2026-08-21

Live study:
[Stage 0 · Weeknight Meal Decision · A/B/H](https://t.maze.co/574247931)

Operational contract:
[`stage-0-maze-study.md`](stage-0-maze-study.md)

## Purpose

The prototype now contains five deliberately separate layers:

1. three active full-flow v5 A/B/H journeys that each begin before any meal is chosen and differ
   only at recommendation cardinality;
2. the preserved V4-01–V4-08 adaptive hybrid journey as versioned research evidence;
3. the preserved V3-01–V3-08 adaptive journey as earlier versioned evidence;
4. the preserved E1–E8 v2 journey as earlier versioned evidence;
5. focused legacy A/B/H stimuli and C/D controls for bounded follow-up work.

Each active journey starts with the same unselected product entry, serving limit, priority, time and
multi-select ingredient flow. Only the recommendation presentation changes: Single shows one
trusted answer with a live replacement action, Shortlist shows three equal candidates, and Hybrid
shows one dominant answer plus two quieter tradeoff-labelled alternatives. Feed/search remains a
bounded H3 control and Pantry-first remains a separate H7 exercise.

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

## Preserved v2 participant journey

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

## Adaptive v4 participant journey

The preserved v4 entry is `Runner V4-01 · Welcome` (`320:1855`). It ends at
`Runner V4-08 · Adaptive cooking plan` (`320:1934`). It remains in Figma for auditability and is
not the v5 comparison entry.

| Step | Figma node | Participant decision or adaptive outcome |
| --- | --- | --- |
| V4-01 · Welcome | `320:1855` | Keep the required no-peanuts limit and choose 1, 2 or 4 servings |
| V4-02 · Priority | `320:1864` | Choose Quick & easy, Comforting or Lighter, with Back available |
| V4-03 · Time | `320:1874` | Choose 15 min, 25 min or 40+ min, with Back available |
| V4-04 · Ingredients | `320:1885` | Choose the first fixture ingredient that anchors the scripted match or skip |
| V4-05 · Ingredients selected | `320:1902` | Add or remove any of six independent ingredient selections before matching |
| V4-06 · Adaptive recommendation | `320:1919` | Evaluate one adapted primary and two quieter factual alternatives |
| V4-07 · Adaptive recipe | `320:1924` | Review the chosen meal and selected anchor before starting cooking |
| V4-08 · Adaptive cooking plan | `320:1934` | Reach the observable cooking-start outcome and see the bounded step map |

The no-peanuts hard limit is visible and non-relaxable. Servings are independently selectable at
entry and survive Back navigation, but recipe amounts deliberately remain fixed in this Stage 0
fixture. The first ingredient selects the deterministic recipe anchor; the participant can then
select any number of additional ingredients. Those extra selections are recorded in prototype
state but transparently do not alter the fixture recipe. This preserves participant agency without
claiming production recommendation coverage that does not exist yet.

All applicable mobile headers navigate one step back. Recommendation actions live in a fixed
footer, preventing the primary and secondary actions from overlapping content or each other. The
selected-ingredient grid uses six independent 44 px controls and keeps every label visible in both
default and selected states.

The prototype uses a private hidden Figma collection named `__Prototype · Stage 0 v4` with 12
unpublished variables. It is a bounded deterministic Stage 0 simulation, not the server-owned
ranking implementation, recipe truth source, scaled-serving engine or analytics state.

## Full-flow v5 comparison journeys

The three v5 flows reuse the reviewed v4 intake, recipe and cooking structures. They isolate the H3
choice-cardinality variable without forcing participants to begin on a meal that already appears
chosen.

| Variant | Figma flow | Start | Recommendation | Goal |
| --- | --- | --- | --- | --- |
| A · Single | `Flow 10 · Full Single v5` | `Runner V5-A01 · Welcome` (`347:2021`) | `Runner V5-A06 · Single recommendation` (`347:2100`) | `Runner V5-A08 · Adaptive cooking plan` (`347:2116`) |
| B · Shortlist | `Flow 11 · Full Shortlist v5` | `Runner V5-B01 · Welcome` (`347:3022`) | `Runner V5-B06 · Shortlist recommendation` (`347:3101`) | `Runner V5-B08 · Adaptive cooking plan` (`347:3117`) |
| H · Hybrid | `Flow 12 · Full Hybrid v5` | `Runner V5-H01 · Welcome` (`347:3293`) | `Runner V5-H06 · Hybrid recommendation` (`347:3372`) | `Runner V5-H08 · Adaptive cooking plan` (`347:3388`) |

Every journey has eight root-level 390 by 844 frames and the same Welcome, Priority, Time,
Ingredients, Ingredients selected, Recipe and Cooking responsibilities. Every applicable header
navigates to the immediately preceding screen. The first ingredient chooses the deterministic
fixture, while all six ingredient controls remain independently toggleable on the selected state.
Participants may choose any available serving, priority and time limit before the recommendation.

The Single replacement action updates the recommendation in place. Every Shortlist candidate and
every Hybrid alternative updates the shared recipe state before navigation. Recommendation footer
actions remain inside the mobile frame and reuse Core Design System v1 Button instances.

The three v5 subtrees contain 24 root frames. Automated creation review found no cross-version
navigation, no unsupported visible font, no interaction target below 44 px and no visible node
outside its root frame.

## Preserved adaptive v3 participant journey

The former live entry is `Runner V3-01 · Welcome` (`293:1692`). It ends at
`Runner V3-08 · Adaptive cooking plan` (`293:1917`). It remains preserved in Figma for
auditability and is hidden from live Maze participants.

| Step | Figma node | Participant decision or adaptive outcome |
| --- | --- | --- |
| V3-01 · Welcome | `293:1692` | Understand the promise, hard limits and guest-session boundary |
| V3-02 · Priority | `293:1713` | Choose Quick & easy, Comforting or Lighter |
| V3-03 · Time | `293:1749` | Choose 15 min, 25 min or 40+ min |
| V3-04 · Ingredients | `293:1773` | Choose one available fixture or skip without an inferred selection |
| V3-05 · Ingredients selected | `293:1803` | Confirm or clear the selected fixture before matching |
| V3-06 · Adaptive recommendation | `293:1833` | Evaluate one adapted primary and two factual alternatives |
| V3-07 · Adaptive recipe | `293:1877` | Review the chosen meal, selected fixture and optional item |
| V3-08 · Adaptive cooking plan | `293:1917` | Reach a three-, four- or five-step plan and begin step progression |

Priority sets the recommendation heading independently. Time and the optional ingredient select one
of 18 ingredient-and-time scenarios or three skip scenarios. Each scenario updates the primary,
two alternatives, recipe metadata, selected or check-pantry state, missing item, first two
instructions and the complete step map. Clicking either quiet alternative also updates the recipe
and cooking family before navigation.

The prototype uses a private hidden Figma collection named `__Prototype · Stage 0 v3` with 33
unpublished variables. It is a deterministic Stage 0 simulation, not the server-owned ranking
implementation, recipe truth source or analytics state. Production must continue to own ranking,
hard-constraint enforcement and versioned recommendation policies on the server.

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

The page now contains 75 top-level runner frames: the original 27 focused frames, eight preserved v2
frames, eight preserved v3 frames, eight preserved v4 frames and 24 active v5 comparison frames.
Figma exposes 12 flow start points. Flows 10–12 are the active full-flow comparison entries; Flow 9
preserves v4, Flow 8 preserves v3 and Flow 7 preserves v2.

Its transitions cover context selection, optional ingredient selection and skip, deterministic
adaptation, acceptance, alternative selection, adjustment, replacement, recipe open, cooking start,
step progression, Pantry change/skip and recovery.

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

The adaptive v3 pass then made the choices consequential without widening the intake:

- priority changes the decision framing;
- time and ingredient state change the meal family, alternatives, recipe and cooking plan;
- skipping ingredients never fabricates a pantry match;
- only the explicitly chosen ingredient is marked Selected;
- alternatives remain quieter and use bounded factual tradeoffs;
- hard restrictions remain visible and never enter a fallback relaxation path;
- the cooking view exposes the complete step-map length and supports an in-place next-step state.

The adaptive v4 pass addressed the live-preview interaction defects found on 2026-08-21:

- every applicable Back control now navigates to the preceding journey screen;
- 1, 2 and 4 serving limits can be selected before the situational questions and persist through
  Back navigation;
- the ingredient confirmation screen was rebuilt as a balanced 3 by 2 grid with six independent
  multi-select controls;
- the first ingredient remains the scripted fixture anchor while extra selections remain visible
  and independently toggleable;
- the fixed fixture limitation is disclosed rather than hidden: extra ingredients and serving
  changes do not rewrite recipe amounts in this research prototype;
- recommendation actions were moved into a bounded footer, removing the previously overlapping
  button geometry;
- dynamic character bindings were removed from the Red lentils and Tomatoes grid labels after live
  testing exposed a disappearing Tomatoes label in the selected state.

The full-flow v5 pass then applied those corrections to every cardinality scenario:

- Single, Shortlist and Hybrid now start at their own Welcome screen and end at their own Cooking
  goal;
- all 123 cloned reaction sources were remapped so navigation and Back remain inside the current
  scenario;
- each branch accepts all three time limits and all three priority choices before recommending;
- each branch supports six independent ingredient selections and a clear-selection action;
- Single exposes a live in-place replacement action, while Shortlist and Hybrid alternatives update
  the chosen recipe before navigation;
- the three branches reuse the approved semantic variables, Source Sans 3 and Fraunces families,
  and Core Design System v1 components rather than detached local imitations.

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

The v2 structural audit verified:

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

The adaptive v3 creation review verified:

- eight root-level 390 by 844 frames and one named `Flow 8 · Adaptive v3` entry;
- 253 nodes, 25 interactive sources and 53 actions inside the v3 subtree;
- zero invalid destinations and zero destinations outside the v3 subtree;
- zero interactive sources below the 44 px minimum target;
- zero gradient fills and 104 variable-bound text nodes;
- a private collection with 33 variables, hidden from publishing with no exposed variable;
- only Fraunces SemiBold and Source Sans 3 Regular, SemiBold and Bold;
- a successful Maze path from Lighter, 15 min and Mushrooms through `Mushroom fried rice`, its
  adapted recipe and a three-step cooking plan;
- correct visual alignment of all direct actions at 20 px mobile side margins;
- English participant copy and layer naming throughout the adaptive artifact.

The adaptive v4 creation review verified:

- eight root-level 390 by 844 frames and one named `Flow 9 · Adaptive v4` entry;
- 270 nodes, 41 interactive reaction sources and 73 top-level prototype actions inside the v4
  subtree;
- 24 direct navigation actions, 36 direct variable actions and 13 conditional top-level actions;
- zero invalid or cross-version destinations and zero interactive sources below the 44 px minimum;
- 29 variable-bound text nodes after stabilizing the two affected ingredient labels;
- a private 12-variable collection hidden from publishing;
- only Fraunces SemiBold and Source Sans 3 Regular, SemiBold and Bold;
- a successful no-save Maze path using 4 servings, Quick & easy, 25 min, Red lentils, Tomatoes and
  Spinach through `Tomato lentil pasta`, its recipe and the cooking-plan goal;
- successful Back navigation from Priority, Time, Ingredients selected, Recommendation and Recipe,
  including persistence of the four-serving choice;
- visible simultaneous selection of Red lentils, Tomatoes and Spinach, with the first item retained
  as the fixture anchor;
- no overlap between the recommendation's fixed primary and secondary actions;
- English participant copy and layer naming throughout the active artifact.

## Remaining research work

The Maze study was updated to adaptive v4 and its full no-tracking preview passed on 2026-08-21. Its
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
