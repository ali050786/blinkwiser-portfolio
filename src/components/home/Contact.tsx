import { site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.copyCol}>
          <p className={`t-label ${styles.kicker}`} data-reveal>
            Contact
          </p>
          <h2 id="contact-title" className={`t-display-l ${styles.title}`} data-reveal>
            Let&apos;s find the problem <em className="t-serif-em">under</em> your brief.
          </h2>
          <p className={`t-body-l ${styles.lede}`} data-reveal>
            {site.availability}. I&apos;m especially interested in teams building AI products or complex, regulated platforms.
          </p>
          <div className={styles.actions} data-reveal>
            <a href={`mailto:${site.email}`} className={styles.primary}>
              {site.email}
            </a>
            <CopyEmail email={site.email} className={styles.copy} />
            <a href={site.linkedin} target="_blank" rel="me noopener" className={styles.secondary}>
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
          </div>
          <div className={styles.fit} data-reveal>
            <p className={`t-label ${styles.kicker}`}>Good fits</p>
            <ul>
              <li>Senior and lead UX</li>
              <li>Design systems leadership</li>
              <li>Design engineering</li>
              <li>AI product and forward-deployed roles</li>
            </ul>
            <p className={`t-body-s ${styles.fitNote}`}>Based in {site.location} · IST, UTC+5:30</p>
          </div>
        </div>
      </div>
    </section>
  );
}
