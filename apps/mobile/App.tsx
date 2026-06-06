import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, KeyboardAvoidingView, PanResponder, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as api from './src/api';
import { ConfirmDishActionModal, DishModal, SelectedDishModal } from './src/components/DishModal';
import { useAuthSession } from './src/hooks/useAuthSession';
import { ManageScreen } from './src/screens/ManageScreen';
import { RandomScreen } from './src/screens/RandomScreen';
import { styles } from './src/theme';
import type { ArchivedFilter, CreateDishPayload, DishDetail, DishFilter, DishListItem, DishType, ManageTab, RandomNextResponse, ScreenMode } from './src/types';
import { parseLines } from './src/utils/forms';

const OWNER_ONLY_MESSAGE = 'Only the creator can edit or archive this dish';
type PendingDishAction = { action: 'archive' | 'unarchive'; dishId: string; dishName: string } | null;

export default function App() {
  const [mode, setMode] = useState<ScreenMode>('random');
  const [manageTab, setManageTab] = useState<ManageTab>('form');
  const auth = useAuthSession();

  const [randomData, setRandomData] = useState<RandomNextResponse | null>(null);
  const [randomLoading, setRandomLoading] = useState(false);
  const [randomError, setRandomError] = useState<string | null>(null);
  const [randomDishTypeFilter, setRandomDishTypeFilter] = useState<DishFilter>('all');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [randomLoaderFrame, setRandomLoaderFrame] = useState(0);

  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishIngredients, setDishIngredients] = useState('');
  const [dishSteps, setDishSteps] = useState('');
  const [dishAddOns, setDishAddOns] = useState('');
  const [dishType, setDishType] = useState<DishType>('vegan');
  const [editingDishId, setEditingDishId] = useState<string | null>(null);

  const [listLoading, setListLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [manageError, setManageError] = useState<string | null>(null);
  const [manageMessage, setManageMessage] = useState<string | null>(null);
  const [manageToast, setManageToast] = useState<string | null>(null);
  const [dishes, setDishes] = useState<DishListItem[]>([]);

  const [selectedDish, setSelectedDish] = useState<DishDetail | null>(null);
  const [selectedDishModalOpen, setSelectedDishModalOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [dishListFilter, setDishListFilter] = useState<DishFilter>('all');
  const [dishArchivedFilter, setDishArchivedFilter] = useState<ArchivedFilter>('active');
  const [pendingDishAction, setPendingDishAction] = useState<PendingDishAction>(null);

  const randomButtonScale = useRef(new Animated.Value(1)).current;
  const randomButtonOpacity = useRef(new Animated.Value(1)).current;
  const selectedDishSheetY = useRef(new Animated.Value(0)).current;

  const canSaveDish = useMemo(() => {
    return dishName.trim().length > 0 && parseLines(dishIngredients).length > 0 && parseLines(dishSteps).length > 0;
  }, [dishName, dishIngredients, dishSteps]);

  useEffect(() => {
    if (!manageToast) return;
    const timer = setTimeout(() => setManageToast(null), 3500);
    return () => clearTimeout(timer);
  }, [manageToast]);

  useEffect(() => {
    if (!randomLoading) return;
    const timer = setInterval(() => {
      setRandomLoaderFrame((prev) => (prev + 1) % 3);
    }, 220);
    return () => clearInterval(timer);
  }, [randomLoading]);

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
    if (!auth.sessionToken) {
      setRandomError('Login to get personal meal picks and keep repeats away.');
      return;
    }

    setRandomLoading(true);
    setRandomError(null);

    try {
      const payload = await api.fetchRandomDish(auth.sessionToken, randomDishTypeFilter);
      setRandomData(payload);
      setDishModalOpen(true);
    } catch (e) {
      setRandomError(api.formatClientError(e, 'Failed to fetch dish from backend'));
    } finally {
      setRandomLoading(false);
    }
  }

  async function fetchDishes(filter: DishFilter = dishListFilter, archived: ArchivedFilter = dishArchivedFilter) {
    setListLoading(true);
    setManageError(null);

    try {
      const payload = await api.fetchDishes(filter, archived);
      setDishes(payload);
    } catch (e) {
      setManageError(api.formatClientError(e, 'Failed to load dishes'));
    } finally {
      setListLoading(false);
    }
  }

  async function applyDishFilter(filter: DishFilter) {
    setDishListFilter(filter);
    await fetchDishes(filter, dishArchivedFilter);
  }

  async function applyArchivedFilter(filter: ArchivedFilter) {
    setDishArchivedFilter(filter);
    setSelectedDish(null);
    await fetchDishes(dishListFilter, filter);
  }

  function clearTransientFeedback() {
    if (manageMessage) setManageMessage(null);
    if (manageError) setManageError(null);
    if (manageToast) setManageToast(null);
  }

  function showOwnerToast() {
    setManageError(null);
    setManageToast(OWNER_ONLY_MESSAGE);
  }

  function showManageToast(message: string) {
    setManageError(null);
    setManageMessage(null);
    setManageToast(message);
  }

  async function fetchDishById(dishId: string, openModal = true) {
    setDetailLoading(true);
    setManageError(null);

    try {
      const payload = await api.fetchDishById(dishId);
      setSelectedDish(payload);
      if (openModal) setSelectedDishModalOpen(true);
    } catch (e) {
      setManageError(api.formatClientError(e, 'Failed to load dish details'));
    } finally {
      setDetailLoading(false);
    }
  }

  function buildDishPayload(): CreateDishPayload {
    return {
      name: dishName.trim(),
      description: dishDescription.trim() || undefined,
      ingredients: parseLines(dishIngredients),
      steps: parseLines(dishSteps),
      addOnOptions: parseLines(dishAddOns),
      dishType,
    };
  }

  async function createDish() {
    if (!canSaveDish) {
      setManageError('Name, ingredients and steps are required');
      return;
    }
    if (!auth.sessionToken) {
      setManageError('Login is required');
      return;
    }

    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);

    try {
      await api.createDish(auth.sessionToken, buildDishPayload());
      showManageToast('Dish saved and ready for future picks.');
      clearDishForm();
      setEditingDishId(null);
      setSelectedDish(null);
      await fetchDishes();
      setManageTab('list');
    } catch (e) {
      setManageError(api.formatClientError(e, 'Failed to create dish'));
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

  function exitEditMode() {
    setEditingDishId(null);
    clearDishForm();
    setManageMessage('Edit canceled');
  }

  async function logout() {
    const token = auth.sessionToken;
    try {
      if (token) await api.logout(token);
    } catch {
      // Logout should still clear local session if the network is flaky.
    }
    await auth.forgetSession();
    setEditingDishId(null);
    setSelectedDish(null);
    setSelectedDishModalOpen(false);
    clearDishForm();
    setManageMessage('Logged out');
  }

  function loadDishIntoFormForEdit(dish: DishDetail) {
    if (!canEditDish(dish)) {
      showOwnerToast();
      return;
    }
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
    if (!auth.sessionToken) {
      setManageError('Login is required');
      return;
    }

    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);

    try {
      await api.updateDish(auth.sessionToken, editingDishId, buildDishPayload());
      showManageToast('Dish changes saved.');
      await fetchDishes();
      await fetchDishById(editingDishId);
      setManageTab('list');
    } catch (e) {
      const message = api.formatClientError(e, 'Failed to update dish');
      if (message === OWNER_ONLY_MESSAGE) showOwnerToast();
      else setManageError(message);
    } finally {
      setSaveLoading(false);
    }
  }

  async function archiveSelectedDish() {
    if (!selectedDish) {
      setManageError('No dish selected to archive');
      return;
    }
    if (!canEditDish(selectedDish)) {
      showOwnerToast();
      return;
    }
    if (!auth.sessionToken) {
      setManageError('Login is required');
      return;
    }

    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);

    try {
      await api.archiveDish(auth.sessionToken, selectedDish.id);
      showManageToast('Dish moved to Archived. You can restore it anytime.');
      setSelectedDish(null);
      if (editingDishId === selectedDish.id) {
        setEditingDishId(null);
        clearDishForm();
      }
      await fetchDishes();
    } catch (e) {
      const message = api.formatClientError(e, 'Failed to archive dish');
      if (message === OWNER_ONLY_MESSAGE) showOwnerToast();
      else setManageError(message);
    } finally {
      setSaveLoading(false);
    }
  }

  async function unarchiveDishById(dishId: string) {
    if (!auth.sessionToken) {
      setManageError('Login is required');
      return;
    }

    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);

    try {
      await api.unarchiveDish(auth.sessionToken, dishId);
      showManageToast('Dish restored to your active list.');
      await fetchDishes(dishListFilter, dishArchivedFilter);
    } catch (e) {
      const message = api.formatClientError(e, 'Failed to unarchive dish');
      if (message === OWNER_ONLY_MESSAGE) showOwnerToast();
      else setManageError(message);
    } finally {
      setSaveLoading(false);
    }
  }

  function requestArchiveSelectedDish() {
    if (!selectedDish) return;
    if (!canEditDish(selectedDish)) {
      showOwnerToast();
      return;
    }
    setPendingDishAction({ action: 'archive', dishId: selectedDish.id, dishName: selectedDish.name });
  }

  function requestUnarchiveDish(dish: DishListItem) {
    if (!canEditDish(dish)) {
      showOwnerToast();
      return;
    }
    setPendingDishAction({ action: 'unarchive', dishId: dish.id, dishName: dish.name });
  }

  async function confirmPendingDishAction() {
    if (!pendingDishAction) return;
    const action = pendingDishAction;
    if (action.action === 'archive') {
      await archiveSelectedDish();
      setSelectedDishModalOpen(false);
    } else {
      await unarchiveDishById(action.dishId);
    }
    setPendingDishAction(null);
  }

  async function login() {
    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);
    try {
      const payload = await api.login(auth.loginEmail, auth.loginPassword);
      try {
        await auth.storeSession(payload);
        setManageMessage('Login successful');
      } catch {
        setManageMessage('Login successful. Session will last until the app closes.');
      }
      await fetchDishes();
    } catch (e) {
      setManageError(api.formatClientError(e, 'Login failed'));
    } finally {
      setSaveLoading(false);
    }
  }

  async function register() {
    setSaveLoading(true);
    setManageError(null);
    setManageMessage(null);
    try {
      const payload = await api.register(auth.loginEmail, auth.loginPassword);
      try {
        await auth.storeSession(payload);
        setManageMessage('Registration successful');
      } catch {
        setManageMessage('Registration successful. Session will last until the app closes.');
      }
      await fetchDishes();
    } catch (e) {
      setManageError(api.formatClientError(e, 'Register failed'));
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
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && gestureState.dy > 6,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) selectedDishSheetY.setValue(gestureState.dy);
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

  function canEditDish(dish: Pick<DishDetail, 'createdById' | 'createdBy'> | null): boolean {
    if (!dish) return false;
    if (dish.createdById && auth.currentUserId) return dish.createdById === auth.currentUserId;
    if (dish.createdBy && auth.currentUserEmail) return dish.createdBy.toLowerCase() === auth.currentUserEmail.toLowerCase();
    return false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <KeyboardAvoidingView style={styles.keyboardWrap} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
          <View style={styles.topModeRow}>
            <Pressable
              onPress={() => {
                clearTransientFeedback();
                setMode('random');
              }}
              style={({ pressed }) => [styles.topModeTab, mode === 'random' ? styles.topModeTabActive : null, pressed ? styles.buttonPressed : null]}
            >
              <Text style={[styles.topModeIcon, mode === 'random' ? styles.topModeIconActive : null]}>◉</Text>
              <Text style={[styles.topModeLabel, mode === 'random' ? styles.topModeLabelActive : null]}>Random</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                clearTransientFeedback();
                setMode('manage');
              }}
              style={({ pressed }) => [styles.topModeTab, mode === 'manage' ? styles.topModeTabActive : null, pressed ? styles.buttonPressed : null]}
            >
              <Text style={[styles.topModeIcon, mode === 'manage' ? styles.topModeIconActive : null]}>☰</Text>
              <Text style={[styles.topModeLabel, mode === 'manage' ? styles.topModeLabelActive : null]}>Manage</Text>
            </Pressable>
          </View>

          {mode === 'random' ? (
            <RandomScreen
              selectedFilterLabel={selectedFilterLabel}
              randomDishTypeFilter={randomDishTypeFilter}
              filterSheetOpen={filterSheetOpen}
              randomLoading={randomLoading}
              randomError={randomError}
              randomLoaderFrame={randomLoaderFrame}
              randomButtonOpacity={randomButtonOpacity}
              randomButtonScale={randomButtonScale}
              setFilterSheetOpen={setFilterSheetOpen}
              setRandomDishTypeFilter={setRandomDishTypeFilter}
              onRandomPressIn={handleRandomPressIn}
              onRandomPressOut={handleRandomPressOut}
            />
          ) : (
            <ManageScreen
              isAuthenticated={auth.isAuthenticated}
              currentUserEmail={auth.currentUserEmail}
              loginEmail={auth.loginEmail}
              loginPassword={auth.loginPassword}
              saveLoading={saveLoading}
              listLoading={listLoading}
              detailLoading={detailLoading}
              manageError={manageError}
              manageMessage={manageMessage}
              manageTab={manageTab}
              editingDishId={editingDishId}
              canSaveDish={canSaveDish}
              dishName={dishName}
              dishDescription={dishDescription}
              dishIngredients={dishIngredients}
              dishSteps={dishSteps}
              dishAddOns={dishAddOns}
              dishType={dishType}
              dishes={dishes}
              dishListFilter={dishListFilter}
              dishArchivedFilter={dishArchivedFilter}
              canEditDish={canEditDish}
              onLogout={() => void logout()}
              onLogin={() => void login()}
              onRegister={() => void register()}
              onLoginEmailChange={(value) => {
                clearTransientFeedback();
                auth.setLoginEmail(value);
              }}
              onLoginPasswordChange={(value) => {
                clearTransientFeedback();
                auth.setLoginPassword(value);
              }}
              onClearLoginEmail={() => auth.setLoginEmail('')}
              onClearLoginPassword={() => auth.setLoginPassword('')}
              setManageTab={setManageTab}
              setEditingDishId={setEditingDishId}
              setDishName={setDishName}
              setDishDescription={setDishDescription}
              setDishIngredients={setDishIngredients}
              setDishSteps={setDishSteps}
              setDishAddOns={setDishAddOns}
              setDishType={setDishType}
              clearTransientFeedback={clearTransientFeedback}
              clearDishForm={clearDishForm}
              exitEditMode={exitEditMode}
              saveDish={() => void (editingDishId ? updateDish() : createDish())}
              fetchDishes={() => void fetchDishes()}
              fetchDishById={(dishId, openModal) => void fetchDishById(dishId, openModal)}
              applyDishFilter={(filter) => void applyDishFilter(filter)}
              applyArchivedFilter={(filter) => void applyArchivedFilter(filter)}
              requestUnarchiveDish={requestUnarchiveDish}
              showOwnerToast={showOwnerToast}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <DishModal visible={dishModalOpen} dish={randomData?.dish ?? null} onClose={() => setDishModalOpen(false)} />
      <SelectedDishModal
        visible={selectedDishModalOpen}
        selectedDish={selectedDish}
        selectedDishSheetY={selectedDishSheetY}
        panHandlers={selectedDishPanResponder.panHandlers}
        saveLoading={saveLoading}
        canEditDish={canEditDish}
        onClose={() => setSelectedDishModalOpen(false)}
        onEdit={(dish) => {
          if (!canEditDish(dish)) {
            showOwnerToast();
            return;
          }
          setSelectedDishModalOpen(false);
          loadDishIntoFormForEdit(dish);
        }}
        onArchive={async () => requestArchiveSelectedDish()}
      />
      <ConfirmDishActionModal
        visible={Boolean(pendingDishAction)}
        action={pendingDishAction?.action ?? 'archive'}
        dishName={pendingDishAction?.dishName ?? ''}
        loading={saveLoading}
        onCancel={() => setPendingDishAction(null)}
        onConfirm={() => void confirmPendingDishAction()}
      />

      <StatusBar style="dark" />
      {manageToast ? (
        <View pointerEvents="none" style={styles.toastWrap}>
          <View style={styles.toastCard}>
            <Text style={styles.toastText}>{manageToast}</Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
