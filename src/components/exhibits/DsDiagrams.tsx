import g from "@/components/ui/Glyph.module.css";
import d from "./Diagrams.module.css";
import { Diagram, T } from "./DiagramKit";
import * as M from "./MobileDiagrams";

/**
 * Diagrams for the AI-readable design system case, in the same language as the
 * enrollment ones: plain nodes, red dashed for the problem, accent for the fix.
 * Generic names only; no client brands, screens or real token names.
 */

/** Frame: the AI could read the file, but the rules lived in designers' heads. */
export function RulesInHeads() {
  const xs = [40, 192, 344];
  const ai = { x: 572, y: 140 };
  const read = ["components", "color variables", "type styles"];
  const heads = ["which color = link", "which grid per page", "how screens compose"];
  return (
    <Diagram
      mobile={M.rulesInHeads()}
      label="Diagram · what the AI had to work with"
      viewBox="0 0 720 290"
      aria="Top row: components, color variables, and type styles. All were in the Figma file, and the AI read them. Bottom row, in red and dashed: which color is a link, which grid a page uses, and how screens compose. These rules lived only in designers' heads, so the AI's screens came back off-brand."
      caption="The AI could read every component and variable in the file. The rules for using them were never written down, so they never reached it, and each screen came back off-brand. Illustration with generic names."
    >
      <T x={40} y={28}>
        in the Figma file · the AI could read it
      </T>
      {xs.map((x, i) => (
        <g key={`r${i}`}>
          <path d={`M${x + 70} 82 C ${x + 70} 140, ${ai.x - 120} ${ai.y}, ${ai.x - 14} ${ai.y}`} className={g.faint} />
          <rect x={x} y={46} width={140} height={36} rx={8} className={g.card} />
          <T x={x + 70} y={68} anchor="middle">
            {read[i]}
          </T>
        </g>
      ))}

      {xs.map((x, i) => (
        <g key={`h${i}`}>
          <rect x={x} y={198} width={140} height={36} rx={8} className={g.cardWarn} />
          <T x={x + 70} y={220} anchor="middle" warn>
            {heads[i]}
          </T>
        </g>
      ))}
      <T x={40} y={262} warn>
        in designers&apos; heads · never written down, never reached the AI
      </T>

      <circle cx={ai.x} cy={ai.y} r={14} className={g.nodeModel} />
      <T x={ai.x} y={ai.y - 26} anchor="middle">
        the AI
      </T>
      <path d={`M${ai.x + 14} ${ai.y} H${ai.x + 74}`} className={g.line} />
      <rect x={ai.x + 76} y={ai.y - 22} width={56} height={44} rx={6} className={g.cardWarn} />
      <rect x={ai.x + 84} y={ai.y - 12} width={22} height={5} rx={2.5} className={g.ink} />
      <rect x={ai.x + 84} y={ai.y - 2} width={36} height={5} rx={2.5} className={g.ink} />
      <rect x={ai.x + 84} y={ai.y + 8} width={14} height={6} rx={2} className={g.accent} />
      <T x={ai.x + 104} y={ai.y + 44} anchor="middle" warn>
        off-brand
      </T>
    </Diagram>
  );
}

/** Stakes: two queues waiting on the same hand-drawn mockup. */
export function TwoLoops() {
  const mid = { x: 360, y: 140 };
  const lanes = [
    { y: 64, from: "Jira story", to: "dev checks feasibility", who: "Business analysts and developers", time: "1 or 2 weeks per story" },
    { y: 216, from: "prospective client", to: "branded sales demo", who: "Sales and marketing", time: "about 2 days per demo mockup" },
  ];
  return (
    <Diagram
      mobile={M.twoLoops()}
      label="Diagram · two queues, one bottleneck"
      viewBox="0 0 720 290"
      aria="Two lanes share one bottleneck. In the first, business analysts and developers wait 1 to 2 weeks per Jira story for a mockup before developers can check feasibility. In the second, sales waits about 2 days per mockup for a branded demo. Both wait on one senior designer drawing screens by hand."
      caption="Every feasibility check and every sales demo waited on the same thing: a senior designer drawing the screen by hand. Timings are what the team has seen, not measurements."
    >
      {lanes.map((l) => (
        <g key={l.from}>
          <T x={40} y={l.y - 22}>
            {l.who}
          </T>
          <path d={`M108 ${l.y} C 220 ${l.y}, 250 ${mid.y}, ${mid.x - 22} ${mid.y}`} className={g.line} />
          <path d={`M${mid.x + 22} ${mid.y} C 470 ${mid.y}, 500 ${l.y}, 600 ${l.y}`} className={d.gapThin} />
          <circle cx={100} cy={l.y} r={9} className={g.nodeModel} />
          <T x={100} y={l.y + 28} anchor="middle">
            {l.from}
          </T>
          <circle cx={608} cy={l.y} r={9} className={g.nodeModel} />
          <T x={680} y={l.y + 28} anchor="end">
            {l.to}
          </T>
          <T x={680} y={l.y - 22} anchor="end" warn>
            {l.time}
          </T>
        </g>
      ))}
      <circle cx={mid.x} cy={mid.y} r={20} className={g.cardWarn} />
      <rect x={mid.x - 8} y={mid.y - 8} width={16} height={16} rx={3} className={g.ink} />
      <T x={mid.x} y={mid.y - 32} anchor="middle" warn>
        a senior designer
      </T>
      <T x={mid.x} y={mid.y + 40} anchor="middle" warn>
        draws it by hand
      </T>
    </Diagram>
  );
}

/** Fork 1: prompting harder loops on the same gaps; a legible system goes straight through. */
export function PromptVsSystem() {
  const xs = [60, 180, 300, 420];
  return (
    <Diagram
      mobile={M.promptVsSystem()}
      label="Diagram · the two options"
      viewBox="0 0 720 270"
      aria="Two paths. Tune the prompts: the same system, a prompt, the AI, an off-brand screen, and a loop back to prompt again. Make the system legible: rules written down, the AI reads them first, a screen checked against the rules, no loop."
      caption="Better prompts fed the AI the same gaps, so the loop never ended. Writing the rules down changed what the AI reads before it starts."
    >
      <T x={40} y={16}>
        tune the prompts
      </T>
      <path d={`M${xs[0]} 76 H${xs[3]}`} className={g.faint} />
      {["same system", "prompt", "the AI", "screen"].map((t, i) => (
        <g key={t}>
          <circle cx={xs[i]} cy={76} r={10} className={i === 3 ? g.cardWarn : g.nodeModel} />
          <T x={xs[i]!} y={106} anchor="middle" warn={i === 3}>
            {t}
          </T>
        </g>
      ))}
      <path d={`M${xs[3]} 64 C ${xs[3]} 40, ${xs[1]} 40, ${xs[1]} 64`} className={d.gapThin} />
      <T x={(xs[1]! + xs[3]!) / 2} y={36} anchor="middle" warn>
        off-brand · prompt again
      </T>
      <T x={480} y={72}>better prompts · same gaps</T>
      <T x={480} y={90} warn>
        the rules are still missing
      </T>

      <T x={40} y={162}>
        make the system legible
      </T>
      <path d={`M${xs[0]} 206 H${xs[3]}`} className={g.strong} />
      {["rules written", "the AI reads them", "", "screen"].map((t, i) =>
        i === 2 ? null : (
          <g key={`b${i}`}>
            <circle cx={xs[i]} cy={206} r={i === 0 ? 13 : 10} className={i === 0 ? g.accent : g.accentRing} />
            <T x={xs[i]!} y={236} anchor="middle" accent={i === 0}>
              {t}
            </T>
          </g>
        ),
      )}
      <rect x={xs[2]! - 9} y={197} width={18} height={18} rx={3} transform={`rotate(45 ${xs[2]} 206)`} className={g.accentRing} />
      <T x={xs[2]!} y={184} anchor="middle" accent>
        self-check
      </T>
      <T x={480} y={202}>one pass · no loop</T>
      <T x={480} y={220} accent>
        checked against the written rules
      </T>
    </Diagram>
  );
}

/** Fork 4: plain-markdown skills run on any agent, and an audit keeps docs and file in step. */
export function PortableSkills() {
  const hub = { x: 170, y: 92 };
  const targets = [
    { y: 44, label: "Figma's agent · today", on: true },
    { y: 92, label: "Claude Code, via Figma MCP", on: false },
    { y: 140, label: "any agent that reads markdown", on: false },
  ];
  return (
    <Diagram
      mobile={M.portableSkills()}
      label="Diagram · portable and self-checking"
      viewBox="0 0 720 300"
      aria="Top: one set of skill files in plain markdown. They connect to Figma's agent today, and can move to Claude Code through a Figma MCP or to any agent that reads markdown. Bottom: an audit skill compares the Figma file with the docs every session. A memory skill carries decisions forward."
      caption="The rules are plain text, so no one vendor owns them. The audit compares the docs with the file every session, so the system can't quietly drift the way the old one did."
    >
      {[2, 1, 0].map((i) => (
        <rect key={i} x={60 + i * 8} y={58 + i * 8} width={96} height={56} rx={8} className={i === 0 ? g.card : g.cardBack} />
      ))}
      <rect x={72} y={72} width={52} height={5} rx={2.5} className={g.ink} />
      <rect x={72} y={84} width={70} height={5} rx={2.5} className={g.ink} />
      <rect x={72} y={96} width={40} height={5} rx={2.5} className={g.ink} />
      <T x={60} y={146}>
        skill files
      </T>
      <T x={60} y={162} accent>
        plain markdown
      </T>
      {targets.map((t) => (
        <g key={t.label}>
          <path d={`M${hub.x} ${hub.y} C 260 ${hub.y}, 280 ${t.y}, 380 ${t.y}`} className={t.on ? g.strong : g.flowPath} />
          <circle cx={388} cy={t.y} r={t.on ? 10 : 8} className={t.on ? g.accent : g.accentRing} />
          <T x={408} y={t.y + 4} accent={t.on}>
            {t.label}
          </T>
        </g>
      ))}

      <path d="M40 196 H680" className={g.faint} />
      <rect x={60} y={222} width={130} height={40} rx={8} className={g.card} />
      <T x={125} y={246} anchor="middle">
        the Figma file
      </T>
      <rect x={530} y={222} width={130} height={40} rx={8} className={g.card} />
      <T x={595} y={246} anchor="middle">
        the docs
      </T>
      <path d="M190 242 H268" className={g.strong} />
      <path d="M452 242 H530" className={g.strong} />
      <rect x={268} y={227} width={184} height={30} rx={15} className={d.band} />
      <T x={360} y={247} anchor="middle" accent>
        audit · every session
      </T>
      <T x={360} y={286} anchor="middle">
        a memory skill carries decisions to the next session
      </T>
    </Diagram>
  );
}

/** Outcome: how it spread, and where I stopped it on purpose. */
export function AdoptionSpread() {
  return (
    <Diagram
      mobile={M.adoptionSpread()}
      label="Diagram · how it spread"
      viewBox="0 0 720 230"
      aria="From me, who built and proved it, to the four designers on my team, to the organization's UAT team, who chose it for their own projects. Business analysts are a dashed node: held back on purpose."
      caption="No mandate. I built it and proved it, my four designers moved onto it, and a team outside mine chose it for their own projects. Business analysts are held back on purpose: they could mock screens with it, but would likely skip the UX thinking first."
    >
      <path d="M84 110 H180" className={g.strong} />
      <path d="M244 110 H340" className={g.strong} />
      <path d="M446 110 H610" className={d.gapThin} />

      <circle cx={70} cy={110} r={14} className={g.accent} />
      <T x={70} y={70} anchor="middle" accent>
        me
      </T>
      <T x={70} y={150} anchor="middle">
        built, proved
      </T>

      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={200 + (i % 2) * 24} cy={98 + Math.floor(i / 2) * 24} r={9} className={g.accentRing} />
      ))}
      <T x={212} y={70} anchor="middle" accent>
        4 designers
      </T>
      <T x={212} y={150} anchor="middle">
        my team
      </T>

      {Array.from({ length: 7 }, (_, i) => (
        <circle key={i} cx={360 + (i % 4) * 22 - (i > 3 ? -11 : 0)} cy={98 + (i > 3 ? 24 : 0)} r={8} className={g.accentRing} />
      ))}
      <T x={393} y={70} anchor="middle" accent>
        the org&apos;s UAT team
      </T>
      <T x={393} y={150} anchor="middle">
        chose it for their projects
      </T>

      <circle cx={620} cy={110} r={10} className={g.cardWarn} />
      <T x={620} y={70} anchor="middle" warn>
        business analysts
      </T>
      <T x={620} y={150} anchor="middle">
        not yet, on purpose
      </T>
      <T x={40} y={206}>
        team-observed · team size of the UAT group not shown to scale
      </T>
    </Diagram>
  );
}
