import type { CaseStudy } from "@/content/types";
import { Glyph } from "@/components/ui/Glyph";
import styles from "./Snapshot.module.css";

export function Snapshot({ study: c }: { study: CaseStudy }) {
  const rows = [
    { k: "Frame", v: c.snapshot.frame, hint: "The reframe" },
    { k: "Key decision", v: c.snapshot.decision, hint: "The hardest call" },
    { k: "Outcome", v: c.snapshot.outcome, hint: "What moved" },
  ];
  /* When the hero opens with a story, the study's core diagram moves here, beside the snapshot. */
  const split = !!c.opener;
  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="snapshot-title">
      <div className={styles.card} data-split={split || undefined}>
        <div className={styles.head}>
          <h2 id="snapshot-title" className="t-label">
            Decision snapshot
          </h2>
          <p className="t-label c-tertiary">30-second read</p>
        </div>
        <div className={styles.body}>
          {split && (
            <figure className={styles.visual} data-bare={c.hook ? "" : undefined}>
              <Glyph id={c.glyph} />
              {/* With a picture-first hero the number is already above, so the glyph stands alone here. */}
              {!c.hook && (
                <figcaption className={styles.headline}>
                  <span className={`tabular ${styles.headlineValue}`}>{c.headline.value}</span>
                  <span className="t-body-s c-secondary">{c.headline.label}</span>
                </figcaption>
              )}
            </figure>
          )}
          <ol className={styles.rows}>
            {rows.map((r, i) => (
              <li key={r.k} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                <p className={styles.k}>
                  <span className="t-mono c-accent">0{i + 1}</span>
                  <span className="t-heading-m">{r.k}</span>
                </p>
                <p className="c-secondary">{r.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
