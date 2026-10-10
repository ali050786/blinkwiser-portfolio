import type { MetricViz, MetricVisualId } from "@/content/types";
import { Glyph } from "@/components/ui/Glyph";
import g from "@/components/ui/Glyph.module.css";
import styles from "./MetricVisual.module.css";

const T = ({ x, y, children, anchor = "start", warn, accent }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; warn?: boolean; accent?: boolean }) => (
  <text x={x} y={y} textAnchor={anchor} className={`${g.mono} ${warn ? styles.warn : ""} ${accent ? styles.accent : ""}`}>
    {children}
  </text>
);

const covs = ["medical", "dental", "vision"];

/** Small line diagrams for outcome cards, in the same language as the study glyphs. */
export function MetricVisual({ id }: { id: MetricVisualId }) {
  if (id === "glyph-flow") return <Glyph id="flow" className={styles.svg} />;

  if (id === "dm-apps") {
    // Nine small app tiles, each a different shape, collapsing into one app.
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="Nine separate app icons on the left, one app icon on the right.">
        {Array.from({ length: 9 }, (_, i) => {
          const x = 52 + (i % 3) * 62;
          const y = 70 + Math.floor(i / 3) * 62;
          return <rect key={i} x={x} y={y} width={46} height={46} rx={6 + (i % 3) * 7} className={g.cardBack} />;
        })}
        <path d="M250 163 H318" className={g.strong} />
        <rect x={330} y={110} width={106} height={106} rx={24} className={g.accent} />
        <T x={52} y={270}>nine apps</T>
        <T x={383} y={270} anchor="middle" accent>one app</T>
      </svg>
    );
  }

  if (id === "dm-tabs") {
    // The app's five tabs, as the bottom bar people see.
    const tabs = ["Home", "Dashboard", "Services", "Media", "More"];
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="A bottom tab bar with five tabs: Home, Dashboard, Services, Media Center and More.">
        <rect x={60} y={50} width={360} height={150} rx={14} className={g.cardBack} />
        <rect x={80} y={74} width={160} height={10} rx={5} className={g.muted} />
        <rect x={80} y={96} width={320} height={34} rx={8} className={g.tile} />
        <rect x={80} y={140} width={320} height={34} rx={8} className={g.tile} />
        <rect x={60} y={210} width={360} height={64} rx={14} className={g.card} />
        {tabs.map((tb, i) => {
          const x = 96 + i * 72;
          return (
            <g key={tb}>
              <rect x={x - 11} y={222} width={22} height={18} rx={4} className={i === 1 ? g.accent : g.nodeModel} />
              <T x={x} y={262} anchor="middle" accent={i === 1}>{tb}</T>
            </g>
          );
        })}
      </svg>
    );
  }

  if (id === "dm-months") {
    // Eight months onsite, one block each.
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="Eight blocks, one for each month spent onsite in Dubai.">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={44 + i * 50} y={130} width={42} height={42} rx={8} className={i === 7 ? g.accent : g.accentMid} />
        ))}
        <T x={44} y={110}>onsite in Dubai</T>
        <T x={44} y={206}>month 1</T>
        <T x={436} y={206} anchor="end" accent>launch</T>
      </svg>
    );
  }

  if (id === "dm-rtl") {
    // Two small screens, the second a mirror of the first.
    const Mini = ({ x, rtl }: { x: number; rtl?: boolean }) => (
      <g transform={`translate(${x} 60)`}>
        <rect width={150} height={190} rx={14} className={g.card} />
        {[24, 70, 116].map((y) => (
          <g key={y}>
            <circle cx={rtl ? 124 : 26} cy={y + 14} r={10} className={g.accentRing} />
            <rect x={rtl ? 30 : 46} y={y + 10} width={74} height={8} rx={4} className={g.muted} />
          </g>
        ))}
      </g>
    );
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="An English screen and its Arabic mirror, built from the same layout.">
        <Mini x={50} />
        <path d="M240 60 V250" className={g.faint} strokeDasharray="4 5" />
        <Mini x={280} rtl />
        <T x={125} y={282} anchor="middle">English</T>
        <T x={355} y={282} anchor="middle" accent>Arabic, mirrored</T>
      </svg>
    );
  }

  if (id === "jet-platforms") {
    // The same fare card on a browser window, an iPhone and an Android phone, all fed by one library row.
    const Fare = ({ x, y, w }: { x: number; y: number; w: number }) => (
      <g>
        <rect x={x} y={y} width={w} height={34} rx={6} className={g.soft} />
        <rect x={x + 8} y={y + 9} width={w * 0.38} height={6} rx={3} className={g.ink} />
        <rect x={x + 8} y={y + 20} width={w * 0.24} height={5} rx={2.5} className={g.ink} />
        <rect x={x + w - 30} y={y + 10} width={22} height={14} rx={4} className={g.accent} />
      </g>
    );
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="The same fare card shown on a web browser, an iPhone and an Android phone, all built from one shared component library.">
        <rect x={36} y={40} width={210} height={150} rx={10} className={g.card} />
        <rect x={36} y={40} width={210} height={22} rx={10} className={g.muted} />
        <rect x={36} y={52} width={210} height={10} className={g.muted} />
        {[50, 60, 70].map((cx) => (
          <circle key={cx} cx={cx} cy={51} r={3} className={g.tile} />
        ))}
        <Fare x={52} y={78} w={178} />
        <Fare x={52} y={120} w={178} />
        <rect x={276} y={40} width={78} height={150} rx={14} className={g.card} />
        <rect x={302} y={48} width={26} height={5} rx={2.5} className={g.muted} />
        <Fare x={284} y={70} w={62} />
        <Fare x={284} y={110} w={62} />
        <rect x={378} y={40} width={78} height={150} rx={8} className={g.card} />
        <circle cx={417} cy={50} r={3} className={g.muted} />
        <Fare x={386} y={70} w={62} />
        <Fare x={386} y={110} w={62} />
        <T x={141} y={210} anchor="middle">web</T>
        <T x={315} y={210} anchor="middle">iOS</T>
        <T x={417} y={210} anchor="middle">Android</T>
        {[141, 315, 417].map((x) => (
          <path key={x} d={`M${x} 222 V246`} className={g.strong} />
        ))}
        <path d="M60 246 H440" className={g.strong} />
        {[60, 128, 196, 264, 332, 400].map((x, i) => (
          <rect key={x} x={x} y={258} width={44} height={24} rx={5} className={i === 2 ? g.accent : g.tile} />
        ))}
        <T x={60} y={306} accent>one shared component library</T>
      </svg>
    );
  }

  if (id === "jet-steps") {
    // The booking progress bar as people saw it: five steps, each one done before the next.
    const steps = ["search", "flights", "guests", "extras", "pay"];
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="A booking progress bar with five steps in order: search, flights, guests, extras and pay.">
        <rect x={36} y={60} width={408} height={88} rx={12} className={g.card} />
        {steps.map((s, i) => {
          const x = 52 + i * 78;
          const done = i < 4;
          return (
            <g key={s}>
              <rect x={x} y={84} width={70} height={10} rx={5} className={done ? g.accent : g.accentRing} />
              <T x={x} y={124}>{`${i + 1}  ${s}`}</T>
            </g>
          );
        })}
        <rect x={36} y={176} width={408} height={104} rx={12} className={g.cardBack} />
        <rect x={56} y={196} width={120} height={8} rx={4} className={g.ink} />
        <rect x={56} y={216} width={200} height={6} rx={3} className={g.muted} />
        <rect x={56} y={232} width={160} height={6} rx={3} className={g.muted} />
        <rect x={344} y={240} width={80} height={24} rx={12} className={g.accent} />
      </svg>
    );
  }

  if (id === "jet-extras") {
    // One Extras step: every add-on is a row in the same list, opened only if someone wants it.
    const rows = ["meals", "seats", "baggage", "priority", "miles", "insurance"];
    const picked = [0, 1];
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="One Extras step listing six add-ons as rows: meals, seats, baggage, priority, miles and insurance. Meals and seats are picked.">
        <rect x={90} y={24} width={300} height={276} rx={12} className={g.card} />
        <T x={110} y={50}>extras · one step</T>
        {rows.map((r, i) => {
          const y = 66 + i * 38;
          const on = picked.includes(i);
          return (
            <g key={r}>
              {i > 0 && <path d={`M106 ${y - 4} H374`} className={g.faint} />}
              <rect x={110} y={y + 6} width={20} height={20} rx={5} className={on ? g.accentMid : g.tile} />
              <T x={142} y={y + 21}>{r}</T>
              <rect x={326} y={y + 7} width={36} height={18} rx={9} className={on ? g.accent : g.muted} />
              <circle cx={on ? 353 : 335} cy={y + 16} r={6} className={g.card} />
            </g>
          );
        })}
      </svg>
    );
  }

  if (id === "jet-years") {
    // Five years on a time axis: live the whole way, ending when the airline closed.
    const years = [2015, 2016, 2017, 2018, 2019];
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="A timeline from 2015 to 2019. The booking flow is live the whole time and stops when the airline closed in 2019.">
        <path d="M56 200 H424" className={g.faint} />
        {years.map((y, i) => {
          const x = 56 + i * 84;
          return (
            <g key={y}>
              <path d={`M${x} 192 V208`} className={g.strong} />
              <T x={x} y={234} anchor="middle">{String(y)}</T>
            </g>
          );
        })}
        <rect x={56} y={140} width={336} height={22} rx={6} className={g.accent} />
        <T x={64} y={124} accent>live in production</T>
        <path d="M392 120 V214" className={g.strong} />
        <rect x={384} y={140} width={16} height={22} rx={3} className={g.cardWarn} />
        <T x={396} y={110} anchor="middle" warn>airline closed</T>
      </svg>
    );
  }

  if (id === "asked-once")
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="Before: who's covered asked inside each of three coverages. After: asked once, feeding all three.">
        <T x={44} y={40}>
          before · asked in every coverage
        </T>
        {covs.map((c, i) => {
          const x = 60 + i * 140;
          return (
            <g key={c}>
              <rect x={x} y={62} width={110} height={56} rx={10} className={g.cardBack} />
              <circle cx={x + 26} cy={90} r={9} className={g.cardWarn} />
              <T x={x + 44} y={94}>
                {c}
              </T>
            </g>
          );
        })}
        <T x={44} y={182}>
          after · asked once
        </T>
        {covs.map((c, i) => {
          const x = 196 + i * 94;
          const d = i === 0 ? `M104 256 H${x}` : `M100 ${250 - i * 4} C ${150 + i * 10} ${214 - i * 22}, ${x + 10} ${214 - i * 22}, ${x + 40} 238`;
          return (
            <g key={`a${c}`}>
              <path d={d} className={g.strong} />
              <rect x={x} y={238} width={80} height={36} rx={10} className={g.card} />
              <T x={x + 40} y={260} anchor="middle">
                {c}
              </T>
            </g>
          );
        })}
        <circle cx={90} cy={256} r={13} className={g.accent} />
        <T x={90} y={298} anchor="middle" accent>
          who needs what
        </T>
      </svg>
    );

  if (id === "cost-every-step") {
    const xs = [52, 146, 240, 334, 428];
    return (
      <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="Before: cost appears once, at the end, as an estimate. After: a running monthly total on every step.">
        <T x={44} y={40}>
          before · an estimate, at the end
        </T>
        <path d="M52 92 H428" className={g.faint} />
        {xs.map((x, i) => (
          <circle key={`b${x}`} cx={x} cy={92} r={8} className={i === 4 ? g.cardWarn : g.nodeModel} />
        ))}
        <T x={428} y={124} anchor="middle" warn>
          est. / yr
        </T>
        <T x={44} y={182}>
          after · total on every step
        </T>
        {xs.map((x, i) => (
          <rect key={`t${x}`} x={x - 18} y={252 - (i + 1) * 9} width={36} height={(i + 1) * 9} rx={4} className={i === 4 ? g.accent : g.accentMid} />
        ))}
        <path d="M52 270 H428" className={g.strong} />
        {xs.map((x) => (
          <circle key={`a${x}`} cx={x} cy={270} r={8} className={g.accentRing} />
        ))}
        <T x={428} y={302} anchor="middle" accent>
          $ / month
        </T>
      </svg>
    );
  }

  if (id === "mockup-hours" || id === "story-days") {
    // One block per working hour or working day. Dashed blocks are the top of a range.
    const hours = id === "mockup-hours";
    const before = hours ? { solid: 16, range: 0, label: "about 2 days" } : { solid: 5, range: 5, label: "1 or 2 weeks" };
    const after = hours ? { solid: 3, range: 1, label: "3 or 4 hours" } : { solid: 3, range: 1, label: "3 or 4 days" };
    const w = hours ? 22 : 36;
    const step = hours ? 24 : 40;
    const row = (b: typeof before, y: number, kind: "before" | "after") =>
      Array.from({ length: b.solid + b.range }, (_, i) => (
        <rect
          key={`${kind}${i}`}
          x={44 + i * step}
          y={y}
          width={w}
          height={28}
          rx={5}
          className={i >= b.solid ? (kind === "before" ? g.cardWarn : g.accentRing) : kind === "before" ? g.card : g.accent}
        />
      ));
    return (
      <svg
        viewBox="0 0 480 300"
        className={`${g.glyph} ${styles.svg}`}
        role="img"
        aria-label={`Before: ${before.label}. After: ${after.label}. One block per working ${hours ? "hour" : "day"}; outlined blocks are the top of the range.`}
      >
        <T x={44} y={44}>
          before · {before.label}
        </T>
        {row(before, 62, "before")}
        <T x={44} y={160} accent>
          after · {after.label}
        </T>
        {row(after, 178, "after")}
        <T x={44} y={270}>
          1 block = 1 working {hours ? "hour" : "day"} · team-observed
        </T>
      </svg>
    );
  }

  if (id === "time-freed")
    return (
      <svg viewBox="0 0 480 300" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="Before: a designer's production time, the whole bar. After: about 60 percent, with about 40 percent freed for research, flows, and edge cases.">
        <T x={44} y={44}>
          before · production time
        </T>
        <rect x={44} y={62} width={392} height={28} rx={6} className={g.card} />
        <T x={44} y={160} accent>
          after · about 40% less
        </T>
        <rect x={44} y={178} width={235} height={28} rx={6} className={g.card} />
        <rect x={283} y={178} width={153} height={28} rx={6} className={g.accent} />
        <T x={436} y={232} anchor="end" accent>
          freed for research, flows, edge cases
        </T>
        <T x={44} y={270}>
          approximate · team-observed
        </T>
      </svg>
    );

  if (id === "brand-grid") {
    const platforms = ["admin", "member", "mobile"];
    return (
      <svg viewBox="0 0 480 300" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="One design system feeding a grid of five client brands by three platforms: admin center, member portal, and mobile app.">
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={r}>
            <path d={`M78 150 C 130 150, 130 ${70 + r * 40}, 176 ${70 + r * 40}`} className={g.strong} />
            <T x={196} y={74 + r * 40} anchor="end">
              {String.fromCharCode(65 + r)}
            </T>
            {platforms.map((p, c) => (
              <rect key={p} x={210 + c * 76} y={56 + r * 40} width={64} height={28} rx={6} className={g.accentMid} />
            ))}
          </g>
        ))}
        {platforms.map((p, c) => (
          <T key={p} x={242 + c * 76} y={40} anchor="middle">
            {p}
          </T>
        ))}
        <circle cx={66} cy={150} r={14} className={g.accent} />
        <T x={66} y={190} anchor="middle" accent>
          one system
        </T>
        <T x={44} y={280}>
          brands A–E are generic labels · themed by mode
        </T>
      </svg>
    );
  }

  // four-flows
  const entries = ["open enrollment", "life event", "new hire", "admin on behalf"];
  const xs = [250, 300, 350, 400, 450];
  return (
    <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="Four ways in, open enrollment, life event, new hire, and admin on behalf, all joining one shared five-step skeleton.">
      {entries.map((e, i) => {
        const y = 70 + i * 60;
        return (
          <g key={e}>
            <path d={`M160 ${y} C 210 ${y}, 210 172, 250 172`} className={g.faint} />
            <circle cx={150} cy={y} r={8} className={g.accentRing} />
            <T x={134} y={y + 4} anchor="end">
              {e}
            </T>
          </g>
        );
      })}
      <path d="M250 172 H450" className={g.strong} />
      {xs.map((x, i) => (
        <circle key={x} cx={x} cy={172} r={i === 3 ? 12 : 9} className={i === 3 ? g.accent : g.accentRing} />
      ))}
      <T x={350} y={214} anchor="middle" accent>
        one shared skeleton
      </T>
    </svg>
  );
}

/** Data-driven card diagrams. Every one carries its provenance note. */
export function MetricVizView({ viz }: { viz: MetricViz }) {
  const W = 480;
  if (viz.kind === "blocks") {
    const total = Math.max(viz.before.solid + (viz.before.range ?? 0), viz.after.solid + (viz.after.range ?? 0));
    const step = Math.min(40, Math.floor(392 / total));
    const w = step - 4;
    const row = (r: typeof viz.before, y: number, after: boolean) =>
      Array.from({ length: r.solid + (r.range ?? 0) }, (_, i) => (
        <rect
          key={`${after}${i}`}
          x={44 + i * step}
          y={y}
          width={w}
          height={28}
          rx={5}
          className={i >= r.solid ? (after ? g.accentRing : g.cardWarn) : after ? g.accent : g.card}
        />
      ));
    return (
      <svg viewBox={`0 0 ${W} 300`} className={`${g.glyph} ${styles.svg}`} role="img" aria-label={`Before: ${viz.before.label}. After: ${viz.after.label}. ${viz.note}`}>
        <T x={44} y={44}>
          before · {viz.before.label}
        </T>
        {row(viz.before, 62, false)}
        <T x={44} y={160} accent>
          after · {viz.after.label}
        </T>
        {row(viz.after, 178, true)}
        <T x={44} y={270}>
          1 block = 1 {viz.unit} · {viz.note}
        </T>
      </svg>
    );
  }
  if (viz.kind === "dots") {
    return (
      <svg viewBox={`0 0 ${W} 300`} className={`${g.glyph} ${styles.svg}`} role="img" aria-label={`${viz.filled} of ${viz.total}. ${viz.note}`}>
        {Array.from({ length: viz.total }, (_, i) => (
          <circle key={i} cx={68 + (i % 5) * 86} cy={90 + Math.floor(i / 5) * 86} r={26} className={i < viz.filled ? g.accent : g.cardWarn} />
        ))}
        <T x={44} y={270}>
          {viz.note}
        </T>
      </svg>
    );
  }
  if (viz.kind === "compare") {
    return (
      <svg viewBox={`0 0 ${W} 300`} className={`${g.glyph} ${styles.svg}`} role="img" aria-label={`${viz.rows.map((r) => `${r.label} ${r.value}`).join(", ")}. ${viz.note}`}>
        {viz.rows.map((r, i) => (
          <g key={r.label}>
            <T x={44} y={60 + i * 100} accent={r.accent}>
              {r.label} · {r.value}
            </T>
            <rect x={44} y={74 + i * 100} width={392} height={28} rx={6} className={g.card} />
            <rect x={44} y={74 + i * 100} width={(392 * r.value) / viz.max} height={28} rx={6} className={r.accent ? g.accent : g.muted} />
          </g>
        ))}
        <T x={44} y={270}>
          {viz.note}
        </T>
      </svg>
    );
  }
  if (viz.kind === "fan") {
    const n = viz.to.length;
    const gap = Math.min(52, 200 / Math.max(1, n - 1));
    const y0 = 140 - ((n - 1) * gap) / 2;
    return (
      <svg viewBox={`0 0 ${W} 300`} className={`${g.glyph} ${styles.svg}`} role="img" aria-label={`${viz.from} to ${viz.to.join(", ")}. ${viz.note}`}>
        {viz.to.map((t, i) => {
          const y = y0 + i * gap;
          return (
            <g key={t}>
              <path d={`M100 140 C 180 140, 200 ${y}, 270 ${y}`} className={g.strong} />
              <circle cx={280} cy={y} r={9} className={g.accentRing} />
              <T x={300} y={y + 4}>
                {t}
              </T>
            </g>
          );
        })}
        <circle cx={86} cy={140} r={14} className={g.accent} />
        <T x={86} y={180} anchor="middle" accent>
          {viz.from}
        </T>
        <T x={44} y={270}>
          {viz.note}
        </T>
      </svg>
    );
  }
  if (viz.kind === "timeline") {
    const x = (v: number) => 44 + (392 * v) / viz.end;
    return (
      <svg viewBox={`0 0 ${W} 300`} className={`${g.glyph} ${styles.svg}`} role="img" aria-label={`${viz.marks.map((m) => `${m.label} at ${m.at} ${viz.unit}`).join(", ")}. ${viz.note}`}>
        <path d={`M44 140 H436`} className={g.line} />
        <T x={44} y={170}>
          0
        </T>
        <T x={436} y={170} anchor="end">
          {viz.end} {viz.unit}
        </T>
        {viz.marks.map((m, i) => (
          <g key={m.label}>
            <rect x={x(m.from ?? 0)} y={128 - (i + 1) * 30} width={x(m.at) - x(m.from ?? 0)} height={14} rx={4} className={m.accent ? g.accent : g.accentMid} />
            <circle cx={x(m.at)} cy={140} r={8} className={m.accent ? g.accent : g.accentRing} />
            <T x={x(m.at) - 4} y={124 - (i + 1) * 30} anchor="end" accent={m.accent}>
              {m.label}
            </T>
          </g>
        ))}
        <T x={44} y={270}>
          {viz.note}
        </T>
      </svg>
    );
  }
  // ticks
  const step = 392 / (viz.count - 1);
  return (
    <svg viewBox={`0 0 ${W} 300`} className={`${g.glyph} ${styles.svg}`} role="img" aria-label={`${viz.label}. ${viz.note}`}>
      <path d="M44 130 H436" className={g.strong} />
      {Array.from({ length: viz.count }, (_, i) => (
        <g key={i}>
          <circle cx={44 + i * step} cy={130} r={14} className={g.accent} />
          <path d={`M${38 + i * step} 130 l5 5 9 -10`} fill="none" stroke="var(--surface-raised)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <T x={44} y={180} accent>
        {viz.label}
      </T>
      <T x={44} y={270}>
        {viz.note}
      </T>
    </svg>
  );
}
