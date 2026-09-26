import type { GlyphId } from "@/content/types";
import styles from "./Glyph.module.css";

/**
 * Redrawn, brand-free diagrams of each study's core idea. They inherit the
 * study's accent through the semantic tokens, so they re-theme for free.
 */
export function Glyph({ id, className }: { id: GlyphId; className?: string }) {
  return (
    <svg viewBox="0 0 480 320" className={`${styles.glyph} ${className ?? ""}`} role="img" aria-label={labels[id]}>
      {glyphs[id]}
    </svg>
  );
}

const labels: Record<GlyphId, string> = {
  skills: "Diagram: stacked skill files feeding a composed screen",
  pipeline: "Diagram: an agent pipeline that forks into parallel steps and merges into a deck",
  tiers: "Diagram: three inheriting theme tiers, insurer, employer and member",
  flow: "Diagram: nine steps with a repeating loop collapsing into five linear steps",
  services: "Diagram: a search bar above services grouped by resident need",
};

const Lines = ({ x, y, widths, gap = 12 }: { x: number; y: number; widths: number[]; gap?: number }) => (
  <>
    {widths.map((w, i) => (
      <rect key={i} x={x} y={y + i * gap} width={w} height={5} rx={2.5} className={styles.ink} />
    ))}
  </>
);

const glyphs: Record<GlyphId, React.ReactNode> = {
  skills: (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${40 + i * 18} ${64 + i * 20})`}>
          <rect width="138" height="168" rx="12" className={i === 2 ? styles.card : styles.cardBack} />
          {i === 2 && (
            <>
              <rect x="14" y="14" width="62" height="16" rx="8" className={styles.soft} />
              <text x="22" y="26" className={styles.mono}>
                ds-tokens
              </text>
              <Lines x={14} y={46} widths={[104, 86, 96, 60]} />
              <rect x="14" y="104" width="14" height="14" rx="4" className={styles.accent} />
              <rect x="34" y="104" width="14" height="14" rx="4" className={styles.accentMid} />
              <rect x="54" y="104" width="14" height="14" rx="4" className={styles.soft} />
              <Lines x={14} y={132} widths={[92, 70]} />
            </>
          )}
        </g>
      ))}
      <path d="M216 176 C 238 176, 244 150, 268 150" className={styles.flowPath} />
      <circle cx="268" cy="150" r="3.5" className={styles.accent} />
      <g transform="translate(276 64)">
        <rect width="170" height="196" rx="14" className={styles.card} />
        <rect x="0" y="0" width="170" height="28" rx="14" className={styles.muted} />
        <rect x="0" y="14" width="170" height="14" className={styles.muted} />
        <circle cx="16" cy="14" r="5" className={styles.accent} />
        <rect x="14" y="42" width="40" height="140" rx="6" className={styles.muted} />
        {[
          [64, 42, 92, 44, true],
          [64, 94, 43, 40, false],
          [113, 94, 43, 40, false],
          [64, 142, 92, 40, false],
        ].map(([x, y, w, h, hi], i) => (
          <g key={i}>
            <rect x={x as number} y={y as number} width={w as number} height={h as number} rx="6" className={hi ? styles.soft : styles.tile} />
            <path
              d={`M${(x as number) + (w as number) - 8} ${(y as number) + 4} l4 4 -4 4 -4 -4Z`}
              className={styles.accent}
            />
          </g>
        ))}
      </g>
    </g>
  ),

  pipeline: (
    <g>
      {[
        "M52 160 H100",
        "M112 160 H152",
        "M176 160 C 196 160, 196 104, 222 104",
        "M176 160 C 196 160, 196 216, 222 216",
        "M238 104 C 262 104, 262 160, 284 160",
        "M238 216 C 262 216, 262 160, 284 160",
        "M308 160 C 328 160, 328 104, 350 104",
        "M308 160 C 328 160, 328 216, 350 216",
        "M366 104 C 390 104, 390 160, 404 160",
        "M366 216 C 390 216, 390 160, 404 160",
      ].map((d, i) => (
        <path key={i} d={d} className={styles.line} />
      ))}
      <path d="M52 160 H100 M112 160 H152 M176 160 C 196 160, 196 104, 222 104 M238 104 C 262 104, 262 160, 284 160 M308 160 C 328 160, 328 216, 350 216 M366 216 C 390 216, 390 160, 404 160" className={styles.pulse} />
      <circle cx="44" cy="160" r="8" className={styles.nodeModel} />
      <circle cx="106" cy="160" r="8" className={styles.nodeModel} />
      <rect x="152" y="148" width="24" height="24" rx="6" className={styles.accent} />
      <circle cx="230" cy="104" r="8" className={styles.nodeModel} />
      <circle cx="230" cy="216" r="8" className={styles.nodeModel} />
      <rect x="284" y="148" width="24" height="24" rx="6" className={styles.accent} />
      <circle cx="358" cy="104" r="8" className={styles.nodeModel} />
      <circle cx="358" cy="216" r="8" className={styles.nodeModel} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={404 + i * 6} y={134 - i * 6} width="40" height="52" rx="6" className={i === 2 ? styles.card : styles.cardBack} />
      ))}
      <rect x="424" y="130" width="22" height="5" rx="2.5" className={styles.accent} />
      <rect x="424" y="142" width="16" height="5" rx="2.5" className={styles.ink} />
      <rect x="40" y="270" width="12" height="12" rx="3" className={styles.accent} />
      <text x="60" y="280" className={styles.mono}>
        checked in code
      </text>
      <circle cx="186" cy="276" r="6" className={styles.nodeModel} />
      <text x="200" y="280" className={styles.mono}>
        model call
      </text>
    </g>
  ),

  tiers: (
    <g>
      {[
        { x: 56, y: 44, label: "insurer" },
        { x: 104, y: 92, label: "employer" },
        { x: 152, y: 140, label: "member" },
      ].map((t, i) => (
        <g key={t.label} transform={`translate(${t.x} ${t.y})`}>
          <rect width="272" height="148" rx="14" className={i === 2 ? styles.card : styles.cardBack} />
          <text x="16" y="26" className={styles.mono}>
            {t.label}
          </text>
          <circle cx={226} cy={22} r={6} className={i === 0 ? styles.accent : styles.tile} />
          <circle cx={242} cy={22} r={6} className={i === 1 ? styles.accentMid : styles.tile} />
          <circle cx={258} cy={22} r={6} className={i === 2 ? styles.soft : styles.tile} />
          {i === 2 && (
            <>
              <rect x="16" y="44" width="240" height="24" rx="6" className={styles.accent} />
              <rect x="16" y="78" width="116" height="52" rx="8" className={styles.soft} />
              <rect x="140" y="78" width="116" height="52" rx="8" className={styles.tile} />
              <rect x="28" y="92" width="60" height="5" rx="2.5" className={styles.accent} />
              <rect x="28" y="104" width="80" height="5" rx="2.5" className={styles.ink} />
            </>
          )}
        </g>
      ))}
      <path d="M40 64 V 250 M40 112 H100 M40 160 H148" className={styles.flowPath} />
      <circle cx="40" cy="64" r="3.5" className={styles.accent} />
    </g>
  ),

  flow: (
    <g>
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 52 + i * 47;
        const target = [0, 1, 2, 2, 2, 3, 3, 3, 4][i]!;
        return <path key={`l${i}`} d={`M${x} 92 C ${x} 160, ${52 + target * 94} 160, ${52 + target * 94} 226`} className={styles.faint} />;
      })}
      <path d="M287 72 C 300 30, 380 30, 381 72" className={styles.flowPath} />
      <text x="318" y="36" className={styles.mono}>
        ×3 loop
      </text>
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={52 + i * 47} cy={84} r={8} className={[2, 3, 4, 7].includes(i) ? styles.cardWarn : styles.nodeModel} />
      ))}
      <text x="44" y="120" className={styles.mono}>
        before · 9 steps
      </text>
      <path d="M52 234 H428" className={styles.strong} />
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={i} cx={52 + i * 94} cy={234} r={i === 3 ? 13 : 10} className={i === 3 ? styles.accent : styles.accentRing} />
      ))}
      <text x="44" y="276" className={styles.mono}>
        after · 5 steps · asked once
      </text>
    </g>
  ),

  services: (
    <g>
      <rect x="92" y="36" width="296" height="40" rx="20" className={styles.searchPill} />
      <circle cx="116" cy="56" r="7" className={styles.line} />
      <path d="M121 61 l6 6" className={styles.line} />
      <rect x="134" y="53" width="120" height="6" rx="3" className={styles.ink} />
      {[0, 1, 2].map((c) => (
        <g key={c} transform={`translate(${56 + c * 128} 112)`}>
          <path d={`M${56} -36 V 0`} className={styles.faint} />
          <rect width="112" height="28" rx="14" className={styles.soft} />
          <rect x="14" y="11" width={[56, 48, 64][c]} height="6" rx="3" className={styles.accent} />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect y={40 + r * 34} width="112" height="26" rx="8" className={styles.tile} />
              <rect x="12" y={50 + r * 34} width={[70, 54, 62, 48, 76, 58, 66, 50, 72][c * 3 + r]} height="5" rx="2.5" className={styles.ink} />
            </g>
          ))}
        </g>
      ))}
      <text x="56" y="296" className={styles.mono}>
        EN
      </text>
      <rect x="80" y="288" width="120" height="6" rx="3" className={styles.ink} />
      <rect x="280" y="288" width="120" height="6" rx="3" className={styles.ink} />
      <text x="412" y="297" className={styles.arabic}>
        ع
      </text>
    </g>
  ),
};
