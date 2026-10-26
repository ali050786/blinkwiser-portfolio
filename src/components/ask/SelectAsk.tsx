"use client";

import { useEffect, useRef, useState } from "react";
import { openAsk } from "@/lib/ask";
import { Icon } from "@/components/ui/Icon";
import styles from "./SelectAsk.module.css";

const MIN = 4;
const MAX = 600;
const WIDTH = 168;

/**
 * Select a few words anywhere on the page and a small button appears just
 * above them: "Ask about this" opens the chat with the selection quoted.
 * Works with mouse and keyboard selections. Hidden inside the chat itself and
 * in form fields, and when the selection is cleared, scrolled away or Escape
 * is pressed.
 */
export function SelectAsk() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const quote = useRef("");
  const range = useRef<Range | null>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timer = 0;

    const place = () => {
      const r = range.current?.getBoundingClientRect();
      if (!r || (r.width === 0 && r.height === 0)) return setPos(null);
      const x = Math.max(8, Math.min(r.left + r.width / 2 - WIDTH / 2, window.innerWidth - WIDTH - 8));
      // Above the selection, or below it when there's no room at the top.
      const y = r.top > 64 ? r.top - 40 : r.bottom + 8;
      setPos({ x, y });
    };

    const read = () => {
      const sel = window.getSelection();
      const text = sel?.toString().replace(/\s+/g, " ").trim() ?? "";
      if (!sel || sel.rangeCount === 0 || text.length < MIN || text.length > MAX) {
        range.current = null;
        return setPos(null);
      }
      const r = sel.getRangeAt(0);
      const host = r.commonAncestorContainer instanceof Element ? r.commonAncestorContainer : r.commonAncestorContainer.parentElement;
      if (host?.closest("[data-ask-panel], input, textarea, [contenteditable='true'], [data-no-ask]")) {
        range.current = null;
        return setPos(null);
      }
      quote.current = text;
      range.current = r.cloneRange();
      place();
    };

    // selectionchange fires for mouse and keyboard selections alike; wait for it to settle.
    const onChange = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(read, 180);
    };
    const onScroll = () => range.current && place();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPos(null);

    document.addEventListener("selectionchange", onChange);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("selectionchange", onChange);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!pos) return null;

  return (
    <button
      ref={button}
      type="button"
      className={styles.ask}
      style={{ left: pos.x, top: pos.y, width: WIDTH }}
      // Keep the selection alive while the button is pressed.
      onPointerDown={(e) => e.preventDefault()}
      onClick={() => {
        openAsk({ quote: quote.current });
        window.getSelection()?.removeAllRanges();
        setPos(null);
      }}
      data-cursor-text="Ask the AI"
    >
      <Icon name="spark" size={14} />
      Ask about this
    </button>
  );
}
