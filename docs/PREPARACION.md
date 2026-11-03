# Preparación antes de empezar

Marca cada punto con `[x]` cuando esté hecho. Claude: antes de la fase 0, revisa este archivo
y avisa de lo que falte para la tarea que vayas a hacer.

## 1. Herramientas en el PC
- [x] Git configurado con la cuenta SrArkaitz → `git --version`, `git config user.name`
- [x] Node 24 LTS con fnm → `node -v` (falta activar fnm en el perfil de la terminal; ver README)
- [x] VS Code con la extensión de Claude Code (y Angular Language Service)
- [x] Repo clonado → `git clone https://github.com/SrArkaitz/kaitzlab`

Sin CLIs globales de Angular ni Nest (se usan con `npx`) y sin Docker en el PC: las imágenes se prueban en el CI y se construyen en el servidor.

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
