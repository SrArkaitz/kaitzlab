/** Tipos del contenido de la web. Los datos están en los archivos de esta carpeta, no en el HTML. */

export interface ProfileLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  /** Una o dos frases para la portada. */
  shortBio: string;
  /** Párrafos de la página "Sobre mí". */
  about: string[];
  /** null mientras no se decida qué correo se muestra. */
  email: string | null;
  links: ProfileLink[];
  /** Ruta del CV en `public/`; null hasta que esté el PDF. */
  cvUrl: string | null;
}

export interface Experience {
  company: string;
  role: string;
  /** Texto libre: "jul. 2024 – actualidad". */
  period: string;
  summary: string;
  technologies: string[];
}

export interface Project {
  /** Identificador para enlaces y `track`. */
  slug: string;
  name: string;
  summary: string;
  technologies: string[];
  /** null si el repositorio no es público. */
  repoUrl: string | null;
  /** Se muestra en la portada. */
  featured: boolean;
}

export interface StackGroup {
  title: string;
  items: string[];
}
