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
  title: "ALMALUZ Cookies — Mini galletas artesanales en Perú",
  description:
    "Mini galletas artesanales horneadas en casa en Perú. Sabores: Clásica, Limón, Caramelo, Red Velvet y Oreo. Pide por WhatsApp y paga con Yape o Plin.",
  metadataBase: new URL("https://almaluz.moondev.online"),
  keywords: [
    "galletas artesanales",
    "mini galletas",
    "cookies",
    "galletas Perú",
    "galletas Lima",
    "galletas para eventos",
    "galletas Red Velvet",
    "galletas Oreo",
    "galletas caramelo",
    "galletas limón",
    "galletas por mayor",
    "galletas WhatsApp",
    "galletas Yape",
    "ALMALUZ",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://almaluz.moondev.online",
  },
  openGraph: {
    title: "ALMALUZ Cookies — Mini galletas artesanales en Perú",
    description:
      "Elige tu sabor favorito, arma tu caja (desde 5 hasta 100 unidades) y coordina el pago por Yape o Plin en minutos.",
    url: "https://almaluz.moondev.online",
    siteName: "ALMALUZ Cookies",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "ALMALUZ Cookies — Mini galletas artesanales en Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALMALUZ Cookies — Mini galletas artesanales en Perú",
    description:
      "Sabores: Clásica, Limón, Caramelo, Red Velvet y Oreo. Pide por WhatsApp 🍪",
    images: ["/og-cover.jpg"],
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
