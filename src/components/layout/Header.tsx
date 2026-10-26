"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { openAsk } from "@/lib/ask";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import styles from "./Header.module.css";

/*
 * Minimal bar (2026-10-26): the name and three text links on the left, the
 * chat button and the theme switch on the right. The current page's link is
 * in the primary text colour; the others sit back in the tertiary grey. No
 * underline, no boxes. A soft blurred background appears once the page scrolls.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Case pages belong to Work.
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" || pathname.startsWith("/work") : pathname.startsWith(href));

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Primary" className={styles.left}>
          <Link href="/" className={styles.name}>
            {site.name}
          </Link>
          <ul className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
            {site.resumeUrl && (
              <li>
                <Link href={site.resumeUrl} className={styles.link} aria-current={pathname.startsWith(site.resumeUrl) ? "page" : undefined}>
                  Resume
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.right}>
          <button type="button" className={styles.ask} onClick={() => openAsk()} data-cursor-text="Ask about my work">
            <Icon name="spark" size={15} />
            <span>Ask about Ali</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
