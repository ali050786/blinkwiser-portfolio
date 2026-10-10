import type { CaseStudy } from "./types";

/*
 * Source of truth: sentry/02-career/portfolio-enhancement/*.md (as of 2026-09-24).
 * Public-safe rules applied from case-study-framework.md:
 *  - clients anonymized (no client or client-product names)
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
    short: "Health-insurance enrollment",
    dek: "Members kept telling us enrollment was too long. When I walked through it, I found it asked questions in the order the backend stores them, so I rebuilt it around how a family actually decides.",
    meta: {
      role: "UX Lead",
      context: "Mphasis · US health-insurance platform",
      timeline: "Live in production",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["US health insurance", "Decision modeling", "Defaults", "Regulated flows"],
    cover: {
      video: "/work/enrollment/trailer.mp4",
      poster: "/work/enrollment/trailer-poster.webp",
      sound: true,
      bare: true,
      alt: "Trailer of the enrollment redesign. Old flow: Dennis adds his newborn and is told she isn't covered. He goes through a coverage hub and re-adds his family inside the Medical plan. He sees only an annual estimate. He loses his family list when he changes plan. New flow: one grid sets who needs what. There's no hub. Each plan already knows who it covers. Prices are monthly, with a running total. Switching plans keeps the family.",
    },
    headline: { value: "5 steps", label: "down from 9, with “who's covered” asked once" },
    opener: {
      scope: "One flow that runs three kinds of enrollment: open enrollment, life events and new hires.",
      note: "Dennis is a persona I use to tell the story, and these are illustrations rather than the shipped screens. I counted the steps by walking through the old and new flows, and the prices are made up for the demo.",
      stories: [
        {
          id: "newborn",
          tab: "Adding dependents",
          story: "Dennis just had a baby, and he has 31 days to get her covered.",
          quote: "Adding a dependent does not automatically enroll them in coverage.",
          quoteSource: "The old flow, right after he added her",
          visual: "newborn",
          caption: "In the old flow, adding his daughter and covering her were two separate jobs, and every coverage added another step. In the redesign he does both in the same row."
        },
        {
          id: "plan-switch",
          tab: "Switching plans",
          story: "Dennis switches to a cheaper dental plan, and the old flow forgets his family.",
          quote: "Select Member(s)/Dependent(s) to cover",
          quoteSource: "The old plan page, asking again after he changed plans",
          visual: "plan-switch",
          caption: "The old flow tied the family to the plan, so a new plan meant building the family list all over again. In the redesign the family stays with Dennis whichever plan he picks.",
        },
        {
          id: "cost",
          tab: "Visible cost",
          story: "Dennis picks plans for six people and never once sees the total.",
          quote: "The displayed Premium is only an estimate. The amount may vary if you change network or update Dependents.",
          quoteSource: "Printed under every price in the old flow",
          visual: "cost",
          caption: "Each plan showed its own price and nothing added them up. Now there's a running total at the top of every coverage screen.",
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
        "The brief was simple: users said enrollment took too long. When I walked through it myself, I saw why. It followed the way the backend stores data, so members had to answer “who's covered” again inside every single coverage.",
      decision:
        "Instead of cutting screens, I changed the order of the questions to match how a family thinks: first my family, then who needs what, then which plan. “Who needs what” is now asked once, in a single grid of family members against coverages.",
      outcome:
        "The flow went from 9 steps to 5, the loop for every coverage is gone, and members can see the cost at every step. It's now live for open enrollment, life events and new hires.",
    },
    frame: {
      assumed: "The flow is too long, so trim some screens.",
      actual: "It asked questions in the order the backend stores them, so members kept answering the same question.",
      body: [
        "The feedback came from users and from our business analysts, and it boiled down to four things. The flow felt too long, members got confused about dependents, they didn't see the cost until late, and admins struggled when they enrolled people on their behalf.",
        "The obvious fix was to trim screens, but I wanted to know why there were so many first. Cutting screens would have made the loop shorter without getting rid of it.",
      ],
      evidence: {
        title: "The backend's data model, turned straight into screens",
        items: [
          "Three screens just to manage the household: the list, an add form, then the updated list.",
          "A loop for every coverage: pick Medical, browse plans, pick one, choose who it covers, go back to the hub, then do it all again for Dental and Vision.",
          "So members answered “who's covered” twice, once for the household and again inside every coverage.",
          "The premium was shown as a yearly estimate, and it could still change if they edited dependents or the network.",
        ],
      },
      exhibit: "flow-compare",
    },
    stakes: {
      intro: "Open enrollment happens once a year. A life event like a birth opens a short window, usually 30 or 31 days, and if you miss it, adding someone usually has to wait for the next open enrollment.",
      items: [
        { title: "Missed family members", body: "If someone gets missed on one coverage, they stay uncovered until the next window or another qualifying life event." },
        { title: "Late cost", body: "If the cost only shows up at the end, members commit before they know what they'll pay." },
        { title: "Admins hit the same problems", body: "Admins enroll members on their behalf, so every weakness in the member flow hits them too." },
      ],
      exhibit: "coverage-gap",
    },
    forks: [
      {
        id: "reorder",
        title: "I changed the order of the questions instead of trimming screens",
        tension: "Trimming would have been quicker, and on paper it would have answered “too long”.",
        rejected: { label: "Trim screens", detail: "Keeps the loop, and members still answer the dependent question twice." },
        chosen: { label: "Reorder the decision", detail: "First my family, then who needs what, then which plan." },
        why: [
          "Now “who needs what” is asked once, as a grid of family members against coverage types. Picking plans builds on that grid instead of asking the same thing again for every coverage.",
        ],
        cost: "The new order didn't match how the backend stored enrollments anymore, and that turned into decision 3.",
        exhibit: "trim-vs-reorder",
      },
      {
        id: "defaults",
        title: "I made the most common choice the default",
        tension: "Once the grid was in place, most of the remaining work was picking plans.",
        rejected: { label: "Ask everything, every time", detail: "Treats the rare paths the same as the common one." },
        chosen: { label: "Design the defaults", detail: "A shared family plan by default, with a clear way to pick plans per member." },
        why: [
          "Keeping your current plan is the default, and waiving coverage sits right there on the screen instead of being tucked away.",
          "My bet was simple: the most common path should be the shortest, and the less common one should still be one clear step away.",
        ],
        cost: "In a regulated flow a default carries real weight, so I made sure every one stayed visible and easy to change.",
        exhibit: "coverage-grid",
      },
      {
        id: "engineering",
        title: "I let the UI translate for the backend, and we changed the backend in phases",
        tension:
          "Engineering pushed back, and fairly. Their model went coverage, then plan, then members, and I was asking them to take the answers in the reverse order.",
        rejected: { label: "Either extreme", detail: "Either show members the backend's order, or demand a backend rewrite." },
        chosen: { label: "Translate, then phase", detail: "The UI collects the grid and translates it, and the backend changes only where translating isn't enough." },
        why: [
          "I walked engineering through the order a member makes these decisions in, side by side with the actual complaints from users. We split the work and shipped it in phases rather than switching everything over at once.",
        ],
        cost: "The rollout was slower, but engineering owned the change instead of fighting it.",
        exhibit: "translate-layer",
      },
    ],
    followOn: {
      title: "What followed from the new order",
      intro: "These were my calls too, and each one only worked because the questions now came in the right order.",
      items: [
        {
          title: "Cost where the decision is made",
          body: "A running total on every step, shown per month or per paycheck deduction, instead of a yearly estimate at the very end.",
        },
        {
          title: "One review page before signing",
          body: "One page to check everything before a commitment that lasts a year. You can see what changed, edit it right there, and accept the disclaimer and e-sign in the same step.",
        },
        {
          title: "Ask only when needed",
          body: "Document upload used to be a fixed step for everyone. Now it only shows up when a member's situation actually needs a document.",
        },
      ],
      exhibit: "ask-when-needed",
    },
    spotlight: {
      label: "The admin side",
      title: "Passive enrollment: the members who never open the flow",
      intro:
        "Members who do nothing during open enrollment used to be handled by admins, one person at a time. I designed a rule that each employer sets up once and runs themselves, with a record of every run and a list of the members the rule couldn't handle.",
      why: [
        "When members took no action during open enrollment, admins had to sort them out by hand, one at a time.",
        "Every employer has its own rule for these members. Some terminate them, some carry the current plan forward and some move them to a default plan, sometimes depending on eligibility.",
        "And it all lands at the deadline of a once-a-year window, where a missed member stays uncovered until the next window or a qualifying life event.",
      ],
      what: [
        "A Passive Enrollment tab in each employer's enrollment settings, with four rules written in plain language. Each rule only shows the options it needs.",
        "Fields for termination status and reason, a way to leave out members who have supplemental products, and a default-plan mapping file with a template admins can download.",
        "Admins can save, or save and run right away. Before a run they see the rule, the file and how many members it will affect, with a plain warning that it can't be undone. The settings lock while a run is going.",
        "A log of every run, plus a report that separates the members who were processed from the ones who need a look, each with a reason and Enroll or Terminate buttons right in the row.",
        "The business owned the rules. My part was how admins set them up, run them and deal with the cases a rule can't decide.",
      ],
      impact: [
        "What used to be a manual job, done member by member, is now a rule each employer's admin sets once and runs themselves.",
        "Every run leaves a record of who ran it, when, with which rule and file, and how many members it touched.",
        "Members a rule can't handle don't get lost in the batch anymore. They come back with a reason, and the admin sorts them out right there.",
      ],
      provenance: "These results are qualitative. We didn't measure the effort before and after.",
      lead: "passive-funnel",
      exhibit: "passive-screens",
    },
    outcome: {
      metrics: [
        {
          value: "5 steps",
          label: "Down from 9: Welcome, Profile, Dependents, Coverage, Review",
          before: { label: "9 steps", amount: 9 },
          after: { label: "5 steps", amount: 5 },
          unit: "steps",
          visual: "glyph-flow",
        },
        { value: "Once", label: "“Who's covered” is asked once, instead of once for every coverage", visual: "asked-once" },
        { value: "Every step", label: "Cost is visible, shown the way people actually pay it", visual: "cost-every-step" },
        { value: "4 flows", label: "One flow structure shared by open enrollment, life events, new hires and admins enrolling on someone's behalf", visual: "four-flows" },
      ],
      points: [
        "It's live in production. The complaints that started the redesign have dropped, and admins enrolling on someone's behalf get through it faster.",
      ],
      provenance: "These are early signals we've seen, not formal measurements yet.",
      exhibit: "enrollment-screens",
    },
    ownership: {
      mine: [
        "I owned the reframe, the new order of questions, the family-plan default, the running monthly total and the single review page you can edit.",
      ],
      shared: [
        "Using one flow structure for every enrollment type and every kind of user was a decision I made with product and engineering. I also designed the admin screens for passive enrollment, while the business owned the rules behind them.",
      ],
      change: [
        "I'd get evidence in earlier. The redesign was based on feedback from users and business analysts plus my own analysis of the flow, not on watching real members use it. I'd also add tracking to the old flow before changing anything, so I could show the improvement in numbers instead of only describing it.",
      ],
    },
    story: {
      chapters: [
        {
          id: "brief",
          rail: "The brief",
          title: "Everyone said the flow was too long",
          blocks: [
            { kind: "p", text: "The feedback reached me from two places, users and our business analysts, and it boiled down to four complaints. The enrollment flow felt too long, members got confused about dependents, they didn't see the cost until late, and admins struggled whenever they enrolled someone on a member's behalf." },
            { kind: "p", text: "The obvious fix was to trim a few screens. Before doing that, I wanted to know why there were so many in the first place, so I walked through the whole flow step by step, the way a member would." },
            { kind: "exhibit", id: "flow-compare" },
            { kind: "p", text: "What I found was the backend's data model, turned straight into screens. It took three screens just to manage the household. Then every coverage had its own loop: pick Medical, browse plans, pick one, choose who it covers, go back to the hub, and do it all again for Dental and Vision. So members answered “who's covered” once for the household and again inside every coverage, and the price they saw was a yearly estimate that could still change." },
            { kind: "reframe", assumed: "The flow is too long, so trim some screens.", actual: "It asked questions in the order the backend stores them, so members kept answering the same question." },
            { kind: "p", text: "Cutting screens would have made that loop shorter, but members would still be answering the same question over and over. The real problem was the order of the questions." },
          ],
        },
        {
          id: "stakes",
          rail: "Why it matters",
          title: "Why a missed step matters so much here",
          blocks: [
            { kind: "p", text: "Open enrollment happens once a year. A life event like a birth opens a much shorter window, usually 30 or 31 days, and if someone gets missed in that window, adding them usually has to wait until the next open enrollment." },
            { kind: "exhibit", id: "coverage-gap" },
            { kind: "p", text: "So the problems in this flow weren't small annoyances. A family member missed on one coverage stayed uncovered until the next window. When the cost only showed up at the end, people committed before they knew what they'd pay. And because admins enroll members on their behalf, every weakness in the member flow hit them too." },
          ],
        },
        {
          id: "reorder",
          rail: "Decision 1: the order",
          title: "I changed the order of the questions instead of trimming screens",
          blocks: [
            { kind: "p", text: "Trimming would have been the quicker fix, and on paper it would have answered “too long”. But it would have kept the loop, and members would still answer the dependent question twice." },
            { kind: "exhibit", id: "trim-vs-reorder" },
            { kind: "p", text: "So I reordered the flow to follow how a family actually thinks it through: first my family, then who needs what, then which plan. “Who needs what” is now asked once, in one grid with family members down the side and coverages across the top. Picking plans builds on that grid instead of asking the same thing again for every coverage." },
            { kind: "note", label: "What it cost", text: "The new order didn't match how the backend stored enrollments anymore. That turned into my third decision." },
          ],
        },
        {
          id: "defaults",
          rail: "Decision 2: defaults",
          title: "I made the most common choice the default",
          blocks: [
            { kind: "p", text: "Once the grid was in place, most of the remaining work was picking plans. If I treated every path the same, the rare cases would get as much screen space as the common one, so I designed the defaults on purpose." },
            { kind: "p", text: "A shared family plan is the default, with a clear way to pick plans per member when someone needs that. Keeping your current plan is the default too, and waiving coverage sits right there on the screen instead of being tucked away. My bet was simple: the most common path should be the shortest, and the less common one should still be one clear step away." },
            { kind: "exhibit", id: "coverage-grid" },
            { kind: "note", label: "What it cost", text: "In a regulated flow a default carries real weight, so I made sure every one stayed visible and easy to change." },
          ],
        },
        {
          id: "engineering",
          rail: "Decision 3: engineering",
          title: "When engineering pushed back",
          blocks: [
            { kind: "p", text: "Engineering pushed back, and they had a fair point. Their model went coverage, then plan, then members, and I was asking them to take the answers in the reverse order." },
            { kind: "p", text: "I didn't want to push the backend's order back onto members, and asking for a full backend rewrite wasn't realistic either. So I walked the team through the order a member makes these decisions in, side by side with the actual complaints from users." },
            { kind: "exhibit", id: "translate-layer" },
            { kind: "p", text: "We landed on a middle path. The UI collects the grid and translates it for the backend, and the backend changes only where translating isn't enough. We split the work and shipped it in phases instead of switching everything over at once." },
            { kind: "note", label: "What it cost", text: "The rollout was slower, but engineering owned the change instead of fighting it." },
          ],
        },
        {
          id: "follow-on",
          rail: "What followed",
          title: "Small things the new order made possible",
          blocks: [
            { kind: "p", text: "Once the questions came in the right order, a few other improvements became possible. These were my calls too." },
            {
              kind: "cards",
              items: [
                { title: "Cost where you decide", body: "A running total on every step, shown per month or per paycheck deduction, instead of a yearly estimate at the very end." },
                { title: "One review page before signing", body: "One page to check everything before a commitment that lasts a year. You can see what changed, edit it right there, and accept the disclaimer and e-sign in the same step." },
                { title: "Documents only when needed", body: "Document upload used to be a fixed step for everyone. Now it only shows up when a member's situation actually needs a document." },
              ],
            },
            { kind: "exhibit", id: "ask-when-needed" },
          ],
        },
        {
          id: "admins",
          rail: "The admin side",
          title: "The members who never open the flow",
          blocks: [
            { kind: "p", text: "Every open enrollment, some members do nothing at all. Admins used to sort them out by hand, one member at a time, and every employer had its own rule for them. Some terminate those members, some carry the current plan forward and some move them to a default plan, sometimes depending on eligibility. All of it landed right at the deadline, where a missed member stays uncovered until the next window." },
            { kind: "p", text: "The business owned those rules. My part was designing how admins set them up, run them and deal with the cases a rule can't decide. Each employer now has a Passive Enrollment tab with four rules written in plain language. Before a run, the admin sees the rule, the file and how many members it will affect, with a plain warning that it can't be undone." },
            { kind: "exhibit", id: "passive-funnel" },
            { kind: "p", text: "Every run leaves a record of who ran it, when, and with which rule and file. The report separates the members who were processed from the ones who need a look, and those come back with a reason and Enroll or Terminate buttons right in the row, so nobody gets lost in the batch. We didn't measure the effort before and after, but a job that used to be done member by member is now a rule each employer sets once." },
            { kind: "exhibit", id: "passive-screens" },
          ],
        },
        {
          id: "outcome",
          rail: "What changed",
          title: "What changed",
          blocks: [
            { kind: "p", text: "The new flow is live in production for open enrollment, life events and new hires, and admins use the same structure when they enroll someone on a member's behalf. It went from 9 steps to 5: Welcome, Profile, Dependents, Coverage and Review." },
            { kind: "metrics" },
            { kind: "p", text: "The complaints that started the redesign have dropped, and admins get through enrolling on someone's behalf faster. To be honest, these are signals we've seen rather than formal measurements, which is something I'd fix next time." },
            { kind: "exhibit", id: "enrollment-screens" },
          ],
        },
        {
          id: "next-time",
          rail: "Next time",
          title: "What I'd do differently",
          blocks: [
            { kind: "p", text: "I'd get evidence in earlier. The redesign was based on feedback from users and business analysts plus my own analysis of the flow, not on watching real members use it. I'd also add tracking to the old flow before changing anything, so I could show the improvement in numbers instead of only describing it." },
            { kind: "p", text: "To be clear about who did what: the reframe, the new order of questions, the family-plan default, the running monthly total and the single review page were my calls. Using one flow structure for every enrollment type was a decision I made with product and engineering, and the business owned the rules behind passive enrollment." },
          ],
        },
      ],
    },
    signals:
      "This project shows how I work: I fixed the order of the decisions instead of the screens, brought engineering round to the member's way of thinking without asking for a rewrite, and chose every default on purpose.",
  },
  /* ------------------------------------------------------------------ 02 */
  {
    slug: "enterprise-platform-from-zero",
    index: "02",
    glyph: "tiers",
    group: "Health insurance platforms",
    title: "Building an enterprise health-insurance platform from zero",
    short: "White-label platform",
    dek: "I was asked to adjust a few screens and found a white-label product with no system underneath, where every new client was a rebuild.",
    meta: {
      role: "Founding UX Designer, now UX Lead",
      context: "Mphasis · US health-insurance platform",
      timeline: "2021–now",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["US health insurance", "Three-tier tokens", "White-label", "Design system adoption"],
    cover: {
      screen: "ds-dashboard",
      alt: "Member dashboard page pattern from the design system: coverage status by family member, claims status, resources, and find care.",
      caption: "A member dashboard pattern from the library. Every client sees it in its own brand.",
    },
    headline: { value: "Under a day", label: "to theme a new client, down from weeks (what the team has seen)" },
    card: { title: "White-label health-insurance platform", widget: "brands", label: "to theme a new client" },
    hook: {
      line: "A new client used to take weeks to set up.",
      turn: "With each client's brand in design tokens, it takes under a day.",
      note: "Illustration in a demo brand, not a client screen.",
      tabsLabel: "Three things that broke with every new client",
      picture: {
        visual: "client-theme",
        title: "A new client, before and after tokens",
        chips: ["Employer B, a new client"],
        before: {
          label: "Before: hardcoded",
          items: ["Brand color hardcoded: the old client's color stays", "Two buttons for the same job", "Rebuilt by hand for each client: weeks"],
        },
        after: {
          label: "With three-tier tokens",
          items: ["Color comes from the client's tokens", "One button, from the system", "Insurer, employer and member, themed in under a day"],
        },
      },
      findings: [
        {
          tab: "The color",
          words: "Brand colors were written straight into the code, so nothing could be re-themed.",
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
      problem: "Every new client was rebuilt by hand because the product had no design system.",
      call: "Turn each client's brand into design tokens, and get engineering to build with them.",
    },
    snapshot: {
      frame: "I was asked for a few screen edits. Underneath them, the product had no design system: colors were hardcoded and every client was rebuilt by hand.",
      decision: "I put each client's brand into three tiers of design tokens and worked with engineering until building with them was the default.",
      outcome: "Theming a new client went from weeks to under a day, and a feature now takes about two days of design and three of build. That's what the team has seen, not a tracked figure.",
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
        { title: "Hardcoded colors", body: "Brand colors lived in the code, so nothing could be re-themed." },
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
        rejected: { label: "Per-client builds", detail: "A separate copy of the look for every insurer and employer." },
        chosen: { label: "Three-tier tokens", detail: "Insurer, then employer, then member. Each tier overrides only what it owns." },
        why: ["A new client becomes configuration, not a project.", "One foundation runs web, mobile web, iOS, and Android."],
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
          { title: "Quality", body: "UX validation catches hardcoded values before a build goes to testing." },
          { title: "Policy", body: "Agreed with the tech lead: the system is the standard." },
        ],
        cost: "Months of enablement and QA before it paid back.",
        exhibit: "adoption-four-sides",
      },
    ],
    followOn: {
      title: "How the work ran",
      items: [
        { title: "Personas", body: "Three to four each for insurers, employers, and members, from stakeholder research." },
        { title: "Workshops first", body: "New ideas went to a workshop with business analysts before design, so the rules were agreed first." },
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
        "A hub of every theme: colors, employers using it, last editor, and draft, default, and locked states.",
        "An editor using the same roles as the tokens, each color saying where it appears.",
        "A preview on the member dashboard, then assignment to employers with their own logo and links.",
        "Drafts, an edit lock showing who's editing, change history, and restore.",
      ],
      impact: [
        "Shipped and used by admins.",
        "Theming a client is one admin task, inside the system.",
        "Colors are checked on a real dashboard before members see them.",
        "Admins don't overwrite each other, and deleted themes come back.",
      ],
      provenance: "Qualitative. Shipped; usage not formally measured.",
      exhibit: "branding-screens",
    },
    outcome: {
      metrics: [
        {
          value: "Under a day",
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
          value: "1 or 2 days",
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
          value: "5 days",
          label: "Per feature: about two days of design and three of build",
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
        "Hardcoded colors and off-system components are caught in UX validation, not in production.",
        "It serves Fortune-500 and enterprise-tier insurers.",
      ],
      provenance: "Team-observed, not formally tracked.",
      exhibit: "design-system-screens",
    },
    ownership: {
      mine: [
        "The reframe, the architecture, and the adoption plan.",
        "I started as the only designer, grew the team to four designers (I hired two), and became UX Lead.",
      ],
      change: [
        "I'd close the gap between the system and its users earlier. Its rationale lived in my head and in a file engineers had to check. Case 03 is how I later closed it.",
      ],
    },
    story: {
      chapters: [
        {
          id: "the-ask",
          rail: "The ask",
          title: "I was asked to change a few screens",
          blocks: [
            { kind: "p", text: "The request was small: adjust a handful of screens. This was 2021, and I was the only designer on the product." },
            { kind: "p", text: "The product was white-label. Insurers resell it to employers, and employers show it to their members, so every level needs its own look. As I went through the screens I'd been asked to change, I kept finding the same problems underneath them." },
            { kind: "exhibit", id: "white-label-chain" },
            { kind: "p", text: "Brand colors were written straight into the code, so nothing could be re-themed. Developers had used different components for the same job on different pages. And every new client meant re-skinning the product by hand, which took weeks." },
            { kind: "reframe", assumed: "Change a few screens.", actual: "Every new client made every change cost more, because there was no system underneath the product." },
          ],
        },
        {
          id: "stakes",
          rail: "Why it mattered",
          title: "The business could only grow as fast as engineering could repaint",
          blocks: [
            { kind: "p", text: "Sales could sign a new insurer or employer, and then that client waited in line for a hand re-skin, one after another. The business could only take on clients as fast as engineering could repaint the product." },
            { kind: "exhibit", id: "growth-ceiling" },
            { kind: "p", text: "There was a quieter risk too. In US health insurance, an eligibility screen that behaves differently from one page to the next is a compliance risk, on top of being confusing. The developers maintaining all this were struggling as well, and editing screens one by one would have left it just as fragile." },
          ],
        },
        {
          id: "foundation",
          rail: "Decision 1: foundation",
          title: "I started underneath the screens",
          blocks: [
            { kind: "p", text: "The edits were what everyone expected, and they would have shown results quickly. But they would have left every future change hand-made and every new client a rebuild." },
            { kind: "exhibit", id: "edits-vs-foundation" },
            { kind: "p", text: "So I started by documenting what already existed: the colors, the components and the different patterns developers were using for the same job. That document turned into the design system. Engineering felt the pain more than anyone, so they became its first users." },
            { kind: "note", label: "What it cost", text: "I was building a foundation nobody had asked for, so it had to prove itself before anyone would rely on it." },
          ],
        },
        {
          id: "tokens",
          rail: "Decision 2: tokens",
          title: "Each client's brand became a set of design tokens",
          blocks: [
            { kind: "p", text: "Each client needed its own identity, and at three levels. Building a separate copy of the look for every insurer and employer would only have multiplied the mess." },
            { kind: "p", text: "So I set up three tiers of design tokens, one for the insurer, one for the employer and one for the member, and each tier overrides only what it owns. A new client stopped being a project and became configuration, and the same foundation runs web, mobile web, iOS and Android." },
            { kind: "exhibit", id: "theme-cascade" },
            { kind: "note", label: "What it cost", text: "Developers could no longer style things directly, and that habit took time to break." },
          ],
        },
        {
          id: "adoption",
          rail: "Decision 3: adoption",
          title: "Getting developers to actually use it",
          blocks: [
            { kind: "p", text: "At first, developers carried on as before. Design tokens were still rare back then, and nobody on the engineering side was eager to work with them. The tech leads weren't against the idea, but they weren't excited about it either, and the developers weren't happy about giving up styling things directly." },
            { kind: "p", text: "So I treated adoption as part of the design work. I didn't want to lecture anyone, so I guided them instead. I'd demo it in Figma, where our tokens lived as color styles: change a style and show every screen change with it, so they could see what it would mean for them in the long run." },
            { kind: "p", text: "Checking whether they'd actually used the tokens was the hard part. There was no tool for it at the time, so I'd open inspect element in the browser and check each color by hand to see whether it pointed to a token or a fixed color. The other giveaway came when we switched a screen to a different client's brand and some colors just didn't change. Those were the hardcoded ones." },
            { kind: "p", text: "Most of these got caught in UX validation, a design check that happens before a build even goes to testing. Between the demos, the usage rules written inside the system, those checks and an agreement with the tech lead that the system is the standard, building with tokens slowly became the default." },
            { kind: "exhibit", id: "adoption-four-sides" },
            { kind: "note", label: "What it cost", text: "It took months of demos and manual checks before it paid back." },
          ],
        },
        {
          id: "how-it-ran",
          rail: "How the work ran",
          title: "How the work actually ran",
          blocks: [
            { kind: "p", text: "I did stakeholder research with all three audiences and wrote three to four personas each for insurers, employers and members. New ideas went to a workshop with business analysts before any design started, so we agreed the rules first, and changes to the system were agreed with engineering before they shipped." },
            { kind: "exhibit", id: "how-work-ran" },
          ],
        },
        {
          id: "branding-hub",
          rail: "Branding Hub",
          title: "The Branding Hub, where admins set each client's brand",
          blocks: [
            { kind: "p", text: "Once brands lived in tokens, someone still had to set those tokens for a lot of employers without breaking what members see, and often several admins were working on themes at the same time. So I designed the Branding Hub, and it's live." },
            { kind: "p", text: "Admins see every theme in one place, with its colors, the employers using it, who edited it last and whether it's a draft, the default or locked. The editor uses the same color roles as the tokens, and each color tells you where it appears. Before assigning a theme to employers, each with their own logo and links, the admin checks it on a real member dashboard." },
            { kind: "p", text: "Because several people edit at once, a theme shows who's editing it and stays locked for everyone else. There's a change history, and deleted themes can be restored. We haven't measured usage formally, but theming a client is now one admin task inside the system instead of an engineering job." },
            { kind: "exhibit", id: "branding-screens" },
          ],
        },
        {
          id: "outcome",
          rail: "What changed",
          title: "What changed",
          blocks: [
            { kind: "p", text: "Theming a new client used to take weeks. Now it takes under a day, and rebranding the white-label iOS and Android apps takes one or two days. Features come in at a predictable pace, about two days of design and three of build. The library has grown past 120 components on one foundation, and it serves Fortune 500 and enterprise insurers." },
            { kind: "metrics" },
            { kind: "p", text: "Hardcoded colors and off-system components now get caught in UX validation instead of in production. To be clear, these numbers are what the team has seen, not figures we formally tracked." },
            { kind: "exhibit", id: "design-system-screens" },
          ],
        },
        {
          id: "next-time",
          rail: "Next time",
          title: "What I'd do differently",
          blocks: [
            { kind: "p", text: "I started as the only designer on this product. Over time I grew the team to four designers, hired two of them myself, and became UX Lead. The reframe, the architecture and the adoption plan were mine." },
            { kind: "p", text: "If I did it again, I'd close the gap between the system and the people using it much earlier. Its reasoning lived in my head and in a file engineers had to remember to check. Case 03 is how I eventually closed that gap." },
          ],
        },
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
      timeline: "Built Aug to Sep 2026",
      domain: "Enterprise SaaS · US health insurance",
    },
    tags: ["Agentic design workflow", "Design systems", "Figma variables", "MCP"],
    headline: { value: "3 or 4 days", label: "from Jira story to engineering-ready screen, down from one or two weeks (what the team has seen)" },
    card: { title: "A design system AI can read", widget: "pipeline", label: "Jira-story turnaround" },
    hook: {
      line: "Our AI tool kept putting Save on the wrong side.",
      turn: "It had no way to know our rules, so I wrote them down. Then its screens matched our product.",
      note: "Illustration in a demo brand, not a client screen.",
      tabsLabel: "Three things the AI got wrong",
      picture: {
        visual: "same-request",
        title: "The same request, given to the AI twice",
        chips: ["Same AI", "Same components"],
        before: {
          label: "Before the skills",
          items: ["Save on the wrong side", "Link in a button color", "Side nav left out: docs said 19 components, the file had 20"],
        },
        after: {
          label: "With the skills",
          items: ["Save on the right", "Link takes the link color", "Side nav in place: audit matched docs to file, 20 of 20"],
        },
      },
      findings: [
        { tab: "The button", words: "", empty: "Button · Description", source: "The old button's description (as I remember it)" },
        { tab: "The color", words: "Not an exact match, but agreed mapping.", quoted: true, source: "The rebuilt system's note on an old color" },
        { tab: "The audit", words: "19 standalone components", quoted: true, source: "The system's index, before the audit (4 Sep 2026)" },
      ],
    },
    opener: {
      label: "Three things the AI got wrong",
      scope: "A six-year-old design system, five client brands, and three platforms, rewritten as files an AI reads before it designs.",
      note: "Illustrations with generic names, not client screens. Quotes come from the skill files.",
      stories: [
        {
          id: "save-side",
          tab: "The button",
          story: "The first one put Save on the left. Every designer here puts it on the right.",
          quoteEmpty: { field: "Button · Description" },
          quoteSource: "The old button's description (as I remember it)",
          visual: "save-side",
          caption: "The habit lived in our heads, and now it's one line the AI reads before every screen.",
        },
        {
          id: "link-colour",
          tab: "The color",
          story: "Our links have one color, and the AI picked another.",
          quote: "Not an exact match, but agreed mapping.",
          quoteSource: "The rebuilt system's note on an old color",
          visual: "link-colour",
          caption: "The old colors were named for how they look, so any could be a link. Now each is named for its job.",
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
      problem: "The six-year-old design system lived in designers' heads, so the AI couldn't follow it.",
      call: "Rewrite it as skill files the AI reads and checks its work against.",
    },
    snapshot: {
      frame: "We were using AI to draft screens, and the drafts didn't match our product. Our design rules lived in designers' heads, so the AI had nothing to follow.",
      decision: "Without being asked, I rewrote the design system as skill files the AI reads before it designs.",
      outcome: "Mockups went from about two days to three or four hours, and Jira stories from one or two weeks to three or four days. Teams beyond mine adopted it too. These are what the team has seen.",
    },
    frame: {
      assumed: "The AI isn't good enough yet.",
      actual: "Our design system was never written down for a machine.",
      body: [
        "Sales demos and handoffs from business analysts to developers both waited on mockups. I brought in AI to speed them up. Its screens weren't usable.",
        "Our Figma system was six years old, with no descriptions. The rules lived in designers' heads, so the AI had components but no rules.",
        "No one had made a veteran system AI-readable. I found no process, so I built one.",
      ],
      exhibit: "rules-in-heads",
    },
    stakes: {
      intro: "Two teams were waiting on fast, on-brand screens.",
      items: [
        { title: "Business analysts and developers", body: "Developers judge feasibility from screens, not specs." },
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
        tension: "An agent needs rules, not a component count: which color for a link, which grid for a page.",
        rejected: { label: "Richer Figma descriptions", detail: "Annotate the file and hope the agent infers the rest." },
        chosen: { label: "Interlocking skill files", detail: "Plain-markdown skills, built up from tokens." },
        why: [
          "One system themes five client brands by mode: semantic color, type by use, a 12-column grid, 43 component sets, 3 density modes, and 141 described variables.",
          "Tokens first, then components that know their tokens, so it stays consistent as it grows.",
        ],
        cost: "More upfront work than annotating what existed.",
        exhibit: "skill-graph",
      },
      {
        id: "structural-correctness",
        title: "I made the AI build from real components and check its own work",
        tension: "Even with tokens, grid, and components written down, the output still broke.",
        rejected: { label: "Accept good-looking output", detail: "Screens that pass a glance but aren't wired to the system." },
        chosen: { label: "Enforce structure", detail: "App shells, a self-checking build workflow, real instances." },
        why: ["Three fixes mattered most:"],
        bullets: [
          { title: "Composition", body: "App shells and a build workflow: pick the shell, use only approved components, run a checklist." },
          { title: "A growing system", body: "The skills say when to reuse, when to add a variant, and when to build new." },
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
          value: "3 or 4 hours",
          label: "New-client and demo mockups",
          before: { label: "about 2 days", amount: 16 },
          after: { label: "3 or 4 hours", amount: 3.5 },
          unit: "working hours",
          visual: "mockup-hours",
        },
        {
          value: "3 or 4 days",
          label: "Jira story to engineering-ready screen, with business analysts",
          before: { label: "1 or 2 weeks", amount: 7.5 },
          after: { label: "3 or 4 days", amount: 3.5 },
          unit: "working days",
          visual: "story-days",
        },
        { value: "About 40%", label: "Less design production time overall", visual: "time-freed" },
        { value: "5 and 3", label: "Client brands and platforms covered by one system", visual: "brand-grid" },
      ],
      points: [
        "All four designers on my team use it, and the org's UAT team chose it for their projects. I didn't have to sell it.",
        "The AI drafts the screens and designers make the decisions. The time saved goes to research, flows, and edge cases.",
        "Built in four to five weeks across five brands and three platforms. I could redo it in one or two.",
      ],
      provenance: "Team-observed figures, recognized by managers, business analysts, and leadership. Not yet in sprint metrics.",
      exhibit: "adoption-spread",
    },
    ownership: {
      mine: [
        "Self-initiated. I built it, proved it, then brought the team in.",
        "I haven't handed it to business analysts yet: they'd likely skip the UX thinking. That's on purpose.",
      ],
      change: ["I'd track before and after from day one, so the gains are measured, not just acknowledged."],
    },
    story: {
      chapters: [
        {
          id: "the-problem",
          rail: "The problem",
          title: "The AI kept drawing screens that didn't look like ours",
          blocks: [
            { kind: "p", text: "Sales demos and handoffs from business analysts to developers both had to wait on mockups, and every mockup drawn by hand pulled a senior designer off product work. So I brought in AI to speed things up. The screens it made weren't usable." },
            { kind: "stories" },
            { kind: "p", text: "Nothing in our Figma file told it otherwise. The system was six years old and its components had no descriptions, so rules like where Save goes or which color a link takes lived only in designers' heads. The AI could read every component we had, but none of our rules." },
            { kind: "exhibit", id: "rules-in-heads" },
            { kind: "reframe", assumed: "The AI isn't good enough yet, so prompt harder.", actual: "Our design system was never written down in a way a machine could follow." },
          ],
        },
        {
          id: "stakes",
          rail: "Who was waiting",
          title: "Two teams were waiting on these screens",
          blocks: [
            { kind: "p", text: "Developers judge whether something is feasible from screens, not from specs, so business analysts couldn't hand over a Jira story until the mockups existed. Sales and marketing needed branded demos for clients, and when those were slow, they slipped in the middle of live sales cycles. Both of these pulled senior designers off product work." },
            { kind: "exhibit", id: "two-loops" },
          ],
        },
        {
          id: "fix-the-system",
          rail: "Decision 1: the system",
          title: "I rewrote the design system instead of tuning prompts",
          blocks: [
            { kind: "p", text: "The expected answers were to wait for better AI, write better prompts, or hire more designers. A better prompt would have been fine if I only had to design one screen, one time. But this was never one scenario. The designers on my team and I would be using it many times a day, for all kinds of screens." },
            { kind: "p", text: "So my gut said the only way was to build a system first, then plug in skills that could give us the right result every time. Nobody had asked for that, and I couldn't find anyone who had made a veteran design system readable by AI, so there was no process to follow. I decided to build one anyway." },
            { kind: "exhibit", id: "prompt-vs-system" },
            { kind: "note", label: "What it cost", text: "Weeks of work nobody had asked for, before it proved itself." },
          ],
        },
        {
          id: "skill-files",
          rail: "Decision 2: skill files",
          title: "I wrote the rules down as skill files, starting from tokens",
          blocks: [
            { kind: "p", text: "An AI agent doesn't need to know how many components you have. It needs the rules, like which color a link takes or which grid a page sits on. I could have added richer descriptions in Figma and hoped the agent worked out the rest, but I wrote the whole system as a set of linked skill files in plain markdown instead." },
            { kind: "p", text: "I started with tokens and built up from there, so every component knows which tokens it uses and the system stays consistent as it grows. One system now themes five client brands through modes, with semantic colors, type named by use, a 12-column grid, 43 component sets, 3 density modes and 141 described variables." },
            { kind: "exhibit", id: "skill-graph" },
            { kind: "note", label: "What it cost", text: "It took more work upfront than annotating what already existed." },
          ],
        },
        {
          id: "check-its-work",
          rail: "Decision 3: real components",
          title: "I made the AI build from real components and check its own work",
          blocks: [
            { kind: "p", text: "Even with the tokens, grid and components written down, the output still broke. The screens looked fine at a glance but weren't actually wired to the system, so I fixed three things." },
            {
              kind: "cards",
              items: [
                { title: "Composition", body: "App shells and a build workflow. The AI picks the shell, uses only approved components and runs a checklist before it's done." },
                { title: "A system that can grow", body: "The skills say when to reuse a component, when to add a variant and when to build something new." },
                { title: "Instances, not redraws", body: "AI agents like to redraw elements from scratch. Now every element is a real instance, which is cheaper and traceable." },
              ],
            },
            { kind: "exhibit", id: "build-screen" },
            { kind: "note", label: "What it cost", text: "First runs got slower, but the output now meets the bar." },
          ],
        },
        {
          id: "portable",
          rail: "Decision 4: portable",
          title: "I kept the skills portable, so any AI tool can use them",
          blocks: [
            { kind: "p", text: "We were using Figma's agent, which was free while it was in beta, and beta pricing ends. So I kept the skill files in plain markdown that any agent can read. They run on Figma's agent today and can move to Claude Code or another agent through a Figma MCP." },
            { kind: "p", text: "I also had to stop the new system drifting the way the old one had. Even with the rules written down, the docs once said 19 components while the file had 20. Unchecked patches like that are how the old system drifted, so now an audit compares the docs with the file every session, and a memory skill carries decisions forward." },
            { kind: "exhibit", id: "portable-skills" },
            { kind: "note", label: "What it cost", text: "There's governance to maintain now: versioned backups and a guide page." },
          ],
        },
        {
          id: "outcome",
          rail: "What changed",
          title: "What changed",
          blocks: [
            { kind: "p", text: "New-client and demo mockups used to take about two days, and now they take three or four hours. Working with business analysts, a Jira story gets to an engineering-ready screen in three or four days instead of one or two weeks. Overall we spend about 40% less time on design production, and one system covers five client brands and three platforms." },
            { kind: "metrics" },
            { kind: "p", text: "The AI drafts the screens and designers make the decisions, and the time we save goes into research, flows and edge cases. All four designers on my team use it, and the organization's UAT team chose it for their projects too, without me having to sell it." },
            { kind: "p", text: "I built it in four to five weeks across five brands and three platforms, and I could do it again in one or two. These figures are what the team has seen. Managers, business analysts and leadership have recognized them, but they're not in our sprint metrics yet." },
            { kind: "exhibit", id: "adoption-spread" },
          ],
        },
        {
          id: "next-time",
          rail: "Next time",
          title: "What I'd do differently",
          blocks: [
            { kind: "p", text: "Nobody asked me to build this. I built it, proved it, then brought the team in. I haven't handed it to business analysts yet, and that's on purpose, because I think they'd likely skip the UX thinking that has to come before the screens." },
            { kind: "p", text: "If I started again, I'd track before and after from day one, so the gains were measured and not just acknowledged." },
          ],
        },
      ],
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
    short: "Blinkwiser AI carousels",
    dek: "The first version took two weeks and made up its own statistics. Over the next two months, building with AI coding agents, I rebuilt it so every number traces to a source and every edit can be undone.",
    meta: {
      role: "Independent lab · product, UX, architecture, evaluation",
      context: "Blinkwiser · built by directing AI coding agents",
      timeline: "Jul 2026–now",
      domain: "AI SaaS · creator tools",
    },
    live: {
      title: "Agentic Carousel by Blinkwiser",
      note: "Free to try. Give it a topic, link, video or file, and agents research, write and design a LinkedIn carousel.",
      links: [{ label: "Try it at carousel.blinkwiser.com", href: "https://carousel.blinkwiser.com/" }],
    },
    tags: ["Agent pipeline", "Grounding", "Eval harness", "AI UX"],
    cover: {
      src: "/work/blinkwiser/landing.webp",
      width: 1600,
      height: 1090,
      alt: "Agentic Carousel by Blinkwiser landing page: 'Carousels that design themselves', a prompt box, and a fan of generated slides in three styles.",
      caption: "Agentic Carousel by Blinkwiser, live: agents research, write, and design a LinkedIn carousel from a topic, link, video, or file.",
    },
    reel: {
      video: "/work/blinkwiser/run.mp4",
      poster: "/work/blinkwiser/run-poster.webp",
      width: 1600,
      height: 800,
      alt: "Screen recording of the studio generating a carousel: each agent step reports in the chat, then the first slides land, marked Draft while the editor is still checking.",
      caption: "One run, sped up three times: each agent step reports in the chat, and the first slides land marked Draft while the checks finish.",
    },
    headline: { value: "7 in 10", label: "blind comparisons won by the rebuild over the first version (my eval harness, AI judge)" },
    card: { title: "Blinkwiser AI carousels", widget: "slides", value: "Plan, write, check", label: "facts checked before you see it" },
    hook: {
      line: "The first version made up its own statistics.",
      turn: "I rebuilt it in two months, so every number traces to a source and every edit can be undone.",
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
      frame: "The model made up numbers, claimed edits it hadn't made, and drifted into generic AI writing. Creators couldn't trust what it produced.",
      decision: "I moved the rules from the prompt into code, made every edit reversible and clear about what changed, and settled trade-offs with blind tests.",
      outcome: "Numbers trace to sources, the chat says what really changed, and every edit can be undone. Live, free, pre-revenue.",
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
        cost: "More calls and more waiting, which forced decision 3.",
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
          "Reasoning off held quality (8.0 against 8.1) and cut a deck from 84 to 31 seconds, at about half the cost.",
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
          value: "7 in 10",
          label: "Blind head-to-heads won by the rebuild over v1",
          viz: { kind: "dots", filled: 7, total: 10, note: "my eval harness · AI judge" },
        },
        {
          value: "9.5 against 8.8",
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
          value: "31 seconds",
          label: "Per carousel, down from 84 seconds, at the same quality",
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
          value: "About 23 seconds",
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
        "Still behind: v1 scores higher on flow, 8.4 against 7.5, and that's what I'm working on next.",
        "Live and free at carousel.blinkwiser.com, with a handful of real users and no revenue yet.",
      ],
      provenance: "Scores come from my own harness and an AI judge, not from users.",
      exhibit: "eval-board",
    },
    ownership: {
      mine: [
        "Product, UX, pipeline architecture, eval design, and every cut.",
        "Built by directing AI coding agents and holding them to tests and evals.",
      ],
      change: [
        "I rebuilt v2 on my own evals before real users told me what mattered. I'd ship to creators earlier and take distribution as seriously as quality.",
      ],
    },
    story: {
      chapters: [
        {
          id: "first-version",
          rail: "The first version",
          title: "The first version made up its own statistics",
          blocks: [
            { kind: "p", text: "The brief was my own: turn a topic into a LinkedIn carousel, fast. I had a first version in beta within two weeks, and the hard part only showed up once people started using it." },
            { kind: "p", text: "The model invented numbers and stated them with confidence. When I asked it to change something, it would reply “I've rewritten the carousel” when nothing had changed. And if you didn't like an edit, the only way back was another chat message." },
            { kind: "reframe", assumed: "Generation is the product.", actual: "People post these carousels under their own name, so every fact has to be right." },
            { kind: "exhibit", id: "trust-questions" },
            { kind: "p", text: "A wrong statistic costs a creator their reputation, and a tool that lies about its own edits can't be trusted with anything else." },
          ],
        },
        {
          id: "stakes",
          rail: "What was at stake",
          title: "Trust, speed and cost all pulled against each other",
          blocks: [
            { kind: "p", text: "Creators publish these under their own name, so accuracy isn't optional. The editor is a chat, so if it misreports a change even once, people stop believing it. But every extra quality step adds time, speed decides who keeps using a tool like this, and for a solo, bootstrapped product the cost of every deck mattered as much as its quality." },
            { kind: "exhibit", id: "quality-steps" },
          ],
        },
        {
          id: "enforce-in-code",
          rail: "Decision 1: code",
          title: "I moved the rules out of the prompt and into code",
          blocks: [
            { kind: "p", text: "Version one relied on prompts. Limits and “don't make things up” were requests, and the model could ignore them. Writing better prompts would only have meant asking more nicely and hoping." },
            { kind: "p", text: "So anything that has to be true is now checked in code. Research turns into a numbered fact sheet, and an outline fixes the slide count and assigns facts to slides. Every number has to trace back to a source or its slide gets downgraded, and a critic and a fact-checker review the deck at the same time." },
            { kind: "exhibit", id: "pipeline" },
            { kind: "note", label: "What it cost", text: "More calls meant more waiting, and that's what forced my third decision." },
          ],
        },
        {
          id: "honest-reversible",
          rail: "Decision 2: honesty",
          title: "Every change is checked and can be undone",
          blocks: [
            { kind: "p", text: "Once the editor became a chat agent, its honesty mattered more than anything else. I could have just shown whatever the agent said it did, but that's exactly what had gone wrong in version one." },
            { kind: "p", text: "Now, when the model claims an edit it didn't make, a guard catches it, tells you what didn't change and tries again. Every change saves a restore point, and restoring one also trims the later turns from the agent's memory." },
            { kind: "exhibit", id: "restore-chat" },
            { kind: "note", label: "What it cost", text: "The conversation model got more complex to build and test." },
          ],
        },
        {
          id: "evidence",
          rail: "Decision 3: blind tests",
          title: "I settled quality versus speed with blind tests",
          blocks: [
            { kind: "p", text: "The rebuild was more accurate, but it was slow, at 84 seconds a deck. I didn't want to pick a setting by feel, so I built a blind eval harness with 10 golden cases, a blind judge and head-to-head comparisons." },
            { kind: "p", text: "The first thing I had to fix was the judge itself, because it was marking correctly sourced numbers as invented. Once the judge was right, the evals showed that turning reasoning off kept the quality almost the same (8.0 against 8.1) and cut a deck from 84 seconds to 31, at about half the cost." },
            { kind: "exhibit", id: "blind-eval" },
            { kind: "note", label: "What it cost", text: "Time I spent measuring instead of building features." },
          ],
        },
        {
          id: "the-cut",
          rail: "Decision 4: the cut",
          title: "I cut finished features to protect the templates",
          blocks: [
            { kind: "p", text: "I'd built a freeform canvas and a looks system with nine styles, plus pickers for fonts and layouts. The more options I added, the more every template looked like every other AI tool." },
            { kind: "p", text: "So I cut them, and kept three templates exactly as designed: The Truth, The Sketch and The Statement." },
            { kind: "exhibit", id: "cut-to-three" },
            { kind: "note", label: "What it cost", text: "I threw away work that was already finished." },
          ],
        },
        {
          id: "outcome",
          rail: "What changed",
          title: "What changed",
          blocks: [
            { kind: "p", text: "In blind head-to-heads, the rebuild beat version one 7 times out of 10. Its claims hold up against their sources better, 9.5 against 8.8, and a carousel takes 31 seconds instead of 84 at the same quality. The first slides show up after about 23 seconds, marked Draft while the checks finish." },
            { kind: "metrics" },
            { kind: "p", text: "Every change saves a restore point, and the chat tells you when an edit didn't happen. It isn't better everywhere, though. Version one still scores higher on flow, 8.4 against 7.5, and that's what I'm working on next." },
            { kind: "p", text: "The carousel builder is live and free at carousel.blinkwiser.com, with a handful of real users and no revenue yet. All of these scores come from my own harness and an AI judge, not from users." },
            { kind: "links" },
            { kind: "exhibit", id: "eval-board" },
          ],
        },
        {
          id: "next-time",
          rail: "Next time",
          title: "What I'd do differently",
          blocks: [
            { kind: "p", text: "The product, the UX, the pipeline architecture, the eval design and every cut were mine. I built it by directing AI coding agents and holding them to tests and evals." },
            { kind: "p", text: "Looking back, I rebuilt version two on my own evals before real users told me what mattered. I'd ship to creators earlier, and I'd take distribution as seriously as quality." },
          ],
        },
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
    title: "Dubai Municipality: turning nine city apps into one",
    short: "Dubai Municipality",
    dek: "Dubai Municipality had nine separate apps, each with its own way of working. As lead designer, onsite for eight months, I designed the one app that replaced them, in Arabic and English, on a low-code platform.",
    meta: {
      role: "Lead UX Designer, onsite in Dubai",
      context: "Mphasis · Dubai Municipality",
      timeline: "2020–2021, eight months",
      domain: "Government · Arabic and English",
    },
    tags: ["Information architecture", "Card sorting", "Stakeholder alignment", "Right-to-left layout", "Low-code platform"],
    cover: {
      src: "/work/dubai/app.webp",
      width: 2400,
      height: 1273,
      full: true,
      alt: "Four screens of the Dubai Municipality app as it looks today: the home screen in English and in Arabic, the Services screen, and the Dashboard tracking every request.",
      caption: "The unified app as it looks today. I don't have my original design files anymore, so every screen on this page is from the live app.",
      note: "Screenshots of the live app, not my original files.",
    },
    headline: { value: "9 apps", label: "brought into one, with one sign-in, one search and one dashboard" },
    card: { title: "Dubai Municipality app", widget: "departments", label: "nine city apps into one" },
    hero: {
      label: "Civic services · Arabic and English",
      brief: "Design a dashboard.",
      problem: "Nine separate apps, with nothing in common and departments slow to share.",
      call: "Design one app that replaces all nine.",
    },
    snapshot: {
      frame: "Dubai Municipality had nine separate apps, each built and run separately, with nothing in common between them.",
      decision: "I went through every app with its stakeholders, let them sort the services themselves in a card sorting workshop, and designed one app with five tabs within what the low-code platform could build, with Arabic as a mirrored template.",
      outcome: "The unified app launched while I was there, with one sign-in, one search and one dashboard for every request, in Arabic and English.",
    },
    frame: {
      assumed: "Design a dashboard.",
      actual: "Design one app that replaces nine apps with nothing in common.",
      body: [
        "I was asked to design a dashboard first, before I had the whole picture.",
        "The Municipality had nine separate apps, each built and run separately.",
      ],
      exhibit: "dm-nine-into-one",
    },
    stakes: {
      items: [
        { title: "Nine apps, nothing shared", body: "Each app had its own screens and its own way of working." },
        { title: "Information in many places", body: "Each app had its own stakeholders and its own documents." },
        { title: "Many reviewers", body: "Every design went through several rounds of review." },
        { title: "Built on a low-code platform", body: "The platform limited layouts, maps, images, styling and animation." },
      ],
    },
    forks: [
      {
        id: "card-sort",
        title: "I let the stakeholders build the groups",
        tension: "Every department had its own view of where its services belonged.",
        rejected: { label: "Decide the groups alone", detail: "Groups the departments would argue over." },
        chosen: { label: "A card sorting workshop", detail: "Stakeholders placed every service into a section." },
        why: ["The logical groups came out of the workshop, and that helped with the business side."],
        cost: "More workshop time before any screen was final.",
        exhibit: "dm-card-sort",
      },
      {
        id: "mendix",
        title: "I designed workarounds the platform could take in",
        tension: "The low-code platform limited layouts, maps, image imports, styling and animation.",
        rejected: { label: "Design the ideal", detail: "Screens the platform couldn't build." },
        chosen: { label: "Workarounds", detail: "Designs the developers could build, like animations delivered as SVG files." },
        why: ["Where the platform couldn't do something, I handed the developers something it could use."],
        cost: "Some designs had to be reworked to fit what the platform could build.",
        exhibit: "dm-mendix",
      },
      {
        id: "rtl-template",
        title: "Arabic came from one template rule",
        tension: "Every screen had to work in Arabic and English.",
        rejected: { label: "Design every screen twice", detail: "A separate Arabic design for each screen." },
        chosen: { label: "A right-to-left template", detail: "English as the primary design, Arabic mirrored by a rule the developers applied." },
        why: ["No screen had to be redesigned for Arabic."],
        cost: "The rule had to hold for every screen the developers built.",
        exhibit: "dm-rtl-template",
      },
    ],
    outcome: {
      metrics: [
        { value: "9 apps", label: "Brought into one app", visual: "dm-apps" },
        { value: "5 tabs", label: "Home, Dashboard, Services, Media Center and More", visual: "dm-tabs" },
        { value: "8 months", label: "Onsite in Dubai as lead designer, through to launch", visual: "dm-months" },
        { value: "2 languages", label: "English designed first, Arabic as a mirrored template", visual: "dm-rtl" },
      ],
      points: [
        "The unified app launched while I was there.",
        "One sign-in, one search and one dashboard for every request, in Arabic and English.",
      ],
      provenance: "I have no usage figures from this project, and the screens shown are from the live app today.",
    },
    ownership: {
      mine: [
        "Lead designer onsite, with two junior designers in India. I designed the five-tab structure, the dashboard, the home screen and how the services are grouped, and presented every design myself.",
      ],
      change: [
        "I'd do more research with the residents and citizens of Dubai, and build the app one feature at a time.",
      ],
    },
    signals: "Making one structure out of nine unrelated apps, getting split stakeholders to build the groups themselves, and designing within a low-code platform.",
    story: {
      chapters: [
        {
          id: "the-test",
          rail: "The test",
          title: "I was handed one screen before the whole picture",
          blocks: [
            { kind: "p", text: "In my first days at Dubai Municipality, onsite in Dubai, I was asked to design a dashboard. The brief was simple, and I knew it was also a test of what I could do. What I didn't have yet was the whole picture." },
            { kind: "p", text: "The Municipality had nine separate apps, and each one came from a different part of the organization. Dubai 24/7 took complaints and requests, Green Ticket booked visits to service centers, Montaji checked consumer products, Dubai BPS tracked building permits, and the rest covered Al Mamzar Beach Park, parks and beaches, Dubai Frame, the Quranic Park and a dictionary of local Arabic terms." },
            { kind: "exhibit", id: "dm-nine-into-one" },
            { kind: "p", text: "So before I could design one dashboard for all of them, I had to understand every one of them." },
          ],
        },
        {
          id: "nine-apps",
          rail: "Nine apps",
          title: "Nine apps, and nothing in common",
          blocks: [
            { kind: "p", text: "Getting that understanding took time. Every app had its own stakeholders and its own documents, so I went app by app. I spoke with each department's stakeholders, read the documents they had, and gathered the details one piece at a time." },
            { kind: "p", text: "What I found was that the nine apps had nothing in common. Each had its own screens, its own way of doing things and its own idea of what a user needed. There was no shared pattern to build on, so the common structure was something I had to design from scratch." },
            { kind: "note", label: "My role", text: "Lead designer, onsite in Dubai for eight months, with two junior designers working from India. Every day I worked with the developers, business analysts, the project manager and the department stakeholders, and I presented every design myself." },
          ],
        },
        {
          id: "five-tabs",
          rail: "Five tabs",
          title: "Many structures before five tabs",
          blocks: [
            { kind: "p", text: "I tried a lot of structures for the app before one held up. The one that worked has five tabs: Home, Dashboard, Services, Media Center and More." },
            { kind: "p", text: "Dashboard grew out of that first test. It's one place for alerts, appointments and spending, and for every request a person has made, whether it's in progress, completed, canceled or waiting for payment. Home opens with “How can I help you?” and a voice search. The voice search was the client's idea, and my job was to make it work as the front door of the app." },
            { kind: "image", src: "/work/dubai/dm-dashboard.webp", alt: "The Dashboard tab of the live app: alerts, upcoming appointments, spending, the Bunyan Card, and My Requests and Submissions with counts for total, in progress, completed, canceled and payment pending.", width: 760, height: 1518, caption: "The Dashboard: every request and its status in one place.", note: "The live app today, not my original files.", narrow: true },
          ],
        },
        {
          id: "card-sort",
          rail: "Card sorting",
          title: "I let the stakeholders build the groups",
          blocks: [
            { kind: "p", text: "The hardest part of the structure was the services. There were a lot of them, coming from nine apps and many departments, and every department had its own view of where its services belonged." },
            { kind: "p", text: "So instead of deciding the groups on my own, I ran a card sorting workshop. I brought a few stakeholders together, gave them the services as cards and asked them to place each card in a section. The logical groups came out of that exercise, and it helped a lot on the business side, because the groups came from the stakeholders themselves." },
            { kind: "exhibit", id: "dm-card-sort" },
            { kind: "p", text: "Today the Services tab opens with trending services and then groups the rest by topic, like Land, Building and Construction." },
            { kind: "image", src: "/work/dubai/dm-services.webp", alt: "The Services tab of the live app: Individual Services, with Trending Services first and then a Land, Building and Construction group.", width: 760, height: 1518, caption: "The Services tab: trending services first, then groups by topic.", note: "The live app today, not my original files.", narrow: true },
          ],
        },
        {
          id: "mendix",
          rail: "Low-code limits",
          title: "Designing within a low-code platform",
          blocks: [
            { kind: "p", text: "The app was built on a low-code platform, and it came with a lot of limits. It restricted the layouts we could use, it couldn't bring in things like maps, image imports were limited, and so was the styling." },
            { kind: "p", text: "So a big part of my job was designing workarounds the developers could actually take in. Animation is a good example. The platform couldn't handle it, so I made the animations myself as SVG files and handed those over, and the app could use them as they were." },
            { kind: "exhibit", id: "dm-mendix" },
            { kind: "note", label: "What it cost", text: "Some of what I designed had to be reworked to fit what the platform could build." },
          ],
        },
        {
          id: "two-languages",
          rail: "Two languages",
          title: "One layout for Arabic and English",
          blocks: [
            { kind: "p", text: "The app had to work fully in Arabic and English. English was always the primary design, and I set up Arabic as a template. The right-to-left layout followed a rule the developers applied, so I didn't have to redesign every screen for Arabic." },
            { kind: "exhibit", id: "dm-rtl-template" },
            { kind: "image", src: "/work/dubai/dm-home-en-ar.webp", alt: "The home screen of the live app in English and in Arabic side by side: the same voice search, quick actions, Check and pay section and tab bar, mirrored right to left in Arabic.", width: 1399, height: 1442, caption: "The home screen in English and Arabic: the same layout, mirrored.", note: "The live app today, not my original files." },
          ],
        },
        {
          id: "approval",
          rail: "Reviews",
          title: "Every design went through many reviews",
          blocks: [
            { kind: "p", text: "With so many departments involved, every design went through several rounds of review. I presented the designs myself each time and worked through the feedback until we had sign-off." },
          ],
        },
        {
          id: "outcome",
          rail: "What shipped",
          title: "What shipped",
          blocks: [
            { kind: "p", text: "The unified app launched while I was there. Nine separate apps became one, with one sign-in, one search and one dashboard for every request, and Arabic and English on the same layout." },
            { kind: "metrics" },
            { kind: "p", text: "I'm proud of the design and of bringing nine apps into one. The live app has changed since 2021, so what you see today isn't exactly what I designed. I don't have usage figures from this project, and the screens here are from the live app, since I don't have my original design files anymore." },
          ],
        },
        {
          id: "next-time",
          rail: "Next time",
          title: "What I'd do differently",
          blocks: [
            { kind: "p", text: "I'd do a lot more research, and with the people the app is really for: the residents and citizens of Dubai, not just the departments. I'd also build it one feature at a time and give each feature enough time to be done properly." },
            { kind: "p", text: "If I were asked to rebuild it today, I'd be happy to, and I'd build it in React." },
          ],
        },
      ],
    },
  },
  {
    slug: "jet-airways-booking",
    index: "06",
    glyph: "flow",
    group: "Consumer e-commerce",
    title: "Jet Airways: booking a flight, from fare to payment",
    short: "Jet Airways booking",
    dek: "Five fares per flight, add-ons to sell, and three platforms to cover. I designed how people choose a fare, see the full price, and add extras, on web, iOS, and Android.",
    meta: {
      role: "UX Designer, on a larger team",
      context: "Mphasis · Jet Airways",
      timeline: "2015–2019",
      domain: "Airline e-commerce · web, iOS, Android",
    },
    tags: ["E-commerce checkout", "Pricing clarity", "Upsell and add-ons", "Responsive design"],
    cover: {
      src: "/work/jet/overview.webp",
      width: 2321,
      height: 1782,
      full: true,
      alt: "Jet Airways booking screens: the desktop fare grid with five fares per flight, the JetBistro meal picker, and the mobile flight list with one flight opened to show its fares.",
      caption: "The booking flow as it shipped: the fare grid on desktop, the same choice as a list on mobile, and meals picked per passenger.",
      note: "Real screens from the shipped product, from my own files.",
    },
    headline: { value: "", label: "Booking on web, iOS, and Android, live until the airline closed in 2019" },
    hook: {
      line: "Five fares per flight don't fit on a phone.",
      turn: "So on mobile, each flight opens to show its fares as a list.",
      note: "Illustration with demo content, not the airline's screens. The real screens are shown below.",
      tabsLabel: "Three things a shrunk grid gets wrong",
      picture: {
        visual: "fare-choice",
        title: "Choosing a fare on a phone",
        chips: ["Same five fares", "Same flight"],
        before: {
          label: "The desktop grid, shrunk",
          items: ["Five fare columns squeezed side by side", "Prices too small to compare", "No room for seats left or the saving"],
        },
        after: {
          label: "Tap a flight, then pick a fare",
          items: ["One flight opens at a time", "Each fare gets a full-width row", "Seats left and the old price sit with the fare"],
        },
      },
      findings: [
        { tab: "The columns", words: "A grid that works on a wide screen turns into five narrow columns on a phone.", source: "Why mobile needed its own layout" },
        { tab: "The prices", words: "People choose a fare by price, so the price has to be easy to read.", source: "What the list fixes" },
        { tab: "The details", words: "Seats left and the price before discount help people decide, and need room.", source: "What the list makes room for" },
      ],
    },
    hero: {
      label: "Airline e-commerce",
      brief: "Design the booking screens.",
      problem: "Five fares, add-ons, and three platforms made one booking a lot of choices.",
      call: "Make each choice clear: the fare, the full price, and the extras.",
    },
    snapshot: {
      frame: "Booking a flight meant choosing between five fares per flight, then adding extras, on web, iOS, and Android.",
      decision: "I designed a fare grid for desktop and a list for mobile, a full price breakdown, one step for every add-on, and the upgrade offer inside the fare choice.",
      outcome: "Shipped on web, iOS, and Android on a shared component library, and live until the airline closed in 2019.",
    },
    frame: {
      assumed: "Design the booking screens.",
      actual: "Help people choose a fare they understand, on any screen, with no surprises at payment.",
      body: [
        "I worked on Jet Airways' booking for four years, on a larger design team. There was no single brief: the work came in pieces, across the whole journey.",
        "The journey ran Search, Flights, Guests, Extras, Pay. This case covers four calls I made along it.",
      ],
      exhibit: "jet-journey",
    },
    stakes: {
      items: [
        { title: "Many choices at once", body: "Each flight came in five fares, plus a business-class option." },
        { title: "Price decides", body: "People compare fares by price, so every number has to be clear." },
        { title: "Extras matter to the airline", body: "Meals, seats, baggage, and insurance were sold during booking." },
        { title: "Three platforms", body: "Web, iOS, and Android had to offer the same choices, each in a way that fits the screen." },
      ],
    },
    forks: [
      {
        id: "grid-and-list",
        title: "I kept the fare grid on desktop and turned it into a list on mobile",
        tension: "The grid works on a wide screen. On a phone, five fare columns don't fit.",
        rejected: { label: "One layout everywhere", detail: "Shrink the grid to fit the phone." },
        chosen: { label: "A grid on desktop, a list on mobile", detail: "Each flight opens to show its fares as full-width rows." },
        why: [
          "On desktop, people compare flights and fares at a glance in one grid.",
          "On a phone, one flight opens at a time, so every fare has room for its price, the old price, and seats left.",
        ],
        cost: "Two layouts for the same choice, to design and keep in step.",
        exhibit: "grid-vs-list",
      },
      {
        id: "full-price",
        title: "I showed the full price, broken down, while people choose",
        tension: "One total is simpler to show. It also hides what the money is for.",
        rejected: { label: "Total only", detail: "One number, explained later, if at all." },
        chosen: { label: "The total, broken down", detail: "Fare, tax, fees, and discount in a trip summary beside the flights." },
        why: [
          "The trip summary sits next to the fare choice, so people see what they'll pay before they move on.",
          "Every fee has a line of its own, so the total at payment isn't a surprise.",
        ],
        cost: "A longer summary panel, competing with the flight list for space.",
        exhibit: "total-vs-breakdown",
      },
      {
        id: "extras-step",
        title: "I put every add-on in one step before payment",
        tension: "Each add-on could have been its own step, or a pop-up along the way.",
        rejected: { label: "Add-ons spread through the flow", detail: "A step or a pop-up for each one." },
        chosen: { label: "One Extras step", detail: "Meals, seats, baggage, priority, miles, and insurance, in one list before pay." },
        why: [
          "People see every add-on once, choose what they want, and move on.",
          "Meals are chosen per passenger and per flight, with filters such as veg, hot meals, and snacks.",
        ],
        cost: "One longer step, so each add-on stays closed until someone opens it.",
        exhibit: "extras-one-step",
      },
      {
        id: "upsell-inline",
        title: "I put the business-class offer inside the fare choice",
        tension: "Upgrades are often sold with a pop-up that interrupts the choice.",
        rejected: { label: "A pop-up offer", detail: "Stops people mid-choice to sell the upgrade." },
        chosen: { label: "An offer in place", detail: "Shown under the chosen fare, with what it adds and how much more it costs." },
        why: [
          "The offer appears where people are already comparing, in the same terms: what you get and the price difference.",
          "Saying no takes no extra click.",
        ],
        cost: "Quieter than a pop-up, so the offer has to win on what it shows: wider seats and better meals.",
        exhibit: "upsell-inline",
      },
    ],
    outcome: {
      metrics: [
        {
          value: "3 platforms",
          label: "Web, iOS, and Android, on a shared component library",
          visual: "jet-platforms",
        },
        {
          value: "5 steps",
          label: "Search, flights, guests, extras, pay",
          visual: "jet-steps",
        },
        {
          value: "6 add-ons",
          label: "In one step before payment",
          visual: "jet-extras",
        },
        {
          value: "Until 2019",
          label: "Live in production until the airline closed",
          visual: "jet-years",
        },
      ],
      points: [
        "Built on a shared component library, so web, iOS, and Android offered the same choices.",
        "The same choices worked on desktop and on a phone, each laid out for its screen.",
      ],
      provenance: "This was between 2015 and 2019, and I have no figures from it. These are what we designed and shipped.",
      exhibit: "jet-screens",
    },
    ownership: {
      mine: [
        "The four calls above: the grid and the mobile list, the price breakdown, the single Extras step, and the in-place upgrade offer.",
      ],
      shared: [
        "I was on a larger design team for the airline's digital products. Other designers on the team owned the rest of the journey.",
      ],
      change: [
        "I'd measure as I went: how many people picked each fare, and how many added extras, so the work could be judged by numbers.",
        "I'd watch people book on a phone, not just review the screens.",
      ],
    },
    story: {
      chapters: [
        {
          id: "the-work",
          rail: "The work",
          title: "Four years on an airline's booking flow",
          blocks: [
            { kind: "p", text: "I worked on Jet Airways' booking for four years, as one of the designers on a larger team. There was no single brief. The work came in pieces, across the whole journey from search to payment." },
            { kind: "p", text: "The journey ran Search, Flights, Guests, Extras and Pay. Each flight came in five fares, plus a business-class option, and meals, seats, baggage and insurance were sold along the way, on web, iOS and Android. People compare fares by price, so every number had to be clear, and the airline needed the extras to sell. This case covers four calls I made along that journey." },
            { kind: "exhibit", id: "jet-journey" },
            { kind: "reframe", assumed: "Design the booking screens.", actual: "Help people choose a fare they understand, on any screen, with no surprises at payment." },
          ],
        },
        {
          id: "grid-and-list",
          rail: "Decision 1: grid and list",
          title: "Five fares don't fit on a phone",
          blocks: [
            { kind: "p", text: "On a wide screen the fare grid works well, and people can compare flights and fares at a glance. On a phone, the same grid turns into five narrow columns, with prices too small to compare and no room for anything else." },
            { kind: "p", text: "So I kept the grid on desktop and turned it into a list on mobile. You tap a flight, it opens, and each fare gets a full-width row with room for its price, the old price and how many seats are left." },
            { kind: "exhibit", id: "grid-vs-list" },
            { kind: "note", label: "What it cost", text: "Two layouts for the same choice, which we had to design and keep in step." },
          ],
        },
        {
          id: "full-price",
          rail: "Decision 2: full price",
          title: "I showed the full price, broken down, while people choose",
          blocks: [
            { kind: "p", text: "Showing one total would have been simpler, but it also hides what the money is for. So the trip summary sits right next to the fare choice, with the fare, tax, fees and discount each on a line of its own. People see what they'll pay before they move on, and the total at payment isn't a surprise." },
            { kind: "exhibit", id: "total-vs-breakdown" },
            { kind: "note", label: "What it cost", text: "A longer summary panel, competing with the flight list for space." },
          ],
        },
        {
          id: "extras-step",
          rail: "Decision 3: extras",
          title: "Every add-on in one step before payment",
          blocks: [
            { kind: "p", text: "Each add-on could have had its own step, or popped up somewhere along the way. Instead I put meals, seats, baggage, priority, miles and insurance into one Extras step just before payment, so people see every add-on once, pick what they want and move on." },
            { kind: "p", text: "Meals are chosen per passenger and per flight, with filters like veg, hot meals and snacks." },
            { kind: "exhibit", id: "extras-one-step" },
            { kind: "note", label: "What it cost", text: "It made one longer step, so each add-on stays closed until someone opens it." },
          ],
        },
        {
          id: "upsell",
          rail: "Decision 4: the upgrade",
          title: "The business-class offer sits inside the fare choice",
          blocks: [
            { kind: "p", text: "Upgrades are often sold with a pop-up that interrupts you mid-choice. I put the offer under the chosen fare instead, showing what it adds and how much more it costs, in the same terms people were already comparing. Saying no takes no extra click." },
            { kind: "exhibit", id: "upsell-inline" },
            { kind: "note", label: "What it cost", text: "It's quieter than a pop-up, so the offer has to win on what it shows: wider seats and better meals." },
          ],
        },
        {
          id: "outcome",
          rail: "What shipped",
          title: "What shipped",
          blocks: [
            { kind: "p", text: "The booking flow shipped on web, iOS and Android, built on a shared component library so all three offered the same choices, each laid out for its own screen. It stayed live until the airline closed in 2019." },
            { kind: "metrics" },
            { kind: "p", text: "This was between 2015 and 2019, and I don't have figures from it. What you see here is what we designed and shipped, taken from my own files." },
            { kind: "exhibit", id: "jet-screens" },
          ],
        },
        {
          id: "next-time",
          rail: "Next time",
          title: "What I'd do differently",
          blocks: [
            { kind: "p", text: "The four calls in this case were mine: the grid and the mobile list, the price breakdown, the single Extras step and the in-place upgrade offer. Other designers on the team owned the rest of the journey." },
            { kind: "p", text: "If I did it again, I'd measure as I went, like how many people picked each fare and how many added extras, so the work could be judged by numbers. And I'd watch people book on a phone, not just review the screens." },
          ],
        },
      ],
    },
    signals: "Pricing people can trust, choices that fit the screen, and selling without getting in the way.",
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
