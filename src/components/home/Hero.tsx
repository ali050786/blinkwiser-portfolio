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
          I&apos;m Ali, a Senior UX Architect with 11 years across AI products, enterprise design systems, US health insurance and a
          city&apos;s civic services. I find the real problem behind the brief, then design the decision that fixes it.
        </>
      }
      facts={[
        { k: "Now", v: "Senior UX Architect, Mphasis" },
        { k: "Led", v: "A team of four designers" },
        { k: "Building", v: "Blinkwiser, AI products" },
      ]}
      titleSize="l"
      visual={<ReframeDeck items={deck} />}
    />
  );
}
