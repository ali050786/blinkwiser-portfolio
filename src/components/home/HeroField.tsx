"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { caseStudies } from "@/content/case-studies";
import { hero, tiles, deck } from "@/content/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./HeroField.module.css";

/*
 * Hero: a centred serif headline inside two slow rings of real work tiles,
 * after the claude.com product overview hero. The inner ring turns clockwise,
 * the outer ring the other way, a little faster; the tiles stay upright. On load
 * every tile spirals out from near the centre to its place on the ring.
 * Hovering a tile pauses both rings and opens a small card for its case study.
 * The field is decorative (aria-hidden); every case is reachable from #work.
 * Under reduced motion the tiles sit still on their rings.
 */

/*
 * Two rings, after the reference at 1440 by 900. Its inner ring sits at about
 * 0.535 of the hero's height with 16 tiles; ours sits a little further out, at
 * 0.6, with 12 tiles, so there's more room around the words and less clutter.
 * The inner ring turns about 6 degrees a second; the outer ring sits at about
 * 0.825 of the height and turns about 7.3 degrees a second the other way.
 * The first 12 tiles are the inner ring. Tile sizes repeat in fours, as a
 * share of a 1920px-wide screen.
 */
const INNER = 12;
/** Gap between the words and the nearest edge of an inner-ring tile. */
const CLEARANCE = 48;
/** Height of a two-line caption under a tile. */
const CAPTION = 30;
const RINGS = [
  { count: INNER, radius: 0.6, speed: 6.1, dir: 1, phase: 0 },
  { count: tiles.length - INNER, radius: 0.825, speed: 7.3, dir: -1, phase: 11 },
] as const;
const SIZES = [138, 152, 164, 152];

type Spot = { ring: 0 | 1; angle: number; tsz: number };
const SPOTS: Spot[] = tiles.map((_, i) => {
  const ring = i < INNER ? 0 : 1;
  const k = ring === 0 ? i : i - INNER;
  const r = RINGS[ring];
  return { ring, angle: r.phase + (360 / r.count) * k, tsz: SIZES[k % SIZES.length]! };
});

const INTRO_DELAY = 150;
const INTRO_MS = 1100;
/** How far each ring sweeps during the intro, and how close to the centre it starts. */
const INTRO_SWEEP = 90;
const INTRO_FROM = 0.27;
/** Cubic ease-out, which matches how the reference's tiles slow into their orbit. */
const easeOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
const DEG = Math.PI / 180;

export function HeroField() {
  const root = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Headline words rise out of their masks, then the intro and buttons fade up.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q("[data-word]"), { yPercent: 115, duration: 1.2, stagger: 0.07 }, 0.25)
          .from(q("[data-fade]"), { opacity: 0, y: 14, duration: 0.9, stagger: 0.08 }, 0.7);
      });
    },
    { scope: root },
  );

  useEffect(() => {
    const section = root.current;
    const box = field.current;
    if (!section || !box) return;
    const els = Array.from(box.querySelectorAll<HTMLElement>("[data-tile]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let phone = false;
    let inner = 0; // ring radii in px
    let outer = 0;
    const sizes: number[] = [];
    const copyParts = Array.from(section.querySelectorAll<HTMLElement>("[data-copy-part]"));
    const measure = () => {
      W = section.clientWidth;
      H = section.clientHeight;
      phone = W < 760;
      // The inner ring has to clear the far corners of the headline, intro and
      // credential line, plus half a tile's diagonal and a small gap, so a tile
      // never passes over the words on laptop screens shorter than the reference.
      const box = section.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      let corner = 0;
      copyParts.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = Math.max(Math.abs(r.left - cx), Math.abs(r.right - cx));
        const dy = Math.max(Math.abs(r.top - cy), Math.abs(r.bottom - cy));
        corner = Math.max(corner, Math.hypot(dx, dy));
      });
      const biggest = Math.max((Math.max(...SIZES) / 1920) * W, Math.max(...SIZES) * 0.6);
      inner = Math.max(H * RINGS[0].radius, corner + biggest * 0.71 + CLEARANCE);
      // Far enough out that an inner tile and an outer tile, captions included,
      // never touch as they pass each other, even where they meet at an angle.
      outer = Math.max(H * RINGS[1].radius, inner + Math.SQRT2 * (biggest + CAPTION));
      els.forEach((el, i) => {
        const sp = SPOTS[i]!;
        // Share of a 1920px screen, but never smaller than a readable thumbnail.
        const size = Math.round(Math.max((sp.tsz / 1920) * W, sp.tsz * (phone ? 0.46 : 0.6)));
        sizes[i] = size;
        el.style.setProperty("--s", `${size}px`);
        // Phones only have room for the inner ring.
        el.hidden = phone && sp.ring === 1;
      });
    };

    let spin = 0; // seconds of turning so far; stops while a tile is hovered
    let paused = false;
    let start = 0;
    let last = 0;
    let raf = 0;
    let running = false;

    const place = (now: number) => {
      const t = reduce ? 1 : Math.max(0, Math.min(1, (now - start - INTRO_DELAY) / INTRO_MS));
      const e = easeOut(t);
      const cx = W / 2;
      const cy = H / 2;
      els.forEach((el, i) => {
        const sp = SPOTS[i]!;
        if (el.hidden) return;
        const ring = RINGS[sp.ring];
        const size = sizes[i]!;
        // A true circle on desktop. Phones are narrow and tall, so the ring is
        // an ellipse that runs along the edges of the screen instead.
        const r = sp.ring === 0 ? inner : outer;
        const rx = phone ? W * 0.5 + size * 0.1 : r;
        const ry = phone ? H * 0.47 : r;
        const grow = INTRO_FROM + (1 - INTRO_FROM) * e;
        const a = (sp.angle + ring.dir * (ring.speed * spin - INTRO_SWEEP * (1 - e))) * DEG;
        const x = cx + Math.cos(a) * rx * grow - size / 2;
        const y = cy + Math.sin(a) * ry * grow - size / 2;
        const sc = 0.2 + 0.8 * e;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${sc.toFixed(3)})`;
        el.style.opacity = e < 1 ? String(Math.min(1, e * 2)) : "";
      });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // The rings start turning once the intro has finished.
      if (!paused && now - start > INTRO_DELAY + INTRO_MS) spin += dt;
      place(now);
      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    measure();
    start = performance.now();
    place(start);
    box.dataset.ready = "true";

    const ro = new ResizeObserver(() => {
      measure();
      place(performance.now());
    });
    ro.observe(section);
    document.fonts?.ready.then(() => {
      measure();
      place(performance.now());
    });

    const io = new IntersectionObserver(([entry]) => (entry?.isIntersecting && !document.hidden ? play() : stop()), { threshold: 0 });
    io.observe(section);
    const onVis = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVis);

    // One case card for all tiles. It lives outside the tile field, so the
    // field's fade can't clip it, and it sits above the headline layer.
    const pop = card.current;
    const fill = (i: number) => {
      if (!pop) return;
      const t = tiles[i]!;
      const set = (key: string, text: string) => {
        const el = pop.querySelector<HTMLElement>(`[data-pop="${key}"]`);
        if (el) el.textContent = text;
      };
      set("tag", deck[t.slug].domain);
      set("title", caseStudies.find((c) => c.slug === t.slug)?.short ?? "");
      set("body", deck[t.slug].outcome);
    };
    const show = (el: HTMLElement, i: number) => {
      if (!pop || phone) return;
      fill(i);
      const box = section.getBoundingClientRect();
      const art = (el.firstElementChild as HTMLElement | null) ?? el;
      const r = art.getBoundingClientRect();
      const w = pop.offsetWidth;
      const h = pop.offsetHeight;
      const gap = 12;
      // Open toward the middle of the screen, beside the tile.
      const toRight = r.left + r.width / 2 < box.left + box.width / 2;
      let x = toRight ? r.right - box.left + gap : r.left - box.left - gap - w;
      x = Math.max(8, Math.min(W - w - 8, x));
      const y = Math.max(8, Math.min(H - h - 8, r.top - box.top));
      pop.style.left = `${x.toFixed(0)}px`;
      pop.style.top = `${y.toFixed(0)}px`;
      pop.dataset.open = "true";
    };
    const hide = () => {
      if (pop) delete pop.dataset.open;
    };
    const enters = els.map((el, i) => () => {
      paused = true;
      show(el, i);
    });
    const leave = () => {
      paused = false;
      hide();
    };
    els.forEach((el, i) => {
      el.addEventListener("pointerenter", enters[i]!);
      el.addEventListener("pointerleave", leave);
    });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      els.forEach((el, i) => {
        el.removeEventListener("pointerenter", enters[i]!);
        el.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  const [l1 = "", l2 = ""] = hero.title;

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div ref={field} className={styles.field} aria-hidden="true">
        {tiles.map((t, i) => {
          return (
            <div
              key={t.caption}
              data-tile
              className={styles.tile}
              style={{ ["--b" as string]: SPOTS[i]!.ring === 0 ? "0.66" : "0.56" }}
              onClick={() => router.push(`/work/${t.slug}`)}
            >
              <span className={styles.art}>
                {t.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/work/tiles/${t.img}.webp`} alt="" width={400} height={400} loading={i < 10 ? "eager" : "lazy"} decoding="async" />
                ) : (
                  <Pattern kind={t.pattern ?? 0} />
                )}
              </span>
              <span className={styles.cap}>{t.caption}</span>
            </div>
          );
        })}
      </div>

      <div ref={card} className={styles.pop} aria-hidden="true">
        <span className={styles.popTag} data-pop="tag" />
        <span className={styles.popTitle} data-pop="title" />
        <span className={styles.popBody} data-pop="body" />
        <span className={styles.popMore}>Read the story</span>
      </div>

      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title} data-copy-part>
          <span className="sr-only">
            {l1} {l2}
          </span>
          {[l1, l2].map((line, n) => (
            <span key={line} className={styles.line} aria-hidden="true">
              {line.split(" ").map((w, k) => (
                <span key={k} className={styles.mask}>
                  <span data-word className={n === 1 ? styles.turn : undefined}>
                    {w}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className={styles.sub} data-fade data-copy-part>
          {hero.sub}
        </p>
        <div className={styles.actions} data-fade data-copy-part>
          <ButtonLink href={hero.primary.href} icon="none">
            {hero.primary.label}
          </ButtonLink>
          <ButtonLink href={hero.secondary.href} variant="secondary" icon="arrow-up-right">
            {hero.secondary.label}
          </ButtonLink>
        </div>
        <p className={styles.cred} data-fade data-copy-part>
          <span className={styles.credOrg}>{hero.credential.org}</span>
          {"\u00a0· "}
          {hero.credential.text}
        </p>
      </div>
    </section>
  );
}

/** Line motifs for tiles without a screen: nested tiers, a node graph, a sorted grid. */
function Pattern({ kind }: { kind: 0 | 1 | 2 }) {
  return (
    <svg viewBox="0 0 100 100" className={styles.pattern} aria-hidden="true">
      {kind === 0 && (
        <g>
          {[10, 22, 34].map((o) => (
            <rect key={o} x={o} y={o} width={100 - o * 2} height={100 - o * 2} rx={8 - o / 6} />
          ))}
          <path d="M10 50h12M78 50h12M50 10v12M50 78v12" />
        </g>
      )}
      {kind === 1 && (
        <g>
          <path d="M22 26L50 50L78 30M50 50L30 78M50 50L76 72" />
          {[
            [22, 26],
            [78, 30],
            [30, 78],
            [76, 72],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={5} />
          ))}
          <circle cx={50} cy={50} r={9} className={styles.patternHub} />
        </g>
      )}
      {kind === 2 && (
        <g>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={14 + c * 25} y={14 + r * 25} width={20} height={20} rx={3} className={r === c ? styles.patternHub : undefined} />),
          )}
        </g>
      )}
    </svg>
  );
}
