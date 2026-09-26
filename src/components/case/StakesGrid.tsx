import styles from "./StakesGrid.module.css";

export function StakesGrid({ intro, items }: { intro?: string; items: { title: string; body: string }[] }) {
  return (
    <div className={styles.wrap}>
      {intro && <p className="t-body-l c-secondary prose">{intro}</p>}
      <ul className={styles.grid} data-count={items.length}>
        {items.map((it, i) => (
          <li key={it.title} className={styles.item} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
            <span className={`t-mono ${styles.index}`}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className="t-heading-m">{it.title}</h3>
            <p className="t-body-s c-secondary">{it.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
