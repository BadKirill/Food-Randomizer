import Constants from 'expo-constants';

const expoExtra =
  (Constants.expoConfig?.extra as {
    apiBaseUrl?: string;
    dishesWriteToken?: string;
  } | undefined) ?? {};

const fromEnv = process.env.EXPO_PUBLIC_API_BASE_URL;
const fromExtra = expoExtra.apiBaseUrl;
const writeTokenFromEnv = process.env.EXPO_PUBLIC_DISHES_WRITE_TOKEN;
const writeTokenFromExtra = expoExtra.dishesWriteToken;

export const API_BASE_URL = fromEnv ?? fromExtra ?? 'http://localhost:3000';
export const DISHES_WRITE_TOKEN = writeTokenFromEnv ?? writeTokenFromExtra ?? '';
