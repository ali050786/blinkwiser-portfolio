"use client";

import Link from "next/link";
import { useState } from "react";
import { caseStudies } from "@/content/case-studies";
import { deck, hire } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import s from "./Section.module.css";
import styles from "./HirePicker.module.css";

/*
 * "I'm hiring … who has …": pick the role you're hiring for and the
 * experience you need, and the case that shows it comes to the front of the
 * stack. The role decides which experiences are the strongest match (shown
 * in primary text); every experience stays selectable.
 */
export function HirePicker() {
  const [roleId, setRoleId] = useState(hire.roles[0]!.id);
  const role = hire.roles.find((r) => r.id === roleId)!;
  const [needId, setNeedId] = useState<string>(role.needs[0] ?? "");
  const need = hire.needs.find((n) => n.id === needId)!;
  const c = caseStudies.find((x) => x.slug === need.slug)!;
  const m = deck[need.slug];

  const pickRole = (id: string) => {
    const r = hire.roles.find((x) => x.id === id)!;
    setRoleId(id);
    setNeedId(r.needs[0] ?? "");
  };

  // The two cards behind the front one take the tints that come after it.
  const back = [((m.tint % 6) + 1) as number, (((m.tint + 1) % 6) + 1) as number];

  return (
    <section className={`${s.section} ${styles.section}`} aria-labelledby="hire-title">
      <div className={s.wrap}>
        <h2 id="hire-title" className="sr-only">
          Find the case study that fits the role you're hiring for
        </h2>
        <p className={styles.sentence} aria-live="polite">
          I&apos;m hiring <span className={styles.slot}>{role.phrase}</span> who has <span className={styles.slot}>{need.phrase}</span>.
        </p>

        <div className={styles.grid}>
          <fieldset className={styles.group}>
            <legend className={styles.legend}>Role</legend>
            {hire.roles.map((r) => (
              <label key={r.id} className={styles.option} data-on={r.id === roleId || undefined}>
                <input type="radio" name="hire-role" value={r.id} checked={r.id === roleId} onChange={() => pickRole(r.id)} className="sr-only" />
                {r.label}
              </label>
            ))}
          </fieldset>

          <div className={styles.stack}>
            <span className={styles.back} style={{ background: `var(--deck-tint-${back[1]})` }} aria-hidden="true" />
            <span className={styles.back} style={{ background: `var(--deck-tint-${back[0]})` }} aria-hidden="true" />
            <article key={need.id} className={styles.front} style={{ background: `var(--deck-tint-${m.tint})` }} aria-labelledby="hire-case">
              <div className={styles.shot} data-fit={m.fit ?? "cover"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.img} alt={m.alt} loading="lazy" decoding="async" />
              </div>
              <div className={styles.caption}>
                <p className={styles.tag}>
                  {c.index} · {m.domain}
                </p>
                <h3 id="hire-case" className={styles.title}>
                  {c.card?.title ?? c.short}
                </h3>
                <p className={styles.body}>{"note" in need && need.note ? need.note : m.outcome}</p>
                <Link href={`/work/${c.slug}`} className={styles.more}>
                  Read the story <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </article>
          </div>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>Experience</legend>
            {hire.needs.map((n) => (
              <label key={n.id} className={styles.option} data-on={n.id === needId || undefined} data-fit={role.needs.includes(n.id) || undefined}>
                <input type="radio" name="hire-need" value={n.id} checked={n.id === needId} onChange={() => setNeedId(n.id)} className="sr-only" />
                {n.label}
              </label>
            ))}
          </fieldset>
        </div>
      </div>
    </section>
  );
}
