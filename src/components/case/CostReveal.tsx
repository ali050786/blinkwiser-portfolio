"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/lib/motion";
import styles from "./FamilyReset.module.css";

/** Demo prices from the redesign's design file; the old flow shows the same plans as annual estimates. */
const plans = [
  { cov: "Medical", month: 73.22 },
  { cov: "Dental", month: 100 },
  { cov: "Vision", month: 60 },
];
const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function CostReveal() {
  const reduce = useReducedMotionSafe();
  const [picked, setPicked] = useState(plans.length);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      setPicked(plans.length);
      return;
    }
    setPicked(0);
    const timers = plans.map((_, i) => window.setTimeout(() => setPicked(i + 1), 500 + i * 700));
    return () => timers.forEach(clearTimeout);
  }, [reduce, run]);

  return (
    <figure className={styles.card}>
      <header className={styles.head}>
        <p className={styles.title}>What Dennis sees about cost, screen by screen</p>
        <p className={styles.change}>
          <span className={styles.to}>Medical</span>
          <span aria-hidden="true" className={styles.arrow}>→</span>
          <span className={styles.to}>Dental</span>
          <span aria-hidden="true" className={styles.arrow}>→</span>
          <span className={styles.to}>Vision</span>
          <span className="c-tertiary">one screen each</span>
        </p>
      </header>
      <div className={styles.cols} data-stack-narrow>
        <section className={styles.col} data-kind="old" aria-label="Old flow">
          <p className={`t-label ${styles.colLabel}`}>Old flow</p>
          <ol className={styles.screens}>
            {plans.map((p, i) => (
              <li key={p.cov} className={styles.screen} data-dim={i >= picked || undefined}>
                <div className={styles.screenBar}>
                  <span className={styles.stepNo}>Screen {i + 1}</span>
                  <span className={styles.cart} data-empty>
                    <span className={styles.cartValue}>no total</span>
                  </span>
                </div>
                <p className={styles.screenBody}>
                  <span>{p.cov}</span>
                  <span className={styles.price}>{usd(p.month * 12)}/yr est.</span>
                </p>
              </li>
            ))}
          </ol>
          <p className={styles.resultLabel}>Each coverage on its own screen, priced as an annual estimate. Nothing adds them up.</p>
        </section>
        <section className={styles.col} data-kind="new" aria-label="Redesign">
          <p className={`t-label ${styles.colLabel}`}>Redesign</p>
          <ol className={styles.screens}>
            {plans.map((p, i) => {
              const running = plans.slice(0, i + 1).reduce((sum, x) => sum + x.month, 0);
              return (
                <li key={p.cov} className={styles.screen} data-dim={i >= picked || undefined}>
                  <div className={styles.screenBar}>
                    <span className={styles.stepNo}>Screen {i + 1}</span>
                    <span className={styles.cart} data-live={i < picked || undefined}>
                      <span className={styles.cartIcon} aria-hidden="true">$</span>
                      <span className={`tabular ${styles.cartValue}`}>
                        {usd(i < picked ? running : 0)} <span className={styles.per}>/mo</span>
                      </span>
                    </span>
                  </div>
                  <p className={styles.screenBody}>
                    <span>{p.cov}</span>
                    <span className={styles.price}>+ {usd(p.month)}/mo</span>
                  </p>
                </li>
              );
            })}
          </ol>
          <p className={styles.resultLabel}>Still one screen per coverage, but the cart carries the monthly total across every screen.</p>
        </section>
      </div>
      {!reduce && (
        <button type="button" className={styles.replay} onClick={() => setRun((r) => r + 1)}>
          ↻ Replay
        </button>
      )}
    </figure>
  );
}
