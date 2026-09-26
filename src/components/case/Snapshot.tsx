import type { CaseStudy } from "@/content/types";
import styles from "./Snapshot.module.css";

export function Snapshot({ study: c }: { study: CaseStudy }) {
  const rows = [
    { k: "Frame", v: c.snapshot.frame, hint: "The reframe" },
    { k: "Key decision", v: c.snapshot.decision, hint: "The hardest call" },
    { k: "Outcome", v: c.snapshot.outcome, hint: "What moved" },
  ];
  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="snapshot-title">
      <div className={styles.card}>
        <div className={styles.head}>
          <h2 id="snapshot-title" className="t-label">
            Decision snapshot
          </h2>
          <p className="t-label c-tertiary">30-second read</p>
        </div>
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
    </section>
  );
}
