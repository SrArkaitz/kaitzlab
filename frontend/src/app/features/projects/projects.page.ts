import { Component } from '@angular/core';
import { PROJECTS } from '../../core/data/projects';
import { ProjectCard } from '../../shared/project-card/project-card';

/** Todos los proyectos. */
@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.page.html',
})
export class ProjectsPage {
  protected readonly projects = PROJECTS;
}
