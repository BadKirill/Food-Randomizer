# Target database model

This is the logical model for PostgreSQL/Prisma. Physical names use `snake_case` through Prisma
`@@map`/`@map` when introduced. Existing table/column names are preserved during expand/migrate/
contract; naming cleanup is not combined with functional migration.

## 1. Identity and profile

### `users` (existing, retained)

Authentication account only: `id`, normalized `email`, `password_hash`, timestamps. Add role and
account lifecycle status. Product behavior references `product_identities`, not email.

Indexes/constraints:

- unique normalized email when not null;
- role enum: `user`, `content_editor`, `content_reviewer`, `admin`;
- password/session data never participates in analytics queries.

### `product_identities`

| Column           | Type                       | Rule                                               |
| ---------------- | -------------------------- | -------------------------------------------------- |
| `id`             | text/CUID PK               | Stable analysis/domain identity.                   |
| `user_id`        | FK users, nullable, unique | Null for guest.                                    |
| `merged_into_id` | self FK, nullable          | Terminal identity after account merge.             |
| `status`         | enum                       | `active`, `merged`, `deletion_pending`, `deleted`. |
| timestamps       | timestamptz                | created/updated/deleted.                           |

`merged_into_id != id`. A merged identity is read-only. Domain rows are moved to the terminal
identity in the same transaction; the link remains for late/retried requests.

### `anonymous_identities`

`id`, unique UUID `anonymous_id`, `product_identity_id`, platform, app-first-version, first/last
seen timestamps. Many device identities may point to one product identity. Index
`(product_identity_id, last_seen_at desc)`.

### `user_profiles`

One-to-one with product identity. Diet enum, default servings/max time, goal weight JSON constrained
to known keys/range, personalization enabled, locale/timezone, onboarding version/completed time,
nutrition disclaimer acknowledgement and optimistic `version`.

Use join tables for allergens, excluded/preferred ingredients, cuisines and equipment. Do not put
these safety-critical identifiers only in JSON.

## 2. Catalog

### `dishes` (existing, expanded)

Retain ownership and timestamps. Add:

- `publication_status`: draft, review, published, rejected, archived;
- `source_type`: system, user, ai_draft, imported;
- `visibility`: private, household, public;
- prep/cook/total minutes, difficulty, default servings;
- calories/protein/fat/carbs per serving plus nutrition source/confidence;
- quality score, content version, verified by/at;
- primary ingredient and meal-form taxonomy references;
- image media reference; legacy `imageUrl` is migrated then retired.

Indexes:

- partial eligibility index on published/non-archived/verified rows;
- `(created_by_id, visibility, updated_at desc)`;
- `(publication_status, quality_score desc)` for review/admin;
- GIN only for measured array/JSON query needs; normal relationships use join indexes.

### `ingredients`

Canonical name/key, category, vegan/vegetarian booleans, optional nutrition per 100g and source,
verification state/timestamps. `ingredient_aliases` stores normalized alias + locale with a unique
constraint. `ingredient_allergens` is a many-to-many relationship.

Diet flags and allergen mappings require reviewer provenance. Unknown is not equivalent to safe.

### `dish_ingredients`

Composite uniqueness `(dish_id, position)`. Fields: ingredient FK, decimal quantity, normalized
unit enum/reference, original amount text during migration, optional flag, group, preparation note.
`dish_ingredient_substitutions` links a row to allowed alternative ingredient plus conversion note.

### `recipe_steps`

Existing steps are retained. Add stable ID, position, text, optional timer seconds, section, media
and equipment links. Unique `(dish_id, position)`; timer must be non-negative.

### Taxonomy and eligibility

Normalized join tables cover meal types, cuisines, goals, equipment and allergens. A materialized
eligibility projection may be introduced after profiling, but source relationships remain
normalized. `dish_publication_checks` stores check key, pass/fail/unknown, details, content version
and checker version. Publication is allowed only when all required checks pass.

### `dish_media`

Storage key, CDN URL, kind, dimensions, blur hash, ownership/license/attribution, moderation state,
created/deleted timestamps. Database stores no binary. Unique storage key.

## 3. Recommendation and learning

### `recommendation_sessions`

| Column                                       | Purpose                                                         |
| -------------------------------------------- | --------------------------------------------------------------- |
| `id`, `product_identity_id`                  | Session ownership.                                              |
| `idempotency_key`                            | Unique per identity and operation.                              |
| `context`                                    | Immutable validated context snapshot.                           |
| `algorithm_version`, `configuration_version` | Reproducibility.                                                |
| `presentation_assignment`                    | Stable policy/experiment snapshot: single, shortlist or hybrid. |
| `status`                                     | active, accepted, exhausted, empty, failed, expired.            |
| `started_at`, `decided_at`, `expires_at`     | Funnel timing.                                                  |

Unique `(product_identity_id, idempotency_key)`. Index identity/time and status/time.

### `recommendation_exposures`

Session FK, exposure sequence, presentation mode (`single`, `shortlist`, `hybrid`), result count,
policy/experiment version, shown time and client acknowledgement time. Unique
`(session_id, exposure_sequence)`. The first exposure may contain one to three results; a later
`Another` creates a new exposure instead of rewriting the first.

### `recommendations`

Exposure/session/dish FKs, position within exposure, global offer index, component scores, final
score, candidate pool size, reason code array, selection role, nullable tradeoff code/direction,
numeric delta/unit, reference recommendation FK, random seed and accepted time. In Hybrid,
position 1 is `primary`; positions 2-3 are `alternative` and compare against position 1. Unique
`(exposure_id, position)`, `(session_id, offer_index)` and `(session_id, dish_id)`. Keep both
`position` and `offer_index`: the former measures simultaneous shortlist choice; the latter
measures the total sequence of offers. Index `(product_identity_id denormalized only if profiling
proves necessary)` is avoided initially; join via session.

### `recommendation_candidate_audits`

Optional sampled/short-retention debugging table: session, dish, eliminated reason or component
scores. Do not persist every candidate forever. Retention/configuration is explicit.

### `interactions`

Identity, recommendation/session/dish, typed action, typed reason, ingredient reference when
applicable, preference effect, context and timestamp. Unique `(product_identity_id,
idempotency_key)`. Never overload `not_in_mood` as permanent dislike.

### `preference_signals`

Identity, dimension/key, signed weight, source (`explicit`, `interaction`, `cooking`, `saved`),
confidence, evidence interaction, decay policy and timestamps. Explicit bans remain profile join
tables, not weighted signals. Unique active signal strategy is defined by dimension/source/evidence.

### `saved_dishes`

Identity, dish, intent (`favorite`, `cook_later`), source recommendation and timestamps. Unique
`(product_identity_id, dish_id, intent)`.

### `cooking_sessions`

Identity, dish and exact content/variant version, recommendation, status (`started`, `completed`,
`abandoned`), servings and timestamps. State transitions are monotonic and idempotent.

## 4. Pantry and AI

### `pantry_items`

Identity, canonical ingredient, optional quantity/unit/expiry, source (`manual`, `photo`), confirmed
flag and timestamps. Photo detections cannot create confirmed items directly. Index identity and
ingredient; soft-delete or history table supports user-visible history.

### `media_uploads` and `recognition_jobs`

Upload state, owner, object key, MIME/size/hash, retention deadline, job status/provider/model,
latency/cost/error. `recognition_candidates` stores canonical ingredient, confidence, user decision
and correction. Deletion removes object and records the audit outcome.

### `recipe_variants`

Identity, base dish and base content version, immutable structured recipe JSON validated by a
versioned schema, request/prompt hash, provider/model/prompt version, validation report/status,
accepted/saved timestamps, token/cost/latency. Never overwrite the base dish.

### `ai_jobs`

Idempotency key, operation, status, input hash, output reference, attempts, next attempt, lease,
provider metadata and error. Raw prompt/output retention is separately configured and encrypted or
redacted; production analytics receives no raw text.

## 5. Entitlements and configuration

### `plans`, `entitlements`, `plan_entitlements`

Plans and entitlement keys are data-driven but key names are allowlisted in code. Plan entitlement
stores limit, UTC period, enabled state and configuration. Safety/basic recommendation entitlements
are always included in free plans.

### `plan_assignments` and `subscription_events`

One active assignment per identity with source (`system`, `beta_override`, `revenuecat`), status,
trial/subscription end and external customer ID. Subscription events have unique provider event ID,
body hash, received/processed state and error for webhook idempotency/audit.

### `usage_counters` and `usage_reservations`

Counter unique `(product_identity_id, entitlement_key, period_start)`, with used/reserved and
limit snapshot. Reservation has idempotency key, amount, expiry and committed/released state.
Reserve/check/update is one transaction with row locking or atomic conditional update.

### `feature_configs` and `config_revisions`

Key, environment, enabled, public allowlist flag, typed payload, version, rollout metadata and
audit actor. Unique `(key, environment)`; revisions are immutable. Server validates bounded values
(for example scoring weights sum and range) before activation.

## 6. Events and operations

### `product_events`

Unique UUID event ID, name, schema version, source/environment, identity references, occurred and
received timestamps, request/session/exposure correlation, experiment assignment snapshot and
privacy-reviewed JSON properties. Partition by month only when table size/retention justifies it.

### `outbox_messages`

Event/domain reference, destination, payload, status, attempts, next attempt, lease, delivered and
last error. Index `(status, next_attempt_at)` and use `FOR UPDATE SKIP LOCKED` in workers. Dead-letter
after bounded attempts with alerting and replay tooling.

### Audit and deletion

`audit_logs` records actor/admin action, target, before/after hashes, request and timestamp for
content, config, entitlement and privacy operations. `privacy_requests` tracks export/deletion
state across DB, objects, analytics and support systems.

## 7. Legacy mapping

| Legacy                            | Target                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Dish.dishType=usual`             | diet coverage `everything`; retain original during dual-read.                                                            |
| `DishIngredient.name/amount/unit` | resolved canonical ingredient + numeric quantity; preserve original text.                                                |
| `DishStep`                        | `recipe_steps` with same ID/dish/position/text.                                                                          |
| `DishHistory`                     | backfill recommendation session + shown recommendation where provenance permits; mark `algorithm_version=legacy_random`. |
| `Dish.createdById`                | unchanged owner user; link owner product identity for private recipe access.                                             |
| `DishImage`                       | media/object record; migrate URL and license status without downloading blindly.                                         |
| `AiGeneration`                    | legacy AI audit; do not treat as validated RecipeVariant.                                                                |

Backfills never invent safety facts. Unknown allergen, quantity, nutrition, license or verification
is explicitly unknown and makes a dish ineligible for affected strict scenarios.
