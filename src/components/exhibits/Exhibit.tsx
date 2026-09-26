import styles from "./Exhibit.module.css";

type Props = {
  label: string;
  title: string;
  caption?: string;
  controls?: React.ReactNode;
  children: React.ReactNode;
  note?: string;
};

/** Frame for every interactive exhibit: label, title, optional controls, and a public-safe note. */
export function Exhibit({ label, title, caption, controls, children, note = "Redrawn with demo brands and illustrative data. No client screens or internal files." }: Props) {
  return (
    <figure className={styles.exhibit} data-reveal>
      <header className={styles.head}>
        <div className={styles.titles}>
          <p className="t-label">
            <span className={styles.live} aria-hidden="true" />
            {label}
          </p>
          <h4 className="t-heading-m">{title}</h4>
        </div>
        {controls && <div className={styles.controls}>{controls}</div>}
      </header>
      <div className={styles.body}>{children}</div>
      <figcaption className={styles.foot}>
        {caption && <span className="t-body-s c-secondary">{caption}</span>}
        <span className="t-label c-tertiary">{note}</span>
      </figcaption>
    </figure>
  );
}

/** Segmented control used across exhibits. */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={styles.segmented}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          className={styles.segment}
          onClick={() => onChange(o.value)}
          onKeyDown={(e) => {
            const i = options.findIndex((x) => x.value === value);
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              onChange(options[(i + 1) % options.length]!.value);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              onChange(options[(i - 1 + options.length) % options.length]!.value);
            }
          }}
          tabIndex={value === o.value ? 0 : -1}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Primary action inside an exhibit (Run, Replay, Reset). */
export function ExhibitButton({ children, onClick, icon, disabled }: { children: React.ReactNode; onClick: () => void; icon?: React.ReactNode; disabled?: boolean }) {
  return (
    <button type="button" className={styles.action} onClick={onClick} disabled={disabled}>
      {icon}
      {children}
    </button>
  );
}
