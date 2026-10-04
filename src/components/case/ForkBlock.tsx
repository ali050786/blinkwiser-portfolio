import type { Fork } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import styles from "./ForkBlock.module.css";

/**
 * One decision, drawn as a fork: the road not taken on the left, the call on
 * the right, then the reasoning and the price paid.
 */
export function ForkBlock({ fork: f, n, total, children }: { fork: Fork; n: number; total: number; children?: React.ReactNode }) {
  return (
    <div id={`fork-${f.id}`} data-fork={f.id} className={styles.fork}>
      <header className={styles.head} data-reveal>
        <p className="t-label">
          <span className="c-accent">Decision {n}</span>
          <span className="c-tertiary"> of {total}</span>
        </p>
        <h3 className={`t-heading-l ${styles.title}`}>{f.title}</h3>
        <p className="c-secondary prose">{f.tension}</p>
      </header>

      <div className={styles.paths} data-reveal>
        <svg className={styles.svg} viewBox="0 0 800 96" aria-hidden="true">
          <path d="M400 6 V30 C400 62, 200 52, 200 96" className={styles.rejectedPath} />
          <path d="M400 6 V30 C400 62, 600 52, 600 96" className={styles.chosenPath} pathLength={1} />
          <circle cx="400" cy="6" r="5" className={styles.node} />
        </svg>
        <div className={styles.options}>
          <div className={`${styles.option} ${styles.rejected}`}>
            <p className="t-label">
              <Icon name="cross" size={14} /> Not chosen
            </p>
            <h4 className="t-heading-m">{f.rejected.label}</h4>
            <p className="t-body-s">{f.rejected.detail}</p>
          </div>
          <div className={`${styles.option} ${styles.chosen}`}>
            <p className="t-label">
              <Icon name="check" size={14} /> Chosen
            </p>
            <h4 className="t-heading-m">{f.chosen.label}</h4>
            <p className="t-body-s c-secondary">{f.chosen.detail}</p>
          </div>
        </div>
      </div>

      <div className={styles.why}>
        <p className="t-label c-tertiary">Why</p>
        <div className="prose">
          {f.why.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        {f.bullets && (
          <ul className={styles.bullets} data-count={f.bullets.length}>
            {f.bullets.map((b, i) => (
              <li key={b.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                <h5 className="t-heading-m">{b.title}</h5>
                <p className="t-body-s c-secondary">{b.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <aside className={styles.cost} data-reveal>
        <p className="t-label">What it cost</p>
        <p>{f.cost}</p>
      </aside>

      {children}
    </div>
  );
}
