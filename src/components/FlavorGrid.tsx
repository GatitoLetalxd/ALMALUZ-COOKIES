import { getProducts } from "@/store/CartContext";
import ProductCard from "./ProductCard";

export default function FlavorGrid() {
  const products = getProducts();
  return (
    <section id="sabores" aria-labelledby="sabores-titulo" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10">
      <h2 id="sabores-titulo" className="font-marca text-3xl font-semibold text-cacao">
        Nuestros sabores
      </h2>
      <p className="mt-1 text-sm text-cacao-claro">
        Toca el + para agregar una caja a tu pedido
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
