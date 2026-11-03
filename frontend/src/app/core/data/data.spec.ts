import { EXPERIENCE } from './experience';
import { PROFILE } from './profile';
import { PROJECTS } from './projects';

/** Comprobaciones de coherencia de los datos, para que un error al editarlos salte en el CI. */
describe('datos de la web', () => {
  it('los slugs de los proyectos son únicos', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('hay al menos un proyecto destacado', () => {
    expect(PROJECTS.some((p) => p.featured)).toBe(true);
  });

  it('todos los enlaces son https', () => {
    const urls = [
      ...PROFILE.links.map((l) => l.url),
      ...PROJECTS.flatMap((p) => (p.repoUrl ? [p.repoUrl] : [])),
    ];
    for (const url of urls) expect(url).toMatch(/^https:\/\//);
  });

  it('cada experiencia tiene empresa', () => {
    for (const e of EXPERIENCE) expect(e.company.trim()).not.toBe('');
  });
});
