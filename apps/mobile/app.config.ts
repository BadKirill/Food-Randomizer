import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const apiBaseUrl =
    process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.randomeal.app';
  const allowCleartextHttp =
    process.env.EXPO_PUBLIC_ALLOW_CLEARTEXT_HTTP === 'true';

  const resolved: ExpoConfig = {
    ...config,
    name: 'Food Randomizer',
    slug: 'food-randomizer',
    extra: {
      apiBaseUrl,
      defaultLoginEmail: process.env.EXPO_PUBLIC_DEFAULT_LOGIN_EMAIL ?? '',
    },
    plugins: [...(config.plugins ?? []), 'expo-secure-store'],
  };

  resolved.android = {
    ...(resolved.android ?? {}),
    // Not present in Expo's Android TS type, but supported by config plugins/prebuild.
    usesCleartextTraffic: allowCleartextHttp,
  } as ExpoConfig['android'];

  return resolved;
};
