import g from "@/components/ui/Glyph.module.css";
import d from "./Diagrams.module.css";
import { T, twoPaths, type MobileDrawing } from "./DiagramKit";

/**
 * Vertical phone versions of every line diagram: same content and visual
 * language as the wide drawings, laid out top to bottom at 360 wide.
 */

const W = 360;
const vb = (h: number) => `0 0 ${W} ${h}`;

/* ================================================================ 01 Enrollment */

export const coverageGap = (): MobileDrawing => ({
  viewBox: vb(330),
  node: (
    <>
      <path d="M60 40 V300" className={g.line} />
      <T x={20} y={44}>
        Jan
      </T>
      <T x={20} y={304}>
        Dec
      </T>
      <rect x={46} y={40} width={28} height={50} rx={6} className={g.soft} />
      <T x={90} y={60}>
        open enrollment window
      </T>
      <rect x={50} y={150} width={20} height={44} rx={5} className={g.accentMid} />
      <circle cx={60} cy={150} r={7} className={g.accent} />
      <T x={90} y={154} accent>
        a birth · 31 days to act
      </T>
      <rect x={46} y={250} width={28} height={50} rx={6} className={g.soft} />
      <T x={90} y={280}>
        next window
      </T>
      <path d="M110 90 V250" className={d.gap} />
      <circle cx={110} cy={90} r={6} className={g.cardWarn} />
      <T x={126} y={200} warn>
        missed in the window →
      </T>
      <T x={126} y={216} warn>
        uncovered until the next
      </T>
      <T x={126} y={232} warn>
        window or a life event
      </T>
    </>
  ),
});

export const trimVsReorder = () =>
  twoPaths(
    {
      title: "trim the screens",
      items: ["", "", "", "", "", "", ""],
      warn: [2, 6],
      loop: { from: 4, to: 6, label: ["×3 loop", "per coverage"] },
      notes: ["fewer screens · loop stays", "asked again per coverage"],
    },
    {
      title: "reorder the decision",
      items: ["", "", "", "who needs what", ""],
      big: 3,
      notes: ["5 steps · loop gone", "asked once, as one grid"],
    },
  );

export const translateLayer = (): MobileDrawing => {
  const ys = [90, 180, 270];
  const target = [2, 0, 1];
  return {
    viewBox: vb(380),
    node: (
      <>
        <T x={110} y={36} anchor="middle">
          family decides
        </T>
        <T x={250} y={36} anchor="middle">
          backend stores
        </T>
        <path d="M110 90 V270" className={g.strong} />
        <path d="M250 90 V270" className={g.line} />
        <rect x={160} y={64} width={40} height={232} rx={8} className={d.band} />
        {ys.map((y, i) => (
          <path key={`c${i}`} d={`M124 ${y} C 180 ${y}, 180 ${ys[target[i]!]}, 236 ${ys[target[i]!]}`} className={g.faint} />
        ))}
        {["my family", "who needs what", "which plan"].map((t, i) => (
          <g key={t}>
            <circle cx={110} cy={ys[i]} r={10} className={g.accentRing} />
            <T x={96} y={ys[i]! + 4} anchor="end" accent>
              {t}
            </T>
          </g>
        ))}
        {["coverage", "plan", "members"].map((t, i) => (
          <g key={t}>
            <circle cx={250} cy={ys[i]} r={10} className={g.nodeModel} />
            <T x={266} y={ys[i]! + 4}>
              {t}
            </T>
          </g>
        ))}
        <T x={180} y={334} anchor="middle" accent>
          UI translates the grid, once
        </T>
      </>
    ),
  };
};

export const askWhenNeeded = (): MobileDrawing => {
  const before = ["profile", "dependents", "upload document", "coverage", "review"];
  return {
    viewBox: vb(510),
    node: (
      <>
        <T x={24} y={24}>
          before · a fixed step for everyone
        </T>
        <path d="M40 56 V216" className={g.faint} />
        {before.map((t, i) => (
          <g key={t}>
            <circle cx={40} cy={56 + i * 40} r={10} className={i === 2 ? g.cardWarn : g.nodeModel} />
            <T x={64} y={60 + i * 40} warn={i === 2}>
              {t}
            </T>
          </g>
        ))}
        <T x={24} y={272}>
          after · only when the situation needs it
        </T>
        <path d="M40 300 V460" className={g.strong} />
        {[
          [300, "profile"],
          [340, "dependents"],
          [420, "coverage"],
          [460, "review"],
        ].map(([y, t]) => (
          <g key={t as string}>
            <circle cx={40} cy={y as number} r={10} className={g.accentRing} />
            <T x={64} y={(y as number) + 4}>
              {t}
            </T>
          </g>
        ))}
        <rect x={31} y={371} width={18} height={18} rx={3} transform="rotate(45 40 380)" className={g.accent} />
        <T x={64} y={384} accent>
          needs proof?
        </T>
        <path d="M48 389 C 120 396, 180 392, 193 398" className={g.flowPath} />
        <circle cx={200} cy={402} r={7} className={g.accentRing} />
        <T x={214} y={406} accent>
          upload, if yes
        </T>
        <path d="M193 406 C 150 410, 80 410, 48 413" className={g.flowPath} />
      </>
    ),
  };
};

export const passiveRun = (): MobileDrawing => {
  const dots = Array.from({ length: 12 }, (_, i) => ({ x: 40 + (i % 4) * 24, y: 40 + Math.floor(i / 4) * 24, warn: i === 11 }));
  const rule = { x: 60, y: 200 };
  return {
    viewBox: vb(470),
    node: (
      <>
        {dots.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={6} className={p.warn ? g.cardWarn : g.nodeModel} />
        ))}
        <T x={150} y={64}>
          312 members
        </T>
        <T x={150} y={80}>
          took no action
        </T>
        <path d={`M76 96 C 76 140, 60 150, ${rule.x} ${rule.y - 14}`} className={g.faint} />
        <path d={`M112 96 C 112 140, 70 150, ${rule.x + 4} ${rule.y - 14}`} className={d.gapThin} />
        <circle cx={rule.x} cy={rule.y} r={13} className={g.accent} />
        <T x={86} y={192}>
          one rule, set by the client
        </T>
        <T x={86} y={208} accent>
          default to another plan
        </T>
        <T x={86} y={224} warn>
          run after a warning: “cannot be undone”
        </T>
        {[-5, 0, 5].map((o) => (
          <path key={o} d={`M${rule.x + o} ${rule.y + 13} V316`} className={g.strong} />
        ))}
        <circle cx={60} cy={328} r={12} className={g.accent} />
        <T x={86} y={324} accent>
          289 handled by the rule
        </T>
        <T x={86} y={340}>
          no admin action
        </T>
        <path d={`M${rule.x - 12} ${rule.y + 6} C 14 240, 14 380, 50 396`} className={d.gapThin} />
        <circle cx={60} cy={400} r={10} className={g.cardWarn} />
        <T x={86} y={396} warn>
          23 back to the admin
        </T>
        <T x={86} y={412}>
          each with a reason
        </T>
        <rect x={24} y={446} width={(289 / 312) * 312} height={8} rx={4} className={g.accent} />
        <rect x={24 + (289 / 312) * 312} y={446} width={312 - (289 / 312) * 312} height={8} rx={4} className={d.barWarn} />
      </>
    ),
  };
};

/* ================================================================ 03 AI-readable design system */

export const rulesInHeads = (): MobileDrawing => ({
  viewBox: vb(470),
  node: (
    <>
      <T x={24} y={24}>
        in the Figma file · the AI could read it
      </T>
      {["components", "colour variables", "type styles"].map((t, i) => (
        <g key={t}>
          <path d={`M224 ${55 + i * 38} C 270 ${55 + i * 38}, 300 150, 300 186`} className={g.faint} />
          <rect x={24} y={40 + i * 38} width={200} height={30} rx={8} className={g.card} />
          <T x={124} y={59 + i * 38} anchor="middle">
            {t}
          </T>
        </g>
      ))}
      <circle cx={300} cy={200} r={14} className={g.nodeModel} />
      <T x={276} y={204} anchor="end">
        the AI
      </T>
      <path d="M300 214 V240" className={g.line} />
      <rect x={272} y={240} width={56} height={44} rx={6} className={g.cardWarn} />
      <rect x={280} y={250} width={22} height={5} rx={2.5} className={g.ink} />
      <rect x={280} y={260} width={36} height={5} rx={2.5} className={g.ink} />
      <rect x={280} y={270} width={14} height={6} rx={2} className={g.accent} />
      <T x={300} y={304} anchor="middle" warn>
        off-brand
      </T>
      <T x={24} y={346} warn>
        in designers&apos; heads · never reached the AI
      </T>
      {["which colour = link", "which grid per page", "how screens compose"].map((t, i) => (
        <g key={t}>
          <rect x={24} y={360 + i * 36} width={200} height={28} rx={8} className={g.cardWarn} />
          <T x={124} y={378 + i * 36} anchor="middle" warn>
            {t}
          </T>
        </g>
      ))}
    </>
  ),
});

export const twoLoops = (): MobileDrawing => ({
  viewBox: vb(400),
  node: (
    <>
      <T x={90} y={24} anchor="middle">
        BAs + developers
      </T>
      <T x={270} y={24} anchor="middle">
        sales + marketing
      </T>
      {[
        [90, "Jira story"],
        [270, "prospect"],
      ].map(([x, t]) => (
        <g key={t as string}>
          <circle cx={x as number} cy={50} r={9} className={g.nodeModel} />
          <T x={x as number} y={76} anchor="middle">
            {t}
          </T>
          <path d={`M${x} 86 C ${x} 140, 180 140, 180 168`} className={g.line} />
        </g>
      ))}
      <circle cx={180} cy={190} r={20} className={g.cardWarn} />
      <rect x={172} y={182} width={16} height={16} rx={3} className={g.ink} />
      <T x={212} y={186} warn>
        a senior designer
      </T>
      <T x={212} y={202} warn>
        draws it by hand
      </T>
      {[90, 270].map((x) => (
        <path key={x} d={`M180 212 C 180 250, ${x} 260, ${x} 300`} className={d.gapThin} />
      ))}
      <circle cx={90} cy={310} r={9} className={g.nodeModel} />
      <circle cx={270} cy={310} r={9} className={g.nodeModel} />
      <T x={90} y={338} anchor="middle">
        dev checks feasibility
      </T>
      <T x={270} y={338} anchor="middle">
        branded sales demo
      </T>
      <T x={90} y={358} anchor="middle" warn>
        1–2 weeks per story
      </T>
      <T x={270} y={358} anchor="middle" warn>
        ~2 days per mockup
      </T>
    </>
  ),
});

export const promptVsSystem = () =>
  twoPaths(
    {
      title: "tune the prompts",
      items: ["same system", "prompt", "the AI", "screen"],
      warn: [3],
      loop: { from: 1, to: 3, label: ["off-brand", "prompt again"] },
      notes: ["better prompts · same gaps", "the rules are still missing"],
    },
    {
      title: "make the system legible",
      items: ["rules written", "the AI reads them", "", "screen"],
      big: 0,
      diamond: 2,
      diamondLabel: "self-check",
      notes: ["one pass · no loop", "checked against the written rules"],
    },
  );

export const portableSkills = (): MobileDrawing => ({
  viewBox: vb(420),
  node: (
    <>
      {[2, 1, 0].map((i) => (
        <rect key={i} x={24 + i * 6} y={24 + i * 6} width={80} height={50} rx={8} className={i === 0 ? g.card : g.cardBack} />
      ))}
      <rect x={34} y={36} width={44} height={5} rx={2.5} className={g.ink} />
      <rect x={34} y={48} width={58} height={5} rx={2.5} className={g.ink} />
      <T x={130} y={50}>
        skill files
      </T>
      <T x={130} y={66} accent>
        plain markdown
      </T>
      <path d="M60 92 V210" className={g.flowPath} />
      {[
        [130, "Figma's agent · today", true],
        [170, "Claude Code, via Figma MCP", false],
        [210, "any agent that reads markdown", false],
      ].map(([y, t, on]) => (
        <g key={t as string}>
          <path d={`M60 ${y} H72`} className={on ? g.strong : g.flowPath} />
          <circle cx={82} cy={y as number} r={on ? 10 : 8} className={on ? g.accent : g.accentRing} />
          <T x={102} y={(y as number) + 4} accent={on as boolean}>
            {t}
          </T>
        </g>
      ))}
      <path d="M24 250 H336" className={g.faint} />
      <rect x={24} y={270} width={140} height={36} rx={8} className={g.card} />
      <T x={94} y={292} anchor="middle">
        the Figma file
      </T>
      <rect x={196} y={270} width={140} height={36} rx={8} className={g.card} />
      <T x={266} y={292} anchor="middle">
        the docs
      </T>
      <path d="M94 306 L120 326" className={g.strong} />
      <path d="M266 306 L240 326" className={g.strong} />
      <rect x={88} y={324} width={184} height={30} rx={15} className={d.band} />
      <T x={180} y={343} anchor="middle" accent>
        audit · every session
      </T>
      <T x={180} y={384} anchor="middle">
        a memory skill carries decisions
      </T>
      <T x={180} y={400} anchor="middle">
        to the next session
      </T>
    </>
  ),
});

export const adoptionSpread = (): MobileDrawing => ({
  viewBox: vb(400),
  node: (
    <>
      <path d="M60 64 V116" className={g.strong} />
      <path d="M60 166 V214" className={g.strong} />
      <path d="M60 266 V318" className={d.gapThin} />
      <circle cx={60} cy={50} r={14} className={g.accent} />
      <T x={110} y={46} accent>
        me
      </T>
      <T x={110} y={62}>
        built, proved
      </T>
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={48 + (i % 2) * 24} cy={128 + Math.floor(i / 2) * 24} r={9} className={g.accentRing} />
      ))}
      <T x={110} y={136} accent>
        4 designers
      </T>
      <T x={110} y={152}>
        my team
      </T>
      {Array.from({ length: 7 }, (_, i) => (
        <circle key={i} cx={i < 3 ? 40 + i * 20 : 30 + (i - 3) * 20} cy={i < 3 ? 228 : 252} r={8} className={g.accentRing} />
      ))}
      <T x={110} y={236} accent>
        the org&apos;s UAT team
      </T>
      <T x={110} y={252}>
        chose it for their projects
      </T>
      <circle cx={60} cy={330} r={10} className={g.cardWarn} />
      <T x={110} y={326} warn>
        BAs
      </T>
      <T x={110} y={342}>
        not yet, on purpose
      </T>
      <T x={24} y={386}>
        team-observed · not to scale
      </T>
    </>
  ),
});

/* ================================================================ 02 Enterprise platform */

export const whiteLabelChain = (): MobileDrawing => {
  const ins = [110, 250];
  const emp = [60, 140, 220, 300];
  return {
    viewBox: vb(380),
    node: (
      <>
        <T x={24} y={24}>
          the product
        </T>
        <circle cx={180} cy={50} r={14} className={g.nodeModel} />
        <T x={24} y={104}>
          insurers
        </T>
        {ins.map((x) => (
          <path key={`p${x}`} d={`M180 64 C 180 100, ${x} 100, ${x} 116`} className={g.faint} />
        ))}
        {emp.map((x, i) => (
          <g key={`e${x}`}>
            <path d={`M${ins[i < 2 ? 0 : 1]} 144 C ${ins[i < 2 ? 0 : 1]} 190, ${x} 190, ${x} 206`} className={g.faint} />
            <path d={`M${x} 234 V286`} className={g.faint} />
            {[-12, 0, 12].map((o) => (
              <circle key={o} cx={x + o} cy={300} r={5} className={g.nodeModel} />
            ))}
            <rect x={x - 14} y={206} width={28} height={28} rx={6} className={g.cardWarn} />
          </g>
        ))}
        {ins.map((x) => (
          <rect key={`i${x}`} x={x - 14} y={116} width={28} height={28} rx={6} className={g.cardWarn} />
        ))}
        <T x={24} y={196}>
          employers
        </T>
        <T x={24} y={286}>
          members
        </T>
        <T x={24} y={340} warn>
          every red box needs its own look
        </T>
        <T x={24} y={356} warn>
          before: each one re-skinned by hand
        </T>
      </>
    ),
  };
};

export const growthCeiling = (): MobileDrawing => ({
  viewBox: vb(410),
  node: (
    <>
      <T x={24} y={24}>
        one engineering team · one re-skin at a time
      </T>
      <path d="M50 50 V350" className={g.line} />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 70 + i * 60;
        return (
          <g key={i}>
            <circle cx={50} cy={y} r={10} className={g.nodeModel} />
            <T x={72} y={y + 4}>
              client {i + 1}
            </T>
            <path d={`M160 ${y} H320`} className={d.gap} />
            <T x={160} y={y + 20} warn>
              re-skin · weeks
            </T>
          </g>
        );
      })}
      <T x={24} y={392} warn>
        clients signed ≤ re-skins engineering can do
      </T>
    </>
  ),
});

export const editsVsFoundation = () =>
  twoPaths(
    {
      title: "do the edits",
      items: ["the ask", "edit", "edit", "next client"],
      warn: [3],
      loop: { from: 1, to: 3, label: ["again,", "by hand"] },
      notes: ["answers the ask", "every client stays a rebuild"],
    },
    {
      title: "go underneath",
      items: ["document it", "the system", "tokens", "new client"],
      big: 0,
      notes: ["a foundation nobody asked for", "a new client is configuration"],
    },
  );

export const adoptionFourSides = (): MobileDrawing => {
  const items = [
    ["enablement", "walkthroughs with developers"],
    ["documentation", "usage rules inside the system"],
    ["quality", "design QA on every build"],
    ["policy", "tech lead: build to the system"],
  ];
  return {
    viewBox: vb(360),
    node: (
      <>
        <path d="M40 40 V310" className={g.strong} />
        {items.map(([t, s], i) => {
          const y = 40 + i * 66;
          return (
            <g key={t}>
              <circle cx={40} cy={y} r={9} className={g.accentRing} />
              <T x={64} y={y} accent>
                {t}
              </T>
              <T x={64} y={y + 16}>
                {s}
              </T>
            </g>
          );
        })}
        <circle cx={40} cy={318} r={18} className={g.accent} />
        <T x={70} y={322} accent>
          the system → the default
        </T>
      </>
    ),
  };
};

export const howWorkRan = (): MobileDrawing => {
  const steps = ["new idea", "BA workshop", "design", "eng workshop", "ship"];
  return {
    viewBox: vb(380),
    node: (
      <>
        <rect x={24} y={16} width={312} height={34} rx={8} className={g.card} />
        <T x={180} y={38} anchor="middle">
          personas · insurers · employers · members
        </T>
        <path d="M30 50 C 12 120, 12 200, 30 206" className={g.flowPath} />
        <path d="M40 90 V330" className={g.strong} />
        {steps.map((t, i) => {
          const y = 90 + i * 60;
          const key = i === 1 || i === 3;
          return (
            <g key={t}>
              <circle cx={40} cy={y} r={key ? 12 : 9} className={key ? g.accent : g.accentRing} />
              <T x={64} y={y + 4} accent={key}>
                {t}
              </T>
              {i === 1 && (
                <T x={64} y={y + 20}>
                  rules agreed first
                </T>
              )}
              {i === 3 && (
                <T x={64} y={y + 20}>
                  system and code change together
                </T>
              )}
            </g>
          );
        })}
      </>
    ),
  };
};

/* ================================================================ 04 Blinkwiser */

export const trustQuestions = (): MobileDrawing => {
  const boxes = [
    ["is it accurate?", "v1 invented numbers"],
    ["did it do what it said?", "v1 claimed edits it hadn't made"],
    ["can I get back?", "v1: undo was a chat message"],
    ["does it look like me?", "v1 drifted to generic AI"],
  ];
  return {
    viewBox: vb(330),
    node: (
      <>
        <T x={24} y={24}>
          a carousel posted under your own name
        </T>
        {boxes.map(([q, a], i) => (
          <g key={q}>
            <rect x={24} y={40 + i * 70} width={312} height={56} rx={8} className={g.cardWarn} />
            <T x={40} y={64 + i * 70}>
              {q}
            </T>
            <T x={40} y={82 + i * 70} warn>
              {a}
            </T>
          </g>
        ))}
      </>
    ),
  };
};

export const qualitySteps = (): MobileDrawing => {
  const steps = ["research", "outline", "covers", "draft", "critic", "fact-check"];
  return {
    viewBox: vb(370),
    node: (
      <>
        <path d="M40 40 V290" className={g.strong} />
        {steps.map((t, i) => {
          const y = 40 + i * 50;
          return (
            <g key={t}>
              <circle cx={40} cy={y} r={10} className={g.accentRing} />
              <T x={64} y={y + 4}>
                {t}
              </T>
              <T x={200} y={y + 4} warn>
                + time · + cost
              </T>
            </g>
          );
        })}
        <T x={24} y={346} warn>
          the first rebuild: 84 s a deck
        </T>
      </>
    ),
  };
};

export const blindEval = (): MobileDrawing => ({
  viewBox: vb(430),
  node: (
    <>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={24 + i * 6} y={24 + i * 6} width={70} height={56} rx={8} className={i === 2 ? g.card : g.cardBack} />
      ))}
      <T x={120} y={60}>
        10 golden cases
      </T>
      <path d="M60 92 V260" className={g.faint} />
      <circle cx={60} cy={140} r={10} className={g.nodeModel} />
      <T x={84} y={144}>
        reasoning on
      </T>
      <circle cx={60} cy={190} r={10} className={g.accentRing} />
      <T x={84} y={194} accent>
        reasoning off
      </T>
      <rect x={48} y={248} width={24} height={24} rx={3} transform="rotate(45 60 260)" className={g.accent} />
      <T x={88} y={264} accent>
        blind judge
      </T>
      <T x={24} y={314}>
        quality 8.1 → 8.0
      </T>
      <T x={24} y={332} accent>
        84 s → 31 s a deck
      </T>
      <T x={24} y={350} accent>
        about half the cost
      </T>
      <T x={24} y={394} warn>
        judge fixed first: it had marked
      </T>
      <T x={24} y={410} warn>
        sourced numbers as invented
      </T>
    </>
  ),
});

export const cutToThree = (): MobileDrawing => ({
  viewBox: vb(350),
  node: (
    <>
      <T x={24} y={24}>
        9 styles × fonts × layouts
      </T>
      {Array.from({ length: 27 }, (_, i) => (
        <rect key={i} x={24 + (i % 9) * 26} y={40 + Math.floor(i / 9) * 26} width={20} height={20} rx={4} className={g.cardBack} />
      ))}
      <path d="M266 76 H296" className={d.gapThin} />
      <circle cx={310} cy={76} r={10} className={g.cardWarn} />
      <T x={310} y={110} anchor="middle" warn>
        generic
      </T>
      <path d="M24 140 H336" className={g.faint} />
      <T x={24} y={170} accent>
        cut to three, kept as designed
      </T>
      {["The Truth", "The Sketch", "The Statement"].map((t, i) => (
        <g key={t}>
          <rect x={24 + i * 108} y={186} width={96} height={110} rx={8} className={g.card} />
          <rect x={36 + i * 108} y={200} width={40} height={6} rx={3} className={g.accent} />
          <rect x={36 + i * 108} y={216} width={64} height={5} rx={2.5} className={g.ink} />
          <rect x={36 + i * 108} y={228} width={50} height={5} rx={2.5} className={g.ink} />
          <T x={72 + i * 108} y={322} anchor="middle" accent>
            {t}
          </T>
        </g>
      ))}
    </>
  ),
});

/* ================================================================ 05 Dubai Municipality */

export const orgVsNeed = (): MobileDrawing => {
  const depts = [90, 150, 210];
  return {
    viewBox: vb(450),
    node: (
      <>
        <circle cx={40} cy={40} r={14} className={g.nodeModel} />
        <T x={64} y={44}>
          the city
        </T>
        <path d="M40 54 V210" className={g.faint} />
        {depts.map((y, i) => (
          <g key={y}>
            <path d={`M40 ${y} H60`} className={g.faint} />
            <rect x={60} y={y - 14} width={130} height={28} rx={6} className={g.card} />
            <T x={125} y={y + 4} anchor="middle">
              department {String.fromCharCode(65 + i)}
            </T>
            {[0, 1].map((k) => (
              <g key={k}>
                <path d={`M190 ${y} C 205 ${y}, 210 ${y - 9 + k * 18}, 222 ${y - 9 + k * 18}`} className={g.faint} />
                <circle cx={228} cy={y - 9 + k * 18} r={5} className={g.nodeModel} />
              </g>
            ))}
          </g>
        ))}
        <T x={24} y={256}>
          each with its own rules, documents,
        </T>
        <T x={24} y={272}>
          fees and approvals
        </T>
        {depts.map((y) => (
          <path key={`q${y}`} d={`M290 364 C 290 300, 270 ${y}, 240 ${y}`} className={d.gapThin} />
        ))}
        <circle cx={290} cy={378} r={14} className={g.accent} />
        <T x={270} y={382} anchor="end" accent>
          a resident
        </T>
        <T x={290} y={414} anchor="middle">
          “renew my permit”
        </T>
        <T x={290} y={432} anchor="middle" warn>
          which department?
        </T>
      </>
    ),
  };
};

export const fourConstraints = (): MobileDrawing => {
  const items = [
    "residents succeed alone, in two languages",
    "formal sign-off at every milestone",
    "built in low-code, fixed components",
    "requirements moving between milestones",
  ];
  return {
    viewBox: vb(330),
    node: (
      <>
        {items.map((t, i) => (
          <g key={t}>
            <rect x={24} y={20 + i * 46} width={312} height={34} rx={8} className={g.card} />
            <T x={40} y={41 + i * 46}>
              {t}
            </T>
          </g>
        ))}
        {[70, 140, 220, 290].map((x) => (
          <path key={x} d={`M${x} 204 C ${x} 240, 180 240, 180 262`} className={g.strong} />
        ))}
        <circle cx={180} cy={276} r={16} className={g.accent} />
        <T x={180} y={314} anchor="middle" accent>
          one structure
        </T>
      </>
    ),
  };
};

export const idealVsBuildable = () =>
  twoPaths(
    {
      title: "the ideal",
      items: ["custom nav", "custom parts", "not in platform"],
      warn: [2],
      notes: ["an impressive Figma file", "build stalls or drifts"],
    },
    {
      title: "the buildable",
      items: ["platform set", "EN + AR side by side", "built as designed"],
      big: 2,
      notes: ["inside the platform's components", "no custom workarounds"],
    },
  );
