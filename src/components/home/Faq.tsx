import Link from "next/link";
import { faq } from "@/content/home";
import { RevealHeading } from "./RevealHeading";
import s from "./Section.module.css";
import styles from "./Faq.module.css";

/** Questions a hiring manager tends to ask, as native disclosure widgets. The first one starts open. */
export function Faq() {
  return (
    <section className={`${s.section} ${styles.section}`} aria-labelledby="faq-title">
      <div className={s.wrap}>
        <RevealHeading id="faq-title" text="Questions you might have" />
        <div className={styles.list}>
          {faq.map((f, i) => (
            <details key={f.q} className={styles.item} open={i === 0}>
              <summary className={styles.q}>
                <span>{f.q}</span>
                <span className={styles.sign} aria-hidden="true" />
              </summary>
              <div className={styles.a}>
                <p>{f.a}</p>
                {f.link && (
                  <p>
                    <Link href={f.link.href} className={styles.link}>
                      {f.link.label}
                    </Link>
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
