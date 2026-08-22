# Stage 0 Maze study

Status: full-flow v5 A/B/H study live and end-to-end preview verified; participant evidence pending

Published: 2026-08-16

Updated: 2026-08-21

## Links and ownership

| Resource | URL | Purpose |
| --- | --- | --- |
| Participant study | [t.maze.co/574247931](https://t.maze.co/574247931) | Send this link to qualified participants |
| Authenticated preview | [Maze preview](https://app.maze.co/maze-preview/mazes/574247931) | Test the full study without saving responses |
| Study builder and recruitment | [Maze study 574247931](https://app.maze.co/projects/574247910/mazes/574247931) | Edit, pause and distribute the study |
| Results dashboard | [Maze results](https://app.maze.co/projects/574247910/mazes/574247931/results?tab=results) | Review participants and block-level evidence |
| Maze project | [RandoMeal project](https://app.maze.co/projects/574247910) | Parent project |
| Canonical Figma source | [RandoMeal canonical product design](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=187-2) | Sole design source allowed by repository policy |

The Maze project ID is `574247910` and the live study ID is `574247931`. The study is titled
`Stage 0 · Weeknight Meal Decision · A/B/H`.

Figma file `DP7ujNqthXzWwwu1mnFhfj` is connected through the Maze Figma integration. Link access is
`Anyone can view`; public editing, password access, and viewer copy/save/export are disabled. Do
not connect another Figma file or replace this link without the canonical-file change protocol.

## Research decision

The study compares three bounded recommendation presentations through three complete weeknight
decision journeys. Each journey begins at the same unselected product entry and ends at the same
observable cooking-start outcome:

- A: one strong recommendation plus a replacement action;
- B: two or three equally weighted options;
- H: one dominant recommendation plus two quieter factual tradeoff alternatives.

H remains the founder-selected working direction. The study does not present H as the preferred
answer to participants, and publication does not sign Decision Gate D0. Maze uses `Alternating`
variant distribution so every participant sees all three variants in randomized order.

Feed/search control C and Pantry-first exercise D are intentionally outside this live study. C is
a separate H3 control and D is a separate H7 value/input test; neither may be interpreted as a
fourth cardinality variant.

## Participant flow

1. default Maze welcome screen;
2. two-question screener;
3. recent concrete incident question;
4. recent workaround/tool usage question;
5. randomized A/B/H variant comparison, where every variant runs from Welcome through Cooking;
6. format preference question;
7. decision-friction tradeoff question;
8. open trust-requirement question;
9. default Maze thank-you screen.

### Screener

`How often do you personally cook a main meal at home?`

- qualify: `5 or more times per week`, `3–4 times per week`, `1–2 times per week`;
- disqualify: `Less than once per week`, `I do not cook main meals`.

`How often do you struggle to decide what to cook?`

- qualify: `Twice a week or more`, `About once a week`, `1–3 times a month`;
- disqualify: `Rarely or never`.

The screener is deliberately wider than the core segment. Analysis must still identify the locked
core: cooks at least three times per week who experience the problem at least weekly.

### Context questions

Recent incident:

`Think about the most recent time you wanted to cook but did not know what to make. What happened, and what did you do next?`

Recent tools, multi-select:

- `Recipe website or app`;
- `AI assistant`;
- `Social media or video`;
- `Meal-planning app`;
- `None of these`.

Do not treat self-reported preference as stronger evidence than the recent incident or observed
prototype behavior.

## Full journey contract

The assigned A/B/H Prototype Test is the participant's first product exposure for that variant.

Task: `Decide what to cook tonight and begin cooking.`

Description: `Imagine a typical weekday evening. You want to cook dinner but have no clear idea. Start on the first screen, set tonight’s limits, choose what matters and how much time you have, select one or more ingredients, then continue until you would genuinely start cooking or leave.`

| Maze variant | Start screen | Goal screen | Goal rule |
| --- | --- | --- | --- |
| Single recommendation | `Runner V5-A01 · Welcome` (`347:2021`) | `Runner V5-A08 · Adaptive cooking plan` (`347:2116`) | Reach a specific screen |
| Equal shortlist | `Runner V5-B01 · Welcome` (`347:3022`) | `Runner V5-B08 · Adaptive cooking plan` (`347:3117`) | Reach a specific screen |
| Hybrid hierarchy | `Runner V5-H01 · Welcome` (`347:3293`) | `Runner V5-H08 · Adaptive cooking plan` (`347:3388`) | Reach a specific screen |

The path starts with an editable serving limit, then collects one priority, one time bound and one
or more prototype ingredients before showing the assigned recommendation presentation. The
no-peanuts hard limit stays visible and cannot be relaxed. Priority changes the recommendation
framing. Time and the
first ingredient anchor the bounded fixture; additional ingredients are independently recorded and
remain visibly selected. Back controls allow participants to revise each preceding decision.

The recipe amounts remain fixed even when the participant changes the 1, 2 or 4 serving limit, and
additional ingredients do not rewrite the scripted recipe. Both limitations are disclosed in the
prototype. The private v4 Figma variable collection contains 12 unpublished variables and cannot
be used as a production analytics store. The preserved v4, v3 and v2 journeys remain versioned
evidence and are not v5 participant starts.

Exact-path success and hotspot hints are disabled so legitimate alternatives, adjustment and
abandonment remain observable. Interactive-component compatibility is enabled because Figma
variables and conditional reactions drive the adaptive states. Maze observes participant
interactions, paths, time and goal completion; production event payloads remain governed by the
analytics contract.

## Variant contract

Every variant uses the same task and scenario:

Task: `Decide what to cook tonight and begin cooking.`

Scenario: `Imagine a typical weekday evening. Start from the first screen, choose what matters today, set any time limit, select as many ingredients as you have, and continue until you would genuinely begin cooking or decide to leave.`

| Variant | Maze name | Start screen | Goal screen | Goal rule |
| --- | --- | --- | --- | --- |
| A | Single recommendation | `Runner V5-A01 · Welcome` (`347:2021`) | `Runner V5-A08 · Adaptive cooking plan` (`347:2116`) | Reach a specific screen |
| B | Equal shortlist | `Runner V5-B01 · Welcome` (`347:3022`) | `Runner V5-B08 · Adaptive cooking plan` (`347:3117`) | Reach a specific screen |
| H | Hybrid hierarchy | `Runner V5-H01 · Welcome` (`347:3293`) | `Runner V5-H08 · Adaptive cooking plan` (`347:3388`) | Reach a specific screen |

Exact-path success is disabled so legitimate alternative and recovery paths remain observable.
Hotspot hints are disabled and interactive-component compatibility is enabled. Maze records
success, direct or indirect paths, time, misclicks and abandonment for each complete prototype
journey.

Each variant ends with the same required questions:

1. `How confident are you that this meal fits your situation?` on a five-point numeric scale from
   `Not confident` to `Completely confident`;
2. `Would you genuinely start cooking this meal now?` as Yes/No.

### Post-comparison questions

`Which presentation made it easiest to make a decision you trusted?`

- `One best recommendation`;
- `Two or three equal options`;
- `One main recommendation with two quieter alternatives`.

`Which is worse when choosing what to cook?`

- `Accepting a plausible option too quickly`;
- `Spending longer reviewing more options`;
- `They are equally frustrating`.

Open response:

`What information, if anything, would you need before trusting the recommendation enough to start cooking?`

## Privacy and collection settings

- participant responses and interactions are saved on the live link;
- one response per device is enabled;
- Clips, screen recording, camera and microphone are disabled;
- no name, email, precise location, health detail, Pantry contents, photo, voice or account data is
  requested;
- AI follow-up on open responses is disabled;
- all devices are allowed because this is a decision-model study, while Maze mobile participation
  may require the Maze Participate app;
- preview responses are not saved and must be used for operator checks only.

Do not add URL tags containing directly identifying or sensitive information. If recruitment needs
source attribution, use a bounded non-personal tag such as `source=friend`, `source=community`, or
`batch=1`.

## Operating protocol

1. recruit 12 completed participants in batches of three;
2. include two contrast users and at least six participants who recently used a recipe or AI
   alternative;
3. keep the published full-flow v5 study structure and locked thresholds unchanged after the first live
   response;
4. use one participant link for all A/B/H participants so Maze preserves randomized order;
5. inspect the first three completions for technical failure, unclear wording and segment mismatch;
6. correct only a genuine study defect, document the change and exclude incomparable responses;
7. export or transcribe one participant-level record into the discovery workbook;
8. analyze observed behavior before stated preference;
9. sign D0 only after evidence quality, segment concentration and all locked thresholds are reviewed.

Locked thresholds:

| Signal | Threshold |
| --- | ---: |
| Core participants with weekly problem | `>=8` |
| Core participants with problem at least twice per week | `>=6` |
| Participants with meaningful friction or fallback | `>=8` |
| Participants accepting a one-decision or hybrid concept | `>=7` |
| Median situational filters selected | `<=3` |
| Participants with satisfiable trust requirements | `>=8` |

Decision aid: `GO` when at least five of six criteria pass, `STOP / major pivot` when at least three
fail, otherwise `PIVOT`. Qualitative contradictions, safety failures or evidence concentrated in the
wrong segment can override the arithmetic and must be recorded.

## Verification record

The 2026-08-21 full-flow v5 publication and end-to-end preview saved no participant response. It
verified:

- Maze refreshed the canonical Figma source and discovered Flows 10–12 plus all 24 V5 root frames;
- the active editable comparison assigns A to V5-A01→V5-A08, B to V5-B01→V5-B08 and H to
  V5-H01→V5-H08;
- every task uses the same full-journey wording and has interactive-component compatibility enabled;
- the preserved comparison block was hidden and copied before editing, retaining the prior study
  version for auditability;
- the canonical V5 subtrees contain no cross-version navigation, target below 44 px, unsupported
  visible font or visible node outside its mobile root frame;
- the redundant published v4 task was hidden, leaving exactly three participant-visible prototype
  tests inside the alternating A/B/H comparison;
- Maze published the corrected study successfully and retained participant link
  `https://t.maze.co/574247931`;
- the no-save authenticated preview completed all three journeys from the servings limit through
  priority, time, first ingredient, additional ingredient selections, recommendation, recipe and
  `Start cooking` to the Maze `Task complete` state;
- Back returned to the previous screen, servings accepted 1, 2 and 4 across the three runs, and
  multiple ingredients remained independently selected before matching;
- Single changed its recommendation in place through `Show another`, while a quieter Hybrid
  alternative and an equal Shortlist option each opened the corresponding recipe;
- all post-task confidence and cooking-intent questions, the final comparison questions and the
  thank-you screen completed successfully;
- Recruit reported the study as Live for all devices with zero started and zero completed real
  responses immediately after verification.

The 2026-08-16 dry run used Maze preview mode, which does not save responses. It verified:

- both screener questions route qualifying answers into the study;
- the recent-incident and tool-usage questions accept and advance responses;
- all three variants load from the canonical Figma file;
- Maze detects `Task complete` at B6, A7 and H4;
- every confidence scale has exactly five points and both endpoint labels;
- each Yes/No block advances to the next randomized variant;
- the two comparison questions and final open response route to the thank-you screen;
- the published study has no builder errors;
- the live link saves responses, limits one response per device and keeps Clips disabled.

The 2026-08-20 v2 dry run also used Maze preview mode and therefore saved no response. It verified:

- Maze refreshed the canonical Figma source on 2026-08-20 and discovered Flow 7 plus all E1–E8
  screens;
- the new full-journey Prototype Test appears before the editable A/B/H comparison;
- the full task starts at `Runner E1 · Welcome` and uses `Runner E8 · Cooking` as its only goal;
- Welcome, Priority, Time, empty Ingredients, selected Ingredients, Hybrid Recommendation, Recipe
  and Cooking render without shifted actions, clipped copy or a preselected meal on entry;
- selecting Quick & easy, 25 min, Red lentils, Show my matches, Choose this meal and Start cooking
  reaches E8 and Maze reports `Task complete`;
- the original published A/B/H block and its child questions were hidden for participants, while an
  editable copy with the same three variants and Alternating distribution was created;
- publication completed successfully and the Recruit view reported the study as Live with all
  devices allowed, Clips disabled, zero starts and zero completions at the time of update;
- the participant link remained `https://t.maze.co/574247931`.

The 2026-08-20 adaptive v3 dry run and publication also saved no preview response. It verified:

- Maze discovered `Flow 8 · Adaptive v3` and all V3-01–V3-08 root-level frames from the canonical
  Figma file;
- the live task starts at `Runner V3-01 · Welcome` and completes only at
  `Runner V3-08 · Adaptive cooking plan`;
- interactive-component compatibility is enabled while hotspot hints remain disabled;
- the real preview path Lighter, 15 min, Mushrooms produced `Mushroom fried rice`, two quieter
  mushroom alternatives, a recipe with Mushrooms marked Selected and a three-step
  `Prep · Cook · Finish` plan;
- the preview preserved the non-relaxable `no peanuts` restriction, identified Cooked rice as the
  missing item and reported `Task complete` on entry to the adaptive cooking plan;
- the v3 subtree contains eight 390 by 844 frames, 253 nodes, 25 interactive sources and 53 actions,
  with zero invalid or cross-version destinations, zero interaction targets below 44 px and zero
  gradient fills;
- only Fraunces SemiBold and Source Sans 3 Regular, SemiBold and Bold are visible; both families are
  available under the SIL Open Font License 1.1;
- the previously published E1–E8 full-journey block was hidden and a new editable v3 block was
  published, preserving version boundaries instead of mutating the collected block;
- Recruit reported Live, all devices allowed, Clips disabled, zero starts and zero completions at
  the time of the v3 update;
- the participant link remained `https://t.maze.co/574247931`.

The 2026-08-21 adaptive v4 dry run, correction and publication also saved no preview response. It
verified:

- Maze discovered `Flow 9 · Adaptive v4` and all V4-01–V4-08 root-level frames from the canonical
  Figma file;
- the live task starts at `Runner V4-01 · Welcome` and completes only at
  `Runner V4-08 · Adaptive cooking plan`;
- the participant task now explicitly starts with tonight's limits and permits one or more
  ingredients;
- interactive-component compatibility remains enabled and hotspot hints remain disabled;
- a real preview path changed the serving limit from 2 to 4, returned with Back and confirmed that
  the four-serving state persisted;
- Back navigation worked from Priority to Welcome, Time to Priority, Ingredients selected to the
  chooser, Recommendation to selected ingredients and Recipe to Recommendation;
- Red lentils, Tomatoes and Spinach could be visibly selected together while Red lentils remained
  the deterministic fixture anchor;
- a disappearing Tomatoes label found during the live preview was corrected in the canonical Figma
  source and the same multi-select path was rerun successfully;
- Quick & easy, 25 min and the three selected ingredients produced `Tomato lentil pasta`, opened the
  recipe and reached `Runner V4-08 · Adaptive cooking plan` after Start cooking;
- Maze reported `Task complete` on the goal screen;
- the v4 subtree contains eight 390 by 844 frames, 270 nodes, 41 reaction sources and 73 top-level
  actions, with zero invalid or cross-version destinations and zero interaction targets below
  44 px;
- the hidden v4 collection contains 12 unpublished variables and the visible fonts are only
  Fraunces and Source Sans 3 under the SIL Open Font License 1.1;
- the published task description was updated, Recruit reported the study as Live, all devices were
  allowed and Clips remained disabled;
- the participant link remained `https://t.maze.co/574247931`.

## Change and stop rules

Figma changes after publication can alter participant experience and invalidate comparisons. Freeze
the V5-A01–V5-A08, V5-B01–V5-B08 and V5-H01–V5-H08 runner frames while collection is active. Keep
V4-01–V4-08, V3-01–V3-08 and E1–E8 as preserved evidence only. If a critical prototype defect is found, stop the study,
duplicate or version the affected Maze block, re-run preview verification and document which
responses belong to each version. Never silently refresh the prototype during a live batch.

Stop the study immediately for a hard dietary-safety contradiction, a broken goal path, accidental
sensitive-data collection, or a material mismatch between Maze and the canonical Figma file.
