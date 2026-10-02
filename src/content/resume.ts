/*
 * The résumé, as data. Rendered at /resume and printed to the PDF in /public.
 * Wrap a phrase in **double asterisks** to set it in the strong colour.
 * Public-safe like the rest of the site: no client names on the platform work.
 * Two versions share every fact, title and date; only the top third differs:
 *   general      the public résumé (/resume and the PDF in /public)
 *   health-tech  sent directly for health-tech roles; built with
 *                RESUME_VARIANT=health-tech and kept in /resumes, not deployed
 * Order rule: domain → outcomes → leadership → AI. Every number here is defensible
 * in an interview; see _bmad-output/planning-artifacts/resume-brainstorm.md.
 */

export type ResumeEntry = {
  org: string;
  role?: string;
  /** A quiet line under the role, e.g. the official title */
  note?: string;
  period?: string;
  /** One scope line set above the body or bullets */
  scope?: string;
  body?: string;
  bullets?: string[];
};

export type ResumeSection = {
  label: string;
  entries: ResumeEntry[];
  /** Compact rows: org and body on one line, no role or period */
  compact?: boolean;
};

export const resumeFile = "/sikandar-ali-abdul-resume.pdf";

const shared = {
  name: "Sikandar Ali Abdul",
  links: [
    { label: "portfolio.blinkwiser.com", href: "https://portfolio.blinkwiser.com" },
    { label: "ali050786@gmail.com", href: "mailto:ali050786@gmail.com" },
    { label: "linkedin.com/in/sikandar-ux", href: "https://www.linkedin.com/in/sikandar-ux" },
    { label: "Pune, India", href: "" },
  ],
  sections: [
    {
      label: "Experience",
      entries: [
        {
          org: "Mphasis · White-label US health-insurance platform",
          role: "Founding UX Designer → UX Lead",
          note: "Official title: Technical Delivery Lead",
          period: "2021 – Present",
          scope: "The platform's first designer · led **4 designers** (hired 2) · UX sign-off on client releases · **3 live clients**",
          bullets: [
            "**9 → 5 steps.** Redesigned open enrollment so “who's covered” is asked once; in production for all 3 clients. When engineering pushed back, negotiated a phased backend change they owned instead of resisted.",
            "**Weeks → under 24h** to theme a new client or prospect demo: three-tier tokens (insurer → employer → member) across a **120+ component** system for web, mobile web, iOS and Android.",
            "**1–2 weeks → 3–4 days** Jira-story turnaround with BAs (observed), after I rebuilt the design system as AI-readable skill files. Self-initiated; rolled out to my designers, then the wider org; held back from BAs so UX thinking comes before screens.",
            "Instituted governance: BA workshops before design, design QA on builds, human review of every AI-generated screen, and a tech-lead agreement so each component state is built once, not per page.",
          ],
        },
        {
          org: "Blinkwiser",
          role: "Independent AI product work",
          note: "Lab, alongside Mphasis",
          period: "2025 – Present",
          body: "Where I test agentic UX patterns before they reach enterprise work. **Carousel Builder**, live with users: Plan → Execute → Reflect, rules enforced in code, every figure sourced, every edit reversible. **Video Course Builder** in beta.",
        },
        {
          org: "Mphasis · Dubai Municipality",
          role: "Lead UX Designer, onsite in Dubai",
          period: "2020 – 2021",
          body: "One home for a city's services for **3.5M residents**, organised by need instead of department. Arabic designed alongside English from the first wireframes; milestones signed off by senior officials.",
        },
        {
          org: "Mphasis · Jet Airways",
          role: "UX Designer, consumer apps",
          period: "2015 – 2019",
          body: "Web, iOS, Android and Apple Watch apps on a shared component library, all in production until the airline closed in 2019.",
        },
        {
          org: "IBN Al QYM · ITAD · Wahab Studio",
          role: "UX, UI & graphic design",
          period: "2007 – 2015",
          body: "Agency UI for client web platforms in Doha; earlier, web mockups, brand and print design."
        },
      ],
    },
    {
      label: "Skills",
      compact: true,
      entries: [
        { org: "Design", body: "Design systems & tokens, AI-readable design systems, white-label theming, information architecture, interaction design, usability testing, bilingual / RTL" },
        { org: "AI-assisted delivery", body: "Design-to-code: Claude Code, Figma MCP · Agent frameworks: LangChain / LangGraph · Prototyping: Lovable" },
        { org: "Design tools", body: "Figma, FigJam, Storybook, Zeplin, Maze, Miro, Adobe XD" },
        { org: "Technical", body: "React / Next.js, TypeScript, HTML / CSS, design tokens" },
      ],
    },
    {
      label: "Education",
      compact: true,
      entries: [
        { org: "IIT Roorkee", body: "**PG Certificate, Forward Deployed AI Engineering** · 2026, in progress" },
        { org: "Mahatma Gandhi University", body: "**Bachelor of Business Administration** · Meghalaya, 2011 – 2013" },
        { org: "DeepLearning.AI", body: "Agentic AI · AI Agents in LangGraph" },
      ],
    },
  ] as ResumeSection[],
};

export const resumeVariants = {
  general: {
    ...shared,
    title: "Lead UX Designer",
    tagline: "Complex, regulated, multi-audience platforms",
    summary:
      "Five years as founding designer, then UX lead, on a white-label enterprise platform serving three audiences (**insurers, employers and members**) in US health insurance, from its first screen to production. Before that, a bilingual civic services platform in Dubai and an airline's consumer apps. Now bringing **AI-assisted delivery** into enterprise UX.",
    domain: undefined as string | undefined,
  },
  "health-tech": {
    ...shared,
    title: "Lead UX Designer · US Health Insurance",
    tagline: "Payers, employers & members",
    summary:
      "Five years as founding designer, then UX lead, on a white-label **US health-insurance** platform, designing for **payers, employers and members** from its first screen to production. Before that, a bilingual civic services platform in Dubai and an airline's consumer apps. Now bringing **AI-assisted delivery** into enterprise UX, with no member data in the loop.",
    domain:
      "Open & passive enrollment · life-event coverage changes (QLEs) · eligibility rules · eligibility data files from employers (EDI 834) · benefits administration · privacy-aware design (HIPAA) · accessibility (WCAG)" as string | undefined,
  },
};

export type ResumeVariant = keyof typeof resumeVariants;

/** Which version this build renders. The public site always builds "general". */
export const resumeVariant: ResumeVariant =
  process.env.RESUME_VARIANT === "health-tech" ? "health-tech" : "general";

export const resume = resumeVariants[resumeVariant];
