"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import type { Accent, CardWidget as WidgetKind, CaseStudy, GlyphId, Shot } from "@/content/types";
import { CardWidget } from "./CardWidget";
import { ShotMedia } from "@/components/screens/ShotMedia";
import { Icon } from "@/components/ui/Icon";
import styles from "./WorkIndex.module.css";

export type WorkItem = {
  slug: string;
  index: string;
  accent: Accent;
  glyph: GlyphId;
  group: CaseStudy["group"];
  title: string;
  tags: string[];
  headline: { value: string; label: string };
  snapshot: CaseStudy["snapshot"];
  meta: string;
  visual: Shot;
  widget: WidgetKind;
  call: string;
};

export function WorkList({ items }: { items: WorkItem[] }) {
  const [activeSlug, setActiveSlug] = useState(items[0]!.slug);
  const reduce = useReducedMotion();
  const current = items.find((w) => w.slug === activeSlug) ?? items[0]!;
  const groups = [...new Set(items.map((i) => i.group))];
  const layout = reduce ? false : ("position" as const);
  const move = { duration: 0.45, ease: [0.2, 0, 0, 1] as const };

  return (
    <div className={styles.layout}>
      <LayoutGroup>
        <div className={styles.list}>
          {groups.map((g) => (
            <motion.div
              key={g}
              className={styles.group}
              layout={layout}
              transition={move}
            >
              <motion.p
                layout={layout}
                transition={move}
                className={`t-label c-tertiary ${styles.groupLabel}`}
              >
                {g}
              </motion.p>
              <ul>
                {items
                  .filter((i) => i.group === g)
                  .map((item) => {
                    return (
                      <motion.li
                        key={item.slug}
                        data-accent={item.accent}
                        layout={layout}
                        transition={move}
                      >
                        <div data-reveal>
                          <Link
                            href={`/work/${item.slug}`}
                            className={styles.row}
                            data-active={
                              current.slug === item.slug || undefined
                            }
                            onMouseEnter={() => setActiveSlug(item.slug)}
                            onFocus={() => setActiveSlug(item.slug)}
                          >
                            <span className={`t-mono ${styles.index}`}>
                              {item.index}
                            </span>
                            <span className={styles.rowMain}>
                              <span
                                className={`t-heading-l ${styles.rowTitle}`}
                              >
                                {item.title}
                              </span>
                              <CardWidget kind={item.widget} />
                            </span>
                            <span className={styles.rowMetric}>
                              <span className={`tabular ${styles.metricValue}`}>
                                {item.headline.value}
                              </span>
                              <span
                                className={`t-body-s c-tertiary ${styles.metricLabel}`}
                              >
                                {item.headline.label}
                              </span>
                            </span>
                            <span className={styles.arrow} aria-hidden="true">
                              <Icon name="arrow-right" />
                            </span>
                          </Link>
                        </div>
                      </motion.li>
                    );
                  })}
              </ul>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>

      <aside
        className={styles.previewWrap}
        aria-label="Decision snapshot preview"
      >
        <div className={styles.preview} data-accent={current.accent}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.slug}
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: -6, filter: "blur(4px)" }
              }
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={styles.previewInner}
            >
              <div className={styles.previewTop}>
                <span className="t-label c-accent">
                  {current.index} · {current.group}
                </span>
                <span className="t-label c-tertiary">Preview</span>
              </div>
              <div className={styles.previewVisual}>
                <ShotMedia shot={current.visual} />
              </div>
              <p className={styles.call}>
                <span className="t-label c-tertiary">The call</span>
                <span>{current.call}</span>
              </p>
              <div className={styles.previewFoot}>
                <span className="t-body-s c-tertiary">{current.meta}</span>
                <Link
                  href={`/work/${current.slug}`}
                  className={styles.previewCta}
                  tabIndex={-1}
                >
                  Read <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </aside>
    </div>
  );
}
