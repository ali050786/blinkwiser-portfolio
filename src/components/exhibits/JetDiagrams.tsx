import g from "@/components/ui/Glyph.module.css";
import { Diagram, T, twoPaths, type MobileDrawing } from "./DiagramKit";

/**
 * Diagrams for case 06, Jet Airways booking, in the shared glyph language:
 * plain nodes, red for the option not taken, accent for the call I made.
 */

/* Two options, one row each: the path not taken on top, the chosen path below. */
type Row = { title: string; items: string[]; note: string };

function TwoOptions({
  label,
  aria,
  caption,
  top,
  bottom,
  warnAt,
  mobile,
}: {
  label: string;
  aria: string;
  caption: string;
  top: Row;
  bottom: Row;
  warnAt: number;
  mobile: MobileDrawing;
}) {
  const n = Math.max(top.items.length, bottom.items.length);
  const step = n > 3 ? 120 : 160;
  const x = (i: number) => 60 + i * step;
  const end = x(n - 1);
  const noteX = end + 50;
  return (
    <Diagram mobile={mobile} label={label} viewBox="0 0 720 250" aria={aria} caption={caption}>
      <T x={40} y={28}>
        {top.title}
      </T>
      <path d={`M60 70 H${x(top.items.length - 1)}`} className={g.faint} />
      {top.items.map((t, i) => (
        <g key={t}>
          <circle cx={x(i)} cy={70} r={10} className={i === warnAt ? g.cardWarn : g.nodeModel} />
          <T x={x(i)} y={100} anchor="middle" warn={i === warnAt}>
            {t}
          </T>
        </g>
      ))}
      <T x={noteX} y={74} warn>
        {top.note}
      </T>
      <T x={40} y={150}>
        {bottom.title}
      </T>
      <path d={`M60 190 H${x(bottom.items.length - 1)}`} className={g.strong} />
      {bottom.items.map((t, i) => {
        const last = i === bottom.items.length - 1;
        return (
          <g key={t}>
            <circle cx={x(i)} cy={190} r={last ? 13 : 10} className={last ? g.accent : g.accentRing} />
            <T x={x(i)} y={220} anchor="middle" accent={last}>
              {t}
            </T>
          </g>
        );
      })}
      <T x={noteX} y={194} accent>
        {bottom.note}
      </T>
    </Diagram>
  );
}

/** Frame: the five booking steps, and where each of my four calls sits. */
export function JetJourney() {
  const steps = ["search", "flights", "guests", "extras", "pay"];
  const x = (i: number) => 80 + i * 140;
  const calls: { at: number; y: number; t: string }[] = [
    { at: 1, y: 150, t: "grid on desktop, list on mobile" },
    { at: 1, y: 190, t: "full price, broken down" },
    { at: 1, y: 230, t: "upgrade offer in place" },
    { at: 3, y: 150, t: "every add-on in one step" },
  ];
  const mobile: MobileDrawing = {
    viewBox: "0 0 360 420",
    node: (
      <>
        <path d="M40 40 V360" className={g.strong} />
        {steps.map((s, i) => {
          const y = 40 + i * 80;
          const mine = i === 1 || i === 3;
          return (
            <g key={s}>
              <circle cx={40} cy={y} r={mine ? 12 : 9} className={mine ? g.accent : g.nodeModel} />
              <T x={64} y={y + 4} accent={mine}>
                {s}
              </T>
            </g>
          );
        })}
        {calls.map((c, k) => {
          const base = 40 + c.at * 80;
          const y = c.at === 1 ? base + 20 + k * 16 : base + 20;
          return (
            <T key={c.t} x={64} y={y}>
              · {c.t}
            </T>
          );
        })}
      </>
    ),
  };
  return (
    <Diagram
      mobile={mobile}
      label="Diagram · one booking, five steps"
      viewBox="0 0 720 260"
      aria="The booking flow in five steps: search, flights, guests, extras, pay. Three of my calls sit in the flights step: the fare grid and mobile list, the full price breakdown, and the upgrade offer. The fourth, every add-on in one step, is the extras step."
      caption="Four calls along one booking. Three are in choosing a flight, where most of the decisions are made; the fourth is the extras step before payment."
    >
      <path d={`M${x(0)} 70 H${x(4)}`} className={g.strong} />
      {steps.map((s, i) => {
        const mine = i === 1 || i === 3;
        return (
          <g key={s}>
            <circle cx={x(i)} cy={70} r={mine ? 14 : 10} className={mine ? g.accent : g.nodeModel} />
            <T x={x(i)} y={40} anchor="middle" accent={mine}>
              {s}
            </T>
          </g>
        );
      })}
      {calls.map((c) => (
        <g key={c.t}>
          <path d={`M${x(c.at)} 84 V${c.y - 4}`} className={g.faint} />
          <circle cx={x(c.at)} cy={c.y - 4} r={4} className={g.accentRing} />
          <T x={x(c.at) + 14} y={c.y}>
            {c.t}
          </T>
        </g>
      ))}
    </Diagram>
  );
}

/** Fork 1: shrink the grid onto a phone, or give mobile its own list. */
export function GridVsList() {
  return (
    <TwoOptions
      label="Diagram · the two options"
      aria="One layout everywhere: the desktop grid shrunk onto a phone, five narrow columns, hard to read. Grid on desktop, list on mobile: tap a flight, and its fares open as full-width rows with room for price and seats left."
      caption="Shrinking the grid kept one design and made every price hard to read on a phone. A list on mobile gives each fare a full row."
      warnAt={2}
      top={{ title: "one layout everywhere", items: ["desktop grid", "shrunk to a phone", "five narrow columns"], note: "hard to read" }}
      bottom={{ title: "grid on desktop, list on mobile", items: ["desktop grid", "phone: tap a flight", "fares as rows"], note: "room for price, seats left" }}
      mobile={twoPaths(
        { title: "one layout everywhere", items: ["desktop grid", "shrunk to a phone", "five narrow columns"], warn: [2], notes: ["one design to keep", "hard to read on a phone"] },
        { title: "grid on desktop, list on mobile", items: ["desktop grid", "phone: tap a flight", "fares as rows"], big: 2, notes: ["two layouts to keep in step", "room for price, seats left"] },
      )}
    />
  );
}

/** Fork 2: one total, or the total broken down beside the flights. */
export function TotalVsBreakdown() {
  return (
    <TwoOptions
      label="Diagram · the two options"
      aria="Total only: pick a fare, see one number, learn what it is made of at payment. Broken down: pick a fare, see the fare, tax, fees, and discount, with the total beside the flights."
      caption="A single total is cleaner and leaves the questions for payment. The breakdown answers them while people are still choosing."
      warnAt={2}
      top={{ title: "total only", items: ["pick a fare", "one number", "explained at payment"], note: "a surprise at the end" }}
      bottom={{ title: "the total, broken down", items: ["pick a fare", "fare, tax, fees, discount", "total beside flights"], note: "no surprise at payment" }}
      mobile={twoPaths(
        { title: "total only", items: ["pick a fare", "one number", "explained at payment"], warn: [2], notes: ["simpler panel", "a surprise at the end"] },
        { title: "the total, broken down", items: ["pick a fare", "fare, tax, fees, discount", "total beside flights"], big: 2, notes: ["longer panel", "no surprise at payment"] },
      )}
    />
  );
}

/** Fork 3: an add-on at every turn, or every add-on in one step. */
export function ExtrasOneStep() {
  return (
    <TwoOptions
      label="Diagram · the two options"
      aria="Add-ons spread through the flow: flights, a meal pop-up, a seat step, a baggage step, interrupted again and again. One Extras step: flights, guests, one step with every add-on, then pay."
      caption="Spreading add-ons through the flow sells each one at every turn and interrupts people each time. One step shows them all once."
      warnAt={3}
      top={{ title: "add-ons spread through the flow", items: ["flights", "meal pop-up", "seat step", "baggage step"], note: "stopped again and again" }}
      bottom={{ title: "one Extras step", items: ["flights", "guests", "one Extras step"], note: "every add-on, once" }}
      mobile={twoPaths(
        { title: "add-ons spread through the flow", items: ["flights", "meal pop-up", "seat step", "baggage step"], warn: [3], notes: ["each add-on its own stop", "stopped again and again"] },
        { title: "one Extras step", items: ["flights", "guests", "one Extras step"], big: 2, notes: ["one longer step", "every add-on, once"] },
      )}
    />
  );
}

/** Fork 4: a pop-up upgrade offer, or the offer inside the fare choice. */
export function UpsellInline() {
  return (
    <TwoOptions
      label="Diagram · the two options"
      aria="A pop-up offer: pick a fare, a pop-up interrupts, close it to carry on. An offer in place: pick a fare, the offer sits under it, upgrade or carry on."
      caption="A pop-up stops the choice and costs a click to dismiss. The offer in place sits where people are already comparing."
      warnAt={1}
      top={{ title: "a pop-up offer", items: ["pick a fare", "pop-up interrupts", "close it"], note: "an extra click to say no" }}
      bottom={{ title: "an offer in place", items: ["pick a fare", "offer under the fare", "upgrade or carry on"], note: "no extra click" }}
      mobile={twoPaths(
        { title: "a pop-up offer", items: ["pick a fare", "pop-up interrupts", "close it"], warn: [1], notes: ["louder", "an extra click to say no"] },
        { title: "an offer in place", items: ["pick a fare", "offer under the fare", "upgrade or carry on"], big: 2, notes: ["quieter", "no extra click"] },
      )}
    />
  );
}
