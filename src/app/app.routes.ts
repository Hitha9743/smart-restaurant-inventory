import { Routes } from '@angular/router';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { DishComponent } from './components/dish/dish.component';
import { WasteComponent } from './components/waste/waste.component';

export const routes: Routes = [
  { path: '', redirectTo: 'ingredients', pathMatch: 'full' },
  { path: 'ingredients', component: IngredientComponent },
  { path: 'dishes', component: DishComponent },
  { path: 'waste', component: WasteComponent },
  { path: '**', redirectTo: 'ingredients' }
];
