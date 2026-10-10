import Link from "next/link";
import { capabilities } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { Icon } from "@/components/ui/Icon";
import { SectionHead, Cross } from "./Section";
import s from "./Section.module.css";
import styles from "./Capabilities.module.css";
import g from "@/components/ui/Glyph.module.css";

/*
 * What I bring: four areas in one framed 2x2 grid, all visible at once.
 * No pinning and no scroll-driven motion. One column on phones.
 */

const shortOf = (slug: string) => caseStudies.find((c) => c.slug === slug)?.short ?? slug;

export function Capabilities() {
  return (
    <section className={s.section} aria-labelledby="cap-title">
      <div className={s.wrap}>
        <SectionHead label="Strengths" id="cap-title" lead="What I'd bring" turn="to your team." />

        <div className={styles.grid} data-reveal>
          <Cross className={styles.c1} />
          <Cross className={styles.c2} />
          <Cross className={styles.c3} />
          <Cross className={styles.c4} />
          {capabilities.map((c) => (
            <article key={c.tag} className={styles.cell} aria-labelledby={`cap-${c.visual}`}>
              <p className={styles.tag}>{c.tag}</p>
              <div className={styles.visual}>
                <Visual kind={c.visual} />
              </div>
              <h3 id={`cap-${c.visual}`} className={styles.title}>
                {c.title}
              </h3>
              <p className={styles.line}>{c.line}</p>
              <ul className={styles.items}>
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <ul className={styles.chips} aria-label={`Case studies for ${c.title}`}>
                {c.cases.map((slug) => (
                  <li key={slug}>
                    <Link href={`/work/${slug}`}>
                      {shortOf(slug)} <Icon name="arrow-right" size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Line glyphs, one per stage, in the same language as the case-card glyphs. No frame. */
const glyphLabels: Record<(typeof capabilities)[number]["visual"], string> = {
  domain: "Diagram: a family-by-coverage grid. Each family member is a row, medical, dental, and vision are columns, a newborn's row has just been added, and a running monthly total sits underneath.",
  systems: "Diagram: three client brands feed one set of color roles (primary, text, and surface), which feed the same component.",
  people: "Diagram: a lead and four designers at the center, workshops with business analysts and engineering above, and research with insurers, employers, and members below.",
  ai: "Diagram: skill files feed an AI agent that builds a screen, and every screen goes through a check before it loops back.",
};

function Visual({ kind }: { kind: (typeof capabilities)[number]["visual"] }) {
  return (
    <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.glyph}`} role="img" aria-label={glyphLabels[kind]}>
      {kind === "domain" && <DomainGlyph />}
      {kind === "systems" && <SystemsGlyph />}
      {kind === "people" && <PeopleGlyph />}
      {kind === "ai" && <AiGlyph />}
    </svg>
  );
}

const Bars = ({ x, y, widths, gap = 10 }: { x: number; y: number; widths: number[]; gap?: number }) => (
  <>
    {widths.map((w, i) => (
      <rect key={i} x={x} y={y + i * gap} width={w} height={5} rx={2.5} className={g.ink} />
    ))}
  </>
);

const Check = ({ cx, cy }: { cx: number; cy: number }) => <path d={`M${cx - 5} ${cy} l3.5 3.5 6.5 -7`} className={styles.gCheck} />;

/** Who needs what: one grid for the family, a new row for the newborn, the total underneath. */
function DomainGlyph() {
  const rows = [90, 132, 174, 216];
  const cols = [262, 312, 362];
  const covered = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
  ];
  return (
    <g>
      <rect x="70" y="30" width="340" height="262" rx="14" className={g.card} />
      <rect x="70" y="30" width="340" height="34" rx="14" className={g.muted} />
      <rect x="70" y="50" width="340" height="14" className={g.muted} />
      <Bars x={88} y={45} widths={[78]} />
      {["med", "den", "vis"].map((c, i) => (
        <text key={c} x={cols[i]} y={52} textAnchor="middle" className={g.mono}>
          {c}
        </text>
      ))}
      <rect x="80" y="196" width="320" height="40" rx="8" className={g.soft} />
      {[111, 153].map((y) => (
        <path key={y} d={`M86 ${y} H394`} className={g.faint} />
      ))}
      {rows.map((y, r) => (
        <g key={y}>
          <circle cx="100" cy={y} r="11" className={r === 3 ? g.accentRing : g.tile} />
          <Bars x={122} y={y - 7} widths={[[64, 40], [52, 34], [58, 30], [44, 28]][r]!} />
          {cols.map((x, c) =>
            covered[r]![c] ? (
              <g key={x}>
                <rect x={x - 11} y={y - 11} width="22" height="22" rx="6" className={g.accent} />
                <Check cx={x} cy={y} />
              </g>
            ) : (
              <rect key={x} x={x - 11} y={y - 11} width="22" height="22" rx="6" className={g.tile} />
            ),
          )}
        </g>
      ))}
      <rect x="180" y="207" width="34" height="18" rx="9" className={g.card} />
      <text x="197" y="220" textAnchor="middle" className={g.mono}>
        new
      </text>
      <rect x="86" y="250" width="308" height="28" rx="7" className={g.muted} />
      <text x="100" y="268" className={g.mono}>
        total / month
      </text>
      <rect x="300" y="261" width="80" height="6" rx="3" className={g.accent} />
    </g>
  );
}

/** Three tiers: each client's brand fills the same roles, and the roles drive every component. */
function SystemsGlyph() {
  const ys = [96, 162, 228];
  const swatch = [g.accent, g.accentMid, g.soft];
  const roles = ["primary", "text", "surface"];
  return (
    <g>
      {["brand", "role", "component"].map((h, i) => (
        <text key={h} x={[72, 232, 394][i]} y={46} textAnchor="middle" className={g.mono}>
          {h}
        </text>
      ))}
      {ys.map((y, i) => (
        <rect key={y} x="48" y={y - 24} width="48" height="48" rx="10" className={swatch[i]} />
      ))}
      <path d="M96 96 H168" className={g.strong} />
      <path d="M96 162 C 134 162, 132 100, 168 100" className={g.faint} />
      <path d="M96 228 C 138 228, 136 104, 168 104" className={g.faint} />
      {ys.map((y, i) => (
        <g key={y}>
          <rect x="168" y={y - 16} width="128" height="32" rx="16" className={g.card} />
          <circle cx="188" cy={y} r="6" className={[g.accent, g.nodeModel, g.tile][i]} />
          <text x="202" y={y + 4} className={g.mono}>
            {roles[i]}
          </text>
        </g>
      ))}
      <path d="M296 96 C 330 96, 318 236, 352 236" className={g.flowPath} />
      <path d="M296 162 C 318 162, 318 118, 340 118" className={g.faint} />
      <path d="M296 228 C 318 228, 318 186, 340 186" className={g.faint} />
      <g transform="translate(340 66)">
        <rect width="108" height="200" rx="12" className={g.card} />
        <rect width="108" height="26" rx="12" className={g.muted} />
        <rect y="13" width="108" height="13" className={g.muted} />
        <circle cx="14" cy="13" r="4" className={g.accent} />
        <Bars x={14} y={44} widths={[78, 62, 70]} />
        <rect x="14" y="88" width="80" height="62" rx="8" className={g.tile} />
        <rect x="14" y="158" width="80" height="26" rx="8" className={g.accent} />
      </g>
      <circle cx="352" cy="236" r="3.5" className={g.accent} />
    </g>
  );
}

/** Who the work runs through: a lead and four designers, workshops above, research below. */
function PeopleGlyph() {
  const cx = 240;
  const cy = 160;
  const top = [
    { x: 92, y: 74, t: "business analysts" },
    { x: 388, y: 74, t: "engineering" },
  ];
  const bottom = [
    { x: 86, y: 252, t: "insurers" },
    { x: 240, y: 274, t: "employers" },
    { x: 394, y: 252, t: "members" },
  ];
  const dots = [45, 135, 225, 315].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + 46 * Math.cos(a), y: cy + 46 * Math.sin(a) };
  });
  return (
    <g>
      {top.map((o) => (
        <path key={o.t} d={`M${cx} ${cy} L${o.x} ${o.y}`} className={g.line} />
      ))}
      {bottom.map((o) => (
        <path key={o.t} d={`M${cx} ${cy} L${o.x} ${o.y}`} className={styles.gDash} />
      ))}
      <circle cx={cx} cy={cy} r="46" className={styles.gOrbit} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="6" className={g.accent} />
      ))}
      <circle cx={cx} cy={cy} r="22" className={g.accentRing} />
      <text x={cx} y={cy + 4} textAnchor="middle" className={styles.gStrong}>
        lead
      </text>
      <text x={cx + 56} y={cy + 4} className={styles.gAccent}>
        4 designers
      </text>
      {[...top, ...bottom].map((o) => (
        <g key={o.t}>
          <circle cx={o.x} cy={o.y} r="8" className={g.nodeModel} />
          <text x={o.x} y={o.y < cy ? o.y - 18 : o.y + 26} textAnchor="middle" className={g.mono}>
            {o.t}
          </text>
        </g>
      ))}
      <text x={cx} y="40" textAnchor="middle" className={styles.gAccent}>
        workshops
      </text>
      <text x={cx} y="232" textAnchor="middle" className={`${styles.gAccent} ${styles.gHalo}`}>
        research
      </text>
    </g>
  );
}

/** Skill files feed the agent, the agent builds the screen, and every screen is checked. */
function AiGlyph() {
  return (
    <g>
      <rect x="36" y="76" width="80" height="104" rx="10" className={g.cardBack} />
      <rect x="46" y="88" width="80" height="104" rx="10" className={g.cardBack} />
      <g transform="translate(56 100)">
        <rect width="84" height="108" rx="10" className={g.card} />
        <rect x="10" y="10" width="40" height="16" rx="8" className={g.soft} />
        <text x="16" y="22" className={g.mono}>
          skill
        </text>
        <Bars x={10} y={38} widths={[62, 50, 56, 36]} />
        <rect x="10" y="84" width="12" height="12" rx="3" className={g.accent} />
        <rect x="26" y="84" width="12" height="12" rx="3" className={g.accentMid} />
      </g>
      <text x="98" y="232" textAnchor="middle" className={g.mono}>
        skills
      </text>
      <path d="M140 154 C 176 154, 178 150, 206 150" className={g.flowPath} />
      <circle cx="206" cy="150" r="3.5" className={g.accent} />
      <circle cx="240" cy="150" r="30" className={g.accentRing} />
      <circle cx="240" cy="150" r="9" className={g.accent} />
      <text x="240" y="108" textAnchor="middle" className={g.mono}>
        agent
      </text>
      <path d="M270 150 C 298 150, 302 150, 326 150" className={g.flowPath} />
      <circle cx="326" cy="150" r="3.5" className={g.accent} />
      <g transform="translate(330 88)">
        <rect width="118" height="128" rx="12" className={g.card} />
        <rect width="118" height="24" rx="12" className={g.muted} />
        <rect y="12" width="118" height="12" className={g.muted} />
        <rect x="10" y="34" width="26" height="82" rx="5" className={g.muted} />
        <rect x="44" y="34" width="64" height="38" rx="6" className={g.soft} />
        <rect x="44" y="78" width="64" height="16" rx="5" className={g.tile} />
        <rect x="70" y="100" width="38" height="16" rx="6" className={g.accent} />
      </g>
      <text x="389" y="236" textAnchor="middle" className={g.mono}>
        screen
      </text>
      <path d="M389 246 C 389 292, 300 296, 268 286 C 246 279, 240 230, 240 182" className={styles.gDashAccent} />
      <circle cx="318" cy="290" r="12" className={g.accentRing} />
      <path d="M312 290 l4 4 7 -8" className={styles.gCheckAccent} />
      <text x="318" y="320" textAnchor="middle" className={styles.gAccent}>
        check
      </text>
    </g>
  );
}
