"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./Hero.module.css";

export type HeroFact = { k: string; v: string };

type Props = {
  title: React.ReactNode;
  lede: React.ReactNode;
  visual: React.ReactNode;
  facts?: HeroFact[];
  /** split: copy left, visual right. stacked: copy on top, wide visual below. */
  layout?: "split" | "stacked";
  kicker?: string;
  /** xl for short headlines, l for longer ones. */
  titleSize?: "xl" | "l";
};

/**
 * Shared hero frame: availability chip, headline, lede, calls to action and
 * facts, with the GSAP line-by-line reveal. Each hero option supplies its own
 * copy and its own interactive visual.
 */
export function HeroShell({ title, lede, visual, facts, layout = "split", kicker, titleSize = "xl" }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const titleEl = root.current!.querySelector<HTMLElement>("[data-hero-title]")!;
        const fades = root.current!.querySelectorAll<HTMLElement>("[data-hero-fade]");
        let tl: gsap.core.Timeline | undefined;
        const split = SplitText.create(titleEl, {
          type: "lines",
          mask: "lines",
          linesClass: styles.line,
          autoSplit: true,
          onSplit(self) {
            tl?.kill();
            gsap.set(titleEl, { autoAlpha: 1 });
            tl = gsap
              .timeline({ defaults: { ease: "expo.out" } })
              .from(self.lines, { yPercent: 110, duration: 1.2, stagger: 0.09 })
              .fromTo(fades, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.35);
            return tl;
          },
        });
        return () => split.revert();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.current!.querySelectorAll("[data-hero-title], [data-hero-fade]"), { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  const copy = (
    <>
      <p className={styles.kicker} data-hero-fade>
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          {kicker ?? site.availability}
        </span>
      </p>
      <h1 id="hero-title" className={`${titleSize === "l" ? "t-display-l" : "t-display-xl"} ${styles.title}`} data-size={titleSize} data-hero-title>
        {title}
      </h1>
    </>
  );

  const rest = (
    <>
      <p className={`t-body-l c-secondary ${styles.lede}`} data-hero-fade>
        {lede}
      </p>
      <div className={styles.ctas} data-hero-fade>
        <ButtonLink href="/#work">Read the case studies</ButtonLink>
        <ButtonLink href="/#contact" variant="secondary" icon="arrow-up-right">
          Get in touch
        </ButtonLink>
      </div>
      {facts && facts.length > 0 && (
        <dl className={styles.facts} data-hero-fade>
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="t-label c-tertiary">{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      )}
    </>
  );

  if (layout === "stacked") {
    return (
      <section ref={root} className={`${styles.hero} ${styles.stacked}`} aria-labelledby="hero-title">
        <div className={`container ${styles.stackTop}`}>
          <div className={styles.copy}>{copy}</div>
          <div className={styles.copy}>{rest}</div>
        </div>
        <div className={`container ${styles.stackVisual}`} data-hero-fade>
          {visual}
        </div>
      </section>
    );
  }

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          {copy}
          {rest}
        </div>
        <div className={styles.visual} data-hero-fade>
          {visual}
        </div>
      </div>
    </section>
  );
}
