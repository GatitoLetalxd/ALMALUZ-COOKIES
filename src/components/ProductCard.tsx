"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart, type Product, type Pack } from "@/store/CartContext";
import { formatPrice } from "@/lib/whatsapp";

function Stepper({
  productId,
  pack,
  qty,
}: {
  productId: string;
  pack: Pack;
  qty: number;
}) {
  const { increment, decrement } = useCart();
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-pergamino bg-crema px-2 py-1"
      aria-label={`Cantidad de ${pack.name}`}
    >
      <button
        type="button"
        onClick={() => decrement(productId, pack.id)}
        aria-label={`Quitar un ${pack.name}`}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-tarjeta text-lg font-semibold text-cacao hover:border hover:border-caramelo transition-colors"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-semibold text-cacao" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => increment(productId, pack.id)}
        aria-label={`Agregar un ${pack.name}`}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-cacao text-lg font-semibold text-crema hover:bg-cacao-claro transition-colors"
      >
        +
      </button>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { qtyOf, add } = useCart();
  const [selectedPackId, setSelectedPackId] = useState<string>("5");

  const currentPack =
    product.packs.find((p) => p.id === selectedPackId) ?? product.packs[0];
  const qty = qtyOf(product.id, currentPack.id);
  const isVelvet = product.id === "red-velvet";
  const unitPricePerCookie = currentPack.price / currentPack.count;

  return (
    <article
      className="card-pergamino flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md"
      aria-label={`${product.name}, ${currentPack.name} por ${formatPrice(currentPack.price)}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-crema">
        {isVelvet && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-velvet px-3 py-1 text-xs font-medium text-crema shadow-sm">
            La favorita para regalar
          </span>
        )}
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-1">
          <h3 className="font-marca text-lg font-semibold text-cacao">
            {product.name}
          </h3>
          <span className="text-xs text-cacao-claro">
            Base: {formatPrice(product.baseUnitPrice)}/u
          </span>
        </div>
        <p className="mt-0.5 text-xs text-cacao-claro line-clamp-2">
          {product.description}
        </p>

        {/* Selector de Presentaciones (Packs) */}
        <div className="mt-3">
          <label className="sr-only">Seleccionar presentación de {product.name}</label>
          <div
            role="group"
            aria-label="Presentaciones disponibles"
            className="grid grid-cols-4 gap-1 rounded-xl border border-pergamino bg-crema/60 p-1"
          >
            {product.packs.map((pk) => {
              const isSelected = pk.id === currentPack.id;
              return (
                <button
                  key={pk.id}
                  type="button"
                  onClick={() => setSelectedPackId(pk.id)}
                  aria-pressed={isSelected}
                  className={`rounded-lg py-1.5 text-center text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-cacao text-crema shadow-xs"
                      : "text-cacao hover:bg-tarjeta hover:text-cacao"
                  }`}
                  title={`${pk.name} (${pk.count} galletas)`}
                >
                  x{pk.count}
                </button>
              );
            })}
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[11px] text-cacao-claro">
            <span>
              {currentPack.name} ({currentPack.count} galletas)
            </span>
            <span>{formatPrice(unitPricePerCookie)} c/u</span>
          </div>
        </div>

        {/* Precio y Acción */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-pergamino/60">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-marca text-lg font-bold text-cacao">
                {formatPrice(currentPack.price)}
              </span>
              {currentPack.badge && (
                <span className="rounded-full bg-caramelo/20 border border-caramelo/40 px-1.5 py-0.5 text-[10px] font-semibold text-cacao">
                  {currentPack.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] text-cacao-claro">
              Presentación activa
            </span>
          </div>

          {qty === 0 ? (
            <button
              type="button"
              onClick={() => add(product.id, currentPack.id)}
              aria-label={`Agregar ${currentPack.name} de ${product.name} al pedido`}
              className="flex h-10 items-center justify-center gap-1 rounded-full bg-caramelo px-3 text-sm font-semibold text-cacao hover:bg-caramelo-oscuro hover:text-crema transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              <span className="text-xs">Agregar</span>
            </button>
          ) : (
            <Stepper
              productId={product.id}
              pack={currentPack}
              qty={qty}
            />
          )}
        </div>
      </div>
    </article>
  );
}
