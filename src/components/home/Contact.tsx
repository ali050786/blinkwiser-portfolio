import { site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.copyCol}>
          <h2 id="contact-title" className={`t-display-l ${styles.title}`} data-reveal>
            Get in touch
          </h2>
          <p className={`t-body-l ${styles.lede}`}>
            I&apos;m looking for a senior or lead UX role, ideally in health tech or on an AI product. Email is the fastest way to
            reach me.
          </p>
          <div className={styles.actions}>
            <a href={`mailto:${site.email}`} className={styles.primary}>
              {site.email}
            </a>
            <CopyEmail email={site.email} className={styles.copy} />
            <a href={site.linkedin} target="_blank" rel="me noopener" className={styles.secondary}>
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            {site.resumeUrl && (
              <a href={site.resumeUrl} className={styles.secondary}>
                Résumé
              </a>
            )}
          </div>
          </div>
          <div className={styles.fit}>
            <p className={`t-body-s ${styles.fitNote}`}>Based in {site.location} · IST, UTC+5:30</p>
          </div>
        </div>
      </div>
    </section>
  );
}
