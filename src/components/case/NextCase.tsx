import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { Glyph } from "@/components/ui/Glyph";
import { Icon } from "@/components/ui/Icon";
import styles from "./NextCase.module.css";

export function NextCase({ study: c }: { study: CaseStudy }) {
  return (
    <nav aria-label="Next case study" className={`container ${styles.wrap}`}>
      <Link href={`/work/${c.slug}`} className={styles.card}>
        <div className={styles.copy}>
          <p className="t-label">
            <span className="c-tertiary">Next case · </span>
            <span className="c-accent">{c.index}</span>
          </p>
          <p className={`t-display-m ${styles.title}`}>{c.title}</p>
          <p className="c-secondary">{c.snapshot.frame}</p>
          <span className={styles.cta}>
            Read case {c.index} <Icon name="arrow-right" size={16} />
          </span>
        </div>
        <div className={styles.glyph}>
          <Glyph id={c.glyph} />
        </div>
      </Link>
    </nav>
  );
}
