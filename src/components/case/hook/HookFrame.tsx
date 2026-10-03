"use client";

import { useRef, useState } from "react";
import type { CaseStudy } from "@/content/types";
import base from "../FamilyReset.module.css";
import tabsCss from "../HeroStories.module.css";
import styles from "./HookFrame.module.css";

type Hook = NonNullable<CaseStudy["hook"]>;

/**
 * Picture-first hero proof: tabs above one before/after picture. The active tab
 * keeps its numbered mark and legend lines at full strength, the others step
 * back, and one line under the picture gives the evidence for that finding.
 * Each case draws its own two screens and passes them in.
 */
export function HookFrame({ hook, before, after }: { hook: Hook; before: React.ReactNode; after: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { picture, findings } = hook;
  const f = findings[active]!;
  const go = (i: number) => {
    const k = (i + findings.length) % findings.length;
    setActive(k);
    tabs.current[k]?.focus();
  };

  return (
    <div className={styles.wrap}>
      <div role="tablist" aria-label={hook.tabsLabel} className={tabsCss.tabs}>
        {findings.map((st, i) => (
          <button
            key={st.tab}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`hook-tab-${i}`}
            aria-selected={i === active}
            aria-controls="hook-panel"
            tabIndex={i === active ? 0 : -1}
            className={tabsCss.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") (e.preventDefault(), go(active + 1));
              if (e.key === "ArrowLeft") (e.preventDefault(), go(active - 1));
            }}
          >
            <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
            {st.tab}
          </button>
        ))}
      </div>
      <figure
        id="hook-panel"
        role="tabpanel"
        aria-labelledby={`hook-tab-${active}`}
        className={`${base.card} ${styles.card}`}
        data-active={String(active + 1)}
      >
        <header className={base.head}>
          <p className={base.title}>{picture.title}</p>
          <p className={base.change}>
            {picture.chips.map((c) => (
              <span key={c} className={base.to}>
                {c}
              </span>
            ))}
          </p>
        </header>
        <div className={base.cols}>
          <section className={base.col} data-kind="old" aria-label={picture.before.label}>
            <p className={`t-label ${base.colLabel}`}>{picture.before.label}</p>
            {before}
            <ol className={styles.legend}>
              {picture.before.items.map((it, i) => (
                <li key={it} data-n={i + 1}>
                  {it}
                </li>
              ))}
            </ol>
          </section>
          <section className={base.col} data-kind="new" aria-label={picture.after.label}>
            <p className={`t-label ${base.colLabel}`}>{picture.after.label}</p>
            {after}
            <ul className={styles.okList}>
              {picture.after.items.map((it, i) => (
                <li key={it} data-n={i + 1}>
                  {it}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <figcaption className={styles.words} aria-live="polite">
          <span className={styles.wordsQuote}>
            {f.empty ? (
              <>
                {f.empty}: <span className={styles.emptyWord}>empty</span>
              </>
            ) : f.quoted ? (
              <>“{f.words}”</>
            ) : (
              f.words
            )}
          </span>
          {f.source && <span className="t-label c-tertiary">{f.source}</span>}
        </figcaption>
      </figure>
    </div>
  );
}
