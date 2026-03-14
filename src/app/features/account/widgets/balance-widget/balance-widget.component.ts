import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../../core/services/account.service';

@Component({
  selector: 'app-balance-widget',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="balance-card">
      <div class="card-header">
        <span class="card-icon">💳</span>
        <h2>Saldo Disponibile</h2>
      </div>
      <div class="card-body">
        <p class="titolare">{{ titolare }}</p>
        <p class="saldo">{{ saldo | currency: 'EUR' : 'symbol' : '1.2-2' : 'it' }}</p>
        <p class="numero-conto">{{ numeroConto }}</p>
      </div>
      <div class="card-footer">
        <span class="badge">Conto Corrente</span>
        <span class="status-dot"></span>
        <span class="status-text">Aggiornato</span>
      </div>
    </div>
  `,
  styles: [`
    .balance-card {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      border-radius: var(--radius);
      padding: 28px;
      box-shadow: var(--shadow-md);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    .card-icon { font-size: 24px; }
    h2 {
      font-size: 16px;
      font-weight: 500;
      opacity: 0.85;
    }
    .card-body { margin-bottom: 20px; }
    .titolare {
      font-size: 14px;
      opacity: 0.7;
      margin-bottom: 8px;
    }
    .saldo {
      font-size: 40px;
      font-weight: 700;
      letter-spacing: -1px;
      margin-bottom: 6px;
    }
    .numero-conto {
      font-size: 12px;
      opacity: 0.5;
      font-family: monospace;
      letter-spacing: 1px;
    }
    .card-footer {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.15);
    }
    .badge {
      font-size: 11px;
      background: rgba(255,255,255,0.15);
      padding: 3px 10px;
      border-radius: 20px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
      margin-left: auto;
      box-shadow: 0 0 6px #4ade80;
    }
    .status-text {
      font-size: 12px;
      opacity: 0.7;
    }
  `],
})
export class BalanceWidgetComponent implements OnInit, OnDestroy {

  saldo: number = 0;
  titolare: string = '';
  numeroConto: string = '';

  private accountService = inject(AccountService);
  private cd = inject(ChangeDetectorRef);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.accountService.account$.subscribe((acc) => {
        this.saldo = acc.saldo;
        this.titolare = acc.titolare;
        this.numeroConto = acc.numeroConto;
        this.cd.markForCheck()
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
