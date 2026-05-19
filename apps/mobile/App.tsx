import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { API_BASE_URL } from './src/config/api';

type DishIngredient = { name: string; amount?: string; unit?: string };
type DishAddOnGroup = { groupKey: string; options: string[]; selected?: string };

type DishDetail = {
  id: string;
  name: string;
  description?: string;
  dishType?: 'usual' | 'vegetarian' | 'vegan';
  ingredients: DishIngredient[];
  steps: string[];
  addOnGroups: DishAddOnGroup[];
};

type RandomNextResponse = {
  dish: DishDetail;
  selectionMeta: {
    cooldownApplied: number;
    fallbackRelaxationUsed: boolean;
  };
};

type DishListItem = {
  id: string;
  name: string;
  description?: string;
  dishType?: 'usual' | 'vegetarian' | 'vegan';
  createdAt: string;
};

type CreateDishPayload = {
  name: string;
  description?: string;
  dishType?: 'usual' | 'vegetarian' | 'vegan';
  ingredients: string[];
  steps: string[];
  addOnOptions: string[];
};

type ScreenMode = 'random' | 'manage';

export default function App() {
  const [mode, setMode] = useState<ScreenMode>('random');

  const [randomData, setRandomData] = useState<RandomNextResponse | null>(null);
  const [randomLoading, setRandomLoading] = useState(false);
  const [randomError, setRandomError] = useState<string | null>(null);
  const [randomDishTypeFilter, setRandomDishTypeFilter] = useState<'all' | 'usual' | 'vegetarian' | 'vegan'>('all');

  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishIngredients, setDishIngredients] = useState('');
  const [dishSteps, setDishSteps] = useState('');
  const [dishAddOns, setDishAddOns] = useState('');
  const [dishType, setDishType] = useState<'usual' | 'vegetarian' | 'vegan'>('vegan');
  const [editingDishId, setEditingDishId] = useState<string | null>(null);

  const [listLoading, setListLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [manageError, setManageError] = useState<string | null>(null);
  const [manageMessage, setManageMessage] = useState<string | null>(null);
  const [dishes, setDishes] = useState<DishListItem[]>([]);

  const [selectedDish, setSelectedDish] = useState<DishDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [dishListFilter, setDishListFilter] = useState<'all' | 'usual' | 'vegetarian' | 'vegan'>('all');

  const canSaveDish = useMemo(() => {
    return dishName.trim().length > 0 && parseLines(dishIngredients).length > 0 && parseLines(dishSteps).length > 0;
  }, [dishName, dishIngredients, dishSteps]);

  async function fetchRandomDish() {
    setRandomLoading(true);
    setRandomError(null);

    try {
      const payloadBody =
        randomDishTypeFilter === 'all'
          ? { userId: 'mobile-demo-user', cooldownClicks: 4 }
          : {
              userId: 'mobile-demo-user',
              cooldownClicks: 4,
              dishType: randomDishTypeFilter,
            };

      const response = await fetch(`${API_BASE_URL}/random/next`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const payload = (await response.json()) as RandomNextResponse;
      setRandomData(payload);
    } catch (e) {
      setRandomError(e instanceof Error ? e.message : 'Failed to fetch dish from backend');
    } finally {
      setRandomLoading(false);
    }
  }

  async function fetchDishes(filter: 'all' | 'usual' | 'vegetarian' | 'vegan' = dishListFilter) {
    setListLoading(true);
    setManageError(null);

    try {
      const query = filter === 'all' ? '' : `?dishType=${filter}`;
      const response = await fetch(`${API_BASE_URL}/dishes${query}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const payload = (await response.json()) as DishListItem[];
      setDishes(payload);
    } catch (e) {
      setManageError(e instanceof Error ? e.message : 'Failed to load dishes');
    } finally {
      setListLoading(false);
    }
  }

  async function applyDishFilter(filter: 'all' | 'usual' | 'vegetarian' | 'vegan') {
    setDishListFilter(filter);
    await fetchDishes(filter);
  }

  async function fetchDishById(dishId: string) {
    setDetailLoading(true);
    setManageError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const payload = (await response.json()) as DishDetail;
      setSelectedDish(payload);
    } catch (e) {
      setManageError(e instanceof Error ? e.message : 'Failed to load dish details');
    } finally {
      setDetailLoading(false);
    }
  }

  async function createDish() {
    if (!canSaveDish) {
      setManageError('Name, ingredients and steps are required');
      return;
    }

    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);

    const payload: CreateDishPayload = {
      name: dishName.trim(),
      description: dishDescription.trim() || undefined,
      ingredients: parseLines(dishIngredients),
      steps: parseLines(dishSteps),
      addOnOptions: parseLines(dishAddOns),
      dishType,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/dishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      setManageMessage('Dish created');
      clearDishForm();
      setEditingDishId(null);
      setSelectedDish(null);
      await fetchDishes();
    } catch (e) {
      setManageError(e instanceof Error ? e.message : 'Failed to create dish');
    } finally {
      setSaveLoading(false);
    }
  }

  function clearDishForm() {
    setDishName('');
    setDishDescription('');
    setDishIngredients('');
    setDishSteps('');
    setDishAddOns('');
    setDishType('vegan');
  }

  function loadDishIntoFormForEdit(dish: DishDetail) {
    setDishName(dish.name);
    setDishDescription(dish.description ?? '');
    setDishIngredients(dish.ingredients.map((i) => i.name).join('\n'));
    setDishSteps(dish.steps.join('\n'));
    setDishAddOns(dish.addOnGroups.flatMap((g) => g.options).join('\n'));
    setDishType(dish.dishType ?? 'vegan');
    setEditingDishId(dish.id);
    setManageMessage('Edit mode enabled. Save changes to update this dish.');
  }

  async function updateDish() {
    if (!editingDishId) {
      setManageError('No dish selected for update');
      return;
    }
    if (!canSaveDish) {
      setManageError('Name, ingredients and steps are required');
      return;
    }

    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);

    const payload: CreateDishPayload = {
      name: dishName.trim(),
      description: dishDescription.trim() || undefined,
      ingredients: parseLines(dishIngredients),
      steps: parseLines(dishSteps),
      addOnOptions: parseLines(dishAddOns),
      dishType,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/dishes/${editingDishId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      setManageMessage('Dish updated');
      await fetchDishes();
      await fetchDishById(editingDishId);
    } catch (e) {
      setManageError(e instanceof Error ? e.message : 'Failed to update dish');
    } finally {
      setSaveLoading(false);
    }
  }

  async function archiveSelectedDish() {
    if (!selectedDish) {
      setManageError('No dish selected to archive');
      return;
    }

    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/dishes/${selectedDish.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      setManageMessage('Dish archived');
      setSelectedDish(null);
      setEditingDishId(null);
      clearDishForm();
      await fetchDishes();
    } catch (e) {
      setManageError(e instanceof Error ? e.message : 'Failed to archive dish');
    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Food Randomizer</Text>
        <Text style={styles.subtitle}>API: {API_BASE_URL}</Text>

        <View style={styles.tabRow}>
          <Pressable
            onPress={() => setMode('random')}
            style={[styles.tab, mode === 'random' ? styles.tabActive : null]}
          >
            <Text style={styles.tabLabel}>Random</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('manage')}
            style={[styles.tab, mode === 'manage' ? styles.tabActive : null]}
          >
            <Text style={styles.tabLabel}>Manage Dishes</Text>
          </Pressable>
        </View>

        {mode === 'random' ? (
          <View>
            <Text style={styles.sectionTitle}>Random Filter</Text>
            <View style={styles.inlineActions}>
              <Pressable onPress={() => setRandomDishTypeFilter('all')} style={[styles.secondaryButton, randomDishTypeFilter === 'all' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>All</Text>
              </Pressable>
              <Pressable onPress={() => setRandomDishTypeFilter('usual')} style={[styles.secondaryButton, randomDishTypeFilter === 'usual' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Usual</Text>
              </Pressable>
              <Pressable onPress={() => setRandomDishTypeFilter('vegetarian')} style={[styles.secondaryButton, randomDishTypeFilter === 'vegetarian' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Vegetarian</Text>
              </Pressable>
              <Pressable onPress={() => setRandomDishTypeFilter('vegan')} style={[styles.secondaryButton, randomDishTypeFilter === 'vegan' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Vegan</Text>
              </Pressable>
            </View>
            <Pressable
              onPress={fetchRandomDish}
              disabled={randomLoading}
              style={[styles.button, randomLoading ? styles.buttonDisabled : null]}
            >
              <Text style={styles.buttonText}>{randomLoading ? 'Picking...' : 'Pick Random Dish'}</Text>
            </Pressable>

            {randomLoading ? <ActivityIndicator style={styles.loader} /> : null}
            {randomError ? <Text style={styles.error}>{randomError}</Text> : null}

            {randomData ? <DishCard dish={randomData.dish} /> : null}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>{editingDishId ? 'Edit Dish' : 'Add Dish'}</Text>

            <TextInput
              value={dishName}
              onChangeText={setDishName}
              placeholder="Dish name"
              style={styles.input}
            />
            <TextInput
              value={dishDescription}
              onChangeText={setDishDescription}
              placeholder="Description (optional)"
              style={styles.input}
            />
            <TextInput
              value={dishIngredients}
              onChangeText={setDishIngredients}
              placeholder="Ingredients (one per line)"
              style={[styles.input, styles.inputMulti]}
              multiline
            />
            <TextInput
              value={dishSteps}
              onChangeText={setDishSteps}
              placeholder="Steps (one per line)"
              style={[styles.input, styles.inputMulti]}
              multiline
            />
            <TextInput
              value={dishAddOns}
              onChangeText={setDishAddOns}
              placeholder="Can add (one per line)"
              style={[styles.input, styles.inputMulti]}
              multiline
            />
            <View style={styles.inlineActions}>
              <Pressable onPress={() => setDishType('usual')} style={[styles.secondaryButton, dishType === 'usual' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Usual</Text>
              </Pressable>
              <Pressable onPress={() => setDishType('vegetarian')} style={[styles.secondaryButton, dishType === 'vegetarian' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Vegetarian</Text>
              </Pressable>
              <Pressable onPress={() => setDishType('vegan')} style={[styles.secondaryButton, dishType === 'vegan' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Vegan</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={editingDishId ? updateDish : createDish}
              disabled={!canSaveDish || saveLoading}
              style={[
                styles.button,
                (!canSaveDish || saveLoading) ? styles.buttonDisabled : null,
              ]}
            >
              <Text style={styles.buttonText}>
                {saveLoading ? 'Saving...' : editingDishId ? 'Save Changes' : 'Save Dish'}
              </Text>
            </Pressable>

            <View style={styles.inlineActions}>
              <Pressable onPress={() => fetchDishes()} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Refresh List</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setEditingDishId(null);
                  clearDishForm();
                }}
                style={[styles.secondaryButton, styles.secondaryButtonMuted]}
              >
                <Text style={styles.secondaryButtonText}>Clear / Exit Edit</Text>
              </Pressable>
            </View>

            {listLoading || detailLoading ? <ActivityIndicator style={styles.loader} /> : null}
            {manageError ? <Text style={styles.error}>{manageError}</Text> : null}
            {manageMessage ? <Text style={styles.success}>{manageMessage}</Text> : null}

            <Text style={styles.sectionTitle}>Dishes</Text>
            <View style={styles.inlineActions}>
              <Pressable onPress={() => applyDishFilter('all')} style={[styles.secondaryButton, dishListFilter === 'all' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>All</Text>
              </Pressable>
              <Pressable onPress={() => applyDishFilter('usual')} style={[styles.secondaryButton, dishListFilter === 'usual' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Usual</Text>
              </Pressable>
              <Pressable onPress={() => applyDishFilter('vegetarian')} style={[styles.secondaryButton, dishListFilter === 'vegetarian' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Vegetarian</Text>
              </Pressable>
              <Pressable onPress={() => applyDishFilter('vegan')} style={[styles.secondaryButton, dishListFilter === 'vegan' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Vegan</Text>
              </Pressable>
            </View>
            {dishes.length === 0 ? <Text style={styles.empty}>No dishes loaded yet.</Text> : null}

            {dishes.map((dish) => (
              <Pressable
                key={dish.id}
                style={styles.listCard}
                onPress={() => fetchDishById(dish.id)}
              >
                <Text style={styles.listCardTitle}>{dish.name}</Text>
                <Text style={styles.listCardText}>Type: {dish.dishType ?? 'usual'}</Text>
                {dish.description ? <Text style={styles.listCardText}>{dish.description}</Text> : null}
              </Pressable>
            ))}

            {selectedDish ? (
              <View>
                <Text style={styles.sectionTitle}>Selected Dish</Text>
                <Pressable
                  onPress={() => loadDishIntoFormForEdit(selectedDish)}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryButtonText}>Edit This Dish</Text>
                </Pressable>
                <Pressable
                  onPress={archiveSelectedDish}
                  style={[styles.secondaryButton, styles.secondaryDanger]}
                >
                  <Text style={styles.secondaryButtonText}>Archive Dish</Text>
                </Pressable>
                <DishCard dish={selectedDish} />
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function parseLines(input: string) {
  return input
    .split('\n')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

function DishCard({ dish }: { dish: DishDetail }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{dish.name}</Text>
      <Text style={styles.listCardText}>Type: {dish.dishType ?? 'usual'}</Text>
      {dish.description ? <Text style={styles.description}>{dish.description}</Text> : null}

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {dish.ingredients.map((ingredient, index) => (
        <Text key={`${ingredient.name}-${index}`} style={styles.listItem}>
          - {ingredient.name}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>How to cook</Text>
      {dish.steps.map((step, index) => (
        <Text key={`${step}-${index}`} style={styles.listItem}>
          {index + 1}. {step}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Can add</Text>
      {dish.addOnGroups.flatMap((group) => group.options).map((option, index) => (
        <Text key={`${option}-${index}`} style={styles.listItem}>
          - {option}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
  },
  tabActive: {
    backgroundColor: '#cfe8db',
  },
  tabLabel: {
    fontWeight: '600',
    color: '#1f2937',
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
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  secondaryButtonMuted: {
    opacity: 0.9,
  },
  secondaryActive: {
    backgroundColor: '#cfe8db',
  },
  secondaryDanger: {
    backgroundColor: '#fed7d7',
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '600',
  },
  inlineActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 8,
  },
  loader: {
    marginTop: 14,
  },
  error: {
    marginTop: 12,
    color: '#b42318',
  },
  success: {
    marginTop: 12,
    color: '#166534',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  inputMulti: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  empty: {
    color: '#6b7280',
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  listCardTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
  },
  listCardText: {
    marginTop: 4,
    color: '#4b5563',
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
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '700',
    fontSize: 16,
  },
  listItem: {
    color: '#1f2937',
    marginBottom: 4,
  },
});
