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

## Producción en VPS (Contabo, Ubuntu 24.04)

> **Nota de puertos en este VPS:** Los puertos 3000 al 3005 ya están en uso por otros proyectos (`continental`, `lunielanime`, `moonpanel`, `moonpelis`, `moonfit`, `daniy-luz`). Por ello, ALMALUZ corre en el puerto **3006**.

```bash
npm install
npm run build
# Opción A (usando el archivo ecosystem):
pm2 start ecosystem.config.cjs
# Opción B (directo con npm):
# pm2 start npm --name "almaluz" -- start -- -p 3006

pm2 save
pm2 startup   # y ejecuta el comando que te indique si no está configurado
```

La app queda en `http://127.0.0.1:3006`.

### Nginx (reverse proxy) — `/etc/nginx/sites-available/almaluz.moondev.online`

El archivo de configuración ya se encuentra listo en `almaluz.nginx.conf` y en `/etc/nginx/sites-available/almaluz.moondev.online`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name almaluz.moondev.online;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml font/woff2;

    location / {
        proxy_pass http://127.0.0.1:3006;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Para activarlo y emitir el certificado SSL:

```bash
sudo ln -sf /etc/nginx/sites-available/almaluz.moondev.online /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d almaluz.moondev.online
```

DNS en Hostinger: registro `A` con host `almaluz` apuntando a la IP del VPS.

## Notas

- El carrito vive solo en memoria (sin localStorage, por requisito).
- Lógica comentada en `src/store/CartContext.tsx` y `src/lib/whatsapp.ts`.
- Los JPG originales de ~2 MB que están en la raíz son solo respaldo;
  el sitio sirve las versiones optimizadas (~90–175 KB) de `public/images/`
  y se pueden archivar fuera del repo.
