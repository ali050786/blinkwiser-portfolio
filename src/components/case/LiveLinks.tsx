import type { CaseStudy } from "@/content/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Cross } from "@/components/home/Section";
import styles from "./LiveLinks.module.css";

/** A framed panel pointing to the live product, in the same frame language as the home page's call box. */
export function LiveLinks({ live }: { live: NonNullable<CaseStudy["live"]> }) {
  return (
    <aside className={styles.panel} aria-label={`${live.title}, live`}>
      <Cross className={styles.c1} />
      <Cross className={styles.c2} />
      <Cross className={styles.c3} />
      <Cross className={styles.c4} />
      <div className={styles.copy}>
        <p className={`t-label ${styles.label}`}>
          <span className={styles.dot} aria-hidden="true" /> Live now
        </p>
        <p className={`t-heading-m ${styles.title}`}>{live.title}</p>
        <p className="t-body-s c-secondary">{live.note}</p>
      </div>
      <div className={styles.actions}>
        {live.links.map((l, i) => (
          <ButtonLink key={l.href} href={l.href} external variant={i === 0 ? "primary" : "secondary"} icon="arrow-up-right">
            {l.label}
          </ButtonLink>
        ))}
      </div>
    </aside>
  );
}
