export interface WasteRecord {
  id?: number;
  ingredientId: number;
  quantity: number;
  unit: string;
  reason?: string;
  wastedOn: string; // 'yyyy-MM-dd'
  cost: number;
}
