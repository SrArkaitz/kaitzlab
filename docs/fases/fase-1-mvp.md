# Fase 1 — MVP público

**Objetivo:** web personal completa con contenido estático y personalidad propia, lista para
enlazar en LinkedIn.

**Hecho cuando:** kaitzlab.com muestra portada, sobre mí, experiencia, proyectos y contacto, con
diseño propio, Lighthouse ≥ 90 en las cuatro categorías y el enlace puesto en LinkedIn.

## Antes de empezar (lo aporta Arkaitz; ver `docs/PREPARACION.md`, apartado 4)

- [ ] Bio corta (2–3 frases) y texto de "sobre mí"
- [ ] Experiencia: fechas y 2–3 líneas de cada puesto (Plexus Tech, Hiberus, Tesicnor, Isringhausen)
- [ ] Stack: lo que usas y lo que estás aprendiendo
- [ ] Proyectos: descripción corta, enlace y captura (homelab-monitor, gestion-hogar, kaitzlab, servidor casero)
- [ ] CV en PDF actualizado
- [ ] Email de contacto que se muestra
- [ ] 2–3 webs de referencia de estilo, además de guillermodean.com
- [ ] Foto (opcional)

## Tareas

### Identidad visual
- [ ] Proponer 2–3 direcciones visuales (paleta, tipografía, tono) a partir de las webs de referencia y elegir una
- [ ] Ampliar `_tokens.scss` con la paleta elegida (claro y oscuro con contraste AA) y la tipografía (fuentes autoalojadas en `public/`, `font-display: swap`)
- [x] `ThemeService` como en gestion-hogar: sistema/claro/oscuro, `data-theme` en `<html>` y script en `index.html` para no parpadear al cargar
- [ ] Favicon e icono propios (SVG + PNG para móviles)

### Estructura
- [ ] `layout/`: cabecera con navegación (y selector de tema), pie con enlaces, enlace "saltar al contenido"
- [ ] Rutas lazy por página en `features/` con `title` en cada una; página 404 propia
- [ ] Contenido en archivos de datos tipados en `src/app/core/data/` (experiencia, proyectos, stack, enlaces), no en el HTML

### Páginas
- [ ] Portada: presentación, stack, proyectos destacados y hueco para últimos posts (fase 2)
- [ ] Sobre mí
- [ ] Experiencia: línea de tiempo a partir de los datos
- [ ] Proyectos: tarjetas con descripción, tecnologías, enlace al repo y captura
- [ ] Contacto: email, LinkedIn y GitHub (sin formulario todavía)
- [ ] CV descargable en PDF desde la cabecera o la página de experiencia
- [ ] Quitar la página "en construcción"

### SEO y calidad
- [ ] Meta description y Open Graph por ruta (servicio con `Meta` y `Title`), imagen social por defecto
- [ ] `robots.txt` y `sitemap.xml` generados en el build a partir de las rutas
- [ ] Prerender de todas las rutas y comprobar que cada HTML trae su contenido
- [ ] Tests de los componentes principales (Vitest) y de que cada ruta carga
- [ ] Lighthouse ≥ 90 en las cuatro categorías (móvil) y revisión de accesibilidad con teclado
- [ ] Opcional: Lighthouse CI en el workflow para que no empeore

## Cierre de fase
- [ ] Desplegar en el servidor y poner el enlace en LinkedIn
- [ ] Marcar fase 1 como terminada en ROADMAP.md y desglosar `fase-2-blog.md`
