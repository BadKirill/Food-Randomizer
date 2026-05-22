import Constants from 'expo-constants';

const expoExtra =
  (Constants.expoConfig?.extra as {
    apiBaseUrl?: string;
    defaultLoginEmail?: string;
  } | undefined) ?? {};

const fromEnv = process.env.EXPO_PUBLIC_API_BASE_URL;
const fromExtra = expoExtra.apiBaseUrl;
const defaultLoginEmailFromEnv = process.env.EXPO_PUBLIC_DEFAULT_LOGIN_EMAIL;
const defaultLoginEmailFromExtra = expoExtra.defaultLoginEmail;

// Default to production HTTPS API endpoint for production-safe mobile connectivity.
export const API_BASE_URL = fromEnv ?? fromExtra ?? 'https://api.randomeal.app';
export const DEFAULT_LOGIN_EMAIL =
  defaultLoginEmailFromEnv ?? defaultLoginEmailFromExtra ?? '';
