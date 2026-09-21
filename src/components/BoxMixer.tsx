"use client";

import { useState } from "react";
import Image from "next/image";
import {
  getProducts,
  useCart,
  type Product,
} from "@/store/CartContext";
import {
  SURTIDA_PACKS,
  type SurtidaSize,
  type Mix,
  emptyMix,
  mixCount,
  defaultBalancedMix,
  getSurtidaPack,
} from "@/lib/cajaSurtida";
import { formatPrice } from "@/lib/whatsapp";

function MixStepper({
  product,
  qty,
  targetSize,
  currentTotal,
  onChange,
}: {
  product: Product;
  qty: number;
  targetSize: number;
  currentTotal: number;
  onChange: (qty: number) => void;
}) {
  const isFull = currentTotal >= targetSize;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-pergamino bg-tarjeta p-2.5 transition-all">
      <Image
        src={product.image}
        alt=""
        aria-hidden="true"
        width={56}
        height={56}
        loading="lazy"
        className="h-14 w-14 rounded-xl border border-pergamino object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-cacao truncate">{product.name}</p>
        <p className="text-xs text-cacao-claro truncate">{product.description}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, qty - 1))}
          disabled={qty === 0}
          aria-label={`Quitar una galleta de ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-pergamino text-lg text-cacao hover:border-caramelo disabled:opacity-30 transition-colors"
        >
          −
        </button>
        <span className="min-w-6 text-center text-sm font-semibold text-cacao" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => onChange(qty + 1)}
          disabled={isFull}
          aria-label={`Agregar una galleta de ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-cacao text-lg text-crema hover:bg-cacao-claro disabled:opacity-30 transition-colors"
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
  const [selectedSize, setSelectedSize] = useState<SurtidaSize>(25);
  const [customMix, setCustomMix] = useState<Mix>(emptyMix);
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);

  const pack = getSurtidaPack(selectedSize);
  const totalCustom = mixCount(customMix);
  const isComplete = totalCustom === selectedSize;
  const remaining = selectedSize - totalCustom;

  const setQty = (id: string, qty: number) => {
    setCustomMix((prev) => ({ ...prev, [id]: qty }));
  };

  const handleSelectSize = (size: SurtidaSize) => {
    setSelectedSize(size);
    // Reiniciar mix al cambiar de tamaño para evitar desbordamiento
    if (mixCount(customMix) > size) {
      setCustomMix(emptyMix());
    }
  };

  // Compra rápida directa del surtido equilibrado de la casa
  const agregarDirecto = () => {
    addBox(selectedSize);
    onAdded?.();
  };

  // Agregar la mezcla personalizada del cliente
  const agregarPersonalizado = () => {
    if (!isComplete) return;
    addBox(selectedSize, customMix);
    setCustomMix(emptyMix());
    setIsCustomizing(false);
    onAdded?.();
  };

  const repartirEquitativo = () => {
    setCustomMix(defaultBalancedMix(selectedSize));
  };

  return (
    <section
      id="caja-surtida"
      aria-labelledby="cajasurtida-titulo"
      className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10"
    >
      <div id="caja-20" className="hidden" aria-hidden="true" />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-caramelo/20 border border-caramelo/30 px-3 py-1 text-xs font-semibold text-cacao">
            Combinación de los 5 Sabores
          </span>
          <h2 id="cajasurtida-titulo" className="font-marca mt-2 text-2xl font-semibold text-cacao md:text-3xl">
            Caja Surtida
          </h2>
          <p className="mt-1 text-sm text-cacao-claro max-w-xl">
            Disfruta de Clásica, Limón, Caramelo, Red Velvet y Oreo en una sola caja. Elige tu tamaño favorito o personaliza la cantidad exacta de cada sabor.
          </p>
        </div>

        {/* Selector de Tamaño de Caja Surtida */}
        <div className="flex flex-wrap sm:flex-nowrap rounded-2xl border border-pergamino bg-crema/80 p-1 gap-1">
          {SURTIDA_PACKS.map((pk) => {
            const isSelected = pk.size === selectedSize;
            return (
              <button
                key={pk.size}
                type="button"
                onClick={() => handleSelectSize(pk.size)}
                className={`flex flex-col items-center px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-cacao text-crema shadow-xs"
                    : "text-cacao hover:bg-tarjeta"
                }`}
              >
                <span>x{pk.size}</span>
                <span className="text-[10px] opacity-90">{formatPrice(pk.price)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card-pergamino mt-6 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pergamino/80 pb-4">
          <div>
            <h3 className="font-marca text-xl font-bold text-cacao">
              {pack.name} — {pack.tag}
            </h3>
            <p className="text-xs text-cacao-claro">
              {pack.description} · {formatPrice(pack.price / pack.size)} c/u
            </p>
          </div>
          <div className="flex items-center gap-2">
            {pack.badge && (
              <span className="rounded-full bg-caramelo px-2.5 py-0.5 text-xs font-semibold text-cacao">
                {pack.badge}
              </span>
            )}
            <span className="font-marca text-2xl font-bold text-cacao">
              {formatPrice(pack.price)}
            </span>
          </div>
        </div>

        {/* Modalidad de selección */}
        {!isCustomizing ? (
          <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
            <figure className="relative h-44 w-full md:w-56 flex-shrink-0 overflow-hidden rounded-2xl border border-pergamino">
              <Image
                src="/images/bandeja-surtida.jpg"
                alt="Caja surtida con los 5 sabores de mini galletas"
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                className="object-cover"
              />
            </figure>
            <div className="flex-1 space-y-3">
              <h4 className="font-marca text-base font-semibold text-cacao">
                Mix balanceado de la casa
              </h4>
              <p className="text-sm leading-relaxed text-cacao-claro">
                La opción más rápida y elegida: incluye un reparto equilibrado de <strong>Clásica, Limón, Caramelo, Red Velvet y Oreo</strong> recién horneadas y listas para compartir.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={agregarDirecto}
                  className="rounded-full bg-cacao px-6 py-3 text-sm font-semibold text-crema hover:bg-cacao-claro transition-colors shadow-sm"
                >
                  Agregar {pack.name} ({formatPrice(pack.price)})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    repartirEquitativo();
                    setIsCustomizing(true);
                  }}
                  className="rounded-full border border-caramelo-oscuro bg-tarjeta px-5 py-3 text-sm font-semibold text-cacao hover:bg-crema transition-colors"
                >
                  Personalizar sabores a mi gusto
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-cacao font-medium">
                Reparte las {selectedSize} galletas entre tus sabores favoritos:
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={repartirEquitativo}
                  className="text-xs font-semibold text-caramelo-oscuro hover:underline"
                >
                  Equitativo
                </button>
                <span className="text-pergamino">·</span>
                <button
                  type="button"
                  onClick={() => setCustomMix(emptyMix())}
                  className="text-xs font-semibold text-cacao-claro hover:underline"
                >
                  Limpiar
                </button>
                <span className="text-pergamino">·</span>
                <button
                  type="button"
                  onClick={() => setIsCustomizing(false)}
                  className="text-xs font-semibold text-cacao-claro hover:underline"
                >
                  Volver al mix estándar
                </button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {products.map((p) => (
                <MixStepper
                  key={p.id}
                  product={p}
                  qty={customMix[p.id] ?? 0}
                  targetSize={selectedSize}
                  currentTotal={totalCustom}
                  onChange={(q) => setQty(p.id, q)}
                />
              ))}
            </div>

            <div className="pt-2">
              <div
                className="h-2.5 overflow-hidden rounded-full bg-pergamino"
                role="progressbar"
                aria-valuenow={totalCustom}
                aria-valuemin={0}
                aria-valuemax={selectedSize}
                aria-label={`Llevas ${totalCustom} de ${selectedSize} galletas`}
              >
                <div
                  className="h-full rounded-full bg-caramelo transition-all duration-200"
                  style={{ width: `${Math.min(100, (totalCustom / selectedSize) * 100)}%` }}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-cacao-claro" aria-live="polite">
                  {isComplete
                    ? "¡Caja completa y lista para ordenar!"
                    : remaining > 0
                      ? remaining === 1
                        ? "Te falta 1 galleta para completar la caja."
                        : `Te faltan ${remaining} galletas para completar la caja.`
                      : `Te pasaste por ${-remaining} galletas.`}
                </p>
                <p className="font-marca text-xl font-bold text-cacao">
                  {formatPrice(pack.price)}
                </p>
              </div>

              <button
                type="button"
                onClick={agregarPersonalizado}
                disabled={!isComplete}
                className="mt-3 w-full rounded-full bg-cacao px-6 py-3.5 text-sm font-semibold text-crema hover:bg-cacao-claro disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
              >
                Agregar {pack.name} personalizada al pedido ({formatPrice(pack.price)})
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
