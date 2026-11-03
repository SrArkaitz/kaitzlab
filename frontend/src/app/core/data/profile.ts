import { Profile } from './models';

// TODO(Arkaitz): bio, "sobre mí", email y CV (ver docs/fases/fase-1-mvp.md, "Antes de empezar")
export const PROFILE: Profile = {
  name: 'Arkaitz Galisteo',
  role: 'Desarrollador frontend · Angular',
  shortBio: 'Pendiente: bio corta de 2–3 frases.',
  about: [
    'Pendiente: texto de "sobre mí".',
    'Aquí puede ir también cómo trabajas, qué te interesa y qué estás aprendiendo.',
  ],
  email: null,
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/arkaitz-galisteo-145383160/' },
    { label: 'GitHub', url: 'https://github.com/SrArkaitz' },
  ],
  cvUrl: null,
};
