import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillsTrailer } from "@/components/studio/SkillsTrailer";

/*
 * Studio page for the AI-readable design system trailer (case 03). Development
 * only: it 404s in production builds. Preview at /studio/skills-trailer;
 * `scripts/record-trailer.py skills` records it.
 */

export const metadata: Metadata = { title: "Skills trailer studio", robots: { index: false, follow: false } };

export default function SkillsTrailerStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <SkillsTrailer />;
}
