import type { CaseStudy } from "@/content/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./LiveLinks.module.css";

/** A plain panel pointing to the product, without a status badge. */
export function LiveLinks({ live }: { live: NonNullable<CaseStudy["live"]> }) {
  return (
    <aside className={styles.panel} aria-label={live.title}>
      <div className={styles.copy}>
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
