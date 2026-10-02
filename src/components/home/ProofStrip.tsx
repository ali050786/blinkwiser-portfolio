import { proof } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { ProofList, type ProofItem } from "./ProofList";
import styles from "./ProofStrip.module.css";

export function ProofStrip() {
  const items: ProofItem[] = proof.map((p) => {
    const c = caseStudies.find((s) => s.index === p.study)!;
    return {
      key: p.label,
      value: p.value,
      decimals: "decimals" in p ? (p.decimals ?? 0) : 0,
      prefix: p.prefix,
      suffix: p.suffix,
      label: p.label,
      text: "text" in p ? p.text : undefined,
      study: { index: c.index, slug: c.slug, accent: c.accent, title: c.title },
    };
  });

  return (
    <section className={styles.strip} aria-label="Selected outcomes">
      <div className="container">
        <ProofList items={items} />
        <p className={`t-body-s c-tertiary ${styles.note}`}>
          Team-observed figures. How each was measured, and how sure I am it was the design, is in the study.
        </p>
      </div>
    </section>
  );
}
