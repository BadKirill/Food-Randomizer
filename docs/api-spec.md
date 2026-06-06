# API Spec (v1 draft)

Base URL: `/v1`

## Health
### `GET /health`
- Response: `{ "status": "ok" }`

## Dishes
### `POST /dishes`
Create a manual dish.

### `GET /dishes/:dishId`

Requires `Authorization: Bearer <session-token>`.
Get canonical dish by ID.

### `GET /dishes`

Requires `Authorization: Bearer <session-token>`.
List dishes (filter by source/status/tags).

## Randomizer
### `POST /random/next`

Requires `Authorization: Bearer <session-token>` and records selection history for
the authenticated user.

Returns the next randomized dish with resolved add-on picks.

Request:
```json
{
  "cooldownClicks": 4,
  "dishType": "vegan"
}
```

### `GET /random`

Public random dish selection. No login or authorization header is required.

Optional query parameters:

- `dishType=usual|vegetarian|vegan`
- `cooldownClicks=1..10`

Response:
```json
{
  "dish": {
    "id": "dish_1",
    "name": "Chicken Curry",
    "ingredients": [{ "name": "chicken", "amount": "400", "unit": "g" }],
    "steps": ["Cut chicken", "Cook onion", "Simmer with spices"],
    "addOnGroups": [
      {
        "groupKey": "fresh_finish",
        "options": ["cilantro", "mint", "green onion"],
        "selected": "cilantro"
      }
    ]
  },
  "selectionMeta": {
    "cooldownApplied": 4,
    "fallbackRelaxationUsed": false
  }
}
```

## AI
### `POST /ai/dishes/generate`
Generate a candidate dish from user prompt.

### `POST /ai/dishes/infer-ingredients`
Infer normalized ingredients for a dish concept.

### `POST /ai/dishes/infer-steps`
Infer cooking steps for a dish concept.

### `POST /ai/dishes/from-image`
Recognize dish from uploaded image and return best guess + confidence.

Response should include top guesses when confidence is low.

## History
### `GET /history/selections`
Recent dish selections for user.
