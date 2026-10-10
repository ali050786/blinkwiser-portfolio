/*
 * The résumé, as data. Rendered at /resume and printed to the PDF in /public.
 * Wrap a phrase in **double asterisks** to set it in the strong color.
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
          role: "Founding UX Designer, now UX Lead",
          note: "Official title: Technical Delivery Lead",
          period: "2021 – Present",
          scope: "The platform's first designer · led **4 designers** (hired 2) · UX sign-off on client releases · **3 live clients**",
          bullets: [
            "**From 9 steps to 5.** Redesigned open enrollment so members say who's covered once, instead of again for every coverage, and it's live for all 3 clients. The new order didn't match the backend's data model, so I agreed a phased backend change with engineering.",
            "**Under a day to theme a new client** or sales demo, down from weeks, using three tiers of design tokens (insurer, employer, and member) behind a **120+ component** system for web, mobile web, iOS, and Android.",
            "**3 or 4 days from Jira story to engineering-ready screen**, down from 1 or 2 weeks, working with business analysts (team-observed), after I rewrote the design system as skill files that AI tools can follow. Self-initiated, used by my designers, and adopted by the wider org's UAT team.",
            "Set up how design runs on the platform: workshops with business analysts before design, UX validation on every build, a designer's review of every AI-generated screen, and an agreement with the tech lead that each component state is built once.",
          ],
        },
        {
          org: "Blinkwiser",
          role: "Independent AI product work",
          note: "Lab, alongside Mphasis",
          period: "Jul 2026 – Present",
          body: "**Carousel Builder**, live with users: turns a topic into a LinkedIn carousel, checks every figure against a source, and lets you undo any edit. Rebuilt in two months by directing AI coding agents. **Video Course Builder** in beta.",
        },
        {
          org: "Mphasis · Dubai Municipality",
          role: "Lead UX Designer, onsite in Dubai",
          period: "2020 – 2021",
          body: "Led the design of one app that replaced **nine separate Municipality apps**: the five-tab structure, the dashboard, and service groups built with stakeholders in a card sorting workshop. Arabic set up as a right-to-left template, all within the limits of a low-code platform. It launched while I was there.",
        },
        {
          org: "Mphasis · Jet Airways",
          role: "UX Designer, consumer apps",
          period: "2015 – 2019",
          body: "Web, iOS, Android, and Apple Watch apps on a shared component library, all in production until the airline closed in 2019.",
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
        { org: "AI-assisted delivery", body: "Design-to-code: Claude Code, GitHub Copilot in VS Code, Google Antigravity, Figma MCP · Agent frameworks: LangChain / LangGraph · Prototyping: Lovable" },
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
    tagline: "Regulated enterprise SaaS: health insurance, government, and AI",
    summary:
      "I've spent 11 years in UX. For the last five, I've been the founding designer and then UX lead on a white-label US health-insurance platform used by **insurers, employers, and members**, from its first screen to production. Before that, I brought nine Dubai Municipality apps into one, in Arabic and English, and designed Jet Airways' consumer apps. I also lead my team's use of **AI in design delivery**.",
    domain: undefined as string | undefined,
  },
  "health-tech": {
    ...shared,
    title: "Lead UX Designer · US Health Insurance",
    tagline: "Payers, employers & members",
    summary:
      "I've spent 11 years in UX. For the last five, I've been the founding designer and then UX lead on a white-label **US health-insurance** platform used by **payers, employers, and members**, from its first screen to production. Before that, I brought nine Dubai Municipality apps into one, in Arabic and English, and designed Jet Airways' consumer apps. I also lead my team's use of **AI in design delivery**, with no member data in the loop.",
    domain:
      "Open & passive enrollment · life-event coverage changes · eligibility rules · eligibility data files from employers · benefits administration · privacy-aware design (HIPAA) · accessibility (WCAG)" as string | undefined,
  },
};

export type ResumeVariant = keyof typeof resumeVariants;

/** Which version this build renders. The public site always builds "general". */
export const resumeVariant: ResumeVariant =
  process.env.RESUME_VARIANT === "health-tech" ? "health-tech" : "general";

export const resume = resumeVariants[resumeVariant];
