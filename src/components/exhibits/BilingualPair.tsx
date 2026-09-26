"use client";

import { useState } from "react";
import { Exhibit, Segmented } from "./Exhibit";
import { ServiceCard } from "./ServiceCard";
import styles from "./BilingualPair.module.css";

type Mode = "template" | "anatomy";

const anatomy = ["Eligibility", "Documents", "Fees", "Steps", "Status"];

export function BilingualPair() {
  const [mode, setMode] = useState<Mode>("template");

  return (
    <Exhibit
      label="Interactive · one service template, two directions"
      title="Every service, the same five answers, in the same place"
      caption="Designed side by side from the first wireframe. The Arabic layout mirrors through logical properties, not a second design."
      note="Generic service content for illustration. Not the client's app."
      controls={
        <Segmented<Mode>
          label="View"
          value={mode}
          onChange={setMode}
          options={[
            { value: "template", label: "Template" },
            { value: "anatomy", label: "Show anatomy" },
          ]}
        />
      }
    >
      <div className={styles.pair} data-mode={mode}>
        {(["en", "ar"] as const).map((k) => (
          <ServiceCard key={k} lang={k} />
        ))}
      </div>
      <ol className={styles.legend} data-show={mode === "anatomy" || undefined}>
        {anatomy.map((a, i) => (
          <li key={a}>
            <span className={styles.num}>{i + 1}</span>
            {a}
          </li>
        ))}
        <li className="t-body-s c-tertiary">
          Same slots for every service, so a new one fits the template instead
          of reopening the design.
        </li>
      </ol>
    </Exhibit>
  );
}
