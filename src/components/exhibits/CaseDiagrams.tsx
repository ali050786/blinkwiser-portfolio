import g from "@/components/ui/Glyph.module.css";
import d from "./Diagrams.module.css";
import { Diagram, T } from "./Diagrams";

/**
 * Diagrams for cases 02, 04 and 05, in the shared glyph language: plain nodes,
 * red dashed for the problem, accent for the fix. Generic names only.
 */

/* ================================================================ 02 Enterprise platform */

/** Frame: one product, three levels of brand. */
export function WhiteLabelChain() {
  const ins = [90, 210];
  const emp = [60, 120, 180, 240];
  return (
    <Diagram
      label="Diagram · who sees the product"
      viewBox="0 0 720 310"
      aria="One product resold to insurers, who resell it to employers, who put it in front of members. Every level needs its own look. Before, each was re-skinned by hand."
      caption="One product, sold three levels deep. Every insurer and employer needs its own look, so hand edits multiply with every client."
    >
      {["the product", "insurers", "employers", "members"].map((t, i) => (
        <T key={t} x={70 + i * 180} y={28} anchor="middle">
          {t}
        </T>
      ))}
      {ins.map((y) => (
        <path key={`p${y}`} d={`M84 150 C 160 150, 170 ${y}, 236 ${y}`} className={g.faint} />
      ))}
      {emp.map((y, i) => (
        <g key={`e${y}`}>
          <path d={`M264 ${ins[i < 2 ? 0 : 1]} C 330 ${ins[i < 2 ? 0 : 1]}, 340 ${y}, 416 ${y}`} className={g.faint} />
          <path d={`M444 ${y} H590`} className={g.faint} />
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={600 + k * 18} cy={y} r={5} className={g.nodeModel} />
          ))}
          <rect x={416} y={y - 12} width={28} height={24} rx={6} className={g.cardWarn} />
        </g>
      ))}
      {ins.map((y) => (
        <rect key={`i${y}`} x={236} y={y - 14} width={28} height={28} rx={6} className={g.cardWarn} />
      ))}
      <circle cx={70} cy={150} r={14} className={g.nodeModel} />
      <T x={70} y={290} warn>
        every red box needs its own look · before: each one re-skinned by hand
      </T>
    </Diagram>
  );
}

/** Stakes: the business could only sign clients as fast as engineering could re-skin. */
export function GrowthCeiling() {
  const xs = [60, 190, 320, 450, 580];
  return (
    <Diagram
      label="Diagram · the growth ceiling"
      viewBox="0 0 720 220"
      aria="Five new clients in a queue. Each waits for a hand re-skin of weeks before the next can start."
      caption="Every new client waited on a hand re-skin, one after another. Sales could only move as fast as engineering could repaint the product."
    >
      <T x={40} y={30}>
        one engineering team · one re-skin at a time
      </T>
      <path d="M40 110 H690" className={g.line} />
      {xs.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={110} r={10} className={g.nodeModel} />
          <T x={x} y={84} anchor="middle">
            client {i + 1}
          </T>
          <path d={`M${x + 14} 140 H${x + 116}`} className={d.gap} />
          <T x={x + 64} y={162} anchor="middle" warn>
            re-skin · weeks
          </T>
        </g>
      ))}
      <T x={40} y={204} warn>
        clients signed ≤ re-skins engineering can do
      </T>
    </Diagram>
  );
}

/** Fork 1: do the edits forever, or document what exists and let it become the system. */
export function EditsVsFoundation() {
  const xs = [60, 180, 300, 420];
  return (
    <Diagram
      label="Diagram · the two options"
      viewBox="0 0 720 270"
      aria="Do the edits: every change and every new client is another hand edit, in a loop. Go underneath: document what exists, it becomes the system, a new client becomes configuration."
      caption="Doing the edits answered the ask and kept every future change hand-made. Documenting what existed turned into the system."
    >
      <T x={40} y={16}>
        do the edits
      </T>
      <path d={`M${xs[0]} 76 H${xs[3]}`} className={g.faint} />
      {["the ask", "edit", "edit", "next client"].map((t, i) => (
        <g key={`a${i}`}>
          <circle cx={xs[i]} cy={76} r={10} className={i === 3 ? g.cardWarn : g.nodeModel} />
          <T x={xs[i]!} y={106} anchor="middle" warn={i === 3}>
            {t}
          </T>
        </g>
      ))}
      <path d={`M${xs[3]} 64 C ${xs[3]} 40, ${xs[1]} 40, ${xs[1]} 64`} className={d.gapThin} />
      <T x={(xs[1]! + xs[3]!) / 2} y={36} anchor="middle" warn>
        again, by hand
      </T>
      <T x={480} y={72}>answers the ask</T>
      <T x={480} y={90} warn>
        every client stays a rebuild
      </T>

      <T x={40} y={162}>
        go underneath
      </T>
      <path d={`M${xs[0]} 206 H${xs[3]}`} className={g.strong} />
      {["document it", "the system", "tokens", "new client"].map((t, i) => (
        <g key={`b${i}`}>
          <circle cx={xs[i]} cy={206} r={i === 0 ? 13 : 10} className={i === 0 ? g.accent : g.accentRing} />
          <T x={xs[i]!} y={236} anchor="middle" accent={i === 0}>
            {t}
          </T>
        </g>
      ))}
      <T x={480} y={202}>a foundation nobody asked for</T>
      <T x={480} y={220} accent>
        a new client is configuration
      </T>
    </Diagram>
  );
}

/** Fork 3: adoption worked from four sides until the system was the default. */
export function AdoptionFourSides() {
  const c = { x: 360, y: 150 };
  const sides = [
    { x: 360, y: 46, t: "enablement", s: "walkthroughs with developers", a: "start" as const },
    { x: 490, y: 150, t: "documentation", s: "usage rules inside the system", a: "start" as const },
    { x: 360, y: 254, t: "quality", s: "design QA on every build", a: "start" as const },
    { x: 230, y: 150, t: "policy", s: "tech lead: build to the system", a: "end" as const },
  ];
  return (
    <Diagram
      label="Diagram · adoption from four sides"
      viewBox="0 0 720 300"
      aria="The design system in the centre, pushed into engineering's default from four sides: enablement, documentation, quality and policy."
      caption="Building the system didn't change behaviour. Working it from four sides for a few months made it what engineering builds to."
    >
      {sides.map((p) => (
        <path key={p.t} d={`M${p.x} ${p.y} L${c.x} ${c.y}`} className={g.strong} />
      ))}
      {sides.map((p) => {
        const dx = p.a === "start" ? 16 : p.a === "end" ? -16 : 0;
        const ty = p.y - 4;
        return (
          <g key={`n${p.t}`}>
            <circle cx={p.x} cy={p.y} r={9} className={g.accentRing} />
            <T x={p.x + dx} y={ty} anchor={p.a} accent>
              {p.t}
            </T>
            <T x={p.x + dx} y={ty + 16} anchor={p.a}>
              {p.s}
            </T>
          </g>
        );
      })}
      <circle cx={c.x} cy={c.y} r={22} className={g.accent} />
      <T x={c.x - 30} y={c.y + 44} anchor="end" accent>
        the system → the default
      </T>
    </Diagram>
  );
}

/** Follow-on: how an idea moved from workshop to build. */
export function HowWorkRan() {
  const xs = [60, 210, 360, 510, 660];
  const steps = ["new idea", "BA workshop", "design", "eng workshop", "ship"];
  return (
    <Diagram
      label="Diagram · how the work ran"
      viewBox="0 0 720 230"
      aria="A new idea goes to a workshop with business analysts, then design, then a workshop with engineering for system changes, then ships. Personas for insurers, employers and members feed design."
      caption="Rules were agreed with BAs before anything was drawn, and system changes were agreed with engineering before they shipped. Personas for all three audiences fed the design."
    >
      <rect x={250} y={20} width={220} height={34} rx={8} className={g.card} />
      <T x={360} y={42} anchor="middle">
        personas · insurers · employers · members
      </T>
      <path d="M360 54 V124" className={g.flowPath} />
      <path d={`M${xs[0]} 140 H${xs[4]}`} className={g.strong} />
      {steps.map((t, i) => (
        <g key={t}>
          <circle cx={xs[i]} cy={140} r={i === 1 || i === 3 ? 12 : 9} className={i === 1 || i === 3 ? g.accent : g.accentRing} />
          <T x={xs[i]!} y={176} anchor="middle" accent={i === 1 || i === 3}>
            {t}
          </T>
        </g>
      ))}
      <T x={210} y={200} anchor="middle">
        rules agreed first
      </T>
      <T x={510} y={200} anchor="middle">
        system and code change together
      </T>
    </Diagram>
  );
}

/* ================================================================ 04 Blinkwiser */

/** Frame: four questions a creator asks before posting, and how v1 answered them. */
export function TrustQuestions() {
  const boxes = [
    { x: 40, y: 40, q: "is it accurate?", a: "v1 invented numbers" },
    { x: 450, y: 40, q: "did it do what it said?", a: "v1 claimed edits it hadn't made" },
    { x: 40, y: 170, q: "can I get back?", a: "v1: undo was a chat message" },
    { x: 450, y: 170, q: "does it look like me?", a: "v1 drifted to generic AI" },
  ];
  return (
    <Diagram
      label="Diagram · what a creator needs before posting"
      viewBox="0 0 720 270"
      aria="A carousel posted under your own name raises four questions: is it accurate, did it do what it said, can I get back, does it look like me. Version one failed all four."
      caption="Generation was the easy part. For someone posting under their own name, these four questions are the product, and the first version failed all of them."
    >
      {boxes.map((b) => (
        <path key={`l${b.q}`} d={`M${b.x < 300 ? b.x + 230 : b.x} ${b.y + 30} L360 135`} className={g.faint} />
      ))}
      {boxes.map((b) => (
        <g key={b.q}>
          <rect x={b.x} y={b.y} width={230} height={60} rx={8} className={g.cardWarn} />
          <T x={b.x + 14} y={b.y + 25}>
            {b.q}
          </T>
          <T x={b.x + 14} y={b.y + 44} warn>
            {b.a}
          </T>
        </g>
      ))}
      <circle cx={360} cy={135} r={16} className={g.nodeModel} />
      <T x={360} y={258} anchor="middle">
        a carousel posted under your own name
      </T>
    </Diagram>
  );
}

/** Stakes: every quality step adds time and cost, and the product is solo and bootstrapped. */
export function QualitySteps() {
  const steps = ["research", "outline", "covers", "draft", "critic", "fact-check"];
  const xs = steps.map((_, i) => 60 + i * 110);
  return (
    <Diagram
      label="Diagram · the price of each quality step"
      viewBox="0 0 720 220"
      aria="Six pipeline steps from research to fact-check. Each adds time and cost; the first rebuild took 84 seconds a deck."
      caption="Every step that makes a deck more trustworthy adds seconds and cost. For a solo, bootstrapped product both matter as much as quality."
    >
      <path d={`M${xs[0]} 100 H${xs[5]}`} className={g.strong} />
      {steps.map((t, i) => (
        <g key={t}>
          <circle cx={xs[i]} cy={100} r={10} className={g.accentRing} />
          <T x={xs[i]!} y={74} anchor="middle">
            {t}
          </T>
          <T x={xs[i]!} y={130} anchor="middle" warn>
            + time
          </T>
          <T x={xs[i]!} y={146} anchor="middle" warn>
            + cost
          </T>
        </g>
      ))}
      <T x={40} y={190} warn>
        the first rebuild: 84 s a deck
      </T>
    </Diagram>
  );
}

/** Fork 3: a blind eval harness settled quality versus speed. */
export function BlindEval() {
  return (
    <Diagram
      label="Diagram · deciding by evidence"
      viewBox="0 0 720 270"
      aria="Ten golden cases run through two settings, reasoning on and reasoning off. A blind judge compares them. Result: quality 8.1 versus 8.0, 84 seconds down to 31, about half the cost."
      caption="I fixed the judge first, when it marked correctly sourced numbers as invented. Then the evals showed reasoning off held quality and cut time and cost."
    >
      {[0, 1, 2].map((i) => (
        <rect key={i} x={40 + i * 6} y={96 + i * 6} width={70} height={56} rx={8} className={i === 2 ? g.card : g.cardBack} />
      ))}
      <T x={40} y={190}>
        10 golden cases
      </T>
      <path d="M124 128 C 170 128, 180 80, 236 80" className={g.faint} />
      <path d="M124 128 C 170 128, 180 176, 236 176" className={g.faint} />
      <circle cx={246} cy={80} r={10} className={g.nodeModel} />
      <T x={262} y={84}>
        reasoning on
      </T>
      <circle cx={246} cy={176} r={10} className={g.accentRing} />
      <T x={262} y={180} accent>
        reasoning off
      </T>
      <path d="M360 80 C 400 80, 400 128, 430 128" className={g.faint} />
      <path d="M360 176 C 400 176, 400 128, 430 128" className={g.faint} />
      <rect x={430} y={116} width={24} height={24} rx={3} transform="rotate(45 442 128)" className={g.accent} />
      <T x={442} y={98} anchor="middle" accent>
        blind judge
      </T>
      <T x={500} y={104}>quality 8.1 → 8.0</T>
      <T x={500} y={128} accent>
        84 s → 31 s a deck
      </T>
      <T x={500} y={152} accent>
        about half the cost
      </T>
      <T x={40} y={250} warn>
        judge fixed first: it had marked sourced numbers as invented
      </T>
    </Diagram>
  );
}

/** Fork 4: the looks system was cut back to three templates kept as designed. */
export function CutToThree() {
  return (
    <Diagram
      label="Diagram · fewer knobs, more design"
      viewBox="0 0 720 250"
      aria="Left: nine styles times font and layout pickers across every template, leading to generic output. Right: three templates kept exactly as designed: The Truth, The Sketch, The Statement."
      caption="More options made every template look like every other AI tool. Cutting back to three, each kept exactly as designed, kept their identity."
    >
      <T x={40} y={28}>
        9 styles × fonts × layouts
      </T>
      {Array.from({ length: 27 }, (_, i) => (
        <rect key={i} x={40 + (i % 9) * 26} y={44 + Math.floor(i / 9) * 26} width={20} height={20} rx={4} className={g.cardBack} />
      ))}
      <path d="M280 84 H320" className={d.gapThin} />
      <circle cx={334} cy={84} r={10} className={g.cardWarn} />
      <T x={334} y={120} anchor="middle" warn>
        generic
      </T>
      <path d="M380 40 V220" className={g.faint} />
      <T x={420} y={28} accent>
        cut to three, kept as designed
      </T>
      {["The Truth", "The Sketch", "The Statement"].map((t, i) => (
        <g key={t}>
          <rect x={420 + i * 96} y={44} width={84} height={120} rx={8} className={g.card} />
          <rect x={432 + i * 96} y={58} width={40} height={6} rx={3} className={g.accent} />
          <rect x={432 + i * 96} y={74} width={60} height={5} rx={2.5} className={g.ink} />
          <rect x={432 + i * 96} y={86} width={48} height={5} rx={2.5} className={g.ink} />
          <T x={462 + i * 96} y={190} anchor="middle" accent>
            {t}
          </T>
        </g>
      ))}
    </Diagram>
  );
}

/* ================================================================ 05 Dubai Municipality */

/** Frame: the catalogue mirrored the org chart; a resident only knows the need. */
export function OrgVsNeed() {
  const depts = [70, 150, 230];
  return (
    <Diagram
      label="Diagram · the catalogue, as the city ran it"
      viewBox="0 0 720 300"
      aria="Left: the municipality splits into departments, each with its own services, rules, fees and approvals. Right: a resident with a need, who doesn't know which department owns it."
      caption="The catalogue mirrored the organisation that ran it. A resident renewing a permit doesn't know or care which department owns it."
    >
      <circle cx={60} cy={150} r={14} className={g.nodeModel} />
      <T x={60} y={190} anchor="middle">
        the city
      </T>
      {depts.map((y, i) => (
        <g key={y}>
          <path d={`M74 150 C 120 150, 130 ${y}, 186 ${y}`} className={g.faint} />
          <rect x={186} y={y - 14} width={110} height={28} rx={6} className={g.card} />
          <T x={241} y={y + 4} anchor="middle">
            department {String.fromCharCode(65 + i)}
          </T>
          {[0, 1].map((k) => (
            <g key={k}>
              <path d={`M296 ${y} C 320 ${y}, 330 ${y - 12 + k * 24}, 350 ${y - 12 + k * 24}`} className={g.faint} />
              <circle cx={356} cy={y - 12 + k * 24} r={5} className={g.nodeModel} />
            </g>
          ))}
        </g>
      ))}
      <T x={186} y={30}>
        each with its own rules, documents, fees, approvals
      </T>
      {depts.map((y) => (
        <path key={`q${y}`} d={`M600 150 C 520 150, 470 ${y}, 380 ${y}`} className={d.gapThin} />
      ))}
      <circle cx={610} cy={150} r={14} className={g.accent} />
      <T x={610} y={120} anchor="middle" accent>
        a resident
      </T>
      <T x={610} y={190} anchor="middle">
        “renew my permit”
      </T>
      <T x={610} y={208} anchor="middle" warn>
        which department?
      </T>
    </Diagram>
  );
}

/** Stakes: four constraints the one structure had to satisfy. */
export function FourConstraints() {
  const ins = [
    { y: 50, t: "residents succeed alone, in two languages" },
    { y: 110, t: "formal sign-off at every milestone" },
    { y: 170, t: "built in low-code, fixed components" },
    { y: 230, t: "requirements moving between milestones" },
  ];
  return (
    <Diagram
      label="Diagram · four constraints, one structure"
      viewBox="0 0 720 280"
      aria="Four constraints converge on one structure: residents succeed alone in two languages, formal sign-off at every milestone, a low-code build with fixed components, and requirements that kept moving."
      caption="Whatever the structure was, it had to work for residents alone, survive every review, be buildable in low-code and absorb change without a redesign."
    >
      {ins.map((p) => (
        <g key={p.t}>
          <circle cx={56} cy={p.y} r={8} className={g.nodeModel} />
          <T x={74} y={p.y + 4}>
            {p.t}
          </T>
          <path d={`M370 ${p.y} C 470 ${p.y}, 480 140, 570 140`} className={g.strong} />
        </g>
      ))}
      <circle cx={584} cy={140} r={16} className={g.accent} />
      <T x={584} y={180} anchor="middle" accent>
        one structure
      </T>
    </Diagram>
  );
}

/** Fork 3: design the ideal, or what the client's team can build. */
export function IdealVsBuildable() {
  return (
    <Diagram
      label="Diagram · the two options"
      viewBox="0 0 720 250"
      aria="The ideal: custom navigation and components not in the low-code platform, so the build stalls or drifts. The buildable: the platform's own components, Arabic and English designed side by side, built as designed."
      caption="The ideal would have made a better Figma file and a stalled build. Designing inside the platform's set, with both languages side by side, shipped as designed."
    >
      <T x={40} y={28}>
        the ideal
      </T>
      <path d="M60 70 H420" className={g.faint} />
      {["custom nav", "custom parts", "not in platform"].map((t, i) => (
        <g key={t}>
          <circle cx={60 + i * 180} cy={70} r={10} className={i === 2 ? g.cardWarn : g.nodeModel} />
          <T x={60 + i * 180} y={100} anchor="middle" warn={i === 2}>
            {t}
          </T>
        </g>
      ))}
      <T x={470} y={74} warn>
        build stalls or drifts
      </T>
      <T x={40} y={150}>
        the buildable
      </T>
      <path d="M60 190 H420" className={g.strong} />
      {["platform set", "EN + AR side by side", "built as designed"].map((t, i) => (
        <g key={t}>
          <circle cx={60 + i * 180} cy={190} r={i === 2 ? 13 : 10} className={i === 2 ? g.accent : g.accentRing} />
          <T x={60 + i * 180} y={220} anchor="middle" accent={i === 2}>
            {t}
          </T>
        </g>
      ))}
      <T x={470} y={194} accent>
        no custom workarounds
      </T>
    </Diagram>
  );
}
