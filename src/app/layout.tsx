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
    images: [{ url: "/images/logo.webp", width: 774, height: 778, alt: "ALMALUZ Cookies — Mini bites artesanales" }],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
