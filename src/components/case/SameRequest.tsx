"use client";

import { useRef, useState } from "react";
import type { CaseStudy } from "@/content/types";
import base from "./FamilyReset.module.css";
import tabsCss from "./HeroStories.module.css";
import styles from "./SameRequest.module.css";

/**
 * Hero proof for the AI-readable design system case: one request, the same
 * components, two results. Readable as a still, in a demo brand with generic
 * content; no client screens, brands or token names.
 */

function Screen({ kind }: { kind: "old" | "new" }) {
  const old = kind === "old";
  return (
    <div className={styles.screen} data-kind={kind} aria-hidden="true">
      <div className={styles.top}>
        <span className={styles.logo} />
        <span className={styles.topLine} />
      </div>
      <div className={styles.frame}>
        <div className={styles.rail} data-missing={old || undefined} data-n="3">
          {old ? (
            <Mark n={3} />
          ) : (
            <>
              <span className={styles.railItem} data-on />
              <span className={styles.railItem} />
              <span className={styles.railItem} />
            </>
          )}
        </div>
        <div className={styles.body}>
          <span className={styles.pageTitle}>Account summary</span>
          <div className={styles.tiles}>
            <div className={styles.tile}>
              <span className={styles.tileLabel}>Available balance</span>
              <span className={styles.tileValue}>$950.00</span>
              <span className={styles.link} data-n="2">
                Transactions →{old && <Mark n={2} />}
              </span>
            </div>
            <div className={styles.tile} data-second>
              <span className={styles.line} style={{ width: "70%" }} />
              <span className={styles.line} style={{ width: "50%" }} />
              <span className={styles.line} style={{ width: "60%" }} />
            </div>
          </div>
          <div className={styles.foot}>
            {old ? (
              <>
                <span className={styles.primary} data-n="1">
                  Save
                  <Mark n={1} />
                </span>
                <span className={styles.secondary}>Cancel</span>
              </>
            ) : (
              <>
                <span className={styles.secondary}>Cancel</span>
                <span className={styles.primary} data-n="1">Save</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Mark({ n }: { n: number }) {
  return (
    <span className={styles.mark} data-n={n}>
      {n}
    </span>
  );
}

type Story = NonNullable<CaseStudy["opener"]>["stories"][number];

/** One finding per tab: the tab highlights its numbered mark and shows the old system's words. */
export function SameRequest({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = stories[active]!;
  const n = String(active + 1);
  const go = (i: number) => {
    const k = (i + stories.length) % stories.length;
    setActive(k);
    tabs.current[k]?.focus();
  };

  return (
    <div className={styles.wrap}>
      <div role="tablist" aria-label="Three things the AI got wrong" className={tabsCss.tabs}>
        {stories.map((st, i) => (
          <button
            key={st.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`hook-tab-${st.id}`}
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
        aria-labelledby={`hook-tab-${s.id}`}
        className={`${base.card} ${styles.card}`}
        data-active={n}
      >
        <header className={base.head}>
          <p className={base.title}>The same request, given to the AI twice</p>
          <p className={base.change}>
            <span className={base.to}>Same AI</span>
            <span className={base.to}>Same components</span>
          </p>
        </header>
        <div className={base.cols}>
          <section className={base.col} data-kind="old" aria-label="Before the skills: off-brand">
            <p className={`t-label ${base.colLabel}`}>Before the skills</p>
            <Screen kind="old" />
            <ol className={styles.legend}>
              <li data-n="1">Save on the wrong side</li>
              <li data-n="2">Link in a button colour</li>
              <li data-n="3">Side nav left out: docs said 19 components, the file had 20</li>
            </ol>
          </section>
          <section className={base.col} data-kind="new" aria-label="With the skills: on-brand">
            <p className={`t-label ${base.colLabel}`}>With the skills</p>
            <Screen kind="new" />
            <ul className={styles.okList}>
              <li data-n="1">Save on the right</li>
              <li data-n="2">Link takes the link colour</li>
              <li data-n="3">Side nav in place: audit matched docs to file, 20 of 20</li>
            </ul>
          </section>
        </div>
        <figcaption className={styles.words} aria-live="polite">
          <span className={styles.wordsQuote}>
            {s.quoteEmpty ? (
              <>
                {s.quoteEmpty.field}: <span className={styles.emptyWord}>empty</span>
              </>
            ) : (
              <>“{s.quote}”</>
            )}
          </span>
          {s.quoteSource && <span className="t-label c-tertiary">{s.quoteSource}</span>}
        </figcaption>
      </figure>
    </div>
  );
}
