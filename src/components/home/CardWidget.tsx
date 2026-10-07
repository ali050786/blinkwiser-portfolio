import type { CardWidget as Kind } from "@/content/types";
import styles from "./CardWidget.module.css";

/* Invented demo brands, never client colors. */
const brands = ["#0f766e", "#7c3aed", "#c2410c"];

const labels: Record<Kind, string> = {
  stepper: "Nine steps reduced to five",
  brands: "The same screen themed for three different client brands",
  pipeline: "Figma to an AI agent to a finished screen, with the agent checking its own drift",
  slides: "A fanned set of carousel slides",
  departments: "Nine separate department tiles collapse into one home",
};

/** One visual per home-page card, so the proof is seen rather than read. */
export function CardWidget({ kind }: { kind: Kind }) {
  return (
    <span className={styles.widget} role="img" aria-label={labels[kind]}>
      {kind === "stepper" && (
        <span className={styles.stepper}>
          <span>{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</span>
          <span data-after>{Array.from({ length: 5 }, (_, i) => <i key={i} />)}</span>
        </span>
      )}

      {kind === "brands" && (
        <span className={styles.brands}>
          {brands.map((c) => (
            <span key={c} className={styles.mini} style={{ "--c": c } as React.CSSProperties}>
              <i className={styles.miniHead} />
              <span className={styles.miniBody}>
                <i />
                <i style={{ width: "70%" }} />
                <b />
              </span>
            </span>
          ))}
        </span>
      )}

      {kind === "pipeline" && (
        <span className={styles.pipeline} aria-hidden="true">
          <span className={styles.node}>
            <svg viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="2" /><path d="M10 3v14" /></svg>
          </span>
          <span className={styles.arrow}>→</span>
          <span className={styles.node} data-agent>
            <svg viewBox="0 0 20 20"><path d="M10 3v14M3 10h14M5 5l10 10M15 5 5 15" /></svg>
          </span>
          <span className={styles.arrow}>→</span>
          <span className={styles.node}>
            <svg viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="2" /><path d="M6 7h8M6 10h8M6 13h5" /></svg>
          </span>
          <span className={styles.note}>checks its own drift</span>
        </span>
      )}

      {kind === "slides" && (
        <span className={styles.slides} aria-hidden="true">
          {[-6, 0, 6].map((r, i) => (
            <span key={r} className={styles.slide} style={{ left: i * 40, transform: `rotate(${r}deg)`, zIndex: i === 1 ? 2 : 1 }}>
              <i data-h />
              <i />
              <i style={{ width: i === 1 ? "60%" : "100%" }} />
            </span>
          ))}
        </span>
      )}

      {kind === "departments" && (
        <span className={styles.departments} aria-hidden="true">
          <span className={styles.tiles}>
            {Array.from({ length: 9 }, (_, i) => <i key={i} />)}
          </span>
          <span className={styles.arrow}>→</span>
          <span className={styles.home}>
            <svg viewBox="0 0 20 20"><path d="M3 10.5 10 4l7 6.5V17a1 1 0 0 1-1 1h-3.5v-5h-5v5H4a1 1 0 0 1-1-1z" /></svg>
          </span>
        </span>
      )}
    </span>
  );
}
