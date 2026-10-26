"use client";

import type { Shot } from "@/content/types";
import { ScreenView } from "./index";
import { AutoVideo } from "@/components/ui/AutoVideo";

/** Renders any Shot: a rebuilt screen, a real image, or a muted looping video. */
export function ShotMedia({ shot, maxScale, eager }: { shot: Shot; maxScale?: number; eager?: boolean }) {
  if (shot.screen) return <ScreenView id={shot.screen} alt={shot.alt} maxScale={maxScale} />;
  if (shot.video && shot.sound !== undefined && shot.poster)
    return <AutoVideo src={shot.video} poster={shot.poster} label={shot.alt} sound={shot.sound} width={shot.width} height={shot.height} />;
  // Silent recordings ship as WebM with an MP4 fallback next to it.
  if (shot.video)
    return <AutoVideo src={shot.video} webm={shot.video.replace(/\.mp4$/, ".webm")} poster={shot.poster} label={shot.alt} width={shot.width} height={shot.height} />;
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
