# ALMALUZ Cookies — Mini bites artesanales

Landing + catálogo + pedido por WhatsApp. Next.js (App Router) + Tailwind v4.
Sin backend, sin base de datos, sin pasarela: el pedido se arma en el cliente
y se envía a `wa.me` con el resumen codificado.

## Desarrollo local

```bash
npm install
npm run dev
# abre http://localhost:3000
```

## Editar contenido

- Sabores y precios: `src/data/products.json`
- Caja de 20: reparto en `src/components/BoxMixer.tsx`, precio proporcional
  en `src/lib/caja20.ts` (cada galleta = 1/5 de su caja de 5)
- Número de WhatsApp (un solo lugar): `.env.local`
  ```
  NEXT_PUBLIC_WHATSAPP_NUMBER=51946312572
  ```
- Fotos optimizadas: `public/images/` (`clasica.jpg`, `red-velvet.jpg`,
  `oreo.jpg`, `caramelo.jpg`, `hero-cocina.jpg`, `bandeja-surtida.jpg`,
  `momento-en-casa.jpg`). Para cambiar una foto, reemplázala manteniendo el
  nombre y Next.js la reoptimiza sola.
- Cursores galleta: `public/cursors/cookie.svg` y `cookie-pointer.svg`.

## Producción en VPS (Contabo, Ubuntu 24.04) — Despliegue Estático Nginx

ALMALUZ Cookies está desplegado como un **sitio 100% estático servido directamente por Nginx** desde `/var/www/almaluz`. No requiere procesos Node.js ni PM2 en segundo plano, liberando memoria RAM en el servidor y ofreciendo la máxima velocidad de respuesta.

### Despliegue con un solo comando

Cada vez que edites precios, sabores o contenidos:

```bash
npm run deploy
```

Este comando realiza automáticamente:
1. `next build` (generación estática en `out/`).
2. Sincronización limpia hacia `/var/www/almaluz/`.
3. Ajuste de permisos para `www-data:www-data`.

### Configuración de Nginx — `/etc/nginx/sites-available/almaluz.moondev.online`

El archivo de configuración se encuentra en `almaluz.nginx.conf` y en el sistema en `/etc/nginx/sites-available/almaluz.moondev.online`:

```nginx
server {
    server_name almaluz.moondev.online;

    root /var/www/almaluz;
    index index.html;

    # Compresión Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml font/woff2;

    # Routing SPA / Estático
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    # Caché inmutable para imágenes y assets estáticos (30 días)
    location ~* \.(jpg|jpeg|png|webp|svg|ico|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        access_log off;
    }

    # Caché inmutable para bundles versionados de Next.js (1 año)
    location /_next/static/ {
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/almaluz.moondev.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/almaluz.moondev.online/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    listen [::]:80;
    server_name almaluz.moondev.online;
    return 301 https://$host$request_uri;
}
```

DNS en Hostinger: registro `A` con host `almaluz` apuntando a la IP del VPS.

## Notas

- El carrito vive solo en memoria (sin localStorage, por requisito).
- Lógica comentada en `src/store/CartContext.tsx` y `src/lib/whatsapp.ts`.
- Los JPG originales de ~2 MB que están en la raíz son solo respaldo;
  el sitio sirve las versiones optimizadas (~90–175 KB) de `public/images/`
  y se pueden archivar fuera del repo.
