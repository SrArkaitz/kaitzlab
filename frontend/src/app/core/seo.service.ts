import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const SITE_URL = 'https://kaitzlab.com';
export const DEFAULT_DESCRIPTION =
  'Web personal de Arkaitz Galisteo, desarrollador frontend Angular: experiencia, proyectos y blog.';

/**
 * Meta description, Open Graph y URL canónica de cada página, a partir del `title` de la ruta y
 * de `data.description`. Al prerenderizar quedan escritas en el HTML de cada ruta.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);

  init(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => this.update(event.urlAfterRedirects));
  }

  private update(url: string): void {
    const route = this.deepest(this.router.routerState.snapshot.root);
    const description = (route.data['description'] as string | undefined) ?? DEFAULT_DESCRIPTION;
    const path = url.split(/[?#]/)[0];
    const canonical = SITE_URL + (path === '/' ? '/' : path);
    // Se lee de la ruta: el TitleStrategy del router puede actualizar <title> después de esto
    const title = route.title ?? this.title.getTitle();

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'kaitzlab' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.setCanonical(canonical);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepest(route.firstChild) : route;
  }
}
