# Decision flow concept 01

Status: design exploration for Stage 0, not an approved launch interaction

Canonical artifact:
[RandoMeal decision flow concept 01](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=34-5)

DS v1 migration:
[Concept 01 · DS v1 migration](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=167-26)

Created: 2026-07-28

## Product intent

The concept tests whether RandoMeal can move a person from uncertainty to a safe cooking start
without a browsing feed. It keeps the H3 cardinality decision reversible by presenting the
single-recommendation and three-option shortlist arms at equal fidelity.

The screens are:

| Flow state | Figma node | Purpose |
| --- | --- | --- |
| Context | `41:4` | Capture only situational inputs that changed now while preserving permanent restrictions. |
| Single, D0-A | `41:7` | Present one explainable decision with accept and replace actions. |
| Shortlist, D0-B | `41:10` | Present three safe, directly comparable options with one selected action. |
| Accepted | `41:13` | Move from commitment to the first cooking step without another navigation decision. |
| Safe empty | `41:16` | Explain why no safe match exists and offer explicit recovery without weakening hard restrictions. |

## Component contracts

The canonical Figma `03 · Components` page contains the local component sets used by the concept:

- `Button` at `39:15`: Primary and Secondary styles with Default, Pressed and Disabled states.
- `Choice chip` at `40:8`: Default, Selected and Disabled states.
- `Decision option` at `40:17`: Default and Selected shortlist states.

Components bind to the existing semantic variables for color, spacing, radius and size. Large
actions are 52 px high, compact choices are 44 px high, and no touch target is smaller than 44 px.
The concept does not introduce new variables or change Foundation v1.

## Design constraints

- Light mode only.
- Ivory, Graphite and Paprika foundation palette.
- Source Sans 3 interface typography; Fraunces remains available for expressive display use.
- Both font families use the SIL Open Font License 1.1 and require no commercial font licence.
- No gradients, feed, search-first navigation, decorative glass, generic AI copy or unbounded card
  browsing.
- Paprika is reserved for the decisive action and selected state; success and danger colors carry
  only their semantic meanings.
- One primary action per screen action group.
- Hard dietary restrictions are never silently relaxed.

## Creation review

The board and every mobile frame were rendered from Figma after creation. Review confirmed:

- five 393 by 852 portrait frames with no clipped or overflowing content;
- stable bottom action placement and 24 px screen padding;
- semantic variable bindings on component fills, borders, radii, spacing and control height;
- complete required component states for the concept;
- readable English copy, explicit explanations and no hidden safety relaxation;
- equal visual fidelity for the D0-A and D0-B experiment arms;
- restrained accent use after reducing secondary-button and experiment-label emphasis.

The concept still requires moderated Stage 0 testing, participant-order randomization, large-text
and localization-expansion variants, representative Android adaptation, loading/offline/error
states, and implementation analytics before it can become a product specification.

## Core Design System v1 migration

The original board remains unchanged as discovery evidence. The DS v1 migration at `167:26`
contains six 390 by 844 frames built from the reviewed component library:

| Flow state | Figma node |
| --- | --- |
| Context | `168:5` |
| Single, D0-A | `168:37` |
| Shortlist, D0-B | `168:78` |
| Hybrid, D0-H | `168:145` |
| Accepted | `168:213` |
| Safe empty | `168:244` |

The migration adds the Hybrid arm at the same fidelity as Single and Shortlist, replaces repeated
local UI with Core Design System v1 instances, and keeps safety recovery explicit. The 2026-08-10
review found only Fraunces and Source Sans 3, no missing fonts and no viewport mismatch.
