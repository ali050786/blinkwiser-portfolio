import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DubaiTrailer } from "@/components/studio/DubaiTrailer";

/*
 * Studio page for the wide (2.3:1) Dubai Municipality trailer, the case 05
 * page hero. Development only: it 404s in production builds. Preview at
 * /studio/dubai-wide; `scripts/record-trailer.py dubai-wide` records it.
 */

export const metadata: Metadata = { title: "Dubai hero studio", robots: { index: false, follow: false } };

export default function DubaiWideStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <DubaiTrailer layout="wide" />;
}
