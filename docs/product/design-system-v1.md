# Core Design System v1

Status: creation-reviewed Figma implementation reference; mobile code adoption remains separate

Canonical artifact:
[RandoMeal — Product Design](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj)

Created: 2026-08-10

## Purpose

Core Design System v1 gives the product a reusable visual and interaction contract without turning
an open discovery decision into launch policy. It uses the approved Ivory, Graphite and Paprika
foundation, keeps hard-safety states explicit, and supports the D0 single, shortlist and hybrid
recommendation modes at equal fidelity.

The canonical file remains the only permitted RandoMeal Figma source. Original concept boards and
low-fidelity wireframes are preserved as decision history. Their DS v1 counterparts are new,
implementation-oriented frames built from local components and semantic variables.

## Foundations

The system retains the exact Foundation v1 inventory:

| Collection | Variables | Mode |
| --- | ---: | --- |
| Primitives | 33 | Value |
| Color | 29 | Light |
| Spacing | 7 | Value |
| Radius | 5 | Value |
| Size | 4 | Value |

The total is 78 variables across five collections. Semantic colors alias primitive values. The
minimum touch target is 44 px, and component sizing supports 36, 44 and 52 px controls. Every token
has Web, iOS and Android naming.

Fraunces is the expressive display family and Source Sans 3 is the interface family. Both use the
SIL Open Font License 1.1 and require no commercial licence.

## Component inventory

The library contains 20 component sets with 128 variants plus three private icon components:

| Component set | Figma node | Variants | Contract focus |
| --- | --- | ---: | --- |
| Button | `39:15` | 30 | Hierarchy, size, state and width behavior |
| Icon Button | `128:18` | 16 | Accessible compact actions |
| Choice Chip | `40:8` | 5 | Situational and preference selection |
| Text Field | `133:2` | 10 | Default, focus, value, error and disabled input |
| Checkbox | `136:32` | 6 | Binary selection with explicit state |
| Switch | `137:34` | 8 | Persistent setting control |
| Inline Notice | `138:26` | 4 | Info, success, warning and danger messaging |
| Skeleton | `141:15` | 3 | Loading structure without fake content |
| Media | `142:24` | 6 | Image, missing-image and loading surfaces |
| Status Panel | `145:30` | 4 | Empty, offline, error and success outcomes |
| List Row | `147:68` | 9 | Settings, navigation and state summaries |
| Top App Bar | `149:26` | 3 | Root, back and close contexts |
| Bottom Navigation | `151:38` | 3 | Gated destination patterns, not approved launch IA |
| Bottom Sheet | `152:44` | 2 | Compact and expanded contextual decisions |
| Dialog | `154:30` | 2 | Confirmation and destructive decisions |
| Decision Option | `155:35` | 4 | Comparable recommendation choice |
| Recommendation | `157:87` | 3 | Single, shortlist and hybrid D0 exposure |
| Recipe Card | `160:93` | 4 | Featured, compact, saved and unavailable recipes |
| Ingredient Row | `161:75` | 3 | Available, missing and optional ingredients |
| Cooking Step | `162:78` | 3 | Upcoming, active and completed cooking steps |

Private components `__Icon/Arrow Right` (`124:4`), `__Icon/Close` (`124:7`) and `__Icon/Menu`
(`124:10`) keep repeated vector geometry consistent without publishing an incomplete icon library.

Component pages are split by responsibility:

- `03.1 · Actions` (`113:2`);
- `03.2 · Inputs & Selection` (`113:3`);
- `03.3 · Feedback & Status` (`113:4`);
- `03.4 · Navigation & Surfaces` (`113:5`);
- `03.5 · Product Components` (`113:6`).

## Migrated product artifacts

### Decision concept

[`Concept 01 · DS v1 migration`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=167-26)
(`167:26`) contains six 390 by 844 screens: context, D0-A single, D0-B shortlist, D0-H hybrid,
accepted and safe-empty. The three D0 modes use the same viewport, component family, recipe quality,
CTA semantics and implementation fidelity.

### Client-flow mapping

[`Client flows · DS v1 mapping`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=170-2)
(`170:2`) maps 20 flow responsibilities to reusable component contracts across decision/input,
safety/recovery, recipe/cooking and navigation/re-entry. The original 12-lane map remains the source
for sequence, gates and analytics ownership.

### P0 mobile pass 02

[`P0 Mobile · Pass 02 · DS v1`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=173-71)
(`173:71`) rebuilds all 16 F01-F04 screens at 390 by 844 from Core Design System v1 components:

- F01 entry and first value: `174:13`, `174:36`, `174:66`;
- F02 core decision and D0: `176:5`, `176:34`, `176:73`, `176:138`, `176:204`;
- F03 rejection, replacement and recovery: `177:5`, `177:34`, `177:64`, `177:91`;
- F04 recipe, adaptation and cooking: `178:12`, `178:52`, `178:88`, `178:128`.

Safe-empty copy states that restrictions remain active. Adaptation warns that substitutions must
preserve allergies and hard dietary rules. Offline recovery exposes only saved content. Completion
keeps the next action explicit.

### Stage 0 research prototype

[`Stage 0 Research Prototype`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=187-2)
(`187:2`) reuses Core Design System v1 for A single, B shortlist and H hybrid
stimuli, a bounded C browse/search control, a separate D Pantry-first exercise and recovery paths.
Six top-level prototype starting points make the flows runnable without turning any option into
launch policy. Focused small-iPhone, Android and 125% large-text frames provide adaptation evidence.
The exact nodes, moderator protocol, analytics ownership and creation review are documented in
`stage-0-research-prototype.md`.

## Creation review

The foundations, component category pages, migrated concept, flow mapping and P0 Pass 02 were
rendered after construction. The 2026-08-10 audit confirmed:

- 20 component sets and exactly 128 variants;
- no interactive component variant below the 44 px minimum target;
- 16 P0 Pass 02 screens and six concept screens at 390 by 844;
- only Fraunces and Source Sans 3, with no missing fonts;
- component instances for all repeated product patterns in the migrated screens;
- equal-fidelity A single and B shortlist bounds plus an intentionally hierarchical H candidate;
- the shared Hybrid component at `157:54` uses `Best match for tonight` and `Other good fits`;
- current Hybrid product/reference screens `168:145`, `176:138`, `192:1167` and `204:1149`
  show one dominant primary and two quieter alternatives with factual benefit/cost labels;
- explicit success, warning, danger, disabled, safe-empty and offline semantics;
- no gradients, decorative glass, feed-like browsing, gratuitous cards or color-only status;
- English copy and layer naming throughout the new implementation reference.

The 2026-08-11 research-prototype review additionally confirmed 27 runner frames, 48 interactive
sources, six starting points, zero invalid destinations, zero interactive targets below 44 px,
zero remaining placeholders and only the two approved font families.

The 2026-08-14 Hybrid alignment review covered the shared component and all four current reference
instances. It found the expected copy in every subtree, only Fraunces and Source Sans 3, no missing
fonts, gradients, placeholders or reaction sources below 44 px, and no truncation in the 117 px and
152 px tradeoff labels.

Food imagery remains deliberately represented by the `Media` and recipe component contracts until
the product has an approved imagery source and usage policy. Bottom-navigation labels remain gated
examples rather than approved launch information architecture.

## Engineering handoff boundary

The current React Native application does not yet consume this component system. Implementation
must first map the reviewed semantic tokens into code, then build state-complete mobile primitives,
then migrate screens flow by flow with accessibility, visual and analytics tests. Figma Code
Connect is deferred until matching source components exist; fabricated mappings would create a
false design-to-code contract.
