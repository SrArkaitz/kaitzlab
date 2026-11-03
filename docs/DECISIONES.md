# Registro de decisiones

Formato: fecha · decisión · motivo.

- 2026-11-03 · Backend en NestJS (antes se planteó ASP.NET Core) · más sencillo de programar, todo en TypeScript y mismo stack que gestion-hogar. La práctica de .NET queda en homelab-monitor.
- 2026-11-03 · Monorepo con `frontend/` y `backend/` · un solo sitio para issues, CI y despliegue.
- 2026-11-03 · Blog en Markdown hasta la fase 3 · lanzar antes sin depender del backend.
- 2026-11-03 · Hosting en el servidor casero vía Cloudflare Tunnel · ya montado; es parte de lo que se cuenta en el blog.
- 2026-11-03 · Web solo en español al principio · el inglés se plantea en la fase 5.
- 2026-11-03 · Frontend prerenderizado y servido con nginx (sin SSR con Node) · más rápido y ligero para el servidor; el contenido cambia solo al desplegar. Se revisa en la fase 3.
- 2026-11-03 · ~~Despliegue manual en el servidor (`docker compose pull && up -d`) · entender el flujo primero; Watchtower más adelante cuando el CI sea estable.~~ Sustituida por la siguiente.
- 2026-11-03 · Despliegue como en gestion-hogar: el servidor construye las imágenes con `git pull && docker compose up -d --build`, a mano y sin GHCR · un solo flujo para los dos proyectos, sin registro ni tokens. GitHub Actions se queda para build y tests. Las imágenes en un registro se pueden recuperar en la fase 5.
- 2026-11-03 · Dos contenedores (nginx con la web + API); nginx reenvía `/api` y solo se publica el puerto 8080 · la web sigue en pie aunque la API falle o se reinicie, y nginx sirve mejor los estáticos (caché, gzip, cabeceras).
- 2026-11-03 · npm workspaces como en gestion-hogar, sin CLIs globales · un único `package-lock.json`, scripts en la raíz y los generadores con `npx`.
- 2026-11-03 · Últimas versiones estables de Angular y NestJS, con Node 24 LTS · es un proyecto nuevo y de portfolio; el Angular CLI actual exige Node ≥ 22.22.3 o ≥ 24.15.
- 2026-11-03 · Se copian las convenciones de gestion-hogar (ver `docs/CONVENCIONES.md`) salvo configuración con `@nestjs/config`, validación con `class-validator` y tests (Jest al principio; ver la entrada de Vitest) · son lo estándar en NestJS, encajan con un proyecto de portfolio y el CI los aprovecha.
- 2026-11-03 · La identidad visual (paleta, tipografía, selector de tema) se deja para la fase 1 · en la fase 0 lo importante es tener algo publicado; tokens neutros mientras tanto.
- 2026-11-03 · Tests con Vitest en lugar de Jest, en front y back · es lo que generan Angular 22 y NestJS 12 de serie; un solo runner para todo el repo.
- 2026-11-03 · Se quitan del backend generado `AGENTS.md` (publicidad de NestJS Observe) y `@nestjs/mau` (despliegue en la nube de NestJS) · no se usan: el despliegue es en el servidor casero.
