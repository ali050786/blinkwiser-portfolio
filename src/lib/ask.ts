/**
 * Opens the "Ask about Ali" chat from anywhere on the page (the header button,
 * the text-selection button, a link). The panel listens for this event, so the
 * callers don't need to share React state with it.
 */
export const ASK_EVENT = "ask-ali";

export type AskDetail = {
  /** Text the visitor selected on the page, shown as a quote above their question. */
  quote?: string;
  /** A question to send straight away. */
  question?: string;
};

export function openAsk(detail: AskDetail = {}) {
  window.dispatchEvent(new CustomEvent<AskDetail>(ASK_EVENT, { detail }));
}
