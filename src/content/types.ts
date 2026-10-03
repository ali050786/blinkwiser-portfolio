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
  | "ask-when-needed";

export type MetricVisualId = "glyph-flow" | "asked-once" | "cost-every-step" | "four-flows";

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
}

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

export type CardWidget = "stepper" | "brands" | "pipeline" | "slides" | "departments";

export interface CaseStudy {
  slug: string;
  index: string;
  accent: Accent;
  glyph: GlyphId;
  group: "Health insurance platforms" | "AI-driven UI" | "Civic scale";
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
    /** Optional opening line that puts a person in the story before the tabs. */
    lead?: string;
    /** Optional turning point shown under the tabs: what someone said, and what happened next. */
    turn?: { quote: string; source: string; after: string };
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
}
