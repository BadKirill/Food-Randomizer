# Stage 0 Maze study

Status: live v2 and full-flow preview verified; participant evidence pending

Published: 2026-08-16

Updated: 2026-08-20

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

The study first observes the complete weeknight decision journey from an unselected product entry
to the first cooking step. It then compares three bounded recommendation presentations for the
same job:

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
5. full E1–E8 product journey from empty entry to cooking;
6. randomized A/B/H variant comparison;
7. format preference question;
8. decision-friction tradeoff question;
9. open trust-requirement question;
10. default Maze thank-you screen.

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

The first Prototype Test is the participant's first product exposure.

Task: `Decide what to cook tonight and begin cooking.`

Description: `Imagine a typical weekday evening. You want to cook dinner but have no clear idea. Start from the app’s first screen, choose what matters today, optionally select ingredients, and continue until you would genuinely begin cooking or decide to leave.`

| Maze block | Start screen | Goal screen | Goal rule |
| --- | --- | --- | --- |
| Full weeknight decision | `Runner E1 · Welcome` (`270:1517`) | `Runner E8 · Cooking` (`270:1524`) | Reach a specific screen |

The path collects one priority, one time bound and optional prototype ingredient fixtures before
showing the Hybrid recommendation. Hard dietary limits stay visible and cannot be relaxed. Exact
path success, hotspot hints and interactive-component assistance remain disabled so alternative and
adjustment behavior stays observable.

## Variant contract

Every variant uses the same task and scenario:

Task: `Choose a meal you would genuinely start cooking.`

Scenario: `Imagine a typical weekday evening. You want to cook dinner, have little time, and have no clear idea. Use the prototype as you would the real app. Stop when you would genuinely begin cooking or decide to leave.`

| Variant | Maze name | Start screen | Goal screen | Goal rule |
| --- | --- | --- | --- | --- |
| A | Single recommendation | `Runner A1 · Single` (`203:823`) | `Runner A7 · Cooking` (`203:878`) | Reach a specific screen |
| B | Equal shortlist | `Runner B1 · Shortlist` (`203:1788`) | `Runner B6 · Cooking` (`203:1827`) | Reach a specific screen |
| H | Hybrid hierarchy | `Runner H1 · Hybrid` (`204:1149`) | `Runner H4 · Cooking` (`204:1172`) | Reach a specific screen |

Exact-path success is disabled so legitimate alternative and recovery paths remain observable.
Hotspot hints and interactive-component assistance are disabled. Maze records success, direct or
indirect paths, time, misclicks and abandonment for each prototype task. The A/B/H tasks are focused
comparison stimuli after the full journey; they are not the first exposure to the product.

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
3. keep the published v2 study structure and locked thresholds unchanged after the first live
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

## Change and stop rules

Figma changes after publication can alter participant experience and invalidate comparisons. Freeze
the E1–E8 and editable A/B/H runner frames while collection is active. If a critical prototype
defect is found, stop the study, duplicate or version the affected Maze block, re-run preview
verification and document which responses belong to each version. Never silently refresh the
prototype during a live batch.

Stop the study immediately for a hard dietary-safety contradiction, a broken goal path, accidental
sensitive-data collection, or a material mismatch between Maze and the canonical Figma file.
