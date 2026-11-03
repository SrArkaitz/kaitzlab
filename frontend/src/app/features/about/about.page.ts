import { Component } from '@angular/core';
import { PROFILE } from '../../core/data/profile';

/** Sobre mí. */
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
})
export class AboutPage {
  protected readonly paragraphs = PROFILE.about;
}
