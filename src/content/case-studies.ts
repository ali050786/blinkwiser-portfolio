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
    glyph: "flow",
    group: "Health insurance platforms",
    title: "Health-insurance enrollment, from 9 steps to 5",
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
        "Clients said the enrollment flow was too long. It was long because it followed how the backend stores data, so members answered “who's covered” again inside every coverage.",
      decision:
        "Reorder the questions to the member's model (my family → who needs what → which plan) and ask “who needs what” once, as a single family-by-coverage grid.",
      outcome:
        "9 steps became 5, the per-coverage loop disappeared, cost is visible at every step, and the flow is live for open enrollment, life events and new hires.",
    },
    frame: {
      assumed: "The flow is too long. Trim screens.",
      actual: "It asked questions in the order the backend stores them, so members answered the same question many times.",
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
        title: "I changed the order of the questions instead of trimming screens",
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
        title: "I made the most common choice the default",
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
        title: "The UI translates the member's answers for the backend, and the backend changed in phases",
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
        "Members who don't take part in open enrollment used to be handled by admins one at a time. I designed a rule each client sets once and runs themselves, with a record of every run and a list of the members the rule couldn't handle.",
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
    glyph: "tiers",
    group: "Health insurance platforms",
    title: "Building an enterprise health-insurance platform from zero",
    short: "White-label platform",
    dek: "Asked to adjust a few screens, I found a white-label product with no system, where every new client was a rebuild.",
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
      caption: "A member dashboard pattern from the library. Every client sees it in its own brand.",
    },
    headline: { value: "< 24 h", label: "to theme a new client, down from weeks (team-observed)" },
    card: { title: "White-label health-insurance platform", widget: "brands", label: "to theme a new client" },
    hook: {
      line: "Each new client used to mean weeks of re-skinning. With design tokens, it takes under a day.",
      turn: "Once each client's brand lived in design tokens, setting up a new client became a configuration task.",
      note: "Illustration in a demo brand, not a client screen.",
      tabsLabel: "Three things that broke with every new client",
      picture: {
        visual: "client-theme",
        title: "A new client, before and after tokens",
        chips: ["Employer B, a new client"],
        before: {
          label: "Before: hardcoded",
          items: ["Brand colour hardcoded: the old client's colour stays", "Two buttons for the same job", "Rebuilt by hand for each client: weeks"],
        },
        after: {
          label: "With three-tier tokens",
          items: ["Colour comes from the client's tokens", "One button, from the system", "Insurer → employer → member, themed in under a day"],
        },
      },
      findings: [
        {
          tab: "The colour",
          words: "Brand colours were written straight into the code, so nothing could be re-themed.",
          source: "What I found in the existing product",
        },
        {
          tab: "The buttons",
          words: "Developers used different components for the same job on different pages.",
          source: "What I found in the existing product",
        },
        {
          tab: "The rebuild",
          words: "The business could only sign clients as fast as engineering could re-skin the product.",
          source: "The growth ceiling",
        },
      ],
    },
    hero: {
      label: "Enterprise platform",
      brief: "Adjust a handful of screens.",
      problem: "Every new client was rebuilt by hand, because the product had no design system.",
      call: "Turn each client's brand into design tokens, and get engineering to build with them.",
    },
    snapshot: {
      frame: "I was asked for a few screen edits. The product had no design system: colours were hardcoded and every client was rebuilt by hand.",
      decision: "I put each client's brand into three-tier design tokens, and worked with engineering until building with them was the default.",
      outcome: "Theming a new client: weeks to under 24 hours. Delivery: about 2 days of design, 3 of build. Team-observed.",
    },
    frame: {
      assumed: "Change a few screens.",
      actual: "Every new client multiplied the cost of every change.",
      body: [
        "It was white-label: insurers resell it to employers, who show it to their members. Every level needs its own look.",
        "There was no system, and developers struggled to maintain what existed. Editing screens one by one would have kept it fragile.",
        "So I started by documenting what existed. That became the design system.",
      ],
      exhibit: "white-label-chain",
    },
    stakes: {
      intro: "It was failing in four ways.",
      items: [
        { title: "Inconsistency", body: "Different components for the same job on different pages." },
        { title: "Hardcoded colours", body: "Brand colours lived in the code, so nothing could be re-themed." },
        { title: "Rebuild per client", body: "Sales could only grow as fast as engineering could re-skin." },
        { title: "Compliance exposure", body: "In US health insurance, an inconsistent eligibility screen is a compliance risk." },
      ],
      exhibit: "growth-ceiling",
    },
    forks: [
      {
        id: "go-underneath",
        title: "I started with the foundation instead of the screen edits",
        tension: "The edits were the expected, visible move.",
        rejected: { label: "Do the edits", detail: "Every change stays hand-made; every client a rebuild." },
        chosen: { label: "Start with the foundation", detail: "Document what exists, and let that become the system." },
        why: ["Engineering felt the pain most, so they became the system's first users."],
        cost: "A foundation nobody asked for, which had to prove itself.",
        exhibit: "edits-vs-foundation",
      },
      {
        id: "brand-as-variable",
        title: "Each client's brand became a set of design tokens",
        tension: "Each client needs its own identity at three levels. Per-client builds would scale the mess.",
        rejected: { label: "Per-client builds", detail: "A fork of the look for every insurer and employer." },
        chosen: { label: "Three-tier tokens", detail: "Insurer → employer → member. Each tier overrides only what it owns." },
        why: ["A new client becomes configuration, not a project.", "One foundation runs web, mobile web, iOS and Android."],
        cost: "Developers could no longer style things directly, and that habit took time to break.",
        exhibit: "theme-cascade",
      },
      {
        id: "adoption",
        title: "I treated adoption as part of the design work",
        tension: "At first developers carried on as before. The system lived in a file they had to remember to open.",
        rejected: { label: "Specs and good intentions", detail: "How the product became inconsistent in the first place." },
        chosen: { label: "Treat adoption as design", detail: "Work it from four sides until it's the default." },
        why: ["It took a few months:"],
        bullets: [
          { title: "Enablement", body: "Walkthroughs with developers." },
          { title: "Documentation", body: "Usage rules inside the system." },
          { title: "Quality", body: "Design QA catches hardcoded values before release." },
          { title: "Policy", body: "Agreed with the tech lead: the system is the standard." },
        ],
        cost: "Months of enablement and QA before it paid back.",
        exhibit: "adoption-four-sides",
      },
    ],
    followOn: {
      title: "How the work ran",
      items: [
        { title: "Personas", body: "Three to four each for insurers, employers and members, from stakeholder research." },
        { title: "Workshops first", body: "New ideas went to a BA workshop before design, so the rules were agreed first." },
        { title: "Architecture with engineering", body: "System changes were agreed with engineering before they shipped." },
      ],
      exhibit: "how-work-ran",
    },
    spotlight: {
      label: "Built on the token system",
      title: "The Branding Hub, where admins set each client's brand",
      intro: "Admins use the Branding Hub to set each employer's theme from the design tokens, check it on a real member dashboard, and assign it to employers. I designed it, and it's live.",
      why: [
        "Each employer needs the member portal in its own look.",
        "Someone has to set the tokens, for many employers, without breaking what members see.",
        "Several admins work on themes at once.",
      ],
      what: [
        "A hub of every theme: colours, employers using it, last editor, and draft, default and locked states.",
        "An editor using the same roles as the tokens, each colour saying where it appears.",
        "A preview on the member dashboard, then assignment to employers with their own logo and links.",
        "Drafts, an edit lock showing who's editing, change history and restore.",
      ],
      impact: [
        "Shipped and used by admins.",
        "Theming a client is one admin task, inside the system.",
        "Colours are checked on a real dashboard before members see them.",
        "Admins don't overwrite each other, and deleted themes come back.",
      ],
      provenance: "Qualitative. Shipped; usage not formally measured.",
      exhibit: "branding-screens",
    },
    outcome: {
      metrics: [
        {
          value: "< 24 h",
          label: "To theme a new client",
          viz: {
            kind: "blocks",
            unit: "working day",
            before: { solid: 10, label: "weeks" },
            after: { solid: 1, label: "under a day" },
            note: "team-observed · weeks drawn at the low end",
          },
        },
        {
          value: "1–2 days",
          label: "To rebrand the white-label iOS and Android apps",
          viz: {
            kind: "timeline",
            end: 2,
            unit: "days",
            marks: [{ at: 2, label: "iOS and Android rebranded", accent: true }],
            note: "team-observed",
          },
        },
        {
          value: "2 + 3",
          label: "Days of design + build per feature, predictably",
          viz: {
            kind: "timeline",
            end: 5,
            unit: "days",
            marks: [
              { at: 2, label: "design" },
              { at: 5, from: 2, label: "build", accent: true },
            ],
            note: "working days · team-observed",
          },
        },
        {
          value: "120+",
          label: "Components on one foundation",
          viz: { kind: "fan", from: "120+ components", to: ["web", "mobile web", "iOS", "Android"], note: "one token set across four surfaces" },
        },
      ],
      points: [
        "Hardcoded colours and off-system components are caught in design QA, not in production.",
        "It serves Fortune-500 and enterprise-tier insurers.",
      ],
      provenance: "Team-observed, not formally tracked.",
      exhibit: "design-system-screens",
    },
    ownership: {
      mine: [
        "The reframe, the architecture and the adoption plan.",
        "I started as the only designer, hired four more, onboarded them, and became UX Lead.",
      ],
      change: [
        "I'd close the gap between the system and its users earlier. Its rationale lived in my head and in a file engineers had to check. Case 03 is how I later closed it.",
      ],
    },
    signals: "Finding the real problem, platform architecture with honest costs, and driving adoption across engineering.",
  },
  /* ------------------------------------------------------------------ 03 */
  {
    slug: "ai-readable-design-system",
    index: "03",
    glyph: "skills",
    group: "AI-driven UI",
    title: "Rewriting our design system so AI tools can follow it",
    short: "AI-readable design system",
    dek: "AI kept drawing screens that didn't look like our product, because six years of design rules lived only in designers' heads. I wrote them down as files the AI reads before it designs and checks its work against.",
    meta: {
      role: "UX Lead",
      context: "Mphasis · US health-insurance platform",
      timeline: "Built Aug–Sep 2026",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["Agentic design workflow", "Design systems", "Figma variables", "MCP"],
    headline: { value: "3–4 days", label: "from Jira story to engineering-ready screen, down from 1–2 weeks (team-observed)" },
    card: { title: "A design system AI can read", widget: "pipeline", label: "Jira-story turnaround" },
    hook: {
      line: "Our AI tool kept putting Save on the wrong side. It had no way to know our rules, so I wrote them down.",
      turn: "Once the rules were written down, the AI's screens matched our product.",
      note: "Illustration in a demo brand, not a client screen.",
      tabsLabel: "Three things the AI got wrong",
      picture: {
        visual: "same-request",
        title: "The same request, given to the AI twice",
        chips: ["Same AI", "Same components"],
        before: {
          label: "Before the skills",
          items: ["Save on the wrong side", "Link in a button colour", "Side nav left out: docs said 19 components, the file had 20"],
        },
        after: {
          label: "With the skills",
          items: ["Save on the right", "Link takes the link colour", "Side nav in place: audit matched docs to file, 20 of 20"],
        },
      },
      findings: [
        { tab: "The button", words: "", empty: "Button · Description", source: "The old button's description (as I remember it)" },
        { tab: "The colour", words: "Not an exact match, but agreed mapping.", quoted: true, source: "The rebuilt system's note on an old colour" },
        { tab: "The audit", words: "19 standalone components", quoted: true, source: "The system's index, before the audit (4 Sep 2026)" },
      ],
    },
    opener: {
      label: "Three things the AI got wrong",
      scope: "A six-year-old design system, five client brands and three platforms, rewritten as files an AI reads before it designs.",
      note: "Illustrations with generic names, not client screens. Quotes come from the skill files.",
      stories: [
        {
          id: "save-side",
          tab: "The button",
          story: "The first one put Save on the left. Every designer here puts it on the right.",
          quoteEmpty: { field: "Button · Description" },
          quoteSource: "The old button's description (as I remember it)",
          visual: "save-side",
          caption: "The habit lived in our heads. Now it's one line the AI reads before every screen.",
        },
        {
          id: "link-colour",
          tab: "The colour",
          story: "Our links have one colour. The AI picked another.",
          quote: "Not an exact match, but agreed mapping.",
          quoteSource: "The rebuilt system's note on an old colour",
          visual: "link-colour",
          caption: "The old colours were named for how they look, so any could be a link. Now each is named for its job.",
        },
        {
          id: "audit",
          tab: "The audit",
          story: "Even with the rules written down, the docs said 19 components. The file had 20.",
          quote: "19 standalone components",
          quoteSource: "The system's index, before the audit (4 Sep 2026)",
          visual: "audit",
          caption: "Unchecked patches are how the old system drifted. Now an audit compares docs and file every session.",
        },
      ],
    },
    hero: {
      label: "AI-driven design system",
      brief: "The AI isn't good enough yet. Prompt harder.",
      problem: "Our six-year-old design system lived in designers' heads, so the AI couldn't follow it.",
      call: "Rewrite it as skill files the AI reads and checks its work against.",
    },
    snapshot: {
      frame: "We were using AI to draft screens, and the drafts didn't match our product. Our design rules lived in designers' heads, so the AI had nothing to follow.",
      decision: "Without being asked, I rewrote the design system as skill files the AI reads before it designs.",
      outcome: "Mockups: 2 days to 3–4 hours. Jira stories: 1–2 weeks to 3–4 days. Adopted beyond my team. Team-observed.",
    },
    frame: {
      assumed: "The AI isn't good enough yet.",
      actual: "Our design system was never written down for a machine.",
      body: [
        "Sales demos and BA-to-developer handoffs both waited on mockups. I brought in AI to speed them up. Its screens weren't usable.",
        "Our Figma system was six years old, with no descriptions. The rules lived in designers' heads, so the AI had components but no rules.",
        "No one had made a veteran system AI-readable. I found no process, so I built one.",
      ],
      exhibit: "rules-in-heads",
    },
    stakes: {
      intro: "Two teams were waiting on fast, on-brand screens.",
      items: [
        { title: "BAs and developers", body: "Developers judge feasibility from screens, not specs." },
        { title: "Sales and marketing", body: "Slow branded demos slipped in live sales cycles." },
        { title: "Senior design time", body: "Every hand-drawn mockup pulled seniors off product work." },
      ],
      exhibit: "two-loops",
    },
    forks: [
      {
        id: "fix-the-system",
        title: "I rewrote the design system instead of tuning the prompts",
        tension: "The expected answers: wait for better AI, prompt harder, or hire. Nobody asked for a rebuild.",
        rejected: { label: "Tune the prompts", detail: "Coax better output from the same system." },
        chosen: { label: "Make the system legible", detail: "Rewrite it so a machine can follow it." },
        why: [
          "I'd been watching agent-readable docs emerge. I couldn't change the AI. I could change the system.",
          "No one assigned it; I took it on.",
        ],
        cost: "Weeks of unasked work before it proved itself.",
        exhibit: "prompt-vs-system",
      },
      {
        id: "skill-files",
        title: "I wrote the system as linked skill files, built up from tokens",
        tension: "An agent needs rules, not a component count: which colour for a link, which grid for a page.",
        rejected: { label: "Richer Figma descriptions", detail: "Annotate the file and hope the agent infers the rest." },
        chosen: { label: "Interlocking skill files", detail: "Plain-markdown skills, built up from tokens." },
        why: [
          "One system themes five client brands by mode: semantic colour, type by use, a 12-column grid, 43 component sets, 3 density modes and 141 described variables.",
          "Tokens first, then components that know their tokens, so it stays consistent as it grows.",
        ],
        cost: "More upfront work than annotating what existed.",
        exhibit: "skill-graph",
      },
      {
        id: "structural-correctness",
        title: "I made the AI build from real components and check its own work",
        tension: "Even with tokens, grid and components written down, the output still broke.",
        rejected: { label: "Accept good-looking output", detail: "Screens that pass a glance but aren't wired to the system." },
        chosen: { label: "Enforce structure", detail: "App shells, a self-checking build workflow, real instances." },
        why: ["Three fixes mattered most:"],
        bullets: [
          { title: "Composition", body: "App shells and a build workflow: pick the shell, use only approved components, run a checklist." },
          { title: "A growing system", body: "The skills say when to reuse, when to add a variant and when to build new." },
          { title: "Instances, not redraws", body: "Agents redraw elements from scratch. Every element is now a real instance: cheaper and traceable." },
        ],
        cost: "Slower first runs, for output that meets the bar.",
        exhibit: "build-screen",
      },
      {
        id: "portable",
        title: "I kept the skill files portable, so any AI tool can use them",
        tension: "Figma's agent was free in beta. Beta pricing ends.",
        rejected: { label: "Go all-in on one vendor", detail: "A format only one agent can read." },
        chosen: { label: "Portable and self-maintaining", detail: "Plain markdown, any agent, with drift checks and memory." },
        why: [
          "Anti-drift: an audit compares the file with the docs, and a memory skill carries decisions forward.",
          "Anti-lock-in: it runs on Figma's agent today and can move to Claude Code or any agent through a Figma MCP.",
        ],
        cost: "Governance to maintain: versioned backups and a guide page.",
        exhibit: "portable-skills",
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
          visual: "mockup-hours",
        },
        {
          value: "3–4 days",
          label: "Jira story to engineering-ready screen, with BAs",
          before: { label: "1–2 weeks", amount: 7.5 },
          after: { label: "3–4 days", amount: 3.5 },
          unit: "working days",
          visual: "story-days",
        },
        { value: "~40%", label: "Less design production time overall", visual: "time-freed" },
        { value: "5 · 3", label: "Client brands and platforms covered by one system", visual: "brand-grid" },
      ],
      points: [
        "All four designers on my team use it, and the org's UAT team chose it for their projects. I didn't have to sell it.",
        "The AI drafts the screens and designers make the decisions. The time saved goes to research, flows and edge cases.",
        "Built in 4–5 weeks across five brands and three platforms. I could redo it in 1–2.",
      ],
      provenance: "Lived-experience figures, recognised by managers, BAs and leadership. Not yet in sprint metrics.",
      exhibit: "adoption-spread",
    },
    ownership: {
      mine: [
        "Self-initiated. I built it, proved it, then brought the team in.",
        "I haven't handed it to BAs yet: they'd likely skip the UX thinking. That's on purpose.",
      ],
      change: ["I'd track before and after from day one, so the gains are measured, not just acknowledged."],
    },
    signals: "A design system alone won't drive an AI. Teach it your rules, and turn every repeated mistake into a skill.",
  },
  /* ------------------------------------------------------------------ 04 */
  {
    slug: "designing-trust-into-ai",
    index: "04",
    glyph: "pipeline",
    group: "AI-driven UI",
    title: "Blinkwiser: making an AI carousel tool you can check",
    short: "Trust in an AI product",
    dek: "The first version took two weeks and made up its own statistics. Over the next two months, building with AI coding agents, I rebuilt it so every number traces to a source and every edit can be undone.",
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
      caption: "Agentic Carousel by Blinkwiser, live: agents research, write and design a LinkedIn carousel from a topic, link, video or file.",
    },
    reel: {
      video: "/work/blinkwiser/run.mp4",
      poster: "/work/blinkwiser/run-poster.webp",
      width: 1600,
      height: 800,
      alt: "Screen recording of the studio generating a carousel: each agent step reports in the chat, then the first slides land, marked Draft while the editor is still checking.",
      caption: "One run, sped up 3×: each agent step reports in the chat, and the first slides land marked Draft while the checks finish.",
    },
    headline: { value: "7 in 10", label: "blind comparisons won by the rebuild over the first version (my eval harness, AI judge)" },
    card: { title: "Blinkwiser AI carousels", widget: "slides", value: "Plan → Reflect", label: "facts checked before you see it" },
    hook: {
      line: "The first version took two weeks and made up its own statistics. The rebuild took two months.",
      turn: "Now every number traces to a source, and every edit can be undone.",
      number: { value: "7 in 10", label: "blind head-to-heads won by the rebuild over v1 (my eval harness, AI judge)" },
      note: "Illustration with demo content, not a real deck. The live product is shown below.",
      tabsLabel: "Three ways v1 broke trust",
      picture: {
        visual: "trust-edit",
        title: "One edit, in v1 and in the rebuild",
        chips: ["One edit request", "v1 vs the rebuild"],
        before: {
          label: "v1",
          items: ["A number with no source", "Claimed an edit it hadn't made", "No way back: undo was a chat message"],
        },
        after: {
          label: "The rebuild",
          items: ["Every number traces to a source", "Says what didn't change, then retries", "Every change saves a restore point"],
        },
      },
      findings: [
        { tab: "The number", words: "The model invented numbers and stated them with confidence.", source: "What broke in use" },
        { tab: "The claim", words: "I've rewritten the carousel", quoted: true, source: "v1's chat, when nothing had changed" },
        { tab: "The way back", words: "Undo was a chat message, not a restore point.", source: "What broke in use" },
      ],
    },
    hero: {
      label: "AI product · founder",
      brief: "Turn a topic into a LinkedIn carousel, fast.",
      problem: "Creators couldn't trust the numbers the AI wrote, or its claims about what it changed.",
      call: "Check every fact in code, and make every edit undoable.",
    },
    snapshot: {
      frame: "The model made up numbers, claimed edits it hadn't made and drifted into generic AI writing. Creators couldn't trust what it produced.",
      decision: "I moved the rules from the prompt into code, made every edit reversible and clear about what changed, and settled trade-offs with blind tests.",
      outcome: "Numbers trace to sources, the chat says what really changed, every edit can be undone. Live, free, pre-revenue.",
    },
    frame: {
      assumed: "Generation is the product.",
      actual: "People post these carousels under their own name, so every fact has to be right.",
      body: [
        "The brief was my own. A first version was in beta within two weeks. The hard part showed up in use.",
        "A wrong statistic costs a creator their reputation. A tool that lies about its own edits can't be trusted with anything.",
      ],
      exhibit: "trust-questions",
    },
    stakes: {
      items: [
        { title: "Creators publish under their own name", body: "Accuracy isn't a nice-to-have." },
        { title: "An AI editor lives on honesty", body: "If the chat misreports a change, people stop believing it." },
        { title: "Speed decides who stays", body: "Every extra quality step adds time." },
        { title: "Solo and bootstrapped", body: "Cost per deck matters as much as quality." },
      ],
      exhibit: "quality-steps",
    },
    forks: [
      {
        id: "enforce-in-code",
        title: "I moved the rules from the prompt into code",
        tension: "v1 relied on prompts. Limits and “don't make things up” were requests the model could ignore.",
        rejected: { label: "Better prompts", detail: "Keep asking, and hope." },
        chosen: { label: "A checked pipeline", detail: "Anything that must be true is checked in code." },
        why: [
          "Research becomes a numbered fact sheet. An outline fixes the slide count and assigns facts to slides.",
          "Every number must trace to a source, or its slide is downgraded. A critic and a fact-checker review in parallel.",
        ],
        cost: "More calls and more waiting, which forced the speed fork.",
        exhibit: "pipeline",
      },
      {
        id: "honest-reversible",
        title: "Every change is checked and can be undone",
        tension: "The editor became a chat agent, so honesty became critical.",
        rejected: { label: "Relay the model's claim", detail: "Show whatever the agent says it did." },
        chosen: { label: "Honesty guard and restore points", detail: "State what didn't change; checkpoint every change." },
        why: [
          "When the model claims an edit it didn't make, a guard says so and retries.",
          "Every change saves a restore point. Restoring trims later turns from the agent's memory.",
        ],
        cost: "A more complex conversation model to build and test.",
        exhibit: "restore-chat",
      },
      {
        id: "evidence-not-taste",
        title: "I settled quality versus speed with blind tests",
        tension: "v2 was more accurate but slower: 84 seconds a deck.",
        rejected: { label: "Guess", detail: "Pick a setting by feel." },
        chosen: { label: "A blind eval harness", detail: "10 golden cases, a blind judge, head-to-heads." },
        why: [
          "I fixed the judge first: it was marking sourced numbers as invented.",
          "Reasoning off held quality (8.0 vs 8.1) and cut a deck from 84 to 31 seconds, at about half the cost.",
        ],
        cost: "Time on measurement instead of features.",
        exhibit: "blind-eval",
      },
      {
        id: "protect-design",
        title: "I cut the extra features to protect the templates",
        tension: "I built a freeform canvas and a looks system: nine styles, plus font and layout pickers.",
        rejected: { label: "Ship the flexibility", detail: "More knobs, more generic output." },
        chosen: { label: "Cut them", detail: "Three templates, exactly as designed: The Truth, The Sketch, The Statement." },
        why: ["Flexibility made every template look generic."],
        cost: "Throwing away finished work.",
        exhibit: "cut-to-three",
      },
    ],
    outcome: {
      metrics: [
        {
          value: "7 / 10",
          label: "Blind head-to-heads won by the rebuild over v1",
          viz: { kind: "dots", filled: 7, total: 10, note: "my eval harness · AI judge" },
        },
        {
          value: "9.5 vs 8.8",
          label: "Accuracy: claims that hold up against their sources",
          viz: {
            kind: "compare",
            rows: [
              { label: "rebuild", value: 9.5, accent: true },
              { label: "v1", value: 8.8 },
            ],
            max: 10,
            note: "AI judge, scored against the evidence",
          },
        },
        {
          value: "31 s",
          label: "Per carousel, down from 84 s, same quality",
          viz: {
            kind: "compare",
            rows: [
              { label: "before", value: 84 },
              { label: "now", value: 31, accent: true },
            ],
            max: 84,
            note: "seconds per deck · my harness",
          },
        },
        {
          value: "~23 s",
          label: "Until the first slides appear, marked Draft",
          viz: {
            kind: "timeline",
            end: 31,
            unit: "s",
            marks: [
              { at: 23, label: "first slides, Draft", accent: true },
              { at: 31, label: "checks done" },
            ],
            note: "a typical run · checks finish after first slides",
          },
        },
      ],
      points: [
        "Every change saves a restore point, and the chat says when an edit didn't happen.",
        "Still behind: v1 scores higher on flow (8.4 vs 7.5). That's next.",
        "Live and free at blinkwiser.com, with a handful of real users and no revenue yet.",
      ],
      provenance: "Scores come from my own harness and an AI judge, not from users.",
      exhibit: "eval-board",
    },
    ownership: {
      mine: [
        "Product, UX, pipeline architecture, eval design and every cut.",
        "Built by directing AI coding agents and holding them to tests and evals.",
      ],
      change: [
        "I rebuilt v2 on my own evals before real users told me what mattered. I'd ship to creators earlier and take distribution as seriously as quality.",
      ],
    },
    signals: "Designing for model failure, deciding trade-offs with evals, and the restraint to cut.",
  },
  /* ------------------------------------------------------------------ 05 */
  {
    slug: "dubai-municipality",
    index: "05",
    glyph: "services",
    group: "Civic scale",
    title: "Dubai Municipality: one place for a city's services",
    short: "Dubai Municipality",
    dek: "Every service had its own rules, and each department wanted its services up front. I organised them by what residents need done, in Arabic and English.",
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
      caption: "The live app: search first, services grouped by need, one dashboard for every request, Arabic equal to English.",
    },
    headline: { value: "", label: "One place for city services, for Emiratis and residents, in Arabic and English" },
    card: { title: "Dubai Municipality app", widget: "departments", label: "for Emiratis and residents" },
    hook: {
      line: "Residents don't know who owns a service.",
      turn: "So I organised the city's services by what people need done.",
      note: "Illustration with generic labels, not the client's screens. The live app is shown below.",
      tabsLabel: "Three things the old catalogue got wrong",
      picture: {
        visual: "city-home",
        title: "The services screen, before and after",
        chips: ["Every city service", "Arabic and English"],
        before: {
          label: "Organised by department",
          items: ["Grouped by who owns the service", "Found only by its official name", "Each service laid out its own way"],
        },
        after: {
          label: "Organised by need",
          items: ["Grouped by what residents need", "Search first: say what you need", "One pattern: eligibility, documents, fees, status"],
        },
      },
      findings: [
        {
          tab: "The grouping",
          words: "A resident renewing a permit doesn't know or care which department owns it.",
          source: "Why the catalogue had to change",
        },
        { tab: "The name", words: "People rarely know a service's official name.", source: "Why search became the front door" },
        {
          tab: "The pattern",
          words: "Each service had its own rules, documents, fees and approval chain.",
          source: "The catalogue, as it was",
        },
      ],
    },
    hero: {
      label: "Civic services · bilingual",
      brief: "Redesign the city's services portal.",
      problem: "Services were grouped by department, but residents only know what they need done.",
      call: "Group services by what residents need, in Arabic and English equally.",
    },
    snapshot: {
      frame: "The brief was a portal redesign. Services were grouped by department, but residents only know what they need done.",
      decision: "Organise every service by resident need, in one pattern, buildable in the client's low-code platform, in Arabic and English as equals.",
      outcome: "One home for every service, search first, one dashboard for every request. Signed off at every milestone and built as designed.",
    },
    frame: {
      assumed: "Redesign the portal's look.",
      actual: "Decide how a city's services are organised for residents, then defend it.",
      body: [
        "Permits, complaints, bookings, waste and more, for Emiratis and residents, in Arabic and English.",
        "Each service had its own rules, fees and approvals, and a department expecting prominence.",
      ],
      exhibit: "org-vs-need",
    },
    stakes: {
      items: [
        { title: "Residents succeed alone", body: "Two languages, a diverse city, no onboarding." },
        { title: "Formal sign-off at every step", body: "Milestone approvals, where ambiguity means delay." },
        { title: "Built in low-code", body: "Mendix has a fixed set of components, so every design had to be buildable with them." },
        { title: "Moving requirements", body: "The structure had to absorb change without a redesign." },
      ],
      exhibit: "four-constraints",
    },
    forks: [
      {
        id: "resident-need",
        title: "I grouped services by what residents need done",
        tension: "Each department wanted its services up front. By department was the easiest to sign off.",
        rejected: { label: "By department", detail: "Easy to approve, worst for residents." },
        chosen: { label: "By resident need", detail: "Search first, and one place to track every request." },
        why: [
          "People rarely know a service's official name, so search became the front door.",
          "Mapping every service first gave me the evidence to defend it in review.",
        ],
        cost: "No department got its own front door. I defended that at every milestone.",
        exhibit: "service-map",
      },
      {
        id: "service-pattern",
        title: "Every service follows one template",
        tension: "A design per service would copy each one's inconsistency and multiply the build.",
        rejected: { label: "Bespoke per service", detail: "Every service a one-off." },
        chosen: { label: "One service template", detail: "Eligibility, documents, fees, steps and status, always in the same place." },
        why: ["One pattern for residents and for the build team. A new service slots in without reopening the design."],
        cost: "Some services had to fit a shared shape.",
        exhibit: "bilingual-pair",
      },
      {
        id: "buildable",
        title: "I designed within what the client's low-code platform could build",
        tension: "I wanted custom navigation and components Mendix didn't support.",
        rejected: { label: "The ideal", detail: "A great Figma file and a stalled build." },
        chosen: { label: "The buildable", detail: "Redesign inside the platform's set, checked with the client's team." },
        why: ["Arabic and English were designed side by side from the first wireframe, so right-to-left issues surfaced early."],
        cost: "Some navigation ideas I liked.",
        exhibit: "ideal-vs-buildable",
      },
    ],
    outcome: {
      metrics: [
        {
          value: "One home",
          label: "For every service, grouped by need, not department",
          viz: { kind: "fan", from: "one home", to: ["permits", "complaints", "bookings", "waste"], note: "service types from the brief" },
        },
        {
          value: "One place",
          label: "To track every request",
          viz: {
            kind: "fan",
            from: "one dashboard",
            to: ["in progress", "completed", "cancelled", "waiting on payment"],
            note: "request states, as shipped",
          },
        },
        {
          value: "Every",
          label: "Milestone formally signed off",
          viz: { kind: "ticks", count: 5, label: "signed off at every review", note: "number of ticks drawn, not counted" },
        },
        {
          value: "Arabic + English",
          label: "For Emiratis and residents, designed side by side",
          viz: { kind: "fan", from: "one app", to: ["English", "Arabic"], note: "designed side by side from the first wireframe" },
        },
      ],
      points: [
        "Built by the client's own team in Mendix, with no custom workarounds.",
        "Arabic designed with English from the first wireframe: no right-to-left rework.",
      ],
      provenance: "This was 2020–2021. The live app has changed a lot since; this is what we designed and shipped then.",
    },
    ownership: {
      mine: [
        "Lead UX designer onsite in Dubai. I led the design team, presented every milestone to senior officials, and defended the structure.",
      ],
      change: [
        "I'd test the Arabic with Arabic-speaking residents, not just officials.",
        "I'd write down our right-to-left rules so the next bilingual team doesn't start from zero.",
      ],
    },
    signals: "Structure in a political room, designing for the real build, and bilingual right-to-left as a first-class discipline.",
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
