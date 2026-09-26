"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import type { Accent, GlyphId } from "@/content/types";
import { Glyph } from "@/components/ui/Glyph";
import { Icon } from "@/components/ui/Icon";
import styles from "./ReframeDeck.module.css";

export type DeckItem = {
  slug: string;
  index: string;
  accent: Accent;
  glyph: GlyphId;
  tab: string;
  label: string;
  brief: string;
  problem: string;
  call: string;
  role: string;
};

const INTERVAL = 7000;

/**
 * All five studies, one reframe each: what the brief said, what the problem
 * really was, and the call that followed. Auto-advances like a story reel;
 * pauses on hover, focus, offscreen, a hidden tab, or a manual choice.
 */
export function ReframeDeck({ items }: { items: DeckItem[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false); // hover or focus inside the deck
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const running = playing && !held && visible && !reduce;
  const next = useCallback(() => setActive((a) => (a + 1) % items.length), [items.length]);

  const choose = (i: number, focus = false) => {
    setActive(i);
    setPlaying(false);
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const last = items.length - 1;
    const map: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      choose(map[e.key]!, true);
    }
  };

  const it = items[active]!;
  const behind = [items[(active + 1) % items.length]!, items[(active + 2) % items.length]!];

  return (
    <div
      ref={root}
      className={styles.deck}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setHeld(false);
      }}
    >
      <div role="tablist" aria-label="Five case studies, one reframe each" className={styles.tabs} onKeyDown={onKey}>
        {items.map((t, i) => (
          <button
            key={t.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`deck-tab-${i}`}
            aria-selected={i === active}
            aria-controls="deck-panel"
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            data-accent={t.accent}
            onClick={() => choose(i)}
          >
            <span className={`t-mono ${styles.tabIndex}`}>{t.index}</span>
            <span className={styles.tabLabel}>{t.tab}</span>
            <span className={styles.progress} aria-hidden="true">
              {i === active && (
                <i
                  key={`${t.slug}-${active}`}
                  data-running={running || undefined}
                  data-static={!playing || reduce || undefined}
                  style={{ animationDuration: `${INTERVAL}ms` }}
                  onAnimationEnd={next}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.stack}>
        {behind.map((b, i) => (
          <span key={`${b.slug}-ghost-${i}`} className={styles.ghost} data-depth={i + 1} data-accent={b.accent} aria-hidden="true" />
        ))}

        <div role="tabpanel" id="deck-panel" aria-labelledby={`deck-tab-${active}`} className={styles.card} data-accent={it.accent}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={it.slug}
              className={styles.inner}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.head}>
                <div className={styles.headText}>
                  <span className={styles.chip}>{it.label}</span>
                  <span className="t-label c-tertiary">Case {it.index}</span>
                </div>
                <div className={styles.glyph} aria-hidden="true">
                  <Glyph id={it.glyph} />
                </div>
              </div>

              <dl className={styles.rows}>
                <div>
                  <dt className="t-label c-tertiary">The brief</dt>
                  <dd className={styles.brief}>
                    <motion.span
                      className={styles.strike}
                      initial={reduce ? false : { backgroundSize: "0% 2px" }}
                      animate={{ backgroundSize: "100% 2px" }}
                      transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {it.brief}
                    </motion.span>
                  </dd>
                </div>
                <div>
                  <dt className="t-label c-accent">The real problem</dt>
                  <dd className={styles.problem}>
                    <motion.span
                      className={styles.mark}
                      initial={reduce ? false : { backgroundSize: "0% 38%" }}
                      animate={{ backgroundSize: "100% 38%" }}
                      transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {it.problem}
                    </motion.span>
                  </dd>
                </div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 1.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <dt className="t-label c-tertiary">The call</dt>
                  <dd className={styles.call}>
                    <Icon name="check" size={16} />
                    <span>{it.call}</span>
                  </dd>
                </motion.div>
              </dl>

              <div className={styles.foot}>
                <span className="t-body-s c-tertiary">{it.role}</span>
                <Link href={`/work/${it.slug}`} className={styles.read}>
                  Read case {it.index} <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.controls}>
        <span className={`t-label c-tertiary ${styles.count}`} aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {it.tab}
        </span>
        <div className={styles.buttons}>
          <button type="button" className={styles.ctrl} aria-label="Previous case" onClick={() => choose(active === 0 ? items.length - 1 : active - 1)}>
            <Icon name="arrow-left" size={15} />
          </button>
          <button
            type="button"
            className={styles.ctrl}
            aria-label={playing ? "Pause auto-advance" : "Play auto-advance"}
            onClick={() => setPlaying((p) => !p)}
            disabled={!!reduce}
          >
            {playing && !reduce ? (
              <span className={styles.pauseBars} aria-hidden="true">
                <span />
                <span />
              </span>
            ) : (
              <Icon name="play" size={14} />
            )}
          </button>
          <button type="button" className={styles.ctrl} aria-label="Next case" onClick={() => choose((active + 1) % items.length)}>
            <Icon name="arrow-right" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
