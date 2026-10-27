"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { ASK_EVENT, type AskDetail } from "@/lib/ask";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import styles from "./AskPanel.module.css";

type Turn = { role: "user" | "assistant"; content: string; quote?: string; failed?: boolean };

const MAX_CHARS = 2000;
const TIMEOUT_MS = 30_000;

/** The server takes at most 16 messages and 16,000 characters, starting with a question; send the newest that fit. */
function window_(history: Turn[]) {
  const sent: Turn[] = [];
  let total = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    const t = history[i]!;
    if (t.failed || (t.role === "user" && history[i + 1]?.failed) || !t.content) continue;
    if (sent.length >= 15 || total + t.content.length > 15000) break;
    sent.unshift(t);
    total += t.content.length;
  }
  while (sent[0]?.role === "assistant") sent.shift();
  return sent.map(({ role, content }) => ({ role, content }));
}

const mailto = (question: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent("A question from your portfolio")}&body=${encodeURIComponent(question)}`;

/** Internal links only: the AI may point at a case study, About or the résumé. */
const LINK = /\[([^\]]+)\]\((\/(?:work\/[a-z0-9-]+|lab|about|resume))\)/g;

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
  const [trimmed, setTrimmed] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const why = useRef<"stop" | "timeout" | null>(null);
  const turnsRef = useRef<Turn[]>([]);
  turnsRef.current = turns;

  const send = useCallback(
    async (question: string, withQuote: string) => {
      const text = question.trim().slice(0, MAX_CHARS);
      if (!text || busy) return;
      const history = [...turnsRef.current, { role: "user" as const, content: text, quote: withQuote || undefined }];
      setTurns([...history, { role: "assistant", content: "" }]);
      setDraft("");
      setQuote("");
      setTrimmed(false);
      setBusy(true);
      const ctrl = new AbortController();
      abort.current = ctrl;
      why.current = null;
      // Only the wait for the first words is timed; a long answer that is streaming is fine.
      const timer = window.setTimeout(() => {
        why.current = "timeout";
        ctrl.abort();
      }, TIMEOUT_MS);
      let answer = "";
      // A failed question goes back in the box, so the visitor never retypes it.
      const fail = (message: string) => {
        setTurns([...history, { role: "assistant", content: message, failed: true }]);
        setDraft((d) => d || text);
        setQuote((q) => q || withQuote);
      };
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Quotes are sent with the newest question only.
            messages: window_(history),
            quote: withQuote,
            page: window.location.pathname,
          }),
          signal: ctrl.signal,
        });
        if (!res.ok) {
          window.clearTimeout(timer);
          fail((await res.text().catch(() => "")) || "Something went wrong on my side. Your question is still below.");
          return;
        }
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) answer = await res.text();
        while (reader) {
          const { value, done } = await reader.read();
          if (done) break;
          window.clearTimeout(timer);
          answer += decoder.decode(value, { stream: true });
          setTurns([...history, { role: "assistant", content: answer }]);
        }
        if (answer) setTurns([...history, { role: "assistant", content: answer }]);
        else fail("Something went wrong on my side. Your question is still below.");
      } catch {
        if (why.current === "timeout") fail("That was taking too long, so I stopped after 30 seconds. Your question is still below.");
        else if (why.current === "stop") {
          if (answer) setTurns([...history, { role: "assistant", content: answer }]);
          else fail("Stopped. Your question is still below.");
        } else if (!ctrl.signal.aborted) fail("I couldn't reach the chat. Check your connection; your question is still below.");
      } finally {
        window.clearTimeout(timer);
        setBusy(false);
        abort.current = null;
      }
    },
    [busy],
  );

  const stop = () => {
    why.current = "stop";
    abort.current?.abort();
  };

  // Drop the failed pair and ask again.
  const retry = (i: number) => {
    const q = turnsRef.current[i - 1];
    if (!q) return;
    turnsRef.current = turnsRef.current.filter((_, j) => j !== i && j !== i - 1);
    setTurns(turnsRef.current);
    void send(q.content, q.quote ?? "");
  };

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
              ) : t.failed ? (
                <div key={i} className={styles.failed} role="alert">
                  <p>{t.content}</p>
                  <div className={styles.actions}>
                    <button type="button" onClick={() => retry(i)} disabled={busy}>
                      <Icon name="replay" size={14} /> Try again
                    </button>
                    <a href={mailto(turns[i - 1]?.content ?? "")}>
                      <Icon name="arrow-up-right" size={14} /> Email this question
                    </a>
                  </div>
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
              maxLength={MAX_CHARS}
              placeholder={quote ? "What would you like to know about this?" : "Ask about my work…"}
              onChange={(e) => {
                setDraft(e.target.value);
                if (e.target.value.length < MAX_CHARS) setTrimmed(false);
              }}
              onPaste={(e) => {
                const el = e.currentTarget;
                const room = MAX_CHARS - (el.value.length - (el.selectionEnd - el.selectionStart));
                if (e.clipboardData.getData("text").length > room) setTrimmed(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(draft, quote);
                }
              }}
            />
            {busy ? (
              <button type="button" className={styles.send} onClick={stop} aria-label="Stop the answer">
                <Icon name="pause" size={16} />
              </button>
            ) : (
              <button type="submit" className={styles.send} disabled={!draft.trim()} aria-label="Send">
                <Icon name="send" size={16} />
              </button>
            )}
          </div>
          {trimmed && (
            <p className={styles.trimmed} role="status">
              That was long, so I kept the first 2,000 characters.
            </p>
          )}
          <p className={styles.foot}>
            Or email <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </form>
      </aside>
    </div>
  );
}
