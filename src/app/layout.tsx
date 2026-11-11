import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE, SERVICES } from "@/data/site";
import "./globals.css";

// Fonts are loaded with a plain Google Fonts stylesheet (same approach as
// the original HTML file): Sora for headings, Inter for body - the exact
// type pairing of the original design.

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2540",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "ZUHAYN - Creative & IT Solutions | Digital Marketing & Design Agency, Dhaka",
    template: "%s | ZUHAYN - Creative & IT Solutions",
  },
  description:
    "ZUHAYN is a Dhaka-based creative & IT solutions agency: digital marketing, creative & graphic design, branding, video editing, web design and AI automation that help brands grow. Call +8801917653545.",
  keywords: [
    "digital marketing agency Dhaka",
    "creative agency Bangladesh",
    "graphic design Dhaka",
    "branding agency Bangladesh",
    "web design Dhaka",
    "video editing Bangladesh",
    "social media marketing Dhaka",
    "ZUHAYN",
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Business",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.legalName,
    url: SITE.url,
    title: "ZUHAYN - Creative & IT Solutions | Digital Marketing & Design Agency, Dhaka",
    description:
      "We grow brands with bold digital marketing, creative design, branding and websites. Dhaka-based, serving clients worldwide.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZUHAYN - Creative & IT Solutions, Dhaka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZUHAYN - Creative & IT Solutions",
    description:
      "Digital marketing, creative design, branding, video editing and web design, from Dhaka to the world.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
    apple: [{ url: "/favicon.png" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/og-image.jpg`,
  description:
    "Creative & IT solutions agency in Dhaka, Bangladesh offering digital marketing, creative and graphic design, branding, video editing, web design and AI automation.",
  telephone: "+8801917653545",
  priceRange: "$$",
  foundingDate: SITE.founded,
  founder: { "@type": "Person", name: SITE.founder, jobTitle: "Founder & CEO" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Post Office Road, Middle Badda, Progoti Soroni",
    addressLocality: "Dhaka",
    postalCode: "1212",
    addressCountry: "BD",
  },
  areaServed: ["Bangladesh", "Worldwide"],
  sameAs: [SITE.facebook, SITE.linkedin],
  makesOffer: SERVICES.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.description },
  })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "09:00",
    closes: "21:00",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.legalName,
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" as="image" href="/hero-bg.jpg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
