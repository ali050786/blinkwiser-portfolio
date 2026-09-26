import { caseStudies } from "@/content/case-studies";
import { WorkList, type WorkItem } from "./WorkList";
import styles from "./WorkIndex.module.css";

export function WorkIndex() {
  const items: WorkItem[] = caseStudies.map((c) => ({
    slug: c.slug,
    index: c.index,
    accent: c.accent,
    glyph: c.glyph,
    group: c.group,
    title: c.title,
    tags: c.tags,
    headline: c.headline,
    snapshot: c.snapshot,
    meta: `${c.meta.role} · ${c.meta.timeline}`,
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
        <p className="t-body-l c-secondary" data-reveal>
          Each study opens with a 30-second snapshot: the reframe, the hardest call, and what it moved. The full read walks every fork,
          including the road not taken and what it cost.
        </p>
      </div>
      <div className="container">
        <WorkList items={items} />
      </div>
    </section>
  );
}
