import styles from "./Reframe.module.css";

/** The Frame beat: the brief as asked is struck out, what I found is marked. */
export function Reframe({ assumed, actual }: { assumed: string; actual: string }) {
  return (
    <figure className={styles.reframe} data-reveal>
      <div className={styles.row}>
        <figcaption className="t-label c-tertiary">What I was asked</figcaption>
        <p className={`t-heading-l ${styles.assumed}`}>
          <span className={styles.strike}>{assumed}</span>
        </p>
      </div>
      <div className={styles.turn} aria-hidden="true">
        <span className={styles.turnLine} />
        <span className="t-label c-accent">What I found</span>
      </div>
      <div className={styles.row}>
        <p className={`t-heading-l ${styles.actual}`}>
          <span className={styles.mark}>{actual}</span>
        </p>
      </div>
    </figure>
  );
}
