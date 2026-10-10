"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit, ExhibitButton } from "./Exhibit";
import { Icon } from "@/components/ui/Icon";
import styles from "./PipelineRun.module.css";

export type Kind = "input" | "model" | "code" | "output";
export type Node = { id: string; name: string; kind: Kind; detail: string };
export type Col = { nodes: Node[]; start: number; end: number; parallel?: boolean };

export const cols: Col[] = [
  { start: 0, end: 1, nodes: [{ id: "topic", name: "Topic", kind: "input", detail: "The creator's topic, source material, or request." }] },
  { start: 1, end: 8, nodes: [{ id: "research", name: "Fact sheet", kind: "model", detail: "Research becomes a numbered fact sheet with sources, the only place numbers may come from." }] },
  { start: 8, end: 12, nodes: [{ id: "outline", name: "Outline", kind: "model", detail: "Fixes the slide count and assigns facts to slides, so length and structure are decided before writing." }] },
  {
    start: 12,
    end: 19,
    parallel: true,
    nodes: [
      { id: "hooks", name: "Cover hooks ×4", kind: "model", detail: "Four cover options compete on a rubric that code scores." },
      { id: "writer", name: "Writer", kind: "model", detail: "Drafts slide copy against the outline and the fact sheet." },
    ],
  },
  { start: 19, end: 20.5, nodes: [{ id: "rules", name: "Rules", kind: "code", detail: "Character limits, slide counts, and accent highlights are checked, not requested." }] },
  {
    start: 20.5,
    end: 22.5,
    nodes: [{ id: "grounding", name: "Grounding", kind: "code", detail: "Every number must trace to the fact sheet, the user's source, or their request, or its slide is downgraded." }],
  },
  {
    start: 23,
    end: 31,
    parallel: true,
    nodes: [
      { id: "critic", name: "Critic", kind: "model", detail: "Reviews the draft for flow and clarity, in parallel with the fact-check." },
      { id: "factcheck", name: "Fact-check", kind: "model", detail: "Re-checks claims against the evidence while the first slides are already visible." },
    ],
  },
  { start: 23, end: 32, nodes: [{ id: "deck", name: "Deck", kind: "output", detail: "First slides appear around 23 seconds; the full deck lands around 32." }] },
];

const TOTAL = 32;
const SPEED = 5; // simulated seconds per real second

export function PipelineRun() {
  const [t, setT] = useState(0);
  const [focus, setFocus] = useState<Node | null>(null);
  const [running, setRunning] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const raf = useRef(0);

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (reduce) {
      setT(TOTAL);
      return;
    }
    setRunning(true);
    const t0 = performance.now();
    const tick = (now: number) => {
      const s = Math.min(TOTAL, ((now - t0) / 1000) * SPEED);
      setT(s);
      if (s < TOTAL) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
  }, [reduce]);

  useEffect(() => {
    if (inView) run();
    return () => cancelAnimationFrame(raf.current);
  }, [inView, run]);

  const stateOf = (c: Col) => (t >= c.end ? "done" : t >= c.start ? "active" : "pending");
  const activeNode = focus ?? cols.find((c) => stateOf(c) === "active")?.nodes[0] ?? cols[cols.length - 1]!.nodes[0]!;
  const firstSlides = t >= 23;

  return (
    <Exhibit
      label="Interactive · generation pipeline"
      title="Anything that must be true is checked in code"
      caption="Hover or focus a step to see what it enforces. Timeline markers are measured averages; stage timing in between is illustrative."
      note="Redrawn from the product's architecture. Simplified."
      controls={
        <ExhibitButton onClick={run} disabled={running} icon={<Icon name={t > 0 ? "replay" : "play"} size={15} />}>
          {t > 0 ? "Replay" : "Run"}
        </ExhibitButton>
      }
    >
      <div ref={ref} className={styles.pipe}>
        {cols.map((c, ci) => (
          <div key={ci} className={styles.col} data-state={stateOf(c)} data-parallel={c.parallel || undefined}>
            {c.parallel && <span className={`t-label ${styles.parallel}`}>in parallel</span>}
            {c.nodes.map((n) => (
              <button
                key={n.id}
                type="button"
                className={styles.node}
                data-kind={n.kind}
                data-focus={activeNode.id === n.id || undefined}
                onMouseEnter={() => setFocus(n)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(n)}
                onBlur={() => setFocus(null)}
                aria-describedby="pipe-detail"
              >
                <span className={styles.icon} aria-hidden="true" />
                <span>{n.name}</span>
                {n.id === "deck" && (
                  <span className={styles.slides} aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <i key={i} data-on={(firstSlides && (i < 3 || t >= 30 + i * 0.5)) || undefined} />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      <p id="pipe-detail" className={styles.detail} aria-live="polite">
        <span className="t-label c-accent">{activeNode.name}</span>
        <span>{activeNode.detail}</span>
      </p>

      <div className={styles.timeline} aria-hidden="true">
        <div className={styles.bar}>
          <span className={styles.fill} style={{ transform: `scaleX(${t / TOTAL})` }} />
          <span className={styles.marker} style={{ left: `${(23 / TOTAL) * 100}%` }} data-hit={firstSlides || undefined}>
            <span className="t-label">about 23 s · first slides</span>
          </span>
          <span className={styles.marker} style={{ left: "100%" }} data-hit={t >= TOTAL || undefined}>
            <span className="t-label">about 31 s · deck</span>
          </span>
        </div>
        <span className={`t-mono tabular ${styles.clock}`}>{t.toFixed(1)} s</span>
      </div>

      <ul className={styles.legend}>
        <li>
          <span className={styles.icon} data-kind="model" aria-hidden="true" /> Model call
        </li>
        <li>
          <span className={styles.icon} data-kind="code" aria-hidden="true" /> Checked in code
        </li>
      </ul>
    </Exhibit>
  );
}
