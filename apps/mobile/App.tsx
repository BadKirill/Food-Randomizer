import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Modal,
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
type ManageTab = 'form' | 'list';
type LoginResponse = {
  token: string;
  user: { id: string; email: string | null };
  expiresAt: string;
};

export default function App() {
  const [mode, setMode] = useState<ScreenMode>('random');
  const [manageTab, setManageTab] = useState<ManageTab>('form');

  const [loginEmail, setLoginEmail] = useState(DEFAULT_LOGIN_EMAIL);
  const [loginPassword, setLoginPassword] = useState('');
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  const [randomData, setRandomData] = useState<RandomNextResponse | null>(null);
  const [randomLoading, setRandomLoading] = useState(false);
  const [randomError, setRandomError] = useState<string | null>(null);
  const [randomDishTypeFilter, setRandomDishTypeFilter] = useState<'all' | 'usual' | 'vegetarian' | 'vegan'>('all');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [dishModalOpen, setDishModalOpen] = useState(false);

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

  const randomButtonScale = useRef(new Animated.Value(1)).current;
  const randomButtonOpacity = useRef(new Animated.Value(1)).current;

  const canSaveDish = useMemo(() => {
    return dishName.trim().length > 0 && parseLines(dishIngredients).length > 0 && parseLines(dishSteps).length > 0;
  }, [dishName, dishIngredients, dishSteps]);

  const isAuthenticated = Boolean(sessionToken);

  async function fetchRandomDish() {
    setRandomLoading(true);
    setRandomError(null);

    Animated.parallel([
      Animated.timing(randomButtonScale, {
        toValue: 0.86,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(randomButtonOpacity, {
        toValue: 0.2,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

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
      setDishModalOpen(true);
    } catch (e) {
      setRandomError(formatClientError(e, 'Failed to fetch dish from backend'));
    } finally {
      setRandomLoading(false);
      Animated.parallel([
        Animated.spring(randomButtonScale, {
          toValue: 1,
          speed: 12,
          bounciness: 8,
          useNativeDriver: true,
        }),
        Animated.timing(randomButtonOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
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
      setManageTab('list');
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
    setManageTab('form');
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
      setManageTab('list');
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
      if (editingDishId === selectedDish.id) {
        setEditingDishId(null);
        clearDishForm();
      }
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
      setManageMessage('Login successful');
      await fetchDishes();
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
      setManageMessage('Registration successful');
      await fetchDishes();
    } catch (e) {
      setManageError(formatClientError(e, 'Register failed'));
    } finally {
      setSaveLoading(false);
    }
  }

  function clearField(value: string, setter: (v: string) => void) {
    return (
      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={setter}
          placeholderTextColor="#63736d"
          style={styles.inputControl}
        />
        {value.length > 0 ? (
          <Pressable onPress={() => setter('')} style={styles.inputClearBtn}>
            <Text style={styles.inputClearBtnText}>×</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  const selectedFilterLabel =
    randomDishTypeFilter === 'all'
      ? 'All'
      : randomDishTypeFilter === 'usual'
        ? 'Usual'
        : randomDishTypeFilter === 'vegetarian'
          ? 'Vegetarian'
          : 'Vegan';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTag}>Night Mode</Text>
          <Text style={styles.title}>Food Randomizer</Text>
          <Text style={styles.subtitle}>API: {API_BASE_URL}</Text>
        </View>

        <View style={styles.tabRow}>
          <Pressable onPress={() => setMode('random')} style={[styles.tab, mode === 'random' ? styles.tabActive : null]}>
            <Text style={[styles.tabLabel, mode === 'random' ? styles.tabLabelActive : null]}>Random</Text>
          </Pressable>
          <Pressable onPress={() => setMode('manage')} style={[styles.tab, mode === 'manage' ? styles.tabActive : null]}>
            <Text style={[styles.tabLabel, mode === 'manage' ? styles.tabLabelActive : null]}>Manage Dishes</Text>
          </Pressable>
        </View>

        {mode === 'random' ? (
          <View style={styles.randomStage}>
            <Pressable onPress={() => setFilterSheetOpen(true)} style={styles.filterFab}>
              <Text style={styles.filterFabIcon}>≡</Text>
              <Text style={styles.filterFabText}>{selectedFilterLabel}</Text>
            </Pressable>

            <View style={styles.randomCenterWrap}>
              <Animated.View style={{ opacity: randomButtonOpacity, transform: [{ scale: randomButtonScale }] }}>
                <Pressable
                  onPress={fetchRandomDish}
                  disabled={randomLoading}
                  style={[styles.randomBigButton, randomLoading ? styles.buttonDisabled : null]}
                >
                  <Text style={styles.randomBigButtonText}>{randomLoading ? 'Picking...' : 'Random'}</Text>
                </Pressable>
              </Animated.View>
              {randomLoading ? <ActivityIndicator style={styles.loader} color="#52ff9f" /> : null}
              {randomError ? <Text style={styles.error}>{randomError}</Text> : null}
            </View>
          </View>
        ) : (
          <View style={styles.sectionCard}>
            <View style={styles.manageHeaderBar}>
              <Text style={styles.manageHeaderTitle}>Manage Dishes</Text>
              <Text style={styles.manageHeaderUser}>{currentUserEmail ? `Logged in: ${currentUserEmail}` : 'Not logged in'}</Text>
            </View>

            {!isAuthenticated ? (
              <>
                <Text style={styles.hintText}>Login or register to open dish management.</Text>
                <Text style={styles.fieldLabel}>Email</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    value={loginEmail}
                    onChangeText={setLoginEmail}
                    placeholder="Your email"
                    placeholderTextColor="#63736d"
                    style={styles.inputControl}
                    autoCapitalize="none"
                  />
                  {loginEmail.length > 0 ? (
                    <Pressable onPress={() => setLoginEmail('')} style={styles.inputClearBtn}>
                      <Text style={styles.inputClearBtnText}>×</Text>
                    </Pressable>
                  ) : null}
                </View>

                <Text style={styles.fieldLabel}>Password</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    value={loginPassword}
                    onChangeText={setLoginPassword}
                    placeholder="Password (min 8 chars)"
                    placeholderTextColor="#63736d"
                    style={styles.inputControl}
                    secureTextEntry
                  />
                  {loginPassword.length > 0 ? (
                    <Pressable onPress={() => setLoginPassword('')} style={styles.inputClearBtn}>
                      <Text style={styles.inputClearBtnText}>×</Text>
                    </Pressable>
                  ) : null}
                </View>

                <View style={styles.inlineActions}>
                  <Pressable
                    testID="auth-login-button"
                    onPress={login}
                    disabled={saveLoading || loginEmail.trim().length === 0 || loginPassword.length < 8}
                    style={styles.secondaryButton}
                  >
                    <Text style={styles.secondaryButtonText}>Login</Text>
                  </Pressable>
                  <Pressable
                    testID="auth-register-button"
                    onPress={register}
                    disabled={saveLoading || loginEmail.trim().length === 0 || loginPassword.length < 8}
                    style={styles.secondaryButton}
                  >
                    <Text style={styles.secondaryButtonText}>Register</Text>
                  </Pressable>
                </View>
                {manageError ? <Text style={styles.error}>{manageError}</Text> : null}
                {manageMessage ? <Text style={styles.success}>{manageMessage}</Text> : null}
              </>
            ) : (
              <>
                <View style={styles.manageSubTabRow}>
                  <Pressable onPress={() => setManageTab('form')} style={[styles.tab, manageTab === 'form' ? styles.tabActive : null]}>
                    <Text style={[styles.tabLabel, manageTab === 'form' ? styles.tabLabelActive : null]}>{editingDishId ? 'Edit Form' : 'Add Form'}</Text>
                  </Pressable>
                  <Pressable onPress={() => setManageTab('list')} style={[styles.tab, manageTab === 'list' ? styles.tabActive : null]}>
                    <Text style={[styles.tabLabel, manageTab === 'list' ? styles.tabLabelActive : null]}>Dishes List</Text>
                  </Pressable>
                </View>

                {manageTab === 'form' ? (
                  <>
                    <View style={styles.formTopBar}>
                      <Text style={styles.sectionTitle}>{editingDishId ? 'Edit Dish' : 'Add Dish'}</Text>
                      <Pressable
                        onPress={() => {
                          setEditingDishId(null);
                          clearDishForm();
                        }}
                        style={[styles.secondaryButton, styles.secondaryButtonMuted]}
                      >
                        <Text style={styles.secondaryButtonText}>Clear All</Text>
                      </Pressable>
                    </View>

                    <Text style={styles.fieldLabel}>Dish Name</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        value={dishName}
                        onChangeText={setDishName}
                        placeholder="Dish name"
                        placeholderTextColor="#63736d"
                        style={styles.inputControl}
                      />
                      {dishName.length > 0 ? (
                        <Pressable onPress={() => setDishName('')} style={styles.inputClearBtn}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.fieldLabel}>Description</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        value={dishDescription}
                        onChangeText={setDishDescription}
                        placeholder="Description (optional)"
                        placeholderTextColor="#63736d"
                        style={styles.inputControl}
                      />
                      {dishDescription.length > 0 ? (
                        <Pressable onPress={() => setDishDescription('')} style={styles.inputClearBtn}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.fieldLabel}>Ingredients</Text>
                    <View style={[styles.inputRow, styles.inputRowMulti]}>
                      <TextInput
                        value={dishIngredients}
                        onChangeText={setDishIngredients}
                        placeholder="Ingredients (one per line)"
                        placeholderTextColor="#63736d"
                        style={[styles.inputControl, styles.inputControlMulti]}
                        multiline
                      />
                      {dishIngredients.length > 0 ? (
                        <Pressable onPress={() => setDishIngredients('')} style={styles.inputClearBtn}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.fieldLabel}>Steps</Text>
                    <View style={[styles.inputRow, styles.inputRowMulti]}>
                      <TextInput
                        value={dishSteps}
                        onChangeText={setDishSteps}
                        placeholder="Steps (one per line)"
                        placeholderTextColor="#63736d"
                        style={[styles.inputControl, styles.inputControlMulti]}
                        multiline
                      />
                      {dishSteps.length > 0 ? (
                        <Pressable onPress={() => setDishSteps('')} style={styles.inputClearBtn}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.fieldLabel}>Can Add</Text>
                    <View style={[styles.inputRow, styles.inputRowMulti]}>
                      <TextInput
                        value={dishAddOns}
                        onChangeText={setDishAddOns}
                        placeholder="Can add (one per line)"
                        placeholderTextColor="#63736d"
                        style={[styles.inputControl, styles.inputControlMulti]}
                        multiline
                      />
                      {dishAddOns.length > 0 ? (
                        <Pressable onPress={() => setDishAddOns('')} style={styles.inputClearBtn}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

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
                      style={[styles.button, !canSaveDish || saveLoading ? styles.buttonDisabled : null]}
                    >
                      <Text style={styles.buttonText}>{saveLoading ? 'Saving...' : editingDishId ? 'Save Changes' : 'Save Dish'}</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <View style={styles.listTopRow}>
                      <Text style={styles.sectionTitle}>Dishes</Text>
                      <Pressable testID="manage-refresh-button" onPress={() => fetchDishes()} style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Refresh List</Text>
                      </Pressable>
                    </View>

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
                          testID={`dish-row-${dish.id}`}
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
                            testID={`dish-unarchive-${dish.id}`}
                            onPress={() => unarchiveDishById(dish.id)}
                            disabled={saveLoading}
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
                        <View style={styles.inlineActions}>
                          <Pressable onPress={() => loadDishIntoFormForEdit(selectedDish)} style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Edit This Dish</Text>
                          </Pressable>
                          <Pressable
                            testID="dish-archive-button"
                            onPress={archiveSelectedDish}
                            disabled={saveLoading}
                            style={[styles.secondaryButton, styles.secondaryDanger]}
                          >
                            <Text style={styles.secondaryButtonText}>Archive Dish</Text>
                          </Pressable>
                        </View>
                        <DishDetailsBlock dish={selectedDish} />
                      </View>
                    ) : null}
                  </>
                )}

                {listLoading || detailLoading ? <ActivityIndicator style={styles.loader} color="#52ff9f" /> : null}
                {manageError ? <Text style={styles.error}>{manageError}</Text> : null}
                {manageMessage ? <Text style={styles.success}>{manageMessage}</Text> : null}
              </>
            )}
          </View>
        )}
      </ScrollView>

      <Modal visible={filterSheetOpen} animationType="fade" transparent onRequestClose={() => setFilterSheetOpen(false)}>
        <View style={styles.sheetBackdrop}>
          <View style={styles.sheetCard}>
            <Text style={styles.sheetTitle}>Choose Dish Type</Text>
            {(['all', 'usual', 'vegetarian', 'vegan'] as const).map((kind) => (
              <Pressable
                key={kind}
                style={[styles.sheetButton, randomDishTypeFilter === kind ? styles.sheetButtonActive : null]}
                onPress={() => {
                  setRandomDishTypeFilter(kind);
                  setFilterSheetOpen(false);
                }}
              >
                <Text style={styles.sheetButtonText}>{kind === 'all' ? 'All' : kind === 'usual' ? 'Usual' : kind === 'vegetarian' ? 'Vegetarian' : 'Vegan'}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setFilterSheetOpen(false)} style={styles.sheetCloseButton}>
              <Text style={styles.sheetCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={dishModalOpen} animationType="slide" onRequestClose={() => setDishModalOpen(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeaderRow}>
            <Text style={styles.modalHeaderTitle}>Your Dish</Text>
            <Pressable onPress={() => setDishModalOpen(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
          {randomData ? <DishModalScreen dish={randomData.dish} /> : null}
        </SafeAreaView>
      </Modal>

      <StatusBar style="light" />
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

function DishDetailsBlock({ dish }: { dish: DishDetail }) {
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

function DishModalScreen({ dish }: { dish: DishDetail }) {
  return (
    <ScrollView contentContainerStyle={styles.modalContent}>
      <Text style={styles.modalDishTitle}>{dish.name}</Text>
      <View style={styles.modalInfoBlock}>
        <Text style={styles.modalType}>Type: {dish.dishType ?? 'usual'}</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040b08',
  },
  glowOne: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: '#0f2e1f',
    top: -70,
    left: -80,
  },
  glowTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: '#072217',
    bottom: 80,
    right: -70,
  },
  content: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 14,
  },
  heroCard: {
    backgroundColor: '#08140f',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#1b4f36',
    shadowColor: '#52ff9f',
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  heroTag: {
    alignSelf: 'flex-start',
    color: '#03130b',
    backgroundColor: '#52ff9f',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: '700',
    fontSize: 11,
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 6,
    color: '#effff6',
  },
  subtitle: {
    color: '#9ad7b7',
    fontSize: 13,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 10,
  },
  manageSubTabRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 6,
  },
  tab: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#0f1915',
    borderWidth: 1,
    borderColor: '#1b3b2a',
  },
  tabActive: {
    backgroundColor: '#0d2d1f',
    borderColor: '#52ff9f',
  },
  tabLabel: {
    fontWeight: '700',
    color: '#98b8a8',
  },
  tabLabelActive: {
    color: '#d7ffe9',
  },
  randomStage: {
    minHeight: 420,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1a3b2a',
    backgroundColor: '#09120f',
    padding: 14,
  },
  filterFab: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#0f2d20',
    borderWidth: 1,
    borderColor: '#2f7a55',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  filterFabIcon: {
    color: '#52ff9f',
    fontSize: 16,
    fontWeight: '900',
  },
  filterFabText: {
    color: '#d7ffe8',
    fontWeight: '700',
    fontSize: 13,
  },
  randomCenterWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  randomBigButton: {
    width: 190,
    height: 190,
    borderRadius: 999,
    backgroundColor: '#0e3a28',
    borderWidth: 2,
    borderColor: '#52ff9f',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#52ff9f',
    shadowOpacity: 0.34,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  randomBigButtonText: {
    color: '#d8ffeb',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionCard: {
    backgroundColor: '#0a1310',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1d3f2e',
  },
  manageHeaderBar: {
    borderWidth: 1,
    borderColor: '#1f4a35',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#091812',
    marginBottom: 8,
  },
  manageHeaderTitle: {
    color: '#c4ffd8',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 4,
  },
  manageHeaderUser: {
    color: '#8bb7a1',
    fontWeight: '600',
    fontSize: 13,
  },
  formTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 10,
  },
  listTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    backgroundColor: '#0d6f43',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#52ff9f',
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.52,
  },
  buttonText: {
    color: '#e8fff3',
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#0f1b16',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a4b3a',
  },
  secondaryButtonMuted: {
    opacity: 0.9,
  },
  secondaryActive: {
    backgroundColor: '#163a29',
    borderColor: '#52ff9f',
  },
  secondaryDanger: {
    backgroundColor: '#2d1414',
    borderColor: '#7a3030',
  },
  secondaryButtonText: {
    color: '#ccf7df',
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
    marginTop: 8,
  },
  error: {
    marginTop: 10,
    color: '#ff8b8b',
    fontWeight: '700',
  },
  success: {
    marginTop: 10,
    color: '#52ff9f',
    fontWeight: '700',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8af0be',
    marginTop: 10,
    marginBottom: 8,
  },
  hintText: {
    fontSize: 13,
    color: '#86a598',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#29523f',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#06100d',
    paddingLeft: 12,
    paddingRight: 8,
  },
  inputRowMulti: {
    alignItems: 'flex-start',
    minHeight: 120,
  },
  inputControl: {
    flex: 1,
    color: '#e8fff2',
    paddingVertical: 11,
  },
  inputControlMulti: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  inputClearBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5f6d67',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 6,
  },
  inputClearBtnText: {
    color: '#ecf7f1',
    fontWeight: '900',
    lineHeight: 20,
    fontSize: 16,
  },
  empty: {
    color: '#8da79a',
    marginTop: 6,
  },
  listCard: {
    backgroundColor: '#0b1713',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#244734',
  },
  listCardTitle: {
    fontWeight: '800',
    fontSize: 16,
    color: '#d8ffeb',
  },
  listCardText: {
    marginTop: 4,
    color: '#9bc7b1',
  },
  selectedDishBlock: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#234535',
  },
  card: {
    marginTop: 18,
    backgroundColor: '#08120f',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#244634',
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 8,
    color: '#e3ffee',
  },
  description: {
    color: '#95bca8',
    marginBottom: 12,
  },
  sectionTitle: {
    marginTop: 6,
    marginBottom: 6,
    fontWeight: '800',
    fontSize: 18,
    color: '#9effcb',
  },
  listItem: {
    color: '#c7f4de',
    marginBottom: 4,
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 8, 5, 0.78)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sheetCard: {
    backgroundColor: '#08140f',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2f6f4d',
    padding: 16,
    gap: 8,
  },
  sheetTitle: {
    color: '#d9ffeb',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 4,
  },
  sheetButton: {
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2c4f3d',
    backgroundColor: '#101f19',
  },
  sheetButtonActive: {
    borderColor: '#52ff9f',
    backgroundColor: '#153a29',
  },
  sheetButtonText: {
    color: '#d8fce9',
    fontWeight: '700',
  },
  sheetCloseButton: {
    marginTop: 4,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sheetCloseText: {
    color: '#8ec9ac',
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#030a07',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e4331',
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#d8ffea',
  },
  modalCloseButton: {
    borderWidth: 1,
    borderColor: '#52ff9f',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: '#103726',
  },
  modalCloseText: {
    color: '#dbffec',
    fontWeight: '700',
  },
  modalContent: {
    padding: 16,
    gap: 12,
  },
  modalDishTitle: {
    color: '#ecfff5',
    fontSize: 30,
    fontWeight: '900',
  },
  modalInfoBlock: {
    backgroundColor: '#08130f',
    borderWidth: 1,
    borderColor: '#1f4733',
    borderRadius: 16,
    padding: 14,
  },
  modalType: {
    color: '#9deec4',
    fontWeight: '700',
    marginBottom: 6,
  },
});
