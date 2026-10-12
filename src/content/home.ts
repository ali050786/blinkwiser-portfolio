/*
 * Copy and data for the v4 home page (2026-10-10). Every fact here is taken
 * from the case studies, site.ts or the handoff notes; nothing new is claimed.
 * Screens are rebuilt in a demo brand (see screens.ts), except Dubai
 * Municipality and Jet Airways, which are live-app screenshots and mockups.
 */

export type CaseSlug =
  | "open-enrollment"
  | "enterprise-platform-from-zero"
  | "ai-readable-design-system"
  | "designing-trust-into-ai"
  | "dubai-municipality"
  | "jet-airways-booking";

export const hero = {
  title: ["I lead design in", "regulated SaaS."],
  sub: "I've spent 11 years in UX, and for the last six I've led design on a white-label health-insurance platform used by insurers, employers and their members.",
  primary: { label: "Read the case studies", href: "/#work" },
  secondary: { label: "Resume", href: "/resume" },
  /** Shown at the foot of the hero, led by the institution name. */
  credential: { org: "IIT Roorkee", text: "PG Certificate in Forward Deployed AI Engineering, in progress" },
};

/**
 * One tile in the hero rings. `img` is a square crop in /work/tiles; tiles without one draw a line pattern.
 * The first 12 tiles make the inner ring and the rest the outer ring, in this order around the circle.
 */
export type Tile = { caption: string; slug: CaseSlug; img?: string; pattern?: 0 | 1 | 2 };

export const tiles: Tile[] = [
  { caption: "Who's covered, asked once", slug: "open-enrollment", img: "enroll-household" },
  { caption: "Design tokens", slug: "enterprise-platform-from-zero", pattern: 0 },
  { caption: "Fare choices", slug: "jet-airways-booking", img: "jet-fares" },
  { caption: "Member dashboard", slug: "enterprise-platform-from-zero", img: "ds-dashboard" },
  { caption: "Arabic and English", slug: "dubai-municipality", img: "dm-bilingual" },
  { caption: "Skill files for AI tools", slug: "ai-readable-design-system", pattern: 1 },
  { caption: "Blinkwiser landing page", slug: "designing-trust-into-ai", img: "bw-landing" },
  { caption: "Switching plans keeps the family", slug: "open-enrollment", img: "enroll-plan" },
  { caption: "The Branding Hub", slug: "enterprise-platform-from-zero", pattern: 1 },
  { caption: "Card sorting", slug: "dubai-municipality", pattern: 2 },
  { caption: "City services", slug: "dubai-municipality", img: "dm-services" },
  { caption: "Passive enrollment", slug: "open-enrollment", pattern: 2 },
  { caption: "A studio you talk to", slug: "designing-trust-into-ai", pattern: 0 },
  { caption: "Meals and extras", slug: "jet-airways-booking", img: "jet-extras" },
  { caption: "Theme colors", slug: "enterprise-platform-from-zero", img: "ds-tokens" },
  { caption: "A carousel being made", slug: "designing-trust-into-ai", img: "bw-run" },
  { caption: "Product card states", slug: "ai-readable-design-system", img: "ds-card" },
  { caption: "UX validation", slug: "enterprise-platform-from-zero", pattern: 1 },
  { caption: "Requests dashboard", slug: "dubai-municipality", img: "dm-dashboard" },
  { caption: "One review page before signing", slug: "open-enrollment", pattern: 0 },
  { caption: "Setting up a new client", slug: "enterprise-platform-from-zero", pattern: 0 },
  { caption: "Agents that check their own work", slug: "designing-trust-into-ai", pattern: 1 },
  { caption: "Life events", slug: "open-enrollment", pattern: 1 },
  { caption: "Right-to-left layouts", slug: "dubai-municipality", pattern: 2 },
  { caption: "Extras on web and mobile", slug: "jet-airways-booking", img: "jet-overview" },
  { caption: "120+ components", slug: "enterprise-platform-from-zero", pattern: 2 },
  { caption: "The enrollment trailer", slug: "open-enrollment", img: "enroll-trailer" },
  { caption: "Personas", slug: "enterprise-platform-from-zero", pattern: 0 },
];

/**
 * Extra presentation data for each case study, keyed by slug. Titles and roles come from case-studies.ts.
 * `opening` is the case study's own first line, shown as a caption on its card.
 */
export const deck: Record<
  CaseSlug,
  { domain: string; outcome: string; opening: string; img: string; alt: string; tint: 1 | 2 | 3 | 4 | 5 | 6; fit?: "cover" | "contain" }
> = {
  "open-enrollment": {
    domain: "Health insurance",
    outcome: "Enrollment cut from 9 steps to 5, live in production",
    opening: "Dennis has 31 days to get his newborn covered.",
    img: "/work/deck/enrollment.webp",
    alt: "Rebuilt plan selection screen from the enrollment redesign, in a demo brand: the family is already listed and prices are monthly.",
    tint: 1,
  },
  "enterprise-platform-from-zero": {
    domain: "White-label SaaS",
    outcome: "A new client themed in under a day, down from weeks",
    opening: "A new client used to take weeks to set up.",
    img: "/work/deck/platform.webp",
    alt: "Member dashboard from the white-label platform, in a demo brand: coverage status for the whole family.",
    tint: 2,
  },
  "ai-readable-design-system": {
    domain: "Design systems",
    outcome: "Jira story to screen in three or four days, down from one or two weeks",
    opening: "Our AI tool kept putting Save on the wrong side.",
    img: "/work/deck/ai-system.webp",
    alt: "A product card component in its default and selected states, from the design system the AI tools read.",
    tint: 3,
  },
  "designing-trust-into-ai": {
    domain: "AI product",
    outcome: "First slides in about 23 seconds, with every number traced to a source",
    opening: "The first version made up its own statistics.",
    img: "/work/deck/blinkwiser.webp",
    alt: "Blinkwiser landing page with the headline Carousels that design themselves.",
    tint: 4,
  },
  "dubai-municipality": {
    domain: "Civic services",
    outcome: "Nine city apps brought into one, in Arabic and English",
    opening: "Nine separate apps, each with its own way of working.",
    img: "/work/deck/dubai.webp",
    alt: "Dubai Municipality app screens in English and Arabic: home, services and dashboard. Live-app screenshots.",
    tint: 5,
    fit: "contain",
  },
  "jet-airways-booking": {
    domain: "Airline e-commerce",
    outcome: "Fares, full price, and extras on web, iOS, and Android",
    opening: "Five fares per flight don't fit on a phone.",
    img: "/work/deck/jet.webp",
    alt: "Jet Airways flight results with fare choices on desktop web.",
    tint: 6,
    fit: "contain",
  },
};

/** The capability map: six branches from the centre, each with short leaves. */
export const map = {
  /** The hub of the map: the experience everything else grows out of. */
  centre: { title: "11 years", sub: "in UX" },
  branches: [
    { label: "US health insurance", leaves: ["Open enrollment", "Life events", "Eligibility", "Passive enrollment", "Audit logging"] },
    { label: "Design systems", leaves: ["Three-tier tokens", "White-label theming", "120+ components", "UX validation"] },
    { label: "Platforms", leaves: ["Web and mobile web", "iOS and Android", "Apple Watch", "Right-to-left layouts"] },
    { label: "AI products", leaves: ["Skill files for AI tools", "Agents that check their own work", "Blind comparisons", "Claude Code", "Figma MCP", "LangGraph"] },
    { label: "Leading design", leaves: ["A team of four designers", "Two of them I hired", "Agreements with engineering", "Presenting to stakeholders"] },
    { label: "Research", leaves: ["Stakeholder research", "Personas", "Card sorting", "Workshops with business analysts"] },
  ],
};

/** "I'm hiring … who has …": roles pick which experience is most relevant; each experience opens one case. */
export const hire = {
  roles: [
    { id: "lead", label: "Lead UX", phrase: "a Lead UX designer", needs: ["team", "whitelabel", "enrollment", "aisystem"] },
    { id: "senior", label: "Senior UX", phrase: "a senior UX designer", needs: ["enrollment", "platforms", "bilingual", "aiproduct"] },
    { id: "systems", label: "Design systems", phrase: "a design systems designer", needs: ["whitelabel", "aisystem", "team"] },
    { id: "ai", label: "AI product", phrase: "an AI product designer", needs: ["aiproduct", "aisystem"] },
    { id: "health", label: "Health tech", phrase: "a health-tech designer", needs: ["health", "enrollment", "whitelabel"] },
  ],
  needs: [
    { id: "team", label: "Leading a design team", phrase: "led a team of designers", slug: "enterprise-platform-from-zero" as CaseSlug, note: "I led a team of four designers on the platform, two of them my own hires." },
    { id: "enrollment", label: "Fixing a long flow", phrase: "fixed a flow everyone called too long", slug: "open-enrollment" as CaseSlug },
    { id: "whitelabel", label: "White-label design systems", phrase: "built a white-label design system", slug: "enterprise-platform-from-zero" as CaseSlug },
    { id: "aisystem", label: "Design systems for AI tools", phrase: "made a design system AI tools can follow", slug: "ai-readable-design-system" as CaseSlug },
    { id: "aiproduct", label: "Shipping an AI product", phrase: "designed and shipped an AI product", slug: "designing-trust-into-ai" as CaseSlug },
    { id: "health", label: "US health insurance", phrase: "worked in US health insurance", slug: "open-enrollment" as CaseSlug },
    { id: "bilingual", label: "Arabic and English", phrase: "designed in Arabic and English", slug: "dubai-municipality" as CaseSlug },
    { id: "platforms", label: "Web, iOS, and Android", phrase: "shipped on web, iOS, and Android", slug: "jet-airways-booking" as CaseSlug },
  ],
};

export const faq = [
  {
    q: "What kind of work do you do?",
    a: "I lead UX on complex, regulated products. Health tech is where most of my experience is, and AI products are what I've been building on my own since July 2026.",
  },
  {
    q: "Where are you based?",
    a: "I live in Pune, India, and I'm open to relocating. I've worked abroad twice before: a year in Doha, Qatar, as a UX designer at IBN Al QYM, and 11 months onsite in Dubai, when I was designing the Dubai Municipality app.",
  },
  {
    q: "Why are the health-insurance screens in a demo brand?",
    a: "That work is confidential, so I rebuilt the screens in HTML from my design files. The layout and content follow the real screens, but the brand is made up and every name, plan and price is invented. The Dubai Municipality screens are screenshots of the live app, and the Jet Airways screens come from my own files of the shipped product.",
  },
  {
    q: "Which tools do you use day to day?",
    a: "Figma for design. For AI work I use Claude Code, GitHub Copilot in VS Code, Google Antigravity, Figma MCP, LangGraph, and Lovable.",
  },
  {
    q: "Can I see your resume?",
    a: "Yes. It's one page, and you can read it here or download it as a PDF.",
    link: { href: "/resume", label: "Open the resume" },
  },
];
