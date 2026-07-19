# Current mobile shell

Expo 54 React Native app with a large App orchestrator, manual Random and Manage modes, local hook state, direct fetch flows, and partially extracted screens and modals.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Current navigation is manual state switching; Expo Router is target-only.
- App.tsx owns too much orchestration and should be decomposed behind preserved behavior and tests.
- Server entities must not be duplicated into future Zustand local state.
- UI redesign remains gated by product discovery and the mandatory design workflow.

## Source coverage

- `apps/mobile/app.config.ts` — typescript file app.config.ts. Sections: apps/mobile/app.config.ts (L1–28)
- `apps/mobile/app.json` — 1 indexed section: expo. Sections: apps/mobile/app.json (L1–41); expo (L2–41)
- `apps/mobile/App.test.tsx` — 10 indexed sections: createJsonResponse, Mobile MVP flows, sends public random request with dishType filter when selected, restores a valid stored session, does not send create request when required fields are empty, …. Sections: apps/mobile/App.test.tsx (L1–333); createJsonResponse (L18–25); Mobile MVP flows (L26–34); sends public random request with dishType filter when selected (L35–76); restores a valid stored session (L77–91); does not send create request when required fields are empty (L92–100); loads selected dish into edit mode and shows Save Changes (L101–150); archives selected dish with DELETE request (L151–210)
- `apps/mobile/App.tsx` — 28 indexed sections: PendingDishAction, App, animateRandomPressed, handleRandomPressIn, handleRandomPressOut, …. Sections: apps/mobile/App.tsx (L1–619); PendingDishAction (L15–16); App (L17–73); animateRandomPressed (L74–88); handleRandomPressIn (L89–94); handleRandomPressOut (L95–100); fetchRandomDish (L101–115); fetchDishes (L116–138)
- `apps/mobile/index.ts` — 1 indexed section: Root. Sections: apps/mobile/index.ts (L1–15); Root (L7–15)
- `apps/mobile/src/types.ts` — 12 indexed sections: DishType, DishFilter, ArchivedFilter, ScreenMode, ManageTab, …. Sections: apps/mobile/src/types.ts (L1–57); DishType (L1–1); DishFilter (L2–2); ArchivedFilter (L3–3); ScreenMode (L4–4); ManageTab (L5–6); DishIngredient (L7–7); DishAddOnGroup (L8–9)
- `apps/mobile/src/utils/forms.ts` — 1 indexed section: parseLines. Sections: apps/mobile/src/utils/forms.ts (L1–7); parseLines (L1–7)

## Graph relations

- Depends on: [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface)
- Related: [Target product architecture](RandoMeal--Architecture--Target), [Current mobile random flow](RandoMeal--Mobile--Random-Flow), [Current mobile dish management flow](RandoMeal--Mobile--Manage-Flow)
- Supersedes: none
- Superseded by: [Target product architecture](RandoMeal--Architecture--Target)

## Retrieval tags

`expo` · `react native` · `App.tsx` · `navigation` · `mobile` · `мобилка` · `навигация`
