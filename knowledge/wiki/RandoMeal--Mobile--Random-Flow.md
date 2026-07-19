# Current mobile random flow

Random action, dish-type filter sheet, loading/error state, dish result modal, press animation, and public random API request.

Status: **current**
Authority: **current-code**

## Rules and patterns

- This legacy flow does not implement the target recommendation session, exposure, acceptance, rejection, or cooking lifecycle.
- Do not lock the redesign to one visible dish before the cardinality gate passes.
- Preserve complete loading, error, empty, and recovery states in any replacement.
- Apply the design anti-slop creation review before visual handoff.

## Source coverage

- `apps/mobile/App.test.tsx` — 10 indexed sections: createJsonResponse, Mobile MVP flows, sends public random request with dishType filter when selected, restores a valid stored session, does not send create request when required fields are empty, …. Sections: apps/mobile/App.test.tsx (L1–333); createJsonResponse (L18–25); Mobile MVP flows (L26–34); sends public random request with dishType filter when selected (L35–76); restores a valid stored session (L77–91); does not send create request when required fields are empty (L92–100); loads selected dish into edit mode and shows Save Changes (L101–150); archives selected dish with DELETE request (L151–210)
- `apps/mobile/App.tsx` — 28 indexed sections: PendingDishAction, App, animateRandomPressed, handleRandomPressIn, handleRandomPressOut, …. Sections: apps/mobile/App.tsx (L1–619); PendingDishAction (L15–16); App (L17–73); animateRandomPressed (L74–88); handleRandomPressIn (L89–94); handleRandomPressOut (L95–100); fetchRandomDish (L101–115); fetchDishes (L116–138)
- `apps/mobile/src/components/DishModal.tsx` — 7 indexed sections: DishDetailsBlock, formatDishDate, ConfirmDishActionModal, DishModal, DishModalScreen, …. Sections: apps/mobile/src/components/DishModal.tsx (L1–205); DishDetailsBlock (L6–40); formatDishDate (L41–46); ConfirmDishActionModal (L47–91); DishModal (L92–107); DishModalScreen (L108–140); SelectedDishModalProps (L141–152); SelectedDishModal (L153–205)
- `apps/mobile/src/screens/RandomScreen.tsx` — 2 indexed sections: RandomScreenProps, RandomScreen. Sections: apps/mobile/src/screens/RandomScreen.tsx (L1–91); RandomScreenProps (L5–19); RandomScreen (L20–91)

## Graph relations

- Depends on: [Current mobile shell](RandoMeal--Mobile--Current-Shell), [Current randomizer and history](RandoMeal--Backend--Randomizer-History)
- Related: [Single versus shortlist evidence gate](RandoMeal--Product--Choice-Cardinality-Gate), [Design system and product quality](RandoMeal--Design--System-and-Quality)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`random screen` · `dish modal` · `recommendation ui` · `filter` · `экран рандома`
