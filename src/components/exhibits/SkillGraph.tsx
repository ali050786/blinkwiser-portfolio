"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit } from "./Exhibit";
import styles from "./SkillGraph.module.css";

type Layer = "Reference" | "Build" | "Upkeep";
type Skill = { id: string; layer: Layer; role: string; worksWith: string[] };

const REF = ["ds-index", "ds-tokens", "ds-themes", "ds-components", "ds-layout"];

const skills: Skill[] = [
  { id: "ds-index", layer: "Reference", role: "The map: system overview, universal rules, and routing to the right sub-skill.", worksWith: REF.slice(1) },
  { id: "ds-tokens", layer: "Reference", role: "Color, spacing, typography, radius, and effects, each documented with its intended use.", worksWith: ["ds-themes", "ds-components", "ds-layout"] },
  { id: "ds-themes", layer: "Reference", role: "Five-brand theming through variable modes: color, logos, and brand text switch together.", worksWith: ["ds-tokens"] },
  { id: "ds-components", layer: "Reference", role: "A catalog of 43 component sets, and when and how to use each.", worksWith: ["ds-tokens"] },
  { id: "ds-layout", layer: "Reference", role: "The 12-column grid, containers, and secured versus unsecured page structure.", worksWith: ["ds-tokens"] },
  { id: "app-shells", layer: "Build", role: "Ready page templates every screen starts from.", worksWith: ["ds-layout", "ds-components"] },
  {
    id: "build-screen",
    layer: "Build",
    role: "The workflow: read the Jira story, classify the page, pick the shell, compose approved components, then check its own work.",
    worksWith: ["ds-index", "ds-tokens", "ds-themes", "ds-components", "ds-layout", "app-shells", "memory"],
  },
  { id: "sync-semantic-colors", layer: "Build", role: "Regenerates opacity ramps across every brand when a base color changes.", worksWith: ["ds-tokens", "ds-themes"] },
  { id: "ds-audit", layer: "Upkeep", role: "End-of-session drift check: diffs the live file against the docs and updates them.", worksWith: [...REF, "memory"] },
  { id: "memory", layer: "Upkeep", role: "Cross-session decisions and conventions, so the agent doesn't relearn them.", worksWith: ["build-screen", "ds-audit"] },
  { id: "manage-skills-workflow", layer: "Upkeep", role: "Governance: every skill saved to the design file, version control, and a guide page.", worksWith: ["ds-index", "ds-audit"] },
  { id: "document-feature", layer: "Upkeep", role: "Captures a finished feature as a reusable spec for the next one.", worksWith: ["ds-components", "memory"] },
];

const layers: { name: Layer; blurb: string }[] = [
  { name: "Reference", blurb: "What the system is" },
  { name: "Build", blurb: "How to make a screen" },
  { name: "Upkeep", blurb: "How it stays honest" },
];

const stats = [
  ["5", "brands, by mode"],
  ["43", "component sets"],
  ["141", "described variables"],
  ["3", "density modes"],
  ["12", "column grid"],
];

export function SkillGraph() {
  const [selected, setSelected] = useState("build-screen");
  const reduce = useReducedMotion();
  const current = skills.find((s) => s.id === selected)!;
  const related = new Set([...current.worksWith, ...skills.filter((s) => s.worksWith.includes(selected)).map((s) => s.id)]);

  return (
    <Exhibit label="Interactive · the skill library" title="A design system an agent can read" caption="Select a skill to see what it holds and what it works with.">
      <div className={styles.grid}>
        {layers.map((l) => (
          <div key={l.name} className={styles.layer}>
            <p className={styles.layerHead}>
              <span className="t-label">{l.name}</span>
              <span className="t-body-s c-tertiary">{l.blurb}</span>
            </p>
            <ul className={styles.skills}>
              {skills
                .filter((s) => s.layer === l.name)
                .map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={styles.skill}
                      aria-pressed={selected === s.id}
                      data-related={related.has(s.id) || undefined}
                      data-dim={selected !== s.id && !related.has(s.id) ? true : undefined}
                      onClick={() => setSelected(s.id)}
                    >
                      <span className={styles.file} aria-hidden="true" />
                      <span className="t-mono">{s.id}</span>
                      <span className={styles.ext}>.md</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.detail} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={styles.detailInner}
          >
            <div>
              <p className="t-label c-accent">
                {current.layer} · {current.id}.md
              </p>
              <p className={styles.role}>{current.role}</p>
            </div>
            <div>
              <p className="t-label c-tertiary">Works with</p>
              <p className={styles.chips}>
                {[...related].map((r) => (
                  <button key={r} type="button" className={styles.chip} onClick={() => setSelected(r)}>
                    {r}
                  </button>
                ))}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <dl className={styles.stats}>
        {stats.map(([v, k]) => (
          <div key={k}>
            <dt className="t-body-s c-tertiary">{k}</dt>
            <dd className="tabular">{v}</dd>
          </div>
        ))}
      </dl>
    </Exhibit>
  );
}
