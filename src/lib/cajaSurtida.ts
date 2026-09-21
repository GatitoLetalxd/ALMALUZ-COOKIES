import productsData from "@/data/products.json";

// Caja Surtida (Combinación de los 5 Sabores: Clásica, Limón, Caramelo, Red Velvet y Oreo)
// Precios fijos por tamaño de caja:
// - Pack x15 (Mixto): S/ 11.00
// - Pack x20 (Mixto): S/ 14.50
// - Pack x25 (Mixto): S/ 18.00
// - Pack x50 (Mixto): S/ 32.50
// - Pack x100 (Mixto): S/ 62.00

export type SurtidaSize = 15 | 20 | 25 | 50 | 100;

export type SurtidaPack = {
  size: SurtidaSize;
  name: string;
  tag: string;
  price: number;
  description: string;
  badge?: string;
};

export const SURTIDA_PACKS: SurtidaPack[] = [
  {
    size: 15,
    name: "Pack x15 (Mixto)",
    tag: "Bolsa degustación",
    price: 11.00,
    description: "Ideal para probar la combinación de los 5 sabores",
  },
  {
    size: 20,
    name: "Pack x20 (Mixto)",
    tag: "Caja personal",
    price: 14.50,
    description: "Surtido balanceado para compartir o antojo personal",
  },
  {
    size: 25,
    name: "Pack x25 (Mixto)",
    tag: "Caja pequeña",
    price: 18.00,
    description: "Caja pequeña con los 5 sabores surtidos",
    badge: "Más Vendido",
  },
  {
    size: 50,
    name: "Pack x50 (Mixto)",
    tag: "Caja mediana",
    price: 32.50,
    description: "Caja mediana perfecta para compartir y reuniones",
    badge: "Popular",
  },
  {
    size: 100,
    name: "Pack x100 (Mixto)",
    tag: "Caja evento",
    price: 62.00,
    description: "Caja evento con máximo surtido y ahorro garantizado",
    badge: "Mayor Ahorro",
  },
];

export type Mix = Record<string, number>;

export function getSurtidaPack(size: SurtidaSize): SurtidaPack {
  return SURTIDA_PACKS.find((p) => p.size === size) ?? SURTIDA_PACKS[2]; // Default a x25
}

export function surtidaPrice(size: SurtidaSize): number {
  return getSurtidaPack(size).price;
}

export function mixCount(mix: Mix): number {
  return Object.values(mix).reduce((acc, q) => acc + (q || 0), 0);
}

export function emptyMix(): Mix {
  const mix: Mix = {};
  for (const p of productsData as { id: string }[]) {
    mix[p.id] = 0;
  }
  return mix;
}

// Reparto balanceado por defecto para compra rápida directa (5 sabores)
export function defaultBalancedMix(size: SurtidaSize): Mix {
  const keys = (productsData as { id: string }[]).map((p) => p.id);
  const base = Math.floor(size / keys.length);
  const remainder = size % keys.length;
  const mix: Mix = {};
  keys.forEach((key, idx) => {
    mix[key] = base + (idx < remainder ? 1 : 0);
  });
  return mix;
}
