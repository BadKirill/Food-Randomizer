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

// Default to deployed API so physical devices work even if Expo env isn't loaded.
export const API_BASE_URL = fromEnv ?? fromExtra ?? 'http://92.5.190.116:3000';
export const DEFAULT_LOGIN_EMAIL =
  defaultLoginEmailFromEnv ?? defaultLoginEmailFromExtra ?? '';
