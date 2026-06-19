import { Animated, Modal, Pressable, ScrollView, Text, View, type GestureResponderHandlers } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import type { DishDetail } from '../types';

export function DishDetailsBlock({ dish }: { dish: DishDetail }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{dish.name}</Text>
      <View style={styles.metadataRow}>
        <Text style={styles.typeBadge}>{dish.dishType ?? 'usual'}</Text>
        <Text style={styles.metadataText}>By {dish.createdBy ?? 'legacy collection'}</Text>
      </View>
      {dish.createdAt ? <Text style={styles.metadataText}>Added {formatDishDate(dish.createdAt)}</Text> : null}
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

function formatDishDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'on an unknown date';
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

export function ConfirmDishActionModal({
  visible,
  action,
  dishName,
  loading,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  action: 'archive' | 'unarchive';
  dishName: string;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const isArchive = action === 'archive';

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onCancel}>
      <View style={styles.sheetBackdrop}>
        <View style={styles.confirmCard}>
          <Text style={styles.confirmKicker}>{isArchive ? 'Move out of your active list?' : 'Bring this dish back?'}</Text>
          <Text style={styles.confirmTitle}>{dishName}</Text>
          <Text style={styles.confirmText}>
            {isArchive ? 'You can restore it later from Archived dishes.' : 'This dish will return to your active dishes.'}
          </Text>
          <View style={styles.confirmActions}>
            <Pressable testID="dish-confirm-cancel" onPress={onCancel} disabled={loading} style={({ pressed }) => [styles.secondaryButton, pressed ? styles.buttonPressed : null]}>
              <Text style={styles.secondaryButtonText}>Not now</Text>
            </Pressable>
            <Pressable
              testID="dish-confirm-action"
              onPress={onConfirm}
              disabled={loading}
              style={({ pressed }) => [styles.secondaryButton, isArchive ? styles.secondaryDanger : styles.secondaryActive, pressed ? styles.buttonPressed : null]}
            >
              <Text style={styles.secondaryButtonText}>{loading ? 'Working...' : isArchive ? 'Archive dish' : 'Restore dish'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function DishModal({ visible, dish, onClose }: { visible: boolean; dish: DishDetail | null; onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer} edges={['top', 'right', 'bottom', 'left']}>
        <View style={styles.modalHeaderRow}>
          <Text style={styles.modalHeaderTitle}>Your Dish</Text>
          <Pressable onPress={onClose} style={({ pressed }) => [styles.modalCloseButton, pressed ? styles.buttonPressed : null]}>
            <Text style={styles.modalCloseText}>Close</Text>
          </Pressable>
        </View>
        {dish ? <DishModalScreen dish={dish} /> : null}
      </SafeAreaView>
    </Modal>
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

type SelectedDishModalProps = {
  visible: boolean;
  selectedDish: DishDetail | null;
  selectedDishSheetY: Animated.Value;
  panHandlers: GestureResponderHandlers;
  saveLoading: boolean;
  canEditDish: (dish: Pick<DishDetail, 'createdById' | 'createdBy'> | null) => boolean;
  onClose: () => void;
  onEdit: (dish: DishDetail) => void;
  onArchive: () => Promise<void>;
};

export function SelectedDishModal({
  visible,
  selectedDish,
  selectedDishSheetY,
  panHandlers,
  saveLoading,
  canEditDish,
  onClose,
  onEdit,
  onArchive,
}: SelectedDishModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.sheetOverlay}>
        <Animated.View style={[styles.selectedDishSheet, { transform: [{ translateY: selectedDishSheetY }] }]} {...panHandlers}>
          <View style={styles.selectedSheetHandle} />
          <View style={styles.selectedSheetHeader}>
            <Text style={styles.modalHeaderTitle}>Selected Dish</Text>
            <Pressable onPress={onClose} style={({ pressed }) => [styles.modalCloseButton, pressed ? styles.buttonPressed : null]}>
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
          {selectedDish ? (
            <ScrollView contentContainerStyle={styles.selectedSheetBody} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
              {canEditDish(selectedDish) ? (
                <View style={styles.inlineActions}>
                  <Pressable onPress={() => onEdit(selectedDish)} style={({ pressed }) => [styles.secondaryButton, pressed ? styles.buttonPressed : null]}>
                    <Text style={styles.secondaryButtonText}>Edit This Dish</Text>
                  </Pressable>
                  <Pressable
                    testID="dish-archive-button"
                    onPress={onArchive}
                    disabled={saveLoading}
                    style={({ pressed }) => [styles.secondaryButton, styles.secondaryDanger, pressed ? styles.buttonPressed : null]}
                  >
                    <Text style={styles.secondaryButtonText}>Archive Dish</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.ownerNotice}>
                  <Text style={styles.ownerNoticeTitle}>View only</Text>
                  <Text style={styles.ownerNoticeText}>Only the creator can edit or archive this dish.</Text>
                </View>
              )}
              <DishDetailsBlock dish={selectedDish} />
            </ScrollView>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  );
}
