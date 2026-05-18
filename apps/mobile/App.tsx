import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { API_BASE_URL } from './src/config/api';

type RandomNextResponse = {
  dish: {
    id: string;
    name: string;
    description?: string;
    ingredients: Array<{ name: string; amount?: string; unit?: string }>;
    steps: string[];
    addOnGroups: Array<{
      groupKey: string;
      options: string[];
      selected: string;
    }>;
  };
  selectionMeta: {
    cooldownApplied: number;
    fallbackRelaxationUsed: boolean;
  };
};

export default function App() {
  const [data, setData] = useState<RandomNextResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchRandomDish() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/random/next`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'mobile-demo-user',
          cooldownClicks: 4,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const payload = (await response.json()) as RandomNextResponse;
      setData(payload);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Failed to fetch dish from backend',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Food Randomizer</Text>
        <Text style={styles.subtitle}>API: {API_BASE_URL}</Text>

        <Pressable
          onPress={fetchRandomDish}
          disabled={loading}
          style={[styles.button, loading ? styles.buttonDisabled : null]}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Picking...' : 'Pick Random Dish'}
          </Text>
        </Pressable>

        {loading ? <ActivityIndicator style={styles.loader} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {data ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{data.dish.name}</Text>
            {data.dish.description ? (
              <Text style={styles.description}>{data.dish.description}</Text>
            ) : null}

            <Text style={styles.sectionTitle}>Ingredients</Text>
            {data.dish.ingredients.map((ingredient, index) => (
              <Text key={`${ingredient.name}-${index}`} style={styles.listItem}>
                - {ingredient.name}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>How to cook</Text>
            {data.dish.steps.map((step, index) => (
              <Text key={`${step}-${index}`} style={styles.listItem}>
                {index + 1}. {step}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Can add</Text>
            {data.dish.addOnGroups.map((group) => (
              <Text key={group.groupKey} style={styles.listItem}>
                - {group.selected}
              </Text>
            ))}
          </View>
        ) : null}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#1d6f42',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  loader: {
    marginTop: 14,
  },
  error: {
    marginTop: 14,
    color: '#b42318',
  },
  card: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: '#4b5563',
    marginBottom: 12,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 6,
    fontWeight: '700',
    fontSize: 16,
  },
  listItem: {
    color: '#1f2937',
    marginBottom: 4,
  },
});
