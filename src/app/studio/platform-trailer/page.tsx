import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformTrailer } from "@/components/studio/PlatformTrailer";

/*
 * Studio page for the white-label platform trailer (case 02). Development
 * only: it 404s in production builds. Preview at /studio/platform-trailer;
 * `scripts/record-trailer.py platform` records it.
 */

export const metadata: Metadata = { title: "Platform trailer studio", robots: { index: false, follow: false } };

export default function PlatformTrailerStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <PlatformTrailer />;
}
