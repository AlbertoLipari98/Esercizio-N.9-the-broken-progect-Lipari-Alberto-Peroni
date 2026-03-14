import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/account/dashboard/account-dashboard.component').then(
        (m) => m.AccountDashboardComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
