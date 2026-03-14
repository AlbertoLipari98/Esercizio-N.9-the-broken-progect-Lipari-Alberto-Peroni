import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="app-header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">🏦</span>
          <span class="logo-text">LipariBank</span>
        </div>
        <span class="tagline">Performance Dashboard</span>
      </div>
    </header>
    <main class="app-main">
      <router-outlet />
    </main>
  `,
  styles: [`
    .app-header {
      background: var(--primary);
      color: white;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-icon { font-size: 28px; }
    .logo-text {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .tagline {
      font-size: 13px;
      opacity: 0.7;
      font-weight: 400;
    }
    .app-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px;
    }
  `],
})
export class AppComponent {}
