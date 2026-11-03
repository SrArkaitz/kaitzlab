# Convenciones heredadas de gestion-hogar

Qué se copia de `SrArkaitz/gestion-hogar` y qué se hace distinto a propósito.
Revisado el 2026-11-03 sobre la versión 0.2.0 (Angular 20, NestJS 11, Prisma 7).

## Se copia tal cual

### Monorepo
- **npm workspaces** en el `package.json` de la raíz, con un único `package-lock.json`. Todo se instala con `npm install` desde la raíz.
- Scripts en la raíz que delegan en cada workspace (`npm run <script> -w <workspace>`):
  `build`, `dev:api`, `dev:web` (aquí se añaden `test` y `format`).
- `"engines": { "node": ">=..." }` en la raíz con la versión mínima de Node.
- Si hace falta compartir tipos entre front y back (fase 3), un workspace `shared/`
  (`@kaitzlab/shared`): el front lo lee del código fuente vía `paths` del `tsconfig` y el back
  usa su versión compilada (`shared/dist`).

### Desarrollo en local
- Web en `ng serve` (4200) y API en `nest start --watch` (3000).
- El front redirige `/api` a la API con `proxy.conf.json` (`"/api": { "target": "http://localhost:3000" }`).
  Así la web y la API comparten origen y **no hace falta CORS**. En producción hace lo mismo nginx.
- `backend/.env.example` versionado y comentado; el `.env` real nunca se sube.

### Backend (NestJS)
- `main.ts`: `app.setGlobalPrefix('api')`, puerto de `PORT` (3000 por defecto),
  `app.listen(port, '0.0.0.0')` y un `Logger.log` al arrancar.
- **Una carpeta por funcionalidad** en `src/` con `x.module.ts`, `x.controller.ts` y `x.service.ts`.
  Utilidades comunes en `src/common/`. El acceso a datos va en un módulo propio (`src/prisma/`).
- Controladores finos que solo leen parámetros y llaman al servicio; la lógica y los errores
  (`BadRequestException`, `NotFoundException`…) van en el servicio.
- Inyección por constructor con `private readonly`. Tipos de retorno explícitos en los controladores.
- `src/health/health.controller.ts` como comprobación rápida.
- Scripts del workspace: `build` (`tsc -p tsconfig.build.json`), `start` (`node dist/main.js`),
  `dev` (`nest start --watch`). Prisma, cuando llegue: `db:migrate` y `db:deploy`, y la imagen
  aplica las migraciones al arrancar (`prisma migrate deploy && node dist/main.js`).
- `tsconfig`: `strict: true` con `strictPropertyInitialization: false` (lo pide el estilo de Nest).

### Frontend (Angular)
- Standalone, `inject()`, signals y control flow nuevo.
- Nombres de archivo sin sufijo `.component`, por tipo de pieza:
  `x.page.ts` (página de una ruta) · `x.store.ts` (estado con signals) · `x-dialog.ts` ·
  `x.routes.ts` (exporta `X_ROUTES`). Plantilla aparte (`.html`) cuando no es trivial.
- Rutas con `loadComponent` / `loadChildren` (lazy loading) y `title` en cada ruta (`'Blog · Kaitzlab'`).
- **Stores** `providedIn: 'root'` con `signal()` públicas de solo lectura (`items`, `loading`, `error`)
  y métodos `async` que usan `HttpClient` + `firstValueFrom`.
- En los componentes, los miembros que usa la plantilla son `protected readonly`.
- `tsconfig` con `strict`, `noImplicitReturns`, `noPropertyAccessFromIndexSignature`
  y `strictTemplates`.
- Tema claro/oscuro con un `ThemeService`: opciones sistema/claro/oscuro, `data-theme` en `<html>`
  y un script pequeño en `index.html` que aplica el tema antes de pintar (sin parpadeo).

### Comentarios y documentación
- Comentarios en español, cortos, explicando el **porqué**. JSDoc de una línea encima de clases
  y métodos públicos (`/** Ideas de una casa. … */`).
- README con "Desarrollo en local" y una guía de despliegue aparte paso a paso.

### Docker
- `Dockerfile` multi-stage para el monorepo: primero se copian los `package.json` de la raíz
  y de cada workspace y se hace `npm ci` (para aprovechar la caché), después el código y el build.
- Fase de dependencias de producción con `npm ci --omit=dev -w backend` para la imagen final.
- `.dockerignore` con `**/node_modules`, `**/dist`, `**/.angular`, `**/.env`, `.git`.
- `docker-compose.yml`: `restart: unless-stopped`, `container_name`, `TZ=Europe/Madrid`,
  variables con `${VAR:-valor}` para que los secretos vengan del entorno y no del repo,
  y `pull_policy: build` por si se despliega desde Portainer.

## Se hace distinto a propósito

| Tema | gestion-hogar | kaitzlab | Motivo |
|---|---|---|---|
| Contenedores | Uno: Nest sirve la web con `ServeStaticModule` | Dos: nginx (web prerenderizada) + API | Ver DECISIONES.md |
| Estilos | Un `styles.css` grande con variables | SCSS con `_tokens.scss` y estilos por componente | Decidido en el stack |
| Estructura del front | Carpetas por funcionalidad en `src/app/` | `core/`, `shared/`, `features/`, `layout/` | Decidido en la fase 0; los nombres de archivo sí se copian |
| Health | `{ ok: true }` | `{ status: "ok", version }` | Lo pide la fase 0 |
| Commits | Frase libre en español | Conventional Commits en español | Lo pide CLAUDE.md |
| Configuración | `dotenv` + `process.env` | `@nestjs/config` (`ConfigModule`) | Estándar en Nest; habrá más variables (BD, login, métricas) |
| Validación | Funciones propias en `common/validation.ts`, `@Body() body: unknown` | DTOs con `class-validator` + `ValidationPipe` | Lo estándar en NestJS y documenta la API |
| Tests | No tiene | Vitest (lo que traen Angular 22 y NestJS 12): e2e en el back y unitarios donde aporten; se pasan en el CI | Portfolio y red de seguridad del CI |
