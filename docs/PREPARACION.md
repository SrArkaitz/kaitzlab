# Preparación antes de empezar

Marca cada punto con `[x]` cuando esté hecho. Claude: antes de la fase 0, revisa este archivo
y avisa de lo que falte para la tarea que vayas a hacer.

## 1. Herramientas en el PC
- [x] Git configurado con la cuenta SrArkaitz → `git --version`, `git config user.name`
- [ ] Node 24 LTS → `node -v` (ahora hay v22.17.0, que el Angular CLI actual ya no acepta)
- [ ] Docker Desktop instalado y arrancado → `docker version` (hace falta desde los `Dockerfile`)
- [x] VS Code con la extensión de Claude Code (y Angular Language Service)
- [x] Repo clonado → `git clone https://github.com/SrArkaitz/kaitzlab`

Sin CLIs globales de Angular ni Nest: se usan con `npx` y como dependencias de cada proyecto.

## 2. GitHub
- [x] Repo `SrArkaitz/kaitzlab` creado (hecho)

## 3. Servidor y Cloudflare (lo hace Arkaitz)
- [ ] Revisar qué registros DNS tienen ahora `kaitzlab.com` (raíz) y `www`
- [ ] portainer y amule detrás de Cloudflare Access (o fuera del túnel)
- [ ] Repo clonado en el servidor, p. ej. `~/kaitzlab` (al final de la fase 0)
- [ ] (Fase 3) Carpeta de datos para PostgreSQL en `/mnt/almacen-rocket/kaitzlab/`

## 4. Contenido (para la fase 1)
- [ ] Bio corta (2–3 frases)
- [ ] Experiencia: fechas y 2–3 líneas de cada puesto (Plexus, Hiberus, Tesicnor, Isringhausen)
- [ ] Stack: lo que usas y lo que estás aprendiendo
- [ ] Proyectos: descripción corta + capturas (homelab-monitor, gestion-hogar, servidor, kaitzlab)
- [ ] CV en PDF actualizado
- [ ] Foto (opcional)
- [ ] 2–3 webs de referencia de estilo, además de guillermodean.com
- [ ] Email de contacto que quieres mostrar

## 5. Decisiones
- [x] Front: prerender + nginx (SSR con Node se valora en la fase 3)
- [x] Despliegue en el servidor: a mano como en gestion-hogar (`git pull && docker compose up -d --build`)
- [x] Dos contenedores (nginx + API), npm workspaces, últimas versiones con Node 24 LTS
- [x] Idioma inicial: solo español (inglés en la fase 5)
