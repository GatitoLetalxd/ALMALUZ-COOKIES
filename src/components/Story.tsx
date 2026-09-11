import Image from "next/image";

export default function Story() {
  return (
    <section id="historia" aria-labelledby="historia-titulo" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <h2 id="historia-titulo" className="font-marca text-2xl font-semibold text-cacao">
            Horneado en casa, con calma
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cacao-claro">
            Somos un negocio casero en Perú. Horneamos por pedido, en tandas
            pequeñas, para que tus mini bites lleguen frescos. Sin apuros, sin
            fábrica: receta de familia y mucho cariño.
          </p>
        </div>
        <figure className="card-pergamino overflow-hidden">
          <Image
            src="/images/momento-en-casa.jpg"
            alt="Niña y niño compartiendo galletas ALMALUZ en una cocina casera"
            width={1200}
            height={900}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-auto w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
