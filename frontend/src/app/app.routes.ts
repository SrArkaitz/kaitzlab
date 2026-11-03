import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

const SITE = 'Arkaitz Galisteo';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    // Cada página se carga al entrar en ella
    children: [
      {
        path: '',
        title: `${SITE} · Desarrollador frontend Angular`,
        loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'sobre-mi',
        title: `Sobre mí · ${SITE}`,
        data: {
          description: 'Quién es Arkaitz Galisteo, desarrollador frontend Angular, y cómo trabaja.',
        },
        loadComponent: () => import('./features/about/about.page').then((m) => m.AboutPage),
      },
      {
        path: 'experiencia',
        title: `Experiencia · ${SITE}`,
        data: {
          description: 'Trayectoria profesional de Arkaitz Galisteo como desarrollador frontend.',
        },
        loadComponent: () =>
          import('./features/experience/experience.page').then((m) => m.ExperiencePage),
      },
      {
        path: 'proyectos',
        title: `Proyectos · ${SITE}`,
        data: {
          description:
            'Proyectos personales de Arkaitz Galisteo: Angular, NestJS, .NET y un servidor casero con Docker.',
        },
        loadComponent: () =>
          import('./features/projects/projects.page').then((m) => m.ProjectsPage),
      },
      {
        path: 'contacto',
        title: `Contacto · ${SITE}`,
        data: { description: 'Cómo contactar con Arkaitz Galisteo.' },
        loadComponent: () => import('./features/contact/contact.page').then((m) => m.ContactPage),
      },
      // /404 se prerenderiza para que nginx la devuelva con estado 404;
      // "**" cubre las rutas desconocidas al navegar dentro de la web.
      {
        path: '404',
        title: `Página no encontrada · ${SITE}`,
        data: { description: 'La página que buscas no existe.' },
        loadComponent: () =>
          import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
      },
      {
        path: '**',
        title: `Página no encontrada · ${SITE}`,
        loadComponent: () =>
          import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
      },
    ],
  },
];
