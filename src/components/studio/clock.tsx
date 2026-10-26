"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import s from "./Studio.module.css";

/*
 * Shared by the trailer studios (src/app/studio). Everything in a trailer is
 * a pure function of one clock, `t` in seconds, so any frame can be drawn
 * exactly: the page plays in real time for preview, and
 * scripts/record-trailer.py steps it one frame at a time through
 * window.__trailer.setTime.
 */

/* ---------------------------------------------------------------- timing */

export const clamp = (x: number) => Math.min(1, Math.max(0, x));
export const outCubic = (x: number) => 1 - (1 - x) ** 3;
export const inOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
/** 0 to 1 over [a, a + d], eased out. */
export const ramp = (t: number, a: number, d = 0.45) => outCubic(clamp((t - a) / d));
/** 1 while t is inside [a, b], fading in and out over f seconds. A start at or below 0 means already in. */
export const live = (t: number, a: number, b: number, f = 0.3) => Math.min(a <= 0 ? 1 : ramp(t, a, f), 1 - ramp(t, b - f, f));
/** Fade and rise in at a. */
export const rise = (t: number, a: number, dy = 18): React.CSSProperties => {
  const p = ramp(t, a, 0.5);
  return { opacity: p, transform: `translateY(${(1 - p) * dy}px)`, display: "inline-block" };
};

/* ---------------------------------------------------------------- colour */

export type Rgb = [number, number, number];
export const hex = (h: string): Rgb => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb;
export const mix = (a: Rgb, b: Rgb, p: number): Rgb => [0, 1, 2].map((i) => a[i]! + (b[i]! - a[i]!) * p) as Rgb;
export const css = (c: Rgb) => `rgb(${c.map((v) => Math.round(v)).join(", ")})`;
export const WHITE: Rgb = [255, 255, 255];
export const NIGHT = hex("#0e1116");

/** A soft radial blob for the drifting gradient backdrops. */
export const blob = (x: number, y: number, r: number, c: string) => `radial-gradient(${r}% ${r}% at ${x}% ${y}%, ${c}, transparent 70%)`;

/* ------------------------------------------------------------ the clock */

declare global {
  interface Window {
    __trailer?: { duration: number; fps: number; setTime: (t: number) => Promise<void> };
  }
}

/** The clock, preview playback, the recorder hook and the fit-to-window scale for a stage of width x height. */
export function useStudio(duration: number, fps: number, width: number, height: number) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [record, setRecord] = useState(false);
  const [scale, setScale] = useState(1);

  // The recorder drives the clock directly and waits for two frames after each step.
  useEffect(() => {
    setRecord(new URLSearchParams(window.location.search).has("record"));
    window.__trailer = {
      duration,
      fps,
      setTime: (v: number) =>
        new Promise((res) => {
          setT(v);
          requestAnimationFrame(() => requestAnimationFrame(() => res()));
        }),
    };
    return () => {
      delete window.__trailer;
    };
  }, [duration, fps]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((v) => (v + dt >= duration ? 0 : v + dt));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, duration]);

  useLayoutEffect(() => {
    if (record) return setScale(1);
    const fit = () => setScale(Math.min(window.innerWidth / width, (window.innerHeight - 90) / height));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [record, width, height]);

  return { t, setT, playing, setPlaying, record, scale, duration, fps, width, height };
}

export type Studio = ReturnType<typeof useStudio>;

/** The page around a stage: letterboxed preview with play and scrub controls, or a bare stage for recording. */
export function StudioShell({ studio, children }: { studio: Studio; children: React.ReactNode }) {
  const { t, setT, playing, setPlaying, record, scale, duration, fps, width, height } = studio;
  return (
    <div className={s.shell} data-record={record || undefined}>
      {/* The dev-mode badge would show up in the recording. */}
      <style>{"nextjs-portal{display:none!important}"}</style>
      <div className={s.fit} style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
      {!record && (
        <div className={s.controls}>
          <button type="button" onClick={() => setPlaying((p) => !p)}>
            {playing ? "Pause" : "Play"}
          </button>
          <input type="range" min={0} max={duration} step={1 / fps} value={t} onChange={(e) => setT(Number(e.target.value))} aria-label="Time" />
          <span>{t.toFixed(2)} s</span>
        </div>
      )}
    </div>
  );
}
