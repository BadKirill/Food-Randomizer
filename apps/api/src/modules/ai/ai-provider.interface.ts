import type {
  GenerateDishRequest,
  GenerateDishResponse,
  InferIngredientsRequest,
  InferIngredientsResponse,
  InferStepsRequest,
  InferStepsResponse,
  RecognizeDishFromImageRequest,
  RecognizeDishFromImageResponse,
} from '@food/contracts';

export interface AIProvider {
  generateDishFromPrompt(input: GenerateDishRequest): Promise<GenerateDishResponse>;
  inferIngredients(input: InferIngredientsRequest): Promise<InferIngredientsResponse>;
  inferSteps(input: InferStepsRequest): Promise<InferStepsResponse>;
  recognizeDishFromImage(input: RecognizeDishFromImageRequest): Promise<RecognizeDishFromImageResponse>;
}
