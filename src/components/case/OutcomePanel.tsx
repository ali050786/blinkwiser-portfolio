import type { CaseStudy } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { MetricVisual, MetricVizView } from "./MetricVisual";
import styles from "./OutcomePanel.module.css";

export function OutcomePanel({ outcome }: { outcome: CaseStudy["outcome"] }) {
  return (
    <div className={styles.wrap}>
      <ul className={styles.metrics}>
        {outcome.metrics.map((m, i) => {
          const hasBars = !m.visual && !m.viz && m.before && m.after;
          const pct = hasBars ? Math.max(4, (m.after!.amount / m.before!.amount) * 100) : 0;
          return (
            <li key={m.label} className={styles.metric} data-bars={hasBars || undefined} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
              <p className={`tabular ${styles.value}`}>{m.value}</p>
              <p className="t-body-s c-secondary">{m.label}</p>
              {m.visual && <MetricVisual id={m.visual} />}
              {m.viz && <MetricVizView viz={m.viz} />}
              {hasBars && (
                <div className={styles.bars} role="img" aria-label={`Before: ${m.before!.label}. After: ${m.after!.label}.`}>
                  <div className={styles.barRow}>
                    <span className="t-label c-tertiary">Before</span>
                    <span className={styles.track}>
                      <span className={styles.bar} data-kind="before" style={{ "--w": "100%" } as React.CSSProperties} />
                    </span>
                    <span className={`t-mono ${styles.barVal}`}>{m.before!.label}</span>
                  </div>
                  <div className={styles.barRow}>
                    <span className="t-label c-accent">After</span>
                    <span className={styles.track}>
                      <span className={styles.bar} data-kind="after" style={{ "--w": `${pct}%` } as React.CSSProperties} />
                    </span>
                    <span className={`t-mono ${styles.barVal}`}>{m.after!.label}</span>
                  </div>
                  {m.unit && <p className={`t-label c-tertiary ${styles.unit}`}>Bar length ∝ {m.unit}, approximate</p>}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <ul className={styles.points}>
        {outcome.points.map((p) => (
          <li key={p.slice(0, 24)} data-reveal>
            <span className={styles.bullet} aria-hidden="true" />
            <p>{p}</p>
          </li>
        ))}
      </ul>

      <aside className={styles.provenance} data-reveal>
        <Icon name="info" size={18} />
        <div>
          <p className="t-label">How sure I am</p>
          <p className="t-body-s c-secondary">{outcome.provenance}</p>
        </div>
      </aside>
    </div>
  );
}
