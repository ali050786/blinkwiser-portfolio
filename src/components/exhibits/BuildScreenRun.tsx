"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit, ExhibitButton, Segmented } from "./Exhibit";
import { Icon } from "@/components/ui/Icon";
import styles from "./BuildScreenRun.module.css";

type Mode = "stale" | "skills";

const steps = [
  { title: "Read the story", detail: "“As a member, I want to compare dental plans side by side so I can pick the right coverage.”" },
  { title: "Classify the page", detail: "Secured page · plan comparison" },
  { title: "Pick the shell", detail: "app-shells / secured, two-column" },
  { title: "Compose sanctioned components", detail: "Header ◆  Title ◆  PlanCard ◆ ×3  Button ◆" },
  { title: "Self-verify", detail: "Run the checklist before handing back" },
];

const checks = ["Zero hardcoded colours", "Published styles only", "Every element is an instance", "Theme switch tested, Brand A → B"];
const failures = [
  "Colours hardcoded per component",
  "A different grid from screen to screen",
  "Elements redrawn, not placed as instances",
  "Doesn't feel like the product",
];

export function BuildScreenRun() {
  const [mode, setMode] = useState<Mode>("skills");
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState<"a" | "b">("a");
  const [checked, setChecked] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = useCallback(() => {
    clear();
    setBrand("a");
    if (reduce) {
      setStep(5);
      setChecked(checks.length);
      return;
    }
    setStep(0);
    setChecked(0);
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    steps.forEach((_, i) => at(350 + i * 950, () => setStep(i + 1)));
    const verifyAt = 350 + 4 * 950;
    checks.forEach((_, i) => at(verifyAt + 300 + i * 380, () => setChecked(i + 1)));
    at(verifyAt + 300 + 3 * 380, () => setBrand("b"));
    at(verifyAt + 300 + 3 * 380 + 1100, () => setBrand("a"));
  }, [reduce]);

  useEffect(() => {
    if (inView && mode === "skills") run();
    return clear;
  }, [inView, mode, run]);

  const stale = mode === "stale";

  return (
    <Exhibit
      label="Interactive · build-screen workflow"
      title="From Jira story to a verified screen"
      caption={stale ? "The same story against the stale system: real components, wrong result." : "Replay the run, or switch to the stale system to see how it failed before."}
      controls={
        <>
          <Segmented<Mode>
            label="System the agent reads"
            value={mode}
            onChange={(m) => {
              clear();
              setMode(m);
            }}
            options={[
              { value: "stale", label: "Stale system" },
              { value: "skills", label: "Skill files" },
            ]}
          />
          {!stale && (
            <ExhibitButton onClick={run} icon={<Icon name="replay" size={15} />}>
              Replay
            </ExhibitButton>
          )}
        </>
      }
    >
      <div ref={ref} className={styles.grid}>
        <ol className={styles.steps} aria-label="Workflow steps">
          {stale
            ? failures.map((f) => (
                <li key={f} className={styles.step} data-state="fail">
                  <span className={styles.status}>
                    <Icon name="cross" size={14} />
                  </span>
                  <span className={styles.stepTitle}>{f}</span>
                </li>
              ))
            : steps.map((s, i) => {
                const state = step > i + 1 || (i === 4 && checked === checks.length) ? "done" : step === i + 1 ? "active" : "pending";
                return (
                  <li key={s.title} className={styles.step} data-state={state}>
                    <span className={styles.status}>{state === "done" ? <Icon name="check" size={14} /> : <span className="t-mono">{i + 1}</span>}</span>
                    <span>
                      <span className={styles.stepTitle}>{s.title}</span>
                      <span className={`t-body-s c-secondary ${styles.stepDetail}`}>{s.detail}</span>
                      {i === 4 && step >= 5 && (
                        <ul className={styles.checks}>
                          {checks.map((c, ci) => (
                            <li key={c} data-ok={ci < checked || undefined}>
                              <Icon name="check" size={12} /> {c}
                            </li>
                          ))}
                        </ul>
                      )}
                    </span>
                  </li>
                );
              })}
        </ol>

        <div className={styles.canvas} data-brand={brand} data-mode={mode} aria-label={stale ? "Output from the stale system" : "Screen being composed"} role="img">
          <div className={styles.frame}>
            <div className={styles.grid12} data-show={stale || step >= 3 || undefined} aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <i key={i} />
              ))}
            </div>
            <AnimatePresence>
              {(stale || step >= 3) && (
                <motion.div key={`shell-${mode}`} className={styles.shell} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className={styles.header} data-bad={stale || undefined}>
                    <span className={styles.logo} />
                    <span className={styles.line} style={{ width: 70 }} />
                    <span className={styles.avatar} />
                    {!stale && <Badge />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={styles.body}>
              {(stale || step >= 4) && (
                <>
                  <motion.div
                    key={`title-${mode}`}
                    className={styles.title}
                    data-bad={stale || undefined}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span>Compare dental plans</span>
                    {stale ? <Tag>Text 4</Tag> : <Badge />}
                  </motion.div>
                  <div className={styles.cards}>
                    {["Basic", "Plus", "Premier"].map((p, i) => (
                      <motion.div
                        key={`${p}-${mode}`}
                        className={styles.card}
                        data-bad={stale ? i : undefined}
                        data-selected={i === 1 || undefined}
                        initial={reduce ? false : { opacity: 0, y: 14, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: reduce ? 0 : 0.12 * i + 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className={styles.plan}>{p}</span>
                        <span className={styles.price}>${[18, 27, 39][i]}</span>
                        <span className={styles.line} style={{ width: "70%" }} />
                        <span className={styles.line} style={{ width: "52%" }} />
                        {stale ? <Tag>Rectangle {12 + i}</Tag> : <Badge />}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    key={`cta-${mode}`}
                    className={styles.cta}
                    data-bad={stale || undefined}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduce ? 0 : 0.55 }}
                  >
                    Continue {stale ? <Tag>Group 7</Tag> : <Badge />}
                  </motion.div>
                </>
              )}
              {!stale && step < 3 && (
                <p className={`t-body-s c-tertiary ${styles.waiting}`}>{step === 0 ? "Waiting for the story…" : step === 1 ? "Reading the story…" : "Classifying the page…"}</p>
              )}
            </div>
          </div>
          <div className={styles.legend}>
            {stale ? (
              <span className="t-label c-tertiary">Tags show what the agent drew: loose shapes, not components</span>
            ) : (
              <span className="t-label c-tertiary">
                <span className={styles.diamond} aria-hidden="true" /> instance of a published component · Brand {brand.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Exhibit>
  );
}

function Badge() {
  return <span className={styles.badge} aria-hidden="true" />;
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}
