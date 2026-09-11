import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const marca = Fraunces({
  variable: "--font-marca",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const cuerpo = Work_Sans({
  variable: "--font-cuerpo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALMALUZ Cookies — Mini bites artesanales",
  description:
    "Mini galletas artesanales horneadas en casa en Perú. Arma tu caja de 5 unidades y pide por WhatsApp con Yape o Plin.",
  metadataBase: new URL("https://almaluz.moondev.online"),
  openGraph: {
    title: "ALMALUZ Cookies — Mini bites artesanales",
    description:
      "Elige tus sabores, arma tu caja y coordina el pago por Yape o Plin en minutos.",
    url: "https://almaluz.moondev.online",
    siteName: "ALMALUZ Cookies",
    locale: "es_PE",
    type: "website",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" className="h-full">
      <body
        className={`${marca.variable} ${cuerpo.variable} min-h-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
