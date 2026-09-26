import localFont from "next/font/local";

export const geist = localFont({
  src: "../fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

export const geistMono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
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

export const fontVariables = [geist.variable, geistMono.variable, instrumentSerif.variable, plexArabic.variable].join(" ");
