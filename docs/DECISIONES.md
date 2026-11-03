# Registro de decisiones

Formato: fecha · decisión · motivo.

- 2026-11-03 · Backend en NestJS (antes se planteó ASP.NET Core) · más sencillo de programar, todo en TypeScript y mismo stack que gestion-hogar. La práctica de .NET queda en homelab-monitor.
- 2026-11-03 · Monorepo con `frontend/` y `backend/` · un solo sitio para issues, CI y despliegue.
- 2026-11-03 · Blog en Markdown hasta la fase 3 · lanzar antes sin depender del backend.
- 2026-11-03 · Hosting en el servidor casero vía Cloudflare Tunnel · ya montado; es parte de lo que se cuenta en el blog.
- 2026-11-03 · Web solo en español al principio · el inglés se plantea en la fase 5.
- 2026-11-03 · Frontend prerenderizado y servido con nginx (sin SSR con Node) · más rápido y ligero para el servidor; el contenido cambia solo al desplegar. Se revisa en la fase 3.
- 2026-11-03 · Despliegue manual en el servidor (`docker compose pull && up -d`) · entender el flujo primero; Watchtower más adelante cuando el CI sea estable.
