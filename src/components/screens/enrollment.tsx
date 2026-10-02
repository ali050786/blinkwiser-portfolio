"use client";

import s from "./Mock.module.css";
import { AppFrame, Btn, Cb, CovIcon, Foot, I, Ok, Person, family } from "./kit";

/*
 * The life-event enrollment flow, before and after, rebuilt from the design
 * files in a demo brand. Layout and content follow the real screens; plan,
 * network and people names are invented.
 */

const { member, spouse, kids } = family;
const adopted = "Timothy Brown";

/* ------------------------------------------------------------------ steps */

const oldSteps = (at: number, subs: Record<number, React.ReactNode> = {}) =>
  ["Effective date", "Member", "Dependents", "Select coverage(s)", "Review"].map((label, i) => ({
    label,
    sub: subs[i],
    state: (i < at ? "done" : i === at ? "current" : "todo") as "done" | "current" | "todo",
  }));

const oldSubs = {
  0: "08/21/2025",
  1: (
    <>
      {member} <em>Updated</em>
    </>
  ),
  2: (
    <>
      {adopted} <em>Added</em>
    </>
  ),
};

const newSteps = (at: number, subs: Record<number, React.ReactNode> = {}) =>
  ["Select effective date", "Member profile", "Select dependent(s)", "Select coverage(s)", "Review"].map((label, i) => ({
    label,
    sub: subs[i],
    state: (i < at ? "done" : i === at ? "current" : "todo") as "done" | "current" | "todo",
  }));

const newSubs = {
  0: "01/01/2026",
  1: (
    <>
      {member} <em>Updated</em>
    </>
  ),
  2: (
    <>
      {adopted} <em>Added</em>
    </>
  ),
};

/* ================================================================= BEFORE */

export function OldHousehold() {
  return (
    <AppFrame title="Change in household" steps={oldSteps(2, oldSubs)}>
      <section className={s.card}>
        <div className={s.cardHead}>
          <h2>Dependents</h2>
          <Btn ghost sm>
            <I n="plus" /> Add dependent
          </Btn>
        </div>
        {[
          [spouse, "Spouse"],
          [kids[0]!, "Son"],
          [kids[1]!, "Daughter"],
        ].map(([n, r]) => (
          <div key={n} className={s.listRow}>
            <Person name={n!} role={r} />
            <I n="chevronDown" className={s.chev} />
          </div>
        ))}
        <Foot primary="Continue" />
      </section>
    </AppFrame>
  );
}

function HubCard({ icon, name, plan, premium, deps, waived }: { icon: "heart" | "tooth" | "eye"; name: string; plan: string; premium: string; deps?: string; waived?: boolean }) {
  return (
    <div className={s.hubCard}>
      <div className={s.hubTop}>
        <Ok />
        <CovIcon n={icon} />
        <h4>{name}</h4>
        <span className={s.money}>
          Premium
          <b>{premium}</b>
          Annual
        </span>
      </div>
      <div className={s.hubLine}>
        <span className={waived ? s.muted : undefined}>{plan}</span>
        {deps && <span className={s.chip}>{deps}</span>}
        <Btn ghost sm>
          <I n="edit" /> Update
        </Btn>
      </div>
    </div>
  );
}

export function OldCoverageHub() {
  return (
    <AppFrame
      title="Change in household"
      steps={oldSteps(3, {
        ...oldSubs,
        3: (
          <>
            Medical: Silver PPO
            <br />
            Vision: waived
          </>
        ),
      })}
    >
      <section className={s.card}>
        <div className={s.cardHead}>
          <div>
            <h2>Select coverage(s)</h2>
            <p>Select a plan for each coverage type, or waive it, so you are covered for the enrollment period.</p>
          </div>
        </div>
        <div className={s.cardBody}>
          <HubCard icon="heart" name="Medical" plan="Silver PPO Health Plan" premium="$108.78" deps="3 dependents added" />
          <HubCard icon="tooth" name="Dental" plan="Family Dental Plus" premium="$108.70" deps="3 dependents added" />
          <HubCard icon="eye" name="Vision" plan="Vision coverage is waived." premium="$0.00" waived />
        </div>
        <Foot primary="Proceed" />
      </section>
    </AppFrame>
  );
}

function PlanRow({ name, icon, premium, select, compare, coverageIncludes }: { name: string; icon: "heart" | "eye"; premium: string; select?: boolean; compare?: boolean; coverageIncludes?: boolean }) {
  return (
    <div className={s.planRow}>
      <div className={s.planMain}>
        <div className={s.planTitle}>
          <CovIcon n={icon} sm />
          <h4>{name}</h4>
          {!select && <span className={s.link}>More details</span>}
        </div>
        {coverageIncludes && (
          <div className={s.planGrid}>
            <span>Networks</span>
            <span style={{ gridColumn: "2 / -1", color: "var(--m-ink)" }}>PPO Network</span>
            <span>Coverage includes</span>
            <span style={{ gridColumn: "2 / -1", color: "var(--m-ink)" }}>Employee only</span>
          </div>
        )}
        <div className={s.planGrid}>
          <span>In-network</span>
          <span>Deductible</span>
          <span>$170.00</span>
          <span>Out-of-pocket</span>
          <span>$80.00</span>
        </div>
        <div className={s.planGrid}>
          <span>Out-of-network</span>
          <span>Deductible</span>
          <span>$440.00</span>
          <span>Out-of-pocket</span>
          <span>$560.00</span>
        </div>
      </div>
      <div className={s.planSide}>
        <span className={s.money} style={{ justifyItems: "center", textAlign: "center" }}>
          Premium
          <b>{premium}</b>
          Annual
        </span>
        {select && <Btn ghost sm>Select</Btn>}
        {compare && <Cb>Compare plan detail</Cb>}
      </div>
    </div>
  );
}

export function OldWhoAgain() {
  const people: [string, string, boolean][] = [
    [member, "Member", true],
    [spouse, "Spouse", true],
    [kids[0]!, "Dependent child", true],
    [kids[1]!, "Dependent child", true],
    [adopted, "Dependent child", false],
  ];
  return (
    <AppFrame title="Change in household">
      <section className={s.card}>
        <div className={s.cardHead}>
          <div>
            <h2>Medical plan</h2>
            <p>The displayed premium is only an estimate. The amount may vary if you change network or update dependents.</p>
          </div>
          <I n="x" className={s.chev} />
        </div>
        <div className={s.cardBody}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
          <PlanRow name="Gold PPO Healthcare Plan" icon="heart" premium="$108.78" />
          <p className={s.sub} style={{ margin: "6px 0 0", fontSize: 13, color: "var(--m-ink-2)" }}>
            Select member(s) and dependent(s) to cover
          </p>
          <div className={s.card}>
            {people.map(([n, r, on]) => (
              <div key={n} className={s.listRow}>
                <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <Person name={n} />
                  <span className={s.sub}>{r}</span>
                </span>
                <span className={`${s.pill}`} data-on={on || undefined}>
                  {on ? "Remove" : "Add"}
                  <i style={{ background: on ? "var(--m-bad)" : undefined }}>{on ? "−" : "+"}</i>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.cardFoot}>
          <span className={s.link}>Change plan</span>
          <Btn>Proceed</Btn>
        </div>
      </section>
    </AppFrame>
  );
}

export function OldPlanList() {
  return (
    <AppFrame title="Enrollment">
      <section className={s.card}>
        <div className={s.cardHead}>
          <div className={s.back}>
            <I n="arrowLeft" className={s.chev} />
            <div>
              <h2>Vision coverage: select plan</h2>
              <p>To explore plan options, costs and coverage in detail, select up to 3 plans to compare.</p>
            </div>
          </div>
          <I n="x" className={s.chev} />
        </div>
        <div className={s.cardBody}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Cb>Waive coverage</Cb>
          </div>
          {["ClearSight Plan", "BrightView Vision", "Insight Vision Premier"].map((n) => (
            <PlanRow key={n} name={n} icon="eye" premium="$100.00" select compare coverageIncludes />
          ))}
        </div>
      </section>
    </AppFrame>
  );
}

export function OldReview() {
  return (
    <AppFrame
      title="Change in household"
      steps={oldSteps(4, {
        ...oldSubs,
        3: (
          <>
            Medical: Silver PPO
            <br />
            Dental: Family Dental Plus
          </>
        ),
      })}
    >
      <section className={s.card}>
        <div className={s.cardHead}>
          <h2>Review your coverage</h2>
        </div>
        <div className={s.cardBody} style={{ gap: 16 }}>
          <div className={s.sectionHead}>
            <h3>Member</h3>
            <Btn ghost sm>
              <I n="edit" /> Update
            </Btn>
          </div>
          <div className={s.sectionHead}>
            <Person name={member} role="Participant" lg />
            <span className={s.chip}>Updated</span>
          </div>
          <dl className={s.kv}>
            <dt>Participant ID</dt>
            <dd>7541240</dd>
            <dt>Age</dt>
            <dd>49 years</dd>
            <dt>Date of birth</dt>
            <dd>07/23/1976</dd>
            <dt>Gender</dt>
            <dd>Male</dd>
            <dt>Marital status</dt>
            <dd>Married</dd>
            <dt>Email</dt>
            <dd>m.brown@example.com</dd>
          </dl>
          <div className={s.rule} />
          <div className={s.sectionHead}>
            <h3>Dependent(s)</h3>
            <Btn ghost sm>
              <I n="edit" /> Update
            </Btn>
          </div>
          <div className={s.sectionHead}>
            <Person name={adopted} role="Son" />
            <span className={s.chip}>Newly added</span>
          </div>
          <div className={s.rule} />
          <div className={s.sectionHead}>
            <h3>Coverage(s)</h3>
            <Btn ghost sm>
              <I n="edit" /> Update
            </Btn>
          </div>
          <HubCard icon="heart" name="Medical" plan="Silver PPO Health Plan" premium="$108.78" deps="4 dependents added" />
          <HubCard icon="tooth" name="Dental" plan="Family Dental Plus" premium="$107.00" deps="4 dependents added" />
          <HubCard icon="eye" name="Vision" plan="Vision coverage is waived." premium="$0.00" waived />
        </div>
        <Foot primary="Submit" />
      </section>
    </AppFrame>
  );
}

/* ================================================================== AFTER */

const covs = ["Medical", "Dental", "Vision", "Supplemental"] as const;

export function NewHousehold() {
  const rows: [string, string, number][] = [
    [member, "Member (active)", 2],
    [spouse, "Spouse (active)", 2],
    [kids[0]!, "Child (active)", 3],
    [kids[1]!, "Child (active)", 3],
    [kids[2]!, "Child (active)", 3],
  ];
  return (
    <AppFrame title="Life event" forWhom={`${member} (Member)`} premium="$0.00" steps={newSteps(2, newSubs)}>
      <section className={s.card}>
        <div className={s.cardHead}>
          <div>
            <h2>Select dependent(s)</h2>
            <p>Review who needs coverage for the upcoming period. Add a dependent if your family has changed. You can change these choices any time during enrollment.</p>
          </div>
        </div>
        <div className={s.cardBody}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Btn ghost sm>
              <I n="plus" /> Add dependent
            </Btn>
          </div>
          {rows.map(([n, r, k], i) => (
            <div key={n} className={s.famRow}>
              <div className={s.famTop}>
                <Person name={n} role={r} />
                {i > 0 && <I n="kebab" className={s.kebab} />}
              </div>
              <div className={s.famCovs}>
                {covs.map((c, j) => (
                  <Cb key={c} on={j < k}>
                    {c}
                  </Cb>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Foot primary="Continue" extras />
      </section>
    </AppFrame>
  );
}

export function NewPlan() {
  const plans: [string, string, boolean][] = [
    ["Waive / opt out", "$0.00", false],
    ["TotalCare Select with Preventive Care", "$80.00", true],
    ["PrimeMed Plus", "$80.00", false],
    ["Elite Health Premier", "$102.90", false],
    ["CompleteCare Pro with Preventive Care", "$245.00", false],
  ];
  return (
    <AppFrame title="Life event" forWhom={`${member} (Member)`} premium="$80.00">
      <section className={s.card}>
        <div className={s.cardHead}>
          <div className={s.back}>
            <I n="arrowLeft" className={s.chev} />
            <div>
              <h2>
                Select a plan for <b>Medical</b>
              </h2>
              <p>Compare plans and pick the one that fits. To keep your current plan, continue to the next step.</p>
            </div>
          </div>
        </div>
        <div className={s.coverageBar}>
          <h3>Coverage includes: Family</h3>
          <p>
            {member} (Member) · {spouse} (Spouse) · {kids[0]} (Child) · {kids[1]} (Child) · {adopted} (Adopted child){" "}
            <span className={s.link}>Update</span>
          </p>
        </div>
        <div className={s.cardBody} style={{ gap: 16 }}>
          <div>
            <Btn ghost sm>
              <I n="people" /> Different plan for each member
            </Btn>
          </div>
          <p className={s.note}>Prices are per month and cover everyone listed above. Plan rules and subsidy details appear here.</p>
          <div className={s.pickGrid}>
            {plans.map(([n, p, on], i) => (
              <div key={n} className={s.pick}>
                {i > 0 ? <Cb>Compare</Cb> : <span className={s.cb} style={{ visibility: "hidden" }}>Compare</span>}
                <div className={s.pickCard} data-on={on || undefined}>
                  <div className={s.pickTop}>
                    <h4>{n}</h4>
                    <div className={s.pickPrice}>
                      <span>
                        <b>{p}</b>
                        <span className={s.sub}>per month</span>
                      </span>
                      <span className={s.radio} data-on={on || undefined} />
                    </div>
                  </div>
                  <div className={s.pickFoot}>{i > 0 ? <span className={s.link}>View details</span> : <span className={s.muted}>No medical coverage</span>}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Foot primary="Continue" extras />
      </section>
    </AppFrame>
  );
}

type Line = { plan: string; who: string; price: string };

function Summary({ icon, name, total, lines }: { icon: "heart" | "tooth" | "eye"; name: string; total: string; lines: Line[] }) {
  return (
    <div className={s.sumCard}>
      <div className={s.sumHead}>
        <CovIcon n={icon} sm />
        {name}
      </div>
      <div className={s.sumTotal}>
        <span>Total premium for {name.toLowerCase()}</span>
        <span>
          {total} <span>per month</span>
        </span>
      </div>
      <div className={s.sumLines}>
        {lines.map((l) => (
          <div key={l.plan + l.who} className={s.sumLine}>
            <div>
              <b>{l.plan}</b>
              <span>{l.who}</span>
            </div>
            <em>
              {l.price}
              <br />
              <span>per month</span>
            </em>
          </div>
        ))}
      </div>
    </div>
  );
}

const summaries = [
  {
    icon: "heart" as const,
    name: "Medical",
    total: "$168.00",
    lines: [
      { plan: "TotalCare Select with Preventive Care (employee only)", who: member, price: "$80.00" },
      { plan: "TotalCare Select with Preventive Care (dependent only)", who: spouse, price: "$88.00" },
    ],
  },
  {
    icon: "tooth" as const,
    name: "Dental",
    total: "$80.00",
    lines: [
      { plan: "Dental Preventive Care (dependent only)", who: spouse, price: "$80.00" },
      { plan: "Waive / opt out", who: `${adopted} (adopted child)`, price: "$0.00" },
    ],
  },
  {
    icon: "eye" as const,
    name: "Vision",
    total: "$38.44",
    lines: [
      { plan: "ClearSight Plus (child only)", who: kids[0]!, price: "$19.22" },
      { plan: "OptimumVision Care (child only)", who: kids[1]!, price: "$19.22" },
      { plan: "Waive / opt out", who: `${member}, ${adopted}`, price: "$0.00" },
    ],
  },
];

export function NewCoverage() {
  return (
    <AppFrame title="Life event" forWhom={`${member} (Member)`} premium="$286.44" steps={newSteps(3, newSubs)}>
      <section className={s.card}>
        <div className={s.cardHead}>
          <div>
            <h2>Select coverage(s)</h2>
            <p>Check your changes to your current benefits. Edit anything, or continue to save these changes.</p>
          </div>
          <Btn ghost sm>
            View / update
          </Btn>
        </div>
        <div className={s.cardBody}>
          {summaries.map((x) => (
            <Summary key={x.name} {...x} />
          ))}
          <p className={s.sub} style={{ margin: 0 }}>
            You can review and change your selections any time during enrollment.
          </p>
        </div>
        <Foot primary="Proceed" extras />
      </section>
    </AppFrame>
  );
}

export function NewReview() {
  const deps: [string, string, React.ReactNode?][] = [
    [spouse, "Spouse (active)"],
    [kids[0]!, "Child (active)"],
    [kids[1]!, "Child (active)"],
    [kids[2]!, "Child (to be terminated)", <span key="t" className={`${s.chip} ${s.chipBad}`}>To be terminated</span>],
    [adopted, "Adopted child (active)", <span key="n" className={s.chip}>Newly added</span>],
  ];
  const Upd = () => (
    <Btn ghost sm>
      <I n="edit" /> Update
    </Btn>
  );
  return (
    <AppFrame title="Life event" forWhom={`${member} (Member)`} premium="$286.44" steps={newSteps(4, { ...newSubs, 3: "Medical, dental, vision" })}>
      <section className={s.card}>
        <div className={s.cardHead}>
          <h2>Review</h2>
        </div>
        <div className={s.cardBody} style={{ gap: 14 }}>
          <div className={s.sectionHead}>
            <h3>Effective date 01/01/2026</h3>
            <Upd />
          </div>
          <div className={s.rule} />
          <div className={s.sectionHead}>
            <h3>Member profile</h3>
            <Upd />
          </div>
          <div className={s.sectionHead}>
            <Person name={member} role="Member (active)" />
            <span className={s.chip}>Updated</span>
          </div>
          <div className={s.tabsMini}>
            {["Personal", "Contact", "Address", "Employment", "Insurance", "Electronic signature"].map((t, i) => (
              <span key={t} data-on={i === 0 || undefined}>
                {t}
              </span>
            ))}
          </div>
          <dl className={s.kv}>
            <dt>Gender</dt>
            <dd>Male</dd>
            <dt>Date of birth</dt>
            <dd>07/23/1976</dd>
            <dt>Language</dt>
            <dd>English</dd>
            <dt>Marital status</dt>
            <dd>Married</dd>
            <dt>Member ID</dt>
            <dd>988 990 998</dd>
            <dt>Beneficiary</dt>
            <dd>{spouse}</dd>
          </dl>
          <div className={s.rule} />
          <div className={s.sectionHead}>
            <h3>Dependent(s)</h3>
            <Upd />
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {deps.map(([n, r, badge]) => (
              <div key={n} className={s.sectionHead}>
                <Person name={n} role={r} />
                {badge}
              </div>
            ))}
          </div>
          <div className={s.rule} />
          <div className={s.sectionHead}>
            <h3>Coverage(s)</h3>
            <Upd />
          </div>
          {summaries.map((x) => (
            <Summary key={x.name} {...x} />
          ))}
        </div>
        <Foot primary="Submit" extras />
      </section>
    </AppFrame>
  );
}
