# Preparación antes de empezar

Marca cada punto con `[x]` cuando esté hecho. Claude: antes de la fase 0, revisa este archivo
y avisa de lo que falte para la tarea que vayas a hacer.

## 1. Herramientas en el PC
- [x] Git configurado con la cuenta SrArkaitz → `git --version`, `git config user.name`
- [x] Node LTS → `node -v`
- [x] Angular CLI → `npm i -g @angular/cli` · `ng version`
- [x] Nest CLI → `npm i -g @nestjs/cli` · `nest --version`
- [x] Docker Desktop arrancado → `docker version`
- [x] VS Code con la extensión de Claude Code (y Angular Language Service)
- [ ] Repo clonado → `git clone https://github.com/SrArkaitz/kaitzlab`

## 2. GitHub
- [x] Repo `SrArkaitz/kaitzlab` creado (hecho)
- [ ] Decidir si las imágenes de GHCR serán públicas o privadas
- [ ] Si son privadas: token (classic) con `read:packages` para el servidor

## 3. Servidor y Cloudflare (lo hace Arkaitz)
- [ ] Revisar qué registros DNS tienen ahora `kaitzlab.com` (raíz) y `www`
- [ ] portainer y amule detrás de Cloudflare Access (o fuera del túnel)
- [ ] Carpeta en el servidor para la web, p. ej. `~/kaitzlab`
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
- [ ] Front: prerender + nginx (recomendado hasta la fase 3) o SSR con Node
- [ ] Despliegue en el servidor: manual (`pull && up -d`) o Watchtower
- [x] Idioma inicial: solo español (inglés en la fase 5)
