"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import styles from "./RevealHeading.module.css";

/**
 * A centred serif section heading whose words light up, one after another,
 * as it scrolls into view (tertiary text to primary; both pass AA, so the
 * heading is readable at every point). Static and fully lit under reduced motion.
 */
export function RevealHeading({
  id,
  text,
  intro,
  label,
  align = "center",
}: {
  id: string;
  text: string;
  intro?: React.ReactNode;
  label?: string;
  align?: "center" | "left";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.dataset.lit = "true"));
      return;
    }
    words.forEach((w) => (w.dataset.lit = "false"));
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      end: "top 52%",
      onUpdate: (self) => {
        const lit = self.progress * (words.length + 0.5);
        words.forEach((w, i) => (w.dataset.lit = i < lit ? "true" : "false"));
      },
    });
    // Already past it on load (deep link or refresh): light everything.
    if (st.progress >= 1) words.forEach((w) => (w.dataset.lit = "true"));
    return () => st.kill();
  }, []);

  return (
    <div className={styles.head} data-align={align}>
      {label && <p className={styles.label}>{label}</p>}
      <h2 id={id} ref={ref} className={styles.title}>
        {text.split(" ").map((w, i) => (
          <span key={i} data-w>
            {w}{" "}
          </span>
        ))}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}
