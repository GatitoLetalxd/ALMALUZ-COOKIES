"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import productsData from "@/data/products.json";
import {
  defaultBalancedMix,
  type Mix,
  type SurtidaSize,
  getSurtidaPack,
} from "@/lib/cajaSurtida";

export type Pack = {
  id: string;
  name: string;
  count: number;
  price: number;
  badge?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  baseUnitPrice: number;
  price: number;
  unit: string;
  image: string;
  alt: string;
  packs: Pack[];
};

export type CartLine = {
  key: string;
  productId: string;
  packId: string;
  name: string;
  packName: string;
  packCount: number;
  unitPrice: number;
  image: string;
  alt: string;
  qty: number;
  subtotal: number;
};

export type BoxLine = {
  key: string;
  size: SurtidaSize;
  name: string;
  price: number;
  mix: Mix;
  isCustom: boolean;
};

type CartContextValue = {
  lines: CartLine[];
  boxes: BoxLine[];
  count: number;
  total: number;
  qtyOf: (productId: string, packId?: string) => number;
  add: (productId: string, packId?: string) => void;
  increment: (productId: string, packId?: string) => void;
  decrement: (productId: string, packId?: string) => void;
  addBox: (size: SurtidaSize, customMix?: Mix) => void;
  removeBox: (key: string) => void;
  clear: () => void;
};

const products = productsData as Product[];

const CartContext = createContext<CartContextValue | null>(null);

// Clave compuesta para almacenar en memoria: `${productId}:${packId}`
function getCompositeKey(productId: string, packId = "5"): string {
  return `${productId}:${packId}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [boxes, setBoxes] = useState<BoxLine[]>([]);

  const add = useCallback((productId: string, packId = "5") => {
    const key = getCompositeKey(productId, packId);
    setItems((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
  }, []);

  const increment = useCallback((productId: string, packId = "5") => {
    const key = getCompositeKey(productId, packId);
    setItems((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
  }, []);

  const decrement = useCallback((productId: string, packId = "5") => {
    const key = getCompositeKey(productId, packId);
    setItems((prev) => {
      const next = { ...prev };
      const currentQty = (next[key] ?? 0) - 1;
      if (currentQty <= 0) {
        delete next[key];
      } else {
        next[key] = currentQty;
      }
      return next;
    });
  }, []);

  const addBox = useCallback((size: SurtidaSize, customMix?: Mix) => {
    const key = `box-surtida-${size}-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const packInfo = getSurtidaPack(size);
    const mix = customMix ? { ...customMix } : defaultBalancedMix(size);
    setBoxes((prev) => [
      ...prev,
      {
        key,
        size,
        name: `Caja Surtida x${size}`,
        price: packInfo.price,
        mix,
        isCustom: !!customMix,
      },
    ]);
  }, []);

  const removeBox = useCallback((key: string) => {
    setBoxes((prev) => prev.filter((b) => b.key !== key));
  }, []);

  const clear = useCallback(() => {
    setItems({});
    setBoxes([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = [];

    for (const [key, qty] of Object.entries(items)) {
      if (qty <= 0) continue;
      const [prodId, packId] = key.split(":");
      const product = products.find((p) => p.id === prodId);
      if (!product) continue;
      const pack = product.packs.find((pk) => pk.id === packId) ?? product.packs[0];
      const unitPrice = pack.price;
      lines.push({
        key,
        productId: prodId,
        packId: pack.id,
        name: product.name,
        packName: pack.name,
        packCount: pack.count,
        unitPrice,
        image: product.image,
        alt: product.alt,
        qty,
        subtotal: qty * unitPrice,
      });
    }

    const boxCount = boxes.length;
    const count = lines.reduce((acc, l) => acc + l.qty, 0) + boxCount;
    const total =
      lines.reduce((acc, l) => acc + l.subtotal, 0) +
      boxes.reduce((acc, b) => acc + b.price, 0);

    const qtyOf = (productId: string, packId = "5") => {
      const key = getCompositeKey(productId, packId);
      return items[key] ?? 0;
    };

    return {
      lines,
      boxes,
      count,
      total,
      qtyOf,
      add,
      increment,
      decrement,
      addBox,
      removeBox,
      clear,
    };
  }, [items, boxes, add, increment, decrement, addBox, removeBox, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

export function getProducts(): Product[] {
  return products;
}

export function getProductName(id: string): string {
  return products.find((p) => p.id === id)?.name ?? id;
}
