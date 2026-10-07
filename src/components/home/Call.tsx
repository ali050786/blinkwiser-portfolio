import { site } from "@/content/site";
import { Eyebrow, Cross } from "./Section";
import { CopyEmail } from "./CopyEmail";
import { LocalTime } from "./LocalTime";
import s from "./Section.module.css";
import styles from "./Call.module.css";

/** Deploy's closing call box, pointed at email instead of a booking. */
export function Call() {
  return (
    <section id="contact" className={s.section} aria-labelledby="contact-title">
      <div className={s.wrap}>
        <div className={styles.box}>
          <Cross className={styles.c1} />
          <Cross className={styles.c2} />
          <Cross className={styles.c3} />
          <Cross className={styles.c4} />
          <div className={styles.inner} data-reveal>
            <Eyebrow label="Get in touch" />
            <h2 id="contact-title" className={styles.title}>
              <span>Get in touch.</span> <span className={styles.turn}>Email is the fastest way.</span>
            </h2>
            <p className={styles.lede}>I&apos;m looking for a senior or lead UX role, ideally in health tech or on an AI product.</p>
            <div className={styles.actions}>
              <a href={`mailto:${site.email}`} className={styles.primary}>
                Email me <span aria-hidden="true">→</span>
              </a>
              <CopyEmail email={site.email} className={styles.secondary} />
              <a href={site.linkedin} target="_blank" rel="me noopener" className={styles.secondary}>
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className={styles.meta}>
              <span>{site.email}</span>
              <span aria-hidden="true">·</span>
              <span>{site.location}</span>
              <span aria-hidden="true">·</span>
              <span>
                <LocalTime /> IST
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
