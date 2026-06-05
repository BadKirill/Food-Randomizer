import { z } from 'zod';

export const RandomNextRequestSchema = z.object({
  cooldownClicks: z.number().int().min(1).max(10).default(4),
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).optional(),
});
