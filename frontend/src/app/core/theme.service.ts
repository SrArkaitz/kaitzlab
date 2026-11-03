import {
  DOCUMENT,
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const THEMES = ['system', 'light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_LABELS: Record<Theme, string> = {
  system: 'Sistema',
  light: 'Claro',
  dark: 'Oscuro',
};

/** Misma clave que lee el script de index.html para aplicar el tema antes de pintar. */
export const THEME_STORAGE_KEY = 'kaitzlab.theme';

const isTheme = (value: unknown): value is Theme => THEMES.includes(value as Theme);

/**
 * Tema claro u oscuro, guardado en este dispositivo. Pone `data-theme="light"` o `"dark"` en
 * `<html>`; con "sistema" sigue al del dispositivo, también si cambia con la web abierta.
 * Al prerenderizar no hace nada: el HTML sale sin tema y lo decide el navegador.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly media = this.isBrowser
    ? this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)')
    : undefined;
  private readonly systemDark = signal(this.media?.matches ?? false);

  readonly theme = signal<Theme>(this.read());
  readonly isDark = computed(
    () => this.theme() === 'dark' || (this.theme() === 'system' && this.systemDark()),
  );

  constructor() {
    if (!this.isBrowser) return;
    this.media?.addEventListener('change', (event) => this.systemDark.set(event.matches));
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.isDark() ? 'dark' : 'light';
    });
  }

  set(theme: Theme): void {
    this.theme.set(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Sin almacenamiento (modo privado): vale para esta visita.
    }
  }

  private read(): Theme {
    if (!this.isBrowser) return 'system';
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return isTheme(stored) ? stored : 'system';
    } catch {
      return 'system';
    }
  }
}
