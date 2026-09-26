"use client";

import { AnimatePresence, motion } from "motion/react";
import styles from "./ThemeCascade.module.css";

/*
 * The white-label app as the theming exhibit renders it: a web screen and a
 * phone, both driven only by tokens.
 */

export const insurers = {
  a: { name: "Brand A", primary: "#1E59CD", accent: "#0096A8", radius: 10 },
  b: { name: "Brand B", primary: "#006D45", accent: "#B98A00", radius: 3 },
  c: { name: "Brand C", primary: "#BA2936", accent: "#3A75BF", radius: 18 },
} as const;
export type InsurerId = keyof typeof insurers;

export const employer = { name: "Employer Co.", accent: "#8951BF" };

type Props = {
  ins: InsurerId;
  cobrand?: boolean;
  compact?: boolean;
  large?: boolean;
  reduce?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function ThemeDevices({
  ins,
  cobrand = false,
  compact = false,
  large = false,
  reduce = false,
  className,
  style,
}: Props) {
  const b = insurers[ins];
  const vars = {
    "--t-primary": b.primary,
    "--t-accent": cobrand ? employer.accent : b.accent,
    "--t-radius": `${b.radius}px`,
    "--t-pad": compact ? "8px" : "14px",
    "--t-gap": compact ? "6px" : "10px",
    "--t-scale": large ? 1.15 : 1,
  } as React.CSSProperties;

  return (
    <div
      className={`${styles.previews} ${className ?? ""}`}
      style={{ ...vars, ...style } as React.CSSProperties}
      aria-label={`Preview: ${b.name}${cobrand ? " co-branded with Employer Co." : ""}`}
      role="img"
    >
      <div className={styles.web}>
        <div className={styles.webBar}>
          <span className={styles.logo}>{b.name.slice(-1)}</span>
          <b>{b.name} Health</b>
          <AnimatePresence>
            {cobrand && (
              <motion.span
                className={styles.cobrand}
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
              >
                × {employer.name}
              </motion.span>
            )}
          </AnimatePresence>
          <span className={styles.nav}>
            <i data-on /> <i /> <i />
          </span>
        </div>
        <div className={styles.webBody}>
          <p className={styles.hello}>Your benefits, 2027</p>
          <div className={styles.cardsRow}>
            {[
              ["Medical", "Silver PPO", "$142"],
              ["Dental", "Plus", "$27"],
              ["Vision", "Standard", "$6"],
            ].map(([k, p, v], i) => (
              <div
                key={k}
                className={styles.card}
                data-hi={i === 0 || undefined}
               
              >
                <span className={styles.kicker}>{k}</span>
                <span className={styles.planName}>{p}</span>
                <span className={styles.amount}>
                  {v}
                  <em>/mo</em>
                </span>
                {i === 0 && <span className={styles.badge}>Current plan</span>}
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <span className={styles.secondary}>
              View details
            </span>
            <span className={styles.primary}>
              Start enrollment
            </span>
          </div>
        </div>
      </div>

      <div className={styles.phone}>
        <div className={styles.notch} />
        <div className={styles.phoneBar}>
          <span className={styles.logo}>{b.name.slice(-1)}</span>
          {cobrand && <span className={styles.cobrandSm}>× Employer</span>}
        </div>
        <p className={styles.hello}>Hi, Sam</p>
        <div className={styles.card} data-hi>
          <span className={styles.kicker}>Medical</span>
          <span className={styles.planName}>Silver PPO</span>
          <span className={styles.badge}>Current plan</span>
        </div>
        <div className={styles.card}>
          <span className={styles.kicker}>Dental</span>
          <span className={styles.planName}>Plus</span>
        </div>
        <span className={`${styles.primary} ${styles.block}`}>
          Start enrollment
        </span>
      </div>
    </div>
  );
}
