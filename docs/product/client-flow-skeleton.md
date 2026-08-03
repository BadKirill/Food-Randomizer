# Client flow skeleton

## Status

The canonical Figma file contains an editable low-fidelity map of the client journeys required by
the product specification:

- page: `06 · Client Flows · Skeleton` (`58:2`);
- board:
  [`Client flows · Low-fi skeleton`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=58-3)
  (`58:3`);
- coverage: 12 lanes and 90 mapped checkpoints;
- review status: creation-reviewed on 2026-07-29.

This is a coverage and sequencing artifact. It is not approved launch navigation, production UI,
or evidence that an open discovery gate has been resolved.

## Product constraints represented

- The primary journey moves a person from uncertainty to a trusted cooking decision in less than
  30 seconds without introducing a browsing feed.
- The first-value path is guest-first. Account creation is deferred until it protects or extends
  already-created value.
- Hard dietary safety fails closed. An unsafe or uncertain result is never shown as a normal
  recommendation.
- D0/H3 remains open: single recommendation, shortlist and hybrid presentation retain equal status
  until Stage 0 evidence selects a policy.
- Pantry and photo input remain behind the H7 value gate and require explicit recognition
  confirmation before ingredients affect a recommendation.
- Real payment remains behind the H10 gate; the map covers preview, limits, restore and entitlement
  states without treating checkout as launch-approved.
- Durable recommendation, exposure, acceptance, rejection, cooking, entitlement and delivery
  events are server-owned. Presentation and interaction UX events are client-owned.

## Flow inventory

| Flow | Figma node | Checkpoints | Coverage |
| --- | --- | ---: | --- |
| F01 · Entry & first value | [`59:2`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=59-2) | 6 | Launch, value promise, safety, optional preferences, situation and first request |
| F02 · Core decision & D0 | [`59:38`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=59-38) | 7 | Context lock, exposure creation, single, shortlist, hybrid, accept and branch outcome |
| F03 · Reject, replace & recover | [`60:2`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=60-2) | 7 | Rejection, reason, replacement, safe empty, offline, retry and exit |
| F04 · Recipe, adaptation & cooking | [`60:67`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=60-67) | 8 | Recipe detail, servings, adaptation, validation, cooking session, steps and completion |
| F05 · Saved, history & My recipes | [`60:159`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=60-159) | 7 | Save, authentication boundary, library, history, user recipes, edit and delete |
| F06 · Pantry & photo confirmation | [`60:113`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=60-113) | 8 | Pantry entry, permissions, capture, recognition, confirmation, correction and H7 result |
| F07 · Account, profile, preferences & privacy | [`61:2`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=61-2) | 8 | Guest state, sign-in, merge, profile, safety settings, preferences, export and deletion |
| F08 · Premium, limits & subscription | [`61:72`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=61-72) | 8 | Preview, limit, offer, paywall gate, purchase state, restore, entitlement and fallback |
| F09 · Navigation, re-entry & resume | [`61:118`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=61-118) | 8 | Home, deep links, notifications, interrupted decisions, cooking resume and stale state |
| F10 · Cross-cutting UI states | [`62:2`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=62-2) | 8 | Loading, empty, error, offline, long text, large type, missing image and disabled |
| F11 · Gated and out-of-initial-loop registry | [`62:72`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=62-72) | 7 | Discovery, Pantry, payment, social, admin, advanced AI and broad-platform gates |
| F12 · Analytics checkpoints overlay | [`62:113`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=62-113) | 8 | Assignment, request, exposure, decision, replacement, cooking, completion and guardrails |

## Visual language and review

The map reuses the approved Ivory, Graphite and Paprika semantic palette, status colors, spacing,
radius and typography variables. Fraunces and Source Sans 3 are both available under the SIL Open
Font License 1.1. Structural containers have no unbound paint, and every visible color is bound to
a semantic variable.

The creation review verified:

- all 12 lanes are present in F01-F12 order;
- all 90 checkpoints are visible without clipping or overlap;
- D0 single, shortlist and hybrid branches have equal visual fidelity;
- H7 and H10 remain visibly gated;
- concrete product copy replaces placeholder text;
- all visible map copy and labels are English;
- no gradients, decorative UI chrome, raw colors or unlicensed typefaces are present;
- the artifact uses status color only as a secondary signal and keeps labels explicit.

## Next design pass

The first 393 by 852 screen-level conversion of the P0 portions of F01-F04 now exists at
[`P0 Mobile wireframes · Pass 01`](https://www.figma.com/design/DP7ujNqthXzWwwu1mnFhfj?node-id=75-3)
and is documented in `docs/product/p0-mobile-wireframes-pass-01.md`.

The next pass adapts the screens to a small iPhone and representative Android width, adds large-text
and localization-expansion states, and builds a clickable moderated prototype. D0-A single, D0-B
shortlist and D0-C hybrid remain reversible until signed Stage 0 evidence selects a policy.
