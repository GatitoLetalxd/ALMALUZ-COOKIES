import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="mx-auto max-w-5xl px-4 pt-8 pb-4 md:pt-14">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="hero-anim">
          <p className="inline-block rounded-full border border-pergamino bg-tarjeta px-3 py-1 text-xs font-medium text-cacao-claro">
            Horneado en casa, en Chiclayo
          </p>
          <h1 className="font-marca mt-4 text-4xl leading-tight font-semibold text-cacao md:text-5xl">
            Mini bites artesanales, horneados en casa.
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-cacao-claro">
            Elige tus sabores, arma tu caja y coordina el pago por Yape o Plin
            en minutos. Hacemos envíos a todo el Perú desde la caja de 20.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#sabores"
              className="rounded-full bg-cacao px-6 py-3 text-sm font-semibold text-crema hover:bg-cacao-claro"
            >
              Ver sabores
            </a>
            <a
              href="#como-funciona"
              className="rounded-full border border-caramelo-oscuro bg-tarjeta px-6 py-3 text-sm font-semibold text-cacao hover:bg-crema"
            >
              Cómo pedir
            </a>
          </div>
        </div>
        <div className="hero-anim">
          <figure className="card-pergamino overflow-hidden">
            <Image
              src="/images/hero-cocina.jpg"
              alt="Mesa de cocina con las cuatro variedades de mini galletas ALMALUZ"
              width={1200}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
          </figure>
          <figcaption className="mt-2 text-center text-xs text-cacao-claro">
            Clásica, Red Velvet, Oreo y Caramelo — cajas de 5 unidades
          </figcaption>
        </div>
      </div>
    </section>
  );
}
