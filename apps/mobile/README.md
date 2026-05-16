# Mobile App

Expo React Native frontend for Food Randomizer.

## API Base URL strategy
Set `EXPO_PUBLIC_API_BASE_URL` in:
- `.env.dev` for local
- `.env.prod` for production

The app reads API URL from runtime config and environment, so frontend can be separated from backend repo later without code churn.
