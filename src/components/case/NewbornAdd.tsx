"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/motion";
import styles from "./FamilyReset.module.css";

/** Old: add the baby, get a warning, then add her inside each coverage. New: one row on the who-needs-what grid. */
const oldSteps = [
  { id: "warn", label: "“Not enrolled in coverage”", kind: "warn" },
  { id: "med", label: "Medical plan page → Add Noor", kind: "todo" },
  { id: "den", label: "Dental plan page → Add Noor", kind: "todo" },
] as const;

/** Trips back into a coverage after adding her; the warning is not a trip. */
const stepNo = { med: 1, den: 2 } as const;

const grid = [
  { name: "Dennis", m: true, d: true, v: true },
  { name: "Ana", m: true, d: true, v: true },
  { name: "Noor", m: true, d: true, v: false, isNew: true },
];

export function NewbornAdd() {
  const reduce = useReducedMotionSafe();
  const [done, setDone] = useState(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) return setDone(true);
    setDone(false);
    const t = window.setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, [reduce, run]);

  return (
    <figure className={styles.card}>
      <header className={styles.head}>
        <p className={styles.title}>What it takes to cover Noor, his newborn</p>
        <p className={styles.change}>
          <span className={styles.to}>Medical</span>
          <span className={styles.to}>Dental</span>
        </p>
      </header>
      <div className={styles.cols}>
        <section className={styles.col} data-kind="old" aria-label="Old flow">
          <p className={`t-label ${styles.colLabel}`}>Old flow</p>
          <ol className={styles.list}>
            {oldSteps.map((s, i) => (
              <motion.li
                key={`${s.id}-${run}`}
                className={styles.row}
                data-off={s.kind === "warn" || undefined}
                initial={reduce || !done ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: reduce ? 0 : i * 0.18 }}
              >
                <span className={styles.name}>{s.label}</span>
                <span className={styles.state} data-off={s.kind === "warn" || undefined}>
                  {s.kind === "warn" ? "!" : stepNo[s.id as keyof typeof stepNo]}
                </span>
              </motion.li>
            ))}
          </ol>
          <p className={styles.result} data-off={done || undefined}>
            <span className={`tabular ${styles.count}`}>{done ? 2 : "\u00a0"}</span>
            <span className={styles.resultLabel}>extra trips, one per coverage, to cover her</span>
          </p>
        </section>
        <section className={styles.col} data-kind="new" aria-label="Redesign">
          <p className={`t-label ${styles.colLabel}`}>Redesign</p>
          <div className={styles.miniGrid} role="table" aria-label="Who needs what">
            <div className={styles.gridRow} role="row">
              <span role="columnheader" />
              {["Med", "Den", "Vis"].map((h) => (
                <span key={h} role="columnheader" className={styles.gridHead}>
                  {h}
                </span>
              ))}
            </div>
            {grid.map((p) => (
              <div key={p.name} className={styles.gridRow} role="row" data-new={p.isNew || undefined}>
                <span role="rowheader" className={styles.name}>
                  {p.name}
                  {p.isNew && <span className={styles.role}>new</span>}
                </span>
                {[p.m, p.d, p.v].map((on, j) => (
                  <span key={j} role="cell" className={styles.box} data-on={(on && (!p.isNew || done)) || undefined}>
                    {on && (!p.isNew || done) ? "✓" : ""}
                  </span>
                ))}
              </div>
            ))}
            <span className={styles.addBtn}>+ Add dependent</span>
          </div>
          <p className={styles.result}>
            <span className={`tabular ${styles.count}`}>{done ? 0 : "\u00a0"}</span>
            <span className={styles.resultLabel}>extra trips: ticked in the row where he added her</span>
          </p>
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
