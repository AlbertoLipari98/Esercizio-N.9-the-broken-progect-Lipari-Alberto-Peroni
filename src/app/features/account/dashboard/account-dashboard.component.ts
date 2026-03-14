import { Component, inject } from '@angular/core';
import { AccountService } from '../../../core/services/account.service';
import { BalanceWidgetComponent } from '../widgets/balance-widget/balance-widget.component';
import { RecentTransactionsComponent } from '../widgets/recent-transactions/recent-transactions.component';
import { InvestmentChartComponent } from '../widgets/investment-chart/investment-chart.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [
    BalanceWidgetComponent,
    RecentTransactionsComponent,
    InvestmentChartComponent,
    DecimalPipe
  ],
  templateUrl: './account-dashboard.component.html',
})
export class AccountDashboardComponent {
  accountService = inject(AccountService);

  eseguiBonifico(): void {
    this.accountService.debit(100);
  }
}
