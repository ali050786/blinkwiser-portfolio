import Link from "next/link";
import { hero, intro } from "@/content/home";
import styles from "./Intro.module.css";

/** The minimal home opening: one serif line, then short labelled rows. */
export function Intro() {
  return (
    <section className={`container ${styles.intro}`} aria-labelledby="intro-title">
      <h1 id="intro-title" className={styles.title}>
        {hero.title.join(" ")}
      </h1>
      <dl className={styles.rows}>
        {intro.map((row) => (
          <div key={row.label} className={styles.row}>
            <dt>{row.label}</dt>
            <dd>
              {row.parts.map((p) =>
                p.href ? (
                  p.href.startsWith("/") ? (
                    <Link key={p.text} href={p.href} data-cursor-text="View case study">
                      {p.text}
                    </Link>
                  ) : (
                    <a key={p.text} href={p.href} target="_blank" rel="noopener" data-cursor-text="Open website">
                      {p.text}
                    </a>
                  )
                ) : (
                  <span key={p.text}>{p.text}</span>
                ),
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
