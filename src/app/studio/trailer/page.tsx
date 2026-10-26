import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnrollmentTrailer } from "@/components/studio/EnrollmentTrailer";

/*
 * Studio page for the enrollment trailer (2026-10-26). Development only: it
 * 404s in production builds, so it never ships. Open /studio/trailer in
 * `npm run dev` to preview and scrub; scripts/record-trailer.py opens
 * /studio/trailer?record and captures it frame by frame.
 */

export const metadata: Metadata = { title: "Trailer studio", robots: { index: false, follow: false } };

export default function TrailerStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <EnrollmentTrailer />;
}
