import styles from "./HookFrame.module.css";

/** A numbered red mark on a hero screen. Its number ties it to a tab and a legend line. */
export function HookMark({ n }: { n: number }) {
  return (
    <span className={styles.mark} data-n={n} data-mark="">
      {n}
    </span>
  );
}
