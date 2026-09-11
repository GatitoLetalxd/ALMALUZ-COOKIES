import productsData from "@/data/products.json";

// Caja surtida de 20 galletas con sabores a elección.
// Precio proporcional: cada galleta cuesta 1/5 de su caja de 5.

export const BOX20_SIZE = 20;
export const COOKIES_PER_BOX = 5;

export type Mix = Record<string, number>;

export function cookieCents(productId: string): number {
  const found = (productsData as { id: string; price: number }[]).find(
    (p) => p.id === productId,
  );
  if (!found) return 0;
  return Math.round(found.price * 100) / COOKIES_PER_BOX;
}

// Precio en céntimos para evitar errores de coma flotante (0.4, 0.6...).
export function box20PriceCents(mix: Mix): number {
  return Object.entries(mix).reduce(
    (acc, [id, qty]) => acc + qty * cookieCents(id),
    0,
  );
}

export function box20Price(mix: Mix): number {
  return box20PriceCents(mix) / 100;
}

export function mixCount(mix: Mix): number {
  return Object.values(mix).reduce((acc, q) => acc + q, 0);
}

export function emptyMix(): Mix {
  const mix: Mix = {};
  for (const p of productsData as { id: string }[]) mix[p.id] = 0;
  return mix;
}
