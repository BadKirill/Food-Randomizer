import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { styles } from '../theme';
import type { DishFilter } from '../types';

type RandomScreenProps = {
  selectedFilterLabel: string;
  randomDishTypeFilter: DishFilter;
  filterSheetOpen: boolean;
  randomLoading: boolean;
  randomError: string | null;
  randomLoaderFrame: number;
  randomButtonOpacity: Animated.Value;
  randomButtonScale: Animated.Value;
  setFilterSheetOpen: (open: boolean) => void;
  setRandomDishTypeFilter: (filter: DishFilter) => void;
  onRandomPressIn: () => void;
  onRandomPressOut: () => void;
};

export function RandomScreen({
  selectedFilterLabel,
  randomDishTypeFilter,
  filterSheetOpen,
  randomLoading,
  randomError,
  randomLoaderFrame,
  randomButtonOpacity,
  randomButtonScale,
  setFilterSheetOpen,
  setRandomDishTypeFilter,
  onRandomPressIn,
  onRandomPressOut,
}: RandomScreenProps) {
  return (
    <>
      <View style={styles.randomStage}>
        <Pressable onPress={() => setFilterSheetOpen(true)} style={({ pressed }) => [styles.filterFab, pressed ? styles.buttonPressed : null]}>
          <Text style={styles.filterFabIcon}>≡</Text>
          <Text style={styles.filterFabText}>{selectedFilterLabel}</Text>
        </Pressable>

        <View style={styles.randomCenterWrap}>
          <Animated.View style={{ opacity: randomButtonOpacity, transform: [{ scale: randomButtonScale }] }}>
            <Pressable
              testID="random-action-button"
              onPressIn={onRandomPressIn}
              onPressOut={onRandomPressOut}
              disabled={randomLoading}
              style={({ pressed }) => [styles.randomBigButton, pressed ? styles.buttonPressed : null, randomLoading ? styles.buttonDisabled : null]}
            >
              <Text style={styles.randomBigButtonText}>{randomLoading ? 'Picking...' : 'Random'}</Text>
            </Pressable>
          </Animated.View>
          <View style={[styles.randomFoodLoaderWrap, !randomLoading ? styles.randomFoodLoaderHidden : null]}>
            <Text style={styles.randomFoodLoaderEmoji}>{randomLoaderFrame === 0 ? '🍜' : randomLoaderFrame === 1 ? '🍕' : '🥗'}</Text>
          </View>
          {randomError ? <Text style={styles.error}>{randomError}</Text> : null}
        </View>

        <View style={styles.randomFooterCard}>
          <Text style={styles.randomFooterKicker}>Dinner without the overthinking</Text>
          <Text style={styles.randomFooterText}>Tap Random when you cannot choose. We will pick a cozy meal idea and keep repeats away.</Text>
        </View>
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
    </>
  );
}
