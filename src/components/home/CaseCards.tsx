"use client";

import Link from "next/link";
import { useRef } from "react";
import { caseStudies } from "@/content/case-studies";
import { Glyph } from "@/components/ui/Glyph";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "./Section";
import s from "./Section.module.css";
import styles from "./CaseCards.module.css";

/* One line each, the same facts the case studies open with. */
const META: Record<string, { domain: string; outcome: string }> = {
  "01": { domain: "Health insurance", outcome: "Enrollment cut from 9 steps to 5, live in production" },
  "02": { domain: "White-label SaaS", outcome: "A new client themed in under a day, down from weeks" },
  "03": { domain: "Design systems", outcome: "Jira story to screen in three to four days, down from one to two weeks" },
  "04": { domain: "AI product", outcome: "The rebuild won 7 in 10 blind comparisons" },
  "05": { domain: "Civic services", outcome: "Nine city apps brought into one, in Arabic and English" },
  "06": { domain: "Airline e-commerce", outcome: "Fares, full price, and extras on web, iOS, and Android" },
};

/** Deploy's case cards: line art on top, a tag, the title, three facts, "Full story". Scrolls sideways. */
export function CaseCards() {
  const track = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : 400;
    el.scrollBy({ left: dir * w, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section id="work" className={`${s.section} ${styles.canvas}`} aria-labelledby="work-title">
      <div className={`${s.wrap} ${styles.headRow}`}>
        <SectionHead
          label="The work"
          id="work-title"
          lead="Case studies"
          intro="Six projects, from a US health-insurance platform to an airline."
        />
        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => step(-1)} aria-label="Previous case studies">
            <Icon name="arrow-left" size={18} />
          </button>
          <button type="button" className={styles.arrow} onClick={() => step(1)} aria-label="Next case studies">
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>

      <ul ref={track} className={styles.track}>
        {caseStudies.map((c) => {
          const m = META[c.index];
          return (
            <li key={c.slug}>
              <Link href={`/work/${c.slug}`} className={styles.card}>
                <div className={styles.art} aria-hidden="true">
                  <Glyph id={c.glyph} />
                </div>
                <div className={styles.body}>
                  <span className={styles.tag}>{m?.domain ?? c.group}</span>
                  <h3 className={styles.title}>{c.card?.title ?? c.short}</h3>
                  <ul className={styles.facts}>
                    <li>{m?.outcome ?? c.headline.label}</li>
                    <li>{c.meta.role}</li>
                    <li>{c.meta.timeline}</li>
                  </ul>
                  <span className={styles.more}>
                    Full story <Icon name="arrow-right" size={12} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
