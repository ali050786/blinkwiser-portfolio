"use client";

import { site } from "@/content/site";
import { HeroShell } from "./HeroShell";
import { BriefMarkup } from "./BriefMarkup";

/** The home hero: headline and intro across the top, then a marked-up brief: the request struck out, what I found and what I did written underneath. */
export function Hero({ layout = "stacked" }: { layout?: "stacked" | "split" }) {
  return (
    <HeroShell
      title={
        <>
          I design benefits and enrollment software for US health insurance.
        </>
      }
      lede={
        <>
          11 years in enterprise UX. For the last five I&apos;ve led design on a white-label health-insurance platform used by
          insurers, employers and their members. Before that: Dubai Municipality&apos;s services portal and Jet Airways&apos; apps.
          Lately I&apos;ve been rebuilding our design system so AI tools can follow it.
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
