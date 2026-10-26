"use client";

import { useLayoutEffect, useRef } from "react";
import { site } from "@/content/site";
import { StudioShell, clamp, inOut, lerp, live, ramp, rise, useStudio } from "./clock";
import s from "./EnrollmentTrailer.module.css";

/*
 * The enrollment trailer, rebuilt (2026-10-26) on a sea-tint stage.
 *
 * Everything on screen is a pure function of one clock, `t` in seconds, so
 * any frame can be drawn exactly: the page plays in real time for preview,
 * and the recorder steps it one frame at a time (window.__trailer.setTime).
 * Same story and timing as the original 34.6 s cut, so its soundtrack still
 * fits. Screens are close-ups in the demo brand (screens/kit palette).
 */

export const DURATION = 34.6;
export const FPS = 30;

const money = (n: number) => `$${n.toFixed(2)}`;

/* ----------------------------------------------------------------- icons */

const Svg = ({ d, className, w = 2 }: { d: string; className?: string; w?: number }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d={d} />
  </svg>
);
const CHECK = "M4.5 10.5 8 14l7.5-8";
const CROSS = "M6 6l8 8M14 6l-8 8";
const CHEV = "M5 8l5 5 5-5";
const ARROW = "M4 10h12m-5-5 5 5-5 5";
const BACK = "M16 10H4m5-5-5 5 5 5";

/* ------------------------------------------------------------ the story */

type Line = { at: number; text: React.ReactNode | ((t: number) => React.ReactNode); kind?: "main" | "bad" | "accent" | "sub" };
type Beat = { from: number; to: number; eyebrow: string; lines: Line[]; extra?: (t: number) => React.ReactNode };

const serifBad = `${s.serif} ${s.bad}`;
const serifAccent = `${s.serif} ${s.accent}`;

const beats: Beat[] = [
  {
    from: 0,
    to: 5.5,
    eyebrow: "Case study 01 · Health-insurance enrollment",
    lines: [
      { at: 0.6, text: <><span className={s.initials}>DR</span>This is Dennis.</> },
      { at: 1.4, text: "He just had a baby." },
      { at: 2.2, text: (t) => <><span className={s.accent}>31 days</span><span style={rise(t, 2.9, 10)}>&nbsp;to cover her.</span></> },
    ],
  },
  { from: 5.5, to: 7.3, eyebrow: "The old flow", lines: [{ at: 5.7, text: "He adds her." }, { at: 6.2, text: "Still not covered.", kind: "bad" }] },
  { from: 7.3, to: 9.1, eyebrow: "The old flow", lines: [{ at: 7.5, text: "Then a hub." }, { at: 7.9, text: "One coverage at a time.", kind: "bad" }] },
  { from: 9.1, to: 11.1, eyebrow: "The old flow · Medical", lines: [{ at: 9.3, text: "Who's covered?" }, { at: 9.8, text: "Asked again.", kind: "bad" }] },
  {
    from: 11.1,
    to: 12.6,
    eyebrow: "The old flow · Medical",
    lines: [
      { at: 11.3, text: "The cost?" },
      { at: 11.7, text: "An annual estimate.", kind: "bad" },
      { at: 12.0, text: "No total, anywhere.", kind: "sub" },
    ],
  },
  { from: 12.6, to: 15.0, eyebrow: "The old flow · Medical", lines: [{ at: 12.8, text: "He changes plan." }, { at: 14.0, text: "The family resets.", kind: "bad" }] },
  {
    from: 15.0,
    to: 16.75,
    eyebrow: "The old flow",
    lines: [{ at: 15.2, text: "And again," }, { at: 15.5, text: "for every coverage.", kind: "bad" }],
    extra: (t) => (
      <div className={s.chips}>
        <span className={s.chip} style={rise(t, 15.7, 10)}>Medical</span>
        <span className={s.chip} style={rise(t, 15.9, 10)}>Dental</span>
        <span className={s.times} style={rise(t, 16.1, 10)}>×2</span>
      </div>
    ),
  },
  {
    from: 20.25,
    to: 22.9,
    eyebrow: "The redesign",
    lines: [
      { at: 20.4, text: (t) => <>His family,<span className={serifAccent} style={rise(t, 21.0, 10)}>&nbsp;once.</span></> },
      { at: 21.8, text: "Who needs what, in one grid.", kind: "sub" },
    ],
  },
  { from: 22.9, to: 24.1, eyebrow: "The redesign", lines: [{ at: 23.1, text: "No hub." }] },
  { from: 24.1, to: 25.9, eyebrow: "The redesign", lines: [{ at: 24.3, text: "Who it covers?" }, { at: 24.9, text: "Already known.", kind: "accent" }] },
  { from: 25.9, to: 28.3, eyebrow: "The redesign", lines: [{ at: 26.1, text: "Monthly prices." }, { at: 26.6, text: "A running total.", kind: "accent" }] },
  { from: 28.3, to: 30.2, eyebrow: "The redesign", lines: [{ at: 28.5, text: "He switches plan." }, { at: 29.1, text: "The family stays.", kind: "accent" }] },
  {
    from: 30.2,
    to: 31.9,
    eyebrow: "In production",
    lines: [{ at: 30.4, text: "It's live." }],
    extra: (t) => (
      <>
        <div className={s.livePills}>
          <span className={s.livePill} style={rise(t, 30.7, 10)}>Open enrollment</span>
          <span className={s.livePill} style={rise(t, 30.95, 10)}>Life events</span>
          <span className={s.livePill} style={rise(t, 31.2, 10)}>New hires</span>
        </div>
        <span className={s.sub} style={rise(t, 31.4, 10)}>
          Five fixes. Who&apos;s covered, asked once.
        </span>
      </>
    ),
  },
];

function Story({ t }: { t: number }) {
  return (
    <div className={s.left}>
      {beats.map((b) => {
        const o = live(t, b.from, b.to);
        if (o <= 0.001) return null;
        return (
          <div key={b.from} className={s.beat} style={{ opacity: o }}>
            <p className={s.eyebrow} style={b.from <= 0 ? undefined : rise(t, b.from + 0.05, 8)}>
              {b.eyebrow}
            </p>
            {b.lines.map((l) => {
              const cls = l.kind === "sub" ? s.sub : `${s.line} ${l.kind === "bad" ? serifBad : l.kind === "accent" ? serifAccent : ""}`;
              return (
                <span key={l.at} className={cls} style={{ ...rise(t, l.at), display: "block" }}>
                  {typeof l.text === "function" ? l.text(t) : l.text}
                </span>
              );
            })}
            {b.extra?.(t)}
          </div>
        );
      })}
    </div>
  );
}

/* The five problems, then the five fixes, ticked off one by one. */
const checks = [
  { tag: "01 · Who's covered", bad: "Adding her didn't cover her", good: "Who needs what, in one grid", badAt: 6.4, goodAt: 22.0 },
  { tag: "02 · The coverage hub", bad: "One coverage at a time", good: "Gone. Straight to plans", badAt: 8.0, goodAt: 23.3 },
  { tag: "03 · Who a plan covers", bad: "Asked again, in every plan", good: "Filled in from the grid", badAt: 9.9, goodAt: 25.0 },
  { tag: "04 · The cost", bad: "Annual estimate, no total", good: "Monthly, with a running total", badAt: 11.8, goodAt: 26.8 },
  { tag: "05 · Switching plans", bad: "Change plan, family resets", good: "Switch plan, family stays", badAt: 14.1, goodAt: 29.2 },
];

function Checks({ t }: { t: number }) {
  const before = live(t, 6.2, 16.75);
  const after = live(t, 20.35, 30.25);
  if (before <= 0.001 && after <= 0.001) return null;
  const isAfter = t > 18;
  return (
    <div className={s.checks} style={{ opacity: Math.max(before, after) }}>
      {checks.map((c, i) => {
        const shown = isAfter ? ramp(t, 20.45 + i * 0.12, 0.35) : ramp(t, c.badAt, 0.4);
        const g = isAfter ? ramp(t, c.goodAt, 0.35) : 0;
        return (
          <div key={c.tag} className={s.check} style={{ opacity: shown, transform: `translateX(${(1 - shown) * -12}px)` }}>
            <span className={s.checkIcon}>
              <span style={{ background: "var(--red-dot)", opacity: 1 - g }}>
                <Svg d={CROSS} w={2.6} />
              </span>
              <span style={{ background: "var(--teal)", opacity: g, transform: `scale(${0.6 + 0.4 * g})` }}>
                <Svg d={CHECK} w={2.6} />
              </span>
            </span>
            <span>
              <span className={s.checkEyebrow}>{c.tag}</span>
              <span className={s.checkText} style={{ display: "block" }}>
                <span className={s.bad} style={{ opacity: 1 - g }}>
                  {c.bad}
                </span>
                <span style={{ opacity: g, color: "var(--teal-ink)", transform: `translateY(${(1 - g) * 8}px)` }}>{c.good}</span>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------- centre and end cards */

function Flow({ t, at, items, good }: { t: number; at: number; items: string[]; good?: boolean }) {
  return (
    <div className={s.flow}>
      {items.map((it, i) => (
        <span key={it} style={{ display: "contents" }}>
          {i > 0 && (
            <span style={rise(t, at + i * 0.14 - 0.07, 0)}>
              <Svg d={ARROW} className={s.flowArrow} />
            </span>
          )}
          <span className={s.flowPill} data-good={good || undefined} style={rise(t, at + i * 0.14, 14)}>
            {it}
          </span>
        </span>
      ))}
    </div>
  );
}

function Middle({ t }: { t: number }) {
  const built = live(t, 16.95, 18.9);
  const flipped = live(t, 18.9, 20.25);
  return (
    <>
      {built > 0.001 && (
        <div className={s.center} style={{ opacity: built }}>
          <span className={s.centerLine} style={rise(t, 17.1)}>
            Built around the database,
          </span>
          <span className={`${s.centerLine} ${serifBad}`} style={rise(t, 17.7)}>
            not around Dennis.
          </span>
          <Flow t={t} at={17.35} items={["Coverage", "Plan", "Members"]} />
          <span className={s.caption} style={rise(t, 17.9, 8)}>
            the order the data is stored in
          </span>
        </div>
      )}
      {flipped > 0.001 && (
        <div className={s.center} style={{ opacity: flipped }}>
          <span className={s.centerLine} style={rise(t, 19.05)}>
            So we flipped it.
          </span>
          <Flow t={t} at={19.3} items={["Family", "Who needs what", "Plans"]} good />
          <span className={s.caption} style={rise(t, 19.7, 8)}>
            the order a family decides in
          </span>
        </div>
      )}
    </>
  );
}

function End({ t }: { t: number }) {
  const o = live(t, 31.95, DURATION + 1);
  if (o <= 0.001) return null;
  return (
    <div className={s.center} style={{ opacity: o }}>
      <span className={s.endEyebrow} style={rise(t, 32.15, 8)}>
        Case study 01
      </span>
      <span className={s.endTitle} style={rise(t, 32.35)}>
        Health-insurance enrollment
      </span>
      <span className={`${s.endAccent} ${s.serif}`} style={rise(t, 32.85)}>
        reordered around the family.
      </span>
      <span className={s.byline} style={rise(t, 33.4, 8)}>
        {site.name} · {site.role} · <b>{new URL(site.url).host}</b>
      </span>
    </div>
  );
}

/* ------------------------------------------------------- browser screens */

const people = [
  { n: "Dennis Reed", i: "DR", r: "Member", k: "dennis" },
  { n: "Ana Reed", i: "AR", r: "Spouse", k: "ana" },
  { n: "Maya Reed", i: "MR", r: "Child", k: "maya" },
  { n: "Noor Reed", i: "NR", r: "Newborn", k: "noor" },
] as const;

const Person = ({ p }: { p: (typeof people)[number] }) => (
  <span className={s.person}>
    <span className={s.avatar}>{p.i}</span>
    <span>
      <span className={s.pname} style={{ display: "block" }}>
        {p.n}
      </span>
      <span className={s.prole}>{p.r}</span>
    </span>
  </span>
);

function AppHead({ total, hot }: { total?: number; hot?: boolean }) {
  return (
    <div className={s.appHead}>
      <h1 className={s.appTitle}>
        Life event
        <small>
          For <b>Dennis Reed</b>
        </small>
      </h1>
      {total === undefined ? (
        <span className={s.event}>
          <i>!</i> Birth of a child · <b>31 days</b> to make changes
        </span>
      ) : (
        <span className={s.total} data-hot={hot || undefined}>
          <i>$</i>
          <span>
            Total premium
            <b>
              {money(total)} <small style={{ fontSize: 12, fontWeight: 400, color: "var(--m-ink-3)" }}>per month</small>
            </b>
          </span>
        </span>
      )}
    </div>
  );
}

/** A button pressed at time c: a quick dip, so the click reads. */
const press = (t: number, c: number): React.CSSProperties => {
  const d = t - c;
  return d >= 0 && d < 0.2 ? { transform: `scale(${1 - 0.06 * Math.sin((d / 0.2) * Math.PI)})` } : {};
};

function Dependents({ t }: { t: number }) {
  const typing = t >= 2.95 && t < 5.0;
  const typed = "Noor Reed".slice(0, Math.round(clamp((t - 3.3) / 0.85) * 9));
  return (
    <>
      <AppHead />
      <section className={s.card}>
        <div className={s.cardHead}>
          <h2>Dependents</h2>
          <span className={s.ghost} data-k="add-dep" style={press(t, 2.9)}>
            + Add dependent
          </span>
        </div>
        {people.slice(0, 3).map((p) => (
          <div key={p.k} className={s.row}>
            <Person p={p} />
            <Svg d={CHEV} className={s.chev} />
          </div>
        ))}
        {typing ? (
          <div className={s.row} style={{ ...rise(t, 2.95, 10), display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
            <span className={s.field} data-k="name-input" data-focus={t < 4.4 || undefined}>
              <span>
                {typed || <em>Full name</em>}
                {t < 4.4 && Math.floor(t * 2.4) % 2 === 0 && <span className={s.caret} />}
              </span>
            </span>
            <span className={s.field} data-k="rel-select" data-focus={(t >= 4.4 && t < 5) || undefined}>
              {t >= 4.45 ? "Newborn" : <em>Relationship</em>}
              <Svg d={CHEV} className={s.chev} />
            </span>
          </div>
        ) : (
          t >= 5.0 && (
            <div className={s.row} style={{ ...rise(t, 5.0, 8), display: "flex" }}>
              <Person p={people[3]} />
              <span className={s.okChip}>Newly added</span>
            </div>
          )
        )}
        {t >= 6.1 && (
          <p className={s.warn} style={{ ...rise(t, 6.15, 8), display: "block" }}>
            Adding a dependent does not automatically enroll them in coverage.
          </p>
        )}
        <div className={s.foot}>
          <span className={s.btn} data-k="continue-1" style={press(t, 6.8)}>
            Continue
          </span>
        </div>
      </section>
    </>
  );
}

function HubCard({ name, plan, premium, deps, k }: { name: string; plan: string; premium: string; deps?: boolean; k: string }) {
  return (
    <div className={s.hubCard}>
      <div className={s.hubTop}>
        <span className={s.okDot}>
          <Svg d={CHECK} w={2.6} />
        </span>
        <h4>{name}</h4>
        <span className={s.money}>
          Premium
          <b>{premium}</b>
          Annual
        </span>
      </div>
      <div className={s.hubLine}>
        <span style={{ color: deps ? undefined : "var(--m-ink-3)" }}>{plan}</span>
        {deps && <span className={s.depChip}>3 dependents added</span>}
        <span className={s.ghost} data-k={k}>
          Update
        </span>
      </div>
    </div>
  );
}

function Hub({ t }: { t: number }) {
  return (
    <>
      <AppHead />
      <section className={s.card}>
        <div className={s.cardHead}>
          <div>
            <h2>Select coverage(s)</h2>
            <p>Select a plan for each coverage type, or waive it.</p>
          </div>
        </div>
        <div className={s.hub}>
          <span style={press(t, 8.8)}>
            <HubCard name="Medical" plan="Gold PPO Health Plan" premium="$960.00" deps k="hub-update" />
          </span>
          <HubCard name="Dental" plan="Clove Dental Plus" premium="$960.00" deps k="hub-dental" />
          <HubCard name="Vision" plan="Vision coverage is waived." premium="$0.00" k="hub-vision" />
        </div>
        <div className={s.foot}>
          <span className={s.btn}>Proceed</span>
        </div>
      </section>
    </>
  );
}

type Kind = "medical" | "dental" | "vision";

function PlanModal({ t, kind }: { t: number; kind: Kind }) {
  const isMed = kind === "medical";
  const silver = isMed && t >= 13.7;
  const resetAt = 13.9;
  /** When each person's pill turns to Remove; -1 means already on, Infinity never. */
  const onAt: Record<Kind, Record<string, number>> = {
    medical: { dennis: -1, ana: 9.6, maya: 10.1, noor: 10.6 },
    dental: { dennis: -1, ana: 15.4, maya: Infinity, noor: Infinity },
    vision: { dennis: -1, ana: -1, maya: 16.2, noor: Infinity },
  };
  const plan = { medical: silver ? "Silver PPO Health Plan" : "Gold PPO Health Plan", dental: "Clove Dental Plus", vision: "Vision Basic" }[kind];
  const premium = { medical: silver ? "$780.00" : "$960.00", dental: "$960.00", vision: "$240.00" }[kind];
  const cost = isMed ? live(t, 11.25, 12.65, 0.25) : 0;
  const choose = isMed ? live(t, 12.95, 13.95, 0.25) : 0;
  const flash = isMed && t >= resetAt ? 1 - ramp(t, resetAt + 0.3, 0.9) : 0;
  return (
    <>
      <AppHead />
      <section className={s.card}>
        <div className={s.cardHead}>
          <h2>{kind[0]!.toUpperCase() + kind.slice(1)} plan</h2>
          <Svg d={CROSS} className={s.chev} />
        </div>
        <div className={s.selects}>
          <span className={s.field}>
            <span>
              <em>Coverage includes:</em> Employee only
            </span>
            <Svg d={CHEV} className={s.chev} />
          </span>
          <span className={s.field}>
            <span>
              <em>Network:</em> PPO Network
            </span>
            <Svg d={CHEV} className={s.chev} />
          </span>
        </div>
        <div className={s.planCard}>
          <h4>{plan}</h4>
          <p>In-network deductible $170 · Out-of-pocket $80</p>
          <span className={`${s.money} ${s.planPrice}`} data-hot={cost > 0.5 || undefined} data-k={`${kind}-price`}>
            Premium
            <b>{premium}</b>
            Annual
          </span>
          <p className={s.warnLine} style={{ background: `rgba(255, 214, 102, ${0.55 * cost})` }}>
            The displayed Premium is only an estimate. The amount may vary if you change network or update Dependents.
          </p>
        </div>
        <p className={s.label}>Select member(s) and dependent(s) to cover</p>
        {people.map((p) => {
          const at = onAt[kind][p.k] ?? Infinity;
          const on = isMed && t >= resetAt ? false : t >= at;
          return (
            <div key={p.k} className={s.row} style={flash > 0 ? { background: `rgba(252, 235, 235, ${flash})` } : undefined}>
              <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span className={s.avatar}>{p.i}</span>
                <span className={s.pname}>{p.n}</span>
                <span className={s.prole}>{p.r}</span>
              </span>
              <span className={s.addPill} data-on={on || undefined} data-k={`${kind}-${p.k}`} style={at > 0 && at < Infinity ? press(t, at) : undefined}>
                {on ? "Remove −" : "Add +"}
              </span>
            </div>
          );
        })}
        <div className={s.modalFoot}>
          <span className={s.link} data-k={`${kind}-change`} style={isMed ? press(t, 12.8) : undefined}>
            Change plan
          </span>
          <span className={s.btn}>Proceed</span>
        </div>
      </section>
      {choose > 0.001 && (
        <>
          <div className={s.dim} style={{ opacity: choose }} />
          <div className={s.chooser} style={{ opacity: choose, transform: `translateY(${(1 - choose) * 16}px)` }}>
            <h3>Choose a medical plan</h3>
            {[
              ["Gold PPO Health Plan", "$960.00", "pick-gold"],
              ["Silver PPO Health Plan", "$780.00", "select-silver"],
              ["Bronze PPO Health Plan", "$540.00", "pick-bronze"],
            ].map(([n, p, k]) => (
              <div key={k} className={s.row}>
                <span>
                  <span className={s.pname} style={{ display: "block" }}>
                    {n}
                  </span>
                  <span className={s.prole}>{p} annual estimate</span>
                </span>
                <span className={s.ghost} data-k={k} style={k === "select-silver" ? press(t, 13.6) : undefined}>
                  Select
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

const covs = ["Medical", "Dental", "Vision", "Supplemental"] as const;

function Grid({ t }: { t: number }) {
  const base: Record<string, number[]> = { dennis: [1, 1, 0, 0], ana: [1, 1, 0, 0], maya: [1, 1, 1, 0] };
  const noorAt = [21.2, 21.6, Infinity, Infinity];
  return (
    <>
      <AppHead total={0} />
      <section className={s.card}>
        <div className={s.cardHead}>
          <h2>Select dependent(s)</h2>
          <span className={s.ghost}>+ Add dependent</span>
        </div>
        {people.map((p) => (
          <div key={p.k} className={s.famRow}>
            <div className={s.famTop}>
              <Person p={p} />
              {p.k === "noor" && <span className={s.okChip}>Newly added</span>}
            </div>
            <div className={s.famCovs}>
              {covs.map((c, j) => {
                const on = p.k === "noor" ? t >= (noorAt[j] ?? Infinity) : (base[p.k]?.[j] ?? 0) === 1;
                const at = p.k === "noor" ? noorAt[j] : undefined;
                return (
                  <span key={c} className={s.cb} data-on={on || undefined} data-k={p.k === "noor" ? `grid-noor-${c.toLowerCase()}` : undefined} style={at && at < Infinity ? press(t, at) : undefined}>
                    <i>{on && <Svg d={CHECK} w={2.8} />}</i>
                    {c}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
        <div className={s.foot}>
          <span className={s.btn} data-k="continue-grid" style={press(t, 22.6)}>
            Continue
          </span>
        </div>
      </section>
    </>
  );
}

/** The running total: it counts up each time a plan is picked. */
function totalAt(t: number) {
  const steps: [number, number, number][] = [
    [26.1, 0, 80],
    [27.4, 80, 160],
    [28.8, 160, 182.9],
  ];
  let v = 0;
  for (const [at, from, to] of steps) if (t >= at) v = lerp(from, to, inOut(clamp((t - at) / 0.55)));
  return v;
}

function Plans({ t }: { t: number }) {
  const dental = t >= 27.0;
  const hubGone = ramp(t, 23.45, 0.45);
  const total = totalAt(t);
  const counting = [26.1, 27.4, 28.8].some((a) => t >= a && t < a + 0.9);
  const medical = [
    ["Waive / opt out", 0, "plan-waive"],
    ["TotalCare Select", 80, "plan-totalcare"],
    ["PrimeMed Plus", 80, "plan-primemed"],
    ["Elite Health", 102.9, "plan-elite"],
  ] as const;
  const dentalPlans = [
    ["Waive / opt out", 0, "plan-dwaive"],
    ["Clove Preventive", 80, "plan-clove-prev"],
    ["Clove Standard", 80, "plan-clove-std"],
    ["Clove Gold", 102.9, "plan-clove-gold"],
  ] as const;
  const picked = (k: string) =>
    (k === "plan-totalcare" && t >= 26.1) || (k === "plan-clove-prev" && t >= 27.4 && t < 28.8) || (k === "plan-clove-gold" && t >= 28.8);
  const clickAt: Record<string, number> = { "plan-totalcare": 26.1, "plan-clove-prev": 27.4, "plan-clove-gold": 28.8 };
  const list = dental ? dentalPlans : medical;
  return (
    <>
      <AppHead total={total} hot={counting} />
      <div className={s.tabs}>
        <span className={s.tab} data-done>
          ✓ Who&apos;s covered
        </span>
        <span
          className={s.tab}
          data-gone
          style={{ opacity: 1 - hubGone, maxWidth: `${(1 - hubGone) * 170}px`, paddingInline: `${(1 - hubGone) * 16}px`, marginRight: `${-8 * hubGone}px`, overflow: "hidden", whiteSpace: "nowrap", borderWidth: hubGone > 0.95 ? 0 : undefined }}
        >
          Coverage hub
        </span>
        <span className={s.tab} data-on={!dental || undefined}>
          Medical
        </span>
        <span className={s.tab} data-on={dental || undefined} data-k="tab-dental" style={press(t, 27.0)}>
          Dental
        </span>
        <span className={s.tab}>Vision</span>
        <span className={s.tab}>Review</span>
      </div>
      <h2 className={s.planHead}>
        <span>←</span>Select a plan for <b>{dental ? "Dental" : "Medical"}</b>
      </h2>
      <div className={s.covBar} data-hot={(t >= 24.5 && t < 25.8) || undefined}>
        <h3>
          Coverage includes: Family
          {t >= 29.2 && (
            <span className={s.kept} style={rise(t, 29.2, 6)}>
              ✓ Family kept
            </span>
          )}
        </h3>
        <p>
          Dennis Reed · Ana Reed · Maya Reed · Noor Reed <span className={s.link}>Update</span>
        </p>
      </div>
      <div className={s.picks} key={dental ? "d" : "m"} style={{ opacity: dental ? ramp(t, 27.0, 0.3) : 1 }}>
        {list.map(([n, p, k]) => (
          <div key={k} className={s.pick} data-on={picked(k) || undefined} data-k={k} style={clickAt[k] ? press(t, clickAt[k]!) : undefined}>
            <h4>{n}</h4>
            <b>{money(p)}</b>
            <small>per month</small>
            <span className={s.radio} />
          </div>
        ))}
      </div>
    </>
  );
}

function Review() {
  const rows = [
    ["Medical", "TotalCare Select · Dennis · Ana · Maya · Noor", "$80.00", true],
    ["Dental", "Clove Gold · Dennis · Ana · Maya · Noor", "$102.90", true],
    ["Vision", "Waived · No one", "$0.00", false],
  ] as const;
  return (
    <>
      <AppHead total={182.9} />
      <section className={s.card}>
        <div className={s.cardHead}>
          <div>
            <h2>Review and submit</h2>
            <p>Everything in one place. Update any section before you sign.</p>
          </div>
        </div>
        {rows.map(([n, d, p, isNew]) => (
          <div key={n} className={s.revRow}>
            <div>
              <h4>{n}</h4>
              <p>{d}</p>
            </div>
            {isNew && <span className={s.okChip}>Noor newly added</span>}
            <b>
              {p} <small>/mo</small>
            </b>
          </div>
        ))}
        <div className={s.foot}>
          <span className={s.btn} data-k="submit">
            Accept &amp; submit
          </span>
        </div>
      </section>
    </>
  );
}

/* Which screen shows when (seconds). Each crossfades into the next. */
const screens: { from: number; to: number; draw: (t: number) => React.ReactNode }[] = [
  { from: -1, to: 7.4, draw: (t) => <Dependents t={t} /> },
  { from: 7.4, to: 9.2, draw: (t) => <Hub t={t} /> },
  { from: 9.2, to: 15.0, draw: (t) => <PlanModal t={t} kind="medical" /> },
  { from: 15.0, to: 15.85, draw: (t) => <PlanModal t={t} kind="dental" /> },
  { from: 15.85, to: 17.2, draw: (t) => <PlanModal t={t} kind="vision" /> },
  { from: 20.0, to: 23.0, draw: (t) => <Grid t={t} /> },
  { from: 23.0, to: 30.2, draw: (t) => <Plans t={t} /> },
  { from: 30.2, to: 33, draw: () => <Review /> },
];

/* The camera inside the window: zoom (s) toward a focus point (fx, fy). */
const camera: { t: number; s: number; fx: number; fy: number }[] = [
  { t: 0, s: 1, fx: 0.42, fy: 0.3 },
  { t: 2.4, s: 1, fx: 0.42, fy: 0.3 },
  { t: 3.2, s: 1.08, fx: 0.42, fy: 0.3 },
  { t: 4.9, s: 1.08, fx: 0.42, fy: 0.3 },
  { t: 5.6, s: 1, fx: 0.42, fy: 0.3 },
  { t: 7.6, s: 1, fx: 0.85, fy: 0.42 },
  { t: 8.1, s: 1, fx: 0.78, fy: 0.42 },
  { t: 8.6, s: 1.15, fx: 0.78, fy: 0.42 },
  { t: 9.15, s: 1, fx: 0.78, fy: 0.42 },
  { t: 11.1, s: 1, fx: 0.92, fy: 0.24 },
  { t: 11.6, s: 1.4, fx: 0.92, fy: 0.24 },
  { t: 12.2, s: 1.4, fx: 0.92, fy: 0.24 },
  { t: 12.6, s: 1, fx: 0.92, fy: 0.24 },
  { t: 23.0, s: 1, fx: 0.32, fy: 0.05 },
  { t: 23.4, s: 1.1, fx: 0.32, fy: 0.05 },
  { t: 23.9, s: 1.1, fx: 0.32, fy: 0.05 },
  { t: 24.3, s: 1, fx: 0.4, fy: 0.25 },
  { t: 24.6, s: 1.12, fx: 0.4, fy: 0.25 },
  { t: 25.6, s: 1.12, fx: 0.4, fy: 0.25 },
  { t: 26.0, s: 1, fx: 0.5, fy: 0.5 },
];

function cameraAt(t: number) {
  const first = camera[0]!;
  if (t <= first.t) return first;
  for (let i = 1; i < camera.length; i++) {
    const a = camera[i - 1]!;
    const b = camera[i]!;
    if (t <= b.t) {
      const p = inOut(clamp((t - a.t) / (b.t - a.t)));
      return { t, s: lerp(a.s, b.s, p), fx: lerp(a.fx, b.fx, p), fy: lerp(a.fy, b.fy, p) };
    }
  }
  return camera[camera.length - 1]!;
}

function Window({ t }: { t: number }) {
  const o = Math.max(live(t, -1, 16.85), live(t, 20.1, 31.95));
  if (o <= 0.001) return null;
  const cam = cameraAt(t);
  return (
    <div className={s.window} data-window style={{ opacity: o, transform: `translateY(${(1 - o) * 24}px)` }}>
      <div className={s.chrome}>
        <i style={{ background: "#ff5f57" }} />
        <i style={{ background: "#febc2e" }} />
        <i style={{ background: "#28c840" }} />
        <span className={s.url}>benefits.example.com/enroll/life-event</span>
      </div>
      <div className={s.viewport}>
        <div className={s.camera} style={{ transform: `scale(${cam.s})`, transformOrigin: `${cam.fx * 100}% ${cam.fy * 100}%` }}>
          {screens.map((sc) => {
            const v = live(t, sc.from, sc.to, 0.3);
            // Stay mounted (hidden) just around each screen's slot, so the cursor can find its targets.
            if (t < sc.from - 2 || t > sc.to + 1) return null;
            return (
              <div key={sc.from} className={s.layer} style={{ opacity: v, visibility: v <= 0.001 ? "hidden" : undefined }}>
                {sc.draw(t)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- the pointer */

type Key = { t: number; k?: string; p?: [number, number]; click?: boolean };

const path: Key[] = [
  { t: 0, p: [0.72, 0.8] },
  { t: 2.5, k: "add-dep" },
  { t: 2.9, k: "add-dep", click: true },
  { t: 3.3, k: "name-input" },
  { t: 4.15, k: "name-input" },
  { t: 4.4, k: "rel-select", click: true },
  { t: 5.3, k: "continue-1" },
  { t: 6.8, k: "continue-1", click: true },
  { t: 7.7, p: [0.6, 0.62] },
  { t: 8.5, k: "hub-update" },
  { t: 8.8, k: "hub-update", click: true },
  { t: 9.4, k: "medical-ana" },
  { t: 9.6, k: "medical-ana", click: true },
  { t: 9.95, k: "medical-maya" },
  { t: 10.1, k: "medical-maya", click: true },
  { t: 10.45, k: "medical-noor" },
  { t: 10.6, k: "medical-noor", click: true },
  { t: 11.3, p: [0.5, 0.9] },
  { t: 12.3, p: [0.5, 0.9] },
  { t: 12.65, k: "medical-change" },
  { t: 12.8, k: "medical-change", click: true },
  { t: 13.4, k: "select-silver" },
  { t: 13.6, k: "select-silver", click: true },
  { t: 14.5, p: [0.72, 0.92] },
  { t: 15.2, k: "dental-ana" },
  { t: 15.4, k: "dental-ana", click: true },
  { t: 16.0, k: "vision-maya" },
  { t: 16.2, k: "vision-maya", click: true },
  { t: 17.0, k: "vision-maya" },
  { t: 20.2, p: [0.72, 0.86] },
  { t: 21.0, k: "grid-noor-medical" },
  { t: 21.2, k: "grid-noor-medical", click: true },
  { t: 21.45, k: "grid-noor-dental" },
  { t: 21.6, k: "grid-noor-dental", click: true },
  { t: 22.4, k: "continue-grid" },
  { t: 22.6, k: "continue-grid", click: true },
  { t: 23.4, p: [0.62, 0.72] },
  { t: 25.8, k: "plan-totalcare" },
  { t: 26.1, k: "plan-totalcare", click: true },
  { t: 26.8, k: "tab-dental" },
  { t: 27.0, k: "tab-dental", click: true },
  { t: 27.25, k: "plan-clove-prev" },
  { t: 27.4, k: "plan-clove-prev", click: true },
  { t: 28.5, k: "plan-clove-gold" },
  { t: 28.8, k: "plan-clove-gold", click: true },
  { t: 30.6, k: "submit" },
  { t: 32.0, k: "submit" },
];
const clicks = path.filter((k) => k.click).map((k) => k.t);

/** Where a key point sits on the stage right now (targets move with the camera). */
function locate(key: Key, stage: HTMLElement, scale: number): [number, number] | null {
  const sr = stage.getBoundingClientRect();
  if (key.k) {
    const el = stage.querySelector<HTMLElement>(`[data-k="${key.k}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return [(r.left + r.width * 0.55 - sr.left) / scale, (r.top + r.height * 0.6 - sr.top) / scale];
  }
  const win = stage.querySelector<HTMLElement>("[data-window]");
  if (!win || !key.p) return null;
  const r = win.getBoundingClientRect();
  return [(r.left + r.width * key.p[0] - sr.left) / scale, (r.top + r.height * key.p[1] - sr.top) / scale];
}

function placePointer(t: number, stage: HTMLElement | null, cursor: HTMLElement | null, ring: HTMLElement | null, scale: number) {
  if (!stage || !cursor || !ring) return;
  const vis = Math.min(Math.max(live(t, 0.2, 16.75), live(t, 20.3, 31.9)), 1);
  let i = path.findIndex((k) => k.t > t);
  if (i === -1) i = path.length - 1;
  const a = path[Math.max(0, i - 1)]!;
  const b = path[i]!;
  const pa = locate(a, stage, scale);
  const pb = locate(b, stage, scale) ?? pa;
  if (!pa || !pb || vis <= 0.001) {
    cursor.style.opacity = "0";
    ring.style.opacity = "0";
    return;
  }
  const p = b.t === a.t ? 1 : inOut(clamp((t - a.t) / (b.t - a.t)));
  const x = lerp(pa[0], pb[0], p);
  const y = lerp(pa[1], pb[1], p);
  const c = clicks.find((ct) => t >= ct && t < ct + 0.5);
  const down = c !== undefined && t - c < 0.14 ? 0.86 : 1;
  cursor.style.opacity = String(vis);
  cursor.style.transform = `translate(${x}px, ${y}px) scale(${down})`;
  if (c !== undefined) {
    const q = (t - c) / 0.5;
    ring.style.opacity = String((1 - q) * 0.9 * vis);
    ring.style.transform = `translate(${x}px, ${y}px) scale(${0.35 + q * 1.1})`;
  } else ring.style.opacity = "0";
}

/* --------------------------------------------------------------- the page */

export function EnrollmentTrailer() {
  const studio = useStudio(DURATION, FPS, 1920, 1080);
  const { t, scale } = studio;
  const stage = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  // The pointer is placed after layout, from the live positions of its targets.
  useLayoutEffect(() => placePointer(t, stage.current, cursor.current, ring.current, scale), [t, scale]);

  return (
    <StudioShell studio={studio}>
      <div ref={stage} className={s.stage} data-stage>
        <Story t={t} />
        <Checks t={t} />
        <Middle t={t} />
        <End t={t} />
        <Window t={t} />
        <div ref={ring} className={s.ripple} style={{ opacity: 0 }} />
        <div ref={cursor} className={s.cursor} style={{ opacity: 0 }}>
          <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
            <path d="M5 3l16 10.2-7 1.4-3.6 6.9z" fill="#10131a" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </StudioShell>
  );
}
