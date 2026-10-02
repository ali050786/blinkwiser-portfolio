import { caseStudies } from "./case-studies";
import type { GlyphId } from "./types";

/*
 * The home page's Reframe deck: every study as the brief, the real problem
 * and the call. Every line comes straight from case-studies.ts.
 */

const tabLabels: Record<string, string> = {
  "01": "Health insurance enrollment",
  "02": "Health insurance platform",
  "03": "AI design systems",
  "04": "AI product",
  "05": "Civic, bilingual",
};

export const buildDeck = () =>
  caseStudies.map((c) => ({
    slug: c.slug,
    index: c.index,
    accent: c.accent,
    glyph: c.glyph as GlyphId,
    tab: tabLabels[c.index] ?? c.short,
    label: c.hero.label,
    brief: c.hero.brief,
    problem: c.hero.problem,
    call: c.hero.call,
    role: `${c.meta.role} · ${c.meta.timeline}`,
  }));
