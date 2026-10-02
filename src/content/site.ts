export const site = {
  name: "Sikandar Ali Abdul",
  title: "Sikandar Ali Abdul · Lead UX Designer, US Health Insurance",
  url: "https://portfolio.blinkwiser.com",
  description:
    "Lead UX Designer for US health insurance. Five years leading design on a white-label US health-insurance platform, plus AI products and civic services. Decision-led case studies with real screens: the brief, the real problem, and the call.",
  role: "Lead UX Designer",
  location: "Pune, India",
  availability: "Open to senior and lead roles in UX, AI products and design engineering",
  email: "ali050786@gmail.com",
  linkedin: "https://www.linkedin.com/in/sikandar-ux",
  blinkwiser: "https://blinkwiser.com",
  /** The résumé page (it links the PDF). Set to null to hide the résumé links. */
  resumeUrl: "/resume" as string | null,
};

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#how", label: "How I work" },
  { href: "/#contact", label: "Contact" },
];

export const proof = [
  { value: 5, prefix: "9 → ", suffix: "", label: "enrollment steps, with \u201cwho's covered\u201d asked once", study: "01" },
  { value: 24, prefix: "< ", suffix: "h", label: "to theme a new client on a white-label health-insurance platform, down from weeks", study: "02" },
  { value: 0, text: "1–2 wks → 3–4 days", prefix: "", suffix: "", label: "Jira-story turnaround with BAs, once the design system was readable by AI", study: "03" },
  { value: 0, text: "Plan → Execute → Reflect", prefix: "", suffix: "", label: "an agent workflow on every carousel: research the facts, write, then check its own work", study: "04" },
  { value: 3.5, decimals: 1, prefix: "", suffix: "M", label: "residents' city services, organised by need instead of department", study: "05" },
];

export const principles = [
  {
    title: "Find the problem under the brief",
    /** The one study this habit leads, shown at the top of that study. */
    primary: "01",
    body: "Every study here starts with a reframe. Asked to edit screens, I found a platform problem. Told a flow was too long, I found it asked questions in the wrong order.",
    refs: ["01", "02"],
  },
  {
    title: "Make the variable explicit",
    /** The one study this habit leads, shown at the top of that study. */
    primary: "03",
    body: "Brands become tokens. Rules become code, not prompt requests. A design system becomes files an agent can read. What can change should be configurable, and nothing else should be.",
    refs: ["02", "03", "04"],
  },
  {
    title: "Design for the build reality",
    /** The one study this habit leads, shown at the top of that study. */
    primary: "05",
    body: "A design that can't be built as specified is a wish. I design within the platform's constraints, and translate between the user's model and the system's instead of forcing either.",
    refs: ["01", "05"],
  },
  {
    title: "Settle trade-offs with evidence",
    /** The one study this habit leads, shown at the top of that study. */
    primary: "04",
    body: "Quality versus speed is an eval, not a debate. And honest attribution (observed, not measured; directional, not isolated) is part of the result.",
    refs: ["04"],
  },
  {
    title: "Adoption is part of the design",
    /** The one study this habit leads, shown at the top of that study. */
    primary: "02",
    body: "A system nobody uses is a file. Enablement, documentation, design QA and an agreement with engineering are design work too.",
    refs: ["02", "03"],
  },
];

export const capabilities = [
  {
    title: "US health insurance",
    items: [
      "Enrollment, life-event and eligibility flows for members and admins",
      "A white-label benefits platform for insurers, employers and members",
      "Multi-tenant compliance and audit logging, designed in",
    ],
  },
  {
    title: "Enterprise design systems",
    items: [
      "Three-tier token architecture and white-label theming",
      "120+ components across web, mobile web, iOS and Android",
      "Design QA, governance and adoption across engineering",
    ],
  },
  {
    title: "Research and team leadership",
    items: [
      "Stakeholder research and personas for insurers, employers and members",
      "Workshops with BAs and engineering before ideas or system changes ship",
      "Hired, onboarded and led a team of four designers",
    ],
  },
  {
    title: "AI-driven UI",
    items: [
      "Design systems rebuilt as machine-readable skill files",
      "Agent workflows with self-verification and drift audits",
      "Grounded generation, honesty guards and blind eval harnesses",
      "Daily tools: Claude Code, Figma MCP, LangGraph and Lovable",
    ],
  },
];

export const timeline = [
  { period: "2025–now", role: "Independent AI product work", org: "Blinkwiser", detail: "A lab alongside Mphasis: AI products designed and shipped by directing coding agents." },
  {
    period: "2021–now",
    role: "Founding UX Designer → UX Lead",
    org: "Mphasis · US health-insurance platform",
    detail: "White-label enterprise SaaS for US health insurance. Built the system and a team of four designers around it.",
  },
  {
    period: "2020–2021",
    role: "Lead UX Designer, onsite",
    org: "Mphasis · Dubai Municipality",
    detail: "Bilingual civic services portal, presented milestone by milestone to senior officials.",
  },
  {
    period: "2015–2019",
    role: "Consumer products",
    org: "Mphasis · Jet Airways",
    detail: "Web, iOS, Android and Apple Watch, all in production until 2019.",
  },
];

export const education = [
  {
    period: "2026",
    qualification: "PG Certificate, Forward Deployed AI Engineering",
    org: "IIT Roorkee",
    detail: "In progress.",
  },
  {
    period: "2013",
    qualification: "Bachelor of Business Administration",
    org: "Mahatma Gandhi University, Meghalaya",
    detail: "",
  },
];

export const learning = [
  "Agentic AI · DeepLearning.AI",
  "AI Agents in LangGraph",
];
