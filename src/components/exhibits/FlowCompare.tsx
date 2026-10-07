"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit, Segmented } from "./Exhibit";
import styles from "./FlowCompare.module.css";

type View = "before" | "after";
export type Node = { id: string; label: string; who?: boolean; loop?: boolean; note?: string };

export const before: Node[] = [
  { id: "date", label: "Effective date" },
  { id: "profile", label: "Profile" },
  { id: "h1", label: "Household list", who: true },
  { id: "h2", label: "Add member", who: true },
  { id: "h3", label: "Updated list", who: true },
  { id: "hub", label: "Coverage hub", loop: true },
  { id: "plans", label: "Browse, pick a plan", loop: true },
  { id: "members", label: "Who does it cover?", loop: true, who: true },
  { id: "confirm", label: "Confirm", note: "annual estimate" },
];

export const after: Node[] = [
  { id: "welcome", label: "Welcome" },
  { id: "profile", label: "Profile" },
  { id: "deps", label: "Dependents" },
  { id: "coverage", label: "Coverage", who: true, note: "who needs what, once" },
  { id: "review", label: "Review", note: "editable, one page" },
];

export function FlowCompare() {
  const [view, setView] = useState<View>("before");
  const reduce = useReducedMotion();
  const nodes = view === "before" ? before : after;
  const loopStart = nodes.findIndex((n) => n.loop);

  const stats =
    view === "before"
      ? [
          ["Steps", "9"],
          ["“Who's covered?” asked", "1 + once per coverage"],
          ["Cost shown", "at the end, as an estimate"],
        ]
      : [
          ["Steps", "5"],
          ["“Who's covered?” asked", "once"],
          ["Cost shown", "every step, per month or paycheck"],
        ];

  const renderNode = (n: Node, i: number) => (
    <motion.li
      key={n.id}
      layout={!reduce}
      layoutId={reduce ? undefined : `flow-${n.id}`}
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={styles.node}
      data-who={n.who || undefined}
    >
      <span className={`t-mono ${styles.num}`}>{String(i + 1).padStart(2, "0")}</span>
      <span className={styles.label}>{n.label}</span>
      {n.note && <span className={`t-body-s ${styles.note}`}>{n.note}</span>}
    </motion.li>
  );

  return (
    <Exhibit
      label="Interactive · flow map"
      title="Same decisions, reordered"
      caption="Highlighted steps ask who is covered. Before, members answered it for the household and again inside every coverage."
      note="Redrawn and simplified flow map. Not the shipped screens."
      controls={
        <Segmented<View>
          label="Flow version"
          value={view}
          onChange={setView}
          options={[
            { value: "before", label: "Before · 9 steps" },
            { value: "after", label: "After · 5 steps" },
          ]}
        />
      }
    >
      <LayoutGroup>
        <ol className={styles.flow} aria-label={`${view === "before" ? "Before" : "After"}: ${nodes.map((n) => n.label).join(", ")}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            {nodes.map((n, i) => {
              if (n.loop && i === loopStart) {
                const loopNodes = nodes.filter((x) => x.loop);
                return (
                  <motion.li
                    key="loop"
                    layout={!reduce}
                    className={styles.loop}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className={`t-label ${styles.loopTag}`}>↺ Repeat per coverage: medical, dental, vision</span>
                    <ol>{loopNodes.map((ln) => renderNode(ln, nodes.indexOf(ln)))}</ol>
                  </motion.li>
                );
              }
              if (n.loop) return null;
              return renderNode(n, i);
            })}
          </AnimatePresence>
        </ol>
      </LayoutGroup>

      <dl className={styles.stats}>
        {stats.map(([k, v]) => (
          <div key={k}>
            <dt className="t-label c-tertiary">{k}</dt>
            <AnimatePresence mode="wait" initial={false}>
              <motion.dd key={v} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                {v}
              </motion.dd>
            </AnimatePresence>
          </div>
        ))}
      </dl>
    </Exhibit>
  );
}
