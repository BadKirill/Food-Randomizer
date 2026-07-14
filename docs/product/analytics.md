# Analytics and measurement plan

## 1. Tooling decision

Use PostHog Cloud in the EU region for product analytics, feature experiments, funnels, retention
and optional privacy-reviewed replay. Use Sentry for crashes, errors and performance. Use
RevenueCat as the subscription lifecycle source only after payments launch. PostgreSQL remains the
source of truth for product actions and entitlement decisions.

Do not send raw prompts, allergy values, ingredient free text, email, image URLs, recipe private
content or auth data to analytics. Session replay is off by default and must mask all text/images
on profile, auth, Pantry photo and AI prompt surfaces.

## 2. Identity

Every event has:

| Property                                     | Meaning                                          |
| -------------------------------------------- | ------------------------------------------------ |
| `event_id`                                   | Globally unique, used for deduplication.         |
| `occurred_at`                                | Client or server occurrence time in UTC.         |
| `anonymous_id`                               | Stable installation ID when available.           |
| `product_identity_id`                        | Server product identity; preferred analysis key. |
| `user_id`                                    | Account ID when linked; never email.             |
| `session_id`                                 | App analytics session.                           |
| `request_id`                                 | API correlation ID when relevant.                |
| `app_version`, `build`, `platform`, `locale` | Release context.                                 |
| `experiment_assignments`                     | Key/variant snapshot used for this action.       |
| `schema_version`                             | Event payload version.                           |

On login/signup, identify the account and alias only through the documented merge flow. Logout
resets the SDK to an anonymous state without generating a new installation identity.

## 3. Event ownership

To prevent double counting:

- Client owns actual impressions/exposures, screen opens, taps, form changes, onboarding and
  fake-door intent. A server response is not proof that the user saw it.
- Server owns recommendation requested/generated/empty/failed, accepted interactions, saved state,
  cooking state, AI result/cost, usage, entitlement and subscription webhook outcomes.
- A client may emit `*_clicked`; it must not emit a server outcome such as `cooking_completed`.
- Server writes authoritative product events and outbox records in the same transaction as the
  domain change. Consumers are at-least-once; `event_id` makes delivery idempotent.

## 4. Naming and schema rules

Keep the PRD snake_case event names. Never reuse a name with a different meaning. Add optional
properties compatibly; breaking changes create a new event or increment `schema_version` with a
documented union in the tracking contract.

All events include `source` (`mobile`, `api`, `worker`, `revenuecat`) and `environment`. Test and
development projects are separate from production.

## 5. Tracking plan

### Activation and recommendation

| Event                           | Owner  | Required properties                                                                                                  |
| ------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| `app_opened`                    | client | launch type                                                                                                          |
| `onboarding_started`            | client | entry point, variant                                                                                                 |
| `onboarding_step_completed`     | client | step key, step index, skipped                                                                                        |
| `onboarding_completed`          | client | duration, completed optional fields count                                                                            |
| `pick_clicked`                  | client | active context summary, entry point                                                                                  |
| `recommendation_requested`      | server | recommendation session, context, algorithm/config versions, idempotency replay                                       |
| `recommendation_exposure_shown` | client | session/exposure IDs, presentation mode, results shown, exposure sequence, policy/experiment version, render latency |
| `recommendation_shown`          | client | exposure/recommendation/dish IDs, position, offer index, score/rank/reason codes, pool size, pantry mode             |
| `recommendation_selected`       | client | exposure/recommendation, presentation mode, position, time since exposure                                            |
| `recommendation_empty`          | server | hard/soft filter summary, eliminated counts by reason, latency                                                       |
| `recommendation_failed`         | server | stable error code, stage, retryable, latency                                                                         |
| `another_option_clicked`        | client | exposure/current recommendation, presentation mode, offer index                                                      |
| `not_for_me_clicked`            | client | exposure/recommendation, presentation mode, position, offer index                                                    |
| `rejection_reason_selected`     | server | recommendation, typed reason, permanence level                                                                       |
| `dish_hidden`                   | server | dish, source recommendation                                                                                          |

### Value and retention

| Event                         | Owner  | Required properties                                        |
| ----------------------------- | ------ | ---------------------------------------------------------- |
| `dish_saved` / `dish_unsaved` | server | dish, save intent, source                                  |
| `recipe_opened`               | client | dish/version, source recommendation                        |
| `cooking_started`             | server | cooking session, dish/version, recommendation              |
| `cooking_completed`           | server | cooking session, dish/version, duration, completion method |
| `profile_updated`             | server | changed field keys only, source                            |
| `filters_applied`             | client | normalized filter keys, changed count                      |

### AI, Pantry and monetization

Use the PRD event list unchanged. AI events add provider/model/prompt version, latency, token/cost,
schema/safety results and fallback reason, but never prompt text. Photo events add recognition job,
item count, low-confidence count and correction count, but never image URL. Paywall events add
placement, requested feature, usage/limit, price/paywall variants, lifecycle stage and experiment.

RevenueCat webhooks are mapped idempotently to `trial_started`, `purchase_completed`,
`subscription_renewed`, `subscription_cancelled`, `subscription_expired` and restore events. Store
event ID and webhook body hash for audit; do not trust the mobile event for access decisions.

### Current MVP baseline and migration

Before changing navigation or copy, instrument the existing funnel from the discovery workbook:
`app_opened -> random_screen_viewed -> pick_tapped -> recommendation_shown -> recipe_opened`, plus
`diet_filter_opened`, `diet_filter_selected`, `recommendation_closed`, `pick_again_tapped`,
`manage_viewed`, signup and dish create/archive events.

During migration, keep legacy event names as an explicit compatibility namespace and dual-write a
canonical event with the same `event_id` correlation, never by pretending names are synonymous:

| Legacy MVP event        | Canonical product meaning                                        |
| ----------------------- | ---------------------------------------------------------------- |
| `pick_tapped`           | `pick_clicked`                                                   |
| `pick_again_tapped`     | `another_option_clicked`                                         |
| `diet_filter_opened`    | `filters_opened` with `filter_group=diet`                        |
| `diet_filter_selected`  | `filter_changed` with `filter_key=diet`                          |
| `recommendation_closed` | recommendation abandonment UI signal; no server outcome inferred |
| `manage_viewed`         | legacy navigation only; do not use as product value              |

Baseline report includes event coverage, missing/duplicate rate, existing pick-to-open conversion,
time from pick to recipe open and current repeat behavior. The baseline is frozen by app version so
the redesign is not compared to a moving definition.

## 6. Metric definitions

Definitions are versioned in `metric_catalog` documentation and implemented once in PostHog SQL
or a warehouse model.

### North Star

`weekly_successful_meal_decisions / weekly_active_product_identities`

A recommendation session counts at most one successful decision. Strength order:

1. `cooking_completed`;
2. `cooking_started`;
3. accepted recommendation (`cook_this` interaction);
4. `dish_saved` with `intent=cook_later`.

### Recommendation quality

- Decision rate = sessions with one successful decision / sessions with an exposure shown.
- First-exposure decision rate = sessions decided from exposure sequence 1 / sessions with a first
  exposure shown.
- Single first-offer acceptance = single-mode sessions accepting `offer_index=1` / single-mode
  sessions with the first exposure shown.
- Shortlist selection distribution = selected position 1/2/3 within shortlist decisions; this is
  not an acceptance-rate denominator.
- Regeneration rate = sessions requesting a later exposure / sessions with a first exposure shown.
- Exposure depth = exposures shown per session, median and P75.
- Empty rate = sessions ending empty / recommendation sessions.
- Time to decision = accepted timestamp - first request timestamp; report median and P75.
- Repeat rate = recommendations matching any of the actor's last 10 shown dishes / shown events.
- Hard-constraint violation rate must be 0; any confirmed violation is a release incident, not a
  tolerable percentage metric.

### Retention and monetization

Measure D1/D7/D30 by first value cohort and by signup cohort. Report guest and account retention
separately. Revenue metrics use store proceeds/currency-normalized values from RevenueCat exports,
not client price strings.

## 7. Initial dashboards

1. Executive: North Star, WAU, successful decisions, D7, decision rate, empty rate.
2. Recommendation health: funnel, exposure-to-decision, regeneration, exposure depth, reasons,
   latency, pool size, repeats, presentation mode, algorithm and config version comparison.
3. Content coverage: eligibility and success by Diet x Meal x Time x Goal, missing content.
4. Activation: install -> onboarding -> first pick -> first shown -> first accepted -> cooking.
5. Retention: D1/D7/D30 and weekly frequency by activation behavior.
6. AI: requests, success/schema/safety/fallback, acceptance, latency and cost per active/premium.
7. Pantry/photo: adoption, coverage lift, correction rate and repeat use.
8. Monetization intent/payments: fake doors, limits, paywall placements, trial, renewal and churn.
9. Reliability: API/mobile release, errors, crash-free users, recommendation P50/P95/P99.

Alerts:

- any hard-constraint safety test or production report;
- empty rate >2% over a statistically meaningful window;
- recommendation P95 above agreed SLO;
- event volume drop/spike >30% after release;
- outbox oldest undelivered message above 10 minutes;
- AI safety/schema rejection above 5%;
- purchase webhook delivery or entitlement reconciliation failure.

## 8. Experiment rules

- Assignment is stable by product identity and stored with the recommendation/session.
- Safety filters, allergy handling, privacy, deletion and backend entitlement enforcement are never
  experimental.
- Define hypothesis, primary metric, guardrails, minimum sample and stop rule before launch.
- Do not run overlapping experiments on the same primary funnel without interaction analysis.
- Feature flags are kill switches and rollout controls; PostHog experiments may choose variants,
  but server-owned config decides safety, limits and scoring bounds.

### Choice-model gate (H3)

Run the equal-fidelity qualitative concept test before an in-product experiment. If evidence is
still ambiguous, compare only bounded decision surfaces:

- A: one recommendation plus `Another`;
- B: two or three ranked recommendations shown together;
- optional hybrid only if interviews explicitly support one default plus visible alternatives.

Do not include a feed in the beta experiment unless Stage 0 produces a formal pivot. Stable server
assignment is stored on the recommendation session and every exposure. Primary metric is decision
rate with `cooking_started` as the strong success view; guardrails are median/P75 time-to-decision,
abandonment, regeneration, explicit rejection, hard-constraint incidents and D7. Recipe views,
card taps and session duration are diagnostics, never winning metrics. Define minimum sample and
analysis horizon after the Stage 0 baseline is known; do not invent statistical power from 12
qualitative interviews.
