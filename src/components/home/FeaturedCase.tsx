"use client";

import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { Icon } from "@/components/ui/Icon";
import styles from "./FeaturedCase.module.css";

/**
 * The one study the home page exists to get opened. It passes four checks at
 * a glance: names the work, shows the role, states one hard outcome, and shows
 * the work moving: a silent loop of the case study's trailer. The whole card
 * is clickable through a stretched link, so the video's pause button can sit
 * inside it without nesting a button in a link.
 */
export function FeaturedCase({ study }: { study: CaseStudy }) {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <p className={`t-eyebrow ${styles.kicker}`}>Featured case study</p>
        <h3 className={`t-display-m ${styles.title}`}>US health-insurance enrollment</h3>
        <ul className={styles.audiences} aria-label="Used by">
          <li>Insurers</li>
          <li>Employers</li>
          <li>Members</li>
        </ul>

        <div className={styles.outcome}>
          <span className={`tabular ${styles.big}`}>9 → 5</span>
          <span className={styles.steps} aria-hidden="true">
            <span className={styles.dots} data-n="9">
              {Array.from({ length: 9 }, (_, i) => (
                <i key={i} />
              ))}
            </span>
            <span className={styles.dots} data-n="5">
              {Array.from({ length: 5 }, (_, i) => (
                <i key={i} />
              ))}
            </span>
          </span>
          <span className={`t-body-s c-secondary ${styles.outcomeLabel}`}>enrollment steps, live in production</span>
        </div>

        <p className={styles.role}>
          <span className="t-eyebrow c-tertiary">Role</span>
          <span>Founding UX Designer → UX Lead</span>
        </p>

        <Link href={`/work/${study.slug}`} className={styles.cta}>
          Read the case study <Icon name="arrow-right" size={18} />
        </Link>
      </div>

      <div className={styles.visual} data-video>
        <AutoVideo
          src="/work/enrollment/trailer-silent.mp4"
          poster="/work/enrollment/trailer-poster.webp"
          label="Trailer of the enrollment redesign: Dennis adds his newborn and hits five problems in the old flow, then the same tasks in the redesign, where each one is fixed."
        />
      </div>
    </div>
  );
}
