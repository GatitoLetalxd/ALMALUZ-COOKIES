import { getProducts } from "@/store/CartContext";
import ProductCard from "./ProductCard";

export default function FlavorGrid() {
  const products = getProducts();
  return (
    <section id="sabores" aria-labelledby="sabores-titulo" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h2 id="sabores-titulo" className="font-marca text-3xl font-semibold text-cacao">
            Nuestros sabores
          </h2>
          <p className="mt-1 text-sm text-cacao-claro">
            Elige tu presentación favorita (x5, x25, x50 o x100) y agrega a tu pedido con el botón +.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-cacao-claro">
          <span className="inline-block h-2 w-2 rounded-full bg-caramelo"></span>
          <span>Descuentos automáticos en packs de 50 y 100</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
