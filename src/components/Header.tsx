"use client";

import Image from "next/image";
import { useCart } from "@/store/CartContext";

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-pergamino bg-crema/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="ALMALUZ inicio">
          <Image
            src="/images/logo.webp"
            alt="Logo ALMALUZ Cookies"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain drop-shadow-xs transition-transform hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="font-marca text-xl font-semibold tracking-wide text-cacao">
              ALMALUZ
            </span>
            <span className="hidden text-[11px] text-cacao-claro sm:inline mt-0.5">
              mini bites artesanales
            </span>
          </div>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-cacao-claro md:flex" aria-label="Secciones">
          <a className="hover:text-cacao transition-colors" href="#sabores">Sabores</a>
          <a className="hover:text-cacao transition-colors" href="#caja-surtida">Caja Surtida</a>
          <a className="hover:text-cacao transition-colors" href="#historia">Nosotras</a>
          <a className="hover:text-cacao transition-colors" href="#como-funciona">Cómo funciona</a>
        </nav>
        <button
          type="button"
          onClick={onOpenCart}
          aria-label={count > 0 ? `Abrir pedido, ${count} ítems` : "Abrir pedido"}
          className="relative rounded-full border border-pergamino bg-tarjeta px-4 py-2 text-sm font-medium text-cacao shadow-sm hover:border-caramelo transition-colors"
        >
          Tu pedido
          {count > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-cacao px-1 text-xs font-semibold text-crema shadow-xs"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
