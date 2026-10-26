import Link from "next/link";
import { site } from "@/content/site";
import { CopyEmail } from "@/components/home/CopyEmail";
import styles from "./Footer.module.css";

/** One quiet line: where to find me on the left, the year and city on the right. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <ul className={styles.links} aria-label="Elsewhere">
          <li>
            <a href={site.linkedin} rel="me noopener" target="_blank" data-cursor-text="Open LinkedIn">
              LinkedIn
            </a>
          </li>
          <li>
            <CopyEmail email={site.email} className={styles.email} />
          </li>
          {site.resumeUrl && (
            <li>
              <Link href={site.resumeUrl}>Resume</Link>
            </li>
          )}
          <li>
            <a href={site.blinkwiser} target="_blank" rel="noopener" data-cursor-text="Open Blinkwiser">
              Blinkwiser
            </a>
          </li>
          <li>
            <Link href="/colophon">Colophon</Link>
          </li>
        </ul>
        <p className={styles.base}>
          © {new Date().getFullYear()} {site.name}, {site.location}
        </p>
      </div>
    </footer>
  );
}
