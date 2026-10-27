"use client";

import { useEffect } from "react";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import type { CaseStudy } from "@/content/types";
import { deck, type CaseSlug } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { useVisitedCases } from "@/lib/visited-cases";
import { CaseProgress } from "./CaseProgress";
import styles from "./NextCase.module.css";

export function NextCase({ study: fallback, currentSlug }: { study: CaseStudy; currentSlug: string }) {
  const { visited, hydrated, hydrate } = useVisitedCases();
  useEffect(hydrate, [hydrate]);

  const unread = hydrated
    ? caseStudies.filter((c) => c.slug !== currentSlug && !visited.includes(c.slug))
    : [];
  const c = unread.length > 0 ? unread[0]! : fallback;

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
          {c.teaser && <p className={styles.teaser}>{c.teaser}</p>}
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
      <CaseProgress currentSlug={currentSlug} />
    </nav>
  );
}
