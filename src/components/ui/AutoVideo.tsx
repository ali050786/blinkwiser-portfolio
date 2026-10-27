"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import styles from "./AutoVideo.module.css";

/**
 * The one video player on the site: a silent loop that plays itself while
 * it's on screen.
 *
 * - A shimmer holds the space until the first frame is ready, then the
 *   video fades and rises in (static under reduced motion).
 * - Controls (pause, replay, and sound when there is a soundtrack) appear on
 *   hover or keyboard focus, and stay visible on touch screens. Moving content
 *   longer than 5 s must be pausable (WCAG 2.2.2).
 * - With reduced motion it waits on the poster until played.
 * - A visitor's pause sticks: scrolling back doesn't restart it.
 *
 * `fill` makes it cover its positioned parent (home cards); otherwise it keeps
 * its own aspect ratio from width and height (16:9 when they're not given).
 */
export function AutoVideo({
  src,
  webm,
  poster,
  label,
  sound = false,
  width,
  height,
  fill = false,
  className,
}: {
  src: string;
  /** Optional WebM version, offered before the MP4. */
  webm?: string;
  poster?: string;
  label: string;
  sound?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
}) {
  const vid = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const userPaused = useRef(false);
  const inView = useRef(false);

  useEffect(() => {
    const v = vid.current;
    const w = wrap.current;
    if (!v || !w) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      userPaused.current = true;
      setReady(true);
    }
    // The first frame may already be in when hydration finishes.
    if (v.readyState >= 2) setReady(true);

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

    const onReady = () => setReady(true);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("loadeddata", onReady);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      v.removeEventListener("loadeddata", onReady);
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

  const replay = () => {
    const v = vid.current;
    if (!v) return;
    userPaused.current = false;
    v.currentTime = 0;
    v.play().catch(() => {});
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

  const ratio = width && height ? `${width} / ${height}` : "16 / 9";

  return (
    <div
      ref={wrap}
      className={`${styles.wrap} ${className ?? ""}`}
      data-fill={fill || undefined}
      data-ready={ready || undefined}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <video
        ref={vid}
        className={styles.video}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      >
        {webm && <source src={webm} type="video/webm" />}
        <source src={src} type="video/mp4" />
      </video>
      <div className={styles.controls} data-controls>
        {sound && (
          <button type="button" className={styles.btn} onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"} data-cursor-text={muted ? "Sound on" : "Sound off"}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3.5 7.5h3l4-3.5v12l-4-3.5h-3z" fill="currentColor" />
              {muted ? (
                <path d="M13.5 7.5l4 5m0-5l-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M13.5 7a4 4 0 0 1 0 6m2-8.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              )}
            </svg>
          </button>
        )}
        <button type="button" className={styles.btn} onClick={replay} aria-label="Replay video" data-cursor-text="Replay">
          <Icon name="replay" size={16} />
        </button>
        <button type="button" className={styles.btn} onClick={toggle} aria-label={playing ? "Pause video" : "Play video"} data-cursor-text={playing ? "Pause" : "Play"}>
          <Icon name={playing ? "pause" : "play"} size={16} />
        </button>
      </div>
    </div>
  );
}
