"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

/**
 * A small accent square that follows the pointer (2026-10-26).
 *
 * - Over a link or button it shrinks and shows a short label beside it, typed
 *   in letter by letter. The label comes from the nearest [data-cursor-text];
 *   links without one get a default ("Open", "Open website", "Send email").
 * - Over readable text it turns into a thin text bar, so selecting still feels
 *   like selecting.
 * - It shrinks a little while the button is held.
 *
 * Only for a mouse or trackpad on a wide screen. Touch, narrow screens and
 * forced-colours mode keep the system cursor, and so does every text field.
 * Under reduced motion the label appears at once instead of typing in.
 * Purely decorative: aria-hidden, never focusable, never blocks a click.
 */

const INTERACTIVE = "a[href], button, [role='button'], summary, label[for], select, [data-cursor-text]";
const TYPING = "input, textarea, select, [contenteditable='true']";

function labelFor(el: Element): string {
  const own = el.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
  if (own) return own;
  const a = el.closest("a[href]") as HTMLAnchorElement | null;
  if (!a) return "";
  if (a.href.startsWith("mailto:")) return "Send email";
  if (a.href.endsWith(".pdf")) return "Open PDF";
  try {
    return new URL(a.href).host === window.location.host ? "Open" : "Open website";
  } catch {
    return "Open";
  }
}

/** True when the pointer is over actual glyphs, not just inside a text block's padding. */
function overText(x: number, y: number, target: Element): boolean {
  if (getComputedStyle(target).userSelect === "none") return false;
  type CaretPos = { offsetNode: Node; offset: number } | null;
  const doc = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => CaretPos;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };
  const node = doc.caretPositionFromPoint?.(x, y)?.offsetNode ?? doc.caretRangeFromPoint?.(x, y)?.startContainer;
  if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) return false;
  const range = document.createRange();
  range.selectNodeContents(node);
  const pad = 4;
  return [...range.getClientRects()].some((r) => x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad);
}

export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const labelEl = text.current;
    if (!el || !labelEl) return;

    const capable = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px)");
    const forced = window.matchMedia("(forced-colors: active)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const html = document.documentElement;

    let label = "";
    let typing = 0;
    let frame = 0;
    let x = -100;
    let y = -100;

    const typeTo = (next: string) => {
      if (next === label) return;
      label = next;
      cancelAnimationFrame(typing);
      el.dataset.label = next ? "on" : "";
      if (!next || reduce.matches) {
        labelEl.textContent = next;
        return;
      }
      // About 22ms a letter, never longer than a fifth of a second in all.
      const total = Math.min(200, 22 * next.length);
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / total);
        const eased = 1 - (1 - t) ** 3;
        labelEl.textContent = next.slice(0, Math.max(1, Math.round(eased * next.length)));
        if (t < 1) typing = requestAnimationFrame(step);
      };
      typing = requestAnimationFrame(step);
    };

    const place = () => {
      frame = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x = e.clientX;
      y = e.clientY;
      el.dataset.visible = "on";
      if (!frame) frame = requestAnimationFrame(place);

      const target = e.target as Element | null;
      if (!target || !(target instanceof Element)) return;
      if (target.closest(TYPING)) {
        el.dataset.state = "hidden";
        typeTo("");
        return;
      }
      if (target.closest(INTERACTIVE)) {
        el.dataset.state = "link";
        typeTo(labelFor(target));
        return;
      }
      typeTo("");
      el.dataset.state = overText(e.clientX, e.clientY, target) ? "text" : "default";
    };
    const onDown = () => (el.dataset.pressed = "on");
    const onUp = () => (el.dataset.pressed = "");
    const onLeave = () => (el.dataset.visible = "");

    const enable = () => {
      const on = capable.matches && !forced.matches;
      html.dataset.cursor = on ? "on" : "";
      if (!on) {
        el.dataset.visible = "";
        return;
      }
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("pointerup", onUp, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    };
    const disable = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
    const refresh = () => {
      disable();
      enable();
    };

    enable();
    capable.addEventListener("change", refresh);
    forced.addEventListener("change", refresh);
    return () => {
      disable();
      capable.removeEventListener("change", refresh);
      forced.removeEventListener("change", refresh);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(typing);
      html.dataset.cursor = "";
    };
  }, []);

  return (
    <div ref={root} className={styles.cursor} aria-hidden="true" data-state="default">
      <span className={styles.mark} />
      <span ref={text} className={styles.label} />
    </div>
  );
}
