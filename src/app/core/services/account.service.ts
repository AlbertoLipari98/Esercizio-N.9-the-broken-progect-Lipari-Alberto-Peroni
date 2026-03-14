import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export interface Account {
  saldo: number;
  titolare: string;
  numeroConto: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  /**
   * Signal che rappresenta lo stato del conto corrente.
   * Usato come fonte di verità per tutti i componenti.
   */
  account = signal<Account>({
    saldo: 5000.0,
    titolare: 'Mario Rossi',
    numeroConto: 'IT60 X054 2811 1010 0000 0123 456',
  });

  /**
   * Observable derivato dal Signal, usato dai componenti che
   * preferiscono RxJS (ad es. con async pipe o subscribe).
   */
  account$ = toObservable(this.account);

  debit(amount: number): void {
    // this.account().saldo -= amount;
    this.account.update(sal => ({
      ...sal, saldo : sal.saldo -= amount
    }))
    
  }

  /**
   * Aggiorna il saldo correttamente (usato internamente per reset/test).
   */
  updateBalance(nuovoSaldo: number): void {
    this.account.update((acc) => ({ ...acc, saldo: nuovoSaldo }));
  }

  getAccount() {
    return this.account;
  }
}
