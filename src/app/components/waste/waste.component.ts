import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WasteService } from '../../services/waste.service';
import { WasteRecord } from '../../models/waste.model';
import { ToastService } from '../../services/toast.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-waste',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss']
})
export class WasteComponent {
  items: WasteRecord[] = [];
  loading = false;
  total = 0;

  form: FormGroup;
  filter: FormGroup;
  confirmId: number | null = null;

  constructor(private fb: FormBuilder, private svc: WasteService, private toast: ToastService) {
    this.form = this.fb.group({
      id: [null as number | null],
      ingredientId: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
      reason: [''],
      wastedOn: ['', Validators.required], // yyyy-MM-dd
      cost: [0, [Validators.required, Validators.min(0)]]
    });

    const today = new Date().toISOString().slice(0,10);
    const monthStart = today.slice(0,8) + '01';

    this.filter = this.fb.group({
      from: [monthStart, Validators.required],
      to: [today, Validators.required]
    });

    this.fetch();
    this.loadTotal();
  }

  get f() { return this.form.controls; }
  get ff() { return this.filter.controls; }

  fetch() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: d => { this.items = d; this.loading = false; },
      error: e => { console.error(e); this.loading = false; this.toast.show('error','Failed to load waste'); }
    });
  }

  loadTotal() {
    const from = this.filter.value.from;
    const to = this.filter.value.to;
    if (!from || !to) return;
    this.svc.getTotal(from, to).subscribe({
      next: n => this.total = n,
      error: e => { console.error(e); this.toast.show('error','Failed to load total'); }
    });
  }

  applyRange() {
    const { from, to } = this.filter.value;
    if (!from || !to) return;
    this.loading = true;
    this.svc.getRange(from, to).subscribe({
      next: d => { this.items = d; this.loading = false; this.loadTotal(); },
      error: e => { console.error(e); this.loading = false; this.toast.show('error','Failed to filter'); }
    });
  }

  edit(row: WasteRecord) {
    this.form.patchValue(row);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); this.toast.show('error','Please fix the form'); return; }
    const val = this.form.value as WasteRecord;
    const req$ = val.id ? this.svc.update(val.id, val) : this.svc.create(val);
    req$.subscribe({
      next: msg => { this.toast.show('success', typeof msg==='string'? msg : (val.id?'Updated!':'Created!')); this.form.reset(); this.fetch(); this.loadTotal(); },
      error: e => { console.error(e); this.toast.show('error','Save failed'); }
    });
  }

  askRemove(id?: number) { if (id) this.confirmId = id; }
  cancelRemove() { this.confirmId = null; }
  confirmRemove() {
    const id = this.confirmId!;
    this.svc.delete(id).subscribe({
      next: msg => { this.toast.show('success', typeof msg==='string'? msg : 'Deleted!'); this.items = this.items.filter(x => x.id !== id); this.confirmId = null; this.loadTotal(); },
      error: e => { console.error(e); this.toast.show('error','Delete failed'); this.confirmId = null; }
    });
  }

  cancel() { this.form.reset(); }
}
