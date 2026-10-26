"use client";

import { DsDashboard } from "@/components/screens/designSystem";
import { employer, insurers, type InsurerId } from "@/components/exhibits/ThemeDevices";
import { site } from "@/content/site";
import { NIGHT, StudioShell, WHITE, blob, clamp, css, hex, inOut, live, mix, ramp, rise, useStudio } from "./clock";
import s from "./PlatformTrailer.module.css";

/*
 * The white-label platform trailer (case 02), 2026-10-26: a product pitch,
 * not a recap. It sells what was built, a three-tier branding system, with
 * claims taken from the case study. 4:3 so it fills the home card. One member
 * dashboard is re-branded live from the demo brands of the theming exhibit
 * (never an admin screen), on a soft gradient drawn from the site's own
 * teal, sky, lilac and a warm peach.
 */

export const DURATION = 15.5;
export const FPS = 30;
/**
 * One trailer, two shapes. `card` is 4:3 for the home card: headline on top,
 * dashboard below. `wide` is 2.3:1 for the case page's hero: headline on the
 * left, dashboard on the right. The opening and end cards stay centred in both.
 */
type Layout = "card" | "wide";
const SIZE: Record<Layout, [number, number]> = { card: [1440, 1080], wide: [1920, 840] };
/** The library's dashboard pattern is drawn at 1040px; this scales it to each layout's card. */
const DASH_ZOOM: Record<Layout, number> = { card: 1.077, wide: 0.904 };

/* ---------------------------------------------------------------- colour */

/** Which demo brand the dashboard wears, and when it switches. */
const looks: { t: number; b: InsurerId }[] = [
  { t: -1, b: "a" },
  { t: 3.9, b: "b" },
  { t: 5.0, b: "c" },
  { t: 6.4, b: "a" },
  { t: 10.3, b: "b" },
];
/** The employer's co-brand layered on top (the second tier). */
const COBRAND: [number, number] = [7.9, 9.8];
/** The member's own setting, larger text (the third tier). */
const MEMBER: [number, number] = [8.7, 9.8];

function brandAt(t: number) {
  let i = 0;
  for (let k = 0; k < looks.length; k++) if (t >= looks[k]!.t) i = k;
  const cur = insurers[looks[i]!.b];
  const prev = insurers[looks[Math.max(0, i - 1)]!.b];
  const p = i === 0 ? 1 : inOut(clamp((t - looks[i]!.t) / 0.6));
  const primary = mix(hex(prev.primary), hex(cur.primary), p);
  const radius = prev.radius + (cur.radius - prev.radius) * p;
  const co = live(t, COBRAND[0], COBRAND[1], 0.45);
  const ink = mix(mix(primary, NIGHT, 0.3), hex(employer.accent), co);
  return {
    name: (p > 0.5 ? cur : prev).name,
    co,
    radius,
    primary: css(primary),
    vars: {
      "--m-brand": css(primary),
      "--m-brand-ink": css(ink),
      "--m-brand-soft": css(mix(primary, WHITE, 0.9)),
      "--m-rail": css(mix(primary, NIGHT, 0.72)),
    } as React.CSSProperties,
  };
}

/* ------------------------------------------------------------ background */

/**
 * A warm sunset gradient that drifts slowly: apricot, coral and butter on
 * cream. Original. Each case trailer has its own ground, so they never read
 * alike side by side on the home page.
 */
function backdrop(t: number) {
  const sin = (k: number, a: number) => Math.sin(t * k + a);
  return [
    blob(16 + 6 * sin(0.35, 0), 20 + 5 * sin(0.3, 1), 62, "rgba(255, 168, 104, 0.55)"),
    blob(86 + 5 * sin(0.28, 2), 16 + 6 * sin(0.33, 3), 60, "rgba(255, 118, 138, 0.42)"),
    blob(76 + 6 * sin(0.25, 4), 90 + 4 * sin(0.31, 5), 64, "rgba(196, 150, 238, 0.36)"),
    blob(10 + 5 * sin(0.27, 6), 88 + 5 * sin(0.29, 7), 56, "rgba(255, 214, 118, 0.5)"),
    "#fcefe4",
  ].join(", ");
}

/* --------------------------------------------------------------- the pitch */

/** rise() for lines that must stack, inside a plain block. */
const riseLine = (t: number, a: number, dy?: number): React.CSSProperties => ({ ...rise(t, a, dy), display: "block" });

function Opening({ t }: { t: number }) {
  const o = live(t, -1, 2.6);
  if (o <= 0.001) return null;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.eyebrow} style={rise(t, 0.1, 8)}>
        White-label health-insurance platform
      </span>
      <span className={s.big} style={rise(t, 0.3)}>
        One platform.
      </span>
      <span className={`${s.big} ${s.serif} ${s.accent}`} style={rise(t, 0.9)}>
        Every brand.
      </span>
    </div>
  );
}

const tiers = [
  { name: "Insurer", at: 6.9 },
  { name: "Employer", at: COBRAND[0] },
  { name: "Member", at: MEMBER[0] },
];
const surfaces = ["Web", "Mobile web", "iOS", "Android"];

function Headlines({ t }: { t: number }) {
  const a = live(t, 2.6, 6.4);
  const b = live(t, 6.4, 9.8);
  const c = live(t, 9.8, 12.5);
  return (
    <div className={s.top}>
      {a > 0.001 && (
        <div className={s.beat} style={{ opacity: a }}>
          <span className={s.eyebrow} style={riseLine(t, 2.7, 8)}>
            Built on design tokens
          </span>
          <span className={s.line} style={riseLine(t, 2.85)}>
            Drop in a client&apos;s brand.
          </span>
          <span className={`${s.line} ${s.serif} ${s.accent}`} style={riseLine(t, 3.4)}>
            Every screen follows.
          </span>
        </div>
      )}
      {b > 0.001 && (
        <div className={s.beat} style={{ opacity: b }}>
          <span className={s.eyebrow} style={riseLine(t, 6.5, 8)}>
            Each tier sets only what it owns
          </span>
          <span className={s.line} style={riseLine(t, 6.6)}>
            Three tiers. One system.
          </span>
          <span className={s.tiers}>
            {tiers.map((tier, i) => {
              const on = ramp(t, tier.at, 0.35);
              return (
                <span key={tier.name} style={{ display: "contents" }}>
                  {i > 0 && (
                    <span className={s.arrow} style={rise(t, 6.75 + i * 0.12, 0)}>
                      →
                    </span>
                  )}
                  <span className={s.tier} style={{ ...rise(t, 6.75 + i * 0.12, 10), background: `rgba(10, 114, 102, ${on})`, color: on > 0.5 ? "#ffffff" : undefined, borderColor: on > 0.5 ? "transparent" : undefined }}>
                    {tier.name}
                  </span>
                </span>
              );
            })}
          </span>
        </div>
      )}
      {c > 0.001 && (
        <div className={s.beat} style={{ opacity: c }}>
          <span className={s.line} style={riseLine(t, 9.9)}>
            A new client, themed
          </span>
          <span className={`${s.line} ${s.serif} ${s.accent}`} style={riseLine(t, 10.3)}>
            in under a day.
          </span>
          <span className={s.surfaces}>
            {surfaces.map((x, i) => (
              <span key={x} className={s.surface} style={rise(t, 10.8 + i * 0.15, 10)}>
                {x}
              </span>
            ))}
            <span className={s.small} style={rise(t, 11.5, 8)}>
              120+ components on one foundation
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

function Dashboard({ t, zoom }: { t: number; zoom: number }) {
  const o = live(t, 2.4, 12.65, 0.5);
  if (o <= 0.001) return null;
  const enter = ramp(t, 2.4, 0.8);
  const leave = ramp(t, 12.25, 0.4);
  const brand = brandAt(t);
  const member = live(t, MEMBER[0], MEMBER[1], 0.45);
  return (
    <div className={s.card} style={{ opacity: o, transform: `translateY(${(1 - enter) * 120 + leave * 60}px)` }}>
      <div className={s.cardBar}>
        <span className={s.logo} style={{ background: brand.primary, borderRadius: brand.radius }}>
          {brand.name.slice(-1)}
        </span>
        <b>{brand.name} Health</b>
        <span className={s.cobrand} style={{ opacity: brand.co, transform: `translateX(${(1 - brand.co) * -8}px)` }}>
          <i style={{ background: employer.accent }} />
          {employer.name}
        </span>
        <span className={s.member} style={{ opacity: member, transform: `translateX(${(1 - member) * -8}px)` }}>
          Aa · Larger text
        </span>
      </div>
      <div className={s.screen} style={{ zoom: zoom * (1 + 0.07 * member) }}>
        <DsDashboard style={brand.vars} banner />
      </div>
    </div>
  );
}

function End({ t }: { t: number }) {
  const o = live(t, 12.65, DURATION + 1);
  if (o <= 0.001) return null;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.eyebrow} style={rise(t, 12.8, 8)}>
        Case study 02
      </span>
      <span className={s.endTitle} style={rise(t, 13.0)}>
        White-label platform
      </span>
      <span className={`${s.endAccent} ${s.serif}`} style={rise(t, 13.5)}>
        Every client, in its own brand.
      </span>
      <span className={s.byline} style={rise(t, 14.1, 8)}>
        {site.name} · {site.role} · <b>{new URL(site.url).host}</b>
      </span>
    </div>
  );
}

/* --------------------------------------------------------------- the page */

export function PlatformTrailer({ layout = "card" }: { layout?: Layout }) {
  const [w, h] = SIZE[layout];
  const studio = useStudio(DURATION, FPS, w, h);
  const { t } = studio;
  return (
    <StudioShell studio={studio}>
      <div className={s.stage} data-stage data-layout={layout} style={{ background: backdrop(t) }}>
        <Opening t={t} />
        <Headlines t={t} />
        <Dashboard t={t} zoom={DASH_ZOOM[layout]} />
        <End t={t} />
      </div>
    </StudioShell>
  );
}
