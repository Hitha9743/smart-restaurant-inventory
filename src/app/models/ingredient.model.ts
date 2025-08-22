export interface Ingredient {
  ingredientId?: number;  // optional (for new items, id may be empty)
  name: string;
  category?: string;
  quantity: number;
  unit: string;
  purchaseDate: string; // store as string (ISO format) for easy binding
  expiryDate: string;
  cost: number;
}
