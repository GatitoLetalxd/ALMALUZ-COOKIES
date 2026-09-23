import products from "@/data/products.json";

export default function JsonLd() {
  const baseUrl = "https://almaluz.moondev.online";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ALMALUZ Cookies",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.webp`,
    description:
      "Mini galletas artesanales horneadas en casa en Perú. Disponibles en 5 sabores: Clásica, Limón, Caramelo, Red Velvet y Oreo.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    areaServed: "PE",
    sameAs: [],
  };

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sabores de Mini Galletas ALMALUZ",
    description:
      "Catálogo de mini galletas artesanales disponibles por bolsita, caja pequeña, caja mediana o caja evento.",
    url: baseUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `Mini Galletas ${product.name} ALMALUZ`,
        description: product.description,
        image: `${baseUrl}${product.image}`,
        brand: {
          "@type": "Brand",
          name: "ALMALUZ Cookies",
        },
        offers: product.packs.map((pack) => ({
          "@type": "Offer",
          name: pack.name,
          description: `${pack.name} — ${pack.count} unidades`,
          price: pack.price.toFixed(2),
          priceCurrency: "PEN",
          availability: "https://schema.org/InStock",
          url: baseUrl,
          seller: {
            "@type": "Organization",
            name: "ALMALUZ Cookies",
          },
        })),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
    </>
  );
}
