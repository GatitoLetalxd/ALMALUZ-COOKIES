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
          <span className="text-xs font-semibold uppercase tracking-wider text-caramelo-oscuro">
            Presentaciones a tu medida
          </span>
          <h2 className="font-marca mt-1 text-2xl font-semibold text-cacao">
            Una caja, cuatro antojos
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cacao-claro">
            Elige tus sabores individuales en <strong>Bolsita x5</strong>, <strong>Caja pequeña x25</strong>, <strong>Caja mediana x50</strong> o <strong>Caja evento x100</strong> con descuento por volumen. O si prefieres probar de todo, pide tu{" "}
            <a href="#caja-surtida" className="font-semibold text-cacao underline underline-offset-2 hover:text-caramelo-oscuro">
              Caja Surtida de 4 sabores
            </a>
            , ideal para compartir o para envíos fuera de Chiclayo.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-cacao">
            <div className="rounded-xl border border-pergamino bg-crema/60 p-2.5">
              <p className="font-semibold text-cacao">Bolsitas x5</p>
              <p className="text-cacao-claro">Desde S/ 2.00 por pack</p>
            </div>
            <div className="rounded-xl border border-pergamino bg-crema/60 p-2.5">
              <p className="font-semibold text-cacao">Cajas x25</p>
              <p className="text-cacao-claro">Desde S/ 10.00 por caja</p>
            </div>
            <div className="rounded-xl border border-pergamino bg-crema/60 p-2.5">
              <p className="font-semibold text-cacao">Cajas x50</p>
              <p className="text-cacao-claro">Desde S/ 20.00 (con ahorro)</p>
            </div>
            <div className="rounded-xl border border-pergamino bg-crema/60 p-2.5">
              <p className="font-semibold text-cacao">Cajas x100</p>
              <p className="text-cacao-claro">Desde S/ 38.00 (mayor ahorro)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
