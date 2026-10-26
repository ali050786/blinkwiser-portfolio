"use client";

import { site } from "@/content/site";
import { StudioShell, blob, clamp, inOut, lerp, live, ramp, rise, useStudio } from "./clock";
import s from "./DubaiTrailer.module.css";

/*
 * The Dubai Municipality trailer (case 05), 2026-10-26: nine city apps into
 * one. Built on the case's own diagram: nine app cards with lines running
 * into one phone. Here each app leaves its card and whooshes down its line
 * into the phone, which lights up as it fills. The nine apps are the real
 * ones (named on dm.gov.ae), drawn as generic icons, not their logos. The
 * phone screens are the live-app screenshots the case already uses.
 * On its own ground, a midnight blue with a teal glow, so it never reads like
 * another case trailer on the home page.
 */

export const DURATION = 18.5;
export const FPS = 30;

/**
 * One trailer, two shapes. `card` is 4:3 for the home card: headline on top,
 * apps and phone below. `wide` is 2.3:1 for the case page's hero: headline on
 * the left, apps and phone on the right. Opening and end stay centred.
 */
type Layout = "card" | "wide";
const SIZE: Record<Layout, [number, number]> = { card: [1440, 1080], wide: [1920, 840] };
type Place = { x: number; y: number; h: number };
const GEO: Record<Layout, { grid: { x: number; y: number; w: number; h: number; gx: number; gy: number; icon: number }; absorb: Place; show: Place; pair: number }> = {
  /** grid: first card and card size and gaps; absorb: the phone while the apps fly in; show: the phone afterwards. */
  card: { grid: { x: 96, y: 386, w: 220, h: 150, gx: 22, gy: 24, icon: 60 }, absorb: { x: 1110, y: 660, h: 600 }, show: { x: 720, y: 700, h: 640 }, pair: 180 },
  wide: { grid: { x: 700, y: 206, w: 200, h: 134, gx: 20, gy: 14, icon: 52 }, absorb: { x: 1620, y: 420, h: 640 }, show: { x: 1220, y: 420, h: 690 }, pair: 195 },
};

/* -------------------------------------------------------------- timeline */

const CARDS_IN = 3.0;
const LINES_IN = 4.2;
const LAUNCH = 5.4;
const STAGGER = 0.14;
const FLIGHT = 0.62;
const GLIDE: [number, number] = [7.35, 8.25];
const SCREENS = { dashboard: 10.6, services: 11.7 };
const PAIR = 12.95;
const END = 15.5;

const arriveAt = (i: number) => LAUNCH + i * STAGGER + FLIGHT;

/* ------------------------------------------------------------ nine apps */

/** The nine apps the unified app replaced, each with its job from the Municipality's own page. */
const APPS: { name: string; job: string; color: string; radius: number; glyph: React.ReactNode }[] = [
  { name: "Dubai 24/7", job: "Requests and complaints", color: "#e0564f", radius: 26, glyph: <text x="28" y="35" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff">24/7</text> },
  { name: "Green Ticket", job: "Book a centre visit", color: "#2fa56f", radius: 14, glyph: <path d="M12 18h32v7a4 4 0 0 0 0 8v7H12v-7a4 4 0 0 0 0-8zM24 18v22" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinejoin="round" /> },
  { name: "Al Mamzar", job: "Beach park chalets", color: "#2f92d0", radius: 56, glyph: <path d="M11 24c5-5 9-5 14 0s9 5 14 0 6-3 7-2M11 34c5-5 9-5 14 0s9 5 14 0 6-3 7-2" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" /> },
  { name: "Montaji", job: "Check consumer products", color: "#ec8d2c", radius: 8, glyph: <path d="M14 16v24M19 16v24M22 16v24M28 16v24M33 16v24M36 16v24M42 16v24" stroke="#fff" strokeWidth="2.4" /> },
  { name: "Parks & Beaches", job: "Parks and beaches", color: "#8cc63f", radius: 30, glyph: <><circle cx="28" cy="23" r="10" fill="#fff" /><path d="M28 32v10" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></> },
  { name: "Dubai Frame", job: "Visit the landmark", color: "#d4a82a", radius: 4, glyph: <path d="M17 13h22v30H17zM22 18h12v20H22z" fill="#fff" fillRule="evenodd" /> },
  { name: "Quranic Park", job: "Visit the park", color: "#23896a", radius: 40, glyph: <path d="M16 40C16 24 26 15 41 14c0 15-9 25-25 26zM16 40l14-14" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /> },
  { name: "Ramsatna", job: "Local Arabic terms", color: "#8256d0", radius: 18, glyph: <text x="28" y="39" textAnchor="middle" fontSize="28" fontWeight="700" fill="#fff">ض</text> },
  { name: "Dubai BPS", job: "Building permits", color: "#5d6f8c", radius: 12, glyph: <path d="M15 42V24h9v18M24 42V14h11v28M35 42V28h7v14M12 42h33" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinejoin="round" /> },
];

const Icon = ({ app, size }: { app: (typeof APPS)[number]; size: number }) => (
  <svg viewBox="0 0 56 56" width={size} height={size} aria-hidden="true">
    <rect width="56" height="56" rx={app.radius / 2} fill={app.color} />
    {app.glyph}
  </svg>
);

/** Where each card's icon sits, and the curve from it into the phone's left edge. */
function route(layout: Layout, i: number) {
  const { grid, absorb } = GEO[layout];
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = grid.x + col * (grid.w + grid.gx);
  const y = grid.y + row * (grid.h + grid.gy);
  const sx = x + 16 + grid.icon / 2;
  const sy = y + 14 + grid.icon / 2;
  const ex = absorb.x - phoneWidth(absorb.h) / 2 - 4;
  const ey = absorb.y;
  const c1: [number, number] = [lerp(sx, ex, 0.55), sy];
  const c2: [number, number] = [lerp(sx, ex, 0.8), ey];
  const at = (p: number): [number, number] => {
    const q = 1 - p;
    return [q ** 3 * sx + 3 * q * q * p * c1[0] + 3 * q * p * p * c2[0] + p ** 3 * ex, q ** 3 * sy + 3 * q * q * p * c1[1] + 3 * q * p * p * c2[1] + p ** 3 * ey];
  };
  return { x, y, d: `M${sx} ${sy}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${ex} ${ey}`, at };
}

/** The nine cards, the lines into the phone, and each app's flight down its line. */
function Apps({ t, layout }: { t: number; layout: Layout }) {
  const { grid } = GEO[layout];
  const [w, h] = SIZE[layout];
  const gone = ramp(t, GLIDE[0] - 0.1, 0.4);
  if (gone >= 0.999) return null;
  const lines = ramp(t, LINES_IN, 1.0);
  return (
    <div className={s.apps} style={{ opacity: 1 - gone }}>
      <svg className={s.lines} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
        {APPS.map((a, i) => {
          const r = route(layout, i);
          const launch = LAUNCH + i * STAGGER;
          const p = clamp((t - launch) / FLIGHT) ** 2.2;
          const tail = Math.min(p, 0.22);
          const comet = p > 0 && p < 1 ? 1 : 1 - ramp(t, launch + FLIGHT, 0.25);
          return (
            <g key={a.name}>
              <path d={r.d} pathLength={1000} className={s.wire} style={{ strokeDasharray: `${lines * 1000} 1000` }} />
              {p > 0 && (
                <path
                  d={r.d}
                  pathLength={1000}
                  className={s.comet}
                  style={{ stroke: a.color, opacity: comet, strokeDasharray: `${tail * 1000} 1000`, strokeDashoffset: -(p - tail) * 1000, filter: `drop-shadow(0 0 10px ${a.color})` }}
                />
              )}
            </g>
          );
        })}
      </svg>
      {APPS.map((a, i) => {
        const r = route(layout, i);
        const appear = ramp(t, CARDS_IN + i * 0.1, 0.45);
        const launch = LAUNCH + i * STAGGER;
        const p = clamp((t - launch) / FLIGHT) ** 2.2;
        const wind = live(t, launch - 0.18, launch + 0.02, 0.1);
        const [ix, iy] = r.at(p);
        const flying = t >= launch;
        return (
          <div key={a.name}>
            <div className={s.card} style={{ left: r.x, top: r.y, width: grid.w, height: grid.h, opacity: appear * (flying ? 0.35 : 1), transform: `translateY(${(1 - appear) * 16}px)` }}>
              <b>{a.name}</b>
              <span>{a.job}</span>
            </div>
            <span
              className={s.icon}
              style={{
                left: ix,
                top: iy,
                opacity: appear * (1 - ramp(t, launch + FLIGHT - 0.08, 0.1)),
                transform: `translate(-50%, -50%) translateY(${(1 - appear) * 16}px) scale(${(1 + 0.12 * wind) * (1 - 0.65 * p)})`,
              }}
            >
              <Icon app={a} size={grid.icon} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------- the live app */

/** Live-app screenshots: transparent around each phone, so each crops to its phone box. */
const SHOTS = {
  home: { src: "/work/dubai/dm-home-en-ar.webp", w: 1399, h: 1442, box: [53, 53, 667, 1388] },
  arabic: { src: "/work/dubai/dm-home-en-ar.webp", w: 1399, h: 1442, box: [731, 53, 1345, 1388] },
  dashboard: { src: "/work/dubai/dm-dashboard.webp", w: 760, h: 1518, box: [56, 56, 703, 1461] },
  services: { src: "/work/dubai/dm-services.webp", w: 760, h: 1518, box: [56, 56, 703, 1461] },
} as const;
const BEZEL = 11;
const SCREEN_RATIO = 615 / 1336;
const phoneWidth = (h: number) => (h - BEZEL * 2) * SCREEN_RATIO + BEZEL * 2;

function Screen({ shot, height, style }: { shot: keyof typeof SHOTS; height: number; style?: React.CSSProperties }) {
  const { src, w, h, box } = SHOTS[shot];
  const k = height / (box[3] - box[1] + 1);
  return (
    <span className={s.screen} style={{ width: (box[2] - box[0] + 1) * k, height, ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- drawn frame by frame for the recorder */}
      <img src={src} alt="" style={{ width: w * k, height: h * k, left: -box[0] * k, top: -box[1] * k }} />
    </span>
  );
}

/** A phone: a dark bezel and the island around a live-app screen. */
function Phone({ place, children, style }: { place: Place; children: React.ReactNode; style?: React.CSSProperties }) {
  const w = phoneWidth(place.h);
  return (
    <div className={s.phone} style={{ left: place.x - w / 2, top: place.y - place.h / 2, width: w, height: place.h, ...style }}>
      <div className={s.glass}>{children}</div>
      <i className={s.island} />
    </div>
  );
}

/** The one app: it lights up as the apps arrive, then shows Home, Dashboard and Services, then makes room for Arabic. */
function Phones({ t, layout }: { t: number; layout: Layout }) {
  const g = GEO[layout];
  const glide = inOut(clamp((t - GLIDE[0]) / (GLIDE[1] - GLIDE[0])));
  const split = inOut(clamp((t - PAIR) / 0.7));
  const place = { x: lerp(g.absorb.x, g.show.x, glide) - g.pair * split, y: lerp(g.absorb.y, g.show.y, glide), h: lerp(g.absorb.h, g.show.h, glide) };
  const screenH = place.h - BEZEL * 2;
  const inside = APPS.filter((_, i) => t >= arriveAt(i)).length;
  const bump = APPS.reduce((m, _, i) => m + Math.sin(Math.PI * clamp((t - arriveAt(i)) / 0.28)) * 0.03, 0);
  const o = Math.min(ramp(t, 3.5, 0.6), 1 - ramp(t, END - 0.15, 0.45));
  const lit = 0.28 + 0.72 * ramp(t, LAUNCH + 0.4, arriveAt(8) - LAUNCH - 0.2);
  const toDash = ramp(t, SCREENS.dashboard, 0.35);
  const toServices = ramp(t, SCREENS.services, 0.35);
  const back = ramp(t, PAIR - 0.35, 0.3);
  const ar = ramp(t, PAIR + 0.2, 0.6);
  const count = live(t, LAUNCH, GLIDE[0] + 0.2, 0.3);
  // Mounted from the start, so the screenshots are loaded before the first frame.
  return (
    <div className={s.phones} style={{ opacity: o }}>
      <span className={s.halo} style={{ left: place.x, top: place.y, opacity: 0.25 + 0.75 * lit, transform: `translate(-50%, -50%) scale(${1 + bump * 3})` }} />
      <Phone place={place} style={{ transform: `scale(${1 + bump})` }}>
        <Screen shot="home" height={screenH} style={{ filter: `brightness(${lit})` }} />
        <Screen shot="dashboard" height={screenH} style={{ opacity: toDash * (1 - back) }} />
        <Screen shot="services" height={screenH} style={{ opacity: toServices * (1 - back) }} />
      </Phone>
      <Phone place={{ x: lerp(g.absorb.x, g.show.x, glide) + g.pair * split, y: place.y, h: place.h }} style={{ opacity: ar, transform: `translateX(${(1 - ar) * 60}px)` }}>
        <Screen shot="arabic" height={screenH} />
      </Phone>
      <span className={s.count} style={{ left: place.x, top: place.y + place.h / 2 + 18, opacity: count }}>
        <b>{inside}</b> of 9 apps inside
      </span>
      <span className={s.lang} style={{ left: place.x, top: place.y + place.h / 2 + 14, opacity: ar }}>
        English
      </span>
      <span className={s.lang} style={{ left: lerp(g.absorb.x, g.show.x, glide) + g.pair * split, top: place.y + place.h / 2 + 14, opacity: ar }}>
        العربية
      </span>
    </div>
  );
}

/* ------------------------------------------------------------- the story */

const riseLine = (t: number, a: number, dy?: number): React.CSSProperties => ({ ...rise(t, a, dy), display: "block" });

/** What the one app brought, lit as the phone shows each part. */
const GAINS = [
  { label: "One sign-in", at: 9.2 },
  { label: "Voice search", at: 9.55 },
  { label: "One dashboard for every request", at: SCREENS.dashboard },
  { label: "Services grouped by a card sort", at: SCREENS.services },
];

function Opening({ t }: { t: number }) {
  const o = live(t, -1, 2.8);
  if (o <= 0.001) return null;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.eyebrow} style={rise(t, 0.1, 8)}>
        Dubai Municipality · onsite in Dubai, 2019 to 2020
      </span>
      <span className={s.big} style={rise(t, 0.3)}>
        Nine city apps,
      </span>
      <span className={`${s.big} ${s.serif} ${s.accent}`} style={rise(t, 0.9)}>
        each with its own way of working.
      </span>
    </div>
  );
}

function Beats({ t }: { t: number }) {
  const a = live(t, 2.8, LAUNCH - 0.1);
  const b = live(t, LAUNCH - 0.1, 9.05);
  const c = live(t, 9.05, PAIR);
  const d = live(t, PAIR, END);
  return (
    <div className={s.top}>
      {a > 0.001 && (
        <div className={s.beat} style={{ opacity: a }}>
          <span className={s.eyebrow} style={riseLine(t, 2.9, 8)}>
            Before
          </span>
          <span className={s.line} style={riseLine(t, 2.95)}>
            Nine apps,
          </span>
          <span className={`${s.line} ${s.serif} ${s.bad}`} style={riseLine(t, 3.4)}>
            nothing in common.
          </span>
          <span className={s.sub} style={riseLine(t, 4.0, 10)}>
            Each built and run by its own department.
          </span>
        </div>
      )}
      {b > 0.001 && (
        <div className={s.beat} style={{ opacity: b }}>
          <span className={s.eyebrow} style={riseLine(t, LAUNCH, 8)}>
            What I designed
          </span>
          <span className={s.line} style={riseLine(t, LAUNCH + 0.05)}>
            Brought into
          </span>
          <span className={`${s.line} ${s.serif} ${s.accent}`} style={riseLine(t, LAUNCH + 0.45)}>
            one app.
          </span>
        </div>
      )}
      {c > 0.001 && (
        <div className={s.beat} style={{ opacity: c }}>
          <span className={s.eyebrow} style={riseLine(t, 9.15, 8)}>
            Five tabs: Home, Dashboard, Services, Media Center, More
          </span>
          <span className={s.line} style={riseLine(t, 9.2)}>
            Every service,
          </span>
          <span className={`${s.line} ${s.serif} ${s.accent}`} style={riseLine(t, 9.55)}>
            in one place.
          </span>
          <span className={s.gains}>
            {GAINS.map((x) => (
              <span key={x.label} className={s.gain} style={{ ...rise(t, x.at, 10), display: "inline-flex" }}>
                <i>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4.5 10.5 8 14l7.5-8" />
                  </svg>
                </i>
                {x.label}
              </span>
            ))}
          </span>
        </div>
      )}
      {d > 0.001 && (
        <div className={s.beat} style={{ opacity: d }}>
          <span className={s.eyebrow} style={riseLine(t, PAIR + 0.1, 8)}>
            Two languages
          </span>
          <span className={s.line} style={riseLine(t, PAIR + 0.15)}>
            Arabic and English,
          </span>
          <span className={`${s.line} ${s.serif} ${s.accent}`} style={riseLine(t, PAIR + 0.55)}>
            on one layout.
          </span>
          <span className={s.sub} style={riseLine(t, PAIR + 1.1, 10)}>
            Arabic mirrored by one template rule.
          </span>
        </div>
      )}
    </div>
  );
}

function End({ t }: { t: number }) {
  const o = live(t, END, DURATION + 1);
  if (o <= 0.001) return null;
  const a = END + 0.15;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.eyebrow} style={rise(t, a, 8)}>
        Case study 05
      </span>
      <span className={s.endTitle} style={rise(t, a + 0.2)}>
        Dubai Municipality
      </span>
      <span className={`${s.endAccent} ${s.serif}`} style={rise(t, a + 0.7)}>
        Nine city apps, now one.
      </span>
      <span className={s.byline} style={rise(t, a + 1.3, 8)}>
        {site.name} · {site.role} · <b>{new URL(site.url).host}</b>
      </span>
    </div>
  );
}

/** Midnight blue with a teal glow and a blue one, drifting slowly. Original. */
function backdrop(t: number) {
  const sin = (k: number, a: number) => Math.sin(t * k + a);
  return [
    blob(80 + 5 * sin(0.26, 0), 50 + 6 * sin(0.3, 1), 60, "rgba(28, 168, 152, 0.26)"),
    blob(14 + 6 * sin(0.3, 2), 16 + 5 * sin(0.27, 3), 58, "rgba(44, 96, 196, 0.34)"),
    blob(30 + 6 * sin(0.22, 4), 96 + 4 * sin(0.28, 5), 54, "rgba(20, 120, 140, 0.2)"),
    "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(2, 6, 14, 0.55))",
    "#07131f",
  ].join(", ");
}

/* --------------------------------------------------------------- the page */

export function DubaiTrailer({ layout = "card" }: { layout?: Layout }) {
  const [w, h] = SIZE[layout];
  const studio = useStudio(DURATION, FPS, w, h);
  const { t } = studio;
  return (
    <StudioShell studio={studio}>
      <div className={s.stage} data-stage data-layout={layout} style={{ background: backdrop(t) }}>
        <Opening t={t} />
        <Beats t={t} />
        <Phones t={t} layout={layout} />
        <Apps t={t} layout={layout} />
        <End t={t} />
      </div>
    </StudioShell>
  );
}
