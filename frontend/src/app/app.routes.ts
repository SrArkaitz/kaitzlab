import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Arkaitz Galisteo · kaitzlab',
    loadComponent: () =>
      import('./features/coming-soon/coming-soon.page').then((m) => m.ComingSoonPage),
  },
  { path: '**', redirectTo: '' },
];
