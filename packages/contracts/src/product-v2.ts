import { z } from "zod";

/**
 * Additive v2 product contracts. Legacy exports remain available from index.ts until the
 * old Random/Manage flow is retired.
 */

export const ProductIdentityHeadersSchema = z.object({
  "x-anonymous-id": z.string().uuid(),
  "x-request-id": z.string().uuid().optional(),
  "x-app-version": z.string().min(1).max(64).optional(),
  "x-app-platform": z.enum(["ios", "android", "web"]).optional(),
  "x-app-locale": z.string().min(2).max(32).optional(),
});

export const DietTypeSchema = z.enum(["everything", "vegetarian", "vegan"]);
export const MealTypeSchema = z.enum(["breakfast", "lunch", "dinner", "snack"]);
export const RecommendationGoalSchema = z.enum([
  "high_protein",
  "light",
  "comfort",
  "budget",
  "balanced",
  "surprise_me",
  "quick",
]);
export const PantryModeSchema = z.enum(["off", "strict", "flexible"]);
export const RecommendationPresentationModeSchema = z.enum([
  "single",
  "shortlist",
  "hybrid",
]);

export const RecommendationContextSchema = z
  .object({
    mealType: MealTypeSchema.optional(),
    maxTimeMinutes: z
      .number()
      .int()
      .min(1)
      .max(24 * 60)
      .optional(),
    maxTimeIsHard: z.boolean().default(false),
    goals: z.array(RecommendationGoalSchema).max(3).default([]),
    pantryMode: PantryModeSchema.default("off"),
    missingIngredientsLimit: z.number().int().min(0).max(20).default(3),
    cuisineIds: z.array(z.string().min(1)).max(20).default([]),
    requiredIngredientIds: z.array(z.string().min(1)).max(30).default([]),
    excludedIngredientIds: z.array(z.string().min(1)).max(100).default([]),
    equipmentIds: z.array(z.string().min(1)).max(30).default([]),
    servings: z.number().int().min(1).max(24).optional(),
  })
  .strict();

export const CreateRecommendationRequestSchema = z
  .object({
    context: RecommendationContextSchema,
    sessionId: z.string().min(1).optional(),
  })
  .strict();

export const RecommendationReasonCodeSchema = z.enum([
  "matches_meal_type",
  "matches_time",
  "matches_goal",
  "preferred_cuisine",
  "pantry_coverage",
  "avoids_recent_repeat",
  "high_content_quality",
  "exploration_pick",
]);

export const RecommendationScoreSchema = z.object({
  context: z.number().min(0).max(1),
  preference: z.number().min(0).max(1),
  pantry: z.number().min(0).max(1),
  repeatAvoidance: z.number().min(0).max(1),
  contentQuality: z.number().min(0).max(1),
  exploration: z.number().min(0).max(1),
  final: z.number().min(0).max(1),
});

export const RecommendationMetaSchema = z.object({
  recommendationSessionId: z.string().min(1),
  recommendationExposureId: z.string().min(1),
  exposureSequence: z.number().int().min(1),
  presentationMode: RecommendationPresentationModeSchema,
  resultsShown: z.number().int().min(1).max(3),
  position: z.number().int().min(1).max(3),
  recommendationId: z.string().min(1),
  offerIndex: z.number().int().min(1),
  candidatePoolSize: z.number().int().min(1),
  score: RecommendationScoreSchema,
  reasonCodes: z.array(RecommendationReasonCodeSchema).min(1),
  algorithmVersion: z.string().min(1),
  configurationVersion: z.number().int().min(1),
  presentationPolicyVersion: z.string().min(1),
  experimentKey: z.string().min(1).max(128).nullable(),
  experimentVariant: z.string().min(1).max(64).nullable(),
});

export const RecommendationExposureMetaSchema = z
  .object({
    recommendationSessionId: z.string().min(1),
    recommendationExposureId: z.string().min(1),
    exposureSequence: z.number().int().min(1),
    presentationMode: RecommendationPresentationModeSchema,
    resultsShown: z.number().int().min(1).max(3),
    presentationPolicyVersion: z.string().min(1),
    experimentKey: z.string().min(1).max(128).nullable(),
    experimentVariant: z.string().min(1).max(64).nullable(),
    recommendations: z.array(RecommendationMetaSchema).min(1).max(3),
  })
  .strict();

export const RecommendationEmptyResponseSchema = z.object({
  status: z.literal("empty"),
  recommendationSessionId: z.string().min(1),
  eliminatedByReason: z.record(z.number().int().min(0)),
  relaxableFilterKeys: z.array(z.string()).default([]),
});

export const InteractionTypeSchema = z.enum([
  "cook_this",
  "another_option",
  "not_for_me",
  "save",
  "unsave",
  "hide_permanently",
  "recipe_opened",
]);

export const RejectionReasonSchema = z.enum([
  "not_in_mood",
  "too_much_time",
  "too_complicated",
  "missing_ingredients",
  "disliked_ingredient",
  "similar_recently",
  "never_show_again",
  "other",
]);

export const CreateInteractionRequestSchema = z
  .object({
    type: InteractionTypeSchema,
    reason: RejectionReasonSchema.optional(),
    ingredientId: z.string().min(1).optional(),
    preferenceEffect: z.enum(["session_only", "show_less", "never"]).optional(),
  })
  .strict();

export const EntitlementKeySchema = z.enum([
  "basic_recommendations",
  "basic_filters",
  "favorites",
  "advanced_filters",
  "ai_recipe_adjustment",
  "photo_ingredient_scan",
  "extended_history",
  "family_profile",
  "recipe_import",
  "meal_planning",
  "shopping_list_sync",
]);

export const EntitlementStateSchema = z.object({
  key: EntitlementKeySchema,
  enabled: z.boolean(),
  used: z.number().int().min(0).nullable(),
  limit: z.number().int().min(0).nullable(),
  periodEndsAt: z.string().datetime().nullable(),
});

export const PublicFeatureConfigSchema = z.object({
  key: z.string().regex(/^[a-z][a-z0-9_]*$/),
  enabled: z.boolean(),
  variant: z.string().max(64).nullable(),
  payload: z.record(z.unknown()).default({}),
  version: z.number().int().min(1),
});

export const ProductEventNameSchema = z.enum([
  "app_opened",
  "onboarding_started",
  "onboarding_step_completed",
  "onboarding_completed",
  "onboarding_skipped",
  "profile_updated",
  "diet_updated",
  "allergen_added",
  "ingredient_excluded",
  "filters_opened",
  "filter_changed",
  "filters_applied",
  "random_screen_viewed",
  "diet_filter_opened",
  "diet_filter_selected",
  "pick_tapped",
  "pick_clicked",
  "recommendation_requested",
  "recommendation_exposure_shown",
  "recommendation_shown",
  "recommendation_selected",
  "recommendation_closed",
  "recommendation_failed",
  "recommendation_empty",
  "pick_again_tapped",
  "another_option_clicked",
  "not_for_me_clicked",
  "rejection_reason_selected",
  "dish_hidden",
  "dish_saved",
  "dish_unsaved",
  "dish_created",
  "dish_archived",
  "recipe_opened",
  "cooking_started",
  "cooking_completed",
  "ai_adjustment_opened",
  "ai_adjustment_requested",
  "ai_adjustment_generated",
  "ai_adjustment_failed",
  "ai_adjustment_accepted",
  "ai_adjustment_rejected",
  "pantry_opened",
  "pantry_item_added",
  "pantry_item_removed",
  "pantry_mode_enabled",
  "photo_scan_started",
  "photo_scan_completed",
  "photo_scan_failed",
  "photo_scan_confirmed",
  "photo_scan_corrected",
  "signup_prompt_shown",
  "signup_started",
  "signup_completed",
  "manage_viewed",
  "premium_feature_seen",
  "premium_feature_clicked",
  "usage_limit_reached",
  "paywall_shown",
  "paywall_closed",
  "plan_selected",
  "trial_started",
  "purchase_started",
  "purchase_completed",
  "purchase_failed",
  "subscription_restored",
  "subscription_cancelled",
  "subscription_expired",
  "subscription_renewed",
]);

export const ProductEventEnvelopeSchema = z.object({
  eventId: z.string().uuid(),
  eventName: ProductEventNameSchema,
  occurredAt: z.string().datetime(),
  schemaVersion: z.number().int().min(1),
  source: z.enum(["mobile", "api", "worker", "revenuecat"]),
  environment: z.enum(["development", "test", "staging", "production"]),
  anonymousId: z.string().uuid().nullable(),
  productIdentityId: z.string().min(1).nullable(),
  userId: z.string().min(1).nullable(),
  sessionId: z.string().min(1).nullable(),
  requestId: z.string().uuid().nullable(),
  properties: z.record(z.unknown()),
});

export type RecommendationContext = z.infer<typeof RecommendationContextSchema>;
export type RecommendationPresentationMode = z.infer<
  typeof RecommendationPresentationModeSchema
>;
export type CreateRecommendationRequest = z.infer<
  typeof CreateRecommendationRequestSchema
>;
export type RecommendationMeta = z.infer<typeof RecommendationMetaSchema>;
export type RecommendationExposureMeta = z.infer<
  typeof RecommendationExposureMetaSchema
>;
export type CreateInteractionRequest = z.infer<
  typeof CreateInteractionRequestSchema
>;
export type EntitlementState = z.infer<typeof EntitlementStateSchema>;
export type PublicFeatureConfig = z.infer<typeof PublicFeatureConfigSchema>;
export type ProductEventName = z.infer<typeof ProductEventNameSchema>;
export type ProductEventEnvelope = z.infer<typeof ProductEventEnvelopeSchema>;
