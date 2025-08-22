import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../models/dish.model';
import { ToastService } from '../../services/toast.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent {
  items: Dish[] = [];
  loading = false;

  form: FormGroup;
  confirmId: number | null = null;

  constructor(private fb: FormBuilder, private svc: DishService, private toast: ToastService) {
    this.form = this.fb.group({
      id: [null as number | null],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      ingredients: this.fb.array<string>([])
    });
    this.fetch();
  }

  get f() { return this.form.controls; }
  get ingArr() { return this.form.get('ingredients') as FormArray; }

  addIngredientChip(value = '') { this.ingArr.push(this.fb.control(value)); }
  removeIngredientChip(i: number) { this.ingArr.removeAt(i); }

  fetch() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: d => { this.items = d; this.loading = false; },
      error: e => { console.error(e); this.loading = false; this.toast.show('error', 'Failed to load dishes'); }
    });
  }

  edit(row: Dish) {
    const chips = this.fb.array<string>([]);
    (row.ingredients || []).forEach(v => chips.push(this.fb.control(v)));
    this.form = this.fb.group({
      id: [row.id ?? null],
      name: [row.name, Validators.required],
      price: [row.price, [Validators.required, Validators.min(0)]],
      ingredients: chips
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); this.toast.show('error', 'Please fix the form'); return; }
    const val = this.form.value as Dish;
    const payload = { dish: { id: val.id ?? undefined, name: val.name, price: val.price , ingredients: (val.ingredients || []) as string[]} };
    const req$ = val.id ? this.svc.update(val.id, payload) : this.svc.create(payload);
    req$.subscribe({
      next: msg => { this.toast.show('success', typeof msg === 'string' ? msg : (val.id ? 'Updated!' : 'Created!')); this.form.reset(); this.fetch(); },
      error: err => { console.error(err); this.toast.show('error', 'Save failed'); }
    });
  }

  askRemove(id?: number) { if (id) this.confirmId = id; }
  cancelRemove() { this.confirmId = null; }
  confirmRemove() {
    const id = this.confirmId!;
    this.svc.delete(id).subscribe({
      next: msg => { this.toast.show('success', typeof msg === 'string' ? msg : 'Deleted!'); this.items = this.items.filter(x => x.id !== id); this.confirmId = null; },
      error: err => { console.error(err); this.toast.show('error', 'Delete failed'); this.confirmId = null; }
    });
  }

  cancel() { this.form.reset(); }
}
