import Link from "next/link";
import { site } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import styles from "./Footer.module.css";

/** Deploy's footer: brand and line on the left, link columns, a mono base line. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.wrap} ${styles.grid}`}>
        <div className={styles.lead}>
          <p className={styles.brand}>
            {site.name}
            <span className={styles.role}>{site.role}</span>
          </p>
          <p className={styles.blurb}>
            I lead design on regulated enterprise SaaS, from health insurance to civic services to AI products. Open to senior and lead UX roles,
            ideally in health tech or on an AI product.
          </p>
          <a href={`mailto:${site.email}`} className={styles.mail}>
            <i aria-hidden="true" />
            {site.email}
          </a>
        </div>

        <nav aria-label="Case studies" className={styles.col}>
          <p className={styles.label}>
            <i aria-hidden="true" /> Case studies
          </p>
          <ul>
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link href={`/work/${c.slug}`}>{c.short}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Elsewhere" className={styles.col}>
          <p className={styles.label}>
            <i aria-hidden="true" /> Elsewhere
          </p>
          <ul>
            <li>
              <a href={site.linkedin} rel="me noopener" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.blinkwiser} target="_blank" rel="noopener">
                Blinkwiser
              </a>
            </li>
            {site.resumeUrl && (
              <li>
                <a href={site.resumeUrl}>Resume</a>
              </li>
            )}
            <li>
              <Link href="/colophon">Colophon</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={`${styles.wrap} ${styles.base}`}>
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
