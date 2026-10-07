"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AutoVideo.module.css";

/**
 * A silent, looping video that plays itself while it's on screen. No player
 * chrome: one small pause button (moving content longer than 5 s must be
 * pausable, WCAG 2.2.2) and, when the video has a soundtrack, a sound toggle.
 * Muted by default. With reduced motion it stays on the poster until played.
 */
export function AutoVideo({ src, poster, label, sound = false, className }: { src: string; poster: string; label: string; sound?: boolean; className?: string }) {
  const vid = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  // Set when the visitor pauses, so scrolling back doesn't restart it against their wish.
  const userPaused = useRef(false);
  const inView = useRef(false);

  useEffect(() => {
    const v = vid.current;
    const w = wrap.current;
    if (!v || !w) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;
    const sync = () => {
      if (inView.current && !userPaused.current && !document.hidden) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = !!e && e.intersectionRatio >= 0.35;
        sync();
      },
      { threshold: [0, 0.35, 0.6] },
    );
    io.observe(w);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = vid.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  };

  return (
    <div ref={wrap} className={`${styles.wrap} ${className ?? ""}`}>
      <video ref={vid} className={styles.video} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
      <div className={styles.controls}>
        {sound && (
          <button type="button" className={styles.btn} onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"} title={muted ? "Sound on" : "Sound off"}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3.5 7.5h3l4-3.5v12l-4-3.5h-3z" fill="currentColor" />
              {muted ? <path d="M13.5 7.5l4 5m0-5l-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /> : <path d="M13.5 7a4 4 0 0 1 0 6m2-8.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />}
            </svg>
          </button>
        )}
        <button type="button" className={styles.btn} onClick={toggle} aria-label={playing ? "Pause video" : "Play video"} title={playing ? "Pause" : "Play"}>
          <svg viewBox="0 0 20 20" aria-hidden="true">{playing ? <path d="M6 4.5h2.6v11H6zm5.4 0H14v11h-2.6z" fill="currentColor" /> : <path d="M6.5 4.5v11l9-5.5z" fill="currentColor" />}</svg>
        </button>
      </div>
    </div>
  );
}
