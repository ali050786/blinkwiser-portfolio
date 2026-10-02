import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { principles } from "@/content/site";
import { Glyph } from "@/components/ui/Glyph";
import { Icon } from "@/components/ui/Icon";
import styles from "./CaseHero.module.css";

export function CaseHero({ study: c }: { study: CaseStudy }) {
  const meta = [
    ["Role", c.meta.role],
    ["Context", c.meta.context],
    ["Timeline", c.meta.timeline],
    ["Domain", c.meta.domain],
  ] as const;

  const habit = principles.find((p) => p.primary === c.index);

  return (
    <header className={`container ${styles.hero}`}>
      <Link href="/#work" className={styles.back}>
        <Icon name="arrow-left" size={16} /> All work
      </Link>

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
