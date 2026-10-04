"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { CountUp } from "@/components/motion/CountUp";
import type { Accent } from "@/content/types";
import styles from "./ProofStrip.module.css";

export type ProofItem = {
  key: string;
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
  /** Show this text instead of an animated number. */
  text?: string;
  study: { index: string; slug: string; accent?: Accent; title: string };
};

/** The outcome row: one number per study, each linking to its case. */
export function ProofList({ items }: { items: ProofItem[] }) {
  const reduce = useReducedMotion();

  return (
    <ul className={styles.list}>
      {items.map((p, i) => (
        <motion.li
          key={p.key}
          layout={reduce ? false : "position"}
          transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
          className={styles.item}
          data-accent={p.study.accent}
        >
          <div className={styles.inner} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
            {p.text ? (
              <p className={`${styles.value} ${styles.valueText}`}>{p.text}</p>
            ) : (
              <p className={`${styles.value} tabular`}>
                <span className={styles.affix}>{p.prefix}</span>
                <CountUp to={p.value} decimals={p.decimals} />
                <span className={styles.affix}>{p.suffix}</span>
              </p>
            )}
            <p className={`t-body-s c-secondary ${styles.label}`}>{p.label}</p>
            <Link href={`/work/${p.study.slug}`} className={`t-label ${styles.link}`}>
              Case {p.study.index} <span aria-hidden="true">→</span>
              <span className="sr-only">: {p.study.title}</span>
            </Link>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
