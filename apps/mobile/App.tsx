import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
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
  const [selectedDishModalOpen, setSelectedDishModalOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [dishListFilter, setDishListFilter] = useState<'all' | 'usual' | 'vegetarian' | 'vegan'>('all');
  const [dishArchivedFilter, setDishArchivedFilter] = useState<'active' | 'archived'>('active');

  const randomButtonScale = useRef(new Animated.Value(1)).current;
  const randomButtonOpacity = useRef(new Animated.Value(1)).current;
  const selectedDishSheetY = useRef(new Animated.Value(0)).current;

  const canSaveDish = useMemo(() => {
    return dishName.trim().length > 0 && parseLines(dishIngredients).length > 0 && parseLines(dishSteps).length > 0;
  }, [dishName, dishIngredients, dishSteps]);

  const isAuthenticated = Boolean(sessionToken);

  function animateRandomPressed(pressed: boolean) {
    Animated.parallel([
      Animated.timing(randomButtonScale, {
        toValue: pressed ? 0.9 : 1,
        duration: 110,
        useNativeDriver: true,
      }),
      Animated.timing(randomButtonOpacity, {
        toValue: pressed ? 0.72 : 1,
        duration: 110,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handleRandomPressIn() {
    if (randomLoading) return;
    clearTransientFeedback();
    animateRandomPressed(true);
  }

  async function handleRandomPressOut() {
    if (randomLoading) return;
    await fetchRandomDish();
    animateRandomPressed(false);
  }

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
      setDishModalOpen(true);
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

  function clearTransientFeedback() {
    if (manageMessage) setManageMessage(null);
    if (manageError) setManageError(null);
  }

  async function fetchDishById(dishId: string, openModal = true) {
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
      if (openModal) {
        setSelectedDishModalOpen(true);
      }
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

  const selectedFilterLabel =
    randomDishTypeFilter === 'all'
      ? 'All'
      : randomDishTypeFilter === 'usual'
        ? 'Usual'
        : randomDishTypeFilter === 'vegetarian'
          ? 'Vegetarian'
          : 'Vegan';

  const selectedDishPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && gestureState.dy > 6,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          selectedDishSheetY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120 || gestureState.vy > 0.8) {
          Animated.timing(selectedDishSheetY, {
            toValue: 480,
            duration: 180,
            useNativeDriver: true,
          }).start(() => {
            selectedDishSheetY.setValue(0);
            setSelectedDishModalOpen(false);
          });
          return;
        }
        Animated.spring(selectedDishSheetY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}
      >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {mode === 'random' ? (
          <View style={styles.randomStage}>
            <Pressable onPress={() => setFilterSheetOpen(true)} style={({ pressed }) => [styles.filterFab, pressed ? styles.buttonPressed : null]}>
              <Text style={styles.filterFabIcon}>≡</Text>
              <Text style={styles.filterFabText}>{selectedFilterLabel}</Text>
            </Pressable>

            <View style={styles.randomCenterWrap}>
              <Animated.View style={{ opacity: randomButtonOpacity, transform: [{ scale: randomButtonScale }] }}>
                <Pressable
                  testID="random-action-button"
                  onPressIn={handleRandomPressIn}
                  onPressOut={handleRandomPressOut}
                  disabled={randomLoading}
                  style={({ pressed }) => [
                    styles.randomBigButton,
                    pressed ? styles.buttonPressed : null,
                    randomLoading ? styles.buttonDisabled : null,
                  ]}
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
                    onChangeText={(v) => {
                      clearTransientFeedback();
                      setLoginEmail(v);
                    }}
                    placeholder="Your email"
                    placeholderTextColor="#63736d"
                    style={styles.inputControl}
                    autoCapitalize="none"
                  />
                  {loginEmail.length > 0 ? (
                    <Pressable onPress={() => setLoginEmail('')} style={({ pressed }) => [styles.inputClearBtn, pressed ? styles.buttonPressed : null]}>
                      <Text style={styles.inputClearBtnText}>×</Text>
                    </Pressable>
                  ) : null}
                </View>

                <Text style={styles.fieldLabel}>Password</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    value={loginPassword}
                    onChangeText={(v) => {
                      clearTransientFeedback();
                      setLoginPassword(v);
                    }}
                    placeholder="Password (min 8 chars)"
                    placeholderTextColor="#63736d"
                    style={styles.inputControl}
                    secureTextEntry
                  />
                  {loginPassword.length > 0 ? (
                    <Pressable onPress={() => setLoginPassword('')} style={({ pressed }) => [styles.inputClearBtn, pressed ? styles.buttonPressed : null]}>
                      <Text style={styles.inputClearBtnText}>×</Text>
                    </Pressable>
                  ) : null}
                </View>

                <View style={styles.inlineActions}>
                  <Pressable
                    testID="auth-login-button"
                    onPress={login}
                    disabled={saveLoading || loginEmail.trim().length === 0 || loginPassword.length < 8}
                    style={({ pressed }) => [styles.secondaryButton, pressed ? styles.buttonPressed : null]}
                  >
                    <Text style={styles.secondaryButtonText}>Login</Text>
                  </Pressable>
                  <Pressable
                    testID="auth-register-button"
                    onPress={register}
                    disabled={saveLoading || loginEmail.trim().length === 0 || loginPassword.length < 8}
                    style={({ pressed }) => [styles.secondaryButton, pressed ? styles.buttonPressed : null]}
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
                  <Pressable
                    onPress={() => {
                      clearTransientFeedback();
                      setManageTab('form');
                    }}
                    style={({ pressed }) => [styles.tab, manageTab === 'form' ? styles.tabActive : null, pressed ? styles.buttonPressed : null]}
                  >
                    <Text style={[styles.tabLabel, manageTab === 'form' ? styles.tabLabelActive : null]}>{editingDishId ? 'Edit Form' : 'Add Form'}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      clearTransientFeedback();
                      setManageTab('list');
                    }}
                    style={({ pressed }) => [styles.tab, manageTab === 'list' ? styles.tabActive : null, pressed ? styles.buttonPressed : null]}
                  >
                    <Text style={[styles.tabLabel, manageTab === 'list' ? styles.tabLabelActive : null]}>Dishes List</Text>
                  </Pressable>
                </View>

                {manageTab === 'form' ? (
                  <>
                    <View style={styles.formTopBar}>
                      <Text style={styles.sectionTitle}>{editingDishId ? 'Edit Dish' : 'Add Dish'}</Text>
                      <Pressable
                        onPress={() => {
                          clearTransientFeedback();
                          setEditingDishId(null);
                          clearDishForm();
                        }}
                        style={({ pressed }) => [styles.secondaryButton, styles.secondaryButtonMuted, pressed ? styles.buttonPressed : null]}
                      >
                        <Text style={styles.secondaryButtonText}>Clear All</Text>
                      </Pressable>
                    </View>

                    <View style={styles.typeChooserTop}>
                      <Text style={styles.typeChooserTitle}>Dish Type</Text>
                      <View style={styles.inlineActions}>
                        <Pressable
                          onPress={() => {
                            clearTransientFeedback();
                            setDishType('usual');
                          }}
                          style={({ pressed }) => [styles.secondaryButton, dishType === 'usual' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                        >
                          <Text style={styles.secondaryButtonText}>Usual</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            clearTransientFeedback();
                            setDishType('vegetarian');
                          }}
                          style={({ pressed }) => [styles.secondaryButton, dishType === 'vegetarian' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                        >
                          <Text style={styles.secondaryButtonText}>Vegetarian</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            clearTransientFeedback();
                            setDishType('vegan');
                          }}
                          style={({ pressed }) => [styles.secondaryButton, dishType === 'vegan' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                        >
                          <Text style={styles.secondaryButtonText}>Vegan</Text>
                        </Pressable>
                      </View>
                    </View>

                    <Text style={styles.fieldLabel}>Dish Name</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        value={dishName}
                        onChangeText={(v) => {
                          clearTransientFeedback();
                          setDishName(v);
                        }}
                        placeholder="Dish name"
                        placeholderTextColor="#63736d"
                        style={styles.inputControl}
                      />
                      {dishName.length > 0 ? (
                        <Pressable onPress={() => setDishName('')} style={({ pressed }) => [styles.inputClearBtn, pressed ? styles.buttonPressed : null]}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.fieldLabel}>Description</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        value={dishDescription}
                        onChangeText={(v) => {
                          clearTransientFeedback();
                          setDishDescription(v);
                        }}
                        placeholder="Description (optional)"
                        placeholderTextColor="#63736d"
                        style={styles.inputControl}
                      />
                      {dishDescription.length > 0 ? (
                        <Pressable onPress={() => setDishDescription('')} style={({ pressed }) => [styles.inputClearBtn, pressed ? styles.buttonPressed : null]}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.fieldLabel}>Ingredients</Text>
                    <View style={[styles.inputRow, styles.inputRowMulti]}>
                      <TextInput
                        value={dishIngredients}
                        onChangeText={(v) => {
                          clearTransientFeedback();
                          setDishIngredients(v);
                        }}
                        placeholder="Ingredients (one per line)"
                        placeholderTextColor="#63736d"
                        style={[styles.inputControl, styles.inputControlMulti]}
                        multiline
                      />
                      {dishIngredients.length > 0 ? (
                        <Pressable onPress={() => setDishIngredients('')} style={({ pressed }) => [styles.inputClearBtn, styles.inputClearBtnMulti, pressed ? styles.buttonPressed : null]}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.fieldLabel}>Steps</Text>
                    <View style={[styles.inputRow, styles.inputRowMulti]}>
                      <TextInput
                        value={dishSteps}
                        onChangeText={(v) => {
                          clearTransientFeedback();
                          setDishSteps(v);
                        }}
                        placeholder="Steps (one per line)"
                        placeholderTextColor="#63736d"
                        style={[styles.inputControl, styles.inputControlMulti]}
                        multiline
                      />
                      {dishSteps.length > 0 ? (
                        <Pressable onPress={() => setDishSteps('')} style={({ pressed }) => [styles.inputClearBtn, styles.inputClearBtnMulti, pressed ? styles.buttonPressed : null]}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.fieldLabel}>Can Add</Text>
                    <View style={[styles.inputRow, styles.inputRowMulti]}>
                      <TextInput
                        value={dishAddOns}
                        onChangeText={(v) => {
                          clearTransientFeedback();
                          setDishAddOns(v);
                        }}
                        placeholder="Can add (one per line)"
                        placeholderTextColor="#63736d"
                        style={[styles.inputControl, styles.inputControlMulti]}
                        multiline
                      />
                      {dishAddOns.length > 0 ? (
                        <Pressable onPress={() => setDishAddOns('')} style={({ pressed }) => [styles.inputClearBtn, styles.inputClearBtnMulti, pressed ? styles.buttonPressed : null]}>
                          <Text style={styles.inputClearBtnText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Pressable
                      onPress={editingDishId ? updateDish : createDish}
                      disabled={!canSaveDish || saveLoading}
                      style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null, !canSaveDish || saveLoading ? styles.buttonDisabled : null]}
                    >
                      <Text style={styles.buttonText}>{saveLoading ? 'Saving...' : editingDishId ? 'Save Changes' : 'Save Dish'}</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <View style={styles.listTopRow}>
                      <Text style={styles.listHeaderTitle}>Dishes</Text>
                      <Pressable
                        testID="manage-refresh-button"
                        onPress={() => {
                          clearTransientFeedback();
                          fetchDishes();
                        }}
                        style={({ pressed }) => [styles.secondaryButton, pressed ? styles.buttonPressed : null]}
                      >
                        <Text style={styles.secondaryButtonText}>Refresh List</Text>
                      </Pressable>
                    </View>

                    <View style={styles.inlineActions}>
                      <Pressable
                        onPress={() => {
                          clearTransientFeedback();
                          applyArchivedFilter('active');
                        }}
                        style={({ pressed }) => [styles.secondaryButton, dishArchivedFilter === 'active' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                      >
                        <Text style={styles.secondaryButtonText}>Active</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          clearTransientFeedback();
                          applyArchivedFilter('archived');
                        }}
                        style={({ pressed }) => [styles.secondaryButton, dishArchivedFilter === 'archived' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                      >
                        <Text style={styles.secondaryButtonText}>Archived</Text>
                      </Pressable>
                    </View>

                    <View style={styles.inlineActions}>
                      <Pressable
                        onPress={() => {
                          clearTransientFeedback();
                          applyDishFilter('all');
                        }}
                        style={({ pressed }) => [styles.secondaryButton, dishListFilter === 'all' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                      >
                        <Text style={styles.secondaryButtonText}>All</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          clearTransientFeedback();
                          applyDishFilter('usual');
                        }}
                        style={({ pressed }) => [styles.secondaryButton, dishListFilter === 'usual' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                      >
                        <Text style={styles.secondaryButtonText}>Usual</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          clearTransientFeedback();
                          applyDishFilter('vegetarian');
                        }}
                        style={({ pressed }) => [styles.secondaryButton, dishListFilter === 'vegetarian' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                      >
                        <Text style={styles.secondaryButtonText}>Vegetarian</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          clearTransientFeedback();
                          applyDishFilter('vegan');
                        }}
                        style={({ pressed }) => [styles.secondaryButton, dishListFilter === 'vegan' ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
                      >
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
                              fetchDishById(dish.id, true);
                            }
                          }}
                          style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
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
                            style={({ pressed }) => [styles.secondaryButton, styles.secondaryActive, pressed ? styles.buttonPressed : null]}
                          >
                            <Text style={styles.secondaryButtonText}>Unarchive</Text>
                          </Pressable>
                        ) : null}
                      </View>
                    ))}

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
      </KeyboardAvoidingView>
      <View style={styles.bottomTabRow}>
        <Pressable
          onPress={() => {
            clearTransientFeedback();
            setMode('random');
          }}
          style={({ pressed }) => [styles.bottomTab, mode === 'random' ? styles.bottomTabActive : null, pressed ? styles.buttonPressed : null]}
        >
          <Text style={styles.bottomTabIcon}>◉</Text>
          <Text style={[styles.bottomTabLabel, mode === 'random' ? styles.bottomTabLabelActive : null]}>Random</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            clearTransientFeedback();
            setMode('manage');
          }}
          style={({ pressed }) => [styles.bottomTab, mode === 'manage' ? styles.bottomTabActive : null, pressed ? styles.buttonPressed : null]}
        >
          <Text style={styles.bottomTabIcon}>☰</Text>
          <Text style={[styles.bottomTabLabel, mode === 'manage' ? styles.bottomTabLabelActive : null]}>Manage</Text>
        </Pressable>
      </View>

      <Modal visible={filterSheetOpen} animationType="fade" transparent onRequestClose={() => setFilterSheetOpen(false)}>
        <View style={styles.sheetBackdrop}>
          <View style={styles.sheetCard}>
            <Text style={styles.sheetTitle}>Choose Dish Type</Text>
            {(['all', 'usual', 'vegetarian', 'vegan'] as const).map((kind) => (
              <Pressable
                key={kind}
                style={({ pressed }) => [styles.sheetButton, randomDishTypeFilter === kind ? styles.sheetButtonActive : null, pressed ? styles.buttonPressed : null]}
                onPress={() => {
                  setRandomDishTypeFilter(kind);
                  setFilterSheetOpen(false);
                }}
              >
                <Text style={styles.sheetButtonText}>{kind === 'all' ? 'All' : kind === 'usual' ? 'Usual' : kind === 'vegetarian' ? 'Vegetarian' : 'Vegan'}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setFilterSheetOpen(false)} style={({ pressed }) => [styles.sheetCloseButton, pressed ? styles.buttonPressed : null]}>
              <Text style={styles.sheetCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={dishModalOpen} animationType="slide" onRequestClose={() => setDishModalOpen(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeaderRow}>
            <Text style={styles.modalHeaderTitle}>Your Dish</Text>
            <Pressable onPress={() => setDishModalOpen(false)} style={({ pressed }) => [styles.modalCloseButton, pressed ? styles.buttonPressed : null]}>
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
          {randomData ? <DishModalScreen dish={randomData.dish} /> : null}
        </SafeAreaView>
      </Modal>

      <Modal visible={selectedDishModalOpen} animationType="slide" transparent onRequestClose={() => setSelectedDishModalOpen(false)}>
        <View style={styles.sheetOverlay}>
          <Animated.View
            style={[styles.selectedDishSheet, { transform: [{ translateY: selectedDishSheetY }] }]}
            {...selectedDishPanResponder.panHandlers}
          >
            <View style={styles.selectedSheetHandle} />
            <View style={styles.selectedSheetHeader}>
              <Text style={styles.modalHeaderTitle}>Selected Dish</Text>
              <Pressable onPress={() => setSelectedDishModalOpen(false)} style={({ pressed }) => [styles.modalCloseButton, pressed ? styles.buttonPressed : null]}>
                <Text style={styles.modalCloseText}>Close</Text>
              </Pressable>
            </View>
            {selectedDish ? (
              <ScrollView
                contentContainerStyle={styles.selectedSheetBody}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
              >
                <View style={styles.inlineActions}>
                  <Pressable
                    onPress={() => {
                      setSelectedDishModalOpen(false);
                      loadDishIntoFormForEdit(selectedDish);
                    }}
                  style={({ pressed }) => [styles.secondaryButton, pressed ? styles.buttonPressed : null]}
                  >
                    <Text style={styles.secondaryButtonText}>Edit This Dish</Text>
                  </Pressable>
                  <Pressable
                    testID="dish-archive-button"
                    onPress={async () => {
                      await archiveSelectedDish();
                      setSelectedDishModalOpen(false);
                    }}
                    disabled={saveLoading}
                    style={({ pressed }) => [styles.secondaryButton, styles.secondaryDanger, pressed ? styles.buttonPressed : null]}
                  >
                    <Text style={styles.secondaryButtonText}>Archive Dish</Text>
                  </Pressable>
                </View>
                <DishDetailsBlock dish={selectedDish} />
              </ScrollView>
            ) : null}
          </Animated.View>
        </View>
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
    paddingTop: 12,
    paddingBottom: 150,
    gap: 22,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 14,
  },
  manageSubTabRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
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
    minHeight: 520,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1a3b2a',
    backgroundColor: '#09120f',
    padding: 16,
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
    gap: 18,
  },
  randomBigButton: {
    width: 220,
    height: 220,
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
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionCard: {
    backgroundColor: '#0a1310',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1d3f2e',
  },
  manageHeaderBar: {
    borderWidth: 1,
    borderColor: '#1f4a35',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#091812',
    marginBottom: 12,
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
    marginBottom: 18,
    gap: 10,
  },
  typeChooserTop: {
    marginBottom: 16,
  },
  typeChooserTitle: {
    color: '#8af0be',
    fontWeight: '800',
    fontSize: 14,
    marginBottom: 8,
  },
  listTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 14,
  },
  listHeaderTitle: {
    fontWeight: '800',
    fontSize: 18,
    color: '#9effcb',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0d6f43',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#52ff9f',
    marginTop: 14,
  },
  buttonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
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
    paddingHorizontal: 14,
    paddingVertical: 12,
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
    gap: 14,
    marginTop: 14,
    marginBottom: 14,
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
    marginTop: 16,
    marginBottom: 12,
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
    minHeight: 58,
    position: 'relative',
  },
  inputRowMulti: {
    alignItems: 'flex-start',
    minHeight: 132,
  },
  inputControl: {
    flex: 1,
    color: '#e8fff2',
    paddingVertical: 11,
  },
  inputControlMulti: {
    minHeight: 122,
    textAlignVertical: 'top',
  },
  inputClearBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(214, 231, 221, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(214, 231, 221, 0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: 10,
  },
  inputClearBtnMulti: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  inputClearBtnText: {
    color: '#ecf7f1',
    fontWeight: '900',
    lineHeight: 24,
    fontSize: 20,
  },
  empty: {
    color: '#8da79a',
    marginTop: 6,
  },
  listCard: {
    backgroundColor: '#0b1713',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
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
  keyboardWrap: {
    flex: 1,
  },
  bottomTabRow: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 10,
    flexDirection: 'row',
    gap: 14,
    backgroundColor: 'rgba(6, 16, 12, 0.94)',
    borderWidth: 1,
    borderColor: '#204434',
    borderRadius: 18,
    padding: 10,
  },
  bottomTab: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1e3f2f',
    paddingVertical: 10,
    backgroundColor: '#0a1712',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  bottomTabActive: {
    borderColor: '#52ff9f',
    backgroundColor: '#103526',
  },
  bottomTabIcon: {
    color: '#9bd8b8',
    fontSize: 16,
    fontWeight: '800',
  },
  bottomTabLabel: {
    color: '#9bd8b8',
    fontWeight: '700',
    fontSize: 12,
  },
  bottomTabLabelActive: {
    color: '#deffed',
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 8, 5, 0.74)',
    justifyContent: 'flex-end',
  },
  selectedDishSheet: {
    maxHeight: '88%',
    backgroundColor: '#07110d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#1f4936',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 16,
  },
  selectedSheetHandle: {
    alignSelf: 'center',
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#406455',
    marginBottom: 10,
  },
  selectedSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedSheetBody: {
    paddingBottom: 30,
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
