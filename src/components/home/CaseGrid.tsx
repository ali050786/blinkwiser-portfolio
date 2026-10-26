import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/content/case-studies";
import { deck, type CaseSlug } from "@/content/home";
import { AutoVideo } from "@/components/ui/AutoVideo";
import styles from "./CaseGrid.module.css";

/**
 * Every case as a large card: its home tint with the real screen (or the
 * trailer loop) on it, and one caption line under it. The first card spans
 * both columns. The whole card is the link.
 */
export function CaseGrid() {
  return (
    <section id="work" className={`container ${styles.section}`} aria-label="Case studies">
      <ul className={styles.grid}>
        {caseStudies.map((c, i) => {
          const d = deck[c.slug as CaseSlug];
          return (
            <li key={c.slug} className={`${styles.item} ${i === 0 ? styles.wide : ""}`}>
              <Link href={`/work/${c.slug}`} className={styles.card} data-cursor-text="View case study">
                <div className={styles.media} style={{ background: `var(--deck-tint-${d.tint})` }}>
                  {!d.video && (
                    <Image
                      src={d.img}
                      alt={d.alt}
                      fill
                      sizes={i === 0 ? "(max-width: 900px) 100vw, 1320px" : "(max-width: 900px) 100vw, 660px"}
                      className={styles.img}
                      data-fit={d.fit ?? "cover"}
                      priority={i < 3}
                    />
                  )}
                  <span className={styles.veil} aria-hidden="true" />
                </div>
                <p className={styles.caption}>
                  <span className={styles.title}>{c.short}</span>
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                  <span className={styles.tag}>
                    {d.domain}, {d.status.charAt(0).toLowerCase() + d.status.slice(1)}
                  </span>
                </p>
              </Link>
              {/* The loop sits over the card's media box, outside the link, so its
                  pause and replay buttons aren't nested in an <a>. Clicks on the
                  picture itself fall through to the link. It's a white card on the
                  case tint, like the case page shows it. */}
              {d.video && (
                <div className={styles.overlay}>
                  <AutoVideo src={d.video.src} poster={d.video.poster} label={d.alt} className={styles.inset} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
