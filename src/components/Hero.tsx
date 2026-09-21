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
            Elige tus sabores, arma tu caja surtida y coordina el pago por Yape o Plin
            en minutos. Hacemos envíos a todo el Perú desde la caja de 25 a más.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#sabores"
              className="rounded-full bg-cacao px-6 py-3 text-sm font-semibold text-crema hover:bg-cacao-claro transition-colors"
            >
              Ver sabores
            </a>
            <a
              href="#caja-surtida"
              className="rounded-full border border-caramelo-oscuro bg-tarjeta px-6 py-3 text-sm font-semibold text-cacao hover:bg-crema transition-colors"
            >
              Caja Surtida
            </a>
          </div>
        </div>
        <div className="hero-anim">
          <figure className="card-pergamino overflow-hidden">
            <Image
              src="/images/hero-cocina.jpg"
              alt="Mesa de cocina con las variedades de mini galletas ALMALUZ"
              width={1200}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
          </figure>
          <figcaption className="mt-2 text-center text-xs text-cacao-claro">
            Clásica, Limón, Caramelo, Red Velvet y Oreo — en bolsitas x5 y cajas de 25, 50 y 100
          </figcaption>
        </div>
      </div>
    </section>
  );
}
