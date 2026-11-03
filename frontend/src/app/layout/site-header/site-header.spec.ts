import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NAV_ITEMS } from '../../core/navigation';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  let fixture: ComponentFixture<SiteHeader>;

  beforeEach(async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn() });
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(SiteHeader);
    await fixture.whenStable();
  });

  it('enlaza todas las páginas de la navegación', () => {
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('nav a'),
    );
    expect(links.map((a) => a.textContent?.trim())).toEqual(NAV_ITEMS.map((i) => i.label));
    expect(links.map((a) => a.getAttribute('href'))).toEqual(NAV_ITEMS.map((i) => '/' + i.path));
  });
});
