import Image from "next/image";

export default function Showcase() {
  return (
    <section aria-label="Una caja, cuatro antojos" className="border-y border-pergamino bg-tarjeta">
      <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 py-10 md:grid-cols-2">
        <figure className="card-pergamino overflow-hidden">
          <Image
            src="/images/bandeja-surtida.jpg"
            alt="Bandeja con surtido de mini galletas ALMALUZ de todos los sabores"
            width={1200}
            height={900}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-auto w-full object-cover"
          />
        </figure>
        <div>
          <h2 className="font-marca text-2xl font-semibold text-cacao">
            Una caja, cuatro antojos
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cacao-claro">
            Todas las cajas de sabor traen 5 mini galletas. Puedes combinar
            varias cajas en un solo pedido, o armar tu{" "}
            <a href="#caja-20" className="font-medium text-cacao underline underline-offset-2">
              caja de 20 con los sabores que quieras
            </a>
            , ideal si tu pedido viaja fuera de Chiclayo.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-cacao">
            <li>Clásica — S/ 2.00 la caja</li>
            <li>Red Velvet — S/ 3.00 la caja</li>
            <li>Oreo — S/ 3.00 la caja</li>
            <li>Caramelo — S/ 2.50 la caja</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
