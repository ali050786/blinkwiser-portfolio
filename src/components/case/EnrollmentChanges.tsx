"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/motion";
import s from "@/components/screens/Mock.module.css";
import { Btn, CovIcon, I, Ok, Person, Scaled, family } from "@/components/screens/kit";
import { NewCoverage, NewHousehold, NewPlan, NewReview } from "@/components/screens/enrollment";
import m from "./EnrollmentChanges.module.css";

/*
 * What changed, component by component. Each chapter shows only the
 * component: the old one, then the new one it became, and why. The last
 * chapter plays the new flow end to end. Rebuilt from the design files in a
 * demo brand; names and prices are invented.
 */

const { member, spouse, kids } = family;
const child = kids[0]!;
const adopted = "Timothy Brown";
const BRAND = "#0f766e";
const LINE = "rgba(227, 230, 236, 1)";
const LINE_0 = "rgba(227, 230, 236, 0)";

type ChapterId = "grid" | "hub" | "who" | "cost" | "switch" | "flow";
type Chapter = { id: ChapterId; tab: string; title: string; before?: string; after: string; why: string; ms: number };

const CHAPTERS: Chapter[] = [
  {
    id: "grid",
    tab: "Who's covered",
    title: "Who's covered",
    before: "A list of names. Adding a child didn't enroll them; that happened later, inside each plan.",
    after: "One grid: each person against each coverage, ticked once.",
    why: "Users were confused about who was covered. Making it one visible choice per person removes the second question later.",
    ms: 7000,
  },
  {
    id: "hub",
    tab: "Coverage hub",
    title: "The coverage hub",
    before: "A hub with a card per coverage. Members went in and out of it for Medical, Dental, and Vision.",
    after: "No hub. The grid already says who needs what, so the flow goes straight to choosing plans.",
    why: "The hub mirrored how the backend stores enrollments, one coverage at a time. Members don't decide that way.",
    ms: 6600,
  },
  {
    id: "who",
    tab: "Who a plan covers",
    title: "Who a plan covers",
    before: "Inside every plan: a coverage-tier dropdown and a list to add or remove each person again.",
    after: "One line, filled in from the grid, with Update if it needs changing.",
    why: "Asking again could contradict the household answer. Showing it instead of asking keeps one source of truth.",
    ms: 6800,
  },
  {
    id: "cost",
    tab: "Seeing the cost",
    title: "Seeing the cost",
    before: "Annual premiums, marked as an estimate that could still change, and no total anywhere.",
    after: "Monthly prices on every plan, and a running total that updates as plans are picked.",
    why: "People budget by the month. Seeing the total while choosing means no surprise at the end.",
    ms: 7200,
  },
  {
    id: "switch",
    tab: "Switching plans",
    title: "Switching plans",
    before: "Change plan, and the family list reset. Everyone had to be added again.",
    after: "Pick another plan in place. The family stays covered.",
    why: "The family belongs to the member, not to the plan, so changing a plan shouldn't touch it.",
    ms: 7200,
  },
  {
    id: "flow",
    tab: "The new flow",
    title: "The new flow, put together",
    after: "Who's covered once, then a plan per coverage with a running monthly total, then one review.",
    why: "Who's covered is asked once, plans follow from it, and the cost is visible while choosing.",
    ms: 9600,
  },
];

const BEFORE_MS = 2600;
const SETTLE_MS = 1600;

/** 0: the old component. 1: the new one arriving. 2: the new one, settled. */
type Beat = 0 | 1 | 2;

const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ------------------------------------------------------------------ parts */

function useCount(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(0);
  useEffect(() => {
    const c = animate(from.current, target, { duration: 0.7, ease: "easeOut", onUpdate: setV });
    from.current = target;
    return () => c.stop();
  }, [target]);
  return v;
}

function Total({ value }: { value: number }) {
  const v = useCount(value);
  return (
    <div className={`${s.premium} ${m.total}`}>
      <i>$</i>
      <span>
        Total premium
        <b className="tabular">
          {usd(v)} <small className={s.muted}>per month</small>
        </b>
      </span>
    </div>
  );
}

function Box({ on, delay = 0, children }: { on: boolean; delay?: number; children: React.ReactNode }) {
  return (
    <span className={m.cb}>
      <motion.span
        className={m.box}
        initial={false}
        animate={{ backgroundColor: on ? BRAND : "#ffffff", borderColor: on ? BRAND : "#9aa1ae" }}
        transition={{ duration: 0.2, delay }}
      >
        <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <motion.path d="M2.5 6.2 5 8.5l4.5-5" initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 0.25, delay: delay + 0.05 }} />
        </svg>
      </motion.span>
      {children}
    </span>
  );
}

/** Crossfades the old component into the new one. */
function Morph({ beat, before, after }: { beat: Beat; before: React.ReactNode; after: React.ReactNode }) {
  return (
    <div className={m.layer}>
    <AnimatePresence initial={false}>
      <motion.div
        key={beat > 0 ? "after" : "before"}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {beat > 0 ? after : before}
      </motion.div>
    </AnimatePresence>
    </div>
  );
}

const covered: [string, string][] = [
  [member, "Member"],
  [spouse, "Spouse"],
  [child, "Child"],
  [kids[1]!, "Child"],
  [adopted, "Adopted child"],
];

const medPlans: [string, number][] = [
  ["Waive / opt out", 0],
  ["TotalCare Select", 80],
  ["PrimeMed Plus", 80],
  ["Elite Health Premier", 102.9],
];

function Picks({ plans, on, cursorTo, beat }: { plans: [string, number][]; on: number; cursorTo?: number; beat?: Beat }) {
  return (
    <div className={s.pickGrid}>
      {plans.map(([n, p], i) => (
        <div key={n} className={`${s.pick} ${m.pick}`}>
          <div className={s.pickCard} data-on={i === on || undefined}>
            <div className={`${s.pickTop} ${m.pickTop}`}>
              <h4>{n}</h4>
              <div className={s.pickPrice}>
                <span>
                  <b>{usd(p)}</b>
                  <span className={s.sub}>per month</span>
                </span>
                <span className={s.radio} data-on={i === on || undefined} />
              </div>
            </div>
          </div>
          {cursorTo === i && beat !== undefined && <Cursor beat={beat} />}
        </div>
      ))}
    </div>
  );
}

function Cursor({ beat }: { beat: Beat }) {
  const clicked = beat === 2;
  return (
    <motion.div
      className={m.cursor}
      initial={{ x: -260, y: 120, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.3, ease: [0.3, 0.7, 0.3, 1] }}
      aria-hidden="true"
    >
      {clicked && <motion.span className={m.ripple} initial={{ scale: 0.3, opacity: 0.9 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 0.6 }} />}
      <motion.svg viewBox="0 0 24 24" animate={{ scale: clicked ? [1, 0.82, 1] : 1 }} transition={{ duration: 0.25 }}>
        <path d="M4 3l15 8.5-6.6 1.6L9.7 20z" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </motion.svg>
    </motion.div>
  );
}

const CoverageLine = ({ kept, stagger }: { kept?: boolean; stagger?: boolean }) => (
  <div className={`${s.coverageBar} ${m.bar1}`}>
    <h3 className={m.barHead}>
      Coverage includes: Family
      <AnimatePresence>
        {kept && (
          <motion.span key="kept" className={s.chip} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <I n="check" /> Family kept
          </motion.span>
        )}
      </AnimatePresence>
    </h3>
    <p className={m.names}>
      {covered.map(([n, r], i) => (
        <motion.span key={n} initial={stagger ? { opacity: 0, y: 6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }}>
          <b>{n}</b> ({r}){i < covered.length - 1 ? " · " : " "}
        </motion.span>
      ))}
      <span className={s.link}>Update</span>
    </p>
  </div>
);

/* --------------------------------------------------------- the components */

const household = [
  { n: member, role: "Member", covs: [1, 1, 0, 0] },
  { n: spouse, role: "Spouse", covs: [1, 1, 0, 0] },
  { n: child, role: "Child", covs: [1, 1, 1, 0] },
  { n: adopted, role: "Adopted child", covs: [1, 1, 0, 0], isNew: true },
];

function GridComp({ beat }: { beat: Beat }) {
  const after = beat > 0;
  return (
    <div className={m.panel}>
      <motion.div
        className={m.list}
        initial={false}
        animate={after ? { rowGap: 10, paddingTop: 14, paddingBottom: 14 } : { rowGap: 0, paddingTop: 4, paddingBottom: 8 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {household.map((p, i) => (
          <motion.div
            key={p.n}
            className={m.row}
            initial={false}
            animate={{
              borderTopColor: after ? LINE : LINE_0,
              borderLeftColor: after ? LINE : LINE_0,
              borderRightColor: after ? LINE : LINE_0,
              borderRadius: after ? 8 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className={m.rowTop}
              initial={false}
              animate={after ? { paddingTop: 9, paddingBottom: 9, paddingLeft: 14, paddingRight: 14 } : { paddingTop: 11, paddingBottom: 11, paddingLeft: 2, paddingRight: 2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Person name={p.n} role={p.role} />
              <span className={m.rowEnd}>
                {p.isNew && <span className={s.chip}>Newly added</span>}
                <I n={after ? "kebab" : "chevronDown"} />
              </span>
            </motion.div>
            <AnimatePresence initial={false}>
              {after && (
                <motion.div
                  key="covs"
                  className={m.covs}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className={m.covsIn}>
                    {["Medical", "Dental", "Vision", "Supplemental"].map((c, j) => (
                      <Box key={c} on={!!p.covs[j]} delay={0.45 + i * 0.12 + j * 0.07}>
                        {c}
                      </Box>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence initial={false}>
        {!after && (
          <motion.div key="warn" className={m.warn} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
            <div className={s.banner}>
              <b>
                <I n="x" /> Adding a dependent does not automatically enroll them in coverage.
              </b>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const hubs: { icon: "heart" | "tooth" | "eye"; name: string; plan: string; premium: string; deps?: string }[] = [
  { icon: "heart", name: "Medical", plan: "TotalCare Select", premium: "$960.00", deps: "4 dependents added" },
  { icon: "tooth", name: "Dental", plan: "Clove Dental Preventive", premium: "$960.00", deps: "3 dependents added" },
  { icon: "eye", name: "Vision", plan: "Vision coverage is waived.", premium: "$0.00" },
];

function HubComp({ beat }: { beat: Beat }) {
  return (
    <Morph
      beat={beat}
      before={
        <div className={m.stack}>
          {hubs.map((h) => (
            <div key={h.name} className={`${s.hubCard} ${m.hub}`}>
              <div className={s.hubTop}>
                <Ok />
                <CovIcon n={h.icon} />
                <h4>{h.name}</h4>
                <span className={s.money}>
                  Premium
                  <b>{h.premium}</b>
                  Annual
                </span>
              </div>
              <div className={s.hubLine}>
                <span className={h.deps ? undefined : s.muted}>{h.plan}</span>
                {h.deps && <span className={s.chip}>{h.deps}</span>}
                <Btn ghost sm>
                  <I n="edit" /> Update
                </Btn>
              </div>
            </div>
          ))}
        </div>
      }
      after={
        <div className={m.stack}>
          <div className={m.steps}>
            {["Who's covered", "Medical plan", "Dental plan", "Vision plan", "Review"].map((t, i) => (
              <motion.span key={t} data-on={i === 1 || undefined} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }}>
                {t}
              </motion.span>
            ))}
          </div>
          <div className={m.panel}>
            <div className={m.panelHead}>
              <I n="arrowLeft" />
              <h2>
                Select a plan for <b>Medical</b>
              </h2>
            </div>
            <div className={m.panelBody}>
              <Picks plans={medPlans} on={1} />
            </div>
          </div>
        </div>
      }
    />
  );
}

function WhoComp({ beat }: { beat: Beat }) {
  return (
    <Morph
      beat={beat}
      before={
        <div className={m.panel}>
          <div className={m.panelBody}>
            <div className={m.selects}>
              <label className={s.select}>
                Coverage includes
                <span>
                  Employee only <I n="chevronDown" />
                </span>
              </label>
              <label className={s.select}>
                Network
                <span>
                  PPO Network <I n="chevronDown" />
                </span>
              </label>
            </div>
            <p className={s.stateLabel}>Select member(s) and dependent(s) to cover</p>
            <div className={s.card}>
              {covered.map(([n, r], i) => {
                const on = i < 4;
                return (
                  <div key={n} className={s.listRow}>
                    <span className={m.whoName}>
                      <Person name={n} />
                      <span className={s.muted}>{r}</span>
                    </span>
                    <span className={s.pill} data-on={on || undefined}>
                      {on ? "Remove" : "Add"}
                      <i style={{ background: on ? "var(--m-bad)" : undefined }}>{on ? "−" : "+"}</i>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
      after={
        <div className={m.panel}>
          <div className={m.panelHead}>
            <I n="arrowLeft" />
            <h2>
              Select a plan for <b>Medical</b>
            </h2>
          </div>
          <CoverageLine stagger />
          <motion.div className={m.panelBody} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.9 }}>
            <Picks plans={medPlans} on={1} />
          </motion.div>
        </div>
      }
    />
  );
}

function CostComp({ beat }: { beat: Beat }) {
  return (
    <Morph
      beat={beat}
      before={
        <div className={m.panel}>
          <div className={m.panelHead}>
            <h2>Medical plan</h2>
          </div>
          <div className={m.panelBody}>
            <p className={m.estimate}>The displayed Premium is only an estimate. The amount may vary if you change network or update Dependents.</p>
            {(
              [
                ["TotalCare Select", 960],
                ["PrimeMed Plus", 960],
              ] as [string, number][]
            ).map(([n, p]) => (
              <div key={n} className={m.plan}>
                <h4>
                  <CovIcon n="heart" sm />
                  {n}
                </h4>
                <div className={m.planEnd}>
                  <span className={m.price}>
                    Premium
                    <b>{usd(p)}</b>
                    Annual estimate
                  </span>
                  <Btn ghost sm>
                    Select
                  </Btn>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      after={
        <div className={m.stack}>
          <div className={m.totalRow}>
            <span className={m.totalHint}>{beat === 2 ? "Medical + Dental" : "Medical"}</span>
            <Total value={beat === 2 ? 160 : 80} />
          </div>
          <div className={m.panel}>
            <div className={m.panelHead}>
              <h2>
                Select a plan for <b>{beat === 2 ? "Dental" : "Medical"}</b>
              </h2>
            </div>
            <div className={m.panelBody}>
              <Picks
                plans={
                  beat === 2
                    ? [
                        ["Waive / opt out", 0],
                        ["Clove Preventive", 80],
                        ["Clove Standard", 80],
                        ["Clove Gold", 102.9],
                      ]
                    : medPlans
                }
                on={1}
              />
            </div>
          </div>
        </div>
      }
    />
  );
}

function SwitchComp({ beat }: { beat: Beat }) {
  return (
    <Morph
      beat={beat}
      before={
        <div className={m.panel}>
          <div className={m.panelHead}>
            <h2>Medical plan</h2>
            <span className={m.changed}>Changed to Elite Health Premier</span>
          </div>
          <div className={m.panelBody}>
            <p className={s.stateLabel}>Select member(s) and dependent(s) to cover</p>
            <div className={s.card}>
              {covered.map(([n, r]) => (
                <div key={n} className={s.listRow}>
                  <span className={m.whoName}>
                    <Person name={n} />
                    <span className={s.muted}>{r}</span>
                  </span>
                  <span className={`${s.pill} ${m.reset}`}>
                    Add<i>+</i>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      after={
        <div className={m.panel}>
          <CoverageLine kept={beat === 2} />
          <div className={m.panelBody}>
            <Picks plans={medPlans} on={beat === 2 ? 3 : 1} cursorTo={3} beat={beat} />
          </div>
        </div>
      }
    />
  );
}

/* --------------------------------------------------------- the new flow */

const FLOW = [
  { label: "Who's covered", C: NewHousehold },
  { label: "A plan per coverage", C: NewPlan },
  { label: "Coverage summary", C: NewCoverage },
  { label: "Review", C: NewReview },
];

function FlowComp({ step }: { step: number }) {
  const S = FLOW[step]!.C;
  return (
    <div className={`${m.flow} ${m.layer}`}>
      <AnimatePresence initial={false}>
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
          <Scaled width={1040} maxScale={2}>
            <div className={m.flowScreen}>
              <S />
            </div>
          </Scaled>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const VIEW: Record<Exclude<ChapterId, "flow">, (p: { beat: Beat }) => React.ReactElement> = {
  grid: GridComp,
  hub: HubComp,
  who: WhoComp,
  cost: CostComp,
  switch: SwitchComp,
};

/* ------------------------------------------------------------------ player */

export function EnrollmentChanges() {
  const reduce = useReducedMotionSafe();
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  // Server render, reduced motion and pause all show the settled new state.
  const [beat, setBeat] = useState<Beat>(2);
  const [flowStep, setFlowStep] = useState(0);
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  const playing = visible && !paused && !reduce;
  const ch = CHAPTERS[idx]!;
  const isFlow = ch.id === "flow";

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timers: number[] = [];
    if (isFlow) {
      setBeat(2);
      setFlowStep(0);
      const per = ch.ms / FLOW.length;
      FLOW.forEach((_, i) => i > 0 && timers.push(window.setTimeout(() => setFlowStep(i), per * i)));
    } else {
      setBeat(0);
      timers.push(window.setTimeout(() => setBeat(1), BEFORE_MS));
      timers.push(window.setTimeout(() => setBeat(2), BEFORE_MS + SETTLE_MS));
    }
    timers.push(
      window.setTimeout(() => {
        setBeat(0);
        setIdx((i) => (i + 1) % CHAPTERS.length);
      }, ch.ms),
    );
    return () => timers.forEach(clearTimeout);
  }, [playing, idx, run, isFlow, ch.ms]);

  const go = (i: number) => {
    if (playing) setBeat(0);
    setIdx(i);
    setRun((r) => r + 1);
    if (!playing) {
      setBeat(2);
      setFlowStep(0);
    }
  };

  const after = beat > 0;
  const View = isFlow ? null : VIEW[ch.id as Exclude<ChapterId, "flow">];

  return (
    <figure ref={root} className={`container ${m.wrap}`} data-reveal aria-label="What changed in the enrollment flow">
      <div className={m.chapter}>
        <div className={m.text} aria-live="polite">
          <span className={m.kicker}>
            {String(idx + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
          </span>
          <div className={m.layer}>
          <AnimatePresence initial={false}>
            <motion.div key={`${ch.id}-${run}`} className={m.textIn} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <h3 className={m.title}>{ch.title}</h3>
              {ch.before && (
                <motion.p className={m.state} initial={false} animate={{ opacity: after ? 0.55 : 1 }} transition={{ duration: 0.3 }}>
                  <span className={m.tag}>Before</span>
                  {ch.before}
                </motion.p>
              )}
              <motion.p className={m.state} initial={false} animate={{ opacity: after || isFlow ? 1 : 0.25 }} transition={{ duration: 0.3 }}>
                <span className={m.tag} data-after>
                  {isFlow ? "Now" : "After"}
                </span>
                {ch.after}
              </motion.p>
              <motion.p className={m.why} initial={false} animate={{ opacity: beat === 2 || isFlow ? 1 : 0, y: beat === 2 || isFlow ? 0 : 6 }} transition={{ duration: 0.35 }}>
                <b>Why.</b> {ch.why}
              </motion.p>
              {isFlow && (
                <ol className={m.flowSteps}>
                  {FLOW.map((f, i) => (
                    <li key={f.label} data-on={i === flowStep || undefined}>
                      {f.label}
                    </li>
                  ))}
                </ol>
              )}
            </motion.div>
          </AnimatePresence>
          </div>
        </div>

        <div className={m.stage} aria-hidden="true">
          {!isFlow && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={after ? "after" : "before"}
                className={m.phase}
                data-after={after || undefined}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {after ? "After" : "Before"}
              </motion.span>
            </AnimatePresence>
          )}
          <div className={`${s.screen} ${m.stageBox}`} style={{ display: "block", background: "transparent" }}>
            <AnimatePresence initial={false}>
              <motion.div key={`${ch.id}-${run}`} className={m.fillBox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                {View ? (
                  <Scaled width={600} maxScale={2}>
                    <div className={m.compStage}>
                      <View beat={beat} />
                    </div>
                  </Scaled>
                ) : (
                  <FlowComp step={flowStep} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className={m.bar}>
        {reduce ? (
          <span className={m.toggle} role="group" aria-label="Show">
            <button type="button" aria-pressed={!after} onClick={() => setBeat(0)}>
              Before
            </button>
            <button type="button" aria-pressed={after} onClick={() => setBeat(2)}>
              After
            </button>
          </span>
        ) : (
          <button type="button" className={m.play} onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play" : "Pause"}>
            {paused ? (
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3.5h2v9H5zm4 0h2v9H9z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
        <ol className={m.dots}>
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <button type="button" className={m.dot} aria-current={i === idx} data-done={i < idx || undefined} onClick={() => go(i)}>
                <span className={m.track}>
                  <span key={`${idx}-${run}`} className={m.fill} style={i === idx && playing ? { animationDuration: `${c.ms}ms` } : undefined} data-static={i === idx && !playing ? true : undefined} />
                </span>
                <span className={m.label}>{c.tab}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className={m.foot}>
        <span className="t-label c-tertiary">Rebuilt from the design files in a demo brand. Names and prices are invented.</span>
      </figcaption>
    </figure>
  );
}
