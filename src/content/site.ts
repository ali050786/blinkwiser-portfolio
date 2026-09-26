export const site = {
  name: "Sikandar Ali Abdul",
  title: "Sikandar Ali Abdul · Senior UX Architect",
  url: "https://portfolio.blinkwiser.com",
  description:
    "Senior UX Architect. Decision-led case studies from 11 years across AI products, enterprise design systems, US health insurance and civic services: the brief, the real problem, and the call.",
  role: "Senior UX Architect",
  location: "Pune, India",
  availability: "Open to senior and lead roles in UX, AI products and design engineering",
  email: "ali050786@gmail.com",
  linkedin: "https://www.linkedin.com/in/sikandar-ux",
  blinkwiser: "https://blinkwiser.com",
  /** Set to a path in /public (e.g. "/ali-abdul-resume.pdf") to show the résumé link. */
  resumeUrl: null as string | null,
};

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#approach", label: "Approach" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export const proof = [
  { value: 40, prefix: "~", suffix: "%", label: "less design production time once the design system was readable by AI", study: "01" },
  { value: 7, prefix: "", suffix: " / 10", label: "blind-eval wins for a rebuilt, grounded AI product", study: "02" },
  { value: 24, prefix: "< ", suffix: "h", label: "to theme a new client on a white-label platform, down from weeks", study: "03" },
  { value: 5, prefix: "9 → ", suffix: "", label: "enrollment steps, with \u201cwho's covered\u201d asked once", study: "04" },
  { value: 3.5, decimals: 1, prefix: "", suffix: "M", label: "residents' city services, organised by need instead of department", study: "05" },
];

export const principles = [
  {
    title: "Find the problem under the brief",
    body: "Every study here starts with a reframe. Asked to edit screens, I found a platform problem. Told a flow was too long, I found it asked questions in the wrong order.",
    refs: ["03", "04"],
  },
  {
    title: "Make the variable explicit",
    body: "Brands become tokens. Rules become code, not prompt requests. A design system becomes files an agent can read. What can change should be configurable, and nothing else should be.",
    refs: ["01", "02", "03"],
  },
  {
    title: "Design for the build reality",
    body: "A design that can't be built as specified is a wish. I design within the platform's constraints, and translate between the user's model and the system's instead of forcing either.",
    refs: ["04", "05"],
  },
  {
    title: "Settle trade-offs with evidence",
    body: "Quality versus speed is an eval, not a debate. And honest attribution (observed, not measured; directional, not isolated) is part of the result.",
    refs: ["02"],
  },
  {
    title: "Adoption is part of the design",
    body: "A system nobody uses is a file. Enablement, documentation, design QA and an agreement with engineering are design work too.",
    refs: ["01", "03"],
  },
];

export const capabilities = [
  {
    title: "Enterprise design systems",
    items: [
      "Three-tier token architecture and white-label theming",
      "120+ components across web, mobile web, iOS and Android",
      "Design QA, governance and adoption across engineering",
    ],
  },
  {
    title: "Component distribution",
    items: [
      "Figma variables and modes as the single source for five brands",
      "App shells and layout templates every screen starts from",
      "Documentation written into the system, not beside it",
    ],
  },
  {
    title: "AI-driven UI",
    items: [
      "Design systems rebuilt as machine-readable skill files",
      "Agent workflows with self-verification and drift audits",
      "Grounded generation, honesty guards and blind eval harnesses",
    ],
  },
  {
    title: "Regulated and bilingual UX",
    items: [
      "US health insurance: eligibility, enrollment, multi-tenant compliance",
      "Government services for a city of millions",
      "Arabic and English, right-to-left as a first-class discipline",
    ],
  },
];

export const timeline = [
  { period: "2025–now", role: "Founder", org: "Blinkwiser", detail: "AI products, designed and shipped by directing coding agents." },
  {
    period: "2021–now",
    role: "Founding UX Designer → UX Lead",
    org: "Mphasis · Javelina platform",
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
