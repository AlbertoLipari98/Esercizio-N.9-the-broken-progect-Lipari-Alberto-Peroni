import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface Investment {
  nome: string;
  valore: number;
  variazione: number;
  colore: string;
}

@Component({
  selector: 'app-investment-chart',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chart-widget">
      <div class="widget-header">
        <h3>
          <span class="widget-icon">📈</span>
          Portafoglio Investimenti
        </h3>
        <span class="badge-lazy">Caricato on viewport</span>
      </div>

      <div class="chart-summary">
        <div class="summary-item">
          <span class="summary-label">Totale Investito</span>
          <span class="summary-value">{{ totaleInvestito | currency: 'EUR' : 'symbol' : '1.2-2' : 'it' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Rendimento YTD</span>
          <span class="summary-value positive">+8.4%</span>
        </div>
      </div>

      <div class="bar-chart">
        @for (inv of investments; track inv.nome) {
          <div class="bar-row">
            <div class="bar-label">{{ inv.nome }}</div>
            <div class="bar-track">
              <div
                class="bar-fill"
                [style.width.%]="getPercent(inv.valore)"
                [style.background]="inv.colore"
              ></div>
            </div>
            <div class="bar-meta">
              <span class="bar-value">{{ inv.valore | currency: 'EUR' : 'symbol' : '1.0-0' : 'it' }}</span>
              <span class="bar-var" [class.positive]="inv.variazione > 0" [class.negative]="inv.variazione < 0">
                {{ inv.variazione > 0 ? '+' : '' }}{{ inv.variazione }}%
              </span>
            </div>
          </div>
        }
      </div>

      <div class="chart-note">
        Dati aggiornati al {{ oggi | date: 'dd/MM/yyyy' }}
      </div>
    </div>
  `,
  styles: [`
    .chart-widget {
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
      background: #ede9fe;
      color: #5b21b6;
      padding: 3px 8px;
      border-radius: 20px;
      font-weight: 500;
    }
    .chart-summary {
      display: flex;
      gap: 32px;
      padding: 16px;
      background: var(--bg);
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .summary-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .summary-label {
      font-size: 12px;
      color: var(--text-muted);
    }
    .summary-value {
      font-size: 20px;
      font-weight: 700;
      color: var(--text);
      &.positive { color: var(--success); }
    }
    .bar-chart {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .bar-label {
      width: 100px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-muted);
      flex-shrink: 0;
    }
    .bar-track {
      flex: 1;
      height: 10px;
      background: var(--bg);
      border-radius: 10px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      border-radius: 10px;
      transition: width 0.6s ease;
    }
    .bar-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 120px;
      justify-content: flex-end;
    }
    .bar-value {
      font-size: 13px;
      font-weight: 600;
      color: var(--text);
    }
    .bar-var {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      &.positive {
        color: var(--success);
        background: #d1fae5;
      }
      &.negative {
        color: var(--danger);
        background: #fee2e2;
      }
    }
    .chart-note {
      margin-top: 20px;
      font-size: 11px;
      color: var(--text-muted);
      text-align: right;
    }
  `],
})
export class InvestmentChartComponent {
  oggi = new Date();

  investments: Investment[] = [
    { nome: 'Azionario EU',   valore: 12500, variazione: 11.2,  colore: '#3b82f6' },
    { nome: 'BTP Governo',    valore: 8000,  variazione: 3.1,   colore: '#10b981' },
    { nome: 'ETF S&P 500',    valore: 15000, variazione: 18.7,  colore: '#8b5cf6' },
    { nome: 'Obbligazioni',   valore: 5500,  variazione: -0.8,  colore: '#f59e0b' },
    { nome: 'Liquidità',      valore: 3200,  variazione: 0.5,   colore: '#64748b' },
  ];

  get totaleInvestito(): number {
    return this.investments.reduce((sum, inv) => sum + inv.valore, 0);
  }

  getPercent(valore: number): number {
    return (valore / this.totaleInvestito) * 100;
  }
}
