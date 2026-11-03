import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { DEFAULT_DESCRIPTION, SeoService } from './seo.service';

@Component({ template: '' })
class Blank {}

describe('SeoService', () => {
  const meta = (selector: string) =>
    document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`)?.content;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', title: 'Inicio', component: Blank },
          {
            path: 'proyectos',
            title: 'Proyectos',
            data: { description: 'Mis proyectos' },
            component: Blank,
          },
        ]),
      ],
    });
    TestBed.inject(SeoService).init();
  });

  it('usa la descripción y el título de la ruta, y la URL canónica', async () => {
    await TestBed.inject(Router).navigateByUrl('/proyectos?x=1');
    expect(meta('name="description"')).toBe('Mis proyectos');
    expect(meta('property="og:title"')).toBe('Proyectos');
    expect(meta('property="og:url"')).toBe('https://kaitzlab.com/proyectos');
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(
      'https://kaitzlab.com/proyectos',
    );
  });

  it('sin descripción en la ruta usa la de por defecto', async () => {
    await TestBed.inject(Router).navigateByUrl('/');
    expect(meta('name="description"')).toBe(DEFAULT_DESCRIPTION);
    expect(meta('property="og:url"')).toBe('https://kaitzlab.com/');
  });
});
