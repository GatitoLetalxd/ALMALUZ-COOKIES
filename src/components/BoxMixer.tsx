"use client";

import { useState } from "react";
import Image from "next/image";
import {
  getProducts,
  useCart,
  type Product,
} from "@/store/CartContext";
import {
  BOX20_SIZE,
  box20Price,
  cookieCents,
  emptyMix,
  mixCount,
} from "@/lib/caja20";
import { formatPrice } from "@/lib/whatsapp";

function MixStepper({
  product,
  qty,
  total,
  onChange,
}: {
  product: Product;
  qty: number;
  total: number;
  onChange: (qty: number) => void;
}) {
  const lleno = total >= BOX20_SIZE;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-pergamino bg-tarjeta p-2">
      <Image
        src={product.image}
        alt=""
        aria-hidden="true"
        width={56}
        height={56}
        loading="lazy"
        className="h-14 w-14 rounded-xl border border-pergamino object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold text-cacao">{product.name}</p>
        <p className="text-xs text-cacao-claro">
          {formatPrice(cookieCents(product.id) / 100)} cada una
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, qty - 1))}
          disabled={qty === 0}
          aria-label={`Quitar una galleta de ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-pergamino text-lg text-cacao hover:border-caramelo disabled:opacity-30"
        >
          −
        </button>
        <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => onChange(qty + 1)}
          disabled={lleno}
          aria-label={`Agregar una galleta de ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-cacao text-lg text-crema hover:bg-cacao-claro disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function BoxMixer({ onAdded }: { onAdded?: () => void }) {
  const products = getProducts();
  const { addBox } = useCart();
  const [mix, setMix] = useState(emptyMix);

  const total = mixCount(mix);
  const faltan = BOX20_SIZE - total;
  const completa = total === BOX20_SIZE;
  const precio = box20Price(mix);

  const setQty = (id: string, qty: number) =>
    setMix((prev) => ({ ...prev, [id]: qty }));

  const agregar = () => {
    if (!completa) return;
    addBox(mix);
    setMix(emptyMix());
    onAdded?.();
  };

  return (
    <section
      id="caja-20"
      aria-labelledby="caja20-titulo"
      className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10"
    >
      <h2 id="caja20-titulo" className="font-marca text-2xl font-semibold text-cacao">
        Arma tu caja de 20
      </h2>
      <p className="mt-1 text-sm text-cacao-claro">
        Reparte 20 galletas entre tus sabores favoritos. Ideal para compartir o
        para envíos fuera de Chiclayo.
      </p>

      <div className="card-pergamino mt-5 p-4 md:p-6">
        <div className="grid gap-3 md:grid-cols-2">
          {products.map((p) => (
            <MixStepper
              key={p.id}
              product={p}
              qty={mix[p.id] ?? 0}
              total={total}
              onChange={(q) => setQty(p.id, q)}
            />
          ))}
        </div>

        <div className="mt-5">
          <div
            className="h-2.5 overflow-hidden rounded-full bg-pergamino"
            role="progressbar"
            aria-valuenow={total}
            aria-valuemin={0}
            aria-valuemax={BOX20_SIZE}
            aria-label={`Llevas ${total} de ${BOX20_SIZE} galletas`}
          >
            <div
              className="h-full rounded-full bg-caramelo"
              style={{ width: `${(total / BOX20_SIZE) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-cacao-claro" aria-live="polite">
              {completa
                ? "Caja completa, lista para agregar."
                : faltan > 0
                  ? faltan === 1
                    ? "Te falta 1 galleta."
                    : `Te faltan ${faltan} galletas.`
                  : `Te pasaste por ${-faltan}.`}
            </p>
            <p className="font-marca text-xl font-semibold text-cacao">
              {formatPrice(precio)}
            </p>
          </div>
          <button
            type="button"
            onClick={agregar}
            disabled={!completa}
            className="mt-3 w-full rounded-full bg-cacao px-6 py-3.5 text-sm font-semibold text-crema hover:bg-cacao-claro disabled:cursor-not-allowed disabled:opacity-40"
          >
            Agregar caja de 20 al pedido
          </button>
        </div>
      </div>
    </section>
  );
}
