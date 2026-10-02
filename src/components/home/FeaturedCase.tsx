"use client";

import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { ScreenView } from "@/components/screens";
import { Icon } from "@/components/ui/Icon";
import styles from "./FeaturedCase.module.css";

/**
 * The one study the home page exists to get opened. It passes four checks at
 * a glance: names the work, shows the role, states one hard outcome, and shows
 * a real, dense screen. The whole card is the link.
 */
export function FeaturedCase({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/work/${study.slug}`} className={styles.card} data-accent={study.accent} data-reveal>
      <div className={styles.text}>
        <p className={`t-label ${styles.kicker}`}>
          {study.index} · Featured case study
        </p>
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
          <span className="t-label c-tertiary">Role</span>
          <span>Founding UX Designer → UX Lead</span>
        </p>

        <span className={styles.cta}>
          Read the case study <Icon name="arrow-right" size={18} />
        </span>
      </div>

      <div className={styles.visual}>
        <ScreenView
          id="new-household"
          alt="The redesigned enrollment step: every family member against Medical, Dental, Vision and Supplemental, answered once."
        />
      </div>
    </Link>
  );
}
