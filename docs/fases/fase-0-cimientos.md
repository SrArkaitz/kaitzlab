# Fase 0 — Cimientos

**Objetivo:** que kaitzlab.com sirva una página "en construcción" desde el servidor casero,
con el repo, los dos proyectos generados y el despliegue automático funcionando.

**Hecho cuando:** un `git push` a `main` acaba, sin tocar nada a mano salvo un `docker compose pull && up`, con la web actualizada en kaitzlab.com.

## Requisitos en el PC (comprobar antes de empezar)

- [ ] Node LTS y Angular CLI (`npm i -g @angular/cli`)
- [ ] Nest CLI (`npm i -g @nestjs/cli`)
- [ ] Docker Desktop
- [ ] Git configurado con la cuenta SrArkaitz

## Tareas

### Repo
- [ ] `git init`, rama `main`, `.gitignore` combinado (Node, Angular, NestJS, IDEs, `.env`)
- [ ] Crear el repo `SrArkaitz/kaitzlab` en GitHub (público) y subir el primer commit
- [ ] `.editorconfig` y Prettier comunes para front y back (2 espacios)

### Frontend
- [ ] Generar en `frontend/`: `ng new kaitzlab-web --directory . --style=scss --ssr --routing`
- [ ] Limpiar la plantilla y crear estructura: `src/app/core`, `shared`, `features`, `layout`
- [ ] Variables de diseño en `src/styles/_tokens.scss` (colores, tipografía, espaciados) con modo claro/oscuro por `prefers-color-scheme`
- [ ] Página "en construcción": nombre, una línea de presentación, enlaces a LinkedIn y GitHub
- [ ] Configurar prerender de las rutas estáticas
- [ ] `Dockerfile` multi-stage (build con Node → `nginx:alpine` sirviendo el resultado prerenderizado), con `nginx.conf` propio: fallback a `index.html`, caché larga para assets con hash, gzip y cabeceras de seguridad básicas

### Backend
- [ ] Generar en `backend/`: `nest new kaitzlab-api --directory . --package-manager npm --strict`
- [ ] Revisar `SrArkaitz/gestion-hogar` y seguir su misma estructura y convenciones (módulos, config, scripts)
- [ ] Prefijo global `/api` y `ConfigModule` con variables de entorno
- [ ] Endpoint `GET /api/health` que devuelva `{ status: "ok", version }`
- [ ] Test e2e del health con Jest + supertest
- [ ] `Dockerfile` multi-stage (build con Node → imagen `node:*-alpine` solo con `dist` y dependencias de producción), usuario no root

### Docker y despliegue
- [ ] `docker-compose.yml` en la raíz para desarrollo (web 8080, api 5080)
- [ ] `infra/docker-compose.prod.yml` que use las imágenes de GHCR
- [ ] Workflow `.github/workflows/ci.yml`: en PR → build y tests de front y back
- [ ] Workflow `.github/workflows/deploy.yml`: en push a `main` → construir y publicar imágenes en `ghcr.io/srarkaitz/kaitzlab-web` y `-api` con tags `latest` y SHA
- [ ] `infra/DESPLIEGUE.md`: pasos para el servidor (copiar compose, `docker login ghcr.io`, `pull`, `up -d`) y cómo añadir `kaitzlab.com` y `www` al túnel de Cloudflare apuntando a `http://<contenedor-web>:8080`

### Seguridad (en el servidor, lo hace Arkaitz; Claude solo deja la guía)
- [ ] Guía en `infra/SEGURIDAD.md`: poner portainer y amule detrás de Cloudflare Access (o sacarlos del túnel y usar Tailscale)

## Cierre de fase
- [ ] README actualizado con cómo arrancar en local
- [ ] Marcar fase 0 como terminada en ROADMAP.md y crear `fase-1-mvp.md` desglosada
