import Link from "next/link";
import { principles, capabilities } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import styles from "./Approach.module.css";

export function Approach() {
  return (
    <section id="approach" className={`section ${styles.section}`} aria-labelledby="approach-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside}>
          <p className="t-label c-tertiary" data-reveal>
            Approach
          </p>
          <h2 id="approach-title" className="t-display-m" data-reveal>
            How I decide, <em className="t-serif-em c-accent">before</em> I design.
          </h2>
          <p className="c-secondary" data-reveal>
            AI can now produce the artifact. It can&apos;t produce the reasoning. These five habits show up in every study, and each links
            to where it did the work.
          </p>
        </div>

        <ol className={styles.list}>
          {principles.map((p, i) => (
            <li key={p.title} className={styles.item} data-reveal>
              <span className={`t-serif ${styles.num}`} aria-hidden="true">
                {i + 1}
              </span>
              <div className={styles.body}>
                <h3 className="t-heading-l">{p.title}</h3>
                <p className="c-secondary">{p.body}</p>
                <p className={styles.refs}>
                  <span className="t-label c-tertiary">Seen in</span>
                  {p.refs.map((r) => {
                    const c = caseStudies.find((x) => x.index === r)!;
                    return (
                      <Link key={r} href={`/work/${c.slug}`} className={styles.ref} data-accent={c.accent}>
                        <span className="t-mono">{c.index}</span> {c.short}
                      </Link>
                    );
                  })}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={`container ${styles.caps}`}>
        <div className={styles.capsHead}>
          <p className="t-label c-tertiary" data-reveal>
            Where I work
          </p>
          <h2 className="t-heading-l" data-reveal>
            Health insurance, design systems and AI: domains where errors are expensive.
          </h2>
        </div>
        <ul className={styles.capGrid}>
          {capabilities.map((c, i) => (
            <li key={c.title} className={styles.cap} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
              <span className={`t-mono c-tertiary ${styles.capIndex}`}>0{i + 1}</span>
              <h3 className="t-heading-m">{c.title}</h3>
              <ul>
                {c.items.map((it) => (
                  <li key={it} className="t-body-s c-secondary">
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
