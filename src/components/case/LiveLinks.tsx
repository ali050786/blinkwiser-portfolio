import type { CaseStudy } from "@/content/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./LiveLinks.module.css";

/** A quiet panel pointing to the live product. */
export function LiveLinks({ live }: { live: NonNullable<CaseStudy["live"]> }) {
  return (
    <aside className={styles.panel} aria-label={`${live.title}, live`}>
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
