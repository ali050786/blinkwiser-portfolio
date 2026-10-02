"use client";

import s from "./Mock.module.css";
import { Btn, Cb, CovIcon, I, family } from "./kit";

/*
 * Design-system library pages, rebuilt in the demo brand. Structure and
 * naming follow the real library: role-named tokens, documented states,
 * domain components and page patterns.
 */

/* ----------------------------------------------------------------- tokens */

const theme = [
  ["Primary-1", "#0f766e", "#fff"],
  ["Primary-2", "#b45309", "#fff"],
  ["Secondary-1", "#115e59", "#fff"],
  ["Secondary-2", "#475569", "#fff"],
  ["Primary-Text", "#1b2233", "#fff"],
  ["Secondary-Text", "#4a5468", "#fff"],
  ["Primary-Background", "#f4f5f8", "#1b2233"],
  ["Secondary-Background", "#ffffff", "#1b2233"],
  ["Tertiary-Background", "#e8f3f1", "#1b2233"],
  ["Primary-Grey", "#e4e7ed", "#1b2233"],
  ["Secondary-Grey", "#9aa1ae", "#fff"],
] as const;

const feedback = [
  ["Error-Primary", "#c23b3b", "#fff"],
  ["Warning-Primary", "#a35a00", "#fff"],
  ["Success-Primary", "#1e7d4f", "#fff"],
  ["Info-Primary", "#0f6f86", "#fff"],
  ["Error-Background", "#fcebeb", "#1b2233"],
  ["Warning-Background", "#fff3e3", "#1b2233"],
  ["Success-Background", "#e6f4ec", "#1b2233"],
  ["Info-Background", "#e7f5f8", "#1b2233"],
] as const;

const ramps = [
  ["Primary-1", "#0f766e"],
  ["Primary-2", "#b45309"],
  ["Secondary-1", "#115e59"],
  ["Primary-Text", "#1b2233"],
] as const;

export function DsTokens() {
  return (
    <div className={`${s.screen} ${s.doc}`}>
      <div className={s.docHead}>
        <h1>Colours</h1>
        <span>Design system · Version 2.0</span>
      </div>
      <section className={s.docSection}>
        <h2>Theme colours</h2>
        <p>The palette follows the selected theme. Change the theme and primary, secondary, text and background colours all update to the new brand.</p>
        <div className={s.swatches}>
          {theme.map(([n, bg, fg]) => (
            <span key={n} className={s.swatch} style={{ background: bg, color: fg }}>
              {n}
            </span>
          ))}
        </div>
      </section>
      <section className={s.docSection}>
        <h2>Feedback colours</h2>
        <p>Status colours stay the same across every theme, so error, warning, success and info always mean the same thing.</p>
        <div className={s.swatches} style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
          {feedback.map(([n, bg, fg]) => (
            <span key={n} className={s.swatch} style={{ background: bg, color: fg }}>
              {n}
            </span>
          ))}
        </div>
      </section>
      <section className={s.docSection}>
        <h2>Tints</h2>
        <p>Each theme colour comes with an opacity ramp. Lighter tints express hierarchy without adding new colours.</p>
        <div style={{ display: "grid", gap: 10 }}>
          {ramps.map(([n, c]) => (
            <div key={n} className={s.ramp}>
              {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10].map((p) => (
                <span key={p} style={{ background: `color-mix(in srgb, ${c} ${p}%, white)`, color: p >= 60 ? "#fff" : "#1b2233" }}>
                  {p === 100 ? n : `${n}-${p}`}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------- buttons */

const B = ({ children, cls = "" }: { children: React.ReactNode; cls?: string }) => <span className={`${s.btn} ${cls}`}>{children}</span>;

const Split = ({ cls = "" }: { cls?: string }) => (
  <span style={{ display: "inline-flex", gap: 1 }}>
    <span className={`${s.btn} ${cls}`} style={{ borderRadius: "6px 0 0 6px" }}>
      Button
    </span>
    <span className={`${s.btn} ${cls}`} style={{ borderRadius: "0 6px 6px 0", padding: "0 10px" }}>
      <I n="chevronDown" />
    </span>
  </span>
);

export function DsButtons() {
  const states = [
    ["", "Default"],
    [s.btnHover, "Hovered"],
    [s.btnFocus, "Focused"],
    [s.btnOff, "Disabled"],
  ] as const;
  return (
    <div className={`${s.screen} ${s.doc}`}>
      <div className={s.docHead}>
        <h1>Buttons</h1>
        <span>Design system · Version 2.0</span>
      </div>
      <section className={s.docSection}>
        <h2>Variations</h2>
        <p>Four types: icon only, basic, with icon, and split.</p>
        <div className={s.stage}>
          <B cls={s.btnSm}>
            <I n="download" />
          </B>
          <B>Button</B>
          <B>
            <I n="download" /> Button
          </B>
          <Split />
        </div>
      </section>
      <section className={s.docSection}>
        <h2>Emphasis</h2>
        <p>Every type comes in three levels of emphasis: primary, secondary and link.</p>
        <div className={s.stage} style={{ display: "grid", gridTemplateColumns: "repeat(3, max-content)", gap: 12 }}>
          <B>Button</B>
          <B cls={s.btnGhost}>Button</B>
          <span className={s.link}>Link</span>
          <B>
            <I n="download" /> Button
          </B>
          <B cls={s.btnGhost}>
            <I n="download" /> Button
          </B>
          <span className={s.link}>
            <I n="download" /> Link
          </span>
        </div>
      </section>
      <section className={s.docSection}>
        <h2>Sizes</h2>
        <p>Large and small.</p>
        <div className={s.stage}>
          <B cls={s.btnLg}>Button</B>
          <B>Button</B>
          <B cls={s.btnSm}>Button</B>
          <B cls={`${s.btnGhost} ${s.btnSm}`}>Button</B>
        </div>
      </section>
      <section className={s.docSection}>
        <h2>States</h2>
        <p>Each type and emphasis has the same states: enabled, hover, focus and disabled.</p>
        <div className={s.stateGrid}>
          {states.map(([, l]) => (
            <span key={l} className={s.sub}>
              {l}
            </span>
          ))}
          {states.map(([c, l]) => (
            <B key={"p" + l} cls={c}>
              Button
            </B>
          ))}
          {states.map(([c, l]) => (
            <B key={"g" + l} cls={`${s.btnGhost} ${c}`}>
              Button
            </B>
          ))}
          {states.map(([c, l]) => (
            <B key={"i" + l} cls={c}>
              <I n="download" /> Button
            </B>
          ))}
          {states.map(([c, l]) => (
            <Split key={"s" + l} cls={c} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------- product card */

function ProductCard({ selected, current }: { selected?: boolean; current?: boolean }) {
  return (
    <div className={s.pcard} data-on={selected || undefined}>
      <div className={s.pcardMain}>
        <span style={{ display: "grid", justifyItems: "center", gap: 6 }}>
          <CovIcon n="heart" />
          <Cb>Compare</Cb>
        </span>
        <span>
          <h4>WellGuard Health Shield</h4>
          <span className={s.sub}>A comprehensive health plan with a broad provider network.</span>
        </span>
        <div className={s.pcardMeta}>
          <span className={s.sub}>Networks</span>
          <span className={s.sub}>In-network</span>
          <span className={s.sub}>Out-of-network</span>
          <span>
            Open Access Plus,
            <br />
            Choice Fund <span className={s.link}>+3 networks</span>
          </span>
          <span>
            Deductible $1,000
            <br />
            Out-of-pocket $800
          </span>
          <span>
            Deductible $1,000
            <br />
            Out-of-pocket $800
          </span>
        </div>
      </div>
      <div className={s.pcardSide}>
        {current && <span className={s.chip}>Current plan</span>}
        <b>$156.00</b>
        <span className={s.sub}>
          Monthly premium
          <br />
          (+$56.00 monthly)
        </span>
        {selected ? (
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className={s.chip}>Selected</span>
            <span className={`${s.chip} ${s.chipBad}`}>
              <I n="x" />
            </span>
          </span>
        ) : (
          <Btn sm>Select</Btn>
        )}
        <span className={s.link}>View details</span>
      </div>
      {selected && (
        <div className={s.pcardEnroll}>
          <b>Enroll dependents</b>
          <span className={s.sub}>(1 dependent)</span>
          <span className={s.pill} data-on>
            Jane <i>−</i>
          </span>
          <span className={s.pill}>
            Harry <i>+</i>
          </span>
          <span className={s.pill}>
            Carrie <i>+</i>
          </span>
        </div>
      )}
    </div>
  );
}

export function DsProductCard() {
  return (
    <div className={`${s.screen} ${s.doc}`}>
      <div className={s.docHead}>
        <h1>Product card</h1>
        <span>Design system · Version 2.0</span>
      </div>
      <section className={s.docSection}>
        <h2>Product card</h2>
        <p>The card every plan uses in the enrollment flow: plan, networks, deductibles, out-of-pocket limits and premium.</p>
      </section>
      <section className={s.docSection}>
        <h2>States</h2>
        <p>Four styled states: default, selected, current, and current and selected.</p>
        <div className={s.stage} style={{ display: "grid", gap: 10 }}>
          <p className={s.stateLabel}>Default</p>
          <ProductCard />
          <p className={s.stateLabel}>Selected</p>
          <ProductCard selected />
          <p className={s.stateLabel}>Current plan</p>
          <ProductCard current />
          <p className={s.stateLabel}>Current plan and selected</p>
          <ProductCard current selected />
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------ page pattern */

const Donut = ({ pct, label, value }: { pct: number; label: string; value: string }) => (
  <span>
    <span className={s.donut} style={{ background: `radial-gradient(closest-side, var(--m-canvas) 74%, transparent 75%), conic-gradient(var(--m-brand) ${pct}%, #d9dde5 0)` }}>
      {pct}%
    </span>
    {label}
    <b>{value}</b>
  </span>
);

export function DsDashboard({ style, banner }: { style?: React.CSSProperties; banner?: boolean } = {}) {
  const { member, spouse, kids } = family;
  return (
    <div className={s.screen} style={style}>
      <nav className={s.rail}>
        {(["home", "card", "shield", "doc", "dollar", "people"] as const).map((n, i) => (
          <I key={n} n={n} className={i === 0 ? s.railOn : undefined} />
        ))}
      </nav>
      <div style={{ display: "grid", gap: 16, padding: "24px 28px 28px", alignContent: "start" }}>
        <div>
          <p className={s.greet}>
            Good morning, <b>{member.split(" ")[0]}</b>
          </p>
          <p className={s.sub} style={{ margin: "4px 0 0" }}>
            Member ID 14234234 · <span className={s.link}>View profile</span>
          </p>
        </div>
        {banner && (
          <div className={s.welcome} style={{ background: "linear-gradient(90deg, var(--m-brand-ink), var(--m-rail))" }}>
            <span>
              <b>Welcome to your benefits portal</b>
              <span>Explore your plans, track claims and find resources.</span>
            </span>
            <span>Get started</span>
          </div>
        )}

        <section className={s.card}>
          <div className={s.cardHead} style={{ borderBottom: 0, paddingBottom: 4 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>Coverage status</h2>
          </div>
          <div className={s.memberTabs} style={{ margin: "0 14px" }}>
            {["Family (5)", `${member.split(" ")[0]} (Member)`, `${spouse.split(" ")[0]} (Spouse)`, `${kids[0]!.split(" ")[0]} (Dependent)`, `${kids[1]!.split(" ")[0]} (Dependent)`].map((t, i) => (
              <span key={t} data-on={i === 1 || undefined}>
                {t}
              </span>
            ))}
          </div>
          <div className={s.covStatus}>
            <div className={s.covTile}>
              <div className={s.covTileTop}>
                <Donut pct={63} label="Remaining deductible" value="$750.00" />
                <Donut pct={12} label="Remaining out-of-pocket" value="$4,350.00" />
              </div>
              <div className={s.covTileFoot}>
                <h4>Medical</h4>
                <span className={s.sub}>Plan: Silver PPO</span>
                <span className={s.link}>View coverage details</span>
              </div>
            </div>
            <div className={s.covTile}>
              <div className={s.covTileTop}>
                <span>
                  This plan has
                  <b>No deductible</b>
                </span>
                <span>
                  This plan has
                  <b>Unlimited out-of-pocket</b>
                </span>
              </div>
              <div className={s.covTileFoot}>
                <h4>Dental</h4>
                <span className={s.sub}>Plan: Family Dental Plus</span>
                <span className={s.link}>View coverage details</span>
              </div>
            </div>
            <div className={s.covTile}>
              <div className={s.covTileTop}>
                <span>
                  You don&apos;t have vision coverage.
                  <br />
                  <span className={s.link}>Find coverage options</span>
                </span>
              </div>
              <div className={s.covTileFoot}>
                <h4>Vision</h4>
                <span className={s.sub}>Not enrolled</span>
              </div>
            </div>
          </div>
        </section>

        <div className={s.dashRow}>
          <section className={s.card}>
            <div className={s.cardHead} style={{ borderBottom: 0 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Claims status</h2>
            </div>
            <div className={s.claims} style={{ padding: "0 16px 16px" }}>
              <span className={s.claim}>
                <b>12</b>Last claim
              </span>
              <span className={s.claim}>
                <b>8</b>Processing
              </span>
              <span className={s.claim}>
                <b>4</b>Paid, last 6 months
              </span>
              <span className={`${s.claim} ${s.claimMuted}`}>
                <b>0</b>Need attention
              </span>
            </div>
          </section>
          <section className={s.card}>
            <div className={s.cardHead} style={{ borderBottom: 0 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Resources</h2>
              <span className={s.link}>View all</span>
            </div>
            <div className={s.resList} style={{ padding: "0 16px 12px" }}>
              {["Summary of benefits", "Prescription drug formulary", "Dental plan guide", "Vision plan guide"].map((r, i) => (
                <span key={r}>
                  <span>
                    {r}
                    <small>Effective 01/01/2026</small>
                  </span>
                  <I n={i % 2 ? "external" : "arrowRight"} />
                </span>
              ))}
            </div>
          </section>
          <section className={s.card}>
            <div className={s.cardHead} style={{ borderBottom: 0 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Find care</h2>
              <span className={s.link}>View all</span>
            </div>
            <div style={{ display: "grid", gap: 10, padding: "0 16px 14px" }}>
              <Btn ghost>Find a provider</Btn>
              <div className={s.resList}>
                {["Provider directory", "Pharmacy directory", "Facility directory"].map((r) => (
                  <span key={r}>
                    {r}
                    <I n="arrowRight" />
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

