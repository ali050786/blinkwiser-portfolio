"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import styles from "./HeroStack.module.css";

const brands = [
  { id: "a", name: "Brand A" },
  { id: "b", name: "Brand B" },
  { id: "c", name: "Brand C" },
] as const;
type BrandId = (typeof brands)[number]["id"];

const layers = [
  { tag: "01 · tokens", title: "Tokens" },
  { tag: "02 · components", title: "Components" },
  { tag: "03 · app shell", title: "App shell" },
  { tag: "04 · screen", title: "Screen" },
];

/**
 * An exploded view of the stack I design: tokens → components → app shell →
 * screen. The demo brand cycles at the token layer and every layer above
 * re-themes, which is the whole argument of case studies 01 and 03.
 */
export function HeroStack() {
  const wrap = useRef<HTMLDivElement>(null);
  const [brand, setBrand] = useState<BrandId>("a");
  const [playing, setPlaying] = useState(true);
  const [focus, setFocus] = useState<number | null>(null);
  const visible = useRef(true);

  // Auto-cycle the demo brand; pauses offscreen, in background tabs, on reduced motion, or when the visitor takes control.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => (visible.current = !!e?.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      setBrand((b) => brands[(brands.findIndex((x) => x.id === b) + 1) % brands.length]!.id);
    }, 3200);
    return () => window.clearInterval(id);
  }, [playing]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const tilt = wrap.current!.querySelector<HTMLElement>("[data-tilt]")!;
      const layerEls = gsap.utils.toArray<HTMLElement>("[data-layer]", wrap.current);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Intro: built bottom-up, tokens first, the same order the skill files are fed.
        gsap.set(tilt, { "--gap": "14px" });
        const intro = gsap
          .timeline({ delay: 0.25, defaults: { ease: "expo.out" } })
          .fromTo(layerEls, { autoAlpha: 0, "--lift": "-90px" }, { autoAlpha: 1, "--lift": "0px", duration: 1.1, stagger: 0.14 })
          .to(tilt, { "--gap": "70px", duration: 1.6, ease: "expo.inOut" }, 0.55);

        // Scroll: the stack keeps separating as the hero leaves the viewport.
        const st = gsap.fromTo(
          tilt,
          { "--gap": "70px", "--rz": "-42deg" },
          {
          "--gap": "104px",
          "--rz": "-32deg",
          immediateRender: false,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top 80px", end: "bottom top", scrub: 0.6 },
          },
        );

        // Pointer parallax, applied to a parent so it composes with the scroll tween.
        const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = wrap.current!.getBoundingClientRect();
          rx(((e.clientY - r.top) / r.height - 0.5) * -6);
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        const el = wrap.current!;
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          intro.kill();
          st.scrollTrigger?.kill();
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(tilt, { "--gap": "78px" });
      });

      return () => mm.revert();
    },
    { scope: wrap },
  );

  useEffect(() => () => ScrollTrigger.refresh(), []);

  const current = brands.find((b) => b.id === brand)!;

  return (
    <div ref={wrap} className={styles.wrap} data-brand={brand} data-focus={focus ?? undefined}>
      <p className="sr-only">
        Illustration: four layers of a design system (tokens, components, app shell, and a finished screen) stacked in an exploded
        view. Switching the demo brand re-themes every layer at once. Currently showing {current.name}.
      </p>

      <div className={styles.scene} aria-hidden="true">
        <div className={styles.tilt} data-tilt>
          <div className={styles.stage} data-stage>
            {layers.map((l, i) => (
              <div key={l.tag} className={styles.layer} data-layer={i} style={{ "--i": i } as React.CSSProperties}>
                <span className={styles.tag}>{l.tag}</span>
                {i === 0 && <TokensLayer />}
                {i === 1 && <ComponentsLayer />}
                {i === 2 && <ShellLayer />}
                {i === 3 && <ScreenLayer brand={current.name} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ol className={styles.legend} aria-hidden="true">
        {[...layers].reverse().map((l) => {
          const i = layers.indexOf(l);
          return (
            <li key={l.tag} onMouseEnter={() => setFocus(i)} onMouseLeave={() => setFocus(null)} data-active={focus === i || undefined}>
              <span className="t-mono">{String(i + 1).padStart(2, "0")}</span> {l.title}
            </li>
          );
        })}
      </ol>

      <div className={styles.controls}>
        <div role="group" aria-label="Demo brand" className={styles.brands}>
          {brands.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={brand === b.id}
              className={styles.brandBtn}
              data-swatch={b.id}
              onClick={() => {
                setBrand(b.id);
                setPlaying(false);
              }}
            >
              <span className={styles.swatch} aria-hidden="true" />
              {b.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.play}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause brand cycling" : "Play brand cycling"}
        >
          {playing ? (
            <span className={styles.pauseBars} aria-hidden="true">
              <span />
              <span />
            </span>
          ) : (
            <Icon name="play" size={14} />
          )}
        </button>
      </div>
      <p className={styles.caption}>
        <span className="t-label c-tertiary">One token change</span> Every layer above it re-themes.
      </p>
    </div>
  );
}

function TokensLayer() {
  return (
    <div className={styles.tokens}>
      <div className={styles.swatches}>
        <span className={styles.swPrimary} />
        <span className={styles.swSoft} />
        <span className={styles.swInk} />
        <span className={styles.swMid} />
        <span className={styles.swLight} />
      </div>
      <div className={styles.typeRow}>
        <span className={styles.aa}>Aa</span>
        <span className={styles.scale}>
          <i style={{ width: "88%" }} />
          <i style={{ width: "64%" }} />
          <i style={{ width: "46%" }} />
        </span>
      </div>
      <div className={styles.spacing}>
        {[6, 10, 16, 24, 36].map((w) => (
          <i key={w} style={{ width: w }} />
        ))}
        <span className={styles.radius} />
      </div>
    </div>
  );
}

function ComponentsLayer() {
  return (
    <div className={styles.components}>
      <span className={styles.btnPrimary}>Continue</span>
      <span className={styles.btnSecondary}>Back</span>
      <span className={styles.switch}>
        <i />
      </span>
      <span className={styles.check} />
      <span className={styles.input}>
        <i />
      </span>
      <span className={styles.badge}>Active</span>
    </div>
  );
}

function ShellLayer() {
  return (
    <div className={styles.shell}>
      <div className={styles.shellHeader}>
        <i className={styles.logoDot} />
        <i className={styles.bar} style={{ width: 54 }} />
        <i className={styles.bar} style={{ width: 28, marginLeft: "auto" }} />
      </div>
      <div className={styles.shellBody}>
        <div className={styles.shellNav}>
          <i className={styles.navActive} />
          <i />
          <i />
          <i />
        </div>
        <div className={styles.shellMain}>
          {Array.from({ length: 12 }).map((_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenLayer({ brand }: { brand: string }) {
  return (
    <div className={styles.screen}>
      <div className={styles.screenHeader}>
        <i className={styles.logoDot} />
        <b>{brand}</b>
        <span>Benefits 2027</span>
      </div>
      <p className={styles.screenTitle}>Choose your coverage</p>
      <div className={styles.plans}>
        {[
          ["Silver", "$142"],
          ["Gold", "$191"],
          ["Bronze", "$98"],
        ].map(([n, p], i) => (
          <div key={n} className={styles.plan} data-selected={i === 0 || undefined}>
            <span>{n}</span>
            <b>{p}</b>
            <em>/mo</em>
          </div>
        ))}
      </div>
      <div className={styles.screenFooter}>
        <span className={styles.total}>
          Total <b>$142/mo</b>
        </span>
        <span className={styles.btnPrimary}>Continue</span>
      </div>
    </div>
  );
}
