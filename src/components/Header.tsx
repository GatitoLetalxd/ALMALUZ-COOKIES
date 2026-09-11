"use client";

import Image from "next/image";
import { useCart } from "@/store/CartContext";

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-pergamino bg-crema/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a href="#inicio" className="flex items-center gap-2" aria-label="ALMALUZ inicio">
          <Image src="/icon.svg" alt="" width={30} height={30} aria-hidden="true" />
          <span className="font-marca text-xl font-semibold tracking-wide text-cacao">
            ALMALUZ
          </span>
          <span className="hidden text-xs text-cacao-claro sm:inline">
            mini bites artesanales
          </span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-cacao-claro md:flex" aria-label="Secciones">
          <a className="hover:text-cacao" href="#sabores">Sabores</a>
          <a className="hover:text-cacao" href="#caja-20">Caja de 20</a>
          <a className="hover:text-cacao" href="#historia">Nosotras</a>
          <a className="hover:text-cacao" href="#como-funciona">Cómo funciona</a>
        </nav>
        <button
          type="button"
          onClick={onOpenCart}
          aria-label={count > 0 ? `Abrir pedido, ${count} cajas` : "Abrir pedido"}
          className="relative rounded-full border border-pergamino bg-tarjeta px-4 py-2 text-sm font-medium text-cacao shadow-sm hover:border-caramelo"
        >
          Tu pedido
          {count > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-cacao px-1 text-xs font-semibold text-crema"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
