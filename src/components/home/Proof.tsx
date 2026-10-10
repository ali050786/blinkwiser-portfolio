import Link from "next/link";
import { SectionHead, Cross } from "./Section";
import s from "./Section.module.css";
import styles from "./Proof.module.css";

/* Where the work happened: Deploy's client grid, with organizations instead of logos. */
const ITEMS: { mark: string; name: string; sub: string; when: string; href?: string }[] = [
  { mark: "HI", name: "US health-insurance platform", sub: "White-label SaaS for insurers, employers, and members", when: "2021–now", href: "/work/enterprise-platform-from-zero" },
  { mark: "DM", name: "Dubai Municipality", sub: "Nine city apps into one, in Arabic and English", when: "2020–2021", href: "/work/dubai-municipality" },
  { mark: "JA", name: "Jet Airways", sub: "Booking on web, iOS, and Android", when: "2015–2019", href: "/work/jet-airways-booking" },
  { mark: "BW", name: "Blinkwiser", sub: "My AI product lab", when: "2026–now", href: "/work/designing-trust-into-ai" },
  { mark: "MP", name: "Mphasis", sub: "My employer for the airline, city, and platform work", when: "2015–now" },
];

export function Proof() {
  return (
    <section className={`${s.section} ${styles.band}`} aria-labelledby="proof-title">
      <div className={`${s.wrap} ${styles.grid}`}>
        <SectionHead
          label="Where I've designed"
          id="proof-title"
          lead="The teams I've"
          turn="shipped products with."
          intro="An airline, a city government, a US health-insurance platform and my own AI lab."
          className={styles.head}
        />

        <div className={styles.list} data-reveal>
          <Cross className={styles.c1} />
          <Cross className={styles.c2} />
          <Cross className={styles.c3} />
          <Cross className={styles.c4} />
          <ul>
            {ITEMS.map((it, i) => {
              const body = (
                <>
                  <span className={styles.mark} aria-hidden="true">
                    {it.mark}
                  </span>
                  <span className={styles.text}>
                    <span className={styles.name}>{it.name}</span>
                    <span className={styles.sub}>
                      {it.sub}
                      {"\u00a0"}
                      <span className={styles.when}>· {it.when}</span>
                    </span>
                  </span>
                  <span className={styles.idx} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </>
              );
              return (
                <li key={it.name}>
                  {it.href ? (
                    <Link href={it.href} className={styles.row}>
                      {body}
                    </Link>
                  ) : (
                    <div className={styles.row}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
