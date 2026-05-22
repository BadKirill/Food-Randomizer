import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Food Randomizer',
  slug: 'food-randomizer',
  android: {
    ...config.android,
    usesCleartextTraffic: true,
  },
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://92.5.190.116:3000',
    defaultLoginEmail: process.env.EXPO_PUBLIC_DEFAULT_LOGIN_EMAIL ?? '',
  },
});
