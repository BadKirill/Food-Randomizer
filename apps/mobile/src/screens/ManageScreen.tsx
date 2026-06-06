import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { AuthPanel } from '../components/AuthPanel';
import { styles } from '../theme';
import type { ArchivedFilter, DishDetail, DishFilter, DishListItem, DishType, ManageTab } from '../types';

type ManageScreenProps = {
  isAuthenticated: boolean;
  currentUserEmail: string | null;
  loginEmail: string;
  loginPassword: string;
  saveLoading: boolean;
  listLoading: boolean;
  detailLoading: boolean;
  manageError: string | null;
  manageMessage: string | null;
  manageTab: ManageTab;
  editingDishId: string | null;
  canSaveDish: boolean;
  dishName: string;
  dishDescription: string;
  dishIngredients: string;
  dishSteps: string;
  dishAddOns: string;
  dishType: DishType;
  dishes: DishListItem[];
  dishListFilter: DishFilter;
  dishArchivedFilter: ArchivedFilter;
  canEditDish: (dish: Pick<DishDetail, 'createdById' | 'createdBy'> | null) => boolean;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onLoginEmailChange: (value: string) => void;
  onLoginPasswordChange: (value: string) => void;
  onClearLoginEmail: () => void;
  onClearLoginPassword: () => void;
  setManageTab: (tab: ManageTab) => void;
  setEditingDishId: (id: string | null) => void;
  setDishName: (value: string) => void;
  setDishDescription: (value: string) => void;
  setDishIngredients: (value: string) => void;
  setDishSteps: (value: string) => void;
  setDishAddOns: (value: string) => void;
  setDishType: (type: DishType) => void;
  clearTransientFeedback: () => void;
  clearDishForm: () => void;
  exitEditMode: () => void;
  saveDish: () => void;
  fetchDishes: () => void;
  fetchDishById: (dishId: string, openModal?: boolean) => void;
  applyDishFilter: (filter: DishFilter) => void;
  applyArchivedFilter: (filter: ArchivedFilter) => void;
  requestUnarchiveDish: (dish: DishListItem) => void;
  showOwnerToast: () => void;
};

export function ManageScreen(props: ManageScreenProps) {
  const {
    isAuthenticated,
    currentUserEmail,
    loginEmail,
    loginPassword,
    saveLoading,
    listLoading,
    detailLoading,
    manageError,
    manageMessage,
    manageTab,
    editingDishId,
    canSaveDish,
    dishName,
    dishDescription,
    dishIngredients,
    dishSteps,
    dishAddOns,
    dishType,
    dishes,
    dishListFilter,
    dishArchivedFilter,
    canEditDish,
    onLogout,
    onLogin,
    onRegister,
    onLoginEmailChange,
    onLoginPasswordChange,
    onClearLoginEmail,
    onClearLoginPassword,
    setManageTab,
    setEditingDishId,
    setDishName,
    setDishDescription,
    setDishIngredients,
    setDishSteps,
    setDishAddOns,
    setDishType,
    clearTransientFeedback,
    clearDishForm,
    exitEditMode,
    saveDish,
    fetchDishes,
    fetchDishById,
    applyDishFilter,
    applyArchivedFilter,
    requestUnarchiveDish,
    showOwnerToast,
  } = props;

  return (
    <View style={styles.sectionCard}>
      <View style={styles.manageHeaderBar}>
        <View style={styles.manageHeaderTop}>
          <Text style={styles.manageHeaderTitle}>Manage Dishes</Text>
          {isAuthenticated ? (
            <Pressable
              onPress={() => {
                clearTransientFeedback();
                onLogout();
              }}
              style={({ pressed }) => [styles.logoutTextBtn, pressed ? styles.buttonPressed : null]}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          ) : null}
        </View>
        <Text style={styles.manageHeaderUser}>{currentUserEmail ? `Logged in: ${currentUserEmail}` : 'Not logged in'}</Text>
      </View>

      {!isAuthenticated ? (
        <AuthPanel
          loginEmail={loginEmail}
          loginPassword={loginPassword}
          saveLoading={saveLoading}
          manageError={manageError}
          manageMessage={manageMessage}
          onLoginEmailChange={onLoginEmailChange}
          onLoginPasswordChange={onLoginPasswordChange}
          onClearEmail={onClearLoginEmail}
          onClearPassword={onClearLoginPassword}
          onLogin={onLogin}
          onRegister={onRegister}
        />
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
            <DishForm
              editingDishId={editingDishId}
              canSaveDish={canSaveDish}
              saveLoading={saveLoading}
              dishName={dishName}
              dishDescription={dishDescription}
              dishIngredients={dishIngredients}
              dishSteps={dishSteps}
              dishAddOns={dishAddOns}
              dishType={dishType}
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
              saveDish={saveDish}
            />
          ) : (
            <DishList
              dishes={dishes}
              listLoading={listLoading}
              detailLoading={detailLoading}
              dishListFilter={dishListFilter}
              dishArchivedFilter={dishArchivedFilter}
              saveLoading={saveLoading}
              canEditDish={canEditDish}
              clearTransientFeedback={clearTransientFeedback}
              fetchDishes={fetchDishes}
              fetchDishById={fetchDishById}
              applyDishFilter={applyDishFilter}
              applyArchivedFilter={applyArchivedFilter}
              requestUnarchiveDish={requestUnarchiveDish}
              showOwnerToast={showOwnerToast}
            />
          )}

          {manageError ? <Text style={styles.error}>{manageError}</Text> : null}
          {manageMessage ? <Text style={styles.success}>{manageMessage}</Text> : null}
        </>
      )}
    </View>
  );
}

type DishFormProps = Pick<
  ManageScreenProps,
  | 'editingDishId'
  | 'canSaveDish'
  | 'saveLoading'
  | 'dishName'
  | 'dishDescription'
  | 'dishIngredients'
  | 'dishSteps'
  | 'dishAddOns'
  | 'dishType'
  | 'setEditingDishId'
  | 'setDishName'
  | 'setDishDescription'
  | 'setDishIngredients'
  | 'setDishSteps'
  | 'setDishAddOns'
  | 'setDishType'
  | 'clearTransientFeedback'
  | 'clearDishForm'
  | 'exitEditMode'
  | 'saveDish'
>;

function DishForm(props: DishFormProps) {
  const {
    editingDishId,
    canSaveDish,
    saveLoading,
    dishName,
    dishDescription,
    dishIngredients,
    dishSteps,
    dishAddOns,
    dishType,
    setEditingDishId,
    setDishName,
    setDishDescription,
    setDishIngredients,
    setDishSteps,
    setDishAddOns,
    setDishType,
    clearTransientFeedback,
    clearDishForm,
    exitEditMode,
    saveDish,
  } = props;

  return (
    <>
      <View style={styles.formTopBar}>
        <Text style={styles.sectionTitle}>{editingDishId ? 'Edit Dish' : 'Add Dish'}</Text>
        <View style={styles.formTopActions}>
          {editingDishId ? (
            <Pressable
              onPress={() => {
                clearTransientFeedback();
                exitEditMode();
              }}
              style={({ pressed }) => [styles.secondaryButton, styles.secondaryButtonMuted, pressed ? styles.buttonPressed : null]}
            >
              <Text style={styles.secondaryButtonText}>Cancel Edit</Text>
            </Pressable>
          ) : null}
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
      </View>

      <View style={styles.typeChooserTop}>
        <Text style={styles.typeChooserTitle}>Dish Type</Text>
        <View style={styles.inlineActions}>
          {(['usual', 'vegetarian', 'vegan'] as const).map((type) => (
            <Pressable
              key={type}
              onPress={() => {
                clearTransientFeedback();
                setDishType(type);
              }}
              style={({ pressed }) => [styles.secondaryButton, dishType === type ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
            >
              <Text style={styles.secondaryButtonText}>{type === 'usual' ? 'Usual' : type === 'vegetarian' ? 'Vegetarian' : 'Vegan'}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <FormInput label="Dish Name" value={dishName} placeholder="Dish name" onChange={setDishName} onClear={() => setDishName('')} clearTransientFeedback={clearTransientFeedback} />
      <FormInput label="Description" value={dishDescription} placeholder="Description (optional)" onChange={setDishDescription} onClear={() => setDishDescription('')} clearTransientFeedback={clearTransientFeedback} />
      <FormInput label="Ingredients" value={dishIngredients} placeholder="Ingredients (one per line)" multiline onChange={setDishIngredients} onClear={() => setDishIngredients('')} clearTransientFeedback={clearTransientFeedback} />
      <FormInput label="Steps" value={dishSteps} placeholder="Steps (one per line)" multiline onChange={setDishSteps} onClear={() => setDishSteps('')} clearTransientFeedback={clearTransientFeedback} />
      <FormInput label="Can Add" value={dishAddOns} placeholder="Can add (one per line)" multiline onChange={setDishAddOns} onClear={() => setDishAddOns('')} clearTransientFeedback={clearTransientFeedback} />

      <Pressable
        onPress={saveDish}
        disabled={!canSaveDish || saveLoading}
        style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null, !canSaveDish || saveLoading ? styles.buttonDisabled : null]}
      >
        <Text style={styles.buttonText}>{saveLoading ? 'Saving...' : editingDishId ? 'Save Changes' : 'Save Dish'}</Text>
      </Pressable>
    </>
  );
}

type FormInputProps = {
  label: string;
  value: string;
  placeholder: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
  clearTransientFeedback: () => void;
};

function FormInput({ label, value, placeholder, multiline, onChange, onClear, clearTransientFeedback }: FormInputProps) {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputRow, multiline ? styles.inputRowMulti : null]}>
        <TextInput
          value={value}
          onChangeText={(next) => {
            clearTransientFeedback();
            onChange(next);
          }}
          placeholder={placeholder}
          placeholderTextColor="#63736d"
          style={[styles.inputControl, multiline ? styles.inputControlMulti : null]}
          multiline={multiline}
        />
        {value.length > 0 ? (
          <Pressable onPress={onClear} style={({ pressed }) => [styles.inputClearBtn, multiline ? styles.inputClearBtnMulti : null, pressed ? styles.buttonPressed : null]}>
            <Text style={styles.inputClearBtnText}>×</Text>
          </Pressable>
        ) : null}
      </View>
    </>
  );
}

type DishListProps = Pick<
  ManageScreenProps,
  | 'dishes'
  | 'listLoading'
  | 'detailLoading'
  | 'dishListFilter'
  | 'dishArchivedFilter'
  | 'saveLoading'
  | 'canEditDish'
  | 'clearTransientFeedback'
  | 'fetchDishes'
  | 'fetchDishById'
  | 'applyDishFilter'
  | 'applyArchivedFilter'
  | 'requestUnarchiveDish'
  | 'showOwnerToast'
>;

function DishList({
  dishes,
  listLoading,
  detailLoading,
  dishListFilter,
  dishArchivedFilter,
  saveLoading,
  canEditDish,
  clearTransientFeedback,
  fetchDishes,
  fetchDishById,
  applyDishFilter,
  applyArchivedFilter,
  requestUnarchiveDish,
  showOwnerToast,
}: DishListProps) {
  return (
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
        {(['active', 'archived'] as const).map((filter) => (
          <Pressable
            key={filter}
            onPress={() => {
              clearTransientFeedback();
              applyArchivedFilter(filter);
            }}
            style={({ pressed }) => [styles.secondaryButton, dishArchivedFilter === filter ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
          >
            <Text style={styles.secondaryButtonText}>{filter === 'active' ? 'Active' : 'Archived'}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.inlineActions}>
        {(['all', 'usual', 'vegetarian', 'vegan'] as const).map((filter) => (
          <Pressable
            key={filter}
            onPress={() => {
              clearTransientFeedback();
              applyDishFilter(filter);
            }}
            style={({ pressed }) => [styles.secondaryButton, dishListFilter === filter ? styles.secondaryActive : null, pressed ? styles.buttonPressed : null]}
          >
            <Text style={styles.secondaryButtonText}>{filter === 'all' ? 'All' : filter === 'usual' ? 'Usual' : filter === 'vegetarian' ? 'Vegetarian' : 'Vegan'}</Text>
          </Pressable>
        ))}
      </View>

      {listLoading ? (
        <View style={styles.stateCard}>
          <ActivityIndicator color="#B88A44" />
          <Text style={styles.stateTitle}>{dishArchivedFilter === 'archived' ? 'Opening the pantry archive...' : 'Gathering your dishes...'}</Text>
          <Text style={styles.stateText}>This should only take a moment.</Text>
        </View>
      ) : null}

      {!listLoading && dishes.length === 0 ? (
        <View style={styles.stateCard}>
          <Text style={styles.stateEmoji}>{dishArchivedFilter === 'archived' ? '📦' : dishListFilter === 'all' ? '🍽️' : '🔎'}</Text>
          <Text style={styles.stateTitle}>
            {dishArchivedFilter === 'archived' ? 'No dishes archived yet' : dishListFilter === 'all' ? 'Your dish list is ready for its first favorite' : `No ${dishListFilter} dishes found`}
          </Text>
          <Text style={styles.stateText}>
            {dishArchivedFilter === 'archived'
              ? 'Dishes you archive will rest here until you want them back.'
              : dishListFilter === 'all'
                ? 'Add a dish from the form, then it can join your random picks.'
                : 'Try another filter or add a new dish with this type.'}
          </Text>
        </View>
      ) : null}

      {!listLoading && detailLoading ? (
        <View style={styles.inlineLoading}>
          <ActivityIndicator color="#B88A44" />
          <Text style={styles.inlineLoadingText}>Opening dish...</Text>
        </View>
      ) : null}

      {!listLoading && dishes.map((dish) => {
        const editable = canEditDish(dish);
        return (
        <View key={dish.id} style={[styles.listCard, dishArchivedFilter === 'archived' ? styles.archivedListCard : null]}>
          <Pressable
            testID={`dish-row-${dish.id}`}
            onPress={() => {
              if (dishArchivedFilter === 'active') fetchDishById(dish.id, true);
            }}
            style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
          >
            <View style={styles.listCardTitleRow}>
              <Text style={styles.listCardTitle}>{dish.name}</Text>
              <Text style={styles.typeBadge}>{dish.dishType ?? 'usual'}</Text>
            </View>
            <Text style={styles.metadataText}>By {dish.createdBy ?? 'legacy collection'} · {formatDishDate(dish.createdAt)}</Text>
            {dishArchivedFilter === 'archived' && dish.archivedAt ? <Text style={styles.archivedMeta}>Archived {formatDishDate(dish.archivedAt)}</Text> : null}
            {dish.description ? <Text style={styles.listCardText}>{dish.description}</Text> : null}
          </Pressable>
          {dishArchivedFilter === 'archived' ? (
            editable ? (
              <Pressable
                testID={`dish-unarchive-${dish.id}`}
                onPress={() => {
                  requestUnarchiveDish(dish);
                }}
                disabled={saveLoading}
                style={({ pressed }) => [styles.secondaryButton, styles.secondaryActive, pressed ? styles.buttonPressed : null]}
              >
                <Text style={styles.secondaryButtonText}>Restore to active</Text>
              </Pressable>
            ) : (
              <Pressable
                testID={`dish-unarchive-${dish.id}`}
                onPress={() => {
                  showOwnerToast();
                }}
                style={({ pressed }) => [styles.lockedAction, pressed ? styles.buttonPressed : null]}
              >
                <Text style={styles.lockedActionText}>View only · creator can restore</Text>
              </Pressable>
            )
          ) : null}
        </View>
      )})}
    </>
  );
}

function formatDishDate(value?: string | null): string {
  if (!value) return 'date unknown';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'date unknown';
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}
