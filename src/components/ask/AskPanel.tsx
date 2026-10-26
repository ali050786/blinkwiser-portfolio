"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { ASK_EVENT, type AskDetail } from "@/lib/ask";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import styles from "./AskPanel.module.css";

type Turn = { role: "user" | "assistant"; content: string; quote?: string };

/** Internal links only: the AI may point at a case study, About or the résumé. */
const LINK = /\[([^\]]+)\]\((\/(?:work\/[a-z0-9-]+|about|resume))\)/g;

function Answer({ text }: { text: string }) {
  const paras = text.replace(/\*\*/g, "").split(/\n{2,}/).filter((p) => p.trim());
  return (
    <>
      {paras.map((p, i) => {
        const parts: React.ReactNode[] = [];
        let last = 0;
        for (const m of p.matchAll(LINK)) {
          parts.push(p.slice(last, m.index));
          parts.push(
            <Link key={m.index} href={m[2]!} className={styles.link}>
              {m[1]}
            </Link>,
          );
          last = (m.index ?? 0) + m[0].length;
        }
        parts.push(p.slice(last));
        return <p key={i}>{parts.map((n, j) => <Fragment key={j}>{n}</Fragment>)}</p>;
      })}
    </>
  );
}

/**
 * The "Ask about Ali" side panel. Opens from the header button or the
 * text-selection button (see lib/ask.ts), streams answers from /api/chat, and
 * keeps the conversation while you move between pages. Not modal: the page
 * stays usable beside it. On wide screens it is a column beside the page
 * (the app shell in layout.tsx): opening it narrows the page, which scrolls on
 * its own, so the chat sits in the layout rather than over it. On phones it is
 * a full-screen sheet. Escape or the close button closes it and returns focus
 * to where you were.
 */
export function AskPanel({ suggestions }: { suggestions: Record<string, string[]> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [quote, setQuote] = useState("");
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const abort = useRef<AbortController | null>(null);
  const turnsRef = useRef<Turn[]>([]);
  turnsRef.current = turns;

  const send = useCallback(
    async (question: string, withQuote: string) => {
      const text = question.trim();
      if (!text || busy) return;
      const history = [...turnsRef.current, { role: "user" as const, content: text, quote: withQuote || undefined }];
      setTurns([...history, { role: "assistant", content: "" }]);
      setDraft("");
      setQuote("");
      setBusy(true);
      const ctrl = new AbortController();
      abort.current = ctrl;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Only finished turns go back; quotes are sent with the newest question only.
            messages: history.filter((t) => t.content).map(({ role, content }) => ({ role, content })),
            quote: withQuote,
            page: window.location.pathname,
          }),
          signal: ctrl.signal,
        });
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        if (!reader) answer = await res.text();
        while (reader) {
          const { value, done } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setTurns([...history, { role: "assistant", content: answer }]);
        }
        setTurns([...history, { role: "assistant", content: answer || "Something went wrong on my side. Try again, or email me." }]);
      } catch {
        if (!ctrl.signal.aborted) setTurns([...history, { role: "assistant", content: "I couldn't reach the chat. Check your connection, or email me." }]);
      } finally {
        setBusy(false);
        abort.current = null;
      }
    },
    [busy],
  );

  // Open from anywhere: the header button, the selection button, a link.
  useEffect(() => {
    const onAsk = (e: Event) => {
      const d = (e as CustomEvent<AskDetail>).detail ?? {};
      opener.current = document.activeElement;
      setOpen(true);
      if (d.quote) setQuote(d.quote);
      if (d.question) void send(d.question, d.quote ?? "");
    };
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  }, [send]);

  const close = useCallback(() => {
    setOpen(false);
    const back = opener.current;
    if (back instanceof HTMLElement) back.focus();
  }, []);

  // Focus the question box once the panel is no longer inert.
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Tells anything fixed to the page's width how much room the panel takes (--ask-space).
  useEffect(() => {
    document.documentElement.toggleAttribute("data-ask-open", open);
    return () => document.documentElement.removeAttribute("data-ask-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Keep the newest words in view while an answer streams in.
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  useEffect(() => () => abort.current?.abort(), []);

  const starters = suggestions[pathname] ?? suggestions["*"] ?? [];

  return (
    <div className={styles.dock} data-open={open || undefined}>
      <aside className={styles.panel} data-open={open || undefined} data-ask-panel aria-labelledby="ask-title" aria-hidden={!open} inert={!open}>
        <header className={styles.head}>
          <h2 id="ask-title" className={styles.title}>
            <Icon name="mark" size={15} /> Ask about Ali
          </h2>
          <button type="button" className={styles.close} onClick={close} aria-label="Close chat">
            <Icon name="close" size={18} />
          </button>
        </header>
        <p className={styles.note}>An AI that answers from my case studies and resume. It can get things wrong, so for anything that matters, email me.</p>

        <div ref={list} className={styles.list} aria-live="polite" aria-busy={busy}>
          {turns.length === 0 ? (
            <ul className={styles.starters} aria-label="Suggested questions">
              {starters.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => void send(s, quote)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            turns.map((t, i) =>
              t.role === "user" ? (
                <div key={i} className={styles.user}>
                  {t.quote && <blockquote className={styles.quote}>{t.quote}</blockquote>}
                  <p>{t.content}</p>
                </div>
              ) : (
                <div key={i} className={styles.ai}>
                  {t.content ? <Answer text={t.content} /> : <span className={styles.dots} aria-label="Thinking" />}
                </div>
              ),
            )
          )}
        </div>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            void send(draft, quote);
          }}
        >
          {quote && (
            <div className={styles.pending}>
              <blockquote>{quote}</blockquote>
              <button type="button" onClick={() => setQuote("")} aria-label="Remove quote">
                <Icon name="close" size={14} />
              </button>
            </div>
          )}
          <div className={styles.row}>
            <label htmlFor="ask-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="ask-input"
              ref={input}
              rows={1}
              value={draft}
              maxLength={2000}
              placeholder={quote ? "What would you like to know about this?" : "Ask about my work…"}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(draft, quote);
                }
              }}
            />
            <button type="submit" className={styles.send} disabled={busy || !draft.trim()} aria-label="Send">
              <Icon name="send" size={16} />
            </button>
          </div>
          <p className={styles.foot}>
            Or email <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </form>
      </aside>
    </div>
  );
}
