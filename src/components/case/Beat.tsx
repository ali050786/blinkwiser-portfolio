import styles from "./Beat.module.css";

export function Beat({
  id,
  label,
  children,
}: {
  id: string;
  /** n and question stay in the data (the rail shows n); the heading shows only the label. */
  n: string;
  label: string;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.beat} aria-labelledby={`${id}-title`} data-beat={id}>
      <header className={styles.head} data-reveal>
        <h2 id={`${id}-title`} className="t-display-m">
          {label}
        </h2>
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
