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
  | "restore-chat";

export type GlyphId = "skills" | "pipeline" | "tiers" | "flow" | "services";

export interface Metric {
  /** Headline figure, e.g. "< 24h" */
  value: string;
  label: string;
  /** Optional before/after pair, drawn as a comparison bar. */
  before?: { label: string; amount: number };
  after?: { label: string; amount: number };
  unit?: string;
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

export interface CaseStudy {
  slug: string;
  index: string;
  accent: Accent;
  glyph: GlyphId;
  group: "AI-driven UI" | "Enterprise systems" | "Civic scale";
  title: string;
  /** Short label used in navigation and the index. */
  short: string;
  dek: string;
  meta: {
    role: string;
    context: string;
    timeline: string;
    domain: string;
  };
  tags: string[];
  headline: { value: string; label: string };
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
  stakes: { intro?: string; items: { title: string; body: string }[] };
  forks: Fork[];
  followOn?: { title: string; intro?: string; items: { title: string; body: string }[]; exhibit?: ExhibitId };
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
