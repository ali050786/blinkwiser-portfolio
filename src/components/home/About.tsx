import { education, learning, site, timeline } from "@/content/site";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className="t-label c-tertiary" data-reveal>
            About
          </p>
          <h2 id="about-title" className="t-display-m" data-reveal>
            Eleven years designing where <em className="t-serif-em c-accent">errors are expensive</em>.
          </h2>
          <div className={`prose t-body-l c-secondary ${styles.bio}`} data-reveal>
            <p>
              I&apos;m Ali, a Senior UX Architect at Mphasis in Pune. I&apos;ve designed US health-insurance platforms, a city&apos;s civic
              services and an airline&apos;s apps, for people who can&apos;t afford a wrong answer.
            </p>
            <p>
              I joined a white-label health platform as its only designer and grew it into a system, a team of four designers, and a
              practice that now builds screens with AI. On the side I run Blinkwiser, where I design and ship AI products by directing
              coding agents: the judgment is mine; the typing mostly isn&apos;t.
            </p>
            <p>
              I work best at the systems layer, where the brief is ambiguous, the domain is regulated, and the real problem is usually one
              level below the one I was handed.
            </p>
          </div>
        </div>

        <div className={styles.side}>
          <div className={styles.block} data-reveal>
            <h3 className="t-label c-tertiary">Experience</h3>
            <ol className={styles.timeline}>
              {timeline.map((t) => (
                <li key={t.period + t.org}>
                  <span className={`t-mono tabular ${styles.period}`}>{t.period}</span>
                  <div>
                    <p className={styles.role}>{t.role}</p>
                    <p className="t-body-s c-tertiary">{t.org}</p>
                    <p className="t-body-s c-secondary">{t.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.block} data-reveal>
            <h3 className="t-label c-tertiary">Education</h3>
            <ol className={styles.timeline}>
              {education.map((e) => (
                <li key={e.qualification + e.org}>
                  <span className={`t-mono tabular ${styles.period}`}>{e.period}</span>
                  <div>
                    <p className={styles.role}>{e.qualification}</p>
                    <p className="t-body-s c-tertiary">{e.org}</p>
                    {e.detail ? <p className="t-body-s c-secondary">{e.detail}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.block} data-reveal>
            <h3 className="t-label c-tertiary">Learning</h3>
            <ul className={styles.learning}>
              {learning.map((l) => (
                <li key={l} className="t-body-s c-secondary">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <dl className={styles.facts} data-reveal>
            <div>
              <dt className="t-label c-tertiary">Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt className="t-label c-tertiary">Worked across</dt>
              <dd>US · UAE · India</dd>
            </div>
            <div>
              <dt className="t-label c-tertiary">Mphasis</dt>
              <dd>Since 2015</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
