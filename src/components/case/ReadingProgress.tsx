"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A thin bar across the top of a case page that fills as you read. It follows
 * whichever is scrolling: the page area beside the Ask panel on wide screens
 * (layout.tsx), or the window on phones. It stops at the panel's edge.
 */
export function ReadingProgress() {
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const page = document.getElementById("page");
    const update = () => {
      const el = page && page.scrollHeight > page.clientHeight + 1 ? page : document.scrollingElement;
      if (!el) return;
      const max = el.scrollHeight - el.clientHeight;
      progress.set(max > 0 ? el.scrollTop / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    page?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      page?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: "var(--ask-space)",
        height: 2,
        background: "var(--accent-solid)",
        transformOrigin: "0 50%",
        zIndex: 60,
        transition: "right var(--duration-slow) var(--ease-emphasized)",
      }}
    />
  );
}
