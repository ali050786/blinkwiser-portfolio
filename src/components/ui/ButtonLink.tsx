import Link from "next/link";
import { Icon } from "./Icon";
import styles from "./ButtonLink.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: "arrow-right" | "arrow-up-right" | "arrow-left";
  external?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", icon = "arrow-right", external, className }: Props) {
  const content = (
    <>
      <span>{children}</span>
      <span className={styles.icon}>
        <Icon name={icon} size={16} />
      </span>
    </>
  );
  const cls = `${styles.button} ${styles[variant]} ${className ?? ""}`;
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
