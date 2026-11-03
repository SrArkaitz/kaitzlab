import { Project } from './models';

// TODO(Arkaitz): revisar los textos (son un borrador a partir de los repos) y añadir capturas.
export const PROJECTS: Project[] = [
  {
    slug: 'kaitzlab',
    name: 'kaitzlab.com',
    summary:
      'Esta web: CV, blog y laboratorio. Angular prerenderizado servido con nginx, API en NestJS, ' +
      'Docker Compose en mi servidor casero y CI con GitHub Actions.',
    technologies: ['Angular', 'NestJS', 'Docker', 'nginx', 'GitHub Actions'],
    repoUrl: 'https://github.com/SrArkaitz/kaitzlab',
    featured: true,
  },
  {
    slug: 'gestion-hogar',
    name: 'Gestión del hogar',
    summary:
      'App para organizar una casa entre varias personas: tareas, compra, recetas con menú ' +
      'semanal, gastos, calendario e inventario. Instalable como PWA y con avisos push.',
    technologies: ['Angular', 'NestJS', 'Prisma', 'SQLite', 'PWA'],
    repoUrl: 'https://github.com/SrArkaitz/gestion-hogar',
    featured: true,
  },
  {
    slug: 'homelab-monitor',
    name: 'homelab-monitor',
    summary: 'Pendiente: descripción corta.',
    technologies: ['.NET'],
    repoUrl: null,
    featured: true,
  },
  {
    slug: 'servidor-casero',
    name: 'Servidor casero',
    summary:
      'Ubuntu Server con Docker donde se alojan mis proyectos, publicados a internet con ' +
      'Cloudflare Tunnel sin abrir puertos en el router.',
    technologies: ['Ubuntu Server', 'Docker', 'Cloudflare Tunnel'],
    repoUrl: null,
    featured: false,
  },
];
