import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getNeighbours } from "@/content/case-studies";
import { CaseHero } from "@/components/case/CaseHero";
import { Snapshot } from "@/components/case/Snapshot";
import { CaseCover } from "@/components/case/CaseCover";
import { BeatRail } from "@/components/case/BeatRail";
import { Beat } from "@/components/case/Beat";
import { Reframe } from "@/components/case/Reframe";
import { StakesGrid } from "@/components/case/StakesGrid";
import { ForkBlock } from "@/components/case/ForkBlock";
import { OutcomePanel } from "@/components/case/OutcomePanel";
import { Ownership } from "@/components/case/Ownership";
import { NextCase } from "@/components/case/NextCase";
import { ReadingProgress } from "@/components/case/ReadingProgress";
import { ExhibitSlot } from "@/components/exhibits/ExhibitSlot";
import { HeroStories } from "@/components/case/HeroStories";
import { Story } from "@/components/case/Story";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.dek,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { title: c.title, description: c.dek, type: "article", url: `/work/${c.slug}` },
  };
}

const BEATS = [
  { id: "frame", n: "01", label: "Frame", question: "What did everyone assume the problem was, and what did I reframe it to?" },
  { id: "stakes", n: "02", label: "Stakes", question: "What was it costing the business, or what was at risk?" },
  { id: "decisions", n: "03", label: "Decisions", question: "What were the credible options, why this one, and what did it cost?" },
  { id: "outcome", n: "04", label: "Outcome", question: "What changed, how do I know, and how sure am I it was the design?" },
  { id: "ownership", n: "05", label: "Ownership", question: "Which calls were mine, and what would I change?" },
] as const;

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const { next } = getNeighbours(slug);
  const beat = (id: (typeof BEATS)[number]["id"]) => BEATS.find((b) => b.id === id)!;

  return (
    <article data-case={c.slug} className={styles.article}>
      <ReadingProgress />
      <CaseHero study={c} />
      <Snapshot study={c} />
      {c.cover && <CaseCover shot={c.cover} label={c.cover.label} />}
      {c.reel && <CaseCover shot={c.reel} label="The product, running" />}

      {c.story ? (
        <div className={`container ${styles.body}`}>
          <BeatRail beats={c.story.chapters.map((ch, i) => ({ id: ch.id, n: String(i + 1).padStart(2, "0"), label: ch.rail }))} forks={[]} />
          <div className={styles.content}>
            <Story study={c} />
          </div>
        </div>
      ) : (
      <div className={`container ${styles.body}`}>
        <BeatRail beats={BEATS.map(({ id, n, label }) => ({ id, n, label }))} forks={c.forks.map((f) => ({ id: f.id, title: f.title }))} />

        <div className={styles.content}>
          <Beat {...beat("frame")}>
            <Reframe assumed={c.frame.assumed} actual={c.frame.actual} />
            <div className="prose t-body-l c-secondary">
              {c.frame.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {c.frame.evidence && (
              <div className={styles.evidence} data-reveal>
                <p className="t-label c-tertiary">{c.frame.evidence.title}</p>
                <ol>
                  {c.frame.evidence.items.map((it, i) => (
                    <li key={it}>
                      <span className="t-mono c-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {c.frame.exhibit && <ExhibitSlot id={c.frame.exhibit} />}
            {c.hook && c.opener && (
              <section className={styles.findings} aria-labelledby="findings-title">
                <h3 id="findings-title" className="t-heading-l">
                  {c.opener.label ?? "What I found"}
                </h3>
                <HeroStories opener={c.opener} compact />
              </section>
            )}
          </Beat>

          <Beat {...beat("stakes")}>
            <StakesGrid intro={c.stakes.intro} items={c.stakes.items} />
            {c.stakes.exhibit && <ExhibitSlot id={c.stakes.exhibit} />}
          </Beat>

          <Beat {...beat("decisions")}>
            <p className="t-body-l c-secondary prose">
              {c.forks.length} decisions. For each: the option I didn&apos;t take, the one I did, and what it cost.
            </p>
            {c.forks.map((f, i) => (
              <ForkBlock key={f.id} fork={f} n={i + 1} total={c.forks.length}>
                {f.exhibit && <ExhibitSlot id={f.exhibit} />}
              </ForkBlock>
            ))}
            {c.followOn && (
              <div className={styles.followOn}>
                <h3 className="t-heading-l">{c.followOn.title}</h3>
                {c.followOn.intro && <p className="c-secondary">{c.followOn.intro}</p>}
                <ul>
                  {c.followOn.items.map((it, i) => (
                    <li key={it.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                      <h4 className="t-heading-m">{it.title}</h4>
                      <p className="t-body-s c-secondary">{it.body}</p>
                    </li>
                  ))}
                </ul>
                {c.followOn.exhibit && <ExhibitSlot id={c.followOn.exhibit} />}
              </div>
            )}
            {c.spotlight && (
              <section className={styles.spotlight} aria-labelledby="spotlight-title">
                <p className="t-label c-accent">{c.spotlight.label}</p>
                <h3 id="spotlight-title" className="t-heading-l">
                  {c.spotlight.title}
                </h3>
                <p className="t-body-l c-secondary prose">{c.spotlight.intro}</p>
                {c.spotlight.lead && <ExhibitSlot id={c.spotlight.lead} />}
                {/* why / what / impact stay in the data but aren't shown: the diagram and screens carry it. */}
                {c.spotlight.exhibit && <ExhibitSlot id={c.spotlight.exhibit} />}
              </section>
            )}
          </Beat>

          <Beat {...beat("outcome")}>
            <OutcomePanel outcome={c.outcome} />
            {c.outcome.exhibit && <ExhibitSlot id={c.outcome.exhibit} />}
          </Beat>

          <Beat {...beat("ownership")}>
            <Ownership ownership={c.ownership} signals={c.signals} />
          </Beat>
        </div>
      </div>
      )}

      <NextCase study={next} />
    </article>
  );
}
