"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

/** Browser chrome colour per theme (matches --surface-canvas). */
const chrome: Record<Theme, string> = { light: "#f7f9fa", dark: "#060707" };
const paintChrome = (t: Theme) => document.querySelector('meta[name="theme-color"]')?.setAttribute("content", chrome[t]);

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Light unless the visitor has chosen dark; the OS setting is not consulted.
  useEffect(() => {
    const t: Theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(t);
    paintChrome(t);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    paintChrome(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the choice lasts for this page view */
    }
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={label} title={label} data-theme-state={theme ?? "unknown"}>
      <span className={styles.icons} aria-hidden="true">
        <Icon name="sun" className={styles.sun} />
        <Icon name="moon" className={styles.moon} />
      </span>
    </button>
  );
}
