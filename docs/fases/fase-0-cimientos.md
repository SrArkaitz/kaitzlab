# Fase 0 — Cimientos

**Objetivo:** que kaitzlab.com sirva una página "en construcción" desde el servidor casero,
con el repo, los dos proyectos generados y el despliegue funcionando.

**Hecho cuando:** tras un `git push` a `main`, basta con `git pull && docker compose up -d --build`
en el servidor (igual que en gestion-hogar) para tener la web actualizada en kaitzlab.com.

## Requisitos en el PC (comprobar antes de empezar)

- [ ] Node 24 LTS (la última versión del Angular CLI pide Node ≥ 22.22.3 o ≥ 24.15)
- [ ] Docker Desktop (hace falta a partir de los `Dockerfile`)
- [x] Git configurado con la cuenta SrArkaitz

No hacen falta CLIs globales: los generadores se lanzan con `npx` y después cada proyecto
lleva su CLI como dependencia (scripts de npm).

## Tareas

### Repo
- [x] `git init`, rama `main`, `.gitignore` combinado (Node, Angular, NestJS, IDEs, `.env`)
- [x] Crear el repo `SrArkaitz/kaitzlab` en GitHub (público) y subir el primer commit
- [x] `.editorconfig` y Prettier comunes para front y back (2 espacios)
- [x] Revisar `gestion-hogar` y apuntar en `docs/CONVENCIONES.md` lo que se copia (estructura, scripts, config, Dockerfile)

### Frontend
- [x] Generar en `frontend/`: `npx @angular/cli@latest new kaitzlab-web --directory . --style=scss --ssr --routing --skip-git`
- [x] Limpiar la plantilla y crear estructura: `src/app/core`, `shared`, `features`, `layout`
- [ ] Variables de diseño mínimas en `src/styles/_tokens.scss` (colores neutros, tipografía del sistema, espaciados) con claro/oscuro por `prefers-color-scheme`. La paleta con personalidad y el selector de tema (`ThemeService` como en gestion-hogar) llegan en la fase 1
- [ ] Página "en construcción": nombre, una línea de presentación, enlaces a LinkedIn y GitHub
- [ ] Configurar prerender de las rutas estáticas
- [ ] `Dockerfile` multi-stage (build con Node → `nginx:alpine` sirviendo el resultado prerenderizado), con `nginx.conf` propio: fallback a `index.html`, `/api` reenviado al contenedor de la API, caché larga para assets con hash, gzip y cabeceras de seguridad básicas

### Backend
- [ ] Generar en `backend/`: `npx @nestjs/cli@latest new kaitzlab-api --directory . --package-manager npm --strict --skip-git`
- [ ] Prefijo global `/api` y `ConfigModule` con variables de entorno
- [ ] Endpoint `GET /api/health` que devuelva `{ status: "ok", version }`
- [ ] Test e2e del health con Jest + supertest
- [ ] `Dockerfile` multi-stage (build con Node → imagen `node:*-alpine` solo con `dist` y dependencias de producción), usuario no root

### Monorepo
- [ ] npm workspaces como en gestion-hogar: `package.json` en la raíz, un único `package-lock.json` y scripts `dev:web`, `dev:api`, `build` y `test`

### Docker y despliegue
- [ ] `docker-compose.yml` en la raíz, el mismo para local y servidor: servicios `web` (nginx, puerto 8080 del host) y `api` (sin puerto publicado; nginx le reenvía `/api`)
- [ ] Workflow `.github/workflows/ci.yml`: en PR y push a `main` → build y tests de front y back
- [ ] `infra/DESPLIEGUE.md`: pasos para el servidor (clonar el repo, `.env`, `docker compose up -d --build`, actualizar con `git pull && docker compose up -d --build`) y cómo añadir `kaitzlab.com` y `www` al túnel de Cloudflare apuntando al servicio web

### Seguridad (en el servidor, lo hace Arkaitz; Claude solo deja la guía)
- [ ] Guía en `infra/SEGURIDAD.md`: poner portainer y amule detrás de Cloudflare Access (o sacarlos del túnel y usar Tailscale)

## Cierre de fase
- [ ] README actualizado con cómo arrancar en local
- [ ] Marcar fase 0 como terminada en ROADMAP.md y crear `fase-1-mvp.md` desglosada
