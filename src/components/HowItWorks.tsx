const pasos = [
  {
    titulo: "Arma tu caja",
    texto: "Elige sabores con el + y revisa tu pedido abajo.",
  },
  {
    titulo: "Paga con el QR",
    texto: "Te pasamos el QR de Yape o Plin por WhatsApp.",
  },
  {
    titulo: "Envía tu comprobante",
    texto: "Mándanos la captura y coordinamos la entrega.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-titulo"
      className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10"
    >
      <h2 id="como-titulo" className="font-marca text-2xl font-semibold text-cacao">
        Cómo funciona tu pedido
      </h2>
      <ol className="mt-5 grid gap-4 md:grid-cols-3">
        {pasos.map((p, i) => (
          <li
            key={p.titulo}
            className="card-pergamino p-5"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-caramelo font-marca text-base font-semibold text-cacao"
            >
              {i + 1}
            </span>
            <h3 className="font-marca mt-3 text-lg font-semibold text-cacao">
              {p.titulo}
            </h3>
            <p className="mt-1 text-sm text-cacao-claro">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
