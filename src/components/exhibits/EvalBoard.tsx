"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit, Segmented } from "./Exhibit";
import styles from "./EvalBoard.module.css";

type Tab = "versions" | "reasoning";
type Row = {
  metric: string;
  a: { label: string; value: number; display: string };
  b: { label: string; value: number; display: string };
  max: number;
  lowerIsBetter?: boolean;
  note?: string;
};

const data: Record<Tab, { rows: Row[]; summary: string }> = {
  versions: {
    summary: "v2 (grounded pipeline) against v1 (prompt-only), 10 golden cases, blind judge.",
    rows: [
      { metric: "Accuracy, scored against evidence", a: { label: "v2", value: 9.5, display: "9.5" }, b: { label: "v1", value: 8.8, display: "8.8" }, max: 10 },
      {
        metric: "Flow",
        a: { label: "v2", value: 7.5, display: "7.5" },
        b: { label: "v1", value: 8.4, display: "8.4" },
        max: 10,
        note: "v1 still wins here. It's the next fix.",
      },
    ],
  },
  reasoning: {
    summary: "Same v2 pipeline with the model's hidden reasoning switched off versus on.",
    rows: [
      { metric: "Judged quality", a: { label: "Off", value: 8.0, display: "8.0" }, b: { label: "On", value: 8.1, display: "8.1" }, max: 10, note: "Level within noise" },
      { metric: "Seconds per deck", a: { label: "Off", value: 31, display: "31 s" }, b: { label: "On", value: 84, display: "84 s" }, max: 84, lowerIsBetter: true },
      { metric: "Relative cost per deck", a: { label: "Off", value: 0.5, display: "about half" }, b: { label: "On", value: 1, display: "full" }, max: 1, lowerIsBetter: true },
    ],
  },
};

export function EvalBoard() {
  const [tab, setTab] = useState<Tab>("versions");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const d = data[tab];
  const show = inView || reduce;

  return (
    <Exhibit
      label="Interactive · blind eval harness"
      title="Trade-offs settled by evidence, not taste"
      caption={d.summary}
      note="Scores from my own harness and an AI judge, not from users."
      controls={
        <Segmented<Tab>
          label="Comparison"
          value={tab}
          onChange={setTab}
          options={[
            { value: "versions", label: "v2 vs v1" },
            { value: "reasoning", label: "Reasoning off vs on" },
          ]}
        />
      }
    >
      <div ref={ref} className={styles.board}>
        {tab === "versions" && (
          <div className={styles.h2h}>
            <p className="t-label c-tertiary">Head-to-head, 10 cases</p>
            <ol className={styles.dots} aria-label="v2 wins 7 of 10 head-to-head comparisons">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.li
                  key={i}
                  data-win={i < 7 || undefined}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={show ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: reduce ? 0 : 0.05 * i, type: "spring", stiffness: 400, damping: 22 }}
                />
              ))}
            </ol>
            <p className={styles.h2hValue}>
              <span className="tabular">7</span> / 10 <span className="t-body-s c-secondary">v2 wins</span>
            </p>
          </div>
        )}

        <div className={styles.rows}>
          {d.rows.map((r) => {
            const aWins = r.lowerIsBetter ? r.a.value < r.b.value : r.a.value > r.b.value;
            const tie = Math.abs(r.a.value - r.b.value) <= 0.1 * (r.max / 10) && !r.lowerIsBetter;
            return (
              <div key={`${tab}-${r.metric}`} className={styles.row}>
                <p className={styles.metric}>
                  {r.metric}
                  {r.lowerIsBetter && <span className="t-label c-tertiary"> · lower is better</span>}
                </p>
                {[r.a, r.b].map((s, si) => {
                  const win = tie ? false : si === 0 ? aWins : !aWins;
                  return (
                    <div key={s.label} className={styles.bar} data-win={win || undefined}>
                      <span className={`t-mono ${styles.who}`}>{s.label}</span>
                      <span className={styles.track}>
                        <motion.span
                          className={styles.fill}
                          initial={reduce ? false : { width: 0 }}
                          animate={{ width: show ? `${Math.max(1.5, (s.value / r.max) * 100)}%` : 0 }}
                          transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1], delay: si * 0.12 }}
                        />
                      </span>
                      <span className={`tabular ${styles.val}`}>{s.display}</span>
                    </div>
                  );
                })}
                {r.note && <p className={`t-body-s ${styles.note}`}>{r.note}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </Exhibit>
  );
}
