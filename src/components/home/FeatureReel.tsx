"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { AutoVideo } from "@/components/ui/AutoVideo";
import s from "./Section.module.css";
import styles from "./FeatureReel.module.css";

/**
 * The enrollment trailer rises out of the hero as you scroll, on a tinted
 * panel. The three numbered results that sat under it were removed on
 * 2026-10-11: the case cards right after say the same thing.
 */
export function FeatureReel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // The rise out of the hero only on screens wide enough for the overlap to read.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 760px)", () => {
        const q = gsap.utils.selector(root);
        gsap.fromTo(
          q("[data-card]"),
          { y: 150, scale: 0.84 },
          {
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 18%", scrub: 0.6 },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.reel} aria-labelledby="reel-title">
      <h2 id="reel-title" className="sr-only">
        The enrollment redesign in 35 seconds
      </h2>
      <div className={s.wrap}>
        <figure className={styles.card} data-card>
          <div className={styles.frame}>
            <AutoVideo
              src="/work/enrollment/trailer.mp4"
              poster="/work/enrollment/trailer-poster.webp"
              sound
              label="Trailer of the enrollment redesign. In the old flow, Dennis loses his family list when he changes plan. In the new one, a single grid sets who needs what, and switching plans keeps the family."
            />
          </div>
          <figcaption className={styles.caption}>
            The enrollment redesign in 35 seconds. These are illustrations in a demo brand rather than the shipped screens.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
