import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { deck, type CaseSlug } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import styles from "./NextCase.module.css";

/**
 * The next case, shown as its card from the home page: the case's tint, a real
 * screen and its opening line, so moving between cases feels like moving along
 * the same deck.
 */
export function NextCase({ study: c }: { study: CaseStudy }) {
  const m = deck[c.slug as CaseSlug];
  return (
    <nav aria-label="Next case study" className={`container ${styles.wrap}`}>
      <Link href={`/work/${c.slug}`} className={styles.card}>
        <div className={styles.copy}>
          <p className="t-label">
            <span className="c-tertiary">Next case · </span>
            <span className="c-accent">{m.domain}</span>
          </p>
          <p className={`t-display-m ${styles.title}`}>{c.title}</p>
          <p className="c-secondary">{m.outcome}</p>
          <span className={styles.cta}>
            Read the story <Icon name="arrow-right" size={16} />
          </span>
        </div>
        <div className={styles.deckCard} style={{ background: `var(--deck-tint-${m.tint})` }} aria-hidden="true">
          <div className={styles.opening}>
            <p className={styles.openingLabel}>Where it started</p>
            <p className={styles.openingLine}>{m.opening}</p>
          </div>
          <div className={styles.shot} data-fit={m.fit ?? "cover"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.img} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </Link>
    </nav>
  );
}
