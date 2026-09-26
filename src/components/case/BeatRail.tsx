"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import styles from "./BeatRail.module.css";

type BeatLink = { id: string; n: string; label: string };
type ForkLink = { id: string; title: string };

/** Sticky outline of the five beats, tracking the one being read. */
export function BeatRail({ beats, forks }: { beats: BeatLink[]; forks: ForkLink[] }) {
  const [active, setActive] = useState(beats[0]!.id);
  const [activeFork, setActiveFork] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.beat!;
          if (e.isIntersecting) visible.set(id, e.boundingClientRect.top);
          else visible.delete(id);
        }
        // The beat whose top is closest above the reading line wins.
        const order = beats.map((b) => b.id).filter((id) => visible.has(id));
        if (order.length) setActive(order[0]!);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-beat]").forEach((el) => io.observe(el));

    const fio = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveFork((e.target as HTMLElement).dataset.fork!);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-fork]").forEach((el) => fio.observe(el));
    return () => {
      io.disconnect();
      fio.disconnect();
    };
  }, [beats]);

  const index = beats.findIndex((b) => b.id === active);

  return (
    <nav className={styles.rail} aria-label="Case study sections">
      <p className="t-label c-tertiary">In this study</p>
      <div className={styles.track}>
        <motion.span
          className={styles.fill}
          initial={false}
          animate={{ scaleY: (index + 1) / beats.length }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 28 }}
        />
      </div>
      <ol className={styles.list}>
        {beats.map((b) => (
          <li key={b.id}>
            <a href={`#${b.id}`} className={styles.link} aria-current={active === b.id ? "location" : undefined}>
              <span className="t-mono">{b.n}</span>
              {b.label}
            </a>
            {b.id === "decisions" && (
              <ol className={styles.forks} data-open={active === "decisions" || undefined}>
                {forks.map((f, i) => (
                  <li key={f.id}>
                    <a href={`#fork-${f.id}`} aria-current={active === "decisions" && activeFork === f.id ? "location" : undefined}>
                      <span className="t-mono">F{i + 1}</span>
                      <span className={styles.forkTitle}>{f.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
