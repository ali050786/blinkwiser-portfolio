"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import styles from "./Header.module.css";

/*
 * One line, 64px, no boxes: the name on the left; on the right the two
 * section links, a hairline, then Resume and the theme switch. The link for
 * the part of the page you're in is marked (an accent underline), so the bar
 * also tells you where you are. Transparent at the top, a blurred bar with a
 * bottom hairline once the page scrolls.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which nav target is on screen: case pages are always "work"; on home, watch the sections.
  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setSection("work");
      return;
    }
    if (pathname !== "/") {
      setSection(null);
      return;
    }
    const ids = nav.map((n) => n.href.split("#")[1]).filter(Boolean) as string[];
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        setSection(ids.filter((id) => seen.get(id)).pop() ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled || open || undefined}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.name}>{site.name}</span>
          <span className={styles.role}>{site.role}</span>
        </Link>

        <div className={styles.right}>
          <nav aria-label="Primary" className={styles.nav}>
            <ul>
              {nav.map((item) => {
                const id = item.href.split("#")[1];
                const on = id === section;
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.link} aria-current={on ? "location" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span className={styles.rule} aria-hidden="true" />
          {site.resumeUrl && (
            <a href={site.resumeUrl} className={styles.resume}>
              Resume
              <Icon name="arrow-up-right" size={14} />
            </a>
          )}
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className={styles.sheet}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
          >
            <ul className="container">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.sheetLink} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {site.resumeUrl && (
                <li>
                  <a href={site.resumeUrl} className={styles.sheetLink}>
                    Resume
                  </a>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
