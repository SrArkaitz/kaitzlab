import { Component, inject } from '@angular/core';
import { THEME_LABELS, THEMES, Theme, ThemeService } from '../../core/theme.service';

/** Selector de tema (sistema, claro, oscuro). Un `<select>` nativo: accesible sin más. */
@Component({
  selector: 'app-theme-select',
  templateUrl: './theme-select.html',
  styleUrl: './theme-select.scss',
})
export class ThemeSelect {
  protected readonly themeService = inject(ThemeService);
  protected readonly themes = THEMES;
  protected readonly labels = THEME_LABELS;

  protected onChange(value: string): void {
    this.themeService.set(value as Theme);
  }
}
