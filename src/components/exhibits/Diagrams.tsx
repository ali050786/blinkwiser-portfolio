import g from "@/components/ui/Glyph.module.css";
import d from "./Diagrams.module.css";

/**
 * Line diagrams in the same visual language as the study glyphs: plain nodes,
 * red dashed nodes for the problem, accent for the fix. Static, readable as stills.
 */
function Diagram({ label, viewBox, aria, caption, children }: { label: string; viewBox: string; aria: string; caption: string; children: React.ReactNode }) {
  return (
    <figure className={d.fig} data-reveal>
      <p className={`t-label ${d.label}`}>{label}</p>
      <div className={d.scroll}>
        <svg viewBox={viewBox} className={`${g.glyph} ${d.svg}`} role="img" aria-label={aria}>
          {children}
        </svg>
      </div>
      <figcaption className="t-body-s c-secondary">{caption}</figcaption>
    </figure>
  );
}

const T = ({ x, y, children, anchor = "start", warn, accent }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; warn?: boolean; accent?: boolean }) => (
  <text x={x} y={y} textAnchor={anchor} className={`${g.mono} ${warn ? d.warnText : ""} ${accent ? d.accentText : ""}`}>
    {children}
  </text>
);

/** Stakes: miss someone in the window and the gap lasts until the next one. */
export function CoverageGap() {
  return (
    <Diagram
      label="Diagram · one coverage year"
      viewBox="0 0 720 230"
      aria="Timeline of one coverage year: the open enrollment window at the start, a birth with 31 days to act, and a red gap where a missed family member stays uncovered until the next window."
      caption="The deadline is the stake. Miss a family member in the window and they stay uncovered for the year, unless a life event like a birth reopens a 31-day window."
    >
      <path d="M40 110 H680" className={g.line} />
      <rect x="40" y="96" width="80" height="28" rx="6" className={g.soft} />
      <T x={40} y={82}>open enrollment window</T>
      <rect x="600" y="96" width="80" height="28" rx="6" className={g.soft} />
      <T x={680} y={82} anchor="end">
        next window
      </T>
      <rect x="320" y="100" width="44" height="20" rx="5" className={g.accentMid} />
      <circle cx="320" cy="110" r="7" className={g.accent} />
      <T x={320} y={82} anchor="middle">
        a birth · 31 days to act
      </T>
      <path d="M120 160 H600" className={d.gap} />
      <circle cx="120" cy="160" r="6" className={g.cardWarn} />
      <T x={360} y={190} anchor="middle" warn>
        missed in the window → uncovered until the next window or a life event
      </T>
      <T x={40} y={218}>
        Jan
      </T>
      <T x={680} y={218} anchor="end">
        Dec
      </T>
    </Diagram>
  );
}

/** Fork 1: trimming shortens the flow but keeps the loop; reordering removes it. */
export function TrimVsReorder() {
  const trim = [0, 1, 2, 3, 4, 5, 6];
  const warn = [2, 6];
  return (
    <Diagram
      label="Diagram · the two options"
      viewBox="0 0 720 260"
      aria="Two flows. Trimming screens gives fewer screens with the per-coverage loop still there. Reordering gives 5 steps with no loop and who-needs-what asked once."
      caption="Trimming would have answered “too long” on paper and kept the loop. Reordering removed the loop, so the question is asked once."
    >
      <T x={40} y={46}>
        trim the screens
      </T>
      <path d="M40 70 H400" className={g.faint} />
      <path d="M280 58 C 292 26, 388 26, 400 58" className={g.flowPath} />
      <T x={340} y={22} anchor="middle">
        ×3 loop
      </T>
      {trim.map((i) => (
        <circle key={i} cx={40 + i * 60} cy={70} r={9} className={warn.includes(i) ? g.cardWarn : g.nodeModel} />
      ))}
      <T x={450} y={66}>fewer screens · loop stays</T>
      <T x={450} y={84} warn>
        asked again per coverage
      </T>

      <T x={40} y={160}>
        reorder the decision
      </T>
      <path d="M40 200 H400" className={g.strong} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={40 + i * 90} cy={200} r={i === 3 ? 13 : 10} className={i === 3 ? g.accent : g.accentRing} />
      ))}
      <T x={310} y={236} anchor="middle" accent>
        who needs what
      </T>
      <T x={450} y={196}>5 steps · loop gone</T>
      <T x={450} y={214} accent>
        asked once, as one grid
      </T>
    </Diagram>
  );
}

/** Fork 3: the member's order and the backend's order cross; the UI translates between them. */
export function TranslateLayer() {
  const xs = [180, 360, 540];
  // member step i maps to backend step target[i]: family → members, who needs what → coverage, plan → plan
  const target = [2, 0, 1];
  return (
    <Diagram
      label="Diagram · two orders, one translation"
      viewBox="0 0 720 310"
      aria="Top row: how a family decides, my family, who needs what, which plan. Bottom row: how the backend stores it, coverage, plan, members. Crossing lines pass through a band labelled UI translates."
      caption="The member's order and the backend's order cross. Instead of forcing either side to change, the UI collects the grid and translates it; the backend changed only where translation wasn't enough."
    >
      <T x={40} y={30}>
        how a family decides
      </T>
      <path d="M180 64 H540" className={g.strong} />
      {xs.map((x, i) => (
        <circle key={`t${i}`} cx={x} cy={64} r={10} className={g.accentRing} />
      ))}
      {["my family", "who needs what", "which plan"].map((t, i) => (
        <T key={t} x={xs[i]!} y={96} anchor="middle" accent>
          {t}
        </T>
      ))}
      {xs.map((x, i) => (
        <path key={`c${i}`} d={`M${x} 104 C ${x} 170, ${xs[target[i]!]} 170, ${xs[target[i]!]} 236`} className={g.faint} />
      ))}
      <rect x="60" y="140" width="600" height="34" rx="8" className={d.band} />
      <T x={360} y={162} anchor="middle" accent>
        UI translates the grid, once
      </T>
      <path d="M180 246 H540" className={g.line} />
      {xs.map((x, i) => (
        <circle key={`b${i}`} cx={x} cy={246} r={10} className={g.nodeModel} />
      ))}
      {["coverage", "plan", "members"].map((t, i) => (
        <T key={t} x={xs[i]!} y={280} anchor="middle">
          {t}
        </T>
      ))}
      <T x={40} y={304}>
        how the backend stores it
      </T>
    </Diagram>
  );
}

/** Follow-on: document upload moved from a fixed step to a conditional one. */
export function AskWhenNeeded() {
  const before = ["profile", "dependents", "upload document", "coverage", "review"];
  return (
    <Diagram
      label="Diagram · ask only when needed"
      viewBox="0 0 720 292"
      aria="Before: a fixed upload document step for everyone. After: a check for whether proof is needed, with the upload step only on that branch."
      caption="Before, every member passed an upload step. Now it appears only when a member's situation needs a document."
    >
      <T x={40} y={28}>
        before · a fixed step for everyone
      </T>
      <path d="M60 64 H540" className={g.faint} />
      {before.map((t, i) => (
        <g key={t}>
          <circle cx={60 + i * 120} cy={64} r={10} className={i === 2 ? g.cardWarn : g.nodeModel} />
          <T x={60 + i * 120} y={94} anchor="middle" warn={i === 2}>
            {t}
          </T>
        </g>
      ))}

      <T x={40} y={136}>
        after · only when the situation needs it
      </T>
      <path d="M60 190 H540" className={g.strong} />
      {[0, 1, 3, 4].map((i) => (
        <circle key={i} cx={60 + i * 120} cy={190} r={10} className={g.accentRing} />
      ))}
      <rect x="290" y="180" width="20" height="20" rx="3" transform="rotate(45 300 190)" className={g.accent} />
      {["profile", "dependents"].map((t, i) => (
        <T key={t} x={60 + i * 120} y={172} anchor="middle">
          {t}
        </T>
      ))}
      <T x={300} y={168} anchor="middle" accent>
        needs proof?
      </T>
      {["coverage", "review"].map((t, i) => (
        <T key={t} x={420 + i * 120} y={172} anchor="middle">
          {t}
        </T>
      ))}
      <path d="M308 200 C 325 262, 405 262, 418 202" className={g.flowPath} />
      <circle cx="363" cy="247" r="7" className={g.accentRing} />
      <T x={363} y={280} anchor="middle" accent>
        upload, only if yes
      </T>
    </Diagram>
  );
}

/** Passive enrollment: members who took no action flow into one rule, then split. Demo figures. */
export function PassiveRun() {
  const total = 312;
  const handled = 289;
  const review = 23;
  const dots = Array.from({ length: 12 }, (_, i) => ({ x: 50 + (i % 4) * 26, y: 100 + Math.floor(i / 4) * 26, warn: i === 11 }));
  const rule = { x: 320, y: 126 };
  const ok = { x: 530, y: 80 };
  const back = { x: 530, y: 206 };
  const okW = (handled / total) * 640;
  return (
    <Diagram
      label="Diagram · one passive enrollment run"
      viewBox="0 0 720 286"
      aria={`${total} members who took no action flow into one rule set by the client. ${handled} are handled by the rule; ${review} come back to the admin, each with a reason.`}
      caption="The admin sets the rule once and confirms the run. The rule handles most members; the rest come back with a reason instead of getting lost in the batch. Demo figures, matching the rebuilt screens below."
    >
      {dots
        .filter((p, i) => p.warn || i % 4 === 3)
        .map((p, i) => (
          <path
            key={`l${i}`}
            d={`M${p.x + 6} ${p.y} C 220 ${p.y}, 240 ${rule.y}, ${rule.x - 14} ${rule.y}`}
            className={p.warn ? d.gapThin : g.faint}
          />
        ))}
      {dots.map((p, i) => (
        <circle key={`d${i}`} cx={p.x} cy={p.y} r={6} className={p.warn ? g.cardWarn : g.nodeModel} />
      ))}
      <T x={40} y={192}>
        {total} members
      </T>
      <T x={40} y={209}>
        took no action
      </T>

      <T x={rule.x} y={74} anchor="middle">
        one rule, set by the client
      </T>
      <T x={rule.x} y={92} anchor="middle" accent>
        default to another plan
      </T>
      <circle cx={rule.x} cy={rule.y} r={13} className={g.accent} />
      <T x={rule.x} y={52} anchor="middle" warn>
        run after a warning: “cannot be undone”
      </T>

      {[-6, 0, 6].map((o) => (
        <path key={o} d={`M${rule.x + 14} ${rule.y + o / 2} C 420 ${rule.y + o}, 440 ${ok.y + o}, ${ok.x - 13} ${ok.y + o}`} className={g.strong} />
      ))}
      <path d={`M${rule.x + 4} ${rule.y + 13} C ${rule.x + 20} ${back.y}, 440 ${back.y}, ${back.x - 10} ${back.y}`} className={d.gapThin} />
      <circle cx={ok.x} cy={ok.y} r={12} className={g.accent} />
      <T x={ok.x + 22} y={76} accent>
        {handled} handled by the rule
      </T>
      <T x={ok.x + 22} y={93}>
        no admin action
      </T>
      <circle cx={back.x} cy={back.y} r={10} className={g.cardWarn} />
      <T x={back.x + 22} y={202} warn>
        {review} back to the admin
      </T>
      <T x={back.x + 22} y={219}>
        each with a reason
      </T>

      <rect x="40" y="262" width={okW} height="8" rx="4" className={g.accent} />
      <rect x={40 + okW} y="262" width={640 - okW} height="8" rx="4" className={d.barWarn} />
    </Diagram>
  );
}
