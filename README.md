# LipariBank Performance Dashboard

Progetto Angular 19 **standalone** che dimostra le principali ottimizzazioni di performance:
`ChangeDetectionStrategy.OnPush`, **Angular Signals**, **@defer** con `on idle` e `on viewport`.

Il progetto è **volutamente rotto in 3 punti** — il tuo compito è trovarli e correggerli.

---

## Avvio rapido

```bash
cd lipari-bank-performance
npm install
ng serve
```

Apri il browser su **http://localhost:4200**

---

## Struttura del progetto

```
src/app/
├── app.component.ts              # Root con <router-outlet>
├── app.config.ts                 # provideRouter, provideZoneChangeDetection
├── app.routes.ts                 # Lazy load AccountDashboardComponent
├── core/
│   └── services/
│       └── account.service.ts
└── features/account/
    ├── dashboard/
    │   ├── account-dashboard.component.ts
    │   └── account-dashboard.component.html
    └── widgets/
        ├── balance-widget/
        │   └── balance-widget.component.ts
        ├── recent-transactions/
        │   └── recent-transactions.component.ts
        └── investment-chart/
            └── investment-chart.component.ts
```

---

## Come testare i bug

### Bug #1 — Mutazione Signal con OnPush

**Sintomo:** Clicca il pulsante **"Esegui Bonifico €100"** nella dashboard.

- Il pannello debug giallo (che legge il Signal direttamente) **NON cambia** valore.
- Il widget del saldo rimane invariato.
- Significa che il Signal stesso non viene aggiornato.

**Dove guardare:** `account.service.ts`, metodo `debit()`.

---

### Bug #2 — Placeholder senza altezza per @defer on viewport

**Sintomo:** Apri il **DevTools → Tab Network**, filtra per JS.

- Al caricamento della pagina, anche **senza fare scroll**, vedi che il bundle
  del grafico investimenti viene scaricato **immediatamente**.
- Il `@defer (on viewport)` dovrebbe caricare il componente solo quando
  l'utente scorre fin lì, ma invece parte subito.

**Dove guardare:** `account-dashboard.component.html`, blocco `@placeholder`
dell'`InvestmentChartComponent`.

---

### Bug #3 — Signal non reattivo nel template con OnPush

**Sintomo:** Anche **dopo aver corretto il Bug #1** (così il Signal si aggiorna
correttamente e il pannello debug mostra il nuovo saldo), il `BalanceWidget`
**continua a non aggiornarsi**.

**Dove guardare:** `balance-widget.component.ts`, metodo `ngOnInit()`.

---

## Le 3 Missioni di Performance

> Leggi gli hint, trova i bug, correggi il codice.

---

### MISSIONE 1 — Il Bonifico Fantasma

**File:** `src/app/core/services/account.service.ts`

---

### MISSIONE 2 — Il Grafico Impaziente

**File:** `src/app/features/account/dashboard/account-dashboard.component.html`

---

### MISSIONE 3 — Il Widget Sordo

**File:** `src/app/features/account/widgets/balance-widget/balance-widget.component.ts`

---

## Concetti chiave

| Concetto | Descrizione |
|---|---|
| `ChangeDetectionStrategy.OnPush` | Angular aggiorna il componente solo in caso di nuovi riferimenti o eventi espliciti |
| `signal()` | Stato reattivo primitivo di Angular. Usa `===` per rilevare i cambiamenti |
| `signal.update(fn)` | Crea un nuovo riferimento tramite la funzione pura `fn` — innesca la reattività |
| `toObservable(signal)` | Converte un Signal in un Observable RxJS — emette solo se il Signal cambia riferimento |
| `@defer (on idle)` | Carica il componente quando il browser è inattivo (dopo il primo task idle) |
| `@defer (on viewport)` | Carica il componente quando il placeholder entra nel viewport (IntersectionObserver) |
| `markForCheck()` | Segna il componente e i suoi antenati come "da controllare" nel prossimo ciclo CD |
| `async pipe` | Gestisce subscribe/unsubscribe e chiama `markForCheck()` automaticamente |
