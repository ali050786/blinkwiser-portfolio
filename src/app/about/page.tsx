import type { Metadata } from "next";
import Link from "next/link";
import { hero, faq } from "@/content/home";
import { site, timeline, education } from "@/content/site";
import { CopyEmail } from "@/components/home/CopyEmail";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

/** The profile: who I am, where I've worked, what I'm learning, and the common questions. */
export default function AboutPage() {
  // The first two answers (what I do, where I'm based) read as the bio; the rest stay as questions.
  const [work, based, ...questions] = faq;
  return (
    <div className={`container ${styles.page}`}>
      <section className={styles.lead} aria-labelledby="about-title">
        <h1 id="about-title" className={styles.title}>
          {hero.sub}
        </h1>
        <div className={styles.body}>
          {work && <p>{work.a}</p>}
          {based && <p>{based.a}</p>}
          <p>
            The fastest way to reach me is email.{" "}
            <CopyEmail email={site.email} className={styles.inlineEmail} />
          </p>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="work-title">
        <h2 id="work-title" className={styles.label}>
          Work
        </h2>
        <ul className={styles.list}>
          {timeline.map((t) => (
            <li key={t.period + t.org} className={styles.item}>
              <span className={styles.org}>{t.org}</span>
              <span className={styles.role}>{t.role}</span>
              <span className={styles.period}>{t.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.block} aria-labelledby="edu-title">
        <h2 id="edu-title" className={styles.label}>
          Education
        </h2>
        <ul className={styles.list}>
          {education.map((e) => (
            <li key={e.qualification} className={styles.item}>
              <span className={styles.org}>{e.org}</span>
              <span className={styles.role}>
                {e.qualification}
                {e.detail ? `, ${e.detail.replace(/\.$/, "").toLowerCase()}` : ""}
              </span>
              <span className={styles.period}>{e.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.block} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.label}>
          Questions
        </h2>
        <div className={styles.faq}>
          {questions.map((f) => (
            <details key={f.q} className={styles.qa}>
              <summary>{f.q}</summary>
              <p>
                {f.a}
                {f.link && (
                  <>
                    {" "}
                    <Link href={f.link.href}>{f.link.label}</Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
