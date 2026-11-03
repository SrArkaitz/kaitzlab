import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from '../site-footer/site-footer';
import { SiteHeader } from '../site-header/site-header';

/** Marco común de las páginas: "saltar al contenido", cabecera, contenido y pie. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  private readonly document = inject(DOCUMENT);

  /**
   * Con `<base href="/">`, un enlace "#contenido" llevaría a la portada. Se mueve el foco a mano
   * para que el lector de pantalla y el teclado sigan desde el contenido.
   */
  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.document.getElementById('contenido')?.focus();
  }
}
