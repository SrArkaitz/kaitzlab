import { Component } from '@angular/core';
import { PROFILE } from '../../core/data/profile';

/** Portada provisional mientras se construye la web (fase 0). */
@Component({
  selector: 'app-coming-soon',
  styleUrl: './coming-soon.page.scss',
  templateUrl: './coming-soon.page.html',
})
export class ComingSoonPage {
  protected readonly links = PROFILE.links;
}
