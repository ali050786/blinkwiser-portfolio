"use client";

import { useEffect, useRef } from "react";
import type { Shot } from "@/content/types";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { ScreenView } from "./index";
import { AutoVideo } from "@/components/ui/AutoVideo";

/** Renders any Shot: a rebuilt screen, a real image, or a muted looping video. */
export function ShotMedia({ shot, maxScale, eager }: { shot: Shot; maxScale?: number; eager?: boolean }) {
  const reduce = useReducedMotion();
  const vid = useRef<HTMLVideoElement>(null);

  // Start (or stop) playback after hydration; the autoplay attribute alone
  // isn't re-applied once the reduced-motion preference is known.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => {});
  }, [reduce]);

  if (shot.screen) return <ScreenView id={shot.screen} alt={shot.alt} maxScale={maxScale} />;
  if (shot.video && shot.sound !== undefined && shot.poster)
    return <AutoVideo src={shot.video} poster={shot.poster} label={shot.alt} sound={shot.sound} />;
  if (shot.video)
    return (
      <video
        ref={vid}
        poster={shot.poster}
        width={shot.width}
        height={shot.height}
        muted
        loop
        playsInline
        autoPlay={!reduce}
        controls={reduce}
        preload="metadata"
        aria-label={shot.alt}
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <source src={shot.video.replace(/\.mp4$/, ".webm")} type="video/webm" />
        <source src={shot.video} type="video/mp4" />
      </video>
    );
  return (
    <img
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
}
