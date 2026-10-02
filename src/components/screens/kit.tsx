"use client";

import { useLayoutEffect, useRef, useState } from "react";
import s from "./Mock.module.css";

/* ------------------------------------------------------------------ icons */

const paths = {
  home: "M3 10.5 10 4l7 6.5V17a1 1 0 0 1-1 1h-3.5v-5h-5v5H4a1 1 0 0 1-1-1z",
  card: "M3 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m2 4h4m-4 3h3m4-3h3m-3 3h3",
  shield: "M10 2.5 16.5 5v4.6c0 4-2.8 6.9-6.5 8.4-3.7-1.5-6.5-4.4-6.5-8.4V5z",
  doc: "M5 2.5h6.5L15 6v11.5H5zM11 2.5V6h4M7.5 10h5m-5 3h5",
  people: "M7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 8c0-2.8 2.2-5 5-5s5 2.2 5 5m1.5-8a2.5 2.5 0 1 0 0-5m1.5 13c0-2.3-1-4-3-4.6",
  check: "M4 10.5 8 14l8-8.5",
  chevronDown: "M5 8l5 5 5-5",
  chevronRight: "M8 5l5 5-5 5",
  arrowLeft: "M16 10H4m5-5-5 5 5 5",
  arrowRight: "M4 10h12m-5-5 5 5-5 5",
  plus: "M10 4v12M4 10h12",
  minus: "M5 10h10",
  x: "M5 5l10 10M15 5 5 15",
  edit: "M4 16h3l8.5-8.5-3-3L4 13zM11 6l3 3",
  kebab: "M10 4.5h.01M10 10h.01M10 15.5h.01",
  heart: "M10 16.5S3 12.5 3 7.8A3.6 3.6 0 0 1 10 6a3.6 3.6 0 0 1 7 1.8c0 4.7-7 8.7-7 8.7M6 10h2l1-2 2 4 1-2h2",
  tooth: "M6.5 3C4.5 3 3.5 4.6 3.5 6.5c0 2 1 3.2 1.4 5.4.4 2.4.7 5.1 1.9 5.1 1.3 0 1.2-4.3 3.2-4.3s1.9 4.3 3.2 4.3c1.2 0 1.5-2.7 1.9-5.1.4-2.2 1.4-3.4 1.4-5.4C16.5 4.6 15.5 3 13.5 3c-1.4 0-2.2.8-3.5.8S7.9 3 6.5 3",
  eye: "M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10m8 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  external: "M11 3h6v6m0-6-8 8M8 4H4v12h12v-4",
  download: "M10 3v9m-4-4 4 4 4-4M4 16h12",
  dollar: "M10 3v14m3.5-11c-.6-1-1.9-1.5-3.5-1.5-2 0-3.5 1-3.5 2.6 0 3.6 7.5 1.8 7.5 5.4 0 1.6-1.6 2.7-4 2.7-1.8 0-3.2-.6-3.9-1.7",
  restart: "M4 10a6 6 0 1 0 1.8-4.3M4 4v3h3",
  save: "M4 4h9.5L16 6.5V16H4zm3 0v4h6V4M7 16v-5h6v5",
  search: "M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12m4.3-1.7L17 17",
} as const;

export type IconName = keyof typeof paths;

export function I({ n, className }: { n: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[n]} />
    </svg>
  );
}

/* ---------------------------------------------------------------- scaling */

/**
 * Renders children at a fixed design width and scales them to the container,
 * like a screenshot would, but crisp and in the site's type. `maxScale`
 * stops small designs from being blown up.
 */
export function Scaled({ width, maxScale = 1, children }: { width: number; maxScale?: number; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 0.5, height: 0 });

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const scale = Math.min(maxScale, o.clientWidth / width);
      setBox({ scale, height: i.offsetHeight * scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width, maxScale]);

  return (
    <div ref={outer} className={s.scaler} style={{ height: box.height || undefined, aspectRatio: box.height ? undefined : "4 / 3" }}>
      <div ref={inner} className={s.scaled} style={{ width, transform: `scale(${box.scale})` }}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ frame */

type Step = { label: string; sub?: React.ReactNode; state: "done" | "current" | "todo" };

export function AppFrame({
  title,
  forWhom,
  premium,
  steps,
  rail = ["home", "card", "shield", "doc"],
  children,
}: {
  title: string;
  forWhom?: string;
  premium?: string;
  steps?: Step[];
  rail?: IconName[];
  children: React.ReactNode;
}) {
  return (
    <div className={s.screen}>
      <nav className={s.rail}>
        {rail.map((n, i) => (
          <I key={n + i} n={n} className={i === 0 ? s.railOn : undefined} />
        ))}
      </nav>
      <div>
        <header className={s.titleBar}>
          <h1>
            {title}
            {forWhom && (
              <small>
                For <b>{forWhom}</b>
              </small>
            )}
          </h1>
          {premium && (
            <div className={s.premium}>
              <i>$</i>
              <span>
                Total premium
                <b>
                  {premium} <small className={s.muted}>per month</small>
                </b>
              </span>
            </div>
          )}
        </header>
        <div className={`${s.body} ${steps ? "" : s.bodyWide}`}>
          <div style={{ display: "grid", gap: 14, minWidth: 0 }}>{children}</div>
          {steps && <Stepper steps={steps} />}
        </div>
      </div>
    </div>
  );
}

export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <div className={`${s.card} ${s.stepper}`}>
      {steps.map((st) => (
        <div key={st.label} className={s.step} data-state={st.state}>
          <span className={s.dot} data-state={st.state}>
            {st.state !== "todo" && <I n="check" />}
          </span>
          <span>
            {st.label}
            {st.sub && <small>{st.sub}</small>}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ parts */

export const Btn = ({ children, ghost, sm }: { children: React.ReactNode; ghost?: boolean; sm?: boolean }) => (
  <span className={`${s.btn} ${ghost ? s.btnGhost : ""} ${sm ? s.btnSm : ""}`}>{children}</span>
);

export const Person = ({ name, role, lg }: { name: string; role?: string; lg?: boolean }) => (
  <span className={s.person}>
    <span className={`${s.avatar} ${lg ? s.avatarLg : ""}`}>
      {name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)}
    </span>
    <span className={s.pText}>
      <b>{name}</b>
      {role && <span>{role}</span>}
    </span>
  </span>
);

export const Cb = ({ on, children }: { on?: boolean; children: React.ReactNode }) => (
  <span className={s.cb} data-on={on || undefined}>
    {children}
  </span>
);

export const CovIcon = ({ n, sm }: { n: "heart" | "tooth" | "eye"; sm?: boolean }) => (
  <span className={`${s.cov} ${sm ? s.covSm : ""}`}>
    <I n={n} />
  </span>
);

export const Ok = () => (
  <span className={s.okIcon}>
    <I n="check" />
  </span>
);

export const Foot = ({ primary, back = true, extras }: { primary: string; back?: boolean; extras?: boolean }) => (
  <div className={s.cardFoot}>
    {extras && (
      <>
        <span className={s.link}>
          <I n="restart" /> Start over
        </span>
        <span className={s.link}>
          <I n="save" /> Save &amp; exit
        </span>
        <span className={s.spacer} />
      </>
    )}
    {back && <span className={s.link}>Back</span>}
    <Btn>{primary}</Btn>
  </div>
);

/* Demo data, shared so every screen tells the same story. */
export const family = {
  member: "Michael Brown",
  spouse: "Jane Brown",
  kids: ["Harry Brown", "Carrie Brown", "Jason Brown"],
};
