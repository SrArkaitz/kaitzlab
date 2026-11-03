import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../../core/theme.service';
import { ThemeSelect } from './theme-select';

describe('ThemeSelect', () => {
  let fixture: ComponentFixture<ThemeSelect>;
  let select: HTMLSelectElement;

  beforeEach(async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn() });
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [ThemeSelect] }).compileComponents();
    fixture = TestBed.createComponent(ThemeSelect);
    await fixture.whenStable();
    select = (fixture.nativeElement as HTMLElement).querySelector('select')!;
  });

  it('ofrece sistema, claro y oscuro con una etiqueta visible', () => {
    const options = Array.from(select.options).map((o) => o.textContent?.trim());
    expect(options).toEqual(['Sistema', 'Claro', 'Oscuro']);
    expect(select.closest('label')?.textContent).toContain('Tema');
  });

  it('cambia el tema al elegir una opción', () => {
    select.value = 'dark';
    select.dispatchEvent(new Event('change'));
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });
});
