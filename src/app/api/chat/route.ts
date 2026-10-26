import { ASK_SYSTEM } from "@/lib/ask-context";
import { site } from "@/content/site";

/*
 * POST /api/chat: the "Ask about Ali" chat. Streams a plain-text answer.
 *
 * Calls Claude through OpenRouter (openrouter.ai). Needs OPENROUTER_API_KEY on
 * the server (Vercel project settings, or .env.local for `npm run dev`).
 * Without it the panel says the chat isn't set up yet. ASK_MODEL picks the
 * OpenRouter model id. The default, Claude Haiku 5.5, was the fastest in
 * testing: about a second to the first word and two to the full answer.
 *
 * Cost guards: the big knowledge prompt is cached for an hour, reasoning
 * effort is low (it's chat), answers are capped, and each visitor gets a
 * small number of questions per ten minutes. The limit lives in this server
 * instance's memory, so it resets on a cold start and isn't shared across
 * instances; put it in a store (Vercel KV, Upstash) if the chat gets real
 * traffic. A spend limit on the OpenRouter key is the hard ceiling.
 */

export const runtime = "nodejs";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.ASK_MODEL || "anthropic/claude-haiku-5.5";
// Reasoning tokens count against this too, so leave room above the answer itself.
const MAX_TOKENS = 2000;

const NOT_SET_UP = "The chat isn't set up yet. Email me instead and I'll reply myself.";
const BUSY = "The chat is busy right now. Try again in a minute, or email me.";
const BROKEN = "Something went wrong on my side. Try again, or email me.";

const WINDOW_MS = 10 * 60 * 1000;
const PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > PER_WINDOW;
}

type Turn = { role: "user" | "assistant"; content: string };

function parse(body: unknown): { turns: Turn[]; quote: string; page: string } | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.messages) || b.messages.length === 0 || b.messages.length > 16) return null;
  const turns: Turn[] = [];
  let total = 0;
  for (const m of b.messages) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, 2000);
    if (!text) return null;
    total += text.length;
    turns.push({ role, content: text });
  }
  if (total > 16000 || turns[0]?.role !== "user" || turns.at(-1)?.role !== "user") return null;
  const quote = typeof b.quote === "string" ? b.quote.replace(/\s+/g, " ").trim().slice(0, 600) : "";
  const page = typeof b.page === "string" && /^\/[a-z0-9\-/]{0,80}$/.test(b.page) ? b.page : "/";
  return { turns, quote, page };
}

const plain = (status: number, text: string) => new Response(text, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

/** What the visitor sees for an OpenRouter error status (from the HTTP response or a mid-stream error chunk). */
function messageFor(status: number | undefined): string {
  if (status === 401 || status === 403) return NOT_SET_UP; // missing, wrong or revoked key
  if (status === 402 || status === 429) return BUSY; // out of credits, or rate limited upstream
  return BROKEN;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  if (limited(ip)) return plain(429, "That's a lot of questions at once. Give it ten minutes, or email me and I'll answer myself.");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return plain(400, "I couldn't read that message.");
  }
  const input = parse(body);
  if (!input) return plain(400, "I couldn't read that message.");

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return plain(503, NOT_SET_UP);

  // Page and quote go in the newest user turn, after the cached system prompt,
  // so they never break the cache.
  const last = input.turns.at(-1)!;
  const context = [`(The visitor is on ${input.page}.)`, input.quote ? `They selected this passage on the page:\n"${input.quote}"` : ""].filter(Boolean).join("\n");
  const messages = [
    { role: "system", content: [{ type: "text", text: ASK_SYSTEM, cache_control: { type: "ephemeral", ttl: "1h" } }] },
    ...input.turns.slice(0, -1),
    { role: "user", content: `${context}\n\n${last.content}` },
  ];

  let upstream: Response;
  try {
    upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        // Optional attribution OpenRouter shows on its dashboard.
        "HTTP-Referer": site.url,
        "X-Title": `${site.name} portfolio`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        stream: true,
        reasoning: { effort: "low", exclude: true },
        messages,
      }),
      signal: req.signal,
    });
  } catch (err) {
    if (req.signal.aborted) return plain(499, "");
    console.error("[api/chat] network", err instanceof Error ? err.message : err);
    return plain(502, BROKEN);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("[api/chat]", upstream.status, detail.slice(0, 300));
    // Visitors get a friendly line with a 200, so the panel shows it as the answer.
    return plain(200, messageFor(upstream.status));
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      let wrote = false;
      let finish: string | null = null;
      try {
        // Server-sent events: "data: {json}" lines, ": comment" keep-alives, "data: [DONE]" at the end.
        read: while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") break read;
            let chunk: { error?: { code?: number; message?: string }; choices?: { delta?: { content?: string }; finish_reason?: string | null }[] };
            try {
              chunk = JSON.parse(data);
            } catch {
              continue;
            }
            // Errors can arrive mid-stream with a 200 status.
            if (chunk.error) {
              console.error("[api/chat] stream", chunk.error.code, chunk.error.message);
              controller.enqueue(encoder.encode(wrote ? `\n\n${BROKEN}` : messageFor(chunk.error.code)));
              wrote = true;
              break read;
            }
            const choice = chunk.choices?.[0];
            const text = choice?.delta?.content;
            if (text) {
              controller.enqueue(encoder.encode(text));
              wrote = true;
            }
            if (choice?.finish_reason) finish = choice.finish_reason;
          }
        }
        if (!wrote) controller.enqueue(encoder.encode(BROKEN));
        else if (finish === "length") controller.enqueue(encoder.encode("…"));
        else if (finish === "content_filter") controller.enqueue(encoder.encode("\n\nI can't help with that one here. Ask me about my work, or email me."));
      } catch (err) {
        if (!req.signal.aborted) {
          console.error("[api/chat] read", err instanceof Error ? err.message : err);
          controller.enqueue(encoder.encode(wrote ? `\n\n${BROKEN}` : BROKEN));
        }
      }
      controller.close();
    },
    cancel() {
      // The visitor closed the panel: stop reading so OpenRouter can stop the model.
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
