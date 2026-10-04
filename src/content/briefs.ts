import { caseStudies } from "./case-studies";

/*
 * The home hero's marked-up briefs. The brief, the real problem and the call
 * come straight from each case study's hero, so the two can never drift.
 * `key` is the phrase the pen circles; it must appear in the problem.
 */

const spec = [
  { index: "01", tag: "Health-insurance enrollment", key: "the order the backend stores them" },
  { index: "02", tag: "White-label platform", key: "no design system" },
  { index: "03", tag: "AI design systems", key: "lived in designers' heads" },
  { index: "04", tag: "AI product, Blinkwiser", key: "couldn't trust" },
  { index: "05", tag: "Civic services, Dubai", key: "grouped by department" },
] as const;

export type BriefPage = {
  index: string;
  tag: string;
  key: string;
  brief: string;
  problem: string;
  call: string;
  href: string;
};

export const briefs: BriefPage[] = spec.map((s) => {
  const c = caseStudies.find((x) => x.index === s.index)!;
  return { ...s, brief: c.hero.brief, problem: c.hero.problem, call: c.hero.call, href: `/work/${c.slug}` };
});
