"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import type { Shot } from "@/content/types";
import type { ScreenStage } from "@/content/screens";
import { Exhibit } from "./Exhibit";
import { ShotMedia } from "@/components/screens/ShotMedia";
import styles from "./ScreenSet.module.css";

const NOTE = "Rebuilt in HTML from the design files. Demo brand; names and figures invented.";

type Props = {
  label: string;
  title: string;
  caption?: string;
  stages: ScreenStage[];
  /** Footnote under the exhibit; defaults to the rebuilt-screens note. */
  note?: string;
};

/**
 * Product screens, stage by stage. With `before` shots it is a before/after
 * comparison; without, a guided tour. Any screen opens full size.
 */
export function ScreenSet({ label, title, caption, stages, note = NOTE }: Props) {
  const [active, setActive] = useState(stages[0]!.id);
  const [zoom, setZoom] = useState<Shot | null>(null);
  const reduce = useReducedMotion();
  const tabsId = useId();
  const stage = stages.find((s) => s.id === active) ?? stages[0]!;
  const compare = Boolean(stage.before?.length);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = stages.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(stages[next]!.id);
    document.getElementById(`${tabsId}-tab-${stages[next]!.id}`)?.focus();
  };

  return (
    <Exhibit label={label} title={title} caption={caption} note={note}>
      <div className={styles.tabs} role="tablist" aria-label={title}>
        {stages.map((s, i) => (
          <button
            key={s.id}
            id={`${tabsId}-tab-${s.id}`}
            type="button"
            role="tab"
            aria-selected={s.id === stage.id}
            aria-controls={`${tabsId}-panel`}
            tabIndex={s.id === stage.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(s.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className={`t-mono ${styles.tabNum}`}>{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </button>
        ))}
      </div>

      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-tab-${stage.id}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={compare ? styles.compare : styles.tour}
          >
            <p className={`c-secondary ${styles.change}`}>{stage.change}</p>

            {compare && (
              <div className={styles.col} data-side="before">
                <p className={`t-label ${styles.side}`}>Before</p>
                {stage.before!.map((s) => (
                  <ShotFrame key={s.screen ?? s.src ?? s.video} shot={s} onOpen={setZoom} />
                ))}
              </div>
            )}
            <div className={styles.col} data-side={compare ? "after" : "only"}>
              {compare && <p className={`t-label ${styles.side}`}>After</p>}
              {stage.after.map((s) => (
                <ShotFrame key={s.screen ?? s.src ?? s.video} shot={s} onOpen={setZoom} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox shot={zoom} onClose={() => setZoom(null)} />
    </Exhibit>
  );
}

function ShotFrame({ shot, onOpen }: { shot: Shot; onOpen: (s: Shot) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tall, setTall] = useState(false);

  // Fade the bottom only when the screen is actually cut off by the frame.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setTall(el.scrollHeight > el.clientHeight + 2);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, []);

  return (
    <figure className={styles.shot}>
      <button
        ref={ref}
        type="button"
        className={styles.shotButton}
        data-tall={tall || undefined}
        onClick={() => onOpen(shot)}
        aria-label={`View full size: ${shot.alt}`}
      >
        <ShotMedia shot={shot} />
        <span className={`t-label ${styles.zoomHint}`} aria-hidden="true">
          View full size
        </span>
      </button>
      {shot.caption && <figcaption className="t-body-s c-tertiary">{shot.caption}</figcaption>}
    </figure>
  );
}

function Lightbox({ shot, onClose }: { shot: Shot | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (shot && !d.open) d.showModal();
    if (!shot && d.open) d.close();
  }, [shot]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={shot ? shot.alt : "Screen"}
    >
      {shot && (
        <div className={styles.dialogInner}>
          <div className={styles.dialogBar}>
            <p className="t-body-s c-secondary">{shot.caption ?? shot.alt}</p>
            <button type="button" className={styles.close} onClick={onClose} autoFocus>
              Close
            </button>
          </div>
          <div className={styles.dialogScroll}>
            <div className={styles.dialogScreen}>
              <ShotMedia shot={shot} maxScale={1.15} eager />
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
