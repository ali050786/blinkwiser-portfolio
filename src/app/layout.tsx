import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/motion/RevealObserver";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  // Light by default; ThemeToggle repaints it when a visitor picks dark.
  themeColor: "#f9f8f6",
};

// Runs before paint: applies a saved theme (light unless the visitor chose
// dark) and records the motion preference, so there is no flash of the wrong
// theme and reveal styles only apply when reduced motion isn't requested.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t;}catch(e){}d.dataset.motion=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'ok';})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  sameAs: [site.linkedin, site.blinkwiser],
  knowsAbout: ["Design systems", "Design tokens", "Enterprise UX", "AI-driven UI", "Agentic workflows", "RTL design"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
