import Constants from 'expo-constants';

const expoExtra =
  (Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined) ?? {};

const fromEnv = process.env.EXPO_PUBLIC_API_BASE_URL;
const fromExtra = expoExtra.apiBaseUrl;

export const API_BASE_URL = fromEnv ?? fromExtra ?? 'http://localhost:3000';
