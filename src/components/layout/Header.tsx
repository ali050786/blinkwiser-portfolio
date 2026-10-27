"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { nav, site } from "@/content/site";
import { openAsk } from "@/lib/ask";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import styles from "./Header.module.css";

/*
 * Two states (2026-10-26):
 * - At the top: the minimal bar. Name and three text links on the left, the
 *   chat button and the theme switch on the right.
 * - Once the page scrolls: a small floating toolbar at the top centre with
 *   the name and four icons (Work, Lab, About, Resume). Hovering an icon slides
 *   its label out.
 * The bar's background and the name are shared elements (layoutId), so the
 * header visibly shrinks into the toolbar and grows back; everything else
 * fades. Reduced motion switches instantly.
 *
 * While the pointer or focus is in the toolbar it is pinned at its left edge,
 * so a label sliding out grows the pill to the right and never moves the
 * item under the pointer. It re-centres once every label has closed.
 */

const ON_AT = 72; // scroll past this to switch to the toolbar
const OFF_AT = 28; // back above this to switch back (the gap stops flicker)
const UNPIN_AFTER = 380; // ms: a little longer than a label takes to close

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const toolbar = useRef<HTMLDivElement>(null);
  const unpin = useRef<number | undefined>(undefined);

  // Pinning writes to the DOM, not React state, so the shared-element morph never sees it.
  const pin = () => {
    window.clearTimeout(unpin.current);
    const el = toolbar.current;
    if (!el || el.dataset.pinned) return;
    el.style.left = `${el.offsetLeft}px`;
    el.style.top = `${el.offsetTop}px`;
    el.dataset.pinned = "";
  };
  const unpinNow = () => {
    window.clearTimeout(unpin.current);
    const el = toolbar.current;
    if (!el) return;
    el.style.left = "";
    el.style.top = "";
    delete el.dataset.pinned;
  };
  const release = () => {
    window.clearTimeout(unpin.current);
    unpin.current = window.setTimeout(unpinNow, UNPIN_AFTER);
  };
  useEffect(() => () => window.clearTimeout(unpin.current), []);

  // Wide screens scroll the page area beside the Ask panel (layout.tsx); phones scroll the window.
  useEffect(() => {
    const page = document.getElementById("page");
    let on = false;
    const update = () => {
      const y = Math.max(window.scrollY, page?.scrollTop ?? 0);
      if (!on && y > ON_AT) on = true;
      else if (on && y < OFF_AT) on = false;
      setCompact(on);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    page?.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      page?.removeEventListener("scroll", update);
    };
  }, []);

  // A new page starts at the top of the page area too; the browser only resets the window.
  useEffect(() => {
    const page = document.getElementById("page");
    if (page && !window.location.hash) page.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Case pages belong to Work.
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" || pathname.startsWith("/work") : pathname.startsWith(href));

  const morph = reduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
  const fade = reduce ? { duration: 0 } : { duration: 0.22, ease: "easeOut" as const };
  const late = { ...fade, delay: reduce ? 0 : 0.2 };

  const links = [...nav, ...(site.resumeUrl ? [{ href: site.resumeUrl, label: "Resume" }] : [])];
  const icons: Record<string, "grid" | "flask" | "user" | "file"> = { Work: "grid", Lab: "flask", About: "user", Resume: "file" };

  return (
    <header className={styles.header} data-compact={compact || undefined}>
      <LayoutGroup>
        <div className={`container ${styles.inner}`}>
          <AnimatePresence initial={false} mode="popLayout">
            {compact ? (
              // The toolbar shows its own labels, so the custom cursor stays quiet over all of it.
              <motion.div
                key="toolbar"
                ref={toolbar}
                className={styles.toolbar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: fade }}
                exit={{ opacity: 0, transition: fade }}
                data-cursor-quiet
                onPointerEnter={pin}
                onPointerLeave={release}
                onFocus={pin}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) release();
                }}
              >
                <motion.span layoutId="header-surface" className={styles.surface} transition={morph} style={{ borderRadius: 999 }} />
                <motion.span layoutId="header-name" className={styles.nameWrap} transition={morph}>
                  <Link href="/" className={styles.toolName}>
                    {site.name}
                  </Link>
                </motion.span>
                <motion.span className={styles.divider} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={late} />
                <motion.nav aria-label="Primary" className={styles.tools} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={late}>
                  {links.map((item) => (
                    <Link key={item.href} href={item.href} className={styles.tool} aria-label={item.label} aria-current={isCurrent(item.href) ? "page" : undefined}>
                      <Icon name={icons[item.label] ?? "grid"} size={18} />
                      <span className={styles.toolLabel} aria-hidden="true">
                        <span>{item.label}</span>
                      </span>
                    </Link>
                  ))}
                </motion.nav>
                <motion.span className={styles.divider} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={late} />
                <motion.div className={styles.tools} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={late}>
                  <button
                    type="button"
                    className={`${styles.tool} ${styles.toolAsk}`}
                    // The page narrows as the chat docks: let the toolbar re-centre with it.
                    onClick={() => {
                      unpinNow();
                      openAsk();
                    }}
                    aria-label="Ask about Ali"
                  >
                    <Icon name="mark" size={18} />
                    <span className={styles.toolLabel} aria-hidden="true">
                      <span>Ask about Ali</span>
                    </span>
                  </button>
                  <ThemeToggle />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="bar" className={styles.bar} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: fade }} exit={{ opacity: 0, transition: fade }}>
                <motion.span layoutId="header-surface" className={styles.surfaceFull} transition={morph} style={{ borderRadius: 0 }} />
                <nav aria-label="Primary" className={styles.left}>
                  <motion.span layoutId="header-name" className={styles.nameWrap} transition={morph}>
                    <Link href="/" className={styles.name}>
                      {site.name}
                    </Link>
                  </motion.span>
                  <motion.ul className={styles.links} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={late}>
                    {links.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={styles.link} aria-current={isCurrent(item.href) ? "page" : undefined}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                </nav>
                <motion.div className={styles.right} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={late}>
                  <button type="button" className={styles.ask} onClick={() => openAsk()} data-cursor-text="Ask about my work">
                    <Icon name="mark" size={15} />
                    <span>Ask about Ali</span>
                  </button>
                  <ThemeToggle />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </header>
  );
}
