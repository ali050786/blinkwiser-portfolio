import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillsTrailer } from "@/components/studio/SkillsTrailer";

/*
 * Studio page for the wide (2.3:1) skills trailer, the case 03 page hero.
 * Development only: it 404s in production builds. Preview at
 * /studio/skills-wide; `scripts/record-trailer.py skills-wide` records it.
 */

export const metadata: Metadata = { title: "Skills hero studio", robots: { index: false, follow: false } };

export default function SkillsWideStudio() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <SkillsTrailer layout="wide" />;
}
