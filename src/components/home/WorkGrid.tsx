"use client";

import Link from "next/link";
import type { Shot } from "@/content/types";
import { ShotMedia } from "@/components/screens/ShotMedia";
import { Icon } from "@/components/ui/Icon";
import styles from "./WorkGrid.module.css";

export type WorkCard = {
  slug: string;
  index: string;
  domain: string;
  title: string;
  outcome: { value: string; label: string };
  role: string;
  timeline: string;
  visual: Shot;
};

/**
 * The studies after the featured one, as equal cards: the real screen, what
 * it is, one outcome, and the role. Everything is visible without hover; the
 * whole card is the link. The brief and the call live in the hero, not here.
 */
export function WorkGrid({ items }: { items: WorkCard[] }) {
  return (
    <ul className={styles.grid}>
      {items.map((c) => (
        <li key={c.slug}>
          <Link href={`/work/${c.slug}`} className={styles.card}>
            <div className={styles.visual}>
              <div className={styles.frame}>
                <ShotMedia shot={c.visual} />
              </div>
            </div>
            <div className={styles.body}>
              <p className={`t-eyebrow ${styles.kicker}`}>{c.domain}</p>
              <h3 className={`t-heading-l ${styles.title}`}>{c.title}</h3>
              <p className={styles.outcome}>
                {c.outcome.value && <span className={`tabular ${styles.value}`}>{c.outcome.value}</span>}
                <span className={`t-body-s c-secondary ${styles.label}`}>{c.outcome.label}</span>
              </p>
              <div className={styles.foot}>
                <span className="t-body-s c-tertiary">
                  {c.role} · {c.timeline}
                </span>
                <span className={styles.cta}>
                  Read <Icon name="arrow-right" size={16} />
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
