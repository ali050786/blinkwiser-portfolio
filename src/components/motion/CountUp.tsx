"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";

/** Counts up once when scrolled into view. Server-renders the final value. */
export function CountUp({ to, duration = 1.4, decimals = 0 }: { to: number; duration?: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (started.current) return;
    if (!inView) {
      setValue(0);
      return;
    }
    started.current = true;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, decimals]);

  return (
    <span ref={ref}>
      <span className="sr-only">{to.toFixed(decimals)}</span>
      <span aria-hidden="true">{value.toFixed(decimals)}</span>
    </span>
  );
}
