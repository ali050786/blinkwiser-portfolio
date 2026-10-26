import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformTrailer } from "@/components/studio/PlatformTrailer";

/*
 * Studio page for the wide (2.3:1) platform trailer, the case 02 page hero.
 * Development only: it 404s in production builds. Preview at
 * /studio/platform-wide; `scripts/record-trailer.py platform-wide` records it.
 */

export const metadata: Metadata = { title: "Platform hero studio", robots: { index: false, follow: false } };

export default function PlatformWideStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <PlatformTrailer layout="wide" />;
}
