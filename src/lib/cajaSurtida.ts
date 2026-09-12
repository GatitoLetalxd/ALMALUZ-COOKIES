import productsData from "@/data/products.json";

// Caja Surtida (Combinación de los 4 Sabores)
// Precios fijos por tamaño de caja:
// - Pack x25 (Mixto): S/ 13.50
// - Pack x50 (Mixto): S/ 26.00
// - Pack x100 (Mixto): S/ 48.00

export type SurtidaSize = 25 | 50 | 100;

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
    size: 25,
    name: "Pack x25 (Mixto)",
    tag: "Caja pequeña",
    price: 13.50,
    description: "Caja pequeña con los 4 sabores surtidos",
  },
  {
    size: 50,
    name: "Pack x50 (Mixto)",
    tag: "Caja mediana",
    price: 26.00,
    description: "Caja mediana con los 4 sabores surtidos",
    badge: "Popular",
  },
  {
    size: 100,
    name: "Pack x100 (Mixto)",
    tag: "Caja evento",
    price: 48.00,
    description: "Caja evento con los 4 sabores surtidos",
    badge: "Mayor Ahorro",
  },
];

export type Mix = Record<string, number>;

export function getSurtidaPack(size: SurtidaSize): SurtidaPack {
  return SURTIDA_PACKS.find((p) => p.size === size) ?? SURTIDA_PACKS[0];
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

// Reparto balanceado por defecto para compra rápida directa
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
