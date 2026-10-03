"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/motion";
import styles from "./FamilyReset.module.css";

const family = [
  { id: "dennis", name: "Dennis", role: "Member", locked: true },
  { id: "ana", name: "Ana", role: "Spouse" },
  { id: "maya", name: "Maya", role: "Child" },
  { id: "leo", name: "Leo", role: "Child" },
  { id: "ivy", name: "Ivy", role: "Child" },
  { id: "noor", name: "Noor", role: "Newborn" },
];
const dependents = family.filter((m) => !m.locked).length;

type Phase = "before" | "after";

/**
 * Hero proof for the enrollment case, readable at a glance and without motion:
 * the same cheaper-plan switch in the old flow and in the redesign, side by side.
 * Old: the family list on the plan resets. Redesign: the family stays.
 * Motion only replays the moment of the switch. Demo names and prices; no client screens.
 */
export function FamilyReset() {
  const reduce = useReducedMotionSafe();
  // Server render and reduced motion show the end state, so the point never depends on animation.
  const [phase, setPhase] = useState<Phase>("after");
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      setPhase("after");
      return;
    }
    setPhase("before");
    const t = window.setTimeout(() => setPhase("after"), 1400);
    return () => clearTimeout(t);
  }, [reduce, run]);

  const switched = phase === "after";

  const column = (kind: "old" | "new") => {
    const lost = kind === "old" && switched;
    return (
      <section className={styles.col} data-kind={kind} aria-label={kind === "old" ? "Old flow" : "Redesign"}>
        <p className={`t-label ${styles.colLabel}`}>{kind === "old" ? "Old flow" : "Redesign"}</p>
        <ul className={styles.list}>
          {family.map((m, i) => {
            const off = lost && !m.locked;
            return (
              <li key={m.id} className={styles.row} data-off={off || undefined}>
                <span className={styles.name}>
                  {m.name}
                  <span className={styles.role}>{m.role}</span>
                </span>
                <motion.span
                  key={`${off}-${run}`}
                  className={styles.state}
                  data-off={off || undefined}
                  initial={reduce || !switched ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: reduce ? 0 : i * 0.08 }}
                >
                  {off ? "Add +" : "✓"}
                </motion.span>
              </li>
            );
          })}
        </ul>
        <p className={styles.result} data-off={lost || undefined}>
          <span className={`tabular ${styles.count}`}>{switched ? (kind === "old" ? dependents : 0) : "\u00a0"}</span>
          <span className={styles.resultLabel}>
            family members to add back
          </span>
        </p>
      </section>
    );
  };

  return (
    <figure className={styles.card}>
      <header className={styles.head}>
        <p className={styles.title}>What happens when Dennis switches to a cheaper dental plan</p>
        <p className={styles.change}>
          <span className={styles.from}>Dental Plus $112/mo</span>
          <span aria-hidden="true" className={styles.arrow}>
            →
          </span>
          <span className={styles.to} data-active={!switched || undefined}>
            Dental Basic $74/mo
          </span>
        </p>
      </header>
      <div className={styles.cols}>
        {column("old")}
        {column("new")}
      </div>
      {!reduce && (
        <button type="button" className={styles.replay} onClick={() => setRun((r) => r + 1)}>
          ↻ Replay the switch
        </button>
      )}
    </figure>
  );
}
