# kaitzlab.com — instrucciones para Claude

Lee este archivo entero antes de hacer nada. Después lee `docs/ROADMAP.md` y el archivo de la fase en curso en `docs/fases/`.

## Qué es este proyecto

Web personal de Arkaitz Galisteo (desarrollador frontend Angular) en **kaitzlab.com**:
CV online + blog + proyectos + una sección "lab" con datos en vivo de su servidor casero.
Es a la vez su escaparate profesional (se enlaza desde LinkedIn) y un proyecto de portfolio
para demostrar Angular + .NET.

## Stack (decidido, no cambiar sin preguntar)

| Capa | Tecnología |
|---|---|
| Frontend | Angular (última versión estable), standalone components, signals, SSR/prerender con `@angular/ssr` |
| Estilos | SCSS propio con variables CSS (sin Bootstrap ni Material). Modo claro/oscuro |
| Backend | ASP.NET Core Web API (.NET LTS actual), C#, minimal APIs o controllers |
| Base de datos | PostgreSQL + Entity Framework Core (a partir de la fase 3) |
| Contenido blog | Markdown con frontmatter en `content/blog/` (fases 1–2); BD a partir de la fase 3 |
| Contenedores | Docker + Docker Compose |
| CI/CD | GitHub Actions → imágenes en GHCR (`ghcr.io/srarkaitz/kaitzlab-*`) |
| Hosting | Servidor casero (Ubuntu Server, Docker) publicado con Cloudflare Tunnel |

## Estructura del repo

```
kaitzlab/
├── CLAUDE.md            ← este archivo
├── README.md
├── docs/
│   ├── ROADMAP.md       ← visión y fases
│   ├── DECISIONES.md    ← registro de decisiones (ADR ligeras)
│   └── fases/           ← tareas detalladas de cada fase
├── frontend/            ← app Angular (se genera en la fase 0)
├── backend/             ← solución .NET (se genera en la fase 0)
├── content/blog/        ← posts en Markdown
├── infra/               ← docker-compose de producción, notas del servidor
└── .github/workflows/   ← CI/CD
```

## Cómo trabajar

1. **Una tarea cada vez.** Coge la primera tarea sin marcar (`- [ ]`) de la fase en curso.
   Antes de empezar, resume en 2–3 líneas lo que vas a hacer.
2. **Usa los generadores oficiales** (`ng new`, `ng generate`, `dotnet new`, `dotnet add`)
   en vez de escribir a mano archivos de configuración que ellos crean.
3. **Comprueba que funciona** antes de dar una tarea por terminada: compila
   (`ng build`, `dotnet build`), pasa los tests y, si aplica, levanta con `docker compose up`.
4. **Marca la tarea como hecha** (`- [x]`) en el archivo de la fase y haz un commit
   con mensaje en español siguiendo Conventional Commits:
   `feat(front): portada con hero y proyectos destacados`.
5. Si algo del plan no tiene sentido o hay una decisión que tomar, **para y pregunta**.
   Las decisiones tomadas se apuntan en `docs/DECISIONES.md`.

## Convenciones

- Idioma: código (nombres, identificadores) en **inglés**; textos de la web, commits,
  documentación y comentarios en **español**.
- Angular: standalone, `inject()`, signals, control flow nuevo (`@if`, `@for`),
  lazy loading por ruta, un componente por carpeta en `features/` o `shared/`.
- .NET: nullable activado, `async` en todo lo que toque E/S, configuración por
  `appsettings` + variables de entorno, nunca secretos en el repo.
- Accesibilidad y rendimiento importan: HTML semántico, contraste AA, Lighthouse ≥ 90.
- Nada de datos internos del servidor (IPs, nombres de servicios privados, subdominios
  de administración) en el código ni en la web pública.

## Entorno del servidor (contexto, no tocar desde aquí)

- Ubuntu Server con Docker; datos persistentes en `/mnt/almacen-rocket/`.
- `cloudflared` corre en un contenedor y publica subdominios de kaitzlab.com.
- Puertos YA ocupados en el servidor: 8096, 2283, 9443. Esta web usará
  **8080** (frontend) y **5080** (API) en el host; PostgreSQL sin puerto expuesto.
- El despliegue lo hace Arkaitz o el workflow; Claude nunca hace SSH al servidor.
