"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { career, type CareerChapter } from "@/content/career";
import styles from "./CareerTimeline.module.css";

/*
 * The hero's career timeline, latest first: one straight line, four stops.
 * Above the line, the brief as it arrived (struck through); below it, what
 * changed and the result. Everything is readable at rest; hover, focus or a
 * first tap highlights one stop and reveals its case link.
 */

const DRAW = 1.4;
const DELAY = 0.9;

export function CareerTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const pointer = useRef<string>("mouse");

  // Tap or click outside the timeline returns it to rest.
  useEffect(() => {
    if (!active) return;
    const off = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", off);
    return () => document.removeEventListener("pointerdown", off);
  }, [active]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const segs = Array.from(el.querySelectorAll<HTMLElement>("[data-seg]"));
        const dots = Array.from(el.querySelectorAll<HTMLElement>("[data-dot]"));
        const stops = Array.from(el.querySelectorAll<HTMLElement>("[data-stop-text]"));
        const keys = el.querySelectorAll<HTMLElement>("[data-key]");
        const vertical = getComputedStyle(segs[0]!).getPropertyValue("--axis").trim() === "y";

        gsap.set(segs, vertical ? { scaleY: 0, transformOrigin: "top" } : { scaleX: 0, transformOrigin: "left" });
        gsap.set(dots, { scale: 0 });
        gsap.set(stops, { autoAlpha: 0, y: 6 });

        const step = DRAW / segs.length;
        const tl = gsap.timeline({ delay: DELAY });
        tl.from(keys, { autoAlpha: 0, duration: 0.4 }, 0);
        segs.forEach((s, i) => {
          const t = i * step;
          tl.to(s, vertical ? { scaleY: 1, duration: step, ease: "none" } : { scaleX: 1, duration: step, ease: "none" }, t);
          tl.to(dots[i]!, { scale: 1, duration: 0.3, ease: "back.out(2.4)" }, t + step * 0.3);
          tl.to(stops.filter((n) => n.dataset.stopText === career[i]!.id), { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.04 }, t + step * 0.3);
        });
        tl.add(() => gsap.set([...segs, ...dots, ...stops], { clearProps: "transform,opacity,visibility" }));
        return () => tl.kill();
      });
    },
    { scope: root },
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setActive(null);
      (document.activeElement as HTMLElement | null)?.blur();
    }
  };
  const onBlur = (e: React.FocusEvent) => {
    if (!root.current?.contains(e.relatedTarget as Node)) setActive(null);
  };

  const stop = (c: CareerChapter) => {
    const isActive = active === c.id;
    const common = {
      className: styles.orgLink,
      onPointerDown: (e: React.PointerEvent) => {
        pointer.current = e.pointerType;
      },
      onFocus: () => setActive(c.id),
    };
    return (
      <li
        key={c.id}
        className={styles.stop}
        data-current={c.current || undefined}
        data-active={isActive || undefined}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setActive(c.id);
        }}
      >
        <span className={`t-label ${styles.years}`} data-stop-text={c.id}>
          {c.years}
        </span>
        <span className={styles.org} data-stop-text={c.id}>
          {c.href ? (
            <Link
              href={c.href}
              {...common}
              onClick={(e) => {
                // Touch: the first tap highlights, the second follows the link.
                if (pointer.current !== "mouse" && !isActive) {
                  e.preventDefault();
                  setActive(c.id);
                }
              }}
            >
              {c.org}
            </Link>
          ) : (
            <button type="button" aria-pressed={isActive} {...common} onClick={() => setActive(isActive ? null : c.id)}>
              {c.org}
            </button>
          )}
        </span>
        <span className={styles.brief} data-stop-text={c.id}>
          <span className="sr-only">The brief: </span>
          <s>{c.brief}</s>
        </span>
        <span className={styles.node} aria-hidden="true">
          <span className={styles.seg} data-seg />
          <span className={styles.dot} data-dot />
        </span>
        <span className={styles.fix} data-stop-text={c.id}>
          <span className="sr-only">What I changed: </span>
          {c.fix}
        </span>
        <span className={`t-label ${styles.result}`} data-stop-text={c.id}>
          {c.result}
        </span>
        <span className={`t-label ${styles.read}`} aria-hidden="true">
          {c.href && c.caseIndex ? `Read case ${c.caseIndex} →` : ""}
        </span>
      </li>
    );
  };

  return (
    <div ref={root} className={styles.wrap}>
      <div
        className={styles.timeline}
        data-active={active ?? undefined}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setActive(null);
        }}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      >
        <span className={`t-label ${styles.key} ${styles.keyBrief}`} data-key aria-hidden="true">
          The brief
        </span>
        <span className={`t-label ${styles.key} ${styles.keyChanged}`} data-key aria-hidden="true">
          What I changed
        </span>
        <ol className={styles.stops} aria-label="Career, latest first: the brief, and what I changed">
          {career.map(stop)}
        </ol>
      </div>
      <p className={`t-body-s c-tertiary ${styles.note}`} data-key>
        Team-observed figures. How each was measured, and how sure I am it was the design, is in the study.
      </p>
    </div>
  );
}
