import base from "./FamilyReset.module.css";
import styles from "./SameRequest.module.css";

/**
 * Hero proof for the AI-readable design system case: one request, the same
 * components, two results. Readable as a still, in a demo brand with generic
 * content; no client screens, brands or token names.
 */

function Screen({ kind }: { kind: "old" | "new" }) {
  const old = kind === "old";
  return (
    <div className={styles.screen} data-kind={kind} aria-hidden="true">
      <div className={styles.top}>
        <span className={styles.logo} />
        <span className={styles.topLine} />
      </div>
      <div className={styles.frame}>
        <div className={styles.rail} data-missing={old || undefined}>
          {old ? (
            <Mark n={3} />
          ) : (
            <>
              <span className={styles.railItem} data-on />
              <span className={styles.railItem} />
              <span className={styles.railItem} />
            </>
          )}
        </div>
        <div className={styles.body}>
          <span className={styles.pageTitle}>Account summary</span>
          <div className={styles.tiles}>
            <div className={styles.tile}>
              <span className={styles.tileLabel}>Available balance</span>
              <span className={styles.tileValue}>$950.00</span>
              <span className={styles.link}>
                Transactions →{old && <Mark n={2} />}
              </span>
            </div>
            <div className={styles.tile} data-second>
              <span className={styles.line} style={{ width: "70%" }} />
              <span className={styles.line} style={{ width: "50%" }} />
              <span className={styles.line} style={{ width: "60%" }} />
            </div>
          </div>
          <div className={styles.foot}>
            {old ? (
              <>
                <span className={styles.primary}>
                  Save
                  <Mark n={1} />
                </span>
                <span className={styles.secondary}>Cancel</span>
              </>
            ) : (
              <>
                <span className={styles.secondary}>Cancel</span>
                <span className={styles.primary}>Save</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Mark({ n }: { n: number }) {
  return <span className={styles.mark}>{n}</span>;
}

export function SameRequest() {
  return (
    <figure className={`${base.card} ${styles.card}`}>
      <header className={base.head}>
        <p className={base.title}>The same request, given to the AI twice</p>
        <p className={base.change}>
          <span className={base.to}>Same AI</span>
          <span className={base.to}>Same components</span>
        </p>
      </header>
      <div className={base.cols}>
        <section className={base.col} data-kind="old" aria-label="Before the skills: off-brand">
          <p className={`t-label ${base.colLabel}`}>Before the skills</p>
          <Screen kind="old" />
          <ol className={styles.legend}>
            <li>Save on the wrong side</li>
            <li>Link in a button colour</li>
            <li>Side nav left out: docs said 19 components, the file had 20</li>
          </ol>
        </section>
        <section className={base.col} data-kind="new" aria-label="With the skills: on-brand">
          <p className={`t-label ${base.colLabel}`}>With the skills</p>
          <Screen kind="new" />
          <ul className={styles.okList}>
            <li>Save on the right</li>
            <li>Link takes the link colour</li>
            <li>Side nav in place: audit matched docs to file, 20 of 20</li>
          </ul>
        </section>
      </div>
    </figure>
  );
}
