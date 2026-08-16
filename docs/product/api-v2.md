# REST API v2 surface

Base path: `/v1`. JSON requests/responses are validated by `@food/contracts`. Legacy endpoints
remain available during migration but are not extended with new product behavior.

## Common protocol

Headers:

- `Authorization: Bearer ...` for linked account operations;
- `X-Anonymous-Id` on every mobile request, including authenticated requests;
- `X-Request-Id` optional from client, always returned;
- `Idempotency-Key` required on listed commands;
- app version/platform/locale headers for compatibility and observability.

Errors use `application/problem+json`:

```json
{
  "type": "https://api.randomeal.app/problems/no-candidates",
  "title": "No meals match these filters",
  "status": 422,
  "code": "recommendation_no_candidates",
  "requestId": "...",
  "details": {}
}
```

The client maps stable `code` to localized friendly copy. Technical/provider messages are never
shown directly.

## Identity and auth

| Method/path                | Auth             | Purpose                                                 |
| -------------------------- | ---------------- | ------------------------------------------------------- |
| `POST /identity/anonymous` | anonymous ID     | Resolve/create product identity.                        |
| `POST /auth/register`      | guest            | Create account and atomically merge guest data.         |
| `POST /auth/login`         | guest            | Create session and link/merge current guest identity.   |
| `POST /auth/logout`        | session          | Revoke current session; product guest ID remains local. |
| `GET /me`                  | guest/session    | Product identity/account summary.                       |
| `DELETE /me`               | session + reauth | Start privacy deletion workflow.                        |

## Profile and configuration

| Method/path                       | Notes                                                                    |
| --------------------------------- | ------------------------------------------------------------------------ |
| `GET /profile`                    | Effective explicit profile and learned preference summary.               |
| `PATCH /profile`                  | Optimistic version; field-level validation.                              |
| `DELETE /profile/history`         | Delete personalization/cooking/recommendation history by scope.          |
| `POST /profile/preferences/reset` | Idempotent learned-preference reset.                                     |
| `GET /config`                     | Only public allowlisted flags/config; includes version and cache policy. |
| `GET /entitlements`               | Effective server result and limits.                                      |
| `GET /usage`                      | Current periods; informational, not authorization.                       |

## Catalog and saved

- `GET /dishes/{id}` - canonical/private accessible dish with content version.
- `POST /dishes`, `PATCH /dishes/{id}`, `DELETE /dishes/{id}` - private user recipes; idempotency
  and optimistic concurrency where applicable.
- `GET /saved?kind=favorite|cooked|my_recipe|custom_version` - cursor pagination.
- `PUT /saved/{dishId}` and `DELETE /saved/{dishId}` - idempotent save state.
- `/admin/*` - separate RBAC-protected review/publish/taxonomy/media surface, never mobile user auth
  by obscurity or a shared write token.

## Recommendations and interactions

### `POST /recommendations`

Requires `Idempotency-Key`. Creates a session when `sessionId` is absent; with a session it returns
the next exposure using the immutable session context unless an explicit context-change command
starts a new session.

Success contains one exposure with one to three ordered results. Every result contains a dish,
exact content version, explanation, pantry match and recommendation metadata. Exposure metadata
contains `presentationMode`, `resultsShown`, policy/experiment version and exposure sequence. The
server, not the client, chooses result count from stable assignment/configuration. An empty pool is
a typed bounded response with elimination counts and only safe soft-filter relaxations. Normal
recommendation never invokes AI.

`single` returns one result. `shortlist` returns two or three simultaneously. `hybrid` returns one
primary result and two lower-emphasis alternatives in the same exposure. Before Hybrid is
implemented, the shared target contract must add the fields below; the current
`packages/contracts/src/product-v2.ts` schema does not contain them yet. Hybrid position 1 has
`selectionRole=primary`; positions 2-3 have `selectionRole=alternative` and a typed tradeoff
comparison against position 1. The comparison contains a stable code, direction, numeric delta and
unit derived from verified recipe facts; the API never sends an unsupported `healthier` claim.
A sequential `Another` call returns
a new exposure and advances the session-wide offer index; it never mutates an earlier exposure.
Repeated requests with the same idempotency key return the identical exposure and ordering.

- `GET /recommendations/{id}` - retrieve exact persisted result.
- `GET /recommendation-exposures/{id}` - retrieve exact persisted exposure and ordering.
- `POST /recommendations/{id}/interactions` - typed action/reason; idempotent.
- `POST /recommendation-sessions/{id}/context` - create successor session with changed context;
  do not mutate the historical snapshot.

## Cooking

- `POST /cooking/{dishId}/start` - idempotent; snapshots dish/variant content version.
- `POST /cooking/sessions/{id}/complete` - monotonic transition.
- `POST /cooking/sessions/{id}/abandon` - optional explicit state.
- `GET /cooking/history` - cursor pagination and delete/export semantics.

## AI adaptation

- `POST /recipes/{dishId}/adjust` - reserve usage and create/reuse job; returns `202` for async.
- `GET /ai-jobs/{id}` - bounded polling with terminal status.
- `GET /recipe-variants/{id}` - validated diff/structured result.
- `POST /recipe-variants/{id}/accept` - idempotent, rechecks current constraints.
- `DELETE /recipe-variants/{id}` - user deletion.

Timeout/provider/schema/safety failure never changes the base recipe and releases or correctly
accounts for the usage reservation according to configured policy.

## Pantry and photo

- `GET /pantry`, `POST /pantry/items`, `PATCH /pantry/items/{id}`,
  `DELETE /pantry/items/{id}`.
- `POST /uploads` returns signed upload target and constraints.
- `POST /pantry/recognitions` creates recognition job from a completed owned upload.
- `GET /pantry/recognitions/{id}` returns candidates/confidence.
- `POST /pantry/recognitions/{id}/confirm` accepts corrected canonical item IDs; only this command
  creates confirmed Pantry items.

## Subscription lifecycle

- `POST /subscriptions/restore` requests client/store restore then refreshes server state.
- `POST /webhooks/revenuecat` validates signature, stores provider event idempotently and updates
  plan assignment/entitlements.
- `GET /subscriptions/status` reports normalized lifecycle but never accepts client-premium claims.

## Compatibility and deprecation

Responses carry `Deprecation`/`Sunset` headers when a legacy route is scheduled for removal. Mobile
minimum supported versions are remotely controlled only for compatibility notices; emergency
server changes must keep safety and basic recommendation available whenever possible.
