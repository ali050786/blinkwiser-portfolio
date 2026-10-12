import localFont from "next/font/local";

/**
 * Body and UI: Atkinson Hyperlegible Next (Braille Institute, OFL). Drawn so
 * that similar letters (I l 1, O 0, rn m) stay distinct for low-vision readers.
 */
export const atkinson = localFont({
  src: [
    { path: "../fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/atkinson-hyperlegible-next-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-atkinson",
  display: "swap",
});

/** Code, tokens and diagram labels: Atkinson Hyperlegible Mono, the same family's monospace. */
export const atkinsonMono = localFont({
  src: "../fonts/atkinson-hyperlegible-mono-latin-wght-normal.woff2",
  variable: "--font-atkinson-mono",
  weight: "200 800",
  display: "swap",
});

/** Titles and headings: Newsreader (Production Type, OFL; optical size and weight axes). */
export const newsreader = localFont({
  src: "../fonts/newsreader-latin-opsz-normal.woff2",
  variable: "--font-newsreader",
  weight: "200 800",
  display: "swap",
});

/**
 * The demo product inside the case studies (the rebuilt client screens) keeps its own UI font,
 * so the live mock-ups match the captured tiles and the trailer. The site itself never uses it.
 */
export const productSans = localFont({
  src: "../fonts/Geist-Variable.woff2",
  variable: "--font-product",
  weight: "100 900",
  display: "swap",
  preload: false,
});
export const productMono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-product-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
});

/** Only the Dubai exhibit uses Arabic, so it is not preloaded. */
export const plexArabic = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

export const fontVariables = [atkinson.variable, atkinsonMono.variable, newsreader.variable, productSans.variable, productMono.variable, plexArabic.variable].join(" ");
