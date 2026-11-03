import { Component } from '@angular/core';
import { PROFILE } from '../../core/data/profile';

/** Pie: perfiles y enlace al código de la web. */
@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly name = PROFILE.name;
  protected readonly links = PROFILE.links;
  protected readonly year = new Date().getFullYear();
  protected readonly repoUrl = 'https://github.com/SrArkaitz/kaitzlab';
}
