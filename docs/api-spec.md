# API Spec (v1 draft)

Base URL: `/v1`

## Health
### `GET /health`
- Response: `{ "status": "ok" }`

## Dishes
### `POST /dishes`
Create a manual dish.

### `GET /dishes/:dishId`
Get canonical dish by ID.

### `GET /dishes`
List dishes (filter by source/status/tags).

## Randomizer
### `POST /random/next`
Returns next randomized dish for user with resolved add-on picks.

Request:
```json
{
  "userId": "usr_123",
  "cooldownClicks": 4
}
```

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
