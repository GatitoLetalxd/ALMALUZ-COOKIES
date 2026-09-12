// Lógica de checkout manual vía WhatsApp (sin backend ni pasarela).
// El número vive en una sola variable de entorno para editarlo fácil.

export type OrderLine = {
  name: string;
  qty: number;
  unitPrice: number;
  // Detalle opcional (ej. presentación o desglose de sabores).
  detail?: string;
};

export function getWhatsAppNumber(): string {
  // NEXT_PUBLIC_WHATSAPP_NUMBER=51946312572 (Perú + número principal)
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51946312572";
  return raw.replace(/\D/g, "");
}

export function formatPrice(n: number): string {
  return `S/ ${n.toFixed(2)}`;
}

// Arma el mensaje ordenado que se envía por WhatsApp.
export function buildOrderMessage(
  lines: OrderLine[],
  total: number,
): string {
  const detalle = lines
    .map((l) => {
      const base = `- ${l.qty}x ${l.name}`;
      const extra = l.detail ? ` [${l.detail}]` : "";
      return `${base}${extra} — ${formatPrice(l.qty * l.unitPrice)}`;
    })
    .join("\n");

  return (
    `Hola ALMALUZ, quiero pedir:\n` +
    `${detalle}\n\n` +
    `Total: ${formatPrice(total)}\n\n` +
    `Nombre:\n` +
    `Ciudad:\n` +
    `Distrito / entrega:`
  );
}

export function buildWhatsAppUrl(message: string): string {
  const numero = getWhatsAppNumber();
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}
