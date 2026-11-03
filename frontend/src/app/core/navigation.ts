/** Páginas de la navegación principal. Las comparten la cabecera, las rutas y el sitemap. */
export interface NavItem {
  path: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '', label: 'Inicio' },
  { path: 'sobre-mi', label: 'Sobre mí' },
  { path: 'experiencia', label: 'Experiencia' },
  { path: 'proyectos', label: 'Proyectos' },
  { path: 'contacto', label: 'Contacto' },
];
