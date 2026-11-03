# Roadmap de kaitzlab.com

**Visión:** escaparate profesional + laboratorio. Web personal con blog, panel propio para
gestionar el contenido y datos en vivo del servidor casero. Todo autoalojado en el servidor casero.

**Regla de oro:** grande por dentro, pero sale pronto. Cada fase termina con algo publicado.

| Fase | Objetivo | Resultado publicado |
|---|---|---|
| 0 — Cimientos | Repo, proyectos generados, Docker, CI, página "en construcción" | kaitzlab.com responde |
| 1 — MVP público | Portada, sobre mí, experiencia, proyectos, contacto (contenido estático) | Enlace en LinkedIn |
| 2 — Blog | Posts Markdown, etiquetas, RSS, SEO, tarjetas sociales | Primera serie: "Mi servidor en casa" |
| 3 — Backend y admin | API NestJS + PostgreSQL, login, editor de posts | Publicar desde el navegador |
| 4 — El lab en vivo | Estado real de servicios (homelab-monitor), uptime, métricas | Sección `/lab` |
| 5 — Extras | Umami, inglés, comentarios, newsletter | — |

Detalle de cada fase en `docs/fases/`. Solo la fase en curso está desglosada al máximo;
las siguientes se refinan al llegar a ellas.

## Fase en curso

**Fase 1 — MVP público** → `docs/fases/fase-1-mvp.md`

## Estado

- **Fase 0 — Cimientos:** terminada en el repo (2026-11-03). Front y back generados, Docker probado en el CI.
  Falta el primer despliegue en el servidor, que hace Arkaitz siguiendo `infra/DESPLIEGUE.md`
  (y aplicar `infra/SEGURIDAD.md` antes de publicar).
