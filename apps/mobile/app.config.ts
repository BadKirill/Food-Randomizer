import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const resolved: ExpoConfig = {
    ...config,
    name: 'Food Randomizer',
    slug: 'food-randomizer',
    extra: {
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://92.5.190.116:3000',
      defaultLoginEmail: process.env.EXPO_PUBLIC_DEFAULT_LOGIN_EMAIL ?? '',
    },
  };

  resolved.android = {
    ...(resolved.android ?? {}),
    // Not present in Expo's Android TS type, but supported by config plugins/prebuild.
    usesCleartextTraffic: true,
  } as ExpoConfig['android'];

  return resolved;
};
