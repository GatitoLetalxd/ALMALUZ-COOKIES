"use client";

import { useCart } from "@/store/CartContext";
import { formatPrice } from "@/lib/whatsapp";

export default function CartBar({ onOpen }: { onOpen: () => void }) {
  const { count, total } = useCart();
  if (count === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ver pedido, ${count} ${count === 1 ? "ítem" : "ítems"} por ${formatPrice(total)}`}
        className="mx-auto flex w-full max-w-xl items-center justify-between rounded-full bg-cacao px-5 py-4 text-crema shadow-xl hover:bg-cacao-claro transition-colors"
      >
        <span className="text-sm font-medium">
          {count} {count === 1 ? "ítem" : "ítems"} en tu pedido
        </span>
        <span className="text-base font-semibold">{formatPrice(total)}</span>
      </button>
    </div>
  );
}
