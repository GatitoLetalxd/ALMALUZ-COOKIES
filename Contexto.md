1. Contexto del proyecto

Estoy construyendo la web de ALMALUZ Cookies, un negocio casero de mini galletas artesanales en Perú (sabores: Clásica, Red Velvet, Oreo, Caramelo, vendidas en cajas de 5 unidades). El objetivo principal de la web es publicitar el producto de forma visual y atractiva, y permitir que el cliente arme su pedido y lo envíe por WhatsApp para coordinar el pago manualmente por Yape/Plin (no hay pasarela de pago automática, es un checkout manual vía WhatsApp).


2. Objetivo del agente

Construir un sitio web de una sola página (o pocas secciones) tipo landing/catálogo, mobile-first, con:

Hero de bienvenida con foto/branding de ALMALUZ.
Galería de sabores (catálogo de productos) con imágenes reales de cada galleta.
Carrito lateral/inferior (bottom sheet) con detalle de la caja elegida, cantidades y total.
Botón final que arma un mensaje de WhatsApp con el resumen del pedido y lo abre en wa.me.
Sección breve "Cómo funciona tu pedido" (3 pasos, sin tecnicismos).

No se requiere backend de pagos, base de datos ni panel de administración en esta primera versión — el pedido se cierra manualmente por WhatsApp.

3. Stack técnico
Framework: Next.js (App Router) o Astro — priorizar rendimiento y SEO para google search, ya que el sitio es principalmente publicitario.
Estilos: CSS puro o Tailwind, a elección del agente, pero respetando el sistema de diseño de la sección 5.
Sin dependencias de backend/DB. Los productos pueden vivir en un archivo de datos estático (products.json o similar) para poder editarlos fácilmente después.
Imágenes: usar fotos reales de las galletas (se proporcionarán aparte) en lugar de los íconos ilustrados del mockup — el mockup usa SVGs de placeholder solo para validar el layout.
4. Estructura de datos de producto
json
{
  "id": "clasica",
  "name": "Clásica",
  "description": "Chips de chocolate y masa dorada",
  "price": 2.00,
  "unit": "Caja de 5 unidades",
  "image": "/images/clasica.jpg"
}

Productos iniciales: Clásica (S/ 2.00), Red Velvet (S/ 3.00), Oreo (S/ 3.00), Caramelo (S/ 2.50) — todas cajas de 5 unidades.

5. Sistema de diseño (obligatorio respetar)

Paleta de color:

Cacao (texto principal / marca): 
#4A2A18
Cacao claro (acentos secundarios): 
#6B3F2A
Caramelo (acento / CTA secundario): 
#C88A3D
Caramelo oscuro: 
#A8702A
Crema fondo: 
#FBF3E4
Crema tarjeta: 
#FFFDF8
Línea/borde pergamino: 
#E8D9C0
Rojo velvet (acento puntual solo en tarjeta de ese sabor): 
#7A2331

Tipografía:

Marca y títulos: Fraunces (serif con carácter, pesos 500–600).
Cuerpo, botones, UI: Work Sans (sans-serif, pesos 400–600).

Principios de UI/UX (no negociables):

Interfaz intuitiva y fácil de navegar, mobile-first.
Sin texto invasivo ni tecnicismos de programación en ningún copy visible (nada de "submit", "carrito de compras del sistema", jerga técnica). Todo el copy debe hablarle al cliente como lo haría una persona real.
Nada de mayúsculas sostenidas para etiquetas, ni eyebrows genéricos, ni flechas "→" decorativas en botones.
Las tarjetas de producto no deben ser rectángulos genéricos con esquinas redondeadas idénticas a todo — usar el detalle de "papel pergamino" (esquina superior recta, inferior redondeada) como en el mockup de referencia.
Un solo momento de animación orquestado (ej. entrada del hero), transiciones sutiles solo en el carrito al abrir/cerrar.
6. Flujo del carrito y checkout (ya validado en el mockup)
El usuario agrega cajas desde la galería (botón + que se convierte en stepper de cantidad).
Un indicador flotante inferior (bottom bar) aparece cuando hay ítems en el carrito, mostrando cantidad total y monto.
Al tocar el bottom bar o el ícono de carrito del header, se abre un panel deslizable desde abajo (bottom sheet) con:
Lista de ítems con imagen, nombre, cantidad editable y subtotal.
Total general.
Recordatorio de que al enviar el pedido se debe pagar con el QR de Yape/Plin y enviar el comprobante por WhatsApp.
Botón final "Enviar pedido por WhatsApp".
Al tocar el botón, se genera un mensaje de texto con el detalle del pedido (sabores, cantidades, precios, total) y se abre https://wa.me/<NUMERO>?text=<mensaje codificado> en una nueva pestaña.
El número de WhatsApp del negocio debe estar en una sola constante/variable de entorno fácil de editar (NEXT_PUBLIC_WHATSAPP_NUMBER o similar), no hardcodeado en múltiples lugares.

El mockup de referencia (HTML/CSS/JS) ya implementa esta lógica de carrito en el cliente sin backend — puede usarse como referencia de comportamiento exacto, adaptando el código a componentes del framework elegido.

7. Contenido copy sugerido (editar libremente, manteniendo el tono)
Hero: "Mini bites artesanales, horneados en casa." + "Elige tus sabores, arma tu caja y coordina el pago por Yape o Plin en minutos."
Sección de sabores: "Nuestros sabores" / "Toca el + para agregar una caja a tu pedido"
Cómo funciona: 3 pasos — armar la caja, pagar con el QR, enviar el comprobante por WhatsApp.
Footer: "Pedidos sujetos a disponibilidad del día. Respondemos por WhatsApp en minutos."
8. Requisitos no funcionales
Totalmente responsive, prioridad mobile (viewport ~380–480px), pero debe verse bien también en desktop.
Accesible: foco de teclado visible, contraste adecuado, textos alternativos en imágenes de producto.
Rendimiento: imágenes optimizadas (formato moderno, lazy loading fuera del viewport inicial).
Sin uso de localStorage/sessionStorage si se ejecuta en un entorno con restricciones — mantener el estado del carrito en memoria del framework (state management propio del framework).
9. Despliegue (mi infraestructura actual)

El sitio se desplegará en mi VPS propio siguiendo mi patrón habitual:

VPS Contabo, Ubuntu 24.04, 8GB RAM.
Build de producción del framework elegido (next build / astro build) servido con PM2.
Nginx como reverse proxy hacia el proceso de PM2.
Certbot para el certificado SSL del dominio/subdominio.
DNS gestionado en Hostinger (registro A apuntando al VPS).
Prefiero configurar el servidor manualmente, así que el agente debe entregar:
Instrucciones claras de build y de arranque con PM2 (comando exacto, nombre de proceso sugerido).
Un bloque de configuración Nginx de ejemplo (server block) listo para adaptar al subdominio final.
No asumir Docker ni plataformas gestionadas (Vercel, Netlify, etc.) salvo que se indique lo contrario.
10. Entregables esperados del agente
Proyecto completo del framework elegido, funcional en local (npm run dev).
Archivo de datos de productos editable (products.json o equivalente).
Carpeta /images con placeholders claramente nombrados por sabor, listos para reemplazar por fotos reales.
Constante/variable de entorno para el número de WhatsApp.
Instrucciones de build + PM2 + bloque Nginx de ejemplo, en un README.md dentro del proyecto.
Código limpio y comentado en las partes de lógica de carrito y armado del mensaje de WhatsApp.
11. Fuera de alcance (no implementar en esta versión)
Pasarela de pago automática (Yape/Plin API, Mercado Pago, Culqi, etc.).
Panel de administración o backend con base de datos.
Sistema de cuentas de usuario o login.
Verificación automática de comprobantes de pago.

numero de telefono: +51 946 312 572 / 983126035