export type Accent = "automation" | "blinkwiser" | "platform" | "enrollment" | "civic";

export type ExhibitId =
  | "skill-graph"
  | "build-screen"
  | "theme-cascade"
  | "flow-compare"
  | "coverage-grid"
  | "service-map"
  | "bilingual-pair"
  | "pipeline"
  | "eval-board"
  | "restore-chat"
  | "enrollment-screens"
  | "design-system-screens"
  | "passive-screens"
  | "branding-screens"
  | "passive-funnel"
  | "coverage-gap"
  | "trim-vs-reorder"
  | "translate-layer"
  | "ask-when-needed"
  | "rules-in-heads"
  | "two-loops"
  | "prompt-vs-system"
  | "portable-skills"
  | "adoption-spread"
  | "white-label-chain"
  | "growth-ceiling"
  | "edits-vs-foundation"
  | "adoption-four-sides"
  | "how-work-ran"
  | "trust-questions"
  | "quality-steps"
  | "blind-eval"
  | "cut-to-three"
  | "org-vs-need"
  | "four-constraints"
  | "ideal-vs-buildable"
  | "jet-journey"
  | "grid-vs-list"
  | "total-vs-breakdown"
  | "extras-one-step"
  | "upsell-inline"
  | "jet-screens"
  | "dm-nine-into-one"
  | "dm-card-sort"
  | "dm-mendix"
  | "dm-rtl-template";

export type MetricVisualId =
  | "glyph-flow"
  | "asked-once"
  | "cost-every-step"
  | "four-flows"
  | "mockup-hours"
  | "story-days"
  | "time-freed"
  | "brand-grid"
  | "jet-platforms"
  | "jet-steps"
  | "jet-extras"
  | "jet-years"
  | "dm-apps"
  | "dm-tabs"
  | "dm-months"
  | "dm-rtl";

export type HookVisualId = "same-request" | "client-theme" | "trust-edit" | "city-home" | "fare-choice";

export type HeroVisualId = "newborn" | "plan-switch" | "cost" | "save-side" | "link-colour" | "audit";

export type GlyphId = "skills" | "pipeline" | "tiers" | "flow" | "services";

export interface Metric {
  /** Headline figure, e.g. "< 24h" */
  value: string;
  label: string;
  /** Optional before/after pair, drawn as a comparison bar. */
  before?: { label: string; amount: number };
  after?: { label: string; amount: number };
  unit?: string;
  /** Optional small line diagram drawn in the card; replaces the before/after bars. */
  visual?: MetricVisualId;
  /** Optional data-driven diagram for the card, in the same glyph language. */
  viz?: MetricViz;
}

type Run = { solid: number; range?: number; label: string };
export type MetricViz =
  | { kind: "blocks"; unit: string; before: Run; after: Run; note: string }
  | { kind: "dots"; filled: number; total: number; note: string }
  | { kind: "compare"; rows: { label: string; value: number; accent?: boolean }[]; max: number; note: string }
  | { kind: "fan"; from: string; to: string[]; note: string }
  | { kind: "timeline"; end: number; unit: string; marks: { at: number; from?: number; label: string; accent?: boolean }[]; note: string }
  | { kind: "ticks"; count: number; label: string; note: string };

export type ScreenKey =
  | "old-household"
  | "old-coverage-hub"
  | "old-who-again"
  | "old-plan-list"
  | "old-review"
  | "new-household"
  | "new-plan"
  | "new-coverage"
  | "new-review"
  | "ds-tokens"
  | "ds-buttons"
  | "ds-product-card"
  | "ds-dashboard"
  | "pe-rule"
  | "pe-confirm"
  | "pe-running"
  | "pe-report"
  | "bh-hub"
  | "bh-editor"
  | "bh-preview"
  | "bh-assign";

/**
 * A product screen: rebuilt in HTML from design files (`screen`), or, for my own
 * product only, a real capture (`src` image or `video`).
 */
export interface Shot {
  screen?: ScreenKey;
  src?: string;
  video?: string;
  poster?: string;
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
  /** Show the whole image (no height cap or fade), e.g. a row of phone screens. */
  full?: boolean;
  /** Footnote under a cover, when the default ("rebuilt" / "live product") doesn't fit. */
  note?: string;
  /** Label above the caption, when "The product" doesn't fit. */
  label?: string;
  /** Show the media alone, with no label, caption or footnote under it. */
  bare?: boolean;
  /** Autoplaying video with a pause button; true adds a sound toggle (muted by default). */
  sound?: boolean;
}

export interface Option {
  label: string;
  detail: string;
}

export interface Fork {
  id: string;
  /** The fork, phrased as the question it forced. */
  title: string;
  tension: string;
  rejected: Option;
  chosen: Option;
  why: string[];
  bullets?: { title: string; body: string }[];
  cost: string;
  exhibit?: ExhibitId;
}

/** A feature built on the study's main decision: why it existed, what I designed, what it changed. */
export interface Spotlight {
  label: string;
  title: string;
  intro: string;
  why: string[];
  what: string[];
  impact: string[];
  provenance: string;
  /** Optional glanceable visual shown right under the intro, before the text columns. */
  lead?: ExhibitId;
  exhibit?: ExhibitId;
}

/** One piece of a story chapter: a paragraph, a visual, or a small supporting element. */
export type StoryBlock =
  | { kind: "p"; text: string }
  | { kind: "exhibit"; id: ExhibitId }
  | { kind: "reframe"; assumed: string; actual: string }
  | { kind: "note"; label: string; text: string }
  | { kind: "cards"; items: { title: string; body: string }[] }
  | { kind: "metrics" }
  /** The study's opener stories (tabs with a before/after picture), shown inside a chapter. */
  | { kind: "stories" }
  /** The study's live-product links, as buttons. */
  | { kind: "links" }
  /** A screenshot or image, with its own caption and an honest note about where it comes from. */
  | { kind: "image"; src: string; alt: string; width: number; height: number; caption: string; note?: string; narrow?: boolean };

/** A chapter of a story-led case study: a plain heading in the author's voice, then text and visuals in reading order. */
export interface StoryChapter {
  id: string;
  /** Short label for the side rail. */
  rail: string;
  title: string;
  blocks: StoryBlock[];
}

export type CardWidget = "stepper" | "brands" | "pipeline" | "slides" | "departments";

export interface CaseStudy {
  slug: string;
  index: string;
  /** Per-case color theme. Being removed case by case: no accent means the site turquoise. */
  accent?: Accent;
  glyph: GlyphId;
  group: "Health insurance platforms" | "AI-driven UI" | "Civic scale" | "Consumer e-commerce";
  title: string;
  /** Short label used in navigation and the index. */
  short: string;
  /** Home-page card: a short title, one visual widget, a short metric label. About 12 words in all. */
  card?: { title: string; widget: CardWidget; label: string; value?: string };
  dek: string;
  meta: {
    role: string;
    context: string;
    timeline: string;
    domain: string;
  };
  /** Optional live-product panel: where to see or download the real thing. Shown under the meta row and with the outcome. */
  live?: { title: string; note: string; links: { label: string; href: string }[] };
  tags: string[];
  /** Optional product screen shown under the snapshot, rebuilt in a demo brand. */
  cover?: Shot;
  /** Optional short recording shown right under the cover. */
  reel?: Shot;
  headline: { value: string; label: string };
  /**
   * Optional story-first opening for the case hero: a line placing the study's
   * scope, then short stories (one per tab), each with the old system's own words
   * where they exist and a side-by-side proof.
   */
  opener?: {
    /** Accessible name for the story tabs. */
    label?: string;
    scope: string;
    /** Optional opening line that puts a person in the story before the tabs. Replaces the scope line when set. */
    lead?: string;
    /** Optional turning point shown under the tabs: what someone said, and what happened next. */
    turn?: { quote: string; source: string; after?: string };
    note: string;
    stories: {
      id: string;
      tab: string;
      story: string;
      quote?: string;
      /** Render the quote as an empty field: the old system had no words at all. */
      quoteEmpty?: { field: string };
      quoteSource?: string;
      visual: HeroVisualId;
      caption: string;
    }[];
  };
  /**
   * Optional picture-first hero: one line, the headline number and one
   * before/after proof. When set, the opener's story tabs move into the Frame beat.
   */
  hook?: {
    line: string;
    turn: string;
    /** Defaults to the study's headline when not set. */
    number?: { value: string; label: string };
    note: string;
    tabsLabel: string;
    picture: {
      visual: HookVisualId;
      title: string;
      chips: string[];
      before: { label: string; items: string[] };
      after: { label: string; items: string[] };
    };
    /** One per tab, in mark order. `quoted` only for words copied verbatim from the old system. */
    findings: { tab: string; words: string; source?: string; quoted?: boolean; empty?: string }[];
  };
  /** The reframe in one breath, for the home page hero deck. */
  hero: { label: string; brief: string; problem: string; call: string };
  snapshot: { frame: string; decision: string; outcome: string };
  frame: {
    assumed: string;
    actual: string;
    body: string[];
    evidence?: { title: string; items: string[] };
    exhibit?: ExhibitId;
  };
  stakes: { intro?: string; items: { title: string; body: string }[]; exhibit?: ExhibitId };
  forks: Fork[];
  followOn?: { title: string; intro?: string; items: { title: string; body: string }[]; exhibit?: ExhibitId };
  spotlight?: Spotlight;
  outcome: {
    metrics: Metric[];
    points: string[];
    provenance: string;
    exhibit?: ExhibitId;
  };
  ownership: {
    mine: string[];
    shared?: string[];
    change: string[];
  };
  signals: string;
  /** Optional story layout. When set, the page tells the study as chapters instead of the five beats. */
  story?: { chapters: StoryChapter[] };
}
