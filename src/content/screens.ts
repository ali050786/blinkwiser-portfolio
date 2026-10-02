import type { Shot } from "./types";

/*
 * Product screens rebuilt in HTML from the working design files
 * (components/screens). Layout and content follow the real screens; the brand
 * is a demo brand and every name, plan and figure is invented.
 */

export type ScreenStage = {
  id: string;
  /** Tab label */
  label: string;
  /** One line on what changed at this stage */
  change: string;
  before?: Shot[];
  after: Shot[];
};

const shot = (screen: Shot["screen"], alt: string, caption?: string): Shot => ({ screen, alt, caption });

/** Life-event enrollment, the old flow against the redesign, stage by stage. */
export const enrollmentStages: ScreenStage[] = [
  {
    id: "household",
    label: "Who's covered",
    change:
      "Before, the household was a list of names, and who each coverage applied to came later, once per coverage. After, one grid answers who needs medical, dental and vision for the whole family, up front.",
    before: [
      shot("old-household", "Old flow: a dependents list showing three family members by name, with no coverage information.", "A list of names. Who is covered by what is asked later."),
    ],
    after: [
      shot("new-household", "New flow: each family member as a row with checkboxes for Medical, Dental, Vision and Supplemental.", "Family against coverage, answered once."),
    ],
  },
  {
    id: "plans",
    label: "Choosing plans",
    change:
      "Before, a coverage hub sent members into each coverage, where they picked a plan and then chose again who it covered. After, plan selection reads the grid: the plan page already knows who it covers, and a shared family plan is the default.",
    before: [
      shot("old-coverage-hub", "Old flow: a coverage hub listing Medical, Dental and Vision, each with an Update button.", "The hub. Each coverage is its own loop."),
      shot("old-who-again", "Old flow: inside the medical plan, a list of family members with Add and Remove buttons.", "Inside every coverage: choose who it covers, again."),
    ],
    after: [
      shot("new-plan", "New flow: Select a Plan for Medical, showing Coverage Includes: Family with names already filled in, and plan cards priced per month.", "Coverage already known. Plans priced per month. Per-member plans one click away."),
    ],
  },
  {
    id: "cost",
    label: "Seeing the cost",
    change:
      "Before, each plan showed an annual premium described as an estimate that could still change. After, every price is per month, each coverage shows its own total and who it covers, and a running total sits at the top of every step.",
    before: [
      shot("old-plan-list", "Old flow: plan list for vision, each plan showing an annual premium.", "Annual premiums, an estimate until the end."),
    ],
    after: [
      shot("new-coverage", "New flow: Select Coverages summary with a total premium per month for each coverage and the members it covers, and a running total in the page header.", "Per-month totals by coverage, plus a running total on every step."),
    ],
  },
  {
    id: "review",
    label: "Review",
    change:
      "Both flows end in a review. The new one is the single place to check a year-long commitment: profile, dependents with what changed flagged, coverage by member with monthly cost, and an Update on every section.",
    before: [
      shot("old-review", "Old flow: review page with member details, one dependent and coverage cards showing annual premiums.", "Annual figures, coverage per plan rather than per member."),
    ],
    after: [
      shot("new-review", "New flow: review page with profile tabs, dependents flagged as newly added or to be terminated, and coverage grouped by type with members and monthly costs.", "Changes flagged, cost by member, every section editable in place."),
    ],
  },
];

/** The platform's design system, rebuilt from the working library. */
export const designSystemStages: ScreenStage[] = [
  {
    id: "tokens",
    label: "Theme tokens",
    change:
      "Theme colours are named by role, not by value: Primary, Secondary, Text, Background, each with an opacity ramp. Swap a client's brand values and every screen follows.",
    after: [shot("ds-tokens", "Design system colour page: theme colours, feedback colours and tint ramps, all named by role.")],
  },
  {
    id: "components",
    label: "Components",
    change: "Every component documents its variations, emphasis levels, sizes and states, so engineering builds each state once instead of improvising it per page.",
    after: [shot("ds-buttons", "Design system button page: variations, emphasis levels, sizes, and default, hover, focus and disabled states.")],
  },
  {
    id: "domain",
    label: "Domain components",
    change:
      "Health-insurance patterns become components too. The enrollment product card carries plan, networks, deductibles and premium, with default, selected, current and current-selected states.",
    after: [shot("ds-product-card", "Design system product card for enrollment, with its four states.")],
  },
  {
    id: "pattern",
    label: "Page patterns",
    change: "Pages start from patterns, not blank frames. The member dashboard assembles coverage status, claims, resources and find-care from library components.",
    after: [shot("ds-dashboard", "Member dashboard page pattern: coverage status by family member, claims status, resources and find care.")],
  },
];

/** Passive enrollment: the rule, the run, and the exceptions. */
export const passiveStages: ScreenStage[] = [
  {
    id: "rule",
    label: "Pick the rule",
    change:
      "Each client picks one of four rules for members who don't act, in plain language, with the options that rule needs: a termination reason, or a default-plan file. Excluding members with supplemental products is a single checkbox.",
    after: [shot("pe-rule", "Passive enrollment settings: coverage effective date, four rules as radio options with descriptions, termination status and reason, an exclude-supplemental checkbox, and a utility log.")],
  },
  {
    id: "confirm",
    label: "Confirm the run",
    change: "Before anything changes, the admin is told exactly how many members the run will touch, and has to confirm.",
    after: [shot("pe-confirm", "Confirmation dialog naming the rule, the file and the number of members affected.")],
  },
  {
    id: "running",
    label: "Locked while running",
    change:
      "While a run is in progress the settings are read-only and say why: two runs can't touch the same members. The log shows the run in progress next to every past run.",
    after: [shot("pe-running", "Settings disabled during a run, with an uploaded default-plan file, a 'utility running' notice and the run listed as in progress.")],
  },
  {
    id: "report",
    label: "Review exceptions",
    change:
      "Every run ends in a report: who ran it, which rule and file, how many members were processed, and a list of the ones that couldn't be, each with a reason and Enroll or Terminate right in the row.",
    after: [shot("pe-report", "Run report with summary figures and a table of members needing manual review, each with a reason and Enroll or Terminate actions.")],
  },
];

/** The Branding Hub: the token tiers as a tool admins use. */
export const brandingStages: ScreenStage[] = [
  {
    id: "hub",
    label: "Theme hub",
    change:
      "Every member-facing theme in one place, with its colours, how many employers use it and who edited it last. Drafts, defaults and themes someone else is editing are marked, so two admins don't overwrite each other.",
    after: [shot("bh-hub", "Branding hub listing themes as cards with colour chips, employer counts, draft, default and locked states.")],
  },
  {
    id: "editor",
    label: "Theme editor",
    change:
      "The same roles as the design tokens, in admin language. Each colour field says where it shows up, so admins choose by role instead of guessing what a hex code will change.",
    after: [shot("bh-editor", "Theme editor with name, font, twelve role-named colour fields each with a usage description, employer assignment, and save or publish.")],
  },
  {
    id: "preview",
    label: "Preview",
    change: "Before publishing, the theme is applied to a real member dashboard, so admins judge the result, not the swatches.",
    after: [shot("bh-preview", "Preview of the member dashboard in the new theme's colours.")],
  },
  {
    id: "assign",
    label: "Assign employers",
    change: "A theme goes live for the employers it's assigned to. Each employer then gets its own logo, links, contacts and resources on top.",
    after: [shot("bh-assign", "Dialog for assigning employers to a theme, with search and checkboxes.")],
  },
];
