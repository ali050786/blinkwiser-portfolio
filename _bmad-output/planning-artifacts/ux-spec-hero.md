# UX Spec: Homepage Hero

- **Product:** Sikandar Ali portfolio, homepage hero
- **Version:** 1.8 · **Status:** Final · **Date:** 2026-10-02
- **Workflow:** CU, UX spec (UX designer Sally), Fast path
- **Upstream inputs:** `hero-brainstorm.md` (Final, v1.2), `resume-brainstorm.md` (Final), current code (`src/components/home/Hero.tsx`, `HeroShell.tsx`, `src/styles/tokens.css`, `src/content/site.ts`)

---

> **v1.4 changes (2026-10-02, after a hiring-panel party mode):** the hero visual is now the **marked-up brief** (section 5B), replacing the timeline. Sikandar wanted a visual, not a type-only hero; the panel's concern was that the timeline restated the résumé.
>
> **v1.3 changes (2026-10-02, Sikandar's Figma layout):** the wave is replaced by a **straight horizontal timeline** (section 5T). Top layout: status chip; headline full width (natural wrap, no balancing); intro paragraph full width with new copy ("I bring 11 years in enterprise UX, …"); the two actions (Read the case studies, Get in touch) below the paragraph, left-aligned, side by side, no arrow icons; generous space; timeline; facts row. Sections 5R and the wave parts of 5 are superseded.
>
> **v1.1 changes (2026-10-02, after review of the first build):** stacked layout (headline across the top, wide wave below); AI becomes its own dip, the deepest, in the accent colour; the rest state shows every brief, fix and result without hover; hover only highlights a dip and adds "Read case"; facts row moves below the wave. Where this note and an older section below disagree, this note and section 5R win.

## 1. Goal
Pass the **10-second, no-reading test** for two primary readers:
- **Health-tech hiring manager / VP:** "senior, consistent judgement, goes below the brief, ships at scale."
- **Design-engineering / AI team:** "makes systems AI can actually use."
- **Recruiter:** finds level, domain, location and resume without hunting.

## 2. What changes
| Area | Now | New |
|---|---|---|
| Headline | Designing the systems that make complex products feel *simple*. | I make complex products *simple* for people and readable for AI. |
| Intro paragraph | (as is) | **Unchanged** |
| Right side | `ReframeDeck`, 5-tab case carousel | **`CareerWave`**, one line, four chapters, latest first |
| CTAs | Read the case studies · Get in touch | Read the case studies · **Resume** · Get in touch (see 4.3) |
| Facts row | Now · Domain · Led · Building | adds **Based in** |

Out of scope: stats strip, work index, How I work, Contact (unchanged in this spec).

## 3. Layout
Uses `HeroShell` `layout="split"`, `titleSize="l"`; the wave goes in the existing `visual` slot.

| Breakpoint | Layout | Wave |
|---|---|---|
| > 1024px | Copy left, wave right (existing grid) | Horizontal, ~420 × 230 viewBox, scales to column width |
| 761–1024px | Existing tablet rules | Horizontal, full column width; labels must not overlap (min 11px) |
| ≤ 760px | Stacked: copy, then wave | **Vertical wave** (see 5.6) |

## 4. Left column

### 4.1 Headline
- Copy: `I make complex products <em class="t-serif-em">simple</em> for people and readable for AI.`
- Size `t-display-l`. **Must wrap to ≤ 3 lines** at 1280px and ≤ 5 lines at 375px. Keep the existing SplitText line reveal.

### 4.2 Intro paragraph
Unchanged. Its last phrase, "one level below the brief", is echoed by the wave's surface label.

### 4.3 Calls to action
- Primary: **Read the case studies** → `/#work` (unchanged)
- Secondary: **Resume** → `site.resumeUrl` (`/resume`), icon `arrow-up-right`
- **Get in touch** → `/#contact`: a tertiary text link after the buttons, so the row holds at most two button shapes.

### 4.4 Facts row
Now · Domain · Led · Building · **Based in: Pune, India** (from `site.location`). No time-zone or relocation line.

## 5. CareerWave component

### 5.1 Anatomy
1. **Surface line**: dashed horizontal rule. Labels: "the brief" above, "one level down" below (mono, `t-label`, tertiary).
2. **Wave path**: one continuous stroke, 1.7px, `--text-primary`.
3. **Start point (AI, now)**: filled accent dot (`--accent-solid`) at the left end, labelled "AI" with "now" above.
4. **Three dips**, left to right (latest first), each deeper than the next:

| Chapter | Depth | At rest (number) | Brief (struck) | Fix (one level down) |
|---|---|---|---|---|
| AI (start point, no dip) | n/a | (none) | Prompt the AI harder | A design system agents can read · 1–2 wks → 3–4 days |
| US health insurance | Deepest | 9 → 5 steps | Shorten the flow | The family's order, not the database's |
| Dubai Municipality | Middle | 3.5M residents | Redesign the portal | Organised by resident need |
| Jet Airways | Shallowest | 4 platforms | Ship the apps | One library across web, iOS, Android and Watch |

All lines are from real case studies or the resume. No new claims.

### 5.2 Data
New `src/content/career.ts`, typed as `{ id, org, depth: 0–3, rest, brief, fix, href? }[]`. `href` links each chapter to its case study where one exists (health insurance → case 01, Dubai → case 05, AI → case 03; Jet Airways has none).

### 5.3 States
| State | Shows |
|---|---|
| **Rest** | Wave, surface line, org names, rest numbers. No brief or fix text visible. |
| **Active** (hover, focus or tap on a chapter) | That chapter's struck brief above the surface; its fix + number at the bottom of the dip; for linked chapters, a small "Read case 0X →" in accent. Other chapters stay at rest. Path segment for that dip goes to full contrast; other segments dim to `--text-tertiary`. |
| **Draw-on** (first load) | See 5.4. |
| **Reduced motion** | Final rest state immediately; no draw, no fades. |

Only one chapter is active at a time. Leaving the wave (pointer out, Escape, focus out) returns to rest. On touch, tapping an active chapter again follows its `href`; tapping elsewhere returns to rest.

### 5.4 Motion
- Draw-on starts with the hero's fade group (~0.35s after the title reveal), runs **1.6s**, `--ease-emphasized`, drawing from the AI dot to Jet Airways. Implement with a GSAP tween on `stroke-dashoffset` (DrawSVG isn't registered).
- Labels fade in per chapter as the line reaches them (stagger ~0.15s), `--motion-enter`.
- Active-state swaps use `--motion-hover` (160ms).
- **Plays once per page load.** No loops, no idle motion, no scroll-linked motion.
- Wrap in the existing `gsap.matchMedia()` pattern so `prefers-reduced-motion: reduce` gets the final state.

### 5.5 Accessibility
- The SVG is **decorative** (`aria-hidden="true"`).
- Chapters are real HTML: an `<ol aria-label="Career, latest first">` whose `<li>`s are absolutely positioned over each dip. Each holds a `<button aria-expanded>` (org + rest number) and a details `<p>` (brief + fix) that is always in the accessibility tree. Struck briefs are prefixed with visually hidden "The brief:" and fixes with "What I changed:", because strikethrough isn't announced.
- Keyboard: Tab moves AI → health insurance → Dubai → Jet Airways; focus shows the active state; Enter follows `href`; Escape returns to rest. Visible focus ring uses `--focus-ring`.
- Contrast: all text ≥ 4.5:1 in light and dark themes; the dimmed path segments are decoration and exempt, but the active segment must be ≥ 3:1.
- Hit areas ≥ 44 × 44px.

### 5.6 Mobile (≤ 760px)
- The wave rotates to **vertical**: the surface line runs top to bottom on the left; the path dives **to the right** at each chapter, deepest first (AI at top).
- Each chapter shows org + rest number beside its dip. The fix is revealed by tap (same states), never on scroll.
- Height budget: ≤ 360px so the stats strip starts within the first scroll.

### 5.7 Tokens
Colour: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--border-strong` (surface line), `--accent-solid` (AI dot, rest numbers). Type: org `t-body-s` medium; numbers and labels `t-label` mono; brief/fix `t-body-s`. Spacing: `--space-3` to `--space-6`. Motion: `--motion-enter`, `--motion-hover`, `--duration-slower`. No new tokens.

## 5R. CareerWave v1.1 (replaces 5.1–5.6 where they differ)

**Layout (B, stacked):** row 1 status chip; row 2 headline across the full container width (2 lines at 1280px, `text-wrap: balance`); row 3 intro paragraph (left, up to 72ch) and two actions stacked at the right edge of the container, "Read the case studies" above "Get in touch" (side by side, left-aligned, ≤ 1024px). No Résumé button in the hero: the nav bar already has one; row 4 the wave, full container width; row 5 facts row.

**Chapters, latest first; every one is a dip:**
| Chapter | Depth | Above the line (rest) | Bottom of dip (rest) |
|---|---|---|---|
| AI · Now (accent) | Deepest | ~~Prompt the AI harder~~ | A design system agents can read · 1–2 wks → 3–4 days |
| US health insurance | 2nd | ~~Shorten the flow~~ | The family's order, not the database's · 9 → 5 steps |
| Dubai Municipality | 3rd | ~~Redesign the portal~~ | Organised by resident need · 3.5M residents |
| Jet Airways | Shallowest | ~~Ship the apps~~ | One library, four platforms · 4 platforms |

- Org name sits directly above its own dip; struck brief below it, above the line.
- Key on the left: "The brief" above the dashed surface line, "What I changed ↓" below it.
- AI's segment and start dot are in `--accent-solid`; the rest of the line in `--text-primary`.

**States:** Rest shows everything above. Active (hover, focus, tap) highlights that dip's segment and labels, dims the others to tertiary, and reveals "Read case 0X →" (linked chapters only). That link line is the only thing hidden at rest.

**Mobile (≤ 760px):** vertical wave with a fixed text column on the right; all text visible at rest; ~110px per chapter (height ≈ 450px, replacing the 360px budget).

## 5T. CareerTimeline (v1.3, replaces the wave)

- **Shape:** one straight horizontal line across the container, with a key column on the left ("The brief" level with the briefs, "What I changed" level with the fixes) and four equal stop columns, latest first.
- **Each stop, top to bottom:** years (AI shows "Now" in accent) · org · ~~brief~~ · the line with a dot · what I changed · result · "Read case 0X →" (linked stops only; hidden until hover/focus).
- **AI** is a filled accent dot and its stretch of the line is accent; other dots are outlined.
- **Rest state shows everything**; hover/focus/tap highlights one stop, dims the others, shows its "Read case". Touch: first tap highlights, second follows. Jet Airways doesn't link.
- **Years:** AI "Now", US health insurance "2021–", Dubai Municipality "2020–21", Jet Airways "2015–19".
- **Motion:** the line draws left to right once, stops fade in as it passes; reduced motion shows the final state.
- **Phones (≤ 760px):** vertical: line on the left, stops stacked with all text visible.
- **Accessibility:** an ordered list; each stop's org is the link (stretched over the whole column); briefs announced as "The brief:", fixes as "What I changed:".

## 5B. BriefMarkup (v1.4, replaces the timeline)

- **What it is:** a project brief on a small stack of papers. The brief types itself out; a pen (accent ink) strikes it through, writes "The real problem" and "The call" underneath word by word in the serif italic, and underlines the key phrase with a hand-drawn line (one per line if it wraps). The page then slides away and the next brief arrives.
- **Content:** all five case studies, in order 01 to 05 (enrollment, white-label platform, AI design systems, AI product Blinkwiser, civic services Dubai); it rests on 01. Brief, problem and call come straight from each case study's hero (`src/content/briefs.ts` reads `case-studies.ts`); the circled phrase is configured there.
- **Index (right column):** the five briefs, current one highlighted. Clicking one moves to it with the same transition as the auto run and plays its markup once, then stays on it. "Pause" while playing; "Play all" restarts the run from 01. Each paper links to its case ("Case 0X →").
- **Transition:** the previous sheet slides off the stack to the left with a slight turn and fades (0.5s); the next settles onto the stack from a small tilt (0.7s), then types. No transition with reduced motion.
- **Playback:** starts when the hero is on screen (after the hero's own reveal), plays all four once, then rests on the AI brief fully marked. Pauses when scrolled away. A resize shows the current brief fully marked.
- **Reduced motion:** the AI brief appears fully marked; no animation; the Play control is hidden; the index still switches briefs.
- **Accessibility:** all words are real text; the typed brief has a screen-reader version ("The brief, as it arrived: …"); ink and pen are decorative SVG.
- **Layout (A, stacked, chosen):** headline, paragraph and actions full width; the brief below with the paper left (max 820px) and the index right (200–260px). The component sizes to its container: the index moves under the paper below 820px of width.

## 6. Acceptance criteria
1. Given the homepage at 1280px, when it loads, then the headline wraps to 2 lines across the full width and the wave spans the container below it with no text overlapping the line.
2. Given motion is allowed, when the page loads, then the wave draws once from AI to Jet Airways in ~1.6s and never animates again without interaction.
3. Given `prefers-reduced-motion: reduce`, when the page loads, then the wave shows its final rest state with no animation.
4. Given the rest state, when nothing is hovered or focused, then every chapter's org, struck brief, fix and result are visible, and only "Read case" is hidden.
5. Given a pointer, when it enters a chapter, then only that chapter shows its struck brief and fix, and leaving returns to rest.
6. Given a keyboard, when tabbing through the hero, then focus visits AI, health insurance, Dubai, Jet Airways in order, each with a visible focus ring, and Escape returns to rest.
7. Given a screen reader, when it reaches the wave, then it announces a 4-item list with org, number, "The brief: …" and "What I changed: …" for each.
8. Given a 375px viewport, when the hero renders, then the wave is vertical, every chapter's text is visible without tapping, and every chapter is tappable (≥ 44px).
9. Given light and dark themes, then all wave text meets 4.5:1 contrast.
10. Given the hero, then it shows exactly two actions (Read the case studies, Get in touch) stacked at the right edge, and "Based in Pune, India" appears in the facts row. Résumé lives in the nav bar only.
11. The 5-tab `ReframeDeck` no longer renders on the homepage (the component may stay in the codebase).
12. No layout shift: the wave reserves its size before it draws (CLS 0).

### 5.8 Linking
Chapters with a case study link to it: AI → case 03, US health insurance → case 01, Dubai Municipality → case 05. Jet Airways has no case and does not navigate (no cursor change, no "Read case" line).
- Pointer: click navigates. The active state's "Read case 0X →" makes the link visible before the click.
- Touch: first tap activates, second tap navigates.
- Keyboard: Enter navigates.
Reason: the wave is the first thing a VP explores; a dead end after the reveal wastes the moment of interest.

## 7. Open questions
None.

## Decision log
| Date | Decision | Reason |
|---|---|---|
| 2026-10-02 | Wave replaces ReframeDeck via HeroShell `visual` slot | No layout rewrite needed |
| 2026-10-02 | SVG decorative; chapters as HTML list over it | Real semantics and keyboard support without fighting SVG a11y |
| 2026-10-02 | Draw once per load; no loops | Rule 3 (still, or one subtle micro-interaction) |
| 2026-10-02 | Vertical wave on mobile | Horizontal labels can't fit at 375px |
| 2026-10-02 | Location from `site.location` (Pune, India) | Already the site's source of truth |
| 2026-10-02 | AI stays the start point, marked "now" | Sikandar: ongoing work; sits at the top of the curve |
| 2026-10-02 | Location = "Pune, India" only | Sikandar's call |
| 2026-10-02 | Get in touch as a text link | Two button shapes max |
| 2026-10-02 | Chapters link to their case studies (not Jet Airways) | Sally's call, delegated by Sikandar; turns interest into a click |
| 2026-10-02 | v1.1: rest state complete; hover is a bonus | Hover-only meaning failed the 10-second test, isn't discoverable, and doesn't exist on touch; dips could read as "career lows" without the key |
| 2026-10-02 | v1.1: AI gets its own dip, the deepest | Newest work and half the headline; it was the only chapter without a brief and fix |
| 2026-10-02 | v1.1: stacked layout (B) | Right column was cluttered; the wave needs width; the headline drops to 2 lines |
| 2026-10-02 | v1.1: facts row below the wave | Keeps headline, paragraph, buttons and wave on the first screen; Sikandar can revisit |
| 2026-10-02 | Kept the wave over columns, rewrite and infographic alternatives | Sikandar's call |
| 2026-10-02 | v1.2: Résumé button removed from the hero; actions stacked at the right edge; lede widened | Nav bar already has Résumé; Sikandar's layout call |
| 2026-10-02 | v1.3: straight timeline replaces the wave | Any falling line read as decline; Sikandar chose clarity over the depth metaphor (soundings/foundations considered) |
| 2026-10-02 | v1.3: top layout from Sikandar's Figma | Full-width headline and paragraph, actions below on the left, more space before the timeline |
| 2026-10-02 | Stats strip removed from the homepage; its "Team-observed figures" note moves under the timeline | Every strip number already appears in the timeline or on the work cards |
| 2026-10-02 | v1.4: marked-up brief replaces the timeline | Hiring panel: timeline restated the résumé; Sikandar: hero must be visual; the brief shows how he thinks |
| 2026-10-02 | Plays once, then rests; pauses off-screen | Endless loops pull focus from the headline; motion over 5s needs a pause control |
| 2026-10-02 | v1.5: layout A (stacked) over B (split) | Sikandar: A is more legible (2-line headline, wider paper) |
| 2026-10-02 | v1.5: underline the key phrase instead of circling it | The circle cut through the words and hurt legibility |
| 2026-10-02 | v1.6: all five briefs, numbered 01–05 | Showing 03, 01, 02, 05 read as a missing case; numbers now match the work section |
| 2026-10-02 | v1.7: 3D page flip; index picks flip and animate too | Sikandar: the slide-away felt flat, and manual picks should feel the same as the auto run |
| 2026-10-02 | v1.8: 3D flip rolled back to the slide; index picks still animate | Sikandar preferred the earlier slide after seeing the flip |
