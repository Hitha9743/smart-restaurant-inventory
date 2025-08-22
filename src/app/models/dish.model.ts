export interface Dish {
  id?: number;
  name: string;
  price: number;
  ingredients?: string[]; // simple list of names
}
