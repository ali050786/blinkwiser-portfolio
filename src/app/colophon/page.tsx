import type { Metadata } from "next";
import tokens from "../../../tokens/tokens.json";
import { HeroStack } from "@/components/home/HeroStack";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Colophon",
  description: "How this portfolio is built: three-tier design tokens, motion principles, accessibility and public-safe case studies.",
  alternates: { canonical: "/colophon" },
};

const decisions = [
  {
    title: "Three tiers of tokens, not a utility framework",
    body: "tokens/tokens.json (W3C DTCG format) compiles to CSS custom properties: primitives, semantic intent with light and dark modes, then component tokens. References stay as var() chains, so each case study re-themes by overriding only the semantic accent, exactly like a client brand on the white-label platform in case study 03.",
  },
  {
    title: "GSAP for choreography, Motion for state",
    body: "GSAP (ScrollTrigger, SplitText) runs the headline reveals and the scroll-linked layer stack on this page. Motion handles state-driven UI: the home page's reframe deck and every exhibit's layout transitions, presence and springs. Scroll reveals are CSS plus one shared IntersectionObserver, so server components stay server components.",
  },
  {
    title: "CSS 3D instead of WebGL",
    body: "The exploded layer stack on this page is DOM and CSS 3D. Text stays crisp vector type, colour tokens drive it directly, and it ships no 3D engine. Three.js was considered and rejected here: it would rasterise the UI onto textures and add weight for a diagram.",
  },
  {
    title: "Static HTML first, islands second",
    body: "Every page is pre-rendered at build time. Only the interactive exhibits hydrate, and each page loads only the exhibits it uses. Case studies are fully readable, and crawlable, without JavaScript.",
  },
  {
    title: "Accessible by construction",
    body: "A script checks 50 token pairs against WCAG AA in both modes. Reduced-motion visitors get final states with no autoplay; anything that advances on its own pauses on hover, focus and offscreen, and has a pause control. Exhibits use native inputs, radio groups and live regions, and every one is keyboard operable.",
  },
  {
    title: "Public-safe case studies",
    body: "Clients are anonymised, the employer is named once as attribution, and every visual is redrawn with demo brands and illustrative data. No client screens, internal codenames or file links.",
  },
];

type Leaf = { $value: unknown };
const primitiveColors = tokens.primitive.color as unknown as Record<string, Record<string, Leaf> | Leaf>;
const palettes = Object.entries(primitiveColors).filter(([k, v]) => k !== "neutral" && k !== "signal" && !("$value" in v)) as [string, Record<string, Leaf>][];
const neutrals = Object.keys(primitiveColors.neutral as Record<string, Leaf>).sort((a, b) => +a - +b);
const semanticGroups = ["surface", "text", "border", "accent"] as const;

export default function Colophon() {
  const count =
    JSON.stringify(tokens)
      .match(/"\$value"/g)?.length ?? 0;

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.head}>
        <div className={styles.headCopy}>
          <p className="t-label c-tertiary">Colophon</p>
          <h1 className="t-display-l">
            How this site is built, and <em className="t-serif-em c-accent">why</em>.
          </h1>
          <p className="t-body-l c-secondary prose">
            The portfolio is a small product in its own right, built with the same habits as the work it shows: explicit variables, honest
            trade-offs, and nothing a visitor can&apos;t use. The stack on the right is this site&apos;s own architecture: tokens, components,
            an app shell, then the screen you&apos;re reading.
          </p>
        </div>
        <div className={styles.headVisual}>
          <HeroStack />
        </div>
      </header>

      <section className={styles.section} aria-labelledby="decisions">
        <h2 id="decisions" className="t-label c-tertiary">
          Decisions
        </h2>
        <ol className={styles.decisions}>
          {decisions.map((d, i) => (
            <li key={d.title} data-reveal style={{ "--reveal-i": i % 3 } as React.CSSProperties}>
              <span className="t-mono c-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-heading-m">{d.title}</h3>
              <p className="t-body-s c-secondary">{d.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="tokens">
        <div className={styles.sectionHead}>
          <h2 id="tokens" className="t-heading-l">
            Tokens, live
          </h2>
          <p className="t-body-s c-secondary">
            {count} tokens across three tiers. These swatches read the same custom properties the site uses, so switching the theme changes
            them too.
          </p>
        </div>

        <div className={styles.tiers}>
          <div className={styles.tier}>
            <p className="t-label c-tertiary">Tier 1 · primitive · neutral</p>
            <ul className={styles.ramp}>
              {neutrals.map((n) => (
                <li key={n} style={{ background: `var(--color-neutral-${n})` }}>
                  <span className="t-mono">{n}</span>
                </li>
              ))}
            </ul>
            <p className="t-label c-tertiary">Tier 1 · primitive · accents, one per case study</p>
            <ul className={styles.palettes}>
              {palettes.map(([name, steps]) => (
                <li key={name}>
                  <span className={styles.paletteSteps}>
                    {Object.keys(steps)
                      .sort((a, b) => +a - +b)
                      .map((s) => (
                        <i key={s} style={{ background: `var(--color-${name}-${s})` }} />
                      ))}
                  </span>
                  <span className="t-mono">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.tier}>
            <p className="t-label c-tertiary">Tier 2 · semantic, mode-aware</p>
            <dl className={styles.semantic}>
              {semanticGroups.map((g) =>
                Object.keys((tokens.semantic as Record<string, Record<string, unknown>>)[g]!).map((k) => (
                  <div key={`${g}-${k}`}>
                    <dt>
                      <span className={styles.chip} style={{ background: `var(--${g}-${k})` }} />
                    </dt>
                    <dd className="t-mono">
                      --{g}-{k}
                    </dd>
                  </div>
                )),
              )}
            </dl>
          </div>

          <div className={styles.tier}>
            <p className="t-label c-tertiary">Tier 3 · component</p>
            <ul className={styles.components}>
              {Object.entries(tokens.component).map(([comp, props]) => (
                <li key={comp}>
                  <span className={styles.compName}>{comp}</span>
                  <span className="t-mono c-tertiary">{Object.keys(props).length} tokens</span>
                </li>
              ))}
            </ul>
            <p className="t-body-s c-secondary">
              Components never reference primitives directly. Changing a semantic token re-themes every component that consumes it.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="type">
        <div className={styles.sectionHead}>
          <h2 id="type" className="t-heading-l">
            Type
          </h2>
          <p className="t-body-s c-secondary">Self-hosted, no third-party font requests. Fluid sizes via clamp().</p>
        </div>
        <ul className={styles.specimens}>
          <li>
            <span className="t-label c-tertiary">Geist · display</span>
            <span className="t-display-m">Decisions, not artifacts</span>
          </li>
          <li>
            <span className="t-label c-tertiary">Instrument Serif · emphasis</span>
            <span className="t-display-m t-serif-em">the road not taken</span>
          </li>
          <li>
            <span className="t-label c-tertiary">Geist · body</span>
            <span className="t-body-l">Every study opens with a 30-second snapshot and ends with what I would change.</span>
          </li>
          <li>
            <span className="t-label c-tertiary">Geist Mono · labels and tokens</span>
            <span className="t-mono">--accent-solid: var(--color-violet-500);</span>
          </li>
          <li>
            <span className="t-label c-tertiary">IBM Plex Sans Arabic · RTL exhibit</span>
            <span className={styles.arabic} lang="ar" dir="rtl">
              تجديد رخصة البناء
            </span>
          </li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="stack">
        <div className={styles.sectionHead}>
          <h2 id="stack" className="t-heading-l">
            Stack
          </h2>
        </div>
        <ul className={styles.stack}>
          {["Next.js App Router", "React", "TypeScript", "CSS Modules", "W3C design tokens", "GSAP + ScrollTrigger + SplitText", "Motion", "Static generation"].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
