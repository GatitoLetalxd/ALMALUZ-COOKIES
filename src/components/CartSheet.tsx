"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart, getProductName } from "@/store/CartContext";
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  formatPrice,
} from "@/lib/whatsapp";

export default function CartSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, boxes, total, count, increment, decrement, removeBox } =
    useCart();
  const isEmpty = lines.length === 0 && boxes.length === 0;

  // Cerrar con Escape y bloquear scroll del fondo
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const enviarPedido = () => {
    if (isEmpty) return;
    // Arma el mensaje con sabores, cantidades, precios y total
    const message = buildOrderMessage(
      [
        ...lines.map((l) => ({
          name: l.name,
          qty: l.qty,
          unitPrice: l.price,
          detail: "Caja x5",
        })),
        ...boxes.map((b) => ({
          name: "Caja x20 surtida",
          qty: 1,
          unitPrice: b.price,
          detail: Object.entries(b.mix)
            .filter(([, q]) => q > 0)
            .map(([id, q]) => `${q} ${getProductName(id)}`)
            .join(" + "),
        })),
      ],
      total,
    );
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Tu pedido"
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-cacao/50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-x-0 bottom-0 mx-auto flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border-t border-pergamino bg-tarjeta shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-pergamino px-5 py-4">
          <h2 className="font-marca text-xl font-semibold text-cacao">
            Tu pedido {count > 0 && `(${count})`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar pedido"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-pergamino text-lg text-cacao hover:border-caramelo"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isEmpty ? (
            <div className="py-6 text-center">
              <Image
                src="/images/caramelo.jpg"
                alt="Mini galletas de caramelo"
                width={160}
                height={120}
                loading="lazy"
                className="mx-auto rounded-2xl border border-pergamino object-cover"
              />
              <p className="mt-3 text-sm text-cacao-claro">
                Aún no agregas cajitas. Elige tus sabores con el +.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {boxes.map((b) => (
                <li key={b.key} className="flex items-center gap-3">
                  <Image
                    src="/images/bandeja-surtida.jpg"
                    alt="Caja surtida de 20 mini galletas"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-16 w-16 rounded-2xl border border-pergamino object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-cacao">
                      Caja x20 surtida
                    </p>
                    <p className="text-xs text-cacao-claro">
                      {Object.entries(b.mix)
                        .filter(([, q]) => q > 0)
                        .map(([id, q]) => `${q} ${getProductName(id)}`)
                        .join(" + ")}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeBox(b.key)}
                      aria-label="Quitar esta caja de 20 del pedido"
                      className="mt-1 text-xs font-medium text-velvet underline underline-offset-2"
                    >
                      Quitar caja
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-cacao">
                    {formatPrice(b.price)}
                  </span>
                </li>
              ))}
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-3">
                  <Image
                    src={l.image}
                    alt={l.alt}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-16 w-16 rounded-2xl border border-pergamino object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-cacao">{l.name}</p>
                    <p className="text-xs text-cacao-claro">
                      Caja x5 — {formatPrice(l.price)}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decrement(l.id)}
                        aria-label={`Quitar una caja de ${l.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-pergamino text-base hover:border-caramelo"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold" aria-live="polite">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => increment(l.id)}
                        aria-label={`Agregar una caja de ${l.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-cacao text-base text-crema hover:bg-cacao-claro"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-cacao">
                    {formatPrice(l.qty * l.price)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-shrink-0 border-t border-pergamino bg-crema px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cacao-claro">Total</span>
            <span className="font-marca text-xl font-semibold text-cacao">
              {formatPrice(total)}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-cacao-claro">
            Al enviar, te pasamos el QR de Yape o Plin y nos mandas tu
            comprobante por WhatsApp. Si tu pedido viaja fuera de Chiclayo,
            el costo de envío se coordina por WhatsApp según la ciudad.
          </p>
          <button
            type="button"
            onClick={enviarPedido}
            disabled={isEmpty}
            className="mt-3 w-full rounded-full bg-cacao px-6 py-3.5 text-sm font-semibold text-crema hover:bg-cacao-claro disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar pedido por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
