import { Component, input } from '@angular/core';
import { Project } from '../../core/data/models';

/** Tarjeta de un proyecto: nombre, resumen, tecnologías y enlace al repositorio. */
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
