import { TestBed } from '@angular/core/testing';
import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

/** jsdom no trae matchMedia: se simula con el modo del sistema que pida cada test. */
function mockSystemDark(dark: boolean): void {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: dark,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

describe('ThemeService', () => {
  const html = document.documentElement;

  beforeEach(() => {
    localStorage.clear();
    delete html.dataset['theme'];
  });

  it('sigue al sistema si no hay nada guardado', () => {
    mockSystemDark(true);
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    expect(service.theme()).toBe('system');
    expect(html.dataset['theme']).toBe('dark');
  });

  it('recupera el tema guardado', () => {
    mockSystemDark(true);
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    expect(service.theme()).toBe('light');
    expect(html.dataset['theme']).toBe('light');
  });

  it('ignora un valor guardado que no es un tema', () => {
    mockSystemDark(false);
    localStorage.setItem(THEME_STORAGE_KEY, 'morado');
    expect(TestBed.inject(ThemeService).theme()).toBe('system');
  });

  it('al cambiar de tema lo aplica y lo guarda', () => {
    mockSystemDark(false);
    const service = TestBed.inject(ThemeService);
    service.set('dark');
    TestBed.tick();
    expect(html.dataset['theme']).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });
});
