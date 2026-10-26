import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlinkwiserTrailer } from "@/components/studio/BlinkwiserTrailer";

/*
 * Studio page for the wide (2.3:1) Blinkwiser trailer, the case 04 page hero.
 * Development only: it 404s in production builds. Preview at
 * /studio/blinkwiser-wide; `scripts/record-trailer.py blinkwiser-wide` records it.
 */

export const metadata: Metadata = { title: "Blinkwiser hero studio", robots: { index: false, follow: false } };

export default function BlinkwiserWideStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <BlinkwiserTrailer layout="wide" />;
}
