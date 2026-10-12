"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { caseStudies } from "@/content/case-studies";
import { deck } from "@/content/home";
import type { CaseSlug } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { RevealHeading } from "./RevealHeading";
import s from "./Section.module.css";
import styles from "./WorkDeck.module.css";

/*
 * The case studies as a deck of tinted cards. On wide screens the stage pins
 * while you scroll: the front card holds for a beat, then flies off to the
 * right with a tilt, and the next one rises from the stack behind it. The
 * text on the left and the rail follow the front card, and each card carries
 * its case's opening line as a caption, which fades up when the card comes
 * to the front. Tabs jump straight to a case, and they
 * stay on screen the whole way through: inside the pinned stage on wide
 * screens, and stuck under the header over the list on narrow ones.
 * Narrow screens and reduced motion get a plain list of the same cards.
 */

const items = caseStudies.map((c) => ({ c, m: deck[c.slug as CaseSlug] }));
const N = items.length;
const PIN_QUERY = "(min-width: 960px) and (prefers-reduced-motion: no-preference)";

/** Holds still for the first part of each step, then eases the card away. */
function settle(f: number) {
  const k = Math.floor(f);
  const t = Math.min(1, Math.max(0, (f - k - 0.42) / 0.58));
  return k + t * t * (3 - 2 * t);
}

export function WorkDeck() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Which layout is showing: the pinned deck or the plain list.
  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // In the list, the tab for the case in the middle of the screen is the current one.
  useEffect(() => {
    if (pinned) return;
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-item]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const k = Number((e.target as HTMLElement).dataset.item);
          activeRef.current = k;
          setActive(k);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pinned]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(PIN_QUERY, () => {
        const cards = Array.from(root.current!.querySelectorAll<HTMLElement>("[data-card]"));
        const apply = (p: number) => {
          const f = p * (N - 1);
          const g = settle(f);
          const w = cards[0]?.offsetWidth ?? 600;
          cards.forEach((card, k) => {
            const d = k === N - 1 ? Math.min(0, g - k) : g - k;
            if (d > 0) {
              const t = Math.min(1, d);
              const e = t * t;
              card.style.transform = `translate3d(${(e * w * 1.25).toFixed(1)}px, ${(-e * 90 + t * 30).toFixed(1)}px, 0) rotate(${(e * 17).toFixed(2)}deg)`;
              card.style.opacity = t > 0.92 ? String((1 - t) / 0.08) : "1";
            } else {
              const depth = Math.min(3, -d);
              card.style.transform = `translate3d(0, ${(-depth * 20).toFixed(1)}px, 0) scale(${(1 - depth * 0.05).toFixed(3)})`;
              card.style.opacity = depth > 2 ? String(Math.max(0, 3 - depth)) : "1";
            }
          });
          const a = Math.min(N - 1, Math.floor(f + 0.25));
          if (a !== activeRef.current) {
            activeRef.current = a;
            setActive(a);
          }
        };
        trigger.current = ScrollTrigger.create({
          trigger: track.current,
          start: "top top+=64",
          end: "bottom bottom",
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        });
        apply(0);
        return () => {
          trigger.current = null;
          cards.forEach((c) => {
            c.style.transform = "";
            c.style.opacity = "";
          });
        };
      });
    },
    { scope: root },
  );

  // Keep the current tab in view when the tab row scrolls sideways (phones),
  // without moving the page itself.
  useEffect(() => {
    const nav = root.current?.querySelector<HTMLElement>("nav[aria-label='Case studies']");
    const tab = nav?.children[active] as HTMLElement | undefined;
    if (!nav || !tab || nav.scrollWidth <= nav.clientWidth) return;
    const left = tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2;
    nav.scrollTo({ left: Math.max(0, left), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active]);


  const jump = (k: number) => {
    const st = trigger.current;
    if (st) {
      const p = Math.min(1, (k + 0.15) / (N - 1));
      window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: "smooth" });
    } else {
      root.current?.querySelector(`[data-item="${k}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={root} id="work" className={styles.section} aria-labelledby="work-title">
      <div className={s.wrap}>
        <RevealHeading
          id="work-title"
          label="Case studies"
          text="Six projects, told as stories"
          intro="They go from a US health-insurance platform to an airline, and each one starts with what I was asked to do and what I found when I looked closer."
        />
      </div>

      <div ref={track} className={styles.track} style={{ ["--n" as string]: N }}>
        <div className={styles.stage}>
          <div className={styles.tabBar}>
            <nav className={`${s.wrap} ${styles.tabs}`} aria-label="Case studies">
              {items.map(({ c, m }, k) => (
                <button key={c.slug} type="button" className={styles.tab} aria-current={k === active ? "true" : undefined} onClick={() => jump(k)}>
                  <span className={styles.tabTitle}>{m.domain}</span>
                  <span className={styles.tabSub}>{c.short}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className={`${s.wrap} ${styles.inner}`}>
            {/* Progress through the deck: how many cases, which one is in front. */}
            <ol className={styles.rail} aria-hidden="true">
              {items.map(({ c }, k) => (
                <li key={c.slug} data-on={k === active || undefined}>
                  {c.index}
                </li>
              ))}
            </ol>

            <div className={styles.items}>
              {items.map(({ c, m }, k) => {
                const on = k === active;
                return (
                  <article key={c.slug} className={styles.item} data-item={k} data-on={on || undefined} style={{ zIndex: N - k }} aria-labelledby={`deck-${c.slug}`}>
                    <div className={styles.text}>
                      <p className={styles.tag}>{m.domain}</p>
                      <h3 id={`deck-${c.slug}`} className={styles.title}>
                        {c.card?.title ?? c.short}
                      </h3>
                      <p className={styles.outcome}>{m.outcome}</p>
                      <p className={styles.meta}>
                        {c.meta.role}
                        <br />
                        {c.meta.timeline}
                      </p>
                      <Link href={`/work/${c.slug}`} className={styles.more} tabIndex={pinned && !on ? -1 : undefined}>
                        Read the story <Icon name="arrow-right" size={14} />
                        <span className="sr-only">: {c.short}</span>
                      </Link>
                    </div>

                    <div className={styles.cardCol}>
                      <div className={styles.card} data-card style={{ background: `var(--deck-tint-${m.tint})` }}>
                        <svg className={styles.lines} viewBox="0 0 640 440" preserveAspectRatio="none" aria-hidden="true">
                          <path d={`M-20 ${300 - k * 30} C 160 ${120 + k * 20}, 360 ${460 - k * 25}, 660 ${180 + k * 15}`} />
                          <path d={`M-20 ${380 - k * 10} C 220 ${260 - k * 15}, 420 ${520 - k * 10}, 660 ${300 - k * 20}`} />
                        </svg>
                        <div className={styles.shot} data-fit={m.fit ?? "cover"}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={m.img} alt={m.alt} loading="lazy" decoding="async" />
                        </div>
                        <div className={styles.opening}>
                          <p className={styles.openingLabel}>Where it started</p>
                          <p className={styles.openingLine}>{m.opening}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
