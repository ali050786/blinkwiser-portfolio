import type { CaseStudy } from "@/content/types";
import styles from "./Ownership.module.css";

export function Ownership({ ownership: o, signals }: { ownership: CaseStudy["ownership"]; signals: string }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.cols} data-cols={o.shared ? 3 : 2}>
        <div className={styles.col} data-reveal>
          <p className="t-label c-accent">Mine</p>
          {o.mine.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        {o.shared && (
          <div className={styles.col} data-reveal>
            <p className="t-label c-tertiary">Shared</p>
            {o.shared.map((p) => (
              <p key={p.slice(0, 24)} className="c-secondary">
                {p}
              </p>
            ))}
          </div>
        )}
        <div className={`${styles.col} ${styles.change}`} data-reveal>
          <p className="t-label">What I&apos;d change</p>
          {o.change.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <blockquote className={styles.quote} data-reveal>
        <p className="t-label c-tertiary">What this study signals</p>
        <p className={`t-serif ${styles.quoteText}`}>{signals}</p>
      </blockquote>
    </div>
  );
}
