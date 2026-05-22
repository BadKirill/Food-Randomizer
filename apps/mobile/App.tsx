import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL, DEFAULT_LOGIN_EMAIL } from './src/config/api';

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
  archivedAt?: string | null;
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
type LoginResponse = {
  token: string;
  user: { id: string; email: string | null };
  expiresAt: string;
};

export default function App() {
  const [mode, setMode] = useState<ScreenMode>('random');
  const [loginEmail, setLoginEmail] = useState(DEFAULT_LOGIN_EMAIL);
  const [loginPassword, setLoginPassword] = useState('');
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

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
  const [dishArchivedFilter, setDishArchivedFilter] = useState<'active' | 'archived'>('active');

  const canSaveDish = useMemo(() => {
    return dishName.trim().length > 0 && parseLines(dishIngredients).length > 0 && parseLines(dishSteps).length > 0;
  }, [dishName, dishIngredients, dishSteps]);
  const isAuthenticated = Boolean(sessionToken);

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
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `API error: ${response.status}`);
      }

      const payload = (await response.json()) as RandomNextResponse;
      setRandomData(payload);
    } catch (e) {
      setRandomError(formatClientError(e, 'Failed to fetch dish from backend'));
    } finally {
      setRandomLoading(false);
    }
  }

  async function fetchDishes(
    filter: 'all' | 'usual' | 'vegetarian' | 'vegan' = dishListFilter,
    archived: 'active' | 'archived' = dishArchivedFilter,
  ) {
    setListLoading(true);
    setManageError(null);

    try {
      const params = new URLSearchParams();
      params.set('archived', archived);
      if (filter !== 'all') {
        params.set('dishType', filter);
      }
      const response = await fetch(`${API_BASE_URL}/dishes?${params.toString()}`);
      if (!response.ok) {
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `API error: ${response.status}`);
      }

      const payload = (await response.json()) as DishListItem[];
      setDishes(payload);
    } catch (e) {
      setManageError(formatClientError(e, 'Failed to load dishes'));
    } finally {
      setListLoading(false);
    }
  }

  async function applyDishFilter(filter: 'all' | 'usual' | 'vegetarian' | 'vegan') {
    setDishListFilter(filter);
    await fetchDishes(filter, dishArchivedFilter);
  }

  async function applyArchivedFilter(filter: 'active' | 'archived') {
    setDishArchivedFilter(filter);
    setSelectedDish(null);
    await fetchDishes(dishListFilter, filter);
  }

  async function fetchDishById(dishId: string) {
    setDetailLoading(true);
    setManageError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`);
      if (!response.ok) {
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `API error: ${response.status}`);
      }

      const payload = (await response.json()) as DishDetail;
      setSelectedDish(payload);
    } catch (e) {
      setManageError(formatClientError(e, 'Failed to load dish details'));
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
      if (!sessionToken) {
        throw new Error('Login is required');
      }
      const response = await fetch(`${API_BASE_URL}/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `API error: ${response.status}`);
      }

      setManageMessage('Dish created');
      clearDishForm();
      setEditingDishId(null);
      setSelectedDish(null);
      await fetchDishes();
    } catch (e) {
      setManageError(formatClientError(e, 'Failed to create dish'));
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
      if (!sessionToken) {
        throw new Error('Login is required');
      }
      const response = await fetch(`${API_BASE_URL}/dishes/${editingDishId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `API error: ${response.status}`);
      }

      setManageMessage('Dish updated');
      await fetchDishes();
      await fetchDishById(editingDishId);
    } catch (e) {
      setManageError(formatClientError(e, 'Failed to update dish'));
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
      if (!sessionToken) {
        throw new Error('Login is required');
      }
      const response = await fetch(`${API_BASE_URL}/dishes/${selectedDish.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      if (!response.ok) {
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `API error: ${response.status}`);
      }

      setManageMessage('Dish archived');
      setSelectedDish(null);
      setEditingDishId(null);
      clearDishForm();
      await fetchDishes();
    } catch (e) {
      setManageError(formatClientError(e, 'Failed to archive dish'));
    } finally {
      setSaveLoading(false);
    }
  }

  async function unarchiveDishById(dishId: string) {
    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);

    try {
      if (!sessionToken) {
        throw new Error('Login is required');
      }
      const response = await fetch(`${API_BASE_URL}/dishes/${dishId}/unarchive`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      if (!response.ok) {
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `API error: ${response.status}`);
      }

      setManageMessage('Dish unarchived');
      await fetchDishes(dishListFilter, dishArchivedFilter);
    } catch (e) {
      setManageError(formatClientError(e, 'Failed to unarchive dish'));
    } finally {
      setSaveLoading(false);
    }
  }

  async function login() {
    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      if (!response.ok) {
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `Login failed: ${response.status}`);
      }
      const payload = (await response.json()) as LoginResponse;
      setSessionToken(payload.token);
      setCurrentUserEmail(payload.user.email);
      setManageMessage(`Logged in as ${payload.user.email ?? payload.user.id}`);
    } catch (e) {
      setManageError(formatClientError(e, 'Login failed'));
    } finally {
      setSaveLoading(false);
    }
  }

  async function register() {
    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      if (!response.ok) {
        const apiMessage = await parseApiError(response);
        throw new Error(apiMessage ?? `Register failed: ${response.status}`);
      }
      const payload = (await response.json()) as LoginResponse;
      setSessionToken(payload.token);
      setCurrentUserEmail(payload.user.email);
      setManageMessage(`Registered and logged in as ${payload.user.email ?? payload.user.id}`);
    } catch (e) {
      setManageError(formatClientError(e, 'Register failed'));
    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgOrbTop} />
      <View style={styles.bgOrbRight} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTag}>Meal Planner</Text>
          <Text style={styles.title}>Food Randomizer</Text>
          <Text style={styles.subtitle}>API: {API_BASE_URL}</Text>
        </View>

        <View style={styles.tabRow}>
          <Pressable
            onPress={() => setMode('random')}
            style={[styles.tab, mode === 'random' ? styles.tabActive : null]}
          >
            <Text style={[styles.tabLabel, mode === 'random' ? styles.tabLabelActive : null]}>Random</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('manage')}
            style={[styles.tab, mode === 'manage' ? styles.tabActive : null]}
          >
            <Text style={[styles.tabLabel, mode === 'manage' ? styles.tabLabelActive : null]}>Manage Dishes</Text>
          </Pressable>
        </View>

        {mode === 'random' ? (
          <View style={styles.sectionCard}>
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
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{editingDishId ? 'Edit Dish' : 'Add Dish'}</Text>
            <TextInput
              value={loginEmail}
              onChangeText={setLoginEmail}
              placeholder="Your email (for login)"
              placeholderTextColor="#7d8d86"
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              value={loginPassword}
              onChangeText={setLoginPassword}
              placeholder="Password (min 8 chars)"
              placeholderTextColor="#7d8d86"
              style={styles.input}
              secureTextEntry
            />
            <View style={styles.inlineActions}>
              <Pressable onPress={login} disabled={saveLoading || loginEmail.trim().length === 0 || loginPassword.length < 8} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Login</Text>
              </Pressable>
              <Pressable onPress={register} disabled={saveLoading || loginEmail.trim().length === 0 || loginPassword.length < 8} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Register</Text>
              </Pressable>
              {currentUserEmail ? <Text style={styles.listCardText}>User: {currentUserEmail}</Text> : null}
            </View>
            {!isAuthenticated ? <Text style={styles.error}>Login first to create/edit/archive dishes.</Text> : null}

            <Text style={styles.fieldLabel}>Dish Name</Text>
            <TextInput
              value={dishName}
              onChangeText={setDishName}
              placeholder="Dish name"
              placeholderTextColor="#7d8d86"
              style={styles.input}
            />
            <Text style={styles.fieldLabel}>Description</Text>
            <TextInput
              value={dishDescription}
              onChangeText={setDishDescription}
              placeholder="Description (optional)"
              placeholderTextColor="#7d8d86"
              style={styles.input}
            />
            <Text style={styles.fieldLabel}>Ingredients</Text>
            <TextInput
              value={dishIngredients}
              onChangeText={setDishIngredients}
              placeholder="Ingredients (one per line)"
              placeholderTextColor="#7d8d86"
              style={[styles.input, styles.inputMulti]}
              multiline
            />
            <Text style={styles.fieldLabel}>Steps</Text>
            <TextInput
              value={dishSteps}
              onChangeText={setDishSteps}
              placeholder="Steps (one per line)"
              placeholderTextColor="#7d8d86"
              style={[styles.input, styles.inputMulti]}
              multiline
            />
            <Text style={styles.fieldLabel}>Can Add</Text>
            <TextInput
              value={dishAddOns}
              onChangeText={setDishAddOns}
              placeholder="Can add (one per line)"
              placeholderTextColor="#7d8d86"
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
              disabled={!canSaveDish || saveLoading || !isAuthenticated}
              style={[
                styles.button,
                (!canSaveDish || saveLoading) ? styles.buttonDisabled : null,
                !isAuthenticated ? styles.buttonDisabled : null,
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
            <Text style={styles.hintText}>After login, tap Refresh List to load dishes.</Text>

            {listLoading || detailLoading ? <ActivityIndicator style={styles.loader} /> : null}
            {manageError ? <Text style={styles.error}>{manageError}</Text> : null}
            {manageMessage ? <Text style={styles.success}>{manageMessage}</Text> : null}

            <Text style={styles.sectionTitle}>Dishes</Text>
            <View style={styles.inlineActions}>
              <Pressable onPress={() => applyArchivedFilter('active')} style={[styles.secondaryButton, dishArchivedFilter === 'active' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Active</Text>
              </Pressable>
              <Pressable onPress={() => applyArchivedFilter('archived')} style={[styles.secondaryButton, dishArchivedFilter === 'archived' ? styles.secondaryActive : null]}>
                <Text style={styles.secondaryButtonText}>Archived</Text>
              </Pressable>
            </View>
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
              <View key={dish.id} style={styles.listCard}>
                <Pressable
                  onPress={() => {
                    if (dishArchivedFilter === 'active') {
                      fetchDishById(dish.id);
                    }
                  }}
                >
                  <Text style={styles.listCardTitle}>{dish.name}</Text>
                  <Text style={styles.listCardText}>Type: {dish.dishType ?? 'usual'}</Text>
                  {dish.description ? <Text style={styles.listCardText}>{dish.description}</Text> : null}
                </Pressable>
                {dishArchivedFilter === 'archived' ? (
                  <Pressable
                    onPress={() => unarchiveDishById(dish.id)}
                    disabled={!isAuthenticated || saveLoading}
                    style={[styles.secondaryButton, styles.secondaryActive]}
                  >
                    <Text style={styles.secondaryButtonText}>Unarchive</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}

            {selectedDish ? (
              <View style={styles.selectedDishBlock}>
                <Text style={styles.sectionTitle}>Selected Dish</Text>
                <Pressable
                  onPress={() => loadDishIntoFormForEdit(selectedDish)}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryButtonText}>Edit This Dish</Text>
                </Pressable>
                <Pressable
                  onPress={archiveSelectedDish}
                  disabled={!isAuthenticated || saveLoading}
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
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

function parseLines(input: string) {
  return input
    .split('\n')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

async function parseApiError(response: Response): Promise<string | null> {
  try {
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) return null;
    const payload = (await response.json()) as { message?: string | string[] };
    if (Array.isArray(payload.message)) return payload.message.join(', ');
    return payload.message ?? null;
  } catch {
    return null;
  }
}

function formatClientError(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    if (error.message === 'Network request failed') {
      return 'Cannot reach API. Check API URL, server status, and Android HTTP settings.';
    }
    return error.message;
  }
  return fallback;
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
    backgroundColor: '#f0f5f2',
  },
  bgOrbTop: {
    position: 'absolute',
    top: -60,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: '#d6efe2',
  },
  bgOrbRight: {
    position: 'absolute',
    top: 120,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: '#e6f4ec',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
  },
  heroCard: {
    backgroundColor: '#123f2a',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#0a2217',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  heroTag: {
    alignSelf: 'flex-start',
    color: '#123f2a',
    backgroundColor: '#d6efe2',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    color: '#f3fbf7',
  },
  subtitle: {
    color: '#d4e8de',
    fontSize: 13,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 6,
    gap: 10,
  },
  tab: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#dbe4df',
    borderWidth: 1,
    borderColor: '#c8d4ce',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#123f2a',
    borderColor: '#123f2a',
  },
  tabLabel: {
    fontWeight: '700',
    color: '#234536',
  },
  tabLabelActive: {
    color: '#eef9f2',
  },
  sectionCard: {
    backgroundColor: '#fbfffc',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#d8e6dd',
    shadowColor: '#17382a',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  button: {
    backgroundColor: '#1c7547',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  buttonDisabled: {
    opacity: 0.52,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#edf4ef',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d2dfd7',
  },
  secondaryButtonMuted: {
    opacity: 0.9,
  },
  secondaryActive: {
    backgroundColor: '#d6efe2',
    borderColor: '#9bcbb2',
  },
  secondaryDanger: {
    backgroundColor: '#ffe5e5',
    borderColor: '#f2bbbb',
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#204434',
    fontWeight: '600',
  },
  inlineActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    marginBottom: 6,
  },
  loader: {
    marginTop: 14,
  },
  error: {
    marginTop: 12,
    color: '#b5372b',
    fontWeight: '600',
  },
  success: {
    marginTop: 12,
    color: '#1f7a4a',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fdfefe',
    borderColor: '#c7d8cf',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 10,
    color: '#113224',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#23493a',
    marginBottom: -4,
  },
  hintText: {
    fontSize: 13,
    color: '#5b6f65',
    marginTop: 2,
    marginBottom: 6,
  },
  inputMulti: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  empty: {
    color: '#5e6f66',
    marginTop: 4,
  },
  listCard: {
    backgroundColor: '#f8fcf9',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#d8e6dd',
  },
  listCardTitle: {
    fontWeight: '800',
    fontSize: 16,
    color: '#133726',
  },
  listCardText: {
    marginTop: 4,
    color: '#4f6659',
  },
  selectedDishBlock: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#dbe7df',
  },
  card: {
    marginTop: 18,
    backgroundColor: '#f7fbf8',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d7e7dd',
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 8,
    color: '#133827',
  },
  description: {
    color: '#4b6357',
    marginBottom: 12,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '800',
    fontSize: 16,
    color: '#193a2b',
  },
  listItem: {
    color: '#244336',
    marginBottom: 4,
  },
});
