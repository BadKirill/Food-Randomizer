export type DishType = 'usual' | 'vegetarian' | 'vegan';
export type DishFilter = 'all' | DishType;
export type ArchivedFilter = 'active' | 'archived';
export type ScreenMode = 'random' | 'manage';
export type ManageTab = 'form' | 'list';

export type DishIngredient = { name: string; amount?: string; unit?: string };
export type DishAddOnGroup = { groupKey: string; options: string[]; selected?: string };

export type DishDetail = {
  id: string;
  name: string;
  description?: string;
  dishType?: DishType;
  createdAt?: string;
  createdById?: string | null;
  createdBy?: string | null;
  archivedAt?: string | null;
  ingredients: DishIngredient[];
  steps: string[];
  addOnGroups: DishAddOnGroup[];
};

export type RandomNextResponse = {
  dish: DishDetail;
  selectionMeta: {
    cooldownApplied: number;
    fallbackRelaxationUsed: boolean;
  };
};

export type DishListItem = {
  id: string;
  name: string;
  description?: string;
  dishType?: DishType;
  createdAt: string;
  createdById?: string | null;
  createdBy?: string | null;
  archivedAt?: string | null;
};

export type CreateDishPayload = {
  name: string;
  description?: string;
  dishType?: DishType;
  ingredients: string[];
  steps: string[];
  addOnOptions: string[];
};

export type LoginResponse = {
  token: string;
  user: { id: string; email: string | null };
  expiresAt: string;
};
