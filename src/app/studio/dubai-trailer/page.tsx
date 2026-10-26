import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DubaiTrailer } from "@/components/studio/DubaiTrailer";

/*
 * Studio page for the Dubai Municipality trailer (case 05). Development only:
 * it 404s in production builds. Preview at /studio/dubai-trailer;
 * `scripts/record-trailer.py dubai` records it.
 */

export const metadata: Metadata = { title: "Dubai trailer studio", robots: { index: false, follow: false } };

export default function DubaiTrailerStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <DubaiTrailer />;
}
