import Link from "next/link";
import { capabilities, principles } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import styles from "./HowIWork.module.css";

/**
 * Method without the essay: five habits, each a link to the study where it
 * did the work, and the domains as labels. The reasoning lives in the studies.
 */
export function HowIWork() {
  return (
    <section id="how" className={`section ${styles.section}`} aria-labelledby="how-title">
      <div className="container">
        <h2 id="how-title" className="t-label c-tertiary" data-reveal>
          How I work
        </h2>
        <ol className={styles.habits} data-reveal>
          {principles.map((p, i) => {
            const c = caseStudies.find((x) => x.index === p.primary)!;
            return (
              <li key={p.title}>
                <Link href={`/work/${c.slug}`} className={styles.habit} data-accent={c.accent}>
                  <span className={`t-serif ${styles.num}`} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className={styles.habitTitle}>{p.title}</span>
                  <span className={`t-body-s c-tertiary ${styles.seen}`}>
                    <span className="t-mono c-accent">{c.index}</span> {c.short} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className={styles.where} data-reveal>
          <h3 className="t-label c-tertiary">Where I work</h3>
          <ul>
            {capabilities.map((c) => (
              <li key={c.title}>{c.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
