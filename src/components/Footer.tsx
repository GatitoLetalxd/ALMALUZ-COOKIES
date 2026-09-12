import { getWhatsAppNumber } from "@/lib/whatsapp";

export default function Footer() {
  const numero = getWhatsAppNumber();
  return (
    <footer className="mt-6 border-t border-pergamino bg-tarjeta">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-28 text-sm text-cacao-claro md:pb-24">
        <p className="font-marca text-lg font-semibold text-cacao">ALMALUZ Cookies</p>
        <p className="mt-1">
          Horneado en Chiclayo. Pedidos sujetos a disponibilidad del día.
          Envíos a todo el Perú desde la caja de 25. Respondemos por WhatsApp
          en minutos.
        </p>
        <p className="mt-3">
          Escríbenos directo:{" "}
          <a
            className="font-medium text-cacao underline underline-offset-2 hover:text-caramelo-oscuro transition-colors"
            href={`https://wa.me/${numero}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp ALMALUZ
          </a>
        </p>
      </div>
    </footer>
  );
}
