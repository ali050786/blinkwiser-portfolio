import g from "@/components/ui/Glyph.module.css";
import { Diagram, T } from "./DiagramKit";

/**
 * Case 05, Dubai Municipality: nine apps into one, the card sorting workshop,
 * designing within a low-code platform, and the Arabic template. Redrawn, not the original files.
 */

const APPS = ["Dubai 24/7", "Green Ticket", "Al Mamzar", "Montaji", "Parks & Beaches", "Dubai Frame", "Quranic Park", "Ramsatna", "Dubai BPS"];

/** Nine separately built apps on the left, one app with five tabs on the right. */
export function NineIntoOne() {
  return (
    <Diagram
      label="Diagram · nine apps, one app"
      viewBox="0 0 720 320"
      aria="Nine separate Dubai Municipality apps, each built its own way: Dubai 24/7, Green Ticket, Al Mamzar, Montaji, Parks and Beaches, Dubai Frame, Quranic Park, Ramsatna and Dubai BPS. All of them feed one app with one sign-in, one search and five tabs."
      caption="Nine branded apps, each built and run separately. The unified app brings them under one sign-in, one search and five tabs."
    >
      <T x={30} y={26}>
        before · nine separate apps
      </T>
      {APPS.map((a, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 30 + col * 132;
        const y = 44 + row * 88;
        return (
          <g key={a}>
            <rect x={x} y={y} width={118} height={58} rx={8 + (i % 3) * 4} className={g.cardBack} />
            {i % 3 === 0 && <rect x={x + 10} y={y + 10} width={22} height={22} rx={4} className={g.tile} />}
            {i % 3 === 1 && <circle cx={x + 21} cy={y + 21} r={11} className={g.tile} />}
            {i % 3 === 2 && <path d={`M${x + 10} ${y + 32} L${x + 21} ${y + 10} L${x + 32} ${y + 32} Z`} className={g.tile} />}
            <rect x={x + 40} y={y + 14} width={60 - (i % 4) * 8} height={6} rx={3} className={g.muted} />
            <T x={x + 10} y={y + 50}>
              {a}
            </T>
            <path d={`M${x + 118} ${y + 29} C ${470} ${y + 29}, 480 160, 532 160`} className={g.faint} />
          </g>
        );
      })}
      <g transform="translate(540 34)">
        <rect width={150} height={262} rx={18} className={g.card} />
        <rect x={45} y={10} width={60} height={6} rx={3} className={g.muted} />
        <rect x={14} y={30} width={122} height={30} rx={15} className={g.soft} />
        <circle cx={32} cy={45} r={7} className={g.accentRing} />
        <rect x={46} y={42} width={60} height={6} rx={3} className={g.ink} />
        {[74, 112, 150].map((y) => (
          <rect key={y} x={14} y={y} width={122} height={30} rx={8} className={g.tile} />
        ))}
        <path d="M0 214 H150" className={g.faint} />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={19 + i * 28} cy={236} r={6} className={i === 0 ? g.accent : g.nodeModel} />
        ))}
      </g>
      <T x={615} y={316} anchor="middle" accent>
        one app · one sign-in · five tabs
      </T>
    </Diagram>
  );
}

/** Loose service cards on the left, placed by stakeholders into sections on the right. */
export function CardSort() {
  const loose = [
    { t: "food inquiry", x: 40, y: 70, r: -6 },
    { t: "furniture", x: 150, y: 58, r: 5 },
    { t: "collapse", x: 60, y: 130, r: 4 },
    { t: "Green Ticket", x: 170, y: 140, r: -4 },
    { t: "cleaning", x: 50, y: 200, r: -3 },
    { t: "site report", x: 165, y: 214, r: 6 },
  ];
  const cols = [
    { h: "trending", items: ["food inquiry", "furniture", "Green Ticket"] },
    { h: "land, building & construction", items: ["collapse", "site report", "no permit"] },
    { h: "more groups", items: ["cleaning", "hygiene"] },
  ];
  return (
    <Diagram
      label="Diagram · the card sorting workshop"
      viewBox="0 0 720 300"
      aria="On the left, service cards from all nine apps lie loose. On the right, stakeholders have placed them into sections: trending services, land, building and construction, and more groups."
      caption="Stakeholders placed every service card into a section, and the groups in the Services tab came out of that workshop. Card names are examples from the live app."
    >
      <T x={40} y={30}>
        every service, as a card
      </T>
      {loose.map((c) => (
        <g key={c.t} transform={`rotate(${c.r} ${c.x + 50} ${c.y + 14})`}>
          <rect x={c.x} y={c.y} width={104} height={28} rx={5} className={g.cardBack} />
          <T x={c.x + 8} y={c.y + 18}>
            {c.t}
          </T>
        </g>
      ))}
      <path d="M300 40 V270" className={g.faint} strokeDasharray="4 5" />
      <T x={300} y={290} anchor="middle" accent>
        stakeholders place each card
      </T>
      {cols.map((c, i) => {
        const x = 330 + i * 130;
        return (
          <g key={c.h}>
            <rect x={x} y={44} width={118} height={226} rx={10} className={g.card} />
            <T x={x + 10} y={66} accent={i === 1}>
              {c.h.length > 16 ? "land, building" : c.h}
            </T>
            {c.h.length > 16 && (
              <T x={x + 10} y={80} accent>
                & construction
              </T>
            )}
            {c.items.map((it, k) => (
              <g key={it}>
                <rect x={x + 8} y={96 + k * 38} width={102} height={28} rx={5} className={g.tile} />
                <T x={x + 16} y={114 + k * 38}>
                  {it}
                </T>
              </g>
            ))}
          </g>
        );
      })}
    </Diagram>
  );
}

/** What the low-code platform limited, and the workaround handed to the developers. */
export function MendixLimits() {
  const rows = ["layouts", "maps", "image import", "styling", "animation"];
  return (
    <Diagram
      label="Diagram · designing within a low-code platform"
      viewBox="0 0 720 280"
      aria="The low-code platform limited five things: layouts, maps, image import, styling and animation. Each limit led to a workaround the developers could build. For animation, the workaround was animations delivered as SVG files."
      caption="The low-code platform limited the layouts, maps, image imports and styling. Where it couldn't do something, I designed a workaround the developers could take in, like animations delivered as SVG files."
    >
      <T x={40} y={30}>
        what the platform limited
      </T>
      {rows.map((r, i) => {
        const y = 60 + i * 44;
        const anim = i === 4;
        return (
          <g key={r}>
            <rect x={40} y={y - 16} width={170} height={30} rx={6} className={g.cardBack} />
            <circle cx={58} cy={y - 1} r={5} className={g.cardWarn} />
            <T x={72} y={y + 3}>
              {r}
            </T>
            <path d={`M210 ${y - 1} C 300 ${y - 1}, 320 ${anim ? 236 : 120}, 410 ${anim ? 236 : 120}`} className={anim ? g.strong : g.faint} />
          </g>
        );
      })}
      <rect x={410} y={96} width={270} height={48} rx={10} className={g.card} />
      <T x={426} y={118}>
        workarounds the developers
      </T>
      <T x={426} y={134}>
        could build
      </T>
      <rect x={410} y={212} width={270} height={48} rx={10} className={g.card} />
      <rect x={424} y={226} width={20} height={20} rx={4} className={g.accent} />
      <T x={456} y={234} accent>
        animations I made myself,
      </T>
      <T x={456} y={250} accent>
        handed over as SVG files
      </T>
    </Diagram>
  );
}

/** English as the primary design, Arabic mirrored from one template rule. */
export function RtlTemplate() {
  const Phone = ({ x, rtl }: { x: number; rtl?: boolean }) => (
    <g transform={`translate(${x} 40)`}>
      <rect width={170} height={210} rx={16} className={rtl ? g.cardBack : g.card} />
      <rect x={rtl ? 86 : 14} y={18} width={70} height={8} rx={4} className={g.ink} />
      {[44, 88, 132].map((y) => (
        <g key={y}>
          <rect x={14} y={y} width={142} height={34} rx={8} className={g.tile} />
          <circle cx={rtl ? 138 : 32} cy={y + 17} r={9} className={g.accentRing} />
          <rect x={rtl ? 62 : 50} y={y + 14} width={58} height={6} rx={3} className={g.muted} />
        </g>
      ))}
      <path d="M0 184 H170" className={g.faint} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={rtl ? 151 - i * 33 : 19 + i * 33} cy={197} r={5} className={i === 0 ? g.accent : g.nodeModel} />
      ))}
    </g>
  );
  return (
    <Diagram
      label="Diagram · one layout, two languages"
      viewBox="0 0 720 300"
      aria="On the left, the English screen, designed as the primary layout. On the right, the Arabic screen, mirrored from a right-to-left template rule that the developers applied, so no screen was designed twice."
      caption="English was the primary design. Arabic followed a right-to-left template rule the developers applied, so no screen had to be designed twice."
    >
      <Phone x={90} />
      <T x={175} y={278} anchor="middle">
        English · the primary design
      </T>
      <path d="M360 40 V250" className={g.faint} strokeDasharray="4 5" />
      <T x={360} y={30} anchor="middle" accent>
        one template rule
      </T>
      <Phone x={460} rtl />
      <T x={545} y={278} anchor="middle">
        Arabic · mirrored by the rule
      </T>
    </Diagram>
  );
}
