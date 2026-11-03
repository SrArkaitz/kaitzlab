import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PROFILE } from '../../core/data/profile';
import { NAV_ITEMS } from '../../core/navigation';
import { ThemeSelect } from '../../shared/theme-select/theme-select';

/** Cabecera: nombre, navegación principal y selector de tema. */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, ThemeSelect],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly name = PROFILE.name;
  protected readonly navItems = NAV_ITEMS;
}
