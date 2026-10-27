"use client";

import { useEffect } from "react";
import { caseStudies } from "@/content/case-studies";
import { useVisitedCases } from "@/lib/visited-cases";
import styles from "./CaseProgress.module.css";

export function CaseProgress({ currentSlug }: { currentSlug: string }) {
  const { visited, hydrated, hydrate, markVisited } = useVisitedCases();

  useEffect(hydrate, [hydrate]);
  useEffect(() => {
    if (hydrated) markVisited(currentSlug);
  }, [hydrated, currentSlug, markVisited]);

  const total = caseStudies.length;
  const remaining = total - visited.length;

  if (!hydrated) return null;

  return (
    <div className={styles.strip}>
      <div className={styles.dots} role="img" aria-label={`${visited.length} of ${total} stories read`}>
        {caseStudies.map((c) => (
          <span
            key={c.slug}
            className={`${styles.dot} ${visited.includes(c.slug) ? styles.done : styles.pending}`}
          />
        ))}
      </div>
      <span className={styles.label}>
        {remaining > 0 ? `${remaining} ${remaining === 1 ? "story" : "stories"} to go` : "All stories read"}
      </span>
    </div>
  );
}
