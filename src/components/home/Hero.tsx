"use client";

import { site } from "@/content/site";
import { HeroShell } from "./HeroShell";
import { BriefMarkup } from "./BriefMarkup";

/** The home hero: headline and intro across the top, then a brief being marked up: the request struck out, the real problem written underneath. */
export function Hero({ layout = "stacked" }: { layout?: "stacked" | "split" }) {
  return (
    <HeroShell
      title={
        <>
          I make complex products <em className="t-serif-em">simple</em> for people and readable for AI.
        </>
      }
      lede={
        <>
          I bring 11 years in enterprise UX, the last five leading design on a white-label US health-insurance platform. Before
          that, Dubai Municipality and Jet Airways. I work at the systems layer, where the real problem sits one level below the brief.
        </>
      }
      facts={[
        { k: "Now", v: "UX Lead, Mphasis" },
        { k: "Domain", v: "US health insurance, since 2021" },
        { k: "Led", v: "A team of four designers" },
        { k: "Building", v: "Blinkwiser, AI products" },
        { k: "Based in", v: site.location },
      ]}
      titleSize="l"
      layout={layout}
      ctaIcons={false}
      visual={<BriefMarkup />}
    />
  );
}
