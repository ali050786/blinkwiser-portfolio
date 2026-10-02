/*
 * The home hero's career timeline, latest first. Every line comes from a case
 * study or the résumé: no new claims. `depth` is kept for the earlier wave
 * layout (4 = newest); the timeline doesn't use it.
 */

export type CareerChapter = {
  id: string;
  org: string;
  /** Shown above the org, e.g. "2020–21". The current chapter shows "Now". */
  years: string;
  /** The brief as it arrived, shown struck through. */
  brief: string;
  /** What changed one level down. */
  fix: string;
  /** The result, shown under the fix. */
  result: string;
  depth: 1 | 2 | 3 | 4;
  /** Marks the current chapter (accent colour, "Now"). */
  current?: boolean;
  href?: string;
  /** Case index for the "Read case" line, e.g. "03". */
  caseIndex?: string;
};

export const career: CareerChapter[] = [
  {
    id: "ai",
    org: "AI",
    years: "Now",
    brief: "Prompt the AI harder",
    fix: "A design system agents can read",
    result: "1–2 wks → 3–4 days",
    depth: 4,
    current: true,
    href: "/work/ai-readable-design-system",
    caseIndex: "03",
  },
  {
    id: "health",
    org: "US health insurance",
    years: "2021–",
    brief: "Shorten the flow",
    fix: "The family's order, not the database's",
    result: "9 → 5 steps",
    depth: 3,
    href: "/work/open-enrollment",
    caseIndex: "01",
  },
  {
    id: "dubai",
    org: "Dubai Municipality",
    years: "2020–21",
    brief: "Redesign the portal",
    fix: "Organised by resident need",
    result: "3.5M residents",
    depth: 2,
    href: "/work/dubai-municipality",
    caseIndex: "05",
  },
  {
    id: "jet",
    org: "Jet Airways",
    years: "2015–19",
    brief: "Ship the apps",
    fix: "One library, four platforms",
    result: "4 platforms",
    depth: 1,
  },
];
