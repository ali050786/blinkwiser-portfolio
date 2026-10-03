import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { principles } from "@/content/site";
import { Glyph } from "@/components/ui/Glyph";
import { Icon } from "@/components/ui/Icon";
import { HeroStories } from "./HeroStories";
import { SameRequest } from "./SameRequest";
import styles from "./CaseHero.module.css";

export function CaseHero({ study: c }: { study: CaseStudy }) {
  const meta = [
    ["Role", c.meta.role],
    ["Context", c.meta.context],
    ["Timeline", c.meta.timeline],
    ["Domain", c.meta.domain],
  ] as const;

  const habit = principles.find((p) => p.primary === c.index);

  /* The turning point sits in the empty space beside the title on wide screens,
     and under the proof on narrow ones, so the proof stays near the top. Only one
     copy is displayed at a time; the other is display: none. */
  const turn = c.opener?.turn && (
    <figure className={styles.turn}>
      <blockquote>
        <p>“{c.opener.turn.quote}”</p>
      </blockquote>
      <figcaption className="t-label c-tertiary">{c.opener.turn.source}</figcaption>
      {c.opener.turn.after && <p className={`c-secondary ${styles.turnAfter}`}>{c.opener.turn.after}</p>}
    </figure>
  );

  return (
    <header className={`container ${styles.hero}`}>
      <Link href="/#work" className={styles.back}>
        <Icon name="arrow-left" size={16} /> All work
      </Link>

      {c.hook ? (
        <div className={styles.hook}>
          <div className={styles.hookCopy}>
            <p className="t-label">
              <span className="c-accent">Case {c.index}</span>
              <span className="c-tertiary"> · {c.group}</span>
            </p>
            <h1 className={`t-heading-m c-secondary ${styles.titleSmall}`}>{c.title}</h1>
            <p className={`t-display-l ${styles.hookLine}`}>{c.hook.line}</p>
            <p className={`t-heading-l ${styles.hookTurn}`}>{c.hook.turn}</p>
            <p className={styles.hookNumber}>
              <span className={`tabular ${styles.headlineValue}`}>{c.headline.value}</span>
              <span className="t-body-s c-secondary">{c.headline.label}</span>
            </p>
          </div>
          <div className={styles.hookVisual}>
            <SameRequest />
            <p className="t-label c-tertiary">{c.hook.note}</p>
          </div>
        </div>
      ) : c.opener ? (
        <div className={styles.openerWrap}>
          <div className={styles.openerTop} data-turn={c.opener.turn ? "" : undefined}>
            <div className={styles.openerHead}>
              <p className="t-label">
                <span className="c-accent">Case {c.index}</span>
                <span className="c-tertiary"> · {c.group}</span>
              </p>
              <h1 className={`t-heading-m c-secondary ${styles.titleSmall}`}>{c.title}</h1>
              {c.opener.lead ? (
                <p className={styles.lead}>{c.opener.lead}</p>
              ) : (
                <p className={`t-body-l c-secondary ${styles.scope}`}>{c.opener.scope}</p>
              )}
            </div>
            {turn && <div className={styles.turnTop}>{turn}</div>}
          </div>
          <HeroStories opener={c.opener} />
          {turn && <div className={styles.turnBottom}>{turn}</div>}
          <ul className={styles.tags} aria-label="Topics">
            {c.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className="t-label">
              <span className="c-accent">Case {c.index}</span>
              <span className="c-tertiary"> · {c.group}</span>
            </p>
            <h1 className="t-display-l">{c.title}</h1>
            <p className={`t-body-l c-secondary ${styles.dek}`}>{c.dek}</p>
            {habit && (
              <p className={styles.habit}>
                <span className="t-label c-tertiary">How I worked</span>
                <span>{habit.title}</span>
              </p>
            )}
            <ul className={styles.tags} aria-label="Topics">
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className={styles.visual}>
            <Glyph id={c.glyph} />
            <div className={styles.headline}>
              <span className={`tabular ${styles.headlineValue}`}>{c.headline.value}</span>
              <span className="t-body-s c-secondary">{c.headline.label}</span>
            </div>
          </div>
        </div>
      )}

      <dl className={styles.meta}>
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt className="t-label c-tertiary">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
