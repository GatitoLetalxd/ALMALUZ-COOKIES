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

```bash
npm install
npm run build
pm2 start npm --name "almaluz" -- start -- -p 3001
pm2 save
pm2 startup   # y ejecuta el comando que te indique
```

La app queda en `http://127.0.0.1:3001`.

### Nginx (reverse proxy) — `/etc/nginx/sites-available/almaluz`

```nginx
server {
    listen 80;
    server_name almaluz.moondev.online;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/almaluz /etc/nginx/sites-enabled/
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
