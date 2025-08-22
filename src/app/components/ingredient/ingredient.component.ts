import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';
import { ToastService } from '../../services/toast.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent {
  items: Ingredient[] = [];
  loading = false;
  error = '';

  form: FormGroup;

  // state for confirm modal
confirmId: number | null = null;

// open confirm modal
askRemove(id?: number): void {
  if (!id) return;
  this.confirmId = id;
}

// user confirmed delete in modal
confirmRemove(): void {
  const id = this.confirmId!;
  this.svc.delete(id).subscribe({
    next: () => {
      this.toast.show('success', 'Deleted successfully!');
      this.items = this.items.filter(x => x.ingredientId !== id); // update UI
      this.confirmId = null;
    },
    error: err => {
      console.error(err);
      this.toast.show('error', 'Delete failed');
      this.confirmId = null;
    }
  });
}

// user cancelled modal
cancelRemove(): void {
  this.confirmId = null;
}

  constructor(
    private fb: FormBuilder,
    private svc: IngredientService,
    private toast: ToastService   // ✅ inject toast
  ) {
    this.form = this.fb.group({
      ingredientId: [null as number | null],
      name: ['', Validators.required],
      category: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]]
    });

    this.fetch();
  }

  get f() { return this.form.controls; }

  fetch(): void {
    this.loading = true;
    this.error = '';
    this.svc.getAll().subscribe({
      next: data => { this.items = data; this.loading = false; },
      error: err => {
        console.error(err);
        this.error = 'Failed to load from API';
        this.loading = false;
       this.toast.show('error', 'Failed to load ingredients');  // ✅ use toast here too
      }
    });
  }

  edit(row: Ingredient): void {
    this.form.patchValue(row);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ✅ This is where your submit() goes
  submit(): void {
    if (this.form.invalid) return;
    const payload = this.form.value as Ingredient;

    const req$ = payload.ingredientId
      ? this.svc.update(payload.ingredientId, payload)
      : this.svc.create(payload);

    req$.subscribe({
      next: () => {
        this.toast.show('success',
          payload.ingredientId ? 'Updated successfully!' : 'Created successfully!'
          
        );
        this.form.reset();
        this.fetch();
      },
      error: err => {
        console.error(err);
        this.toast.show( 'error','Save failed');
      }
    });
  }

  remove(id?: number) {
    if (!id) return;
    if (!confirm('Delete this ingredient?')) return;
    this.svc.delete(id).subscribe({
      next: () => {
        this.toast.show('success','Deleted successfully!');
        this.fetch();
      },
      error: err => {
        console.error(err);
        this.toast.show('error','Delete failed');
      }
    });
  }

  cancel() {
    this.form.reset();
  }
}
