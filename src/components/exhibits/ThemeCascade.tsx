"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit } from "./Exhibit";
import {
  ThemeDevices,
  employer,
  insurers,
  type InsurerId,
} from "./ThemeDevices";
import styles from "./ThemeCascade.module.css";

type Tier = "Insurer" | "Employer" | "Member";

export function ThemeCascade() {
  const [ins, setIns] = useState<InsurerId>("a");
  const [cobrand, setCobrand] = useState(false);
  const [compact, setCompact] = useState(false);
  const [large, setLarge] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();
  const b = insurers[ins];

  const tokens: { name: string; value: string; swatch?: string; from: Tier }[] =
    [
      {
        name: "color.brand.primary",
        value: b.primary,
        swatch: b.primary,
        from: "Insurer",
      },
      { name: "shape.radius", value: `${b.radius}px`, from: "Insurer" },
      {
        name: "color.brand.accent",
        value: cobrand ? employer.accent : b.accent,
        swatch: cobrand ? employer.accent : b.accent,
        from: cobrand ? "Employer" : "Insurer",
      },
      {
        name: "brand.cobrand",
        value: cobrand ? employer.name : "none",
        from: cobrand ? "Employer" : "Insurer",
      },
      {
        name: "density",
        value: compact ? "compact" : "comfortable",
        from: compact ? "Member" : "Insurer",
      },
      {
        name: "type.scale",
        value: large ? "115%" : "100%",
        from: large ? "Member" : "Insurer",
      },
    ];

  return (
    <Exhibit
      label="Interactive · three-tier theming"
      title="A new client is a configuration, not a project"
      caption="Each tier inherits from the one above and overrides only what it owns. Watch where each token resolves from."
    >
      <div className={styles.tiers}>
        <fieldset className={styles.tier} data-tier="Insurer">
          <legend>
            <span className="t-mono">T1</span> Insurer
          </legend>
          <p className="t-body-s c-tertiary">
            Owns brand color, shape, and logo
          </p>
          <div
            className={styles.brandPick}
            role="radiogroup"
            aria-label="Insurer brand"
          >
            {(Object.keys(insurers) as InsurerId[]).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={ins === k}
                className={styles.brandBtn}
                onClick={() => setIns(k)}
                style={{ "--sw": insurers[k].primary } as React.CSSProperties}
              >
                <span className={styles.sw} aria-hidden="true" />
                {insurers[k].name}
              </button>
            ))}
          </div>
        </fieldset>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <fieldset className={styles.tier} data-tier="Employer">
          <legend>
            <span className="t-mono">T2</span> Employer
          </legend>
          <p className="t-body-s c-tertiary">Can co-brand: accent and logo</p>
          <Toggle
            id={`${id}-cobrand`}
            checked={cobrand}
            onChange={setCobrand}
            label="Co-brand with Employer Co."
          />
        </fieldset>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <fieldset className={styles.tier} data-tier="Member">
          <legend>
            <span className="t-mono">T3</span> Member
          </legend>
          <p className="t-body-s c-tertiary">Owns personal preferences</p>
          <Toggle
            id={`${id}-compact`}
            checked={compact}
            onChange={setCompact}
            label="Compact density"
          />
          <Toggle
            id={`${id}-large`}
            checked={large}
            onChange={setLarge}
            label="Larger text"
          />
        </fieldset>
      </div>

      <div className={styles.stage}>
        <ThemeDevices
          ins={ins}
          cobrand={cobrand}
          compact={compact}
          large={large}
          reduce={!!reduce}
        />
        <table className={styles.table}>
          <caption className="sr-only">
            Resolved tokens and the tier each comes from
          </caption>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Value</th>
              <th scope="col">From</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => (
              <tr key={t.name}>
                <td className="t-mono">{t.name}</td>
                <td>
                  <span className={styles.val}>
                    {t.swatch && (
                      <span
                        className={styles.swatch}
                        style={{ background: t.swatch }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="t-mono">{t.value}</span>
                  </span>
                </td>
                <td>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={t.from}
                      className={styles.from}
                      data-tier={t.from}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t.from}
                    </motion.span>
                  </AnimatePresence>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Exhibit>
  );
}

function Toggle({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label htmlFor={id} className={styles.toggle}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.track} aria-hidden="true">
        <span />
      </span>
      {label}
    </label>
  );
}
