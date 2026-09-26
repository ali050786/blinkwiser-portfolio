import styles from "./Beat.module.css";

export function Beat({
  id,
  n,
  label,
  question,
  children,
}: {
  id: string;
  n: string;
  label: string;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.beat} aria-labelledby={`${id}-title`} data-beat={id}>
      <header className={styles.head} data-reveal>
        <p className="t-label">
          <span className="c-accent">{n}</span>
          <span className="c-tertiary"> / 05</span>
        </p>
        <h2 id={`${id}-title`} className="t-display-m">
          {label}
        </h2>
        <p className={`t-serif-em c-secondary ${styles.question}`}>{question}</p>
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
