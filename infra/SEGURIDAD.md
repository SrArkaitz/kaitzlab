# Seguridad del servidor

Guía para dejar el servidor en buen estado antes de publicar kaitzlab.com. La aplica Arkaitz a mano
en el servidor y en el panel de Cloudflare; desde este repo no se toca nada.

> El repo es público: aquí no van nombres de servicios privados, subdominios de administración
> ni IPs. Esa lista se lleva fuera del repo.

## El problema

Con Cloudflare Tunnel, cualquier hostname que se añada al túnel queda accesible desde internet.
Para la web es lo que se quiere, pero los **paneles de administración** (gestión de contenedores,
descargas, etc.) no deberían estar abiertos a cualquiera aunque tengan su propio login:
un fallo en ese login o una contraseña débil da acceso al servidor entero.

## Opción A: Cloudflare Access delante de los paneles (recomendada)

Cloudflare pide identificarse **antes** de dejar pasar la petición al servidor. El panel sigue en
su subdominio, pero solo entra quien esté en la lista.

1. Cloudflare Zero Trust → *Access* → *Applications* → *Add an application* → *Self-hosted*.
2. *Application domain*: el subdominio del panel. Se crea una aplicación por panel
   (o una con varios dominios).
3. *Session duration*: 24 h o lo que resulte cómodo.
4. *Policy* → *Allow* → regla *Emails* con tu correo (o *Emails ending in* si hay más personas).
5. *Login methods*: **One-time PIN** (llega un código al correo) es suficiente; se puede añadir
   Google o GitHub.
6. Guardar y comprobar en una ventana privada: antes de ver el panel tiene que salir la pantalla
   de Cloudflare pidiendo el correo.

Ventajas: no hay que instalar nada en los dispositivos y se puede entrar desde cualquier sitio.
El plan gratuito de Zero Trust cubre hasta 50 usuarios.

## Opción B: sacar los paneles del túnel y entrar por VPN (Tailscale)

Los paneles dejan de tener hostname público y solo se llega a ellos desde dentro de la red privada.

1. Instalar Tailscale en el servidor (`curl -fsSL https://tailscale.com/install.sh | sh`
   y `sudo tailscale up`) y en los dispositivos desde los que se administra.
2. En Cloudflare Zero Trust → *Tunnels* → *Public Hostname*, **borrar** los hostnames de los paneles.
3. Borrar también sus registros DNS si no se han borrado solos.
4. Entrar a los paneles por la IP o el nombre de Tailscale del servidor y su puerto.

Ventajas: los paneles no existen para internet. Inconveniente: hay que tener Tailscale en cada
dispositivo.

## Comprobaciones finales

- [ ] Desde fuera de casa (móvil sin wifi), cada panel de administración pide Cloudflare Access
      o directamente no carga.
- [ ] `https://kaitzlab.com` carga sin pedir nada.
- [ ] En Zero Trust → *Tunnels*, revisar la lista de hostnames públicos: solo los que deben
      ser públicos.
- [ ] Los puertos de los paneles no están abiertos en el router (con el túnel no hace falta abrir
      ninguno).
