import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastKind = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  kind: ToastKind;
  text: string;
  timeoutMs?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _items = new BehaviorSubject<Toast[]>([]);
  items$ = this._items.asObservable();
  private idSeq = 1;

  show(kind: ToastKind, text: string, timeoutMs = 3000) {
    const t: Toast = { id: this.idSeq++, kind, text, timeoutMs };
    const list = [...this._items.value, t];
    this._items.next(list);
    if (timeoutMs > 0) {
      setTimeout(() => this.dismiss(t.id), timeoutMs);
    }
  }

  success(text: string, ms = 3000) { this.show('success', text, ms); }
  error(text: string, ms = 4000) { this.show('error', text, ms); }
  info(text: string, ms = 3000) { this.show('info', text, ms); }

  dismiss(id: number) {
    this._items.next(this._items.value.filter(t => t.id !== id));
  }
}
