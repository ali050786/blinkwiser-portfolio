import { caseStudies } from "@/content/case-studies";
import { WorkList, type WorkItem } from "./WorkList";
import { FeaturedCase } from "./FeaturedCase";
import styles from "./WorkIndex.module.css";

export function WorkIndex() {
  const [featured, ...rest] = caseStudies;
  const items: WorkItem[] = rest.map((c) => ({
    slug: c.slug,
    index: c.index,
    accent: c.accent,
    glyph: c.glyph,
    group: c.group,
    title: c.card?.title ?? c.short,
    widget: c.card?.widget ?? "stepper",
    call: c.hero.call,
    tags: c.tags,
    headline: { value: c.card?.value ?? c.headline.value, label: c.card?.label ?? c.headline.label },
    snapshot: c.snapshot,
    meta: `${c.meta.role} · ${c.meta.timeline}`,
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
        <p className="t-label c-tertiary" data-reveal>
          Selected work · 05
        </p>
        <h2 id="work-title" className="t-display-l" data-reveal>
          Five decisions, told the way they were <em className="t-serif-em c-accent">made</em>.
        </h2>
      </div>
      <div className="container">
        <FeaturedCase study={featured!} />
        <WorkList items={items} />
      </div>
    </section>
  );
}
