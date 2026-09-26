import styles from "./BilingualPair.module.css";

/*
 * One civic service screen, written once per language. The Arabic card is
 * the same template mirrored through logical properties, not a second
 * design. Used by the BilingualPair exhibit.
 */

export const copy = {
  en: {
    dir: "ltr" as const,
    lang: "en",
    crumb: ["Services", "Build or renovate"],
    title: "Renew a building permit",
    meta: "3 working days · AED 250",
    sections: {
      eligibility: {
        h: "Eligibility",
        body: "Property owner or registered contractor",
      },
      documents: {
        h: "Required documents",
        items: ["Current building permit", "Site plan", "Emirates ID"],
      },
      fees: { h: "Fees", body: "AED 250" },
      steps: { h: "Steps", items: ["Submit", "Review", "Pay", "Issue"] },
      status: { h: "Status", body: "Under review" },
    },
    cta: "Start service",
  },
  ar: {
    dir: "rtl" as const,
    lang: "ar",
    crumb: ["الخدمات", "البناء والتجديد"],
    title: "تجديد رخصة البناء",
    meta: "3 أيام عمل · 250 درهم",
    sections: {
      eligibility: { h: "الأهلية", body: "مالك العقار أو مقاول مسجل" },
      documents: {
        h: "المستندات المطلوبة",
        items: ["رخصة البناء الحالية", "مخطط الموقع", "الهوية الإماراتية"],
      },
      fees: { h: "الرسوم", body: "250 درهم" },
      steps: {
        h: "الخطوات",
        items: ["تقديم الطلب", "المراجعة", "الدفع", "الإصدار"],
      },
      status: { h: "الحالة", body: "قيد المراجعة" },
    },
    cta: "ابدأ الخدمة",
  },
};

export function ServiceCard({
  lang,
  className,
}: {
  lang: "en" | "ar";
  className?: string;
}) {
  const c = copy[lang];
  const s = c.sections;
  return (
    <div
      className={`${styles.card} ${className ?? ""}`}
      dir={c.dir}
      lang={c.lang}
      data-lang={lang}
    >
      <p className={styles.langTag} aria-hidden="true">
        {lang === "en" ? "EN · LTR" : "AR · RTL"}
      </p>
      <p className={styles.crumb}>
        {c.crumb[0]} <span className={styles.chev}>›</span> {c.crumb[1]}
      </p>
      <h5 className={styles.title}>{c.title}</h5>
      <p className={styles.meta}>{c.meta}</p>

      <div className={styles.section} data-n="1">
        <p className={styles.h}>{s.eligibility.h}</p>
        <p className={styles.body}>{s.eligibility.body}</p>
      </div>
      <div className={styles.section} data-n="2">
        <p className={styles.h}>{s.documents.h}</p>
        <ul className={styles.docs}>
          {s.documents.items.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className={styles.section} data-n="3">
        <p className={styles.h}>{s.fees.h}</p>
        <p className={styles.fee}>{s.fees.body}</p>
      </div>
      <div className={styles.section} data-n="4">
        <p className={styles.h}>{s.steps.h}</p>
        <ol className={styles.steps}>
          {s.steps.items.map((st, i) => (
            <li
              key={st}
              data-done={i < 2 || undefined}
              data-current={i === 1 || undefined}
            >
              <span className={styles.dot} />
              <span>{st}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.section} data-n="5">
        <p className={styles.h}>{s.status.h}</p>
        <p className={styles.status}>{s.status.body}</p>
      </div>
      <span className={styles.cta}>
        {c.cta} <span className={styles.chev}>→</span>
      </span>
    </div>
  );
}
