"use client";

import Image from "next/image";
import { useCart, type Product } from "@/store/CartContext";
import { formatPrice } from "@/lib/whatsapp";

function Stepper({ id, qty }: { id: string; qty: number }) {
  const { increment, decrement } = useCart();
  return (
    <div
      className="flex items-center gap-3 rounded-full border border-pergamino bg-crema px-2 py-1"
      aria-label="Cantidad de cajas"
    >
      <button
        type="button"
        onClick={() => decrement(id)}
        aria-label="Quitar una caja"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-tarjeta text-lg font-semibold text-cacao hover:border hover:border-caramelo"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => increment(id)}
        aria-label="Agregar una caja"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-cacao text-lg font-semibold text-crema hover:bg-cacao-claro"
      >
        +
      </button>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { qtyOf, add } = useCart();
  const qty = qtyOf(product.id);
  const isVelvet = product.id === "red-velvet";

  return (
    <article
      className="card-pergamino flex flex-col overflow-hidden"
      aria-label={`${product.name}, ${formatPrice(product.price)} por caja`}
    >
      {isVelvet && (
        <span className="bg-velvet px-4 pt-2 text-xs font-medium text-crema">
          La favorita para regalar
        </span>
      )}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-crema">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-marca text-lg font-semibold text-cacao">
          {product.name}
        </h3>
        <p className="text-sm text-cacao-claro">{product.description}</p>
        <p className="mt-1 text-xs text-cacao-claro">{product.unit}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-base font-semibold text-cacao">
            {formatPrice(product.price)}
          </span>
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => add(product.id)}
              aria-label={`Agregar una caja de ${product.name} al pedido`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-caramelo text-xl font-semibold text-cacao hover:bg-caramelo-oscuro hover:text-crema"
            >
              +
            </button>
          ) : (
            <Stepper id={product.id} qty={qty} />
          )}
        </div>
      </div>
    </article>
  );
}
