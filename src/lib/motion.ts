"use client";

import { useEffect, useState } from "react";
import { useReducedMotion as useMotionReduced } from "motion/react";

/**
 * Motion's useReducedMotion reads the media query during the first client
 * render, which can differ from the server render and break hydration. This
 * version reports false until mounted, then the real preference.
 */
export function useReducedMotionSafe(): boolean {
  const reduce = useMotionReduced();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!reduce : false;
}
