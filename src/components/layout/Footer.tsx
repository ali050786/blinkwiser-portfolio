import Link from "next/link";
import { site } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.lead}>
          <p className="t-heading-m">
            {site.name}
            <span className="c-tertiary"> · {site.role}</span>
          </p>
          <p className="t-body-s c-secondary">
            Designed and built in-house with Next.js, a three-tier token pipeline, GSAP and Motion. Case studies are public-safe: clients anonymised, visuals redrawn with demo brands.
          </p>
        </div>

        <nav aria-label="Case studies" className={styles.col}>
          <p className="t-label c-tertiary">Case studies</p>
          <ul>
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link href={`/work/${c.slug}`}>
                  <span className="t-mono c-tertiary">{c.index}</span> {c.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Elsewhere" className={styles.col}>
          <p className="t-label c-tertiary">Elsewhere</p>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>Email</a>
            </li>
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
                <a href={site.resumeUrl}>Résumé</a>
              </li>
            )}
            <li>
              <Link href="/colophon">Colophon</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={`container ${styles.base}`}>
        <p className="t-label c-tertiary">© {new Date().getFullYear()} {site.name}</p>
        <p className="t-label c-tertiary">{site.location}</p>
      </div>
    </footer>
  );
}
