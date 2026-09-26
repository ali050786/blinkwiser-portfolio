import styles from "./Reframe.module.css";

/** The Frame beat's signature: the assumed brief is struck out, the real problem is marked. */
export function Reframe({ assumed, actual }: { assumed: string; actual: string }) {
  return (
    <figure className={styles.reframe} data-reveal>
      <div className={styles.row}>
        <figcaption className="t-label c-tertiary">The assumed problem</figcaption>
        <p className={`t-heading-l ${styles.assumed}`}>
          <span className={styles.strike}>{assumed}</span>
        </p>
      </div>
      <div className={styles.turn} aria-hidden="true">
        <span className={styles.turnLine} />
        <span className="t-label c-accent">Reframed</span>
      </div>
      <div className={styles.row}>
        <p className="t-label c-accent">The real problem</p>
        <p className={`t-heading-l ${styles.actual}`}>
          <span className={styles.mark}>{actual}</span>
        </p>
      </div>
    </figure>
  );
}
