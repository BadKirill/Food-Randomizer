# P0 mobile wireframes pass 01

Status: creation-reviewed product wireframes, not approved launch navigation or final visual design

Canonical artifact:
[P0 mobile wireframes pass 01](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=75-3)

Created: 2026-08-03

Core Design System v1 migration:
[P0 Mobile · Pass 02 · DS v1](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=173-71)

## Scope

The canonical Figma file contains a first screen-level pass for the P0 portions of F01-F04 on the
`07 · P0 Mobile Wireframes · Pass 01` page (`75:2`). The root board is
`P0 Mobile wireframes · Pass 01` (`75:3`). It contains 16 editable 393 by 852 portrait screens:

| Flow | Screen nodes | Covered states |
| --- | --- | --- |
| F01 · Entry & first value | `76:4`, `76:5`, `76:6` | Guest-first welcome, hard-safety setup and current situation |
| F02 · Core decision & D0 | `76:9`-`76:13` | Loading, single, shortlist, hybrid and accepted decision |
| F03 · Reject, replace & recover | `76:16`-`76:19` | Rejection reason, replacement, safe empty and offline recovery |
| F04 · Recipe, adaptation & cooking | `76:22`-`76:25` | Recipe detail, safe adaptation, cooking step and completion |

This pass turns the journey map into concrete screen hierarchy and copy. It deliberately omits
production food imagery, final navigation, motion and decorative brand exploration so that the
product interaction can still change after discovery evidence.

All user-facing strings, annotations and component overrides in this pass are English. Localized
languages belong in dedicated expansion-test frames rather than in the canonical default screens.

## Product decisions represented

- The first-value path is guest-first and does not require account creation before a useful
  recommendation.
- Hard restrictions fail closed. Safe-empty and adaptation states explain recovery without
  relaxing allergens or permanent exclusions.
- D0-A single, D0-B shortlist and D0-C hybrid use the same 393 by 852 viewport, recipe quality,
  component language and bottom-action pattern. The 2026-08-14 founder direction selects Hybrid
  as the working target while keeping Single and Shortlist as research bounds and rollback modes.
- Rejection is quick and optional. A reason improves the next replacement but is not required.
- Acceptance leads directly toward the first cooking step instead of opening another browsing
  decision.
- Offline recovery exposes only already-saved recipe content and preserves progress for later
  synchronization.

## Design-system use

The screens reuse the local `Button`, `Choice chip` and `Decision option` component sets from
`03 · Components`. Manual frames are unique layout or content containers rather than parallel
copies of an existing component.

All visible manual paints use semantic variables from Foundation v1. Structural auto-layout frames
are transparent. Interface and label text use Source Sans 3; the welcome display statement uses
Fraunces. Both families are licensed under SIL Open Font License 1.1. Interactive component
instances are at least 44 px high.

## Creation review

The board, every flow row and representative detail views were rendered after construction. The
final structural audit verified:

- exactly 16 mobile screens, each 393 by 852;
- no remaining placeholder shimmer, direct-child overflow or clipping;
- no unbound visible fill or stroke outside component instances;
- no component instance smaller than 44 by 44;
- only Source Sans 3 and Fraunces in free-standing text;
- no Cyrillic text in visible copy, layer names, component defaults or instance overrides;
- equal viewport dimensions and reversible treatment for D0-A, D0-B and D0-C;
- one primary action per screen action group;
- explicit success, warning, danger, disabled, safe-empty and offline semantics without relying on
  color alone.

## Remaining design work

This pass does not complete the P0 design specification. The next passes must add:

1. broader small-iPhone and representative Android coverage beyond the Stage 0 decision paths;
2. localization-expansion, keyboard, safe-area and reduced-motion checks;
3. missing-image and long-content variants where recipe media and content are introduced;
4. signed D0 evidence before the selected interaction becomes final launch navigation;
5. production analytics implementation for request, exposure, acceptance, rejection, replacement,
   cooking start and completion;
6. component contracts for any repeated pattern that survives interaction testing;
7. complete platform and accessibility matrices for every launch screen.

## Pass 02 · Core Design System v1

Pass 01 remains preserved as low-fidelity evidence. The Pass 02 wrapper at `173:71` rebuilds all 16
F01-F04 screens at 390 by 844 using the reviewed Core Design System v1:

| Flow | Screen nodes |
| --- | --- |
| F01 · Entry and first value | `174:13`, `174:36`, `174:66` |
| F02 · Core decision and D0 | `176:5`, `176:34`, `176:73`, `176:138`, `176:204` |
| F03 · Reject, replace and recover | `177:5`, `177:34`, `177:64`, `177:91` |
| F04 · Recipe, adaptation and cooking | `178:12`, `178:52`, `178:88`, `178:128` |

The rebuilt screens use `Top App Bar`, `Inline Notice`, `Button`, `Choice Chip`, `Skeleton`,
`Recommendation`, `Decision Option`, `Status Panel`, `Cooking Step`, `Recipe Card`, `Ingredient
Row` and `Bottom Sheet` instances. The 2026-08-10 creation review verified equal-size viewports,
equal-fidelity D0 modes, no missing or unexpected fonts, explicit safety and recovery copy, and no
interactive component variant below 44 px.

Pass 02 is an implementation-oriented visual contract. Its Hybrid screen at `176:138` now shows
one dominant best match and two quieter factual tradeoffs; final rollout still depends on D0
validation. It is not approval of final navigation, Pantry value or payments. The Stage 0 research prototype at page
`187:2`, documented in `stage-0-research-prototype.md`, now supplies focused platform adaptations,
large-text evidence, six clickable flows, moderator guidance and analytics annotations. Broader
launch-platform coverage, localization expansion, production analytics and imagery remain future
work.
