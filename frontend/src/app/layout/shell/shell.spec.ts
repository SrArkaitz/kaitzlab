import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Shell } from './shell';

describe('Shell', () => {
  let fixture: ComponentFixture<Shell>;
  let element: HTMLElement;

  beforeEach(async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn() });
    await TestBed.configureTestingModule({
      imports: [Shell],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Shell);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('tiene cabecera, contenido principal y pie', () => {
    expect(element.querySelector('header')).not.toBeNull();
    expect(element.querySelector('main#contenido')).not.toBeNull();
    expect(element.querySelector('footer')).not.toBeNull();
  });

  it('"Saltar al contenido" es lo primero y mueve el foco al contenido', () => {
    const skip = element.querySelector<HTMLAnchorElement>('a')!;
    expect(skip.textContent).toContain('Saltar al contenido');
    skip.click();
    expect(document.activeElement).toBe(element.querySelector('main'));
  });
});
