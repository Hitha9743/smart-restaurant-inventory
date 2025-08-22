import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toasts">
      <div class="toast" *ngFor="let t of svc.items$ | async"
           [class.ok]="t.kind==='success'"
           [class.err]="t.kind==='error'"
           [class.info]="t.kind==='info'">
        <span class="dot"></span>
        <div class="msg">{{ t.text }}</div>
        <button class="x" (click)="svc.dismiss(t.id)">✕</button>
      </div>
    </div>
  `,
  styles: [`
    .toasts { position: fixed; right: 16px; bottom: 16px; display: flex; flex-direction: column;
              gap: 10px; z-index: 1000; }
    .toast { min-width: 260px; max-width: 420px; background: #111827; color: #fff;
             padding: 10px 12px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,.25);
             display: grid; grid-template-columns: 10px 1fr auto; align-items: center; gap: 10px; }
    .toast.ok { background:#065f46; }
    .toast.err { background:#7f1d1d; }
    .toast.info { background:#1f2937; }
    .dot { width:10px; height:10px; border-radius:50%; background:#fff3; }
    .toast.ok .dot { background:#34d399; }
    .toast.err .dot { background:#fca5a5; }
    .toast.info .dot { background:#93c5fd; }
    .msg { line-height: 1.3; }
    .x { background: transparent; border: none; color: #fff; font-size: 14px; cursor: pointer; }
  `]
})
export class ToastComponent {
  constructor(public svc: ToastService) {}
}
