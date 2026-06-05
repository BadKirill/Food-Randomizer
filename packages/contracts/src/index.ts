import { z } from 'zod';

export const IngredientSchema = z.object({
  name: z.string().min(1),
  amount: z.string().optional(),
  unit: z.string().optional(),
  optional: z.boolean().optional().default(false),
});

export const AddOnGroupSchema = z.object({
  groupKey: z.string().min(1),
  options: z.array(z.string().min(1)).min(1),
});

export const DishSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).default('usual'),
  ingredients: z.array(IngredientSchema).min(1),
  steps: z.array(z.string().min(1)).min(1),
  addOnGroups: z.array(AddOnGroupSchema).default([]),
  source: z.enum(['manual', 'ai', 'vision']).default('manual'),
  status: z.enum(['pending_approval', 'approved', 'rejected']).default('approved'),
});

export const RandomNextRequestSchema = z.object({
  cooldownClicks: z.number().int().min(1).max(10).default(4),
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).optional(),
});

export const ResolvedAddOnGroupSchema = AddOnGroupSchema.extend({
  selected: z.string().min(1),
});

export const RandomNextResponseSchema = z.object({
  dish: DishSchema.extend({
    addOnGroups: z.array(ResolvedAddOnGroupSchema),
  }),
  selectionMeta: z.object({
    cooldownApplied: z.number().int().min(1),
    fallbackRelaxationUsed: z.boolean(),
  }),
});

export const GenerateDishRequestSchema = z.object({
  userId: z.string().min(1),
  prompt: z.string().min(3),
  cuisine: z.string().optional(),
  dietaryRules: z.array(z.string()).default([]),
  maxSteps: z.number().int().min(1).max(20).optional(),
});

export const GenerateDishResponseSchema = z.object({
  candidateDish: DishSchema,
  confidence: z.number().min(0).max(1),
  model: z.string().min(1),
  provider: z.string().min(1),
  requiresApproval: z.boolean().default(true),
});

export const InferIngredientsRequestSchema = z.object({
  userId: z.string().min(1),
  dishName: z.string().min(1).optional(),
  dishDescription: z.string().optional(),
});

export const InferIngredientsResponseSchema = z.object({
  ingredients: z.array(IngredientSchema),
  confidence: z.number().min(0).max(1),
  model: z.string(),
});

export const InferStepsRequestSchema = z.object({
  userId: z.string().min(1),
  dishName: z.string().min(1),
  knownIngredients: z.array(IngredientSchema).default([]),
});

export const InferStepsResponseSchema = z.object({
  steps: z.array(z.string().min(1)).min(1),
  confidence: z.number().min(0).max(1),
  model: z.string(),
});

export const RecognizeDishFromImageRequestSchema = z.object({
  userId: z.string().min(1),
  imageUrl: z.string().url(),
});

export const DishGuessSchema = z.object({
  name: z.string().min(1),
  confidence: z.number().min(0).max(1),
  guessedIngredients: z.array(IngredientSchema),
  guessedSteps: z.array(z.string().min(1)),
});

export const RecognizeDishFromImageResponseSchema = z.object({
  primaryGuess: DishGuessSchema,
  alternatives: z.array(DishGuessSchema).max(3).default([]),
  model: z.string(),
  lowConfidence: z.boolean(),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
export type Dish = z.infer<typeof DishSchema>;
export type RandomNextRequest = z.infer<typeof RandomNextRequestSchema>;
export type RandomNextResponse = z.infer<typeof RandomNextResponseSchema>;
export type GenerateDishRequest = z.infer<typeof GenerateDishRequestSchema>;
export type GenerateDishResponse = z.infer<typeof GenerateDishResponseSchema>;
export type InferIngredientsRequest = z.infer<typeof InferIngredientsRequestSchema>;
export type InferIngredientsResponse = z.infer<typeof InferIngredientsResponseSchema>;
export type InferStepsRequest = z.infer<typeof InferStepsRequestSchema>;
export type InferStepsResponse = z.infer<typeof InferStepsResponseSchema>;
export type RecognizeDishFromImageRequest = z.infer<typeof RecognizeDishFromImageRequestSchema>;
export type RecognizeDishFromImageResponse = z.infer<typeof RecognizeDishFromImageResponseSchema>;
