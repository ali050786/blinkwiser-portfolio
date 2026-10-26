"use client";

import { I, family, type IconName } from "@/components/screens/kit";
import { insurers, type InsurerId } from "@/components/exhibits/ThemeDevices";
import { site } from "@/content/site";
import { NIGHT, StudioShell, WHITE, blob, clamp, css, hex, inOut, lerp, live, mix, ramp, rise, useStudio } from "./clock";
import s from "./SkillsTrailer.module.css";

/*
 * The AI-readable design system trailer (case 03), 2026-10-26. Prompt to
 * screen, like a chat-to-result product demo: a story is typed into an AI
 * composer, the AI reads four of the real skill files, builds a claims page
 * from real component instances, checks its own work and switches brands.
 * The rules on screen are quoted from the skill files; the screen is a demo
 * brand, never a client's.
 */

export const DURATION = 16.8;
export const FPS = 30;

/**
 * One trailer, two shapes. `card` is 4:3 for the home card and plays the
 * beats one after another, big. `wide` is 2.3:1 for the case page's hero: the
 * AI's side on the left, the canvas on the right. Opening and end stay centred.
 */
type Layout = "card" | "wide";
const SIZE: Record<Layout, [number, number]> = { card: [1440, 1080], wide: [1920, 840] };

type Box = { x: number; y: number; w: number; h: number; r: number };
type Point = [number, number];

const GEO: Record<
  Layout,
  {
    pill: Box;
    composer: Box;
    dock: Box;
    canvas: { x: number; y: number; w: number };
    /** The claims screen is drawn at 1000px; this scales it to the canvas. */
    zoom: number;
    canvasIn: number;
    skillsOut: number;
    start: Point;
    rest: Point;
  }
> = {
  card: {
    pill: { x: 560, y: 500, w: 320, h: 80, r: 40 },
    composer: { x: 170, y: 340, w: 1100, h: 400, r: 32 },
    dock: { x: 120, y: 64, w: 1200, h: 96, r: 26 },
    canvas: { x: 120, y: 250, w: 1200 },
    zoom: 1.2,
    canvasIn: 7.85,
    skillsOut: 7.75,
    start: [1290, 1010],
    rest: [1180, 840],
  },
  wide: {
    pill: { x: 800, y: 380, w: 320, h: 80, r: 40 },
    composer: { x: 410, y: 220, w: 1100, h: 400, r: 32 },
    dock: { x: 110, y: 110, w: 620, h: 236, r: 26 },
    canvas: { x: 820, y: 110, w: 1000 },
    zoom: 1,
    canvasIn: 5.6,
    skillsOut: 10.9,
    start: [1760, 810],
    rest: [1620, 700],
  },
};

/* --------------------------------------------------------------- timeline */

const CLICK = [0.95, 5.0] as const;
const MORPH: Point = [1.0, 1.5];
const TYPE: Point = [1.8, 4.0];
const CHIPS = 4.15;
const DOCK: Point = [5.1, 5.75];
/** When each skill file is read. */
const READ = [6.3, 6.68, 7.06, 7.44];
const BUILD = { shell: 8.3, title: 8.85, filter: 9.35, rows: 9.85, pager: 10.45 };
const CHECK = 11.25;
const TICKS = [11.5, 11.8, 12.1, 12.4, 12.7];
const READY = 12.9;
const END = 13.95;

/** Which demo brand the screen wears: the last check switches it. */
const looks: { t: number; b: InsurerId }[] = [
  { t: -1, b: "a" },
  { t: 12.8, b: "b" },
  { t: 13.3, b: "c" },
];

function brandAt(t: number) {
  let i = 0;
  for (let k = 0; k < looks.length; k++) if (t >= looks[k]!.t) i = k;
  const cur = insurers[looks[i]!.b];
  const prev = insurers[looks[Math.max(0, i - 1)]!.b];
  const p = i === 0 ? 1 : inOut(clamp((t - looks[i]!.t) / 0.45));
  const primary = mix(hex(prev.primary), hex(cur.primary), p);
  return {
    name: (p > 0.5 ? cur : prev).name,
    vars: {
      "--m-brand": css(primary),
      "--m-brand-ink": css(mix(primary, NIGHT, 0.3)),
      "--m-brand-soft": css(mix(primary, WHITE, 0.9)),
      "--m-rail": css(mix(primary, NIGHT, 0.72)),
      "--m-radius": `${lerp(prev.radius, cur.radius, p)}px`,
    } as React.CSSProperties,
  };
}
type Brand = ReturnType<typeof brandAt>;

/* ---------------------------------------------------------------- content */

/** The story, as typed. Key words light up once they're complete. */
const PROMPT: { text: string; key?: boolean }[] = [
  { text: "A " },
  { text: "claims page", key: true },
  { text: " where members " },
  { text: "filter", key: true },
  { text: " by " },
  { text: "status", key: true },
  { text: " and " },
  { text: "date", key: true },
  { text: "." },
];
const PROMPT_LENGTH = PROMPT.reduce((n, p) => n + p.text.length, 0);

/** Four of the skill files, each with one rule it holds. */
const SKILLS = [
  { file: "ds-index", rule: "Every color comes from the theme." },
  { file: "app-shells", rule: "Start every screen from a shell." },
  { file: "ds-components", rule: "All filtering lives in the Filter Bar." },
  { file: "ds-layout", rule: "12 columns, starting 144px in." },
];

/** The build-screen skill's own checklist, shortened. */
const CHECKS = ["0 hardcoded colors", "Text styles only", "Every element an instance", "One filter bar", "Works in every brand"];

const ROWS = [
  { id: "CLM-20418", who: family.member, where: "Lakeside Medical Group", date: "03/12/2026", status: "Paid", owe: "$24.00" },
  { id: "CLM-20377", who: family.kids[1]!, where: "Northside Family Dental", date: "03/03/2026", status: "Processing", owe: "$0.00" },
  { id: "CLM-20291", who: family.spouse, where: "Clearview Eye Care", date: "02/21/2026", status: "Paid", owe: "$15.00" },
  { id: "CLM-20240", who: family.kids[0]!, where: "Riverside Pediatrics", date: "02/09/2026", status: "In review", owe: "$0.00" },
  { id: "CLM-20187", who: family.member, where: "City Pharmacy", date: "01/28/2026", status: "Paid", owe: "$8.50" },
];

/** Component instances placed on the canvas, and when, for the running count. */
const PLACED = [
  { at: BUILD.shell, n: 2 }, // navigation, header
  { at: BUILD.filter, n: 5 }, // filter bar, search, select, date range, button
  ...ROWS.map((_, i) => ({ at: BUILD.rows + i * 0.09, n: 2 })), // row, badge
  { at: BUILD.pager, n: 2 }, // pagination, per-page dropdown
];

/* ----------------------------------------------------------------- pieces */

const lerpBox = (a: Box, b: Box, p: number): Box => ({ x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), w: lerp(a.w, b.w, p), h: lerp(a.h, b.h, p), r: lerp(a.r, b.r, p) });
/** 1 while a click is held down around time c. */
const pressAt = (t: number, c: number) => Math.min(ramp(t, c - 0.06, 0.06), 1 - ramp(t, c + 0.08, 0.1));
/** Fade and rise in, for a piece of the product screen. */
const piece = (t: number, at: number, dy = 12): React.CSSProperties => {
  const p = ramp(t, at, 0.4);
  return { opacity: p, transform: `translateY(${(1 - p) * dy}px)` };
};
const riseRow = (t: number, a: number, dy?: number): React.CSSProperties => ({ ...rise(t, a, dy), display: "flex" });

const Svg = ({ d, w = 2 }: { d: string; w?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const DocIcon = () => <Svg d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" w={1.8} />;
const Tick = ({ on }: { on: number }) => (
  <span className={s.tick} data-on={on > 0.5 || undefined}>
    <span style={{ opacity: on, transform: `scale(${0.6 + 0.4 * on})`, display: "grid" }}>
      <Svg d="M5 12.5 10 17l9-10" w={3} />
    </span>
  </span>
);

function PromptText({ t, typing }: { t: number; typing: boolean }) {
  const shown = typing ? Math.floor(clamp((t - TYPE[0]) / (TYPE[1] - TYPE[0])) * PROMPT_LENGTH) : PROMPT_LENGTH;
  let at = 0;
  const parts = PROMPT.map((p, i) => {
    const start = at;
    at += p.text.length;
    const visible = p.text.slice(0, Math.max(0, shown - start));
    if (!visible) return null;
    if (!p.key) return <span key={i}>{visible}</span>;
    const doneAt = TYPE[0] + (at / PROMPT_LENGTH) * (TYPE[1] - TYPE[0]);
    const h = typing ? ramp(t, doneAt, 0.25) : 1;
    return (
      <span key={i} className={s.key} style={{ backgroundColor: `rgba(19, 179, 161, ${0.16 * h})`, color: css(mix(hex("#10131a"), hex("#0a7266"), h)) }}>
        {visible}
      </span>
    );
  });
  const caret = typing && ((t >= TYPE[0] && t <= TYPE[1]) || Math.floor(t * 2.4) % 2 === 0);
  return (
    <>
      {parts}
      {caret && <span className={s.caret} />}
    </>
  );
}

function Status({ t }: { t: number }) {
  let text: React.ReactNode;
  if (t < BUILD.shell) text = <>Reading skills · <b>{READ.filter((x) => t >= x).length} of 4</b></>;
  else if (t < CHECK) text = <>Building · <b>{PLACED.reduce((n, p) => n + (t >= p.at ? p.n : 0), 0)} instances</b></>;
  else if (t < READY) text = <>Checking its work · <b>{TICKS.filter((x) => t >= x + 0.1).length} of 5</b></>;
  else text = <b>Ready for review</b>;
  return (
    <span className={s.status}>
      {t < READY ? (
        <span className={s.spin} style={{ transform: `rotate(${t * 420}deg)` }} />
      ) : (
        <span className={s.done}>
          <Svg d="M5 12.5 10 17l9-10" w={3} />
        </span>
      )}
      <span>{text}</span>
    </span>
  );
}

/* --------------------------------------------------------------- the beats */

/** A "New screen" pill that opens into the prompt box, then docks while the AI works. */
function Composer({ t, layout }: { t: number; layout: Layout }) {
  const { pill, composer, dock } = GEO[layout];
  const opened = inOut(clamp((t - MORPH[0]) / (MORPH[1] - MORPH[0])));
  const docked = inOut(clamp((t - DOCK[0]) / (DOCK[1] - DOCK[0])));
  const box = lerpBox(lerpBox(pill, composer, opened), dock, docked);
  const o = ramp(t, 0.1, 0.4) * (1 - ramp(t, END - 0.1, 0.4));
  if (o <= 0.001) return null;
  const hover = ramp(t, 0.75, 0.2);
  const go = ramp(t, TYPE[0] + 0.1, 0.3);
  return (
    <div
      className={s.box}
      style={{
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
        borderRadius: box.r,
        opacity: o,
        background: `rgba(255, 255, 255, ${Math.max(0.6 + 0.4 * hover, opened)})`,
        transform: `scale(${1 - 0.035 * pressAt(t, CLICK[0])})`,
      }}
    >
      <div className={`${s.boxIn} ${s.pillIn}`} style={{ opacity: 1 - ramp(t, MORPH[0], 0.15) }}>
        <Svg d="M12 5v14M5 12h14" w={1.8} />
        New screen
      </div>
      {t < DOCK[1] && (
        <div className={`${s.boxIn} ${s.composerIn}`} style={{ width: composer.w, height: composer.h, opacity: ramp(t, 1.32, 0.22) * (1 - ramp(t, DOCK[0], 0.25)) }}>
          <p className={s.prompt}>
            <span className={s.slash} style={{ opacity: ramp(t, 1.5, 0.25) }}>
              /build-screen
            </span>
            <PromptText t={t} typing />
          </p>
          <div className={s.foot}>
            <span className={s.reads} style={rise(t, CHIPS - 0.05, 8)}>
              Reads
            </span>
            {SKILLS.map((k, i) => (
              <span key={k.file} className={s.chip} style={{ ...rise(t, CHIPS + i * 0.1, 10), display: "inline-flex" }}>
                <DocIcon />
                {k.file}
              </span>
            ))}
            <span className={s.send} style={{ background: css(mix(hex("#d5d8e0"), hex("#0a7266"), go)), transform: `scale(${1 - 0.1 * pressAt(t, CLICK[1])})` }}>
              <Svg d="M12 19V5m-6 6 6-6 6 6" w={2.4} />
            </span>
          </div>
        </div>
      )}
      {t >= DOCK[0] && (
        <div className={`${s.boxIn} ${s.dockIn}`} style={{ width: dock.w, height: dock.h, opacity: ramp(t, DOCK[0] + 0.28, 0.3) }}>
          <p className={s.dockText}>
            <span className={s.slash}>/build-screen</span>
            <PromptText t={t} typing={false} />
          </p>
          <Status t={t} />
        </div>
      )}
    </div>
  );
}

/** The skill files, read one by one. */
function Skills({ t, layout }: { t: number; layout: Layout }) {
  const out = GEO[layout].skillsOut;
  const o = live(t, 5.8, out + 0.3, 0.3);
  if (o <= 0.001) return null;
  const leave = ramp(t, out, 0.3);
  return (
    <div className={s.skills} style={{ opacity: o, transform: `translateY(${-24 * leave}px)` }}>
      {SKILLS.map((k, i) => {
        const state = t >= READ[i]! ? "done" : t >= READ[i]! - 0.38 ? "reading" : "waiting";
        return (
          <div key={k.file} className={s.skill} data-state={state} style={{ ...rise(t, 5.85 + i * 0.08, 16), display: "grid" }}>
            <span className={s.skillHead}>
              <DocIcon />
              {k.file}.md
              <Tick on={ramp(t, READ[i]!, 0.2)} />
            </span>
            <span className={s.skillRule}>{k.rule}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Where the AI's own checklist ends: on the canvas (card) or in the left column (wide). */
function Checks({ t }: { t: number }) {
  const o = live(t, CHECK, END + 0.25, 0.3);
  if (o <= 0.001) return null;
  return (
    <div className={s.checks} style={{ opacity: o, transform: `translateY(${(1 - ramp(t, CHECK, 0.5)) * 24}px)` }}>
      <span className={s.checksTitle}>Before handing back</span>
      {CHECKS.map((c, i) => (
        <span key={c} className={s.check} style={riseRow(t, CHECK + 0.05 + i * 0.06, 8)}>
          <Tick on={ramp(t, TICKS[i]!, 0.2)} />
          {c}
        </span>
      ))}
    </div>
  );
}

/* --------------------------------------------------------- the claims page */

/** Selection outlines and name tags as each component lands, in the screen's 1000px space. */
const SELECTIONS: { at: number; rect: [number, number, number, number]; tag?: string; text?: boolean; left?: number; right?: number; top?: number }[] = [
  { at: BUILD.shell, rect: [0, 0, 64, 900] },
  { at: BUILD.shell, rect: [64, 0, 936, 60], tag: "App shell · Secured", left: 410, top: 15 },
  { at: BUILD.title, rect: [104, 84, 340, 68], tag: "Heading / H1 / Light", text: true, left: 470, top: 104 },
  { at: BUILD.filter, rect: [104, 168, 856, 72], tag: "Filter Bar · Claims", right: 40, top: 134 },
  { at: BUILD.rows, rect: [104, 290, 856, 304], tag: "Claim row × 5", right: 40, top: 256 },
  { at: BUILD.pager, rect: [104, 614, 856, 40], tag: "Pagination", left: 104, top: 664 },
];

function Selections({ t }: { t: number }) {
  return (
    <>
      {SELECTIONS.map((sel, i) => {
        const o = live(t, sel.at, Math.min(sel.at + 1.3, CHECK + 0.1), 0.2);
        if (o <= 0.001) return null;
        const [x, y, w, h] = sel.rect;
        return (
          <span key={i} style={{ opacity: o }}>
            <span className={s.outline} data-text={sel.text || undefined} style={{ left: x - 4, top: y - 4, width: w + 8, height: h + 8 }} />
            {sel.tag && (
              <span className={s.tag} data-text={sel.text || undefined} style={{ left: sel.left, right: sel.right, top: sel.top, transform: `scale(${0.9 + 0.1 * ramp(t, sel.at, 0.25)})` }}>
                {sel.text ? <b>Aa</b> : <Svg d="M12 3 7.5 7.5 12 12l4.5-4.5zM12 12l-4.5 4.5L12 21l4.5-4.5zM3 12l4.5-4.5L12 12l-4.5 4.5zM21 12l-4.5-4.5L12 12l4.5 4.5z" w={1.6} />}
                {sel.tag}
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}

const field = (label: string, value: string, width: number, icon?: IconName, muted?: boolean) => (
  <span className={s.field} style={{ width }}>
    <small>{label}</small>
    <span data-muted={muted || undefined}>
      {icon === "search" && <I n="search" />}
      {value}
      {icon === "chevronDown" && <I n="chevronDown" />}
    </span>
  </span>
);

function ClaimsScreen({ t, brand }: { t: number; brand: Brand }) {
  const nav = ramp(t, BUILD.shell, 0.45);
  const grid = live(t, READ[3]!, CHECK + 0.4, 0.4);
  return (
    <div className={s.app} style={brand.vars}>
      <div className={s.grid} style={{ opacity: grid }} aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <nav className={s.rail} style={{ opacity: nav, transform: `translateX(${(1 - nav) * -64}px)` }}>
        {(["home", "card", "shield", "doc", "dollar", "people"] as const).map((n) => (
          <span key={n} data-on={n === "doc" || undefined}>
            <I n={n} />
          </span>
        ))}
      </nav>
      <header className={s.head} style={piece(t, BUILD.shell, -10)}>
        <span className={s.logo}>{brand.name.slice(-1)}</span>
        <b>{brand.name} Health</b>
        <span className={s.me}>
          <span className={s.avatar}>DR</span>
          {family.member}
        </span>
      </header>
      <div className={s.title} style={piece(t, BUILD.title)}>
        <h1>My claims</h1>
        <p>Claims for you and your family in 2026</p>
      </div>
      <div className={s.filter} style={piece(t, BUILD.filter)}>
        {field("Claim number", "Search claims", 196, "search", true)}
        <i />
        {field("Status", "All", 132, "chevronDown")}
        <i />
        {field("Date of service", "01/01/2026 - 03/31/2026", 214)}
        <span className={s.filterEnd}>
          <span className={s.btn}>Search</span>
          <span className={s.reset}>Reset filter</span>
        </span>
      </div>
      <p className={s.count} style={piece(t, BUILD.rows - 0.1)}>
        24 claims found
      </p>
      <div className={s.table} style={{ opacity: ramp(t, BUILD.rows, 0.3) }}>
        <div className={s.th}>
          {["Claim", "Member", "Provider", "Date of service", "Status", "You owe"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {ROWS.map((r, i) => (
          <div key={r.id} className={s.tr} style={piece(t, BUILD.rows + i * 0.09, 10)}>
            <span className={s.claimId}>{r.id}</span>
            <span>{r.who}</span>
            <span>{r.where}</span>
            <span>{r.date}</span>
            <span>
              <span className={s.badge} data-status={r.status}>
                {r.status}
              </span>
            </span>
            <b>{r.owe}</b>
          </div>
        ))}
      </div>
      <div className={s.pager} style={piece(t, BUILD.pager)}>
        <span className={s.perPage}>
          Show <b>10</b> per page <I n="chevronDown" />
        </span>
        <span className={s.pages}>
          <span>
            <I n="arrowLeft" />
          </span>
          <span data-on>1</span>
          <span>2</span>
          <span>3</span>
          <span>
            <I n="arrowRight" />
          </span>
        </span>
      </div>
      <Selections t={t} />
    </div>
  );
}

function Canvas({ t, layout, brand }: { t: number; layout: Layout; brand: Brand }) {
  const g = GEO[layout];
  const leave = ramp(t, END - 0.15, 0.45);
  const o = Math.min(ramp(t, g.canvasIn, 0.4), 1 - leave);
  if (o <= 0.001) return null;
  const enter = ramp(t, g.canvasIn, 0.8);
  return (
    <div className={s.canvas} style={{ left: g.canvas.x, top: g.canvas.y, width: g.canvas.w, opacity: o, transform: `translateY(${(1 - enter) * 120 + leave * 60}px)` }}>
      <span className={s.frameLabel}>My claims · Desktop</span>
      <div className={s.frame}>
        <div style={{ zoom: g.zoom }}>
          <ClaimsScreen t={t} brand={brand} />
        </div>
        <span className={s.waiting} style={{ opacity: live(t, g.canvasIn + 0.3, BUILD.shell, 0.25) }}>
          Reading the rules first
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- cursor and frame */

function Cursor({ t, layout }: { t: number; layout: Layout }) {
  const g = GEO[layout];
  const pill: Point = [g.pill.x + g.pill.w * 0.62, g.pill.y + g.pill.h * 0.64];
  const c = g.composer;
  const send: Point = [c.x + c.w - 52 - 32 + 4, c.y + c.h - 34 - 32 + 6];
  const keys: [number, Point][] = [
    [0.2, g.start],
    [0.85, pill],
    [1.35, pill],
    [2.0, g.rest],
    [4.4, g.rest],
    [4.92, send],
    [6, send],
  ];
  let k = 0;
  while (k < keys.length - 2 && t > keys[k + 1]![0]) k++;
  const [ta, a] = keys[k]!;
  const [tb, b] = keys[k + 1]!;
  const p = inOut(clamp((t - ta) / (tb - ta)));
  const x = lerp(a[0], b[0], p);
  const y = lerp(a[1], b[1], p);
  const o = ramp(t, 0.2, 0.25) * (1 - ramp(t, 5.3, 0.25));
  if (o <= 0.001) return null;
  const down = Math.max(pressAt(t, CLICK[0]), pressAt(t, CLICK[1]));
  const ring = CLICK.map((at) => clamp((t - at) / 0.45)).find((r) => r > 0 && r < 1) ?? 0;
  return (
    <>
      {ring > 0 && <span className={s.ripple} style={{ left: x, top: y, opacity: 0.55 * (1 - ring), transform: `translate(-50%, -50%) scale(${0.3 + 1.3 * ring})` }} />}
      <span className={s.cursor} style={{ opacity: o, transform: `translate(${x - 5}px, ${y - 3}px) scale(${1 - 0.14 * down})` }}>
        <svg viewBox="0 0 28 28" width="34" height="34" aria-hidden="true">
          <path d="M5 3l16 10.2-7 1.4-3.6 6.9z" fill="#10131a" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );
}

function End({ t }: { t: number }) {
  const o = live(t, END, DURATION + 1);
  if (o <= 0.001) return null;
  const a = END + 0.15;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.eyebrow} style={rise(t, a, 8)}>
        Case study 03
      </span>
      <span className={s.endTitle} style={rise(t, a + 0.2)}>
        AI-readable design system
      </span>
      <span className={`${s.endAccent} ${s.serif}`} style={rise(t, a + 0.7)}>
        Story to screen in days, not weeks.
      </span>
      <span className={s.byline} style={rise(t, a + 1.3, 8)}>
        {site.name} · {site.role} · <b>{new URL(site.url).host}</b>
      </span>
    </div>
  );
}

/** A soft gradient that drifts slowly: the case's lilac, with sky and a little of the site's teal. */
function backdrop(t: number) {
  const sin = (k: number, a: number) => Math.sin(t * k + a);
  return [
    blob(20 + 6 * sin(0.33, 0), 20 + 5 * sin(0.29, 1), 60, "rgba(150, 138, 226, 0.36)"),
    blob(86 + 5 * sin(0.27, 2), 22 + 6 * sin(0.31, 3), 58, "rgba(118, 162, 238, 0.3)"),
    blob(74 + 6 * sin(0.24, 4), 90 + 4 * sin(0.3, 5), 60, "rgba(19, 179, 161, 0.2)"),
    blob(10 + 5 * sin(0.26, 6), 86 + 5 * sin(0.28, 7), 54, "rgba(232, 190, 228, 0.3)"),
    "#f4f4fa",
  ].join(", ");
}

/* --------------------------------------------------------------- the page */

export function SkillsTrailer({ layout = "card" }: { layout?: Layout }) {
  const [w, h] = SIZE[layout];
  const studio = useStudio(DURATION, FPS, w, h);
  const { t } = studio;
  return (
    <StudioShell studio={studio}>
      <div className={s.stage} data-stage data-layout={layout} style={{ background: backdrop(t) }}>
        <Canvas t={t} layout={layout} brand={brandAt(t)} />
        <Skills t={t} layout={layout} />
        <Checks t={t} />
        <Composer t={t} layout={layout} />
        <Cursor t={t} layout={layout} />
        <End t={t} />
      </div>
    </StudioShell>
  );
}
