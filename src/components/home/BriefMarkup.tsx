"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { briefs, type BriefPage } from "@/content/briefs";
import styles from "./BriefMarkup.module.css";

/*
 * The hero's marked-up brief. A brief types itself out on a pad; a pen strikes
 * it through, writes the real problem and the call underneath, and underlines
 * the key phrase. Then the sheet slides off the stack and the next brief
 * settles in. It plays through the five briefs once, then rests on the first
 * one, fully marked. Picking a brief from the index moves to it the same way
 * and plays it once. Reduced motion shows the marked page with no movement.
 * The SVG ink, the pen and the outgoing sheet are decoration; the words are real text.
 */

const NS = "http://www.w3.org/2000/svg";
/** The brief card no longer animates; kept as a switch so the motion code can come back if wanted. */
const STATIC: boolean = true;
const HOLD = 2.4;
const FIRST_DELAY = 0.9;
/** When the next sheet starts settling in, as the previous one slides away. */
const NEXT_IN = 0.45;

type Mode = "auto" | "single" | "rest";

/** Split text into word spans; the key phrase is wrapped so the pen can circle it. */
function Words({ text, mark, tick }: { text: string; mark?: string; tick?: boolean }) {
  const at = mark ? text.indexOf(mark) : -1;
  const before = at >= 0 ? text.slice(0, at) : text;
  const after = at >= 0 ? text.slice(at + mark!.length) : "";
  const tokens = (t: string) => t.split(/\s+/).filter(Boolean);
  const word = (w: string, k: string) => (
    <span key={k} className={styles.w} data-w>
      {w}
    </span>
  );
  const join = (ws: string[], prefix: string) => ws.flatMap((w, i) => (i === 0 ? [word(w, `${prefix}${i}`)] : [" ", word(w, `${prefix}${i}`)]));
  const afterWords = tokens(after);
  // Punctuation straight after the key phrase stays attached to it.
  const glued = after.length > 0 && !/^\s/.test(after);
  return (
    <>
      {join(tokens(before), "a")}
      {at >= 0 && (
        <>
          {before.trim() && " "}
          <span className={styles.key} data-key-phrase>
            {join(tokens(mark!), "k")}
          </span>
          {afterWords.length > 0 && !glued && " "}
          {join(afterWords, "b")}
        </>
      )}
      {tick && (
        <>
          {" "}
          <span className={styles.w} data-w aria-hidden="true">
            ✓
          </span>
        </>
      )}
    </>
  );
}

/** Merge per-glyph rects into one rect per line. */
function lineRects(el: HTMLElement, origin: DOMRect) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const lines: { x: number; r: number; y: number; h: number }[] = [];
  for (const r of Array.from(range.getClientRects())) {
    if (r.width === 0) continue;
    const y = r.top - origin.top;
    const line = lines.find((l) => Math.abs(l.y - y) < r.height / 2);
    if (line) {
      line.x = Math.min(line.x, r.left - origin.left);
      line.r = Math.max(line.r, r.right - origin.left);
    } else lines.push({ x: r.left - origin.left, r: r.right - origin.left, y, h: r.height });
  }
  return lines;
}

export function BriefMarkup() {
  const root = useRef<HTMLDivElement>(null);
  const desk = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLDivElement>(null);
  const briefRef = useRef<HTMLSpanElement>(null);
  const ink = useRef<SVGSVGElement>(null);
  const pen = useRef<SVGSVGElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const flip = useRef<HTMLElement | null>(null);
  const inView = useRef(false);
  const started = useRef(false);
  const userPaused = useRef(false);

  const [view, setView] = useState<{ page: number; mode: Mode; n: number }>({ page: 0, mode: "auto", n: 0 });
  const [playing, setPlaying] = useState(false);
  const { page, mode } = view;
  const p: BriefPage = briefs[page]!;

  const clearFlip = () => {
    flip.current?.remove();
    flip.current = null;
  };

  /** Slide the current sheet off the stack (a copy of it), with page n settling in underneath. */
  const flipTo = (n: number, next: Mode) => {
    const P = paper.current;
    const D = desk.current;
    clearFlip();
    if (P && D && STATIC === false && started.current) {
      tl.current?.pause();
      const out = P.cloneNode(true) as HTMLElement;
      out.classList.add(styles.outgoing ?? "");
      out.setAttribute("aria-hidden", "true");
      out.inert = true;
      out.querySelector(`.${styles.pen}`)?.remove();
      out.style.height = `${P.offsetHeight}px`;
      D.append(out);
      flip.current = out;
    }
    setView((v) => ({ page: n, mode: next, n: v.n + 1 }));
  };

  // Start once the hero is on screen; pause when it scrolls away.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = !!e?.isIntersecting;
        const t = tl.current;
        if (!t || t.progress() >= 1) return;
        if (inView.current && !userPaused.current) {
          t.play();
          setPlaying(true);
        } else {
          t.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // After a resize, re-measure and show the current page, fully marked.
  useEffect(() => {
    let id = 0;
    const onResize = () => {
      clearTimeout(id);
      id = window.setTimeout(() => {
        clearFlip();
        setView((v) => ({ ...v, mode: "rest", n: v.n + 1 }));
      }, 200);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Static by design: the marks are drawn in place, with no typing, pen or sheet slide.
    const animate = false;
    void reduced;

    const build = () => {
      const P = paper.current!;
      const svg = ink.current!;
      const penEl = pen.current!;
      svg.replaceChildren();

      // Measure with the page flat and in place.
      gsap.set(P, { x: 0, y: 0, rotation: 0, autoAlpha: 1 });
      const origin = P.getBoundingClientRect();
      const brief = briefRef.current!;
      const lines = lineRects(brief, origin);
      const words = Array.from(P.querySelectorAll<HTMLElement>("[data-w]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { el, right: r.right - origin.left, bottom: r.bottom - origin.top };
      });
      const keyEl = P.querySelector<HTMLElement>("[data-key-phrase]");
      const keyLines = keyEl ? lineRects(keyEl, origin) : [];
      const chars = brief.querySelectorAll<HTMLElement>("[data-c]");

      const path = (d: string) => {
        const e = document.createElementNS(NS, "path");
        e.setAttribute("d", d);
        svg.appendChild(e);
        const L = e.getTotalLength();
        gsap.set(e, { strokeDasharray: `${L} ${L * 2}`, strokeDashoffset: L + 3 });
        return e;
      };
      const tip = (x: number, y: number) => ({ x: x - 4, y: y - 50 });

      const flipping = flip.current;
      const t = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (cancelled) return;
          setPlaying(false);
          if (mode !== "auto") return;
          if (page < briefs.length - 1) flipTo(page + 1, "auto");
          else flipTo(0, "rest");
        },
      });

      // The sheet arrives: on first load it settles onto the pad; after a flip it is already there.
      const enter = { autoAlpha: 1, y: 0, rotation: -0.6, duration: 0.7, ease: "power3.out" };
      if (flipping) t.fromTo(P, { autoAlpha: 0, y: 24, rotation: -2.6 }, enter, NEXT_IN);
      else if (!started.current) t.fromTo(P, { autoAlpha: 0, y: 24, rotation: -2.6 }, enter, FIRST_DELAY);
      else gsap.set(P, { rotation: -0.6 });
      t.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: 0.026 }, ">+0.05");

      // Strike through each line of the brief.
      const s0 = lines[0] ? tip(lines[0].x - 4, lines[0].y + lines[0].h * 0.56) : { x: 0, y: 0 };
      t.fromTo(penEl, { autoAlpha: 0, x: s0.x + 30, y: s0.y - 30 }, { autoAlpha: 1, x: s0.x, y: s0.y, duration: 0.35, ease: "power2.out" }, ">+0.15");
      lines.forEach((L, n) => {
        const y = L.y + L.h * 0.56;
        const x0 = L.x - 4;
        const x1 = L.r + 6;
        const mid = (x0 + x1) / 2;
        const e = path(`M${x0} ${y + 2} C ${x0 + 40} ${y - 3}, ${mid} ${y + 3}, ${mid + 20} ${y} S ${x1 - 30} ${y - 2}, ${x1} ${y + 1}`);
        const a = tip(x0, y + 2);
        const b = tip(x1, y + 1);
        if (n > 0) t.to(penEl, { x: a.x, y: a.y, duration: 0.2, ease: "power2.inOut" });
        t.to(e, { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" });
        t.to(penEl, { x: b.x, y: b.y, duration: 0.5, ease: "power1.inOut" }, "<");
      });
      t.to(brief, { opacity: 0.5, duration: 0.3 }, "<0.25");

      // Write the real problem and the call, word by word.
      gsap.set(
        words.map((w) => w.el),
        { opacity: 0 },
      );
      words.forEach((w, n) => {
        const pt = tip(w.right, w.bottom - 5);
        t.to(penEl, { x: pt.x, y: pt.y, duration: 0.1, ease: "none" }, n === 0 ? ">+0.2" : ">");
        t.to(w.el, { opacity: 1, duration: 0.12 }, "<");
      });

      // Underline the key phrase, line by line, so it stays readable.
      keyLines.forEach((R, n) => {
        const y = R.y + R.h + 2;
        const x0 = R.x - 2;
        const x1 = R.r + 3;
        const mid = (x0 + x1) / 2;
        const e = path(`M${x0} ${y + 1} C ${x0 + 24} ${y - 1}, ${mid - 10} ${y + 2}, ${mid} ${y + 1} S ${x1 - 18} ${y - 1}, ${x1} ${y + 1}`);
        const a = tip(x0, y + 1);
        const b = tip(x1, y + 1);
        t.to(penEl, { x: a.x, y: a.y, duration: n === 0 ? 0.3 : 0.18, ease: "power2.inOut" }, n === 0 ? ">+0.2" : ">");
        t.to(e, { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" });
        t.to(penEl, { x: b.x, y: b.y, duration: 0.45, ease: "power1.inOut" }, "<");
      });

      t.to(penEl, { autoAlpha: 0, x: "+=40", y: "-=30", duration: 0.4, ease: "power2.in" }, ">+0.15");
      if (mode === "auto") t.to({}, { duration: HOLD });
      tl.current = t;

      // The previous sheet slides off the stack.
      if (flipping) {
        gsap.to(flipping, {
          autoAlpha: 0,
          x: -36,
          y: -8,
          rotation: -4,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            if (flip.current === flipping) clearFlip();
          },
        });
      }

      if (!animate) {
        t.progress(1);
        gsap.set(penEl, { autoAlpha: 0 });
        gsap.set(P, { rotation: -0.6, autoAlpha: 1 });
        setPlaying(false);
      } else if (inView.current && !userPaused.current) {
        t.play();
        setPlaying(true);
      }
      started.current = true;
    };

    const go = () => {
      if (cancelled) return;
      ctx = gsap.context(build, root);
    };
    if (document.fonts?.status === "loaded") go();
    else document.fonts?.ready.then(go);

    return () => {
      cancelled = true;
      tl.current?.kill();
      tl.current = null;
      ctx?.revert();
    };
    // flipTo only reads refs and sets state; the view object drives rebuilds.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  // Index: move to that brief and play it once.
  const pick = (n: number) => {
    userPaused.current = false;
    flipTo(n, "single");
  };
  const togglePlay = () => {
    const t = tl.current;
    if (playing && t) {
      t.pause();
      userPaused.current = true;
      setPlaying(false);
    } else if (t && t.progress() < 1 && mode !== "rest") {
      userPaused.current = false;
      t.play();
      setPlaying(true);
    } else {
      userPaused.current = false;
      flipTo(0, "auto");
    }
  };

  return (
    <div ref={root} className={styles.wrap}>
      <div className={styles.layout}>
        <div ref={desk} className={styles.desk}>
          <div className={`${styles.sheet} ${styles.s2}`} aria-hidden="true" />
          <div className={`${styles.sheet} ${styles.s1}`} aria-hidden="true" />
          <div ref={paper} className={styles.paper}>
            <div className={`t-eyebrow ${styles.head}`}>
              <span>Brief · {p.tag}</span>
              <Link href={p.href} className={styles.caseLink}>
                Read the case →
              </Link>
            </div>
            <p className={styles.brief}>
              <span className="sr-only">The brief, as it arrived: {p.brief}</span>
              <span ref={briefRef} aria-hidden="true">
                {p.brief.split(" ").map((word, i) => (
                  <span key={i}>
                    <span className={styles.bw}>
                      {[...word].map((c, j) => (
                        <span key={j} data-c>
                          {c}
                        </span>
                      ))}
                    </span>{" "}
                  </span>
                ))}
              </span>
            </p>
            <p className={styles.note}>
              <span className={`t-eyebrow ${styles.label}`}>What I found</span>
              <Words text={p.problem} mark={p.key} />
            </p>
            <p className={`${styles.note} ${styles.call}`}>
              <span className={`t-eyebrow ${styles.label}`}>What I did</span>
              <Words text={p.call} tick />
            </p>
            <svg ref={ink} className={styles.ink} aria-hidden="true" focusable="false" />
            <svg ref={pen} className={styles.pen} viewBox="0 0 54 54" aria-hidden="true" focusable="false">
              <g transform="rotate(-42 27 27)">
                <rect x="22" y="-6" width="10" height="44" rx="3" className={styles.penBody} />
                <rect x="22" y="2" width="10" height="5" className={styles.penBand} />
                <path d="M22 38 L32 38 L27 52 Z" className={styles.penNib} />
              </g>
            </svg>
          </div>
        </div>

        <div className={styles.index}>
          <ol className={styles.list}>
            {briefs.map((b, n) => (
              <li key={b.index}>
                <button type="button" className={styles.item} aria-current={n === page ? "true" : undefined} onClick={() => pick(n)}>
                  <span className={styles.itemTag}>{b.tag}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
