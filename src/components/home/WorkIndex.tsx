import { caseStudies } from "@/content/case-studies";
import { FeaturedCase } from "./FeaturedCase";
import { WorkGrid, type WorkCard } from "./WorkGrid";
import styles from "./WorkIndex.module.css";

/*
 * What each card says, beyond its case study's own fields. Domains match the
 * hero's briefs; outcomes are the case studies' own headline figures, kept to
 * one value and one plain line.
 */
const home: Record<string, { domain: string; outcome: { value: string; label: string } }> = {
  "02": { domain: "White-label platform", outcome: { value: "< 24 h", label: "to theme a new client, down from weeks" } },
  "03": { domain: "AI design systems", outcome: { value: "3–4 days", label: "Jira-story turnaround, down from 1–2 weeks" } },
  "04": { domain: "AI product, Blinkwiser", outcome: { value: "7 in 10", label: "blind comparisons won by the rebuild over the first version" } },
  "05": { domain: "Civic services, Dubai", outcome: { value: "", label: "One place for city services, for citizens and residents, in Arabic and English" } },
};

export function WorkIndex() {
  const [featured, ...rest] = caseStudies;
  const items: WorkCard[] = rest.map((c) => ({
    slug: c.slug,
    index: c.index,
    domain: home[c.index]?.domain ?? c.group,
    title: c.card?.title ?? c.short,
    outcome: home[c.index]?.outcome ?? c.headline,
    role: c.meta.role,
    timeline: c.meta.timeline,
    visual:
      c.cover ??
      ({
        screen: "ds-tokens",
        alt: "The design system's colour tokens, named by role: the same system the AI agent reads.",
      } as const),
  }));

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className={`container ${styles.head}`}>
        <h2 id="work-title" className="t-display-l" data-reveal>
          Case studies
        </h2>
      </div>
      <div className="container">
        <FeaturedCase study={featured!} />
        <WorkGrid items={items} />
      </div>
    </section>
  );
}
