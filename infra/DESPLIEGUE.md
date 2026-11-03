# Despliegue en el servidor

La web se despliega igual que gestion-hogar: el servidor tiene una copia del repo y construye
las imágenes él mismo con Docker Compose. No hay registro de imágenes ni despliegue automático.

```
git push (PC)  →  git pull && docker compose up -d --build (servidor)  →  kaitzlab.com
```

## Cómo queda montado

| Servicio | Contenedor | Puerto | Qué hace |
|---|---|---|---|
| `web` | `kaitzlab-web` | **8080** en el host → 80 en el contenedor | nginx: sirve la web prerenderizada y reenvía `/api` a la API |
| `api` | `kaitzlab-api` | ninguno publicado (3000 dentro de la red de Docker) | API NestJS |

Solo se publica el 8080. El túnel de Cloudflare apunta a la web y la web habla con la API por la
red interna de Docker.

## Requisitos en el servidor

- Docker con el plugin de Compose (`docker compose version`).
- Git (`git --version`).
- El túnel de Cloudflare (`cloudflared`) ya funcionando.

## Primera vez

1. Clonar el repo en la carpeta de la web:

   ```bash
   cd ~
   git clone https://github.com/SrArkaitz/kaitzlab.git
   cd kaitzlab
   ```

2. Variables de entorno. De momento no hay ninguna obligatoria: los valores por defecto del
   `docker-compose.yml` sirven. Cuando haga falta alguna (fase 3: base de datos, login…), se pone en
   un archivo `.env` junto al `docker-compose.yml`. Ese archivo **no se sube al repo**.

3. Construir y levantar:

   ```bash
   docker compose up -d --build
   ```

   La primera vez tarda unos minutos porque compila Angular y NestJS.

4. Comprobar que responde:

   ```bash
   docker compose ps                         # los dos contenedores en "running" / "healthy"
   curl http://localhost:8080/               # HTML de la portada
   curl http://localhost:8080/api/health     # {"status":"ok","version":"..."}
   ```

## Actualizar

Después de hacer `git push` desde el PC:

```bash
cd ~/kaitzlab
git pull
docker compose up -d --build
docker image prune -f      # opcional: borra las imágenes antiguas que ya no se usan
```

Compose solo recrea los contenedores cuya imagen ha cambiado.

## Volver a una versión anterior

```bash
git log --oneline          # buscar el commit bueno
git checkout <commit>
docker compose up -d --build
```

Para volver a lo último: `git checkout main && git pull && docker compose up -d --build`.

## Ver qué pasa

```bash
docker compose logs -f web      # peticiones y errores de nginx
docker compose logs -f api      # logs de la API
docker compose restart api      # reiniciar solo la API (la web sigue sirviendo)
```

## Publicar con Cloudflare Tunnel

Se añaden `kaitzlab.com` y `www.kaitzlab.com` al túnel que ya existe.

1. **DNS:** en Cloudflare → *DNS*, revisar si `kaitzlab.com` (raíz) o `www` ya tienen registros.
   Si los tienen, borrarlos: el túnel crea sus propios CNAME y no puede si ya hay otro registro.

2. **Hostnames públicos:** en Cloudflare Zero Trust → *Networks* → *Tunnels* → el túnel →
   *Public Hostname* → *Add a public hostname*:

   | Subdominio | Dominio | Tipo | URL |
   |---|---|---|---|
   | *(vacío)* | `kaitzlab.com` | HTTP | ver abajo |
   | `www` | `kaitzlab.com` | HTTP | la misma |

   La URL depende de cómo llega `cloudflared` a la web:

   - **`cloudflared` en un contenedor en la misma red de Docker** (recomendado): `kaitzlab-web:80`.
     Para eso, `cloudflared` tiene que estar conectado a la red de kaitzlab:
     `docker network connect kaitzlab_default <contenedor-de-cloudflared>`.
   - **`cloudflared` en otra red o fuera de Docker:** el puerto publicado en el host,
     `<host>:8080`.

3. **`www` → raíz (opcional pero recomendable):** Cloudflare → *Rules* → *Redirect Rules* →
   plantilla *Redirect from WWW to root*, para que solo haya una dirección canónica.

4. Comprobar desde fuera de casa (con el móvil sin wifi, por ejemplo) `https://kaitzlab.com` y
   `https://kaitzlab.com/api/health`.

> Esta guía no incluye IPs, nombres de otros servicios ni subdominios de administración del
> servidor: el repo es público.
