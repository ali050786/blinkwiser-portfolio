"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/lib/motion";
import base from "./FamilyReset.module.css";
import styles from "./DsProofs.module.css";

/**
 * Hero proofs for the AI-readable design system case. Same card language as the
 * enrollment proofs: a title saying what happens, before and after side by side,
 * readable as a still; motion only replays the moment. Generic names throughout,
 * no client screens, brands or real token names.
 */

function useReplay(delay = 1100) {
  const reduce = useReducedMotionSafe();
  // Server render and reduced motion show the end state, so the point never depends on animation.
  const [done, setDone] = useState(true);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    setDone(false);
    const t = window.setTimeout(() => setDone(true), delay);
    return () => clearTimeout(t);
  }, [reduce, run, delay]);
  return { done, reduce, replay: () => setRun((r) => r + 1) };
}

function Replay({ onClick, label = "Replay" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" className={base.replay} onClick={onClick}>
      ↻ {label}
    </button>
  );
}

function Col({ kind, label, children }: { kind: "old" | "new"; label: string; children: React.ReactNode }) {
  return (
    <section className={base.col} data-kind={kind} aria-label={label}>
      <p className={`t-label ${base.colLabel}`}>{label}</p>
      {children}
    </section>
  );
}

function Result({ off, value, label, word }: { off?: boolean; value: string; label: string; word?: boolean }) {
  return (
    <p className={base.result} data-off={off || undefined}>
      <span className={`tabular ${base.count} ${word ? styles.word : ""}`}>{value}</span>
      <span className={base.resultLabel}>{label}</span>
    </p>
  );
}

/* ------------------------------------------------------------ 01 The button */

export function SaveSide() {
  const { done, reduce, replay } = useReplay();

  const panel = (kind: "old" | "new") => (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <span>Spending account</span>
        <span aria-hidden="true" className={styles.close}>
          ✕
        </span>
      </div>
      <div className={styles.panelBody} aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className={styles.option}>
            <span className={styles.radio} data-on={i === 0 || undefined} />
            <span className={styles.bar} style={{ width: i === 0 ? "62%" : "48%" }} />
          </div>
        ))}
      </div>
      <div className={styles.panelFoot} data-side={kind === "old" ? "left" : "right"} data-shown={done || undefined}>
        {kind === "old" ? (
          <>
            <span className={styles.btnPrimary} data-wrong>
              Save
            </span>
            <span className={styles.btnLink}>Cancel</span>
          </>
        ) : (
          <>
            <span className={styles.btnLink}>Cancel</span>
            <span className={styles.btnPrimary}>Save</span>
          </>
        )}
      </div>
    </div>
  );

  return (
    <figure className={base.card}>
      <header className={base.head}>
        <p className={base.title}>Where the AI put Save on the same panel</p>
        <p className={base.change}>
          <span className={base.to}>Same request</span>
          <span className={base.to}>Same components</span>
          <span className="c-tertiary">different rules</span>
        </p>
      </header>
      <div className={base.cols}>
        <Col kind="old" label="Before the skills">
          {panel("old")}
          <p className={styles.rule} data-off>
            Rule in the system: none
          </p>
          <Result off value="0" label="lines saying where Save goes" />
        </Col>
        <Col kind="new" label="With the skills">
          {panel("new")}
          <p className={styles.rule}>“Primary on the right, Secondary on the left.”</p>
          <Result value="1" label="line, now in a skill the AI reads first" />
        </Col>
      </div>
      {!reduce && <Replay onClick={replay} />}
    </figure>
  );
}

/* ------------------------------------------------------------ 02 The color */

const swatches = [
  { id: "a", look: "Green", job: "Button" },
  { id: "b", look: "Navy", job: "Link" },
  { id: "c", look: "Grey 3", job: "Hint text" },
] as const;

export function LinkColour() {
  const { done, reduce, replay } = useReplay();

  const column = (kind: "old" | "new") => {
    const pick = kind === "old" ? "a" : "b";
    return (
      <Col kind={kind} label={kind === "old" ? "Before the skills" : "With the skills"}>
        <p className={styles.sub}>{kind === "old" ? "Colors named for how they look" : "Colors named for their job"}</p>
        <ul className={styles.swatches}>
          {swatches.map((s) => (
            <li key={s.id} className={styles.swatchRow} data-picked={(done && s.id === pick) || undefined} data-kind={kind}>
              <span className={styles.swatch} data-c={s.id} />
              <span>{kind === "old" ? s.look : s.job}</span>
            </li>
          ))}
        </ul>
        <div className={styles.mini} aria-hidden="true">
          <span className={styles.miniLabel}>Available balance</span>
          <span className={styles.miniValue}>$950.00</span>
          <span className={styles.miniLink} data-c={done ? pick : undefined}>
            View transactions →
          </span>
        </div>
        {kind === "old" ? (
          <Result word off value="Guess" label="nothing said which color a link takes" />
        ) : (
          <Result word value="Rule" label="the link takes the color named Link" />
        )}
      </Col>
    );
  };

  return (
    <figure className={base.card}>
      <header className={base.head}>
        <p className={base.title}>Which color the AI gave a link</p>
        <p className={base.change}>
          <span className={base.to}>Same three colors</span>
          <span className="c-tertiary">named two ways</span>
        </p>
      </header>
      <div className={base.cols}>
        {column("old")}
        {column("new")}
      </div>
      {!reduce && <Replay onClick={replay} />}
    </figure>
  );
}

/* ------------------------------------------------------------ 03 The audit */

export function AuditDrift() {
  const { done, reduce, replay } = useReplay(1300);

  const counts = (
    <ul className={styles.diff}>
      <li className={base.row}>
        <span className={base.name}>Docs</span>
        <span className={base.price}>19 components</span>
      </li>
      <li className={base.row}>
        <span className={base.name}>File</span>
        <span className={base.price}>20 components</span>
      </li>
    </ul>
  );

  return (
    <figure className={base.card}>
      <header className={base.head}>
        <p className={base.title}>What the audit caught on 4 September</p>
        <p className={base.change}>
          <span className={base.to}>The docs</span>
          <span aria-hidden="true" className={base.arrow}>
            ↔
          </span>
          <span className={base.to}>The Figma file</span>
        </p>
      </header>
      <div className={base.cols}>
        <Col kind="old" label="Docs alone">
          {counts}
          <p className={styles.rule} data-off>
            Nobody compares them
          </p>
          <Result off value="19" label="what the AI would keep reading" />
        </Col>
        <Col kind="new" label="With the audit">
          {counts}
          <ul className={styles.diff}>
            <li className={base.row} data-off={done || undefined} data-dim={!done || undefined}>
              <span className={base.name}>1 missing: side navigation</span>
              <span className={base.state} data-off>
                flagged
              </span>
            </li>
            <li className={base.row} data-total={done || undefined} data-dim={!done || undefined}>
              <span className={base.name}>Docs updated</span>
              <span className={base.price}>20 ✓</span>
            </li>
          </ul>
          <Result value="20" label="docs match the file again" />
        </Col>
      </div>
      {!reduce && <Replay onClick={replay} label="Replay the audit" />}
    </figure>
  );
}
