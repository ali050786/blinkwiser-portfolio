"use client";

import { HeroShell } from "./HeroShell";
import { ReframeDeck, type DeckItem } from "./ReframeDeck";

/** The home hero: the Reframe deck, every study as brief → real problem → the call. */
export function Hero({ deck }: { deck: DeckItem[] }) {
  return (
    <HeroShell
      title={
        <>
          Designing the systems that make complex products feel <em className="t-serif-em">simple</em>.
        </>
      }
      lede={
        <>
          I&apos;m Ali: 11 years in enterprise UX, the last five leading design on a white-label US health-insurance platform. Before
          that, Dubai Municipality and Jet Airways. I work at the systems layer, where the real problem sits one level below the brief.
        </>
      }
      facts={[
        { k: "Now", v: "UX Lead, Mphasis" },
        { k: "Domain", v: "US health insurance, since 2021" },
        { k: "Led", v: "A team of four designers" },
        { k: "Building", v: "Blinkwiser, AI products" },
      ]}
      titleSize="l"
      visual={<ReframeDeck items={deck} />}
    />
  );
}
