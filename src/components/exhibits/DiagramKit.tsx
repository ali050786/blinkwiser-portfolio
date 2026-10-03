import g from "@/components/ui/Glyph.module.css";
import d from "./Diagrams.module.css";

/**
 * Shared pieces for the line diagrams. Each diagram has a wide drawing for
 * desktop and, optionally, a vertical drawing for phones; CSS shows one.
 */
export type MobileDrawing = { viewBox: string; node: React.ReactNode };

export function Diagram({
  label,
  viewBox,
  aria,
  caption,
  mobile,
  children,
}: {
  label: string;
  viewBox: string;
  aria: string;
  caption: string;
  mobile?: MobileDrawing;
  children: React.ReactNode;
}) {
  return (
    <figure className={d.fig} data-reveal>
      <p className={`t-label ${d.label}`}>{label}</p>
      <div className={d.scroll} data-has-mobile={mobile ? "" : undefined}>
        <svg viewBox={viewBox} className={`${g.glyph} ${d.svg} ${mobile ? d.desk : ""}`} role="img" aria-label={aria}>
          {children}
        </svg>
        {mobile && (
          <svg viewBox={mobile.viewBox} className={`${g.glyph} ${d.mob}`} role="img" aria-label={aria}>
            {mobile.node}
          </svg>
        )}
      </div>
      <figcaption className="t-body-s c-secondary">{caption}</figcaption>
    </figure>
  );
}

export const T = ({
  x,
  y,
  children,
  anchor = "start",
  warn,
  accent,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  warn?: boolean;
  accent?: boolean;
}) => (
  <text x={x} y={y} textAnchor={anchor} className={`${g.mono} ${warn ? d.warnText : ""} ${accent ? d.accentText : ""}`}>
    {children}
  </text>
);

/**
 * Phone layout for the "two options" diagrams: the rejected path on top, the
 * chosen path below, each as a vertical chain with labels to the right.
 */
type Path = {
  title: string;
  items: string[];
  warn?: number[];
  accent?: number[];
  big?: number;
  diamond?: number;
  diamondLabel?: string;
  loop?: { from: number; to: number; label: [string, string] };
  notes: [string, string];
};

export function twoPaths(top: Path, bottom: Path, width = 360): MobileDrawing {
  const step = 44;
  const parts: React.ReactNode[] = [];
  let y = 24;
  const draw = (p: Path, chosen: boolean, key: string) => {
    parts.push(
      <T key={`${key}t`} x={24} y={y}>
        {p.title}
      </T>,
    );
    const y0 = y + 32;
    const ys = p.items.map((_, i) => y0 + i * step);
    parts.push(<path key={`${key}l`} d={`M40 ${ys[0]} V${ys[ys.length - 1]}`} className={chosen ? g.strong : g.faint} />);
    p.items.forEach((t, i) => {
      const yy = ys[i]!;
      const isWarn = p.warn?.includes(i);
      const isAccent = p.accent?.includes(i);
      if (p.diamond === i) {
        parts.push(
          <rect key={`${key}d${i}`} x={31} y={yy - 9} width={18} height={18} rx={3} transform={`rotate(45 40 ${yy})`} className={g.accentRing} />,
        );
      } else {
        parts.push(
          <circle
            key={`${key}c${i}`}
            cx={40}
            cy={yy}
            r={p.big === i ? 13 : 10}
            className={isWarn ? g.cardWarn : p.big === i ? g.accent : chosen ? g.accentRing : g.nodeModel}
          />,
        );
      }
      const text = p.diamond === i ? p.diamondLabel ?? t : t;
      if (text)
        parts.push(
          <T key={`${key}x${i}`} x={64} y={yy + 4} warn={isWarn} accent={isAccent || p.diamond === i || p.big === i}>
            {text}
          </T>,
        );
    });
    if (p.loop) {
      const a = ys[p.loop.from]!;
      const b = ys[p.loop.to]!;
      parts.push(<path key={`${key}lp`} d={`M200 ${a} H222 V${b} H200`} className={d.gapThin} />);
      parts.push(
        <T key={`${key}lp1`} x={232} y={(a + b) / 2 - 4} warn>
          {p.loop.label[0]}
        </T>,
        <T key={`${key}lp2`} x={232} y={(a + b) / 2 + 12} warn>
          {p.loop.label[1]}
        </T>,
      );
    }
    const ny = ys[ys.length - 1]! + 40;
    parts.push(
      <T key={`${key}n1`} x={24} y={ny}>
        {p.notes[0]}
      </T>,
      <T key={`${key}n2`} x={24} y={ny + 16} warn={!chosen} accent={chosen}>
        {p.notes[1]}
      </T>,
    );
    y = ny + 56;
  };
  draw(top, false, "a");
  draw(bottom, true, "b");
  return { viewBox: `0 0 ${width} ${y - 24}`, node: <>{parts}</> };
}
