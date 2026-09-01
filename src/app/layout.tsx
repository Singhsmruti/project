import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { RfqProvider } from "@/components/Rfq";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/data/themes";
import { SITE } from "@/data/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-spec",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Pressure & Temperature Gauge Manufacturer, Vasai`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — Pressure & Temperature Gauge Manufacturer`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  icons: { icon: "/3s-lockup.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Manufacturer",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    telephone: SITE.phones.map((p) => `+${p.raw}`),
    email: SITE.emails[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: "G-9, Rajtilak Indl Complex, Opp. Buddhi Sagar, Chinchpada",
      addressLocality: "Vasai (East)",
      addressRegion: "Maharashtra",
      postalCode: "401208",
      addressCountry: "IN",
    },
  };

  return (
    // `data-scroll-behavior` keeps the #anchor jumps on /applications smooth
    // while telling Next to suppress smoothing during route transitions.
    //
    // `data-theme` is rendered here so the SSR HTML already carries the default
    // — otherwise the pre-paint script below would be adding an attribute React
    // never saw, which is a hydration mismatch. `suppressHydrationWarning`
    // covers the remaining case: a visitor whose stored theme is NOT the
    // default, where the script legitimately changes the value before React
    // hydrates. It applies to this element only, not the tree beneath it.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`scroll-smooth ${archivo.variable} ${mono.variable}`}
    >
      <head>
        {/* Pick the stored theme before first paint, so a preview choice does
            not flash the default palette on every navigation. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem(${JSON.stringify(
              THEME_STORAGE_KEY,
            )})||${JSON.stringify(DEFAULT_THEME)};document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <RfqProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </RfqProvider>
      </body>
    </html>
  );
}
