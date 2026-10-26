import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlinkwiserTrailer } from "@/components/studio/BlinkwiserTrailer";

/*
 * Studio page for the Blinkwiser trailer (case 04). Development only: it 404s
 * in production builds. Preview at /studio/blinkwiser-trailer;
 * `scripts/record-trailer.py blinkwiser` records it.
 */

export const metadata: Metadata = { title: "Blinkwiser trailer studio", robots: { index: false, follow: false } };

export default function BlinkwiserTrailerStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <BlinkwiserTrailer />;
}
