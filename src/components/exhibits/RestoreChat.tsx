"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit } from "./Exhibit";
import { Icon } from "@/components/ui/Icon";
import styles from "./RestoreChat.module.css";

type Msg =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "agent"; text: string; checkpoint?: number; diff?: [string, string]; guard?: string };

const messages: Msg[] = [
  { id: "m1", role: "user", text: "Make slide 3 punchier." },
  { id: "m2", role: "agent", text: "Rewrote the headline on slide 3.", checkpoint: 1, diff: ["Handoffs add hidden wait time", "Every handoff is a queue."] },
  { id: "m3", role: "user", text: "Swap the stat on slide 5 for a newer one." },
  {
    id: "m4",
    role: "agent",
    text: "I couldn't change slide 5. There's no newer figure in your sources or the fact sheet, so the stat is unchanged.",
    guard: "Updated slide 5 with the latest statistic.",
  },
  { id: "m5", role: "user", text: "Make the whole deck more formal." },
  { id: "m6", role: "agent", text: "Adjusted the tone on slides 1–7.", checkpoint: 2, diff: ["Every handoff is a queue.", "Each handoff introduces a queue."] },
];

const deckAt = ["Handoffs add hidden wait time", "Every handoff is a queue.", "Each handoff introduces a queue."];

export function RestoreChat() {
  const [restored, setRestored] = useState<number>(2);
  const reduce = useReducedMotion();
  const cutIndex = messages.findIndex((m) => m.role === "agent" && m.checkpoint === restored);
  const isTrimmed = (i: number) => i > cutIndex;

  return (
    <Exhibit
      label="Interactive · restore points and the honesty guard"
      title="Every change is honest and reversible"
      caption="Restore an earlier point: later replies fade and are trimmed from the agent's memory, so it never reasons about changes that no longer exist."
      note="Demo conversation. Illustrative copy."
    >
      <div className={styles.layout}>
        <ol className={styles.chat} aria-label="Editing conversation">
          {messages.map((m, i) => (
            <motion.li
              key={m.id}
              className={styles.msg}
              data-role={m.role}
              data-trimmed={isTrimmed(i) || undefined}
              animate={{ opacity: isTrimmed(i) ? 0.38 : 1 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            >
              {m.role === "user" ? (
                <p className={styles.userBubble}>{m.text}</p>
              ) : (
                <div className={styles.agent}>
                  {m.guard && (
                    <p className={styles.guardRow}>
                      <span className={styles.guardBadge}>
                        <Icon name="shield" size={13} /> Honesty guard
                      </span>
                      <span className={styles.claim}>
                        Model claimed: <s>{m.guard}</s>
                      </span>
                    </p>
                  )}
                  <p>{m.text}</p>
                  {m.diff && (
                    <p className={styles.diff}>
                      <span className="t-label c-tertiary">Slide 3</span>
                      <del>{m.diff[0]}</del>
                      <ins>{m.diff[1]}</ins>
                    </p>
                  )}
                  {m.checkpoint !== undefined && (
                    <button
                      type="button"
                      className={styles.checkpoint}
                      aria-pressed={restored === m.checkpoint}
                      onClick={() => setRestored(m.checkpoint!)}
                    >
                      <Icon name="restore" size={14} />
                      {restored === m.checkpoint ? "Current restore point" : `Restore point ${m.checkpoint}`}
                    </button>
                  )}
                </div>
              )}
              {isTrimmed(i) && i === cutIndex + 1 && (
                <span className={`t-label ${styles.trimNote}`}>Trimmed from memory on your next message</span>
              )}
            </motion.li>
          ))}
          <li className={styles.composer} aria-hidden="true">
            <span>{restored === 2 ? "Ask for a change…" : "Your next message continues from restore point 1"}</span>
            <span className={styles.send}>
              <Icon name="arrow-right" size={14} />
            </span>
          </li>
        </ol>

        <div className={styles.side}>
          <div className={styles.slide}>
            <p className="t-label c-tertiary">Deck preview · slide 3 of 7</p>
            <div className={styles.slideCard}>
              <span className={styles.slideNum}>03</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={restored}
                  className={styles.slideHead}
                  initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(3px)" }}
                  transition={{ duration: 0.3 }}
                >
                  {deckAt[restored]}
                </motion.p>
              </AnimatePresence>
              <span className={styles.slideLines} aria-hidden="true">
                <i />
                <i />
              </span>
            </div>
          </div>

          <div className={styles.memory}>
            <p className="t-label c-tertiary">Agent memory</p>
            <ol>
              {messages.map((m, i) => (
                <li key={m.id} data-trimmed={isTrimmed(i) || undefined}>
                  <span className="t-mono">{m.role === "user" ? "you" : "agent"}</span>
                  <span className={styles.memText}>{m.text}</span>
                </li>
              ))}
            </ol>
          </div>
          {restored !== 2 && (
            <button type="button" className={styles.undo} onClick={() => setRestored(2)}>
              Back to the latest version
            </button>
          )}
        </div>
      </div>
    </Exhibit>
  );
}
