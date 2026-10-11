"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { map } from "@/content/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RevealHeading } from "./RevealHeading";
import s from "./Section.module.css";
import styles from "./SkillMap.module.css";

/*
 * What I bring, drawn as a map: six branches growing out of "11 years in UX",
 * each with its leaves lined up in a tidy column. The branches are soft
 * curves, not straight spokes. As the section scrolls in, the lines draw
 * outward and the labels settle in after them. Otherwise the map is still:
 * hovering a branch lights it and its curve eases out a little. Reduced
 * motion keeps the colour change only. Phones get the same content as a
 * list; screen readers always do.
 */

const W = 1200;
const H = 760;
const C = { x: W / 2, y: H / 2 };
/* Three branches each side of the centre: health, systems, platforms, AI, leading, research. */
const SPOTS = [
  { x: 380, y: 140 },
  { x: 820, y: 140 },
  { x: 900, y: 380 },
  { x: 820, y: 620 },
  { x: 380, y: 620 },
  { x: 300, y: 380 },
];
const ROW = 28;
/** Horizontal distance from a branch node to its column of leaves. */
const LEAF_X = 72;
const HUB_R = 58;

const branches = map.branches.map((b, i) => {
  const p = SPOTS[i] ?? C;
  const side = p.x < C.x ? -1 : 1;
  const n = b.leaves.length;
  // Leaves hang off the outer side of the node in one aligned column.
  const leaves = b.leaves.map((label, j) => {
    const k = j - (n - 1) / 2;
    return { label, x: p.x + side * LEAF_X, y: p.y + k * ROW };
  });
  // The branch name sits on the inner side, toward the centre.
  const lx = p.x - side * 14;
  const ly = p.y > C.y + 50 ? p.y + 30 : p.y - 14;
  // The trunk bows to one side: a control point off the middle of the line,
  // alternating sides so the map doesn't look like a pinwheel.
  const dx = p.x - C.x;
  const dy = p.y - C.y;
  const len = Math.hypot(dx, dy);
  const bend = len * 0.17 * (i % 2 === 0 ? 1 : -1);
  const q = { x: C.x + dx * 0.5 + (-dy / len) * bend, y: C.y + dy * 0.5 + (dx / len) * bend };
  // On hover the curve eases out a little further.
  const qh = { x: C.x + dx * 0.5 + (-dy / len) * bend * 1.35, y: C.y + dy * 0.5 + (dx / len) * bend * 1.35 };
  return { ...b, p, q, qh, side, leaves, lx, ly };
});

type Pt = { x: number; y: number };
const trunkD = (h: Pt, q: Pt, p: Pt) => `M${h.x.toFixed(1)} ${h.y.toFixed(1)} Q${q.x.toFixed(1)} ${q.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
const twigD = (p: Pt, l: Pt, side: number) =>
  `M${p.x.toFixed(1)} ${p.y.toFixed(1)} C${(p.x + side * 28).toFixed(1)} ${p.y.toFixed(1)}, ${(l.x - side * 30).toFixed(1)} ${l.y.toFixed(1)}, ${(l.x - side * 6).toFixed(1)} ${l.y.toFixed(1)}`;

export function SkillMap() {
  const root = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 860px)", () => {
        const q = gsap.utils.selector(root);
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: q("[data-svg]")[0], start: "top 80%", end: "center 55%", scrub: 0.5 },
          })
          .from(q("[data-hub]"), { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%", duration: 0.4 })
          .from(q("[data-trunk]"), { strokeDashoffset: 1, duration: 1, stagger: 0.08 }, 0.2)
          .from(q("[data-branch-label]"), { autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.7)
          .from(q("[data-twig]"), { strokeDashoffset: 1, duration: 1, stagger: 0.02 }, 1)
          .from(q("[data-leaf]"), { autoAlpha: 0, duration: 0.6, stagger: 0.02 }, 1.5);
      });
    },
    { scope: root },
  );

  // Hovering a branch eases its curve out a little; leaving eases it back.
  useEffect(() => {
    const el = svg.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups = branches.map((b, i) => {
      const g = el.querySelector<SVGGElement>(`[data-branch="${i}"]`);
      const trunk = g?.querySelector<SVGPathElement>("[data-trunk]");
      if (!g || !trunk) return () => {};
      const state = { k: 0 };
      const draw = () => {
        const q = { x: b.q.x + (b.qh.x - b.q.x) * state.k, y: b.q.y + (b.qh.y - b.q.y) * state.k };
        trunk.setAttribute("d", trunkD(C, q, b.p));
      };
      const to = (k: number) => gsap.to(state, { k, duration: 0.5, ease: "power2.out", overwrite: true, onUpdate: draw });
      const enter = () => to(1);
      const leave = () => to(0);
      g.addEventListener("pointerenter", enter);
      g.addEventListener("pointerleave", leave);
      return () => {
        g.removeEventListener("pointerenter", enter);
        g.removeEventListener("pointerleave", leave);
        gsap.killTweensOf(state);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section ref={root} className={`${s.section} ${styles.section}`} aria-labelledby="map-title">
      <div className={s.wrap}>
        <RevealHeading id="map-title" label="Strengths" text="What I'd bring to your team" />
        <div className={styles.cta}>
          <ButtonLink href="/resume" variant="secondary" icon="arrow-up-right">
            See my resume
          </ButtonLink>
        </div>

        <svg ref={svg} data-svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          {branches.map((b, i) => (
            <g key={b.label} className={styles.branch} data-branch={i}>
              {/* A wide invisible line, so the branch is easy to hover. */}
              <path className={styles.hit} d={trunkD(C, b.q, b.p)} />
              <path data-trunk className={styles.trunk} d={trunkD(C, b.q, b.p)} pathLength={1} />
              {b.leaves.map((l) => (
                <path key={l.label} data-twig className={styles.twig} d={twigD(b.p, l, b.side)} pathLength={1} />
              ))}
              <circle data-node cx={b.p.x} cy={b.p.y} r={3.5} className={styles.node} />
              <text data-branch-label className={styles.branchLabel} x={b.lx} y={b.ly} textAnchor={b.side < 0 ? "start" : "end"}>
                {b.label}
              </text>
              {b.leaves.map((l) => (
                <text key={l.label} data-leaf className={styles.leaf} x={l.x} y={l.y + 4} textAnchor={b.side < 0 ? "end" : "start"}>
                  {l.label}
                </text>
              ))}
            </g>
          ))}
          <g data-hub>
            <circle cx={C.x} cy={C.y} r={HUB_R} className={styles.hub} />
            <text x={C.x} y={C.y + 3} textAnchor="middle" className={styles.hubLabel}>
              {map.centre.title}
            </text>
            <text x={C.x} y={C.y + 26} textAnchor="middle" className={styles.hubSub}>
              {map.centre.sub}
            </text>
          </g>
        </svg>

        <ul className={styles.list}>
          {map.branches.map((b) => (
            <li key={b.label}>
              <h3 className={styles.listTitle}>{b.label}</h3>
              <ul>
                {b.leaves.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
