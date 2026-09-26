import type { CaseStudy } from "./types";

/*
 * Source of truth: sentry/02-career/portfolio-enhancement/*.md (as of 2026-09-24).
 * Public-safe rules applied from case-study-framework.md:
 *  - clients anonymised (no client or client-product names)
 *  - employer named once per study, as attribution only
 *  - no internal codenames, file keys or repo names
 *  - metrics are team-observed and labelled as such
 *  - every visual is a demo brand or a redrawn diagram, never a client screen
 */

export const caseStudies: CaseStudy[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: "ai-readable-design-system",
    index: "01",
    accent: "automation",
    glyph: "skills",
    group: "AI-driven UI",
    title: "Making a six-year design system build itself with AI",
    short: "AI-readable design system",
    dek: "The AI wasn't the variable I could change. The design system was. So I rebuilt it as a library of skill files an agent reads to turn a Jira story into a brand-compliant, self-verified screen.",
    meta: {
      role: "Senior UX Architect, UX Lead",
      context: "Mphasis · Javelina platform",
      timeline: "Built Aug–Sep 2026",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["Agentic design workflow", "Design systems", "Figma variables", "MCP"],
    headline: { value: "~40%", label: "less design production time" },
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
        "We had a design system in Figma, but its descriptions were vague and years stale: patched piecemeal as needs came up, never fully re-documented, because you can't write down everything that lives in a designer's head. Components alone weren't enough. Making the system AI-legible meant externalising that tacit knowledge: colour and typography semantics, grid, layout, components and composition.",
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

  /* ------------------------------------------------------------------ 02 */
  {
    slug: "designing-trust-into-ai",
    index: "02",
    accent: "blinkwiser",
    glyph: "pipeline",
    group: "AI-driven UI",
    title: "Blinkwiser: designing trust into an AI product",
    short: "Trust in an AI product",
    dek: "Getting an AI to produce a plausible LinkedIn carousel took two weeks. Getting one a creator could trust took the rest of the year.",
    meta: {
      role: "Founder · product, UX, architecture, evaluation",
      context: "Blinkwiser · built by directing AI coding agents",
      timeline: "Dec 2025–present",
      domain: "AI SaaS · creator tools",
    },
    tags: ["Agent pipeline", "Grounding", "Eval harness", "AI UX"],
    headline: { value: "0 vs 47", label: "structural errors in blind evals" },
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
        "The rebuild wins 7 of 10 blind head-to-heads, scores 9.5 vs 8.8 on accuracy and produces zero structural errors against 47. Live, free and pre-revenue.",
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
        { value: "7 / 10", label: "Blind head-to-head wins, v2 vs v1" },
        { value: "9.5 vs 8.8", label: "Accuracy score against evidence" },
        {
          value: "31 s",
          label: "Per deck, same judged quality",
          before: { label: "84 s", amount: 84 },
          after: { label: "31 s", amount: 31 },
          unit: "seconds",
        },
        { value: "~23 s", label: "Until the first slides appear" },
      ],
      points: [
        "Zero structural errors against 47 in v1: text over the limit, broken accent highlights, sentences cut mid-way.",
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

  /* ------------------------------------------------------------------ 03 */
  {
    slug: "enterprise-platform-from-zero",
    index: "03",
    accent: "platform",
    glyph: "tiers",
    group: "Enterprise systems",
    title: "Building an enterprise health platform from zero",
    short: "White-label platform",
    dek: "I was brought in to adjust a handful of screens. Underneath was a white-label product with no system, hardcoded colours and every new client rebuilt by hand.",
    meta: {
      role: "Founding UX Designer → UX Lead",
      context: "Mphasis · Javelina platform",
      timeline: "2021–present",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["Three-tier tokens", "White-label", "Design system adoption", "Web + native"],
    headline: { value: "< 24 h", label: "to theme a new client, from weeks" },
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
    },
    ownership: {
      mine: [
        "The reframe, the architecture and the adoption plan. I started as the only designer, interviewed and selected four more, onboarded them onto the system and its standards, and was promoted to UX Lead.",
      ],
      change: [
        "I'd close the distance between the system and the people using it much earlier. Its rationale lived in my head, and the system lived in a separate file engineers had to go and check. Closing that gap is what I later did by making it machine-readable (case study 01).",
      ],
    },
    signals:
      "Problem-finding over brief-following, platform architecture with honest costs, and the part most design-system stories skip: driving adoption across engineering.",
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: "open-enrollment",
    index: "04",
    accent: "enrollment",
    glyph: "flow",
    group: "Enterprise systems",
    title: "Open Enrollment: redesigning the decision, not the screens",
    short: "Open Enrollment",
    dek: "The flow asked questions in the order the backend stores them. I reordered them to match how a family actually decides.",
    meta: {
      role: "UX Lead",
      context: "Mphasis · Javelina platform",
      timeline: "Live in production",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["Decision modelling", "Defaults", "Engineering alignment", "Regulated flows"],
    headline: { value: "9 → 5", label: "steps, with one question asked once" },
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
      intro: "Open enrollment is a once-a-year window with a deadline, and the choices lock for the year.",
      items: [
        { title: "Missed family members", body: "Someone missed on one coverage stays uncovered until the next window or a qualifying life event." },
        { title: "Late cost", body: "A cost that only becomes clear at the end means members commit before they understand what they'll pay." },
        { title: "Admins repeat every flaw", body: "Every weakness in the member flow repeats for admins enrolling on members' behalf, across every client." },
      ],
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
    },
    outcome: {
      metrics: [
        {
          value: "9 → 5",
          label: "Steps: Welcome, Profile, Dependents, Coverage, Review",
          before: { label: "9 steps", amount: 9 },
          after: { label: "5 steps", amount: 5 },
          unit: "steps",
        },
        { value: "1×", label: "“Who's covered” asked once, not once per coverage" },
        { value: "Every step", label: "Cost visible, in the unit people pay" },
        { value: "4 flows", label: "One skeleton for open enrollment, life events, new hires, admin-on-behalf" },
      ],
      points: [
        "Live in production. The complaints that triggered the redesign have dropped, and admins enrolling on behalf get through it faster.",
      ],
      provenance: "Early signals are observed, not formally measured yet.",
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
    headline: { value: "0 rework", label: "in right-to-left; Arabic shipped as designed" },
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
        "Formal sign-off at every milestone despite competing departments; launched publicly, built by the client's team with no custom workarounds and no right-to-left rework.",
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
        { value: "Every", label: "Milestone formally signed off" },
        { value: "0", label: "Custom engineering workarounds" },
        { value: "0", label: "Right-to-left rework in development" },
        { value: "3.5M", label: "Residents in the city the portal serves" },
      ],
      points: [
        "Launched publicly, built by the client's own team in Mendix, with the Arabic experience shipped as designed.",
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
