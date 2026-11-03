import { Component } from '@angular/core';
import { EXPERIENCE } from '../../core/data/experience';
import { PROFILE } from '../../core/data/profile';

/** Experiencia: línea de tiempo del más reciente al más antiguo, con el CV si está. */
@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrl: './experience.page.scss',
})
export class ExperiencePage {
  protected readonly experience = EXPERIENCE;
  protected readonly cvUrl = PROFILE.cvUrl;
}
