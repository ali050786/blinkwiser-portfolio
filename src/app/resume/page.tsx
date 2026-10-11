import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { resume, resumeFile } from "@/content/resume";
import { Icon } from "@/components/ui/Icon";
import button from "@/components/ui/ButtonLink.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Sikandar Ali Abdul, Lead UX Designer. 11 years in UX, the last six leading design on a white-label US health-insurance platform.",
  alternates: { canonical: "/resume" },
};

/** Renders **strong** spans from the résumé copy. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}

export default function ResumePage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <Link href="/" className={styles.back}>
          <Icon name="arrow-left" size={16} /> Portfolio
        </Link>
        <a href={resumeFile} download className={`${button.button} ${button.primary}`}>
          <span>Download PDF</span>
        </a>
      </div>

      <article className={styles.sheet} aria-labelledby="resume-name">
        <header className={styles.head}>
          <div className={styles.who}>
            <h1 id="resume-name" className={styles.name}>
              {resume.name}
            </h1>
            <p className={styles.title}>{resume.title}</p>
            {resume.tagline && <p className={styles.tagline}>{resume.tagline}</p>}
          </div>
          <ul className={styles.links}>
            {resume.links.map((l) => (
              <li key={l.label}>{l.href ? <a href={l.href}>{l.label}</a> : <span>{l.label}</span>}</li>
            ))}
          </ul>
        </header>

        <section className={styles.section}>
          <h2 className={styles.label}>Profile</h2>
          <p className={styles.summary}>
            <Rich text={resume.summary} />
          </p>
        </section>

        {resume.domain && (
          <section className={styles.section}>
            <h2 className={styles.label}>Domain</h2>
            <p className={styles.summary}>{resume.domain}</p>
          </section>
        )}

        {resume.sections.map((sec) => (
          <section key={sec.label} className={styles.section} data-compact={sec.compact || undefined}>
            <h2 className={styles.label}>{sec.label}</h2>
            <div className={styles.entries}>
              {sec.entries.map((e) => (
                <div key={e.org} className={styles.entry}>
                  <div className={styles.meta}>
                    <p className={styles.org}>{e.org}</p>
                    {e.role && <p className={styles.role}>{e.role}</p>}
                    {e.note && <p className={styles.note}>{e.note}</p>}
                    {e.period && <p className={styles.period}>{e.period}</p>}
                  </div>
                  <div className={styles.body}>
                    {e.scope && (
                      <p className={styles.scope}>
                        <Rich text={e.scope} />
                      </p>
                    )}
                    {e.body && (
                      <p>
                        <Rich text={e.body} />
                      </p>
                    )}
                    {e.bullets && (
                      <ul className={styles.bullets}>
                        {e.bullets.map((b) => (
                          <li key={b}>
                            <Rich text={b} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}
