# Current mobile API and authentication

Direct fetch client, API URL configuration, manual DTO types, error formatting, and SecureStore-backed bearer session hook.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Credentials belong in SecureStore and must not move to AsyncStorage.
- Current responses are TypeScript-cast without shared runtime parsing.
- The mobile package does not currently depend on the contracts workspace.
- TanStack Query, offline persistence, retry policy, and Sentry are target-only.

## Source coverage

- `apps/mobile/.env.example` — 2 indexed sections: EXPO_PUBLIC_API_BASE_URL, EXPO_PUBLIC_DEFAULT_LOGIN_EMAIL. Sections: apps/mobile/.env.example (L1–3); EXPO_PUBLIC_API_BASE_URL (L1–1); EXPO_PUBLIC_DEFAULT_LOGIN_EMAIL (L2–3)
- `apps/mobile/src/api/index.ts` — 13 indexed sections: parseApiError, readJson, formatClientError, login, register, …. Sections: apps/mobile/src/api/index.ts (L1–122); parseApiError (L4–15); readJson (L16–23); formatClientError (L24–33); login (L34–42); register (L43–51); logout (L52–58); fetchRandomDish (L59–65)
- `apps/mobile/src/config/api.ts` — 2 indexed sections: API_BASE_URL, DEFAULT_LOGIN_EMAIL. Sections: apps/mobile/src/config/api.ts (L1–18); API_BASE_URL (L15–15); DEFAULT_LOGIN_EMAIL (L16–18)
- `apps/mobile/src/hooks/useAuthSession.ts` — 5 indexed sections: isStoredSessionUsable, useAuthSession, applySessionState, storeSession, forgetSession. Sections: apps/mobile/src/hooks/useAuthSession.ts (L1–76); isStoredSessionUsable (L8–11); useAuthSession (L12–38); applySessionState (L39–46); storeSession (L47–51); forgetSession (L52–76)

## Graph relations

- Depends on: [Current mobile shell](RandoMeal--Mobile--Current-Shell), [Current authentication and sessions](RandoMeal--Backend--Auth-Sessions)
- Related: [Legacy shared contracts](RandoMeal--Contracts--Legacy), [Current legacy API surface](RandoMeal--API--Current-Legacy-Surface)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`mobile api` · `fetch` · `securestore` · `auth hook` · `client` · `мобильный api`
