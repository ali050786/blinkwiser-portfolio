# Hero Brainstorm: Portfolio Homepage

- **Product:** Sikandar Ali portfolio, homepage hero (`src/components/home`, `src/content/site.ts`)
- **Version:** 1.2 · **Status:** Final · **Date:** 2026-10-02
- **Workflow:** BP, Brainstorm (Analyst Mary), Guided path
- **Techniques:** First principles → How Might We
- **Upstream inputs:** `resume-brainstorm.md` (Final), current hero (screenshot 2026-10-02)

## Readers (LOCKED)
- **Primary:** health-tech hiring manager + design-engineering / AI product team
- **Recruiter:** served by structure (status line, keywords, stats row), not by the headline

## Bridge story (LOCKED)
- Case 03: the 6-year design system behind the same US health-insurance platform, rebuilt so AI can read it (1–2 wks → 3–4 days per story). Public wording OK, no client names.
- Serves both readers: hiring manager sees regulated domain at production scale; design-eng team sees AI-readable system and agent workflows.

## HMW 1: One headline for both readers
- **Domain level (LOCKED): Level 2.** Headline carries the transferable claim (complex/regulated products + systems + AI). Health insurance is named in the first line beneath it as proof. Range (Dubai civic, Blinkwiser) shown by tabs and stats.
- Rejected Level 1 (health insurance in headline): narrows non-health-tech applications.
- Rejected Level 3 (no specifics, current hero): lands for no one.
- **Intro paragraph (LOCKED, unchanged):** "I'm Ali: 11 years in enterprise UX, the last five leading design on a white-label US health-insurance platform…" It already names the domain in its first sentence.
- **Headline (LOCKED): I make complex products *simple* for people and readable for AI.**
  - "Simple for people" = the UX promise (enrollment, civic catalogue, flows, research)
  - "Readable for AI" = Case 03 in three words (systems + AI)
  - Keeps the italic serif *simple* treatment
- **Rejected:**
  - F (too long for a 3-line display headline)
  - G "Design systems for…" (reads as components/UI only, hides UX)
  - H (current headline as-is: no AI anywhere in headline or paragraph)
  - J, K, L (J/K longer; L less personal)

## HMW 2: The hero's right side
- **Problem:** the 5 cases appear three times above "How I work" (hero deck, stats strip, work index).
- **Rejected:** A (static Case 03 reframe card), D (method card cycling reframes). Reason: brief → problem → call is a second text block; it explains the method instead of showing it, and the paragraph and case studies already say it.
- **Rejected:** real health-insurance screens. Reason: the featured Case 01 card already shows them.
- **Reverse brainstorm rules (from Sikandar as craftsperson, recruiter and VP):**
  1. Exclusive: nothing that appears elsewhere on the page.
  2. Read in 2 seconds; no second paragraph.
  3. Still, or one subtle micro-interaction; no marquees, 3D, heavy parallax.
  4. Real crafted artefact (UI snippet, system diagram, prompt/guardrail logic); no glowing-brain AI imagery, fake chatbot boxes, skill clouds, tool logos, awards.
  5. No ambiguous carousel; static, or obvious controls.
  6. The work, not the ego (no conference photo).
  7. Hyper-specific, not abstract; states his role.
  8. Not a templated bento grid.
  9. Works in light/dark, touch and mobile; optimised, zero layout shift.
  10. Metrics only with context, and only defensible, team-observed figures.

- **Also rejected (seen as mockups):** state machine snippet, agent guardrail, combined component (all felt like one case study); depth sample (1) and pattern (3); complex-to-simple skeleton screens; lens, strikeout and machine-to-human translation concepts.
- **Accepted as baseline:** option 2. Empty right side, wide headline, stats strip pulled into the hero, featured case starting at the fold, Resume button added.
- **Reframed test (Sikandar):** what a recruiter or VP gets in 10 seconds *without reading*.
- **Also rejected:** body-of-work UI grid (execution-led; the page below already shows screens; signals senior IC rather than lead).
- **DECISION (LOCKED): the career wave, strategy-led.** One line through the career, with a dashed "surface" line. At each job the line dives below the surface (the brief above, the real fix one level down), deeper each time, then ends in the accent colour at AI.
  - At rest: the shape, company names, and one number per dip. Briefs (struck) and fixes appear on hover/tap.
  - Draws once on load, then stays still; reduced-motion shows the final state.
  - Mobile: vertical version.
  - Content source: real case-study calls only.
  - **Order (LOCKED): latest first**, left to right: AI (start point, "now") → US health insurance (deepest dip) → Dubai Municipality → Jet Airways. Reads as "the most recent work goes deepest."
  - **Jet Airways dip (LOCKED):** brief "Ship the apps" · fix "One library" · at rest "4 platforms" (web, iOS, Android, Apple Watch; in production until 2019). Sikandar designed and drove all Jet Airways work shown in his screenshots.
  - Other true Jet Airways stories (for resume or a future case): five fare types compared in one grid with a date strip; JetXtras/JetBistro add-ons in one step, per passenger and per flight; transparent fare breakdown.

## Ranked output
1. **Headline swap** to option I. Change in `src/components/home/Hero.tsx` line 12.
2. **Replace the ReframeDeck** (5-tab case carousel) on the hero's right with the career wave.
3. **Add a Resume button** and location / time zone to the left column (recruiter needs).
4. *(Parked)* Pull the stats strip up and start the featured case nearer the fold (option 2 layout ideas).

## Open questions
- Three dips or four: is AI its own stop, or the deepest point of the health-insurance dip?
- Location / time-zone wording for the left column.

## Decision log
| Date | Decision | Reason |
|---|---|---|
| 2026-10-02 | Primary readers = hiring manager + design-eng/AI team | Contacts Sikandar would be happiest to get |
| 2026-10-02 | Case 03 is the bridge story | Same platform; publicly sayable |
| 2026-10-02 | Domain at Level 2 (subline, not headline) | Keeps non-health-tech doors open; domain still lands in ~2s |
| 2026-10-02 | Keep intro paragraph unchanged | Already names the domain first; Sikandar happy with it |
| 2026-10-02 | Headline = "I make complex products simple for people and readable for AI." | Covers UX, systems and AI without narrowing to "design systems" |
| 2026-10-02 | Remove the case carousel from the hero | Cases appeared three times above the fold area |
| 2026-10-02 | Right side = career wave (strategy-led) | Passes the 10-second no-reading test; exclusive to the hero; signals lead-level judgement; the page below already shows execution |
| 2026-10-02 | Add Resume button and location | Recruiter's two missing facts |
| 2026-10-02 | Wave reads latest first | Sikandar wants the newest work (AI) seen first |
| 2026-10-02 | Jet Airways dip = one library, 4 platforms | True (resume); links into the design-system thread through to AI |
| 2026-10-02 | Wave → straight timeline (after build review) | Falling lines read as decline even when faded; timeline keeps the brief-vs-change content |
