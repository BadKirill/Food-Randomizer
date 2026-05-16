# Architecture

## 1) Goals
- Cross-platform app (iOS/Android) for random dish selection.
- Hard randomizer constraints:
  - Same dish cannot appear twice in a row.
  - Dish cooldown for next 3-4 clicks (configurable per user).
- Full dish detail view:
  - Name
  - Ingredients
  - Cooking steps
  - "What you can add" options where only one option per group is randomly picked.
- AI features:
  - Generate new dishes from prompt.
  - Infer likely ingredients.
  - Infer cooking steps.
  - Recognize dish from image/photo.

## 2) High-Level System
- Mobile app handles UX, local cache, and auth session.
- Backend API is source of truth for domain logic and AI orchestration.
- PostgreSQL stores dishes, structured ingredients/steps, history, and AI job artifacts.
- Object storage keeps uploaded images.

## 3) Layered Design

### Mobile (`apps/mobile`)
- `presentation`: Screens and components.
- `application`: use-cases/hooks that call API.
- `data`: API client + local cache.
- `domain-lite`: local types and UI-only transforms.

### API (`apps/api`)
- `modules/dishes`: CRUD, query, moderation/approval.
- `modules/randomizer`: eligibility filter + selection logic.
- `modules/ai`: provider adapters, prompts, schema validation.
- `modules/history`: selection tracking and analytics.
- `modules/health`: readiness/liveness.

### Shared (`packages/contracts`)
- Runtime-validated request/response schemas (Zod).
- Type inference shared by API and mobile.

## 4) Domain Rules

### Randomizer
On each click:
1. Read recent `dish_history` for user.
2. Exclude the last shown dish.
3. Exclude any dish in last `cooldownClicks` selections.
4. If empty, relax cooldown gradually until candidates exist, but never allow immediate repeat.
5. Randomly choose one candidate.
6. Resolve add-on groups by selecting exactly one random option per group.
7. Save history record.

### Add-on Group Rule
Dish can have zero or more add-on groups.
- Example group: `sauce_choice` -> ["yogurt", "tahini", "garlic butter"]
- Response includes one selected option for each group.

## 5) AI Integration Pattern

### Why provider isolation
AI provider may change. Keep provider-specific code behind an interface.

- `AIProvider` interface:
  - `generateDishFromPrompt`
  - `inferIngredients`
  - `inferSteps`
  - `recognizeDishFromImage`

### Safe persistence flow
1. Receive AI request.
2. Call provider with strict JSON instruction.
3. Validate response against Zod schema.
4. If invalid: one repair attempt.
5. Save result as `pending_approval` (recommended) or auto-publish depending on policy.
6. Log model, token usage, latency, and confidence.

## 6) Suggested Data Model
- `users`
- `dishes`
- `dish_ingredients`
- `dish_steps`
- `dish_add_option_groups`
- `dish_add_options`
- `dish_history`
- `dish_images`
- `ai_generations`

## 7) Security/Operations
- Never expose AI provider key to mobile.
- Add request throttling per user/IP for AI endpoints.
- Store all AI outputs for audit and debugging.
- Add content moderation checks before publishing generated dishes.

## 8) Delivery Phases
1. API + DB + randomizer + manual dishes.
2. Mobile flow using live API.
3. AI generate/infer text endpoints.
4. Image recognition + upload pipeline.
5. Async AI jobs, notifications, analytics.
