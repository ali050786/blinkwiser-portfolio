import type { CaseStudy } from "./types";

/*
 * Source of truth: sentry/02-career/portfolio-enhancement/*.md (as of 2026-09-24).
 * Public-safe rules applied from case-study-framework.md:
 *  - clients anonymised (no client or client-product names)
 *  - employer named once per study, as attribution only
 *  - no internal codenames, file keys or repo names
 *  - metrics are team-observed and labelled as such
 *  - every visual is a demo brand or a redrawn diagram, never a client screen;
 *    client product screens are rebuilt in HTML from the design files
 *    (screens.ts). Real captures are used only for my own product (Blinkwiser)
 *    and for the publicly published Dubai Municipality app.
 */

export const caseStudies: CaseStudy[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: "open-enrollment",
    index: "01",
    accent: "enrollment",
    glyph: "flow",
    group: "Health insurance platforms",
    title: "Enrollment: redesigning the decision, not the screens",
    short: "Enrollment",
    dek: "The flow asked questions in the order the backend stores them. I reordered them to match how a family actually decides.",
    meta: {
      role: "UX Lead",
      context: "Mphasis · US health-insurance platform",
      timeline: "Live in production",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["US health insurance", "Decision modelling", "Defaults", "Regulated flows"],
    cover: {
      screen: "new-plan",
      alt: "Redesigned enrollment screen: Select a Plan for Medical, with the family's coverage already filled in, plans priced per month and a running total premium in the header.",
      caption: "The redesign, live in production: who's covered is already known when plans are chosen, and cost is per month on every step.",
    },
    headline: { value: "9 → 5", label: "steps, with one question asked once" },
    opener: {
      scope: "One flow, three enrollment modules: Open Enrollment, Life Event and New Hire.",
      note: "Dennis is a design persona, and these are illustrations, not the shipped screens. Counts come from walking the old and new flows; prices are demo values, not client data.",
      stories: [
        {
          id: "newborn",
          tab: "New baby",
          story: "Dennis just had a baby. He has 31 days to get her covered.",
          quote: "Adding a dependent does not automatically enroll them in coverage.",
          quoteSource: "The old flow, right after he added her",
          visual: "newborn",
          caption: "The old flow made adding a person and covering her two separate jobs, one trip per coverage. The redesign does both in the same row."
        },
        {
          id: "plan-switch",
          tab: "Cheaper plan",
          story: "Dennis switches to a cheaper dental plan. The old flow forgets his family.",
          quote: "Select Member(s)/Dependent(s) to cover",
          quoteSource: "The old plan page, asking again after he changed plans",
          visual: "plan-switch",
          caption: "The old flow tied the family to the plan, so a new plan meant a new family list. The redesign ties the family to Dennis.",
        },
        {
          id: "cost",
          tab: "Seeing the cost",
          story: "Dennis is covering six people. What will it cost him each month?",
          quote: "The displayed Premium is only an estimate. The amount may vary if you change network or update Dependents.",
          quoteSource: "The old plan page, word for word",
          visual: "cost",
          caption: "Each coverage is picked on its own screen. The old flow never added them up, so Dennis committed without a total. The redesign carries a cart-style monthly total across every screen.",
        },
      ],
    },
    hero: {
      label: "Regulated decision flow",
      brief: "The enrollment flow is too long.",
      problem: "It asked questions in the order the backend stores them.",
      call: "Reorder the questions to match how a family actually decides.",
    },
    snapshot: {
      frame:
        "Clients said the enrollment flow was too long. Length was the symptom: the flow was the data model rendered as UI, so members answered “who's covered” again inside every coverage.",
      decision:
        "Reorder the questions to the member's model (my family → who needs what → which plan) and ask “who needs what” once, as a single family-by-coverage grid.",
      outcome:
        "9 steps became 5, the per-coverage loop disappeared, cost is visible at every step, and the flow is live for open enrollment, life events and new hires.",
    },
    frame: {
      assumed: "The flow is too long. Trim screens.",
      actual: "The flow asks questions in the backend's order. Change the order of the questions.",
      body: [
        "Feedback from clients and BAs came in four parts: the flow was too long, members were confused about dependents, cost was unclear until late, and admins struggled when enrolling members on their behalf.",
        "The obvious fix was to trim screens. I looked at why there were so many first. Cutting screens would have shortened the loop without removing it.",
      ],
      evidence: {
        title: "The data model, rendered as UI",
        items: [
          "Three screens to manage the household: list, add, updated list.",
          "A hub-and-spoke loop per coverage: pick Medical, browse plans, pick one, then choose who it covers, return to the hub, repeat for Dental and Vision.",
          "So “who's covered” was answered twice: once for the household and once inside every coverage.",
          "The premium was an annual estimate that could still move when dependents or the network changed.",
        ],
      },
      exhibit: "flow-compare",
    },
    stakes: {
      intro: "Open enrollment is a once-a-year window; a life event like a birth gives 31 days. Either way there is a deadline, and the choices lock for the year.",
      items: [
        { title: "Missed family members", body: "Someone missed on one coverage stays uncovered until the next window or a qualifying life event." },
        { title: "Late cost", body: "A cost that only becomes clear at the end means members commit before they understand what they'll pay." },
        { title: "Admins repeat every flaw", body: "Every weakness in the member flow repeats for admins enrolling on members' behalf, across every client." },
      ],
      exhibit: "coverage-gap",
    },
    forks: [
      {
        id: "reorder",
        title: "Trim the screens, or change the order of the questions?",
        tension: "Trimming was faster and would have answered “too long” on paper.",
        rejected: { label: "Trim screens", detail: "Keeps the loop and the duplicated dependent question." },
        chosen: { label: "Reorder the decision", detail: "My family → who needs what → which plan." },
        why: [
          "“Who needs what” is now asked once, as a grid of family members against coverage types, and plan selection follows from that grid instead of re-asking it per coverage.",
        ],
        cost: "It no longer matched how the backend stored enrollments. That became the third fork.",
        exhibit: "trim-vs-reorder",
      },
      {
        id: "defaults",
        title: "What should the common case cost?",
        tension: "Once the grid exists, most of the work is choosing plans.",
        rejected: { label: "Ask everything, every time", detail: "Equal weight for common and rare paths." },
        chosen: { label: "Design the defaults", detail: "Shared family plan by default; per-member plans as a clear escape hatch." },
        why: [
          "Keeping the current plan is the default path, and waiving coverage is a visible option, not a hidden one.",
          "The bet: the common path should be the shortest one, while the less common path stays one clear step away.",
        ],
        cost: "Defaults carry weight in a regulated flow, so every one had to stay visible and reversible.",
        exhibit: "coverage-grid",
      },
      {
        id: "engineering",
        title: "Force the data model on members, or a rewrite on engineering?",
        tension:
          "Engineering pushed back, and fairly: their model is coverage → plan → members, and I was asking them to take answers in reverse order.",
        rejected: { label: "Either extreme", detail: "Ship the backend's order to members, or demand a backend rewrite." },
        chosen: { label: "Translate, then phase", detail: "The UI collects the grid and translates it; the backend changes only where translation isn't enough." },
        why: [
          "I walked engineering through the member's decision order against the specific client complaints. We split the work and shipped in phases rather than one cut-over.",
        ],
        cost: "A slower rollout, in exchange for a change engineering owned rather than resisted.",
        exhibit: "translate-layer",
      },
    ],
    followOn: {
      title: "What followed from the new order",
      intro: "Also my calls, each made possible by asking the questions in the right sequence.",
      items: [
        {
          title: "Cost where the decision is made",
          body: "A running total premium on every step, shown per month or per pay deduction instead of an annual estimate at the end.",
        },
        {
          title: "One review, not scattered confirmations",
          body: "A single page to check everything before a year-long commitment: what changed, fix in place, disclaimer and e-signature in the same step.",
        },
        {
          title: "Ask only when needed",
          body: "Document upload used to be a fixed step. It now appears only when a member's situation requires a document.",
        },
      ],
      exhibit: "ask-when-needed",
    },
    spotlight: {
      label: "The admin side",
      title: "Passive enrollment: the members who never open the flow",
      intro:
        "The redesign made enrollment easier for members who take part. Every year some members don't take part at all, and something still has to happen to their coverage. Each client decides what.",
      why: [
        "Members who took no action during open enrollment were handled manually by admins, one member at a time.",
        "Each client has its own rule for them: terminate, carry the current plan forward, or move them to a default plan, sometimes depending on eligibility.",
        "It all lands at the deadline of a once-a-year window, where a missed member stays uncovered until the next window or a qualifying life event.",
      ],
      what: [
        "A Passive Enrollment tab in each client's enrollment settings: four rules in plain language, each showing only the options it needs.",
        "Termination status and reason, an exclusion for members with supplemental products, and a default-plan mapping file with a downloadable template.",
        "Save, or save and run now. Before a run the admin sees the rule, the file and the number of members affected, with a plain warning that it cannot be undone; settings lock while a run is in progress.",
        "A log of every run, and a report that separates processed members from the ones needing review, each with a reason and Enroll or Terminate in the row.",
        "The business owned the rules. I designed how admins set them, run them and handle what they can't decide.",
      ],
      impact: [
        "A manual, member-by-member job became a rule each client's admin sets once and runs themselves.",
        "Every run leaves a record: who ran it, when, with which rule and file, and how many members it touched.",
        "Members a rule can't handle are no longer lost in the batch. They come back with a reason and are resolved in place.",
      ],
      provenance: "Qualitative. Effort before and after was not measured.",
      lead: "passive-funnel",
      exhibit: "passive-screens",
    },
    outcome: {
      metrics: [
        {
          value: "9 → 5",
          label: "Steps: Welcome, Profile, Dependents, Coverage, Review",
          before: { label: "9 steps", amount: 9 },
          after: { label: "5 steps", amount: 5 },
          unit: "steps",
          visual: "glyph-flow",
        },
        { value: "1×", label: "“Who's covered” asked once, not once per coverage", visual: "asked-once" },
        { value: "Every step", label: "Cost visible, in the unit people pay", visual: "cost-every-step" },
        { value: "4 flows", label: "One skeleton for open enrollment, life events, new hires, admin-on-behalf", visual: "four-flows" },
      ],
      points: [
        "Live in production. The complaints that triggered the redesign have dropped, and admins enrolling on behalf get through it faster.",
      ],
      provenance: "Early signals are observed, not formally measured yet.",
      exhibit: "enrollment-screens",
    },
    ownership: {
      mine: [
        "The reframe, the new question order, the family-plan default, the running monthly total and the single editable review.",
      ],
      shared: [
        "Reusing one skeleton across enrollment types and actors, decided with product and engineering. I also designed the admin screens for passive enrollment; the business owned the rules behind it.",
      ],
      change: [
        "I'd get evidence in earlier. The redesign rested on client and BA feedback plus analysis of the flow, not observed member behaviour. I'd also instrument the old flow first, so the improvement could be measured, not just described.",
      ],
    },
    signals:
      "Redesigning the decision model instead of the UI, aligning engineering to the user's mental model without forcing a rewrite, and designing defaults deliberately.",
  },
  /* ------------------------------------------------------------------ 02 */
  {
    slug: "enterprise-platform-from-zero",
    index: "02",
    accent: "platform",
    glyph: "tiers",
    group: "Health insurance platforms",
    title: "Building an enterprise health-insurance platform from zero",
    short: "White-label platform",
    dek: "I was brought in to adjust a handful of screens. Underneath was a white-label product with no system, hardcoded colours and every new client rebuilt by hand.",
    meta: {
      role: "Founding UX Designer → UX Lead",
      context: "Mphasis · US health-insurance platform",
      timeline: "2021–present",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["US health insurance", "Three-tier tokens", "White-label", "Design system adoption"],
    cover: {
      screen: "ds-dashboard",
      alt: "Member dashboard page pattern from the design system: coverage status by family member, claims status, resources and find care.",
      caption: "A member dashboard page pattern, assembled from the library. Every client sees it in its own brand.",
    },
    headline: { value: "< 24 h", label: "to theme a new client, from weeks" },
    card: { title: "White-label health-insurance platform", widget: "brands", label: "to theme a new client" },
    hero: {
      label: "Enterprise platform",
      brief: "Adjust a handful of screens.",
      problem: "A white-label product with no system, rebuilt by hand for every client.",
      call: "Make the brand a variable, then make engineering build to it.",
    },
    snapshot: {
      frame:
        "The ask was a few screen edits. The real problem was a white-label product with no system, developers improvising components, and every new client rebuilt by hand.",
      decision:
        "Treat the handoff problem as a platform problem: make the brand a variable through a three-tier token system, then make engineering actually use it.",
      outcome:
        "New-client theming went from weeks of rebuild to under 24 hours, delivery settled at about 2 days of design plus 3 of build, and the system became engineering's default.",
    },
    frame: {
      assumed: "Change a few screens to match new requirements.",
      actual:
        "A white-label platform that engineering couldn't maintain, where every client multiplied the cost of every change.",
      body: [
        "The screens had been designed by someone else, and there was no design system behind them. Two things didn't fit the ask.",
        "It was a white-label platform, sold to insurers who resell it to employers, who put it in front of their members, so every client needed its own look at every level. And developers were already struggling to maintain what existed. Editing screens one by one would have kept the product exactly as fragile as it was.",
        "So I didn't treat the ask as a set of edits. I started by documenting what already existed, and that documentation became the design system.",
      ],
    },
    stakes: {
      intro: "The product was failing in three concrete ways.",
      items: [
        { title: "Inconsistency", body: "Developers used different components for the same job on different pages." },
        { title: "Hardcoded colours", body: "Brand colours were written straight into the code, so nothing could be re-themed." },
        {
          title: "Rebuild per client",
          body: "A growth ceiling: the business could only sign clients as fast as engineering could re-skin the product.",
        },
        {
          title: "Compliance exposure",
          body: "In US health insurance, an inconsistent eligibility or enrolment screen is a compliance risk, not a polish issue.",
        },
      ],
    },
    forks: [
      {
        id: "go-underneath",
        title: "Fix the screens, or fix what made them break?",
        tension: "The requested edits were the expected move and the visible one.",
        rejected: { label: "Do the edits", detail: "Every future change stays hand-made; every new client stays a rebuild." },
        chosen: { label: "Go underneath", detail: "Start with documentation, and let it become the system." },
        why: [
          "The deciding factor was that the pain belonged to engineering, not design. The system had a real customer before it had a name.",
        ],
        cost: "Investing in a foundation nobody had asked for, which had to prove its value before anyone would call it one.",
      },
      {
        id: "brand-as-variable",
        title: "Per-client builds, or make the brand a variable?",
        tension: "Each client needed its own identity at three levels. Per-client builds would have reproduced the mess at scale.",
        rejected: { label: "Per-client builds", detail: "A fork of the product's look for every insurer and employer." },
        chosen: {
          label: "Three-tier tokens",
          detail: "Insurer → employer → member. Each tier inherits from the one above and overrides only what it owns.",
        },
        why: [
          "A new client becomes a configuration, not a project.",
          "The same foundation runs web, mobile web, iOS and Android, so mobile never became a second theming system to keep in sync by hand.",
        ],
        cost: "Discipline: nothing can be styled directly any more. That is precisely the habit engineering had to break.",
        exhibit: "theme-cascade",
      },
      {
        id: "adoption",
        title: "Is a design system nobody uses just a Figma file?",
        tension:
          "Building the system didn't change behaviour. It lived in a separate file developers had to remember to open, and at first they carried on as before.",
        rejected: { label: "Specs and good intentions", detail: "How the product had become inconsistent in the first place." },
        chosen: { label: "Treat adoption as design", detail: "Work it from four sides until the system is the default." },
        why: ["Adoption took a few months, worked from four sides:"],
        bullets: [
          { title: "Enablement", body: "Walkthrough sessions with the development team." },
          { title: "Documentation", body: "Usage rules for each component, written into the system itself." },
          { title: "Quality", body: "Design QA on builds, catching hardcoded values and off-system components before release." },
          { title: "Policy", body: "An agreement with the tech lead that the design system is the standard engineering builds to." },
        ],
        cost: "Months of enablement and QA effort before the system paid back.",
      },
    ],
    followOn: {
      title: "How the work ran",
      intro: "Research, alignment and the team, the parts of the job that sit around the screens.",
      items: [
        {
          title: "Personas for three audiences",
          body: "Research with internal stakeholders produced personas for each audience the platform serves: insurers, employers and members, three to four of each.",
        },
        {
          title: "Workshops before ideas reach design",
          body: "Any new idea went through a working session with the business analysts first, so the requirement and the rules behind it were agreed before anything was drawn.",
        },
        {
          title: "Architecture changes, with engineering",
          body: "Any architectural change to the design system was worked through with engineering in a workshop before it shipped, so the system and the codebase changed together.",
        },
      ],
    },
    spotlight: {
      label: "Built on the token system",
      title: "The Branding Hub: the brand variable, in an admin's hands",
      intro:
        "The three-tier tokens made the brand a variable in the product. The Branding Hub is the screen that sets it. I designed it, and it is live for admins.",
      why: [
        "The platform is resold to employers, and each one needs the member portal in its own look.",
        "Tokens make theming possible. Someone still has to set them, for many employers, without breaking what members see.",
        "Several admins work on themes at once, so changes need drafts, a clear owner and a way back.",
      ],
      what: [
        "A hub of every member-facing theme: its colours, how many employers use it, who edited it last, and default, draft and locked states.",
        "A theme editor that uses the same roles as the design tokens, with each colour field saying where it appears, plus the font.",
        "A preview on the member dashboard before publishing, and employer assignment with each employer's own logo, links, contacts and resources.",
        "Safeguards: save as draft, an edit lock that shows who is editing, change history, and restore for deleted themes.",
      ],
      impact: [
        "Shipped and in use by admins.",
        "Theming a client is an admin task in one place, built on the token roles, so every theme stays inside the system.",
        "Colours are chosen by role and checked on a real dashboard before members see them.",
        "Admins can work on themes side by side without overwriting each other, and a deleted theme can be brought back.",
      ],
      provenance: "Qualitative. Shipped; usage not formally measured.",
      exhibit: "branding-screens",
    },
    outcome: {
      metrics: [
        {
          value: "< 24 h",
          label: "New-client theming",
          before: { label: "Weeks", amount: 15 },
          after: { label: "< 1 day", amount: 1 },
          unit: "working days",
        },
        { value: "1–2 days", label: "To rebrand white-label iOS and Android apps" },
        { value: "2 + 3", label: "Days of design + build per feature, predictably" },
        { value: "120+", label: "Components across four surfaces" },
      ],
      points: [
        "Consistency held: hardcoded colours and off-system components are caught in design QA before release, not in production.",
        "The system serves a set of Fortune-500 and enterprise-tier insurers.",
      ],
      provenance: "Team-observed figures, not formally tracked.",
      exhibit: "design-system-screens",
    },
    ownership: {
      mine: [
        "The reframe, the architecture and the adoption plan. I started as the only designer, interviewed and selected four more, onboarded them onto the system and its standards, and was promoted to UX Lead.",
      ],
      change: [
        "I'd close the distance between the system and the people using it much earlier. Its rationale lived in my head, and the system lived in a separate file engineers had to go and check. Closing that gap is what I later did by making it machine-readable (case study 03).",
      ],
    },
    signals:
      "Problem-finding over brief-following, platform architecture with honest costs, and the part most design-system stories skip: driving adoption across engineering.",
  },
  /* ------------------------------------------------------------------ 03 */
  {
    slug: "ai-readable-design-system",
    index: "03",
    accent: "automation",
    glyph: "skills",
    group: "AI-driven UI",
    title: "AI-readable design system: writing down the rules nobody wrote",
    short: "AI-readable design system",
    dek: "The AI wasn't the variable I could change. The design system was. So I rebuilt it as a library of skill files an agent reads to turn a Jira story into a brand-compliant, self-verified screen.",
    meta: {
      role: "UX Lead",
      context: "Mphasis · US health-insurance platform",
      timeline: "Built Aug–Sep 2026",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["Agentic design workflow", "Design systems", "Figma variables", "MCP"],
    headline: { value: "3–4 days", label: "Jira-story turnaround, down from 1–2 weeks" },
    card: { title: "A design system that builds itself", widget: "pipeline", label: "Jira-story turnaround" },
    opener: {
      label: "Three things the AI got wrong",
      scope: "A six-year-old design system, five client brands and three platforms, rewritten as files an AI reads before it designs.",
      lead: "We gave the AI our real design system. Four or five screens came back looking like someone else's product, and each was drawn again by hand. I went looking for why.",
      turn: {
        quote: "It cannot automatically give the design to us.",
        source: "My senior, after the first screen (as I remember it)",
        after: "That was the expected verdict: wait for better AI, or keep drawing by hand. These three findings are why I rewrote the system instead.",
      },
      note: "These are illustrations with generic names, not client screens or real token names. The rule, the note and the 19 vs 20 are quoted from the skill files; the old screen is rebuilt from memory, and four or five is a team recollection, not a count.",
      stories: [
        {
          id: "save-side",
          tab: "The button",
          story: "The first one put Save on the left. Every designer here puts it on the right.",
          quoteEmpty: { field: "Button · Description" },
          quoteSource: "The old button's description: Figma had no such field six years ago (as I remember it)",
          visual: "save-side",
          caption: "The AI had our real components and still got it wrong, because the habit lived in our heads. The fix was one line in a skill file the AI reads before every screen.",
        },
        {
          id: "link-colour",
          tab: "The colour",
          story: "Our links have one colour. The AI picked another.",
          quote: "Not an exact match, but agreed mapping.",
          quoteSource: "The rebuilt system's own note, mapping an old colour that never had a job",
          visual: "link-colour",
          caption: "Nothing said which colour a link takes. The old colours were named for how they look, so any of them could be a link. The skills name each colour for its job, so the AI no longer guesses.",
        },
        {
          id: "audit",
          tab: "The audit",
          story: "Even with the rules written down, the docs said 19 components. The file had 20.",
          quote: "19 standalone components",
          quoteSource: "The system's own index, before the audit run on 4 Sep 2026",
          visual: "audit",
          caption: "An audit skill caught the gap in one run. Six years of patches with nobody checking is how the old system drifted. Now the audit compares the docs with the file every session, so the AI never reads a stale rule.",
        },
      ],
    },
    hero: {
      label: "AI-driven design system",
      brief: "The AI isn't good enough yet. Prompt harder.",
      problem: "A six-year-old design system was illegible to a machine.",
      call: "Rebuild it as skill files an agent can read and verify against.",
    },
    snapshot: {
      frame:
        "AI kept producing screens that didn't look like our product. The problem wasn't the AI: a six-year-old design system was illegible to a machine, built for humans and largely living in designers' heads.",
      decision:
        "Unprompted, rebuild the design system as an AI-readable knowledge base: interlocking skill files for tokens, themes, components, layout, app shells, a build workflow, a self-audit and a memory.",
      outcome:
        "New-client mockups went from about 2 days to 3–4 hours, Jira-story turnaround from 1–2 weeks to 3–4 days, and the wider org chose to adopt the process.",
    },
    frame: {
      assumed: "The AI isn't good enough yet. Prompt harder, wait for better models, or add designers.",
      actual:
        "The design system was built for humans and never written down for a machine. The AI had nothing to reason with.",
      body: [
        "Two loops were slow. Demos to prospective insurers took days, and the BA-to-developer loop stalled because developers reason from screens, not written requirements, so feasibility couldn't be confirmed until someone mocked it up. I was already bringing AI into the design workflow to attack both, and the org was keen on AI too. But the output wasn't usable.",
        "We had a design system in Figma, but no descriptions: it was built six years ago, before Figma had a field for them, and patched piecemeal ever since. The rules lived in designers' heads. Components alone weren't enough. Making the system AI-legible meant externalising that tacit knowledge: colour and typography semantics, grid, layout, components and composition.",
        "Nobody had done this on a veteran six-year project. I looked for a process and found none that worked, so I built one.",
      ],
      evidence: {
        title: "How the AI failed",
        items: [
          "Different colours for different components, because nothing said which colour a link or a button should take.",
          "A different grid on every screen, because the grid was never documented.",
          "Screens that still didn't feel like our app, even when it pulled the right components.",
        ],
      },
    },
    stakes: {
      intro: "Fast, on-brand screens sat on the critical path for two audiences at once.",
      items: [
        {
          title: "BAs and developers",
          body: "Quick mockups to confirm feasibility before committing engineering, because developers reason from screens, not specs.",
        },
        {
          title: "Sales and marketing",
          body: "Branded demo screens for prospective clients. Slow turnaround meant demos slipped in a live sales cycle.",
        },
        {
          title: "Senior design time",
          body: "Every slow mockup pulled senior designers off product work. The manual approach didn't scale with the pipeline.",
        },
      ],
    },
    forks: [
      {
        id: "fix-the-system",
        title: "Fix the AI, or fix the system it reads?",
        tension:
          "The expected responses were to wait for better AI, prompt harder, or add designers. Nobody asked me to re-architect anything.",
        rejected: { label: "Tune the prompts", detail: "Keep the system as it is and coax better output from the model." },
        chosen: { label: "Make the system legible", detail: "Rewrite the design system so a machine can reason with it." },
        why: [
          "I'd been following how skills and agent-readable docs were emerging, and connected that to what I was watching fail. The AI wasn't the variable I could change. The system was.",
          "No one assigned it. I saw it, and I owned it.",
        ],
        cost: "Weeks of unrequested work on a foundation that had to prove itself before anyone would call it one.",
      },
      {
        id: "skill-files",
        title: "What does a design system look like when its reader is an agent?",
        tension:
          "A variable count or a component library isn't something an agent can reason with. It needs rules: which token for a link, which type style for a caption, which grid for a page.",
        rejected: { label: "Richer Figma descriptions", detail: "Annotate the existing file and hope the agent infers the rest." },
        chosen: {
          label: "Interlocking skill files",
          detail: "A configuration-driven, multi-brand system written as plain-markdown skills, fed atomically from tokens up.",
        },
        why: [
          "One system themes into five client brands by mode and is built to add more. Each skill holds a rule an agent needs: semantic colour, typography by intended use, a documented 12-column grid, 43 brand-agnostic component sets, 3 density modes and 141 described variables.",
          "Fed bottom-up, tokens first and then components that already know their tokens, so the system stays self-consistent as it grows.",
        ],
        cost: "More upfront structuring work than annotating what already existed.",
        exhibit: "skill-graph",
      },
      {
        id: "structural-correctness",
        title: "When tokens and components still aren't enough, what makes output correct?",
        tension:
          "With tokens, grid and components documented, the AI still failed in ways that only show up on a real, ever-growing system.",
        rejected: { label: "Accept good-looking output", detail: "Screens that pass a glance but are disconnected from the system." },
        chosen: { label: "Enforce structure", detail: "Shells, a build workflow with self-verification, and instances instead of redraws." },
        why: ["Three fixes mattered most:"],
        bullets: [
          {
            title: "Composition",
            body: "App shells and layout templates, plus a build-screen workflow that classifies the page, duplicates the right shell, uses only sanctioned components and runs a self-verification checklist.",
          },
          {
            title: "An ever-growing system",
            body: "The skills carry the judgment, not just the catalogue: when to reuse a component, when to add a variant, and when something is genuinely new.",
          },
          {
            title: "Instances, not redraws",
            body: "Left alone, an agent recreates elements from scratch. It looks right but it's dead. Every element is now placed as an instance of its source component, which cuts token cost and keeps the file traceable.",
          },
        ],
        cost: "Slower first runs in exchange for output that actually met the bar.",
        exhibit: "build-screen",
      },
      {
        id: "portable",
        title: "Build for today's tool, or for the day it starts charging?",
        tension:
          "Figma's new agent was free in beta and fast to build on. AI is never free for long, and beta pricing ends.",
        rejected: { label: "Go all-in on one vendor", detail: "Encode the system in a format only one agent can read." },
        chosen: { label: "Portable and self-maintaining", detail: "Plain markdown, MCP-drivable, with drift checks and memory built in." },
        why: [
          "Anti-drift: an audit skill diffs the live file against the docs, and a memory skill carries decisions across sessions, so the system doesn't rot the way the original did.",
          "Anti-lock-in: the skills run on Figma's agent today and can move to Claude Code or any agent through a Figma MCP when that makes more sense.",
        ],
        cost: "Maintaining governance (versioned backups, a guide page) that a single-vendor setup would have hidden.",
      },
    ],
    outcome: {
      metrics: [
        {
          value: "3–4 h",
          label: "New-client and demo mockups",
          before: { label: "~2 days", amount: 16 },
          after: { label: "3–4 hours", amount: 3.5 },
          unit: "working hours",
        },
        {
          value: "3–4 days",
          label: "Jira-story turnaround with BAs",
          before: { label: "1–2 weeks", amount: 7.5 },
          after: { label: "3–4 days", amount: 3.5 },
          unit: "working days",
        },
        { value: "~40%", label: "Less design production time overall" },
        { value: "5 · 3", label: "Client brands and platforms covered" },
      ],
      points: [
        "Adoption is the hardest proof: all four designers on my team run on it, and the org's wider UAT team chose the process for their own projects. I didn't have to sell it.",
        "Designers do the UX, not the busywork. The machine makes the screen; the designer makes the call. Freed hours go to research, flows and edge cases.",
        "Built in about 4–5 weeks across five brands and three platforms (admin centre, member portal, mobile app). With the method known, I could do it again in 1–2.",
      ],
      provenance:
        "Lived-experience figures, recognised by managers, BAs and senior leadership. Not yet formalised in sprint metrics, because the work is recent.",
    },
    ownership: {
      mine: [
        "Entirely self-initiated. I worked hit-and-try: build something, prove it works, then bring the team in. It spread from me, to my four designers, to the wider org.",
        "Where I drew the line: I haven't handed it to BAs yet. They could mock screens with it, but they'd likely skip the UX thinking first. Democratising it further is a process risk I'm managing on purpose.",
      ],
      change: [
        "I'd baseline before-and-after tracking from day one, so the 40% and the day-to-hour gains are measured and reportable, not just widely acknowledged.",
      ],
    },
    signals:
      "A design system alone won't drive an AI. You have to teach it your rules, and every time it repeats a mistake, turn the fix into a skill.",
  },
  /* ------------------------------------------------------------------ 04 */
  {
    slug: "designing-trust-into-ai",
    index: "04",
    accent: "blinkwiser",
    glyph: "pipeline",
    group: "AI-driven UI",
    title: "Blinkwiser: designing trust into an AI product",
    short: "Trust in an AI product",
    dek: "Getting an AI to produce a plausible LinkedIn carousel took two weeks. Getting one a creator could trust took the rest of the year.",
    meta: {
      role: "Independent lab · product, UX, architecture, evaluation",
      context: "Blinkwiser · built by directing AI coding agents",
      timeline: "Dec 2025–present",
      domain: "AI SaaS · creator tools",
    },
    tags: ["Agent pipeline", "Grounding", "Eval harness", "AI UX"],
    cover: {
      src: "/work/blinkwiser/landing.webp",
      width: 1600,
      height: 1090,
      alt: "Agentic Carousel by Blinkwiser landing page: 'Carousels that design themselves', a prompt box, and a fan of generated slides in three styles.",
      caption: "Agentic Carousel by Blinkwiser, live: a crew of agents researches, writes and designs a LinkedIn carousel from a topic, link, video or file.",
    },
    reel: {
      video: "/work/blinkwiser/run.mp4",
      poster: "/work/blinkwiser/run-poster.webp",
      width: 1600,
      height: 800,
      alt: "Screen recording of the studio generating a carousel: each agent step reports in the chat, then the first slides land, marked Draft while the editor is still checking.",
      caption: "One run, sped up 3×: every agent step reports in the chat, and the first slides land marked Draft while the editor is still checking.",
    },
    headline: { value: "Every edit", label: "undoable, and honest about what changed" },
    card: { title: "Blinkwiser AI carousels", widget: "slides", value: "Plan → Reflect", label: "facts checked before you see it" },
    hero: {
      label: "AI product · founder",
      brief: "Turn a topic into a LinkedIn carousel, fast.",
      problem: "Creators couldn't trust what the AI wrote, or what it said it changed.",
      call: "Treat trust as the product: facts checked in code, every edit reversible.",
    },
    snapshot: {
      frame:
        "The model invented numbers, claimed edits it hadn't made, kept people waiting and made everything look like generic AI. The real problem wasn't generation. It was trust.",
      decision:
        "Treat trust as the product: enforce rules and facts in code, make every change honest and reversible, settle quality-versus-speed with blind evals, and cut features that dilute the design.",
      outcome:
        "Creators can see what the agents did and get back from any of it: numbers trace to sources, the chat says what actually changed, and every edit has a restore point. Blind tests back it up: the rebuild beats the first version 7 times in 10. Live, free and pre-revenue.",
    },
    frame: {
      assumed: "Turn a topic into a carousel, fast. Generation is the product.",
      actual:
        "For someone posting under their own name, trust is the product: is it accurate, did it do what it said, can I get back, and does it look like me?",
      body: [
        "The brief was my own. A first version with templates, a two-agent pipeline and PDF export was in beta within two weeks. That was the easy part. The hard part showed up in use.",
        "A wrong statistic is a reputational cost for a creator, and a tool that lies about its own edits can't be trusted with anything.",
      ],
      evidence: {
        title: "What broke in use",
        items: [
          "The model invented numbers and stated them with confidence.",
          "In chat it said “I've rewritten the carousel” when nothing had changed.",
          "A richer pipeline meant longer waits.",
          "The output drifted toward generic AI instead of a designed piece.",
        ],
      },
    },
    stakes: {
      items: [
        { title: "Creators publish under their own name", body: "Accuracy isn't a nice-to-have." },
        { title: "An AI editor lives or dies on honesty", body: "If the chat misreports what changed, people stop believing it." },
        { title: "Speed shapes whether people stay", body: "Every extra quality step adds time." },
        { title: "Solo and bootstrapped", body: "Cost per deck matters as much as quality." },
      ],
    },
    forks: [
      {
        id: "enforce-in-code",
        title: "Ask the model nicely, or enforce the rules in code?",
        tension:
          "v1 relied on prompts. Character limits, slide counts and “don't make things up” were requests the model could ignore.",
        rejected: { label: "Better prompts", detail: "Keep asking, and hope the model complies more often." },
        chosen: { label: "A checked pipeline", detail: "Anything that must be true is verified in code before a slide ships." },
        why: [
          "Research becomes a numbered fact sheet with sources. An outline fixes the slide count and assigns facts to slides. Four cover options compete on a rubric that code scores.",
          "Every number in the copy must trace back to the fact sheet, the user's source or their request, or its slide is downgraded. A critic and a fact-checker then review the draft in parallel.",
        ],
        cost: "More model calls, more latency and more moving parts, which forced the speed fork below.",
        exhibit: "pipeline",
      },
      {
        id: "honest-reversible",
        title: "Trust the chat, or make every change honest and reversible?",
        tension:
          "I rebuilt the editor around a chat agent, because “make slide 3 punchier” is how people think about edits. That made honesty critical.",
        rejected: { label: "Relay the model's claim", detail: "Show whatever the agent says it did." },
        chosen: { label: "Honesty guard and restore points", detail: "State what didn't change; checkpoint every change." },
        why: [
          "When a small model claimed success on an edit it hadn't made, an honesty guard now states what didn't change instead of repeating the claim, backed by a focused retry.",
          "Undo stopped being a chat message. Every reply that changes the deck saves a restore point. Restoring fades later replies, and the next message trims them from the agent's memory, so it never reasons about changes that no longer exist.",
        ],
        cost: "A more complex conversation model to build and test.",
        exhibit: "restore-chat",
      },
      {
        id: "evidence-not-taste",
        title: "Quality or speed, decided by evidence, not taste?",
        tension: "v2 was more accurate but slower, at 84 seconds a deck.",
        rejected: { label: "Guess", detail: "Pick a model setting by feel and ship it." },
        chosen: { label: "A blind eval harness", detail: "10 golden cases, a blind judge, head-to-heads, accuracy scored against evidence." },
        why: [
          "I fixed the judge first, when I caught it marking correctly sourced numbers as invented.",
          "The evals then showed that switching off the model's hidden reasoning kept quality level (8.0 vs 8.1) while cutting a deck from 84 to 31 seconds at about half the cost. First slides now appear around 23 seconds while the critic and fact-checker are still working.",
        ],
        cost: "Time spent building measurement instead of features.",
      },
      {
        id: "protect-design",
        title: "Add features, or protect the design?",
        tension:
          "I built a freeform canvas template and a looks system (nine styles, font and layout pickers) and tried them across every template.",
        rejected: { label: "Ship the flexibility", detail: "More knobs, more generic output." },
        chosen: { label: "Cut them", detail: "Keep three templates exactly as designed: The Truth, The Sketch, The Statement." },
        why: [
          "They made the product more flexible and the output more generic. Each template lost the identity that made it worth choosing.",
        ],
        cost: "Throwing away finished work. The alternative was a product that looks like every other AI tool.",
      },
    ],
    outcome: {
      metrics: [
        { value: "7 / 10", label: "Times a blind judge preferred the rebuilt version over the first one" },
        { value: "9.5 vs 8.8", label: "Accuracy: how well each carousel's claims hold up against their sources" },
        {
          value: "31 s",
          label: "Per carousel, down from 84 s, with no drop in quality",
          before: { label: "84 s", amount: 84 },
          after: { label: "31 s", amount: 31 },
          unit: "seconds",
        },
        { value: "~23 s", label: "Until the first slides appear, marked Draft while the checks finish" },
      ],
      points: [
        "Every change in the editor saves a restore point, and when an edit didn't happen the chat says so instead of claiming it did.",
        "Honest about the gaps: v1 still scores higher on flow (8.4 vs 7.5), and that's the next fix.",
        "Live and free at blinkwiser.com with a handful of real users and no revenue yet. I removed credits and limits so people could use it freely before I monetise.",
      ],
      provenance: "Scores come from my own harness and an AI judge, not from users.",
      exhibit: "eval-board",
    },
    ownership: {
      mine: [
        "The product, the UX, the pipeline architecture, the eval design and every cut. I built it by directing AI coding agents, reviewing their output and holding it to offline test suites and evals. The judgment was the job; typing the code wasn't.",
      ],
      change: [
        "I rebuilt v2 on the strength of my own evals, before I had enough users to tell me what mattered most. I'd put it in front of real creators earlier, let their behaviour choose the next fix, and start on distribution as seriously as quality.",
      ],
    },
    signals:
      "Designing for model failure (grounding, honesty, reversibility), deciding trade-offs with evals instead of opinions, and the restraint to cut what dilutes the product.",
  },
  /* ------------------------------------------------------------------ 05 */
  {
    slug: "dubai-municipality",
    index: "05",
    accent: "civic",
    glyph: "services",
    group: "Civic scale",
    title: "Organising a city's services around residents, not departments",
    short: "Dubai Municipality",
    dek: "Every service had its own rules and a department that wanted it front and centre. Residents only know what they need done.",
    meta: {
      role: "Lead UX Designer, onsite in Dubai",
      context: "Mphasis · Dubai Municipality",
      timeline: "2020–2021",
      domain: "Government · bilingual English–Arabic",
    },
    tags: ["Information architecture", "Stakeholder alignment", "RTL design", "Low-code constraints"],
    cover: {
      src: "/work/dubai/app.webp",
      width: 2400,
      height: 1273,
      full: true,
      alt: "Four screens of the Dubai Municipality app: the home screen in English and in Arabic, the Services screen grouped by need, and the Dashboard tracking every request.",
      caption:
        "The live app: search and voice as the front door, services grouped by what residents need, one dashboard for every request, and Arabic as an equal to English.",
    },
    headline: { value: "One home", label: "for a city's services, organised by what residents need, not by department" },
    card: { title: "Dubai Municipality app", widget: "departments", label: "for 3.5M residents" },
    hero: {
      label: "Civic services · bilingual",
      brief: "Redesign the city's services portal.",
      problem: "The catalogue mirrored the org chart, not what residents need done.",
      call: "Organise by resident need, in Arabic and English as equals.",
    },
    snapshot: {
      frame:
        "The brief was a portal redesign. Underneath was a catalogue that mirrored the organisation chart, while residents only know what they need done, not who owns it.",
      decision:
        "Organise the city's services around resident needs and one consistent service pattern, designed to be built as-is in the client's low-code platform, in Arabic and English as equals.",
      outcome:
        "Every service under one roof, organised by need: search as the way in, one dashboard to track every request, and one pattern for every service in Arabic and English. Signed off at every milestone despite competing departments, and built by the client's team as designed.",
    },
    frame: {
      assumed: "Redesign the portal's visual layer.",
      actual: "Decide how a city's services should be organised for the people using them, then make that survive the people who own them.",
      body: [
        "The portal covered building permits, environmental complaints, facility bookings, waste services and more, for a city of about 3.5 million people, in English and Arabic.",
        "The catalogue mirrored the organisation that ran it. Each service had its own rules, documents, fees and approval chain, and each belonged to a department that expected prominence. A resident renewing a permit doesn't know or care which department owns it.",
      ],
    },
    stakes: {
      items: [
        { title: "Residents succeed alone", body: "A public service for a very diverse population in two languages, with no onboarding and no second chance." },
        { title: "Formal sign-off at every step", body: "Milestone approvals with senior officials, where ambiguity turns into delay." },
        { title: "Built in low-code", body: "The client's team would build it in Mendix, with a fixed component set. Anything unbuildable there was a wish, not a design." },
        { title: "Moving requirements", body: "The structure had to absorb change between milestones without being redesigned each time." },
      ],
    },
    forks: [
      {
        id: "resident-need",
        title: "Organise by department, or by resident need?",
        tension:
          "Each department wanted its own services up front, and reviews carried competing, often conflicting feedback. Organising by department was the easiest thing to get signed off.",
        rejected: { label: "By department", detail: "Easy to approve, worst for residents." },
        chosen: { label: "By resident need", detail: "Search as the main way in, and one place to track every application." },
        why: [
          "People rarely know a service's official name, so search became the front door, and every resident gets one place to track all their applications regardless of department.",
          "Mapping the full service structure before any visual work gave me the evidence to defend it: it showed operational teams their services as residents would meet them.",
        ],
        cost: "No department got its own front door, and that had to be defended at every milestone.",
        exhibit: "service-map",
      },
      {
        id: "service-pattern",
        title: "A bespoke design per service, or one service pattern?",
        tension: "Designing each service on its own terms would have reproduced its inconsistency for residents and multiplied the build.",
        rejected: { label: "Bespoke per service", detail: "Every service a one-off." },
        chosen: { label: "One service template", detail: "Eligibility, documents, fees, steps and status, in the same place every time." },
        why: [
          "Consistency for residents, a single pattern for the build team, and a structure that absorbed changing requirements: a new or revised service slots into the template instead of reopening the design.",
        ],
        cost: "Some services had to fit a shared shape rather than getting a design of their own.",
        exhibit: "bilingual-pair",
      },
      {
        id: "buildable",
        title: "Design the ideal, or design what the client can build?",
        tension: "I wanted custom navigation and components that Mendix didn't support out of the box.",
        rejected: { label: "The ideal", detail: "An impressive Figma file and a build that stalls or drifts." },
        chosen: { label: "The buildable", detail: "Redesign within the platform's component set, validated with the client's team." },
        why: [
          "Arabic and English were designed side by side from the first wireframes rather than designed in English and flipped, which surfaces right-to-left failures while they're still cheap to fix.",
        ],
        cost: "Some navigation and component ideas the ideal design would have had.",
      },
    ],
    outcome: {
      metrics: [
        { value: "One home", label: "For the city's services, grouped by what residents need instead of which department owns them" },
        { value: "One place", label: "To track every request: in progress, completed, cancelled or waiting on payment" },
        { value: "Every", label: "Milestone formally signed off, despite competing departments" },
        { value: "3.5M", label: "Residents in the city it serves" },
      ],
      points: [
        "Launched publicly, built by the client's own team in Mendix with no custom workarounds.",
        "Arabic designed alongside English from the first wireframes, so it shipped as designed with no right-to-left rework.",
        "A resident-first structure: services grouped by need, one service pattern, search-first entry and a single place to track applications.",
      ],
      provenance: "This was 2020–2021. The live app has changed a lot since; this describes what we designed and shipped at the time.",
    },
    ownership: {
      mine: [
        "Lead UX designer, onsite in Dubai, leading the design team and presenting every milestone directly to senior municipal stakeholders. I owned the structure and defended it in each review.",
      ],
      change: [
        "I'd put the Arabic experience in front of Arabic-speaking residents, not just officials. Approval by officials isn't proof that residents understand a task first time.",
        "I'd write down the right-to-left rules we worked out (layout exceptions, numbers inside Arabic text), so the next bilingual team doesn't start from zero.",
      ],
    },
    signals:
      "Structural thinking in a political environment, designing for the build reality rather than the portfolio, and bilingual right-to-left design as a first-class discipline.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const getNeighbours = (slug: string) => {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  const n = caseStudies.length;
  return {
    prev: caseStudies[(i - 1 + n) % n]!,
    next: caseStudies[(i + 1) % n]!,
  };
};
