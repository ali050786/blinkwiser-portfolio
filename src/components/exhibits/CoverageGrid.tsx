"use client";

import { useEffect, useMemo, useState } from "react";
import { animate } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit, Segmented } from "./Exhibit";
import styles from "./CoverageGrid.module.css";

export type Role = "you" | "partner" | "child";
export const members: { id: string; name: string; role: Role; label: string }[] = [
  { id: "you", name: "You", role: "you", label: "Employee" },
  { id: "sam", name: "Sam", role: "partner", label: "Partner" },
  { id: "maya", name: "Maya", role: "child", label: "Child" },
  { id: "leo", name: "Leo", role: "child", label: "Child" },
];

export type CovId = "medical" | "dental" | "vision";
export const coverages: { id: CovId; name: string; plans: { id: string; name: string; current?: boolean; price: Record<Role, number> }[] }[] = [
  {
    id: "medical",
    name: "Medical",
    plans: [
      { id: "silver", name: "Silver PPO", current: true, price: { you: 142, partner: 128, child: 64 } },
      { id: "gold", name: "Gold PPO", price: { you: 191, partner: 172, child: 86 } },
    ],
  },
  {
    id: "dental",
    name: "Dental",
    plans: [
      { id: "plus", name: "Plus", current: true, price: { you: 27, partner: 24, child: 13 } },
      { id: "basic", name: "Basic", price: { you: 18, partner: 16, child: 9 } },
    ],
  },
  { id: "vision", name: "Vision", plans: [{ id: "standard", name: "Standard", current: true, price: { you: 6, partner: 5, child: 3 } }] },
];

type Unit = "month" | "paycheck";
type Mode = "family" | "member";

export const initialGrid = () =>
  Object.fromEntries(members.map((m) => [m.id, { medical: true, dental: true, vision: m.role !== "partner" }])) as Record<string, Record<CovId, boolean>>;

export function CoverageGrid() {
  const [grid, setGrid] = useState(initialGrid);
  const [familyPlan, setFamilyPlan] = useState<Record<CovId, string>>({ medical: "silver", dental: "plus", vision: "standard" });
  const [memberPlan, setMemberPlan] = useState<Record<string, string>>({});
  const [waived, setWaived] = useState<Record<CovId, boolean>>({ medical: false, dental: false, vision: false });
  const [mode, setMode] = useState<Mode>("family");
  const [unit, setUnit] = useState<Unit>("month");

  const planFor = (memberId: string, cov: CovId) => (mode === "member" && memberPlan[`${memberId}:${cov}`]) || familyPlan[cov];

  const perCoverage = useMemo(
    () =>
      coverages.map((c) => {
        if (waived[c.id]) return { id: c.id, total: 0 };
        const total = members.reduce((sum, m) => {
          if (!grid[m.id]![c.id]) return sum;
          const plan = c.plans.find((p) => p.id === planFor(m.id, c.id))!;
          return sum + plan.price[m.role];
        }, 0);
        return { id: c.id, total };
      }),
    [grid, familyPlan, memberPlan, waived, mode],
  );

  const monthly = perCoverage.reduce((s, c) => s + c.total, 0);
  const factor = unit === "month" ? 1 : 12 / 26;
  const display = useAnimatedNumber(monthly * factor);
  const fmt = (n: number) => `$${n.toFixed(unit === "month" ? 0 : 2)}`;

  const reset = () => {
    setGrid(initialGrid());
    setFamilyPlan({ medical: "silver", dental: "plus", vision: "standard" });
    setMemberPlan({});
    setWaived({ medical: false, dental: false, vision: false });
    setMode("family");
  };

  return (
    <Exhibit
      label="Interactive · family-by-coverage grid"
      title="Ask “who needs what” once"
      caption="Toggle who is covered, change or waive a plan, or switch to per-member plans. The total follows every change."
      note="Demo household and illustrative prices. Not a client product."
      controls={
        <Segmented<Unit>
          label="Show cost"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "month", label: "Per month" },
            { value: "paycheck", label: "Per paycheck" },
          ]}
        />
      }
    >
      <div className={styles.layout}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="sr-only">Coverage by family member</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="t-label c-tertiary">Family</span>
                </th>
                {coverages.map((c) => (
                  <th key={c.id} scope="col">
                    <span className={styles.covName}>{c.name}</span>
                    {mode === "family" || c.plans.length === 1 ? (
                      <select
                        className={styles.select}
                        aria-label={`${c.name} plan`}
                        value={waived[c.id] ? "waive" : familyPlan[c.id]}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === "waive") setWaived((w) => ({ ...w, [c.id]: true }));
                          else {
                            setWaived((w) => ({ ...w, [c.id]: false }));
                            setFamilyPlan((f) => ({ ...f, [c.id]: v }));
                          }
                        }}
                      >
                        {c.plans.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                        <option value="waive">Waive</option>
                      </select>
                    ) : (
                      <span className="t-body-s c-tertiary">Per member</span>
                    )}
                    <span className={styles.planState} data-kind={waived[c.id] ? "waived" : c.plans.find((p) => p.id === familyPlan[c.id])?.current ? "current" : "changed"}>
                      {waived[c.id] ? "Waived" : c.plans.find((p) => p.id === familyPlan[c.id])?.current ? "Current plan" : "Changed"}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <th scope="row">
                    <span className={styles.avatar} aria-hidden="true">
                      {m.name[0]}
                    </span>
                    <span>
                      <span className={styles.memberName}>{m.name}</span>
                      <span className="t-body-s c-tertiary">{m.label}</span>
                    </span>
                  </th>
                  {coverages.map((c) => {
                    const on = grid[m.id]![c.id] && !waived[c.id];
                    return (
                      <td key={c.id} data-on={on || undefined} data-waived={waived[c.id] || undefined}>
                        <label className={styles.cell}>
                          <input
                            type="checkbox"
                            checked={on}
                            disabled={waived[c.id]}
                            onChange={(e) => setGrid((g) => ({ ...g, [m.id]: { ...g[m.id]!, [c.id]: e.target.checked } }))}
                          />
                          <span className={styles.box} aria-hidden="true" />
                          <span className="sr-only">
                            {m.name}, {c.name}
                          </span>
                        </label>
                        {mode === "member" && on && c.plans.length > 1 && (
                          <select
                            className={styles.cellSelect}
                            aria-label={`${m.name} ${c.name} plan`}
                            value={planFor(m.id, c.id)}
                            onChange={(e) => setMemberPlan((mp) => ({ ...mp, [`${m.id}:${c.id}`]: e.target.value }))}
                          >
                            {c.plans.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.tableFoot}>
            <label className={styles.hatch}>
              <input type="checkbox" checked={mode === "member"} onChange={(e) => setMode(e.target.checked ? "member" : "family")} />
              <span>Choose a different plan for each member</span>
            </label>
            <button type="button" className={styles.reset} onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        <aside className={styles.total} aria-live="polite">
          <p className="t-label c-tertiary">Running total</p>
          <p className={`tabular ${styles.amount}`}>
            {fmt(display)}
            <span>/{unit === "month" ? "mo" : "paycheck"}</span>
          </p>
          <ul className={styles.breakdown}>
            {coverages.map((c) => {
              const t = perCoverage.find((x) => x.id === c.id)!.total * factor;
              return (
                <li key={c.id}>
                  <span>{c.name}</span>
                  <span className="tabular">{waived[c.id] ? "Waived" : fmt(t)}</span>
                </li>
              );
            })}
          </ul>
          <p className="t-body-s c-secondary">
            Shown on every step in the unit people actually pay, not as an annual estimate at the end.
          </p>
        </aside>
      </div>
    </Exhibit>
  );
}

function useAnimatedNumber(target: number) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(target);
  useEffect(() => {
    if (reduce) {
      setV(target);
      return;
    }
    const c = animate(v, target, { duration: 0.5, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [target, reduce]);
  return v;
}
