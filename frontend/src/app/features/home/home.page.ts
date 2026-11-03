import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../core/data/profile';
import { PROJECTS } from '../../core/data/projects';
import { STACK } from '../../core/data/stack';
import { ProjectCard } from '../../shared/project-card/project-card';

/** Portada: presentación, stack, proyectos destacados y hueco para el blog. */
@Component({
  selector: 'app-home',
  imports: [RouterLink, ProjectCard],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly profile = PROFILE;
  protected readonly stack = STACK;
  protected readonly featured = PROJECTS.filter((p) => p.featured);
}
