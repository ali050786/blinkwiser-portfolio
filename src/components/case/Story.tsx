import type { CaseStudy, StoryBlock } from "@/content/types";
import { ExhibitSlot } from "@/components/exhibits/ExhibitSlot";
import { Reframe } from "./Reframe";
import { OutcomePanel } from "./OutcomePanel";
import { HeroStories } from "./HeroStories";
import { LiveLinks } from "./LiveLinks";
import styles from "./Story.module.css";

/**
 * A case study told as chapters: a plain first-person heading, then paragraphs
 * and visuals in reading order. Used instead of the five beats when a study has `story`.
 */
export function Story({ study: c }: { study: CaseStudy }) {
  const chapters = c.story!.chapters;
  return (
    <>
      {chapters.map((ch, i) => (
        <section key={ch.id} id={ch.id} data-beat={ch.id} className={styles.chapter} aria-labelledby={`${ch.id}-title`}>
          <header className={styles.head} data-reveal>
            <p className="t-mono c-tertiary">{String(i + 1).padStart(2, "0")}</p>
            <h2 id={`${ch.id}-title`} className={`t-display-m ${styles.title}`}>
              {ch.title}
            </h2>
          </header>
          <div className={styles.body}>
            {ch.blocks.map((b, j) => (
              <Block key={j} block={b} study={c} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function Block({ block: b, study: c }: { block: StoryBlock; study: CaseStudy }) {
  switch (b.kind) {
    case "p":
      return <p className={`t-body-l ${styles.p}`}>{b.text}</p>;
    case "exhibit":
      return (
        <div className={styles.visual}>
          <ExhibitSlot id={b.id} />
        </div>
      );
    case "reframe":
      return (
        <div className={styles.visual}>
          <Reframe assumed={b.assumed} actual={b.actual} />
        </div>
      );
    case "note":
      return (
        <aside className={styles.note} data-reveal>
          <p className="t-label c-accent">{b.label}</p>
          <p className="c-secondary">{b.text}</p>
        </aside>
      );
    case "cards":
      return (
        <ul className={styles.cards} data-count={b.items.length}>
          {b.items.map((it, i) => (
            <li key={it.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
              <h3 className="t-heading-m">{it.title}</h3>
              <p className="t-body-s c-secondary">{it.body}</p>
            </li>
          ))}
        </ul>
      );
    case "stories":
      return c.opener ? (
        <div className={styles.visual}>
          <HeroStories opener={c.opener} compact />
        </div>
      ) : null;
    case "links":
      return c.live ? (
        <div className={styles.visual}>
          <LiveLinks live={c.live} />
        </div>
      ) : null;
    case "image":
      return (
        <figure className={`${styles.image} ${b.narrow ? styles.narrow : ""}`} data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.src} alt={b.alt} width={b.width} height={b.height} loading="lazy" decoding="async" />
          <figcaption>
            <span className="t-body-s c-secondary">{b.caption}</span>
            {b.note && <span className="t-label c-tertiary">{b.note}</span>}
          </figcaption>
        </figure>
      );
    case "metrics":
      return (
        <div className={styles.visual}>
          <OutcomePanel outcome={c.outcome} metricsOnly />
        </div>
      );
  }
}
