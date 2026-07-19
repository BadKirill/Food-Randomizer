# Current mobile dish management flow

Authenticated create, edit, list, filter, inspect, archive, and unarchive flows with owner-only feedback and manual form state.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Creator-only backend ownership remains the authorization source regardless of visible UI actions.
- Current manual form validation is not the target React Hook Form and shared Zod architecture.
- Archive confirmation and owner feedback require regression coverage during decomposition.
- This admin-like MVP surface is not evidence for final consumer navigation.

## Source coverage

- `apps/mobile/App.test.tsx` — 10 indexed sections: createJsonResponse, Mobile MVP flows, sends public random request with dishType filter when selected, restores a valid stored session, does not send create request when required fields are empty, …. Sections: apps/mobile/App.test.tsx (L1–333); createJsonResponse (L18–25); Mobile MVP flows (L26–34); sends public random request with dishType filter when selected (L35–76); restores a valid stored session (L77–91); does not send create request when required fields are empty (L92–100); loads selected dish into edit mode and shows Save Changes (L101–150); archives selected dish with DELETE request (L151–210)
- `apps/mobile/App.tsx` — 28 indexed sections: PendingDishAction, App, animateRandomPressed, handleRandomPressIn, handleRandomPressOut, …. Sections: apps/mobile/App.tsx (L1–619); PendingDishAction (L15–16); App (L17–73); animateRandomPressed (L74–88); handleRandomPressIn (L89–94); handleRandomPressOut (L95–100); fetchRandomDish (L101–115); fetchDishes (L116–138)
- `apps/mobile/src/components/AuthPanel.tsx` — 2 indexed sections: AuthPanelProps, AuthPanel. Sections: apps/mobile/src/components/AuthPanel.tsx (L1–91); AuthPanelProps (L4–17); AuthPanel (L18–91)
- `apps/mobile/src/components/DishModal.tsx` — 7 indexed sections: DishDetailsBlock, formatDishDate, ConfirmDishActionModal, DishModal, DishModalScreen, …. Sections: apps/mobile/src/components/DishModal.tsx (L1–205); DishDetailsBlock (L6–40); formatDishDate (L41–46); ConfirmDishActionModal (L47–91); DishModal (L92–107); DishModalScreen (L108–140); SelectedDishModalProps (L141–152); SelectedDishModal (L153–205)
- `apps/mobile/src/screens/ManageScreen.tsx` — 9 indexed sections: ManageScreenProps, ManageScreen, DishFormProps, DishForm, FormInputProps, …. Sections: apps/mobile/src/screens/ManageScreen.tsx (L1–528); ManageScreenProps (L6–55); ManageScreen (L56–213); DishFormProps (L214–237); DishForm (L238–325); FormInputProps (L326–335); FormInput (L336–361); DishListProps (L362–379)

## Graph relations

- Depends on: [Current mobile API and authentication](RandoMeal--Mobile--API-Auth), [Current dish catalog and ownership](RandoMeal--Backend--Catalog-Ownership)
- Related: [Design system and product quality](RandoMeal--Design--System-and-Quality)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`manage screen` · `dish form` · `crud` · `archive` · `управление блюдами`
