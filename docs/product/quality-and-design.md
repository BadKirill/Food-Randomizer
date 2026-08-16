# Design and quality operating model

## 1. Design workflow

Figma is the collaboration and interaction-spec tool. The design system is token-first and uses
Figma Variables for color, type, spacing, radius, elevation and semantic state. Reviewed token
JSON in the repository is the implementation source for mobile and future admin web.
All project design work uses only the canonical file and deny-by-default policy defined in
`docs/product/figma-governance.md` and `design/figma-project.json`.

All current agent-facing, research-facing and product-facing copy in the canonical Figma file is
English. Other languages appear only in explicit localization-expansion test artifacts; they must
not be introduced into reusable component defaults or ordinary product frames.

Required Figma pages:

1. Foundations and accessibility.
2. Components with variants and states.
3. Onboarding and first-value flow.
4. Home, filters and recommendation.
5. Recipe and Cooking Mode.
6. Saved, history and My recipes.
7. Pantry and photo confirmation.
8. Profile, auth and preference correction.
9. Premium preview, limits, paywall and subscription.
10. Prototypes, content rules and redlines.

Before the recommendation page becomes an approved product spec, add a `Stage 0 concepts` page:

- equal-fidelity A/B bounds for one recommendation and an equally weighted shortlist;
- an H candidate with one dominant recommendation plus two quieter, factual tradeoff options;
- a feed/search control for H3, clearly separate from a Pantry-first concept for H7;
- randomized presentation order and identical recipe quality, explanations and CTA semantics;
- a moderator annotation layer that is hidden from participants;
- do not reveal the founder preference to participants or add decorative polish that confounds the
  interaction comparison.

The component library implements `Decision Option` and `Recommendation` from shared primitives.
Single, Shortlist and Hybrid remain reversible presentation modes; Hybrid intentionally contains
one dominant primary and two quieter alternatives.

Every screen is delivered in default, loading/skeleton, empty, error, offline, long text, large
font, missing image, disabled, Premium locked and limit-reached states where applicable. Include
small iPhone, large iPhone and representative Android widths; portrait is P0.

Component handoff includes:

- anatomy, variants, states and interaction behavior;
- semantic tokens rather than raw colors/spacing;
- min/max dimensions and text wrapping;
- safe-area and keyboard behavior;
- accessibility name, role, state, hint and focus order;
- image ratio/crop/fallback and reduced-motion behavior;
- localization expansion examples (English + 30% expansion; Serbian/Russian when supported).

The current green/Starbucks-inspired document is not the final brand source. Preserve warmth,
large tap targets and the recognizable decisive CTA, but validate a distinct RandoMeal identity
through discovery and accessibility checks.

### Foundation v1

The first approved foundation is implemented in the only authorized Figma file,
[`RandoMeal — Product Design`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj), and mirrored
as reviewed implementation input in `design/foundations.tokens.json`.

The Figma variable inventory is exact:

| Collection | Variables | Mode  | Purpose                                                |
| ---------- | --------- | ----- | ------------------------------------------------------ |
| Primitives | 33        | Value | Ivory, Graphite, Paprika and state source values       |
| Color      | 29        | Light | Semantic background, text, border and icon aliases     |
| Spacing    | 7         | Value | 0, 4, 8, 12, 16, 24 and 32 px                         |
| Radius     | 5         | Value | none, small, medium, large and full                    |
| Size       | 4         | Value | 36, 44 and 52 px controls plus the 44 px touch minimum |

The total is 78 variables. Semantic colors alias primitives; components must not bind directly to
raw palette values. The approved base palette is warm Ivory, neutral Graphite and action-focused
Paprika. Success, warning, danger and disabled states are explicit. Only the Light color mode is
approved in this foundation; a dark mode requires separate product and accessibility validation.

Every variable declares platform syntax with exact platform keys:

- Web: CSS custom-property references such as `var(--rm-color-bg-app)`;
- iOS: `RMTokens` names such as `RMTokens.Color.bgApp`;
- Android: `RmTokens` names such as `RmTokens.colorBgApp`.

The type system contains ten local styles. Fraunces is reserved for expressive display text and
Source Sans 3 is used for interface, body and label text. Both families use the SIL Open Font
License 1.1 and therefore require no commercial font licence:

- Fraunces: <https://github.com/undercasetype/Fraunces>
- Source Sans 3: <https://github.com/adobe-fonts/source-sans>

The Figma file also contains two restrained elevation styles, a 1440 px cover, and a variable-bound
Foundations page documenting all 33 primitives, all 29 semantic colors, typography and the numeric
scales. Validation on 2026-07-28 found no broken aliases, unrestricted scopes, missing platform
syntax, missing fonts or text overflow. Ivory text on the Paprika brand background has a WCAG
contrast ratio of 4.67:1. Mobile still uses its current hard-coded theme until a separate
implementation task migrates it to this reviewed source.

### Core Design System v1

The canonical file now contains a creation-reviewed component library with 20 component sets and
128 variants across actions, inputs and selection, feedback and status, navigation and surfaces,
and product components. Three private icon components support repeated arrow, close and menu
geometry. Every interactive variant respects the 44 px minimum target.

The full inventory, node IDs, migration references and engineering handoff boundary are recorded in
`docs/product/design-system-v1.md` and `design/figma-design-system-v1.json`. Matching source
components do not yet exist, so Figma Code Connect remains intentionally deferred.

### Decision flow concept 01

The canonical file contains a first reversible decision-flow exploration on
[`05 · Decision Flow · Concept 01`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=34-5).
It covers minimal context capture, equal-fidelity D0-A single and D0-B shortlist arms, accepted
cooking start and a safe empty state. It also introduces token-bound `Button`, `Choice chip` and
`Decision option` component sets with the states required by those screens. The artifact inventory,
node IDs, constraints and creation review are recorded in
`docs/product/decision-flow-concept-01.md`. This remains Stage 0 exploration and does not approve a
launch cardinality or replace the required moderated evidence gate. The concept, component
defaults and instance overrides use English copy throughout.

The implementation-oriented
[`Concept 01 · DS v1 migration`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=167-26)
adds a Hybrid arm and rebuilds all six states from Core Design System v1 instances. The 2026-08-14
founder direction makes Hybrid the working target while Single and Shortlist remain comparison and
rollback modes. The original board remains preserved as discovery evidence.

### Client flow skeleton

The canonical file also contains an editable low-fidelity product journey map on
[`06 · Client Flows · Skeleton`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=58-3).
It covers 12 client-facing lanes and 90 checkpoints across first value, recommendation, rejection,
recipe and cooking, saved content, Pantry, account and privacy, Premium, re-entry, cross-cutting
states, gated scope and analytics ownership. The complete inventory and node links are recorded in
`docs/product/client-flow-skeleton.md`.

The map is a coverage artifact rather than approved launch navigation or final UI. D0/H3
cardinality, H7 Pantry value and H10 payment remain explicit branches or gates. All visible colors
are bound to semantic variables, approved OFL typography is used, and the 2026-07-29 creation
review found no clipping, overlap, unbound paint or unequal-fidelity D0 treatment.
The complete map uses English copy throughout.

The companion
[`Client flows · DS v1 mapping`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=170-2)
maps 20 flow responsibilities to reusable component contracts without changing the original map's
sequencing, gates or analytics ownership.

### P0 mobile wireframes pass 01

The first screen-level P0 pass is implemented on
[`07 · P0 Mobile Wireframes · Pass 01`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=75-3).
It contains 16 editable 393 by 852 screens for F01-F04: guest-first entry, safety and situational
context; loading plus single, shortlist and hybrid D0 variants; rejection,
replacement, safe-empty and offline recovery; and recipe, safe adaptation, cooking and completion.

The pass reuses the local `Button`, `Choice chip` and `Decision option` component sets and binds all
visible manual paint to Foundation v1 semantic variables. Its creation review found no placeholder,
direct-child overflow, unbound paint or sub-44 px component instance. The artifact is documented in
`docs/product/p0-mobile-wireframes-pass-01.md` and remains a reversible interaction specification,
not a signed launch policy or final visual brand. All 16 screens and their component overrides use
English copy.

The implementation-oriented
[`P0 Mobile · Pass 02 · DS v1`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=173-71)
rebuilds the same 16 F01-F04 states at 390 by 844 using the complete component library. The review
found only the approved OFL font families, no missing fonts and reversible Single, Shortlist and
Hybrid recommendation modes.

## 2. QA strategy

```text
Many:   pure domain and component tests
Some:   repository/integration and API contract tests
Few:    device E2E critical journeys
Always: production telemetry and synthetic health checks
```

| Layer     | Tools                                                   | Required scope                                                                      |
| --------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Domain    | Jest, property-based tests where valuable               | hard filters, scoring, repeat rules, serving math, entitlements, merge conflicts    |
| API       | Supertest + real PostgreSQL/Testcontainers              | auth, idempotency, transactions, migrations, problem responses                      |
| Contracts | Zod fixtures and compatibility tests                    | mobile/API request and response examples                                            |
| Mobile    | Jest + React Native Testing Library                     | screen states, accessibility, analytics calls, offline/retry                        |
| Visual    | Storybook snapshots and screenshot review               | tokens/components across platforms and font scales                                  |
| E2E       | Maestro on EAS/dev binaries                             | first value, guest persistence, account link, recommendation, save, cooking, limits |
| Analytics | schema fixtures + event integration tests               | exposure cardinality, owner, deduplication, assignment and funnel joins             |
| Load      | k6                                                      | recommendation/read endpoints, idempotent retries, pool extremes                    |
| Security  | dependency scan, secret scan, Semgrep/CodeQL, OWASP ZAP | auth, uploads, admin, webhooks, PII/logging                                         |
| AI eval   | versioned fixture set                                   | schema, forbidden ingredients, constraints, fallback, cost/latency                  |

## 3. Critical invariant suite

These tests block release and cannot be muted as flaky:

- vegan candidates contain no animal-derived canonical ingredient;
- vegetarian candidates contain no meat/fish ingredient;
- all actor allergens and permanent exclusions remove a candidate;
- uncertain ingredient/allergen mapping fails closed;
- permanently hidden dishes never return;
- the last 10 shown dishes are excluded unless the user explicitly accepts a documented small-pool
  relaxation that never relaxes safety;
- AI never mutates the canonical recipe and variants reference the exact base content version;
- post-generation hard-constraint validation runs before a variant can be shown/accepted;
- serving changes scale quantities and total nutrition while preserving per-serving values;
- retries with the same idempotency key do not create a new session, interaction, usage charge or
  cooking transition;
- entitlement and usage checks are server-side and atomic under concurrency;
- account merge preserves guest history, saved dishes, Pantry and usage without duplication;
- user recipe IDs/ownership survive every migration and rollback rehearsal;
- empty candidate pools return a bounded, actionable response, never an endless loader.
- presentation mode changes only exposure shape: hard-filter results and candidate scores are
  identical for the same actor/context/config/seed;
- an exposure contains 1-3 unique recommendations with contiguous positions, and idempotent retry
  returns the same exposure/order;
- sequential `Another` creates a new exposure and advances offer indexes without double-counting
  the original impression.

Recommendation matrix generation covers:

```text
Diet x Meal type x Time x Goal x Pantry x Exclusions x History x Entitlement
```

Use pairwise generation for routine CI plus explicit full combinations for safety dimensions.

## 4. AI evaluation

Version evaluation cases in Git with input canonical recipe, user request, hard constraints,
expected structural changes, forbidden ingredients, nutrition tolerance and expected schema. Start
with every case listed in the PRD and add each production failure as a regression.

Release gates for an AI prompt/model version:

- 100% hard-constraint validation pass on safety fixtures;
- > =95% schema + domain validation pass;
- no canonical mutation;
- bounded retry/fallback behavior;
- cost and P95 latency within configured budgets;
- human culinary review sample approved;
- prompt/model/config version emitted in every event.

## 5. Accessibility and localization gates

- WCAG 2.2 AA color contrast.
- 44x44 pt minimum targets, logical focus, screen-reader labels and state.
- Dynamic Type / large font without clipped actions or hidden content.
- Reduced motion, adequate non-color status indicators, accessible error summaries.
- All user strings use localization keys; no concatenated sentences.
- Test LTR now; avoid layouts that make future RTL impossible.

## 6. CI and release gates

Pull requests:

1. format/lint/typecheck all workspaces;
2. contract and domain tests;
3. API unit + real DB integration tests;
4. migration from a production-shaped snapshot and schema drift check;
5. mobile unit/component tests;
6. dependency, secret and static security scans;
7. changed critical Maestro smoke flow when applicable.

Release candidate:

- signed iOS/Android EAS builds tested on supported OS/device matrix;
- full critical Maestro suite;
- content coverage and safety report green;
- k6 smoke meets SLO;
- Sentry release/source maps and PostHog environment verified;
- feature kill switch and rollback exercised;
- database backup, restore and forward-fix migration rehearsed;
- privacy text/store metadata/support runbook complete.

Suggested initial SLOs (validate under beta traffic):

- API availability: 99.9% monthly for recommendation/profile reads;
- non-AI recommendation latency: P95 <500 ms server-side, P99 <1 s;
- crash-free mobile users: >=99.5%;
- authoritative event outbox delivery: 99.9% within 5 minutes;
- hard dietary constraint violations: 0.

## 7. Definition of Done

A product task is done only when code, contracts, migrations/backfill, tests, analytics, feature
flag, accessibility, localization, docs/runbook and rollback impact are handled as applicable. A UI
that renders the happy path without these parts is not done.

## 8. Discovery quality gate

Stage 0 is a release dependency, not an informal design workshop:

- complete 12 interviews in batches of three; recruit up to three more only for unstable evidence;
- log exact quotes/actions and participant-level H1-H10 outcomes in the workbook;
- count participants rather than quote volume;
- record concept order to detect ordering bias;
- keep H3 (choice presentation) and H7 (Pantry value/input) separate;
- lock GO/PIVOT/STOP thresholds before synthesis;
- attach a signed decision record (`GO_SINGLE`, `GO_HYBRID`, `PIVOT_SHORTLIST`, another pivot, or
  `STOP`) before approving Phase 2 recommendation UX.

Research output must identify evidence gaps and dissenting participants. "Users liked it" is not
acceptance evidence without a recent problem, observed behavior or explicit trade-off.
