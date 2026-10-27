import type { Metadata } from "next";
import Link from "next/link";
import { lab } from "@/content/lab";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { Icon } from "@/components/ui/Icon";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Lab",
  description: "Small products Sikandar Ali Abdul designs and builds on the side, each one live.",
  alternates: { canonical: "/lab" },
};

/** The Lab: side projects, each with a loop of its live page, what it is, and where to try it. */
export default function LabPage() {
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.lead}>
        <h1 className={styles.title}>Small products I design and build on the side.</h1>
        <p className={styles.intro}>
          Each one is live and free to try. I design them and build them with AI coding agents, which keeps my hands on the whole product, from
          the first sketch to the release. More to come.
        </p>
      </header>

      <ul className={styles.grid}>
        {lab.map((p) => {
          const [primary, ...rest] = p.links;
          return (
            <li key={p.slug} className={styles.item}>
              <a href={primary!.href} target="_blank" rel="noopener" className={styles.media} style={{ background: p.media.ground }} data-cursor-text={`Open ${p.name}`}>
                <AutoVideo src={p.media.video} poster={p.media.poster} label={p.media.alt} fill />
              </a>
              <p className={styles.caption}>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
                <span className={styles.tag}>
                  {p.kind}, {p.status.charAt(0).toLowerCase() + p.status.slice(1)}
                </span>
              </p>
              <p className={styles.line}>{p.line}</p>
              <p className={styles.detail}>{p.detail}</p>
              <p className={styles.links}>
                {[primary!, ...rest].map((l) =>
                  l.href.startsWith("/") ? (
                    <Link key={l.href} href={l.href} className={styles.link}>
                      {l.label}
                      <Icon name="arrow-right" size={14} />
                    </Link>
                  ) : (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener" className={styles.link}>
                      {l.label}
                      <Icon name="arrow-up-right" size={14} />
                    </a>
                  ),
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
