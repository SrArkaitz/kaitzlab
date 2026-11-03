import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

/** Recorre todas las rutas: cada página carga, tiene un único h1 y su título. */
describe('rutas', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn() });
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    harness = await RouterTestingHarness.create();
  });

  const pages: [string, string, string][] = [
    ['/', 'Arkaitz Galisteo', 'Arkaitz Galisteo · Desarrollador frontend Angular'],
    ['/sobre-mi', 'Sobre mí', 'Sobre mí · Arkaitz Galisteo'],
    ['/experiencia', 'Experiencia', 'Experiencia · Arkaitz Galisteo'],
    ['/proyectos', 'Proyectos', 'Proyectos · Arkaitz Galisteo'],
    ['/contacto', 'Contacto', 'Contacto · Arkaitz Galisteo'],
    ['/404', 'Página no encontrada', 'Página no encontrada · Arkaitz Galisteo'],
    ['/no-existe', 'Página no encontrada', 'Página no encontrada · Arkaitz Galisteo'],
  ];

  for (const [url, heading, title] of pages) {
    it(`${url} muestra "${heading}"`, async () => {
      await harness.navigateByUrl(url);
      const h1s = (harness.fixture.nativeElement as HTMLElement).querySelectorAll('h1');
      expect(h1s.length).toBe(1);
      expect(h1s[0].textContent).toContain(heading);
      expect(TestBed.inject(Title).getTitle()).toBe(title);
    });
  }
});
