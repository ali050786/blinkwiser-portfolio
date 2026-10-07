"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CaseStudy, HeroVisualId } from "@/content/types";
import { useReducedMotionSafe } from "@/lib/motion";
import { FamilyReset } from "./FamilyReset";
import { NewbornAdd } from "./NewbornAdd";
import { CostReveal } from "./CostReveal";
import { AuditDrift, LinkColour, SaveSide } from "./DsProofs";
import styles from "./HeroStories.module.css";

const visuals: Record<HeroVisualId, React.ComponentType> = {
  newborn: NewbornAdd,
  "plan-switch": FamilyReset,
  cost: CostReveal,
  "save-side": SaveSide,
  "link-colour": LinkColour,
  audit: AuditDrift,
};

type Opener = NonNullable<CaseStudy["opener"]>;

/**
 * Story-first case hero: labelled tabs (all visible, no auto-rotation), each a
 * short story with the old system's own words on the left and a side-by-side
 * proof on the right.
 */
export function HeroStories({ opener, compact }: { opener: Opener; compact?: boolean }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionSafe();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = opener.stories[active]!;
  const Visual = visuals[s.visual];

  const go = (i: number) => {
    const n = (i + opener.stories.length) % opener.stories.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -8 },
    transition: { duration: 0.25 },
  } as const;

  return (
    <div className={styles.wrap} data-compact={compact || undefined}>
      <div role="tablist" aria-label={opener.label ?? "Three moments from one enrollment"} className={styles.tabs}>
        {opener.stories.map((st, i) => (
          <button
            key={st.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`story-tab-${st.id}`}
            aria-selected={i === active}
            aria-controls={`story-panel-${st.id}`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") (e.preventDefault(), go(active + 1));
              if (e.key === "ArrowLeft") (e.preventDefault(), go(active - 1));
            }}
          >
            {st.tab}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`story-panel-${s.id}`} aria-labelledby={`story-tab-${s.id}`} className={styles.grid}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={s.id} className={styles.copy} {...fade}>
            <p className={`t-display-l ${styles.story}`}>{s.story}</p>
            {s.quoteEmpty && (
              <figure className={styles.quote}>
                <p className={styles.emptyField}>
                  <span className="t-label c-tertiary">{s.quoteEmpty.field}</span>
                  <span className={styles.emptyBox} role="img" aria-label="empty" />
                </p>
                {s.quoteSource && <figcaption className="t-label c-tertiary">{s.quoteSource}</figcaption>}
              </figure>
            )}
            {s.quote && (
              <blockquote className={styles.quote}>
                <p>“{s.quote}”</p>
                {s.quoteSource && <footer className="t-label c-tertiary">{s.quoteSource}</footer>}
              </blockquote>
            )}
            <p className={`t-body-l c-secondary ${styles.caption}`}>{s.caption}</p>
          </motion.div>
        </AnimatePresence>
        <div className={styles.proof}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={s.id} {...fade}>
              <Visual />
            </motion.div>
          </AnimatePresence>
          <p className="t-label c-tertiary">{opener.note}</p>
        </div>
      </div>
    </div>
  );
}
