"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow, Cross } from "./Section";
import s from "./Section.module.css";
import styles from "./Hero.module.css";

/** The second beat of the headline cycles through the domains with a quiet crossfade (Taste Skill: low motion for regulated B2B). */
const TURNS = ["regulated SaaS.", "health insurance.", "civic services.", "AI products."];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const curRef = useRef(0);

  // Every few seconds the phrase hands over: the old one fades up and out, the next fades up and in.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      const n = curRef.current;
      const next = (n + 1) % TURNS.length;
      curRef.current = next;
      setPrev(n);
      setCur(next);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q("[data-line]"), { yPercent: 110, duration: 1.1, stagger: 0.1 }, 0.1)
          .from(q("[data-fade]"), { autoAlpha: 0, y: 12, duration: 0.8, stagger: 0.07 }, 0.35);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.frame} aria-hidden="true">
        <Cross className={styles.cTL} />
        <Cross className={styles.cTR} />
        <Cross className={styles.cBL} />
        <Cross className={styles.cBR} />
        <span className={styles.ruler} />
      </div>

      <div className={`${s.wrap} ${styles.grid}`}>
        <div className={styles.copy}>
          <div data-fade>
            <Eyebrow label="Lead UX Designer, enterprise SaaS" />
          </div>
          <h1 id="hero-title" className={styles.title}>
            <span className="sr-only">I lead design in regulated SaaS: health insurance, civic services, and AI products.</span>
            <span className={styles.mask} aria-hidden="true">
              <span data-line>I lead design in</span>
            </span>
            <span className={styles.mask} aria-hidden="true">
              <span data-line className={styles.turnWrap}>
                {TURNS.map((t, n) => (
                  <span
                    key={t}
                    className={styles.turn}
                    data-state={n === cur ? "in" : n === prev ? "out" : undefined}
                    aria-hidden={n !== cur || undefined}
                  >
                    {t}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <p className={styles.lede} data-fade>
            I&apos;ve spent 11 years in UX, and for the last five I&apos;ve led design on a white-label health-insurance platform
            used by insurers, employers and their members.
          </p>
          <div className={styles.ctas} data-fade>
            <ButtonLink href="/#work">Read the case studies</ButtonLink>
          </div>
        </div>
      </div>

      <p className={`${s.wrap} ${styles.cred}`} data-fade>
        <span className={styles.credOrg}>IIT Roorkee</span>
        {"\u00a0· "}PG Certificate in Forward Deployed AI Engineering, in progress
      </p>
    </section>
  );
}
