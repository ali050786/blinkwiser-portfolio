"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { career, type CareerChapter } from "@/content/career";
import styles from "./CareerWave.module.css";

/*
 * The hero's career wave, latest first. At each job the line dives below
 * "the brief" to what changed one level down; the newest work goes deepest.
 * Everything is readable at rest: hover only highlights a dip and adds the
 * case link. The SVG is decoration; the chapters are a real list over it.
 */

// Horizontal geometry, viewBox 1000 × 236. Crest y 54, surface y 78.
const HW = 1000;
const HH = 236;
const CREST = 54;
const SURFACE = 78;
const START = 150;
const HALF = 74;
const DEPTH_Y: Record<number, number> = { 4: 150, 3: 132, 2: 114, 1: 96 };
const CX = [270, 480, 690, 890];
const END = 990;

function hSeg(i: number, depth: number) {
  const cx = CX[i]!;
  const from = i === 0 ? START : CX[i - 1]! + HALF;
  const y = DEPTH_Y[depth]!;
  const a = cx - HALF;
  const b = cx + HALF;
  const tail = i === CX.length - 1 ? ` L${END} ${CREST}` : "";
  return `M${from} ${CREST} L${a} ${CREST} C${a + 40} ${CREST} ${a + 34} ${y} ${cx} ${y} C${b - 34} ${y} ${b - 40} ${CREST} ${b} ${CREST}${tail}`;
}

// Vertical geometry for phones, drawn 1:1. Crest x 22, surface x 44.
const V_BLOCK = 112;
const V_CREST = 22;
const V_TIP: Record<number, number> = { 4: 104, 3: 90, 2: 76, 1: 62 };
function vSeg(i: number, depth: number) {
  const top = i * V_BLOCK;
  const tip = V_TIP[depth]!;
  const from = i === 0 ? 6 : top;
  return `M${V_CREST} ${from} L${V_CREST} ${top + 12} C${V_CREST} ${top + 34} ${tip} ${top + 30} ${tip} ${top + 54} C${tip} ${top + 78} ${V_CREST} ${top + 74} ${V_CREST} ${top + 96} L${V_CREST} ${top + V_BLOCK}`;
}
const VH = career.length * V_BLOCK;

const DRAW = 1.8;
const DELAY = 0.8;

export function CareerWave() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const pointer = useRef<string>("mouse");

  // Tap or click outside the wave returns it to rest.
  useEffect(() => {
    if (!active) return;
    const off = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", off);
    return () => document.removeEventListener("pointerdown", off);
  }, [active]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const svg = Array.from(el.querySelectorAll<SVGSVGElement>("svg[data-wave]")).find((s) => getComputedStyle(s).display !== "none");
        if (!svg) return;
        const segs = Array.from(svg.querySelectorAll<SVGPathElement>("[data-seg]"));
        // Strokes are non-scaling, so dash lengths are in screen pixels: scale the path lengths to match.
        const scale = svg.getScreenCTM()?.a ?? 1;
        const lengths = segs.map((p) => p.getTotalLength() * scale + 2);
        const total = lengths.reduce((a, b) => a + b, 0) || 1;
        const items = Array.from(el.querySelectorAll<HTMLElement>("[data-chapter]"));
        const chrome = svg.querySelectorAll("[data-chrome]");
        const dot = svg.querySelector("[data-now]");

        segs.forEach((p, i) => gsap.set(p, { strokeDasharray: `${lengths[i]} ${lengths[i]! * 2}`, strokeDashoffset: lengths[i]! + 4 }));
        gsap.set(items, { autoAlpha: 0 });
        gsap.set(dot, { scale: 0, transformOrigin: "center" });

        const tl = gsap.timeline({ delay: DELAY });
        tl.from(chrome, { autoAlpha: 0, duration: 0.4, ease: "power1.out" }, 0);
        tl.to(dot, { scale: 1, duration: 0.35, ease: "back.out(2)" }, 0);
        let t = 0.2;
        segs.forEach((p, i) => {
          const d = (lengths[i]! / total) * DRAW;
          tl.to(p, { strokeDashoffset: 0, duration: d, ease: "sine.inOut" }, t);
          if (items[i]) tl.to(items[i]!, { autoAlpha: 1, duration: 0.45, ease: "power1.out" }, t + d * 0.35);
          t += d;
        });
        tl.add(() => {
          gsap.set(segs, { clearProps: "strokeDasharray,strokeDashoffset" });
          gsap.set(items, { clearProps: "opacity,visibility" });
        });
        return () => tl.kill();
      });
    },
    { scope: root },
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setActive(null);
      (document.activeElement as HTMLElement | null)?.blur();
    }
  };
  const onBlur = (e: React.FocusEvent) => {
    if (!root.current?.contains(e.relatedTarget as Node)) setActive(null);
  };

  const chapter = (c: CareerChapter, i: number) => {
    const isActive = active === c.id;
    const vars = {
      "--cx": `${(CX[i]! / HW) * 100}%`,
      "--fy": `${((DEPTH_Y[c.depth]! + 8) / HH) * 100}%`,
      "--vy": `${i * V_BLOCK}px`,
    } as React.CSSProperties;

    const label = (
      <span className={styles.org}>
        {c.org}
        {c.current && <span className={`t-label ${styles.now}`}>Now</span>}
      </span>
    );
    const common = {
      className: styles.trigger,
      onPointerDown: (e: React.PointerEvent) => {
        pointer.current = e.pointerType;
      },
      onPointerEnter: (e: React.PointerEvent) => {
        if (e.pointerType === "mouse") setActive(c.id);
      },
      onFocus: () => setActive(c.id),
    };

    return (
      <li
        key={c.id}
        className={styles.chapter}
        data-chapter={c.id}
        data-current={c.current || undefined}
        data-active={isActive || undefined}
        style={vars}
      >
        {c.href ? (
          <Link
            href={c.href}
            {...common}
            onClick={(e) => {
              // Touch: the first tap highlights, the second follows the link.
              if (pointer.current !== "mouse" && !isActive) {
                e.preventDefault();
                setActive(c.id);
              }
            }}
          >
            {label}
          </Link>
        ) : (
          <button type="button" aria-pressed={isActive} {...common} onClick={() => setActive(isActive ? null : c.id)}>
            {label}
          </button>
        )}
        <p className={styles.details}>
          <span className={styles.brief}>
            <span className="sr-only">The brief: </span>
            <s>{c.brief}</s>
          </span>
          <span className={styles.lower}>
            <span className={styles.fix}>
              <span className="sr-only">What I changed: </span>
              {c.fix}
            </span>
            <span className={`t-label ${styles.result}`}>{c.result}</span>
            {c.href && c.caseIndex && (
              <span className={`t-label ${styles.read}`} aria-hidden="true">
                Read case {c.caseIndex} →
              </span>
            )}
          </span>
        </p>
      </li>
    );
  };

  return (
    <div
      ref={root}
      className={styles.wave}
      data-active={active ?? undefined}
      style={{ "--vh": `${VH}px` } as React.CSSProperties}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setActive(null);
      }}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <svg className={`${styles.svg} ${styles.svgH}`} viewBox={`0 0 ${HW} ${HH}`} aria-hidden="true" focusable="false" data-wave="h">
        <line data-chrome className={styles.surface} x1="0" y1={SURFACE} x2={HW} y2={SURFACE} />
        {career.map((c, i) => (
          <path key={c.id} className={styles.seg} data-seg={c.id} data-current={c.current || undefined} d={hSeg(i, c.depth)} />
        ))}
        <circle className={styles.dot} cx={START} cy={CREST} r={5} data-now />
      </svg>
      <svg className={`${styles.svg} ${styles.svgV}`} viewBox={`0 0 120 ${VH}`} aria-hidden="true" focusable="false" data-wave="v">
        <line data-chrome className={styles.surface} x1="44" y1="0" x2="44" y2={VH} />
        {career.map((c, i) => (
          <path key={c.id} className={styles.seg} data-seg={c.id} data-current={c.current || undefined} d={vSeg(i, c.depth)} />
        ))}
        <circle className={styles.dot} cx={V_CREST} cy={6} r={5} data-now />
      </svg>
      <span className={`t-label ${styles.key} ${styles.keyBrief}`} aria-hidden="true">
        The brief
      </span>
      <span
        className={`t-label ${styles.key} ${styles.keyChanged}`}
        style={{ top: `calc(${(SURFACE / HH) * 100}% + 8px)` }}
        aria-hidden="true"
      >
        What I changed ↓
      </span>
      <ol className={styles.list} aria-label="Career, latest first: the brief, and what I changed one level down">
        {career.map(chapter)}
      </ol>
    </div>
  );
}
