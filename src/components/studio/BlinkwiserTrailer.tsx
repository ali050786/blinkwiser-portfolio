"use client";

import { useLayoutEffect, useRef } from "react";
import { site } from "@/content/site";
import { StudioShell, blob, clamp, inOut, lerp, live, ramp, rise, useStudio } from "./clock";
import s from "./BlinkwiserTrailer.module.css";

/*
 * The Blinkwiser trailer (case 04), 2026-10-26: the case's story told over
 * the real screen recording of the live studio (public/work/blinkwiser/run.mp4,
 * already sped up three times). The first version's problem, the studio, the
 * agent team at work, the first slides, what makes it trustworthy, and the
 * eval numbers. On a dark stage in the product's own violet, so it doesn't
 * read like the light case 03 trailer beside it on the home page.
 */

export const DURATION = 22.4;
export const FPS = 30;

/**
 * One trailer, two shapes. `card` is 4:3 for the home card: headline on top,
 * the recording below. `wide` is 2.3:1 for the case page's hero: headline on
 * the left, the recording on the right. Centre cards stay centred in both.
 */
type Layout = "card" | "wide";
const SIZE: Record<Layout, [number, number]> = { card: [1440, 1080], wide: [1920, 840] };
/** Where the recording sits: left, top and width. It's 2:1, so its height is half its width. */
const SHOT: Record<Layout, { x: number; y: number; w: number }> = {
  card: { x: 96, y: 400, w: 1248 },
  wide: { x: 720, y: 145, w: 1100 },
};

/* ---------------------------------------------------------- the recording */

/** Trailer time to recording time: the prompt near real speed, a skip past the first wait, then about 1.5 times. */
const CLIP: [number, number][] = [
  [3.2, 0],
  [4.3, 0.9],
  [4.7, 2.9],
  [10.6, 11.9],
  [12.4, 14.6],
];

function clipAt(t: number) {
  if (t <= CLIP[0]![0]) return CLIP[0]![1];
  for (let i = 1; i < CLIP.length; i++) {
    const [ta, a] = CLIP[i - 1]!;
    const [tb, b] = CLIP[i]!;
    if (t <= tb) return lerp(a, b, (t - ta) / (tb - ta));
  }
  return CLIP[CLIP.length - 1]![1];
}

/** The camera on the recording: zoom s toward focus (fx, fy), as fractions of the frame. */
const CAMERA = [
  { t: 0, s: 3, fx: 0.195, fy: 0.925 }, // the prompt box
  { t: 4.3, s: 3, fx: 0.195, fy: 0.925 },
  { t: 4.95, s: 2.6, fx: 0.195, fy: 0.2 }, // the agent steps, following each one down
  { t: 10.3, s: 2.6, fx: 0.195, fy: 0.37 },
  { t: 11.1, s: 1, fx: 0.5, fy: 0.5 }, // the whole studio as the first slide lands
  { t: 12.3, s: 1, fx: 0.5, fy: 0.5 },
  { t: 13.5, s: 1.3, fx: 0.638, fy: 0.48 }, // the slide
  { t: 16.4, s: 1.42, fx: 0.638, fy: 0.44 },
];

function cameraAt(t: number) {
  let i = 1;
  while (i < CAMERA.length - 1 && t > CAMERA[i]!.t) i++;
  const a = CAMERA[i - 1]!;
  const b = CAMERA[i]!;
  const p = inOut(clamp((t - a.t) / (b.t - a.t)));
  return { s: lerp(a.s, b.s, p), fx: lerp(a.fx, b.fx, p), fy: lerp(a.fy, b.fy, p) };
}

/** The recording, seeked to the frame for this moment. The recorder waits for each seek. */
function Shot({ t, layout }: { t: number; layout: Layout }) {
  const video = useRef<HTMLVideoElement>(null);
  const at = clipAt(t);
  useLayoutEffect(() => {
    const v = video.current;
    if (v && Math.abs(v.currentTime - at) > 0.001) v.currentTime = at;
  }, [at]);
  const { x, y, w } = SHOT[layout];
  const h = w / 2;
  const o = live(t, 2.7, 16.6, 0.5);
  const enter = ramp(t, 2.7, 0.8);
  const leave = ramp(t, 16.2, 0.45);
  const cam = cameraAt(t);
  // Centre the focus point, without showing past the recording's edges.
  const tx = Math.min(0, Math.max(w - w * cam.s, w / 2 - cam.fx * w * cam.s));
  const ty = Math.min(0, Math.max(h - h * cam.s, h / 2 - cam.fy * h * cam.s));
  return (
    <div className={s.shot} style={{ left: x, top: y, width: w, height: h, opacity: o, transform: `translateY(${(1 - enter) * 80 + leave * 40}px)` }}>
      <video ref={video} src="/work/blinkwiser/run.mp4" muted playsInline preload="auto" style={{ transform: `translate(${tx}px, ${ty}px) scale(${cam.s})` }} />
    </div>
  );
}

/* ----------------------------------------------------------------- the story */

/** The agent steps, lit when each one starts in the recording. */
const JOBS = [
  { label: "Research", at: 5.09 },
  { label: "Fact sheet", at: 6.08 },
  { label: "Outline", at: 7.06 },
  { label: "Write", at: 8.37 },
  { label: "Check", at: 9.35 },
];

const riseLine = (t: number, a: number, dy?: number): React.CSSProperties => ({ ...rise(t, a, dy), display: "block" });

function Opening({ t }: { t: number }) {
  const o = live(t, -1, 3.0);
  if (o <= 0.001) return null;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.eyebrow} style={rise(t, 0.1, 8)}>
        Agentic Carousel by Blinkwiser
      </span>
      <span className={s.big} style={rise(t, 0.3)}>
        The first version
      </span>
      <span className={`${s.big} ${s.serif} ${s.bad}`} style={rise(t, 0.9)}>
        made up its own statistics.
      </span>
    </div>
  );
}

function Beats({ t }: { t: number }) {
  const a = live(t, 3.0, 4.9);
  const b = live(t, 4.9, 10.8);
  const c = live(t, 10.8, 13.6);
  const d = live(t, 13.6, 16.4);
  return (
    <div className={s.top}>
      {a > 0.001 && (
        <div className={s.beat} style={{ opacity: a }}>
          <span className={s.eyebrow} style={riseLine(t, 3.1, 8)}>
            So I rebuilt it
          </span>
          <span className={s.line} style={riseLine(t, 3.2)}>
            A studio you talk to.
          </span>
          <span className={s.sub} style={riseLine(t, 3.6, 10)}>
            Start from a topic, a link, a video or a file.
          </span>
        </div>
      )}
      {b > 0.001 && (
        <div className={s.beat} style={{ opacity: b }}>
          <span className={s.eyebrow} style={riseLine(t, 5.0, 8)}>
            Each step reports in the chat
          </span>
          <span className={s.line} style={riseLine(t, 5.0)}>
            A team of agents,
          </span>
          <span className={`${s.line} ${s.serif} ${s.accent}`} style={riseLine(t, 5.4)}>
            each with one job.
          </span>
          <span className={s.jobs}>
            {JOBS.map((j, i) => {
              const next = JOBS[i + 1]?.at ?? Infinity;
              const on = ramp(t, j.at, 0.3);
              const state = t >= next ? "done" : t >= j.at ? "now" : undefined;
              return (
                <span key={j.label} className={s.job} data-state={state} style={{ ...rise(t, 5.6 + i * 0.08, 8), display: "inline-flex" }}>
                  <i style={{ opacity: on }}>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4.5 10.5 8 14l7.5-8" />
                    </svg>
                  </i>
                  {j.label}
                </span>
              );
            })}
          </span>
        </div>
      )}
      {c > 0.001 && (
        <div className={s.beat} style={{ opacity: c }}>
          <span className={s.eyebrow} style={riseLine(t, 10.9, 8)}>
            About 23 seconds in
          </span>
          <span className={s.line} style={riseLine(t, 10.95)}>
            The first slides land,
          </span>
          <span className={`${s.line} ${s.serif} ${s.accent}`} style={riseLine(t, 11.4)}>
            marked Draft while the checks finish.
          </span>
        </div>
      )}
      {d > 0.001 && (
        <div className={s.beat} style={{ opacity: d }}>
          <span className={s.eyebrow} style={riseLine(t, 13.7, 8)}>
            Rules checked in code, not asked for in a prompt
          </span>
          <span className={s.line} style={riseLine(t, 13.75)}>
            Every number traces to a source.
          </span>
          <span className={`${s.line} ${s.serif} ${s.accent}`} style={riseLine(t, 14.4)}>
            Every edit can be undone.
          </span>
        </div>
      )}
    </div>
  );
}

const STATS = [
  { value: "7 in 10", label: "blind head-to-heads won against version one" },
  { value: "9.5", label: "accuracy against sources, up from 8.8" },
  { value: "31s", label: "per carousel, down from 84 seconds" },
];

function Stats({ t }: { t: number }) {
  const o = live(t, 16.4, 19.4);
  if (o <= 0.001) return null;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.eyebrow} style={rise(t, 16.55, 8)}>
        Settled with blind tests, not taste
      </span>
      <span className={s.stats}>
        {STATS.map((x, i) => (
          <span key={x.value} className={s.stat} style={{ ...rise(t, 16.7 + i * 0.25, 14), display: "grid" }}>
            <b>{x.value}</b>
            <span>{x.label}</span>
          </span>
        ))}
      </span>
      <span className={s.note} style={rise(t, 17.6, 8)}>
        Scores from my own eval harness and an AI judge.
      </span>
    </div>
  );
}

function End({ t }: { t: number }) {
  const o = live(t, 19.4, DURATION + 1);
  if (o <= 0.001) return null;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.eyebrow} style={rise(t, 19.55, 8)}>
        Case study 04
      </span>
      <span className={s.endTitle} style={rise(t, 19.75)}>
        Blinkwiser AI carousels
      </span>
      <span className={`${s.endAccent} ${s.serif}`} style={rise(t, 20.25)}>
        Carousels you can check.
      </span>
      <span className={s.live} style={rise(t, 20.8, 8)}>
        <i />
        Live and free at <b>carousel.blinkwiser.com</b>
      </span>
      <span className={s.byline} style={rise(t, 21.1, 8)}>
        {site.name} · {site.role} · <b>{new URL(site.url).host}</b>
      </span>
    </div>
  );
}

/** Deep violet glows that drift slowly on a near-black ground. Original, in the product's colours. */
function backdrop(t: number) {
  const sin = (k: number, a: number) => Math.sin(t * k + a);
  return [
    blob(18 + 6 * sin(0.3, 0), 18 + 5 * sin(0.27, 1), 62, "rgba(120, 88, 255, 0.3)"),
    blob(86 + 5 * sin(0.25, 2), 22 + 6 * sin(0.31, 3), 56, "rgba(64, 104, 240, 0.22)"),
    blob(74 + 6 * sin(0.22, 4), 92 + 4 * sin(0.28, 5), 64, "rgba(170, 104, 255, 0.2)"),
    blob(8 + 5 * sin(0.27, 6), 90 + 5 * sin(0.29, 7), 50, "rgba(70, 60, 200, 0.22)"),
    "#0c0a14",
  ].join(", ");
}

/* --------------------------------------------------------------- the page */

export function BlinkwiserTrailer({ layout = "card" }: { layout?: Layout }) {
  const [w, h] = SIZE[layout];
  const studio = useStudio(DURATION, FPS, w, h);
  const { t } = studio;
  return (
    <StudioShell studio={studio}>
      <div className={s.stage} data-stage data-layout={layout} style={{ background: backdrop(t) }}>
        <Opening t={t} />
        <Beats t={t} />
        <Shot t={t} layout={layout} />
        <Stats t={t} />
        <End t={t} />
      </div>
    </StudioShell>
  );
}
