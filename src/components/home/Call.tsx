import { site } from "@/content/site";
import { Eyebrow } from "./Section";
import { CopyEmail } from "./CopyEmail";
import s from "./Section.module.css";
import styles from "./Call.module.css";

/** The closing section: one heading, one sentence, three ways to reach me. */
export function Call() {
  return (
    <section id="contact" className={s.section} aria-labelledby="contact-title">
      <div className={s.wrap}>
        <div className={styles.box}>
          <div className={styles.inner} data-reveal>
            <Eyebrow label="Get in touch" />
            <h2 id="contact-title" className={styles.title}>
              Email is the fastest way to reach me.
            </h2>
            <p className={styles.lede}>I&apos;m a UX lead with 11 years in health insurance, civic services and AI products. Tell me about the problem you&apos;re working on.</p>
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
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
