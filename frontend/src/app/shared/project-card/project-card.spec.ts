import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '../../core/data/models';
import { ProjectCard } from './project-card';

const PROJECT: Project = {
  slug: 'demo',
  name: 'Demo',
  summary: 'Un proyecto de prueba.',
  technologies: ['Angular', 'NestJS'],
  repoUrl: 'https://github.com/SrArkaitz/demo',
  featured: true,
};

describe('ProjectCard', () => {
  let fixture: ComponentFixture<ProjectCard>;

  async function render(project: Project): Promise<HTMLElement> {
    fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', project);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProjectCard] }).compileComponents();
  });

  it('muestra nombre, resumen y tecnologías', async () => {
    const el = await render(PROJECT);
    expect(el.querySelector('h3')?.textContent).toBe('Demo');
    expect(el.querySelectorAll('.tags li').length).toBe(2);
  });

  it('enlaza el repo solo si es público', async () => {
    expect((await render(PROJECT)).querySelector('a')?.href).toBe(PROJECT.repoUrl);
    expect((await render({ ...PROJECT, repoUrl: null })).querySelector('a')).toBeNull();
  });
});
