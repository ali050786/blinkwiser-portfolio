import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/content/case-studies";
import { deck, type CaseSlug } from "@/content/home";
import { AutoVideo } from "@/components/ui/AutoVideo";
import styles from "./CaseGrid.module.css";

/**
 * Every case as a card of the same size: its home tint with the real screen
 * (or the trailer loop) on it, and one caption line under it. The whole card
 * is the link.
 */
export function CaseGrid() {
  return (
    <section id="work" className={`container ${styles.section}`} aria-label="Case studies">
      <ul className={styles.grid}>
        {caseStudies.map((c, i) => {
          const d = deck[c.slug as CaseSlug];
          return (
            <li key={c.slug} className={styles.item}>
              <Link href={`/work/${c.slug}`} className={styles.card} data-cursor-text="View case study">
                <div className={styles.media} style={{ background: `var(--deck-tint-${d.tint})` }}>
                  {!d.video && (
                    <Image
                      src={d.img}
                      alt={d.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 660px"
                      className={styles.img}
                      data-fit={d.fit ?? "cover"}
                      priority={i < 2}
                    />
                  )}
                  <span className={styles.veil} aria-hidden="true" />
                </div>
                <p className={styles.caption}>
                  <span className={styles.title}>{c.short}</span>
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                  {c.headline.value ? (
                    <span className={styles.tag}>
                      <span className={styles.metric}>{c.headline.value}</span> {c.headline.label}
                    </span>
                  ) : (
                    <span className={styles.tag}>
                      {d.domain}, {d.status.charAt(0).toLowerCase() + d.status.slice(1)}
                    </span>
                  )}
                </p>
              </Link>
              {/* The loop sits over the card's media box, outside the link, so its
                  pause and replay buttons aren't nested in an <a>. Clicks on the
                  picture itself fall through to the link. It's a white card on the
                  case tint, like the case page shows it, unless the trailer brings
                  its own background and fills the card. */}
              {d.video && (
                <div className={styles.overlay} data-fill={d.video.fill || undefined}>
                  <AutoVideo src={d.video.src} poster={d.video.poster} label={d.alt} fill={d.video.fill} className={d.video.fill ? undefined : styles.inset} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
