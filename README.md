# kaitzlab.com

Web personal de Arkaitz Galisteo: CV, blog, proyectos y un laboratorio con datos en vivo de mi servidor casero.

[![CI](https://github.com/SrArkaitz/kaitzlab/actions/workflows/ci.yml/badge.svg)](https://github.com/SrArkaitz/kaitzlab/actions/workflows/ci.yml)

- **Frontend:** Angular 22 (standalone, signals), prerenderizado a HTML estático y servido con nginx
- **Backend:** NestJS 12 (ESM), API bajo `/api`
- **Tests:** Vitest en los dos (unitarios y e2e con supertest)
- **Infra:** Docker Compose en un servidor casero, publicado con Cloudflare Tunnel; CI con GitHub Actions

El plan está en [docs/ROADMAP.md](docs/ROADMAP.md) y las decisiones en [docs/DECISIONES.md](docs/DECISIONES.md).

```
kaitzlab/
├── frontend/            Angular (workspace npm "kaitzlab-web")
│   ├── src/app/         core/ · shared/ · features/ · layout/
│   ├── Dockerfile       build con Node → nginx
│   └── nginx.conf       estáticos, caché, gzip, cabeceras y proxy de /api
├── backend/             NestJS (workspace npm "kaitzlab-api")
│   ├── src/             un módulo por funcionalidad (health/, …)
│   └── Dockerfile       build con Node → node:alpine sin root
├── content/blog/        posts en Markdown (fase 2)
├── docs/                roadmap, fases, decisiones y convenciones
├── infra/               guías de despliegue y seguridad del servidor
└── docker-compose.yml   el mismo en el servidor y en el CI
```

El repositorio usa **npm workspaces**: todo se instala desde la raíz y hay un único `package-lock.json`.

## Desarrollo en local

Necesitas **Node 24** (está en `.node-version`). No hacen falta CLIs globales ni Docker.

Con [fnm](https://github.com/Schniz/fnm), la versión cambia sola al entrar en la carpeta si fnm está
activado en la terminal. En PowerShell, una sola vez:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
notepad $PROFILE   # añade la línea de abajo y guarda
```

```powershell
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

(En Git Bash, en `~/.bashrc`: `eval "$(fnm env --use-on-cd --shell bash)"`.)

```bash
# Una sola vez
npm install
cp backend/.env.example backend/.env

# Terminal 1: API en http://localhost:3000/api
npm run dev:api

# Terminal 2: web en http://localhost:4200
npm run dev:web
```

La web redirige `/api` a la API con `frontend/proxy.conf.json`, igual que hace nginx en producción:
web y API comparten origen y no hace falta CORS.

| Script | Qué hace |
|---|---|
| `npm run dev:web` / `dev:api` | Servidores de desarrollo con recarga automática |
| `npm run build` | Compila backend y frontend |
| `npm test` | Tests unitarios y e2e del backend y tests del frontend |
| `npm run lint` | oxlint en el backend |
| `npm run format` / `format:check` | Prettier en todo el repo |

Para generar código se usan los CLIs de cada proyecto: `npx ng generate …` dentro de `frontend/`
y `npx nest generate …` dentro de `backend/`.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) se ejecuta en cada PR y en cada push a `main`:

1. Formato, lint, build y tests.
2. Construye las imágenes Docker, las levanta con `docker compose` y comprueba con `curl` que la web
   y `/api/health` responden a través de nginx (con caché, gzip y cabeceras de seguridad).

## Despliegue

A mano en el servidor, como gestion-hogar:

```bash
git pull && docker compose up -d --build
```

Solo se publica el puerto 8080 (nginx). Guía completa, incluido Cloudflare Tunnel, en
[infra/DESPLIEGUE.md](infra/DESPLIEGUE.md).
