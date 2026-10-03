import type { MetricVisualId } from "@/content/types";
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

  // four-flows
  const entries = ["open enrollment", "life event", "new hire", "admin on behalf"];
  const xs = [250, 300, 350, 400, 450];
  return (
    <svg viewBox="0 0 480 320" className={`${g.glyph} ${styles.svg}`} role="img" aria-label="Four ways in, open enrollment, life event, new hire and admin on behalf, all joining one shared five-step skeleton.">
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
