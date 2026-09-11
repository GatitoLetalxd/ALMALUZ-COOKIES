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
import { box20Price, type Mix } from "@/lib/caja20";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  alt: string;
};

export type CartLine = Product & { qty: number };

// Cada caja de 20 guarda su propio reparto de sabores.
export type Box20Line = {
  key: string;
  mix: Mix;
  price: number;
};

type CartContextValue = {
  lines: CartLine[];
  boxes: Box20Line[];
  count: number;
  total: number;
  qtyOf: (id: string) => number;
  add: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  addBox: (mix: Mix) => void;
  removeBox: (key: string) => void;
  clear: () => void;
};

const products = productsData as Product[];

const CartContext = createContext<CartContextValue | null>(null);

// Estado del carrito solo en memoria (sin localStorage por requisito §8).
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [boxes, setBoxes] = useState<Box20Line[]>([]);

  const add = useCallback((id: string) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const increment = useCallback((id: string) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) => {
      const next = { ...prev };
      const qty = (next[id] ?? 0) - 1;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const addBox = useCallback((mix: Mix) => {
    const key = `box20-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    setBoxes((prev) => [...prev, { key, mix: { ...mix }, price: box20Price(mix) }]);
  }, []);

  const removeBox = useCallback((key: string) => {
    setBoxes((prev) => prev.filter((b) => b.key !== key));
  }, []);

  const clear = useCallback(() => {
    setItems({});
    setBoxes([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = products
      .filter((p) => (items[p.id] ?? 0) > 0)
      .map((p) => ({ ...p, qty: items[p.id] }));
    const boxCount = boxes.length;
    const count =
      lines.reduce((acc, l) => acc + l.qty, 0) + boxCount;
    const total =
      lines.reduce((acc, l) => acc + l.qty * l.price, 0) +
      boxes.reduce((acc, b) => acc + b.price, 0);
    const qtyOf = (id: string) => items[id] ?? 0;
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
