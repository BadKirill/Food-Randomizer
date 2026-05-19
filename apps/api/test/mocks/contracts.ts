import { z } from 'zod';

export const RandomNextRequestSchema = z.object({
  userId: z.string().min(1),
  cooldownClicks: z.number().int().min(1).max(10).default(4),
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).optional(),
});
