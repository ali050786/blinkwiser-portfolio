import styles from "./Section.module.css";

/*
 * Shared section furniture: a plain mono label, the headline and a short intro.
 */

export function Eyebrow({ label, className }: { label: string; className?: string }) {
  return <p className={`${styles.eyebrow} ${className ?? ""}`}>{label}</p>;
}

type HeadProps = {
  label: string;
  id: string;
  /** The first beat, in primary text. */
  lead: React.ReactNode;
  /** The second beat, in the accent. Optional: plain headings are fine. */
  turn?: React.ReactNode;
  /** An optional third beat, back in primary. */
  tail?: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  size?: "m" | "l";
  className?: string;
};

export function SectionHead({ label, id, lead, turn, tail, intro, align = "left", size = "m", className }: HeadProps) {
  return (
    <div className={`${styles.head} ${className ?? ""}`} data-align={align}>
      <Eyebrow label={label} />
      <h2 id={id} className={styles.title} data-size={size}>
        <span>{lead}</span>
        {turn && (
          <>
            {" "}
            <span className={styles.turn}>{turn}</span>
          </>
        )}
        {tail && (
          <>
            {" "}
            <span>{tail}</span>
          </>
        )}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}

/** A "+" registration mark for frame corners. */
export function Cross({ className }: { className?: string }) {
  return <span className={`${styles.cross} ${className ?? ""}`} aria-hidden="true" />;
}
