import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

interface Transaction {
  id: number;
  descrizione: string;
  importo: number;
  data: Date;
  tipo: 'entrata' | 'uscita';
  categoria: string;
}

@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="transactions-widget">
      <div class="widget-header">
        <h3>
          <span class="widget-icon">📋</span>
          Transazioni Recenti
        </h3>
        <span class="badge-lazy">Caricato on idle</span>
      </div>

      <div class="transactions-list">
        @for (tx of transactions; track tx.id) {
          <div class="transaction-item" [ngClass]="tx.tipo">
            <div class="tx-icon">{{ tx.categoria }}</div>
            <div class="tx-details">
              <span class="tx-desc">{{ tx.descrizione }}</span>
              <span class="tx-date">{{ tx.data | date: 'dd MMM yyyy' : '' : 'it' }}</span>
            </div>
            <div class="tx-amount" [ngClass]="tx.tipo">
              {{ tx.tipo === 'entrata' ? '+' : '-' }}
              {{ tx.importo | currency: 'EUR' : 'symbol' : '1.2-2' : 'it' }}
            </div>
          </div>
        }
      </div>

      <div class="widget-footer">
        <button class="btn-link">Vedi tutte le transazioni →</button>
      </div>
    </div>
  `,
  styles: [`
    .transactions-widget {
      background: var(--surface);
      border-radius: var(--radius);
      padding: 24px;
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
    }
    .widget-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      color: var(--primary);
    }
    .widget-icon { font-size: 18px; }
    .badge-lazy {
      font-size: 10px;
      background: #fef3c7;
      color: #92400e;
      padding: 3px 8px;
      border-radius: 20px;
      font-weight: 500;
    }
    .transactions-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .transaction-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 8px;
      border-radius: 8px;
      transition: background 0.15s;
      &:hover { background: var(--surface-2); }
    }
    .tx-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .tx-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .tx-desc {
      font-size: 14px;
      font-weight: 500;
      color: var(--text);
    }
    .tx-date {
      font-size: 12px;
      color: var(--text-muted);
    }
    .tx-amount {
      font-size: 15px;
      font-weight: 600;
      &.entrata { color: var(--success); }
      &.uscita { color: var(--danger); }
    }
    .widget-footer {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
      text-align: center;
    }
    .btn-link {
      background: none;
      border: none;
      color: var(--primary-light);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      &:hover { text-decoration: underline; }
    }
  `],
})
export class RecentTransactionsComponent {
  transactions: Transaction[] = [
    {
      id: 1,
      descrizione: 'Stipendio Gennaio',
      importo: 2800,
      data: new Date('2025-01-31'),
      tipo: 'entrata',
      categoria: '💼',
    },
    {
      id: 2,
      descrizione: 'Supermercato Esselunga',
      importo: 87.5,
      data: new Date('2025-01-30'),
      tipo: 'uscita',
      categoria: '🛒',
    },
    {
      id: 3,
      descrizione: 'Bolletta Enel',
      importo: 124.0,
      data: new Date('2025-01-28'),
      tipo: 'uscita',
      categoria: '⚡',
    },
    {
      id: 4,
      descrizione: 'Rimborso spese',
      importo: 350.0,
      data: new Date('2025-01-25'),
      tipo: 'entrata',
      categoria: '↩️',
    },
    {
      id: 5,
      descrizione: 'Abbonamento Netflix',
      importo: 15.99,
      data: new Date('2025-01-22'),
      tipo: 'uscita',
      categoria: '🎬',
    },
    {
      id: 6,
      descrizione: 'Ristorante Da Pino',
      importo: 42.0,
      data: new Date('2025-01-20'),
      tipo: 'uscita',
      categoria: '🍽️',
    },
  ];
}
