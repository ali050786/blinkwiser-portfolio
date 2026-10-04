# UX Spec: De-slop (one accent, plain voice)

- **Product:** Sikandar Ali portfolio (portfolio.blinkwiser.com)
- **Version:** 0.3 · **Status:** Draft · **Date:** 2026-10-04
- **Workflow:** CU, UX spec (UX designer Sally), Fast path
- **Upstream inputs:** live site review of `main` (home, cases 03 and 04, 404), 2026-10-04; token audit of `tokens/tokens.json` on `main`; copy audit of `src/content/*.ts` and home components; `ux-spec-hero.md` v1.8; `ux-spec-work-section.md` v1.0
- **Scope:** all 10 "AI slop" findings. **Copy is the priority.** The visual layer is specified fresh in §6; the earlier design-system attempt was rejected and deleted.
- **Supersedes:** copy and styling rules in `ux-spec-hero.md` and `ux-spec-work-section.md` where they conflict. Layout and flows in those specs stay.

---

## 1. Goal

A hiring manager reads the home page and one case study and thinks "a senior designer wrote this", not "an AI made this portfolio".

Success test: show the home page and case 04 to two designers who don't know the site. Neither names an "AI tell" unprompted. Neither can quote a slogan back, but both can say what Sikandar did and what changed.

Measurable targets (checked by script, see §8):

| Metric | Today | Target |
|---|---|---|
| Accent colours | 6 | 1 (turquoise) |
| Italic-serif headline words | 9 | 0 |
| ", not …" antitheses in copy | 55 | ≤ 10 |
| Fork / section titles written as questions | 18 | 0 |
| "real problem" | 14 | ≤ 2 |
| "honest" / "honestly" | 15 | ≤ 3 |
| "under / below the brief", "one level down" | 6 | ≤ 1 |
| Two-sentence slogans ("Same AI. Same components.") | 5 case hooks + hero + contact | 0 |

## 2. The 10 findings and where each is fixed

| # | Finding (from the 2026-10-04 review) | Layer | Fixed in |
|---|---|---|---|
| 1 | Italic serif word in every headline ("*simple*", "*made*", "*under*") | Visual + copy | §6.2, §4.1 rewrites |
| 2 | Mono uppercase eyebrows on every block | Visual | §6 |
| 3 | Rainbow accents (6 colours, no meaning) | Visual | §6, turquoise |
| 4 | Green-dot "Open to…" status pill | Visual + copy | §6, §4.1 |
| 5 | One big number per card, even when it isn't a number ("Every edit") | Copy + content | §4.4 |
| 6 | Every surface is the same soft rounded card | Visual | §6 |
| 7 | **Aphoristic copy in one cadence** | **Copy** | **§3, §4** |
| 8 | Numbering as decoration (01–05 in five places) | Copy + IA | §5 |
| 9 | Dark CTA block with purple glow and a "Good fits" list | Visual + copy | §6, §4.1 |
| 10 | Demos and animations in front of the real work | Content | §5.3 |

## 3. Voice

### 3.1 Why the copy reads as AI
Every line on the site uses the same three moves:
1. **Antithesis.** "X, not Y." 55 times. "Redesigning the decision, not the screens." "An eval, not a debate." "Residents, not departments."
2. **The reveal.** "The problem wasn't generation. It was trust." "The AI wasn't the problem." "The real problem…" 14 times.
3. **The slogan pair.** Two short sentences with parallel grammar. "Same AI. Same components." "Plausible took two weeks. Trustworthy took a year."

Any one of these is fine once. Used on every line, they make a pattern a reader spots in seconds, and that pattern is what language models produce when asked to sound insightful. It also makes all five case studies sound like the same person on the same day, which hides the range of the work.

### 3.2 Voice rules
Write like a lead designer explaining the work to another lead over coffee.

1. **Say what happened, then what changed.** Subject, verb, object. "I reordered the enrollment questions so members pick who's covered once." Not "Redesigning the decision, not the screens."
2. **First person, past tense, for the work.** "I", "we", "the team". Present tense only for what's still true.
3. **Concrete nouns over abstractions.** "brand colours", "Save button", "dependents screen", not "the variable", "the system layer", "trust".
4. **Numbers with units and a source, once.** "Mockups went from about 2 days to 3–4 hours (team estimate)." Say how it was measured once per case, in the outcome, not after every number.
5. **One antithesis per page, at most.** If a sentence has "not", check it's doing real work.
6. **No rhetorical questions as titles.** State the decision.
7. **No slogans.** If a line would work on a poster, rewrite it as a sentence.
8. **Plain words.** Avoid: "honest", "real problem", "under the brief", "one level down", "the call", "the variable", "make X the product", "readable for AI" (more than once), "trust" as a noun on its own.
9. **Let each case sound like its domain.** Enrollment is about members and dependents. Dubai is about residents and permits. Blinkwiser is about a creator tool. Use the words those users would use.
10. **Keep the house rules:** no em-dashes, no client names (`check-copy.mjs`).

## 4. Copy rewrites

Proposed lines use only facts already on the site. Lines marked **[confirm]** need Sikandar to check a fact or choose.

### 4.1 Home

| Where | Now | Proposed |
|---|---|---|
| Status pill | "Open to senior and lead roles in UX, AI products and design engineering" (green-dot pill) | Plain line in the hero meta row: "Open to senior and lead UX roles." |
| Headline | "I make complex products *simple* for people and readable for AI." | "I design benefits and enrollment software for US health insurance." |
| Intro | "I bring 11 years in enterprise UX, the last five leading design on a white-label US health-insurance platform. Before that, Dubai Municipality and Jet Airways. I work at the systems layer, where the real problem sits one level below the brief." | "11 years in enterprise UX. For the last five I've led design on a white-label health-insurance platform used by insurers, employers and their members. Before that: Dubai Municipality's services portal and Jet Airways' apps. Lately I've been rebuilding our design system so AI tools can follow it." |
| Hero list label | "Five briefs, one level down" | Remove the label. If the brief card stays, title it "What I was asked, and what I did" |
| Work section title | "Selected work · 05" + "Five decisions, told the way they were *made*." | "Case studies" (one heading, no eyebrow) |
| How I work | 5 numbered principle cards (aphorisms: "A system nobody uses is a file.") | Remove the section and its nav link (§5.2) |
| Contact title | "Let's find the problem *under* your brief." | "Get in touch" |
| Contact body | "Open to senior and lead roles… I'm especially interested in teams building AI products or complex, regulated platforms." + "Good fits" bullet list | "I'm looking for a senior or lead UX role, ideally in health tech or on an AI product. Email is fastest: ali050786@gmail.com" Remove the "Good fits" list. |
| 404 | "This page was a *road not taken*." | "Page not found." + "Back to the case studies" |

### 4.2 Case titles and hooks

The hook is the large line on each case page. Today all five are slogans.

| Case | Title now → proposed | Hook now → proposed |
|---|---|---|
| 01 Enrollment | "Enrollment: redesigning the decision, not the screens" → "Health-insurance enrollment, from 9 steps to 5" | (no hook) → "Members were asked who to cover on every plan. Now they're asked once." |
| 02 Platform | "Building an enterprise health-insurance platform from zero" → keep | "One product. Every client's brand." → "Each new client used to mean weeks of re-skinning. With design tokens, it takes under a day." |
| 03 AI design system | "AI-readable design system: writing down the rules nobody wrote" → "Rewriting our design system so AI tools can follow it" | "Same AI. Same components." → "Our AI tool kept putting Save on the wrong side. It had no way to know our rules, so I wrote them down." |
| 04 Blinkwiser | "Blinkwiser: designing trust into an AI product" → "Blinkwiser: making an AI carousel tool you can check" | "Plausible took two weeks. Trustworthy took a year." → "The first version took two weeks and made up its own statistics. Over the next two months, building with AI coding agents, I rebuilt it to check every number against a source and let you undo any edit." Also fix the dek ("…took the rest of the year"). |
| 05 Dubai | "Organising a city's services around residents, not departments" → "Dubai Municipality: one place for a city's services" | "Residents don't know who owns a service." → keep (plain fact, and the one hook that already works) |

### 4.3 Frame / decision / outcome snapshots
Rewrite each "frame" to drop the reveal ("The AI wasn't the problem…", "The problem wasn't generation. It was trust."). Pattern: **what I was asked → what I found → what I did → what changed.**

Example, case 03:
- Now: "The AI wasn't the problem. Our design rules lived in designers' heads, so it had nothing to follow."
- Proposed: "We were using AI to draft screens, and the drafts didn't match our product. Our rules weren't written anywhere the tool could read."

### 4.4 Decision (fork) titles and labels
Fork card labels: "ROAD NOT TAKEN" → "Not chosen", "THE CALL" → "Chosen", sentence case, keeping the ✕ / ✓ icons. Card content, layout and connectors unchanged (§6.0).

18 titles are "X, or Y?" questions. Each becomes the decision, stated.

| Now | Proposed |
|---|---|
| "Trim the screens, or change the order of the questions?" | "Changed the order of the questions instead of trimming screens" |
| "Fix the AI, or fix the system it reads?" | "Fixed the design system the AI reads, not the prompts" |
| "Ask the model nicely, or enforce the rules in code?" | "Moved the rules from the prompt into code" |
| "Organise by department, or by resident need?" | "Grouped services by what residents need done" |
| (the other 14) | Same pattern; drafted in the build, reviewed by Sikandar |

### 4.5 Headline numbers
One metric per case, and it must be a real number. If a case has no honest number, it has no metric slot (case 05).

| Case | Now (home card / case page) | Proposed |
|---|---|---|
| 01 | 9 → 5 / 9 → 5 | keep |
| 02 | < 24 h / < 24 h | keep |
| 03 | 3–4 days / 3–4 days | keep |
| 04 | "Every edit" / "7 in 10" | "7 in 10" on both: blind comparisons won by the rebuild |
| 05 | "3.5M" / "One home" | No number. The card and case lead with who it's for: "One place for city services, for Emiratis and residents, in Arabic and English." Drop "3.5M" from `site.ts` proof and the home card. |

"Team-observed" appears 16 times. Say it once per case, in the outcome section: "These are team estimates, not measured figures."

## 5. Structure and content

### 5.1 Numbering
Keep the case number only where it helps someone find a case: the case page eyebrow ("Case 3 of 5") and the footer list. Remove numbering from the hero brief list, the How I work cards, the case tabs ("01 The button") and the snapshot columns ("01 Frame").

### 5.2 How I work
**Removed.** It repeats what the case studies already show ("find the problem under the brief", "make the variable explicit"). Delete the section, the "How I work" nav link and the `/#how` anchor. The "Where I work" tags go with it. Revisit later only if there's something new to say.

### 5.3 Real work first
- The hero brief card stays, but **static**: no strikethrough animation, no handwritten cursor, no faint grid lines behind the hero. The annotated brief works as a picture. The animation is what makes it look like a demo.
- On each case page, the first image is a real (anonymised) screen when one exists. The before/after illustrations come after it.
- "Illustration with demo content…" captions become one plain line in small sentence-case text.
- Blinkwiser's purple gradient hero screenshot is the product's own look, so it can stay inside its frame. But it shouldn't be the first thing on the home card. Use a screen showing the editor or the source check.

## 6. Visual layer

Specified fresh. The earlier design-system attempt was rejected because, while restyling, **it removed and misaligned things that were already built**: the fork connectors (dot, dashed "road not taken" line, solid "chosen" line) and several components around them.

**Direction: restyle in place, not redesign.** The current layouts, diagrams and connectors are the look. This pass changes colour, type, labels, copy and decoration only. §6.0 is a hard constraint on everything after it.

### 6.0 Preserve what's built (hard rules)
1. **No component is deleted, merged or restructured** as part of this work unless a line in this spec names it (only How I work, §5.2). A component only counts as dead if nothing imports it, checked by search, not by eye.
2. **Layout geometry is frozen:** grid spans, max widths, column gaps, card padding, image crops and alignment stay as they are. The changes allowed are colour, font family, font case, border/shadow/glow removal, and text.
3. **Drawn connectors and diagrams keep their geometry.** Protected list:
   - `ForkBlock`: node dot, dashed rejected path, solid chosen path (SVG viewBox 0 0 800 96; the paths end at x=200 and x=600, the centres of the two option columns). The `.options` grid's columns, gap and padding must not change, or the line ends detach from the cards.
   - `BeatRail` track and active marker; `MetricVisual`, `CaseDiagrams`, `Diagrams`, `MobileDiagrams`, `DsDiagrams`, `DiagramKit` (shapes, positions, sizes); `Compare`/before-after cards; exhibits and screen sets; the hero brief card (made static, same position and size).
   - Restyling these means changing the colour token they read. Nothing else.
4. **Screenshot baseline first.** Before any change: capture every route (home, 5 cases, resume, colophon, 404) in light and dark at 1440, 1024 and 390px. After each epic, capture again and compare. Any difference not listed in that epic is a bug and is fixed before moving on.
5. **Small, revertible commits:** one commit per kind of change (accent, serif, labels, decoration, each copy area), so any one can be undone without losing the others.

### 6.1 Colour: one accent, turquoise
- Light mode: oklch(50% 0.085 192) ≈ #047270 for text, links and filled controls (5.5:1 on the canvas); hover oklch(43% 0.07 192).
- Dark mode: oklch(80% 0.12 190) ≈ #47d6cf (11:1 on the dark canvas); hover oklch(88% 0.085 190).
- Re-verify both with `check-contrast.mjs` after the change.
- Delete `themes` in `tokens.json`, the `[data-accent]` blocks in `tokens.css`, `accent` on each case in `case-studies.ts`, and every `data-accent=` attribute (12 components).
- Replace hardcoded accents: `work/[slug]/opengraph-image.tsx` map, `HeroStack.module.css`, `globals.css` `@property` initial values.
- **Accent budget:** links, focus ring, the "after" state in a before/after, and the one headline metric. Never headline words, numerals, card backgrounds, dots or glows.
- Product mocks (`components/screens/*`) keep their own demo-brand colours; they're content.

### 6.2 Type
- Remove Instrument Serif and every `t-serif-em` use (9). Emphasis, if needed, is weight.
- Labels and eyebrows: sentence case, sans. Mono only for numbers, code and token names.
- Nothing smaller than 12px outside product mocks.

### 6.3 Surfaces
- Not everything is a card. Cards only for things that link to a case. Section content sits on the page.
- No shadow on cards at rest; no glow, glass or gradients anywhere in site chrome.
- No green-dot status pill.
- Contact: a plain section, no dark glow block, no "Good fits" list.

### 6.4 Motion
- No reveal-on-scroll on cards, list items or footers.
- Hero brief card is static (§5.3).

## 7. Accessibility
All text ≥ 12px, accent pairs AA in both modes, focus ring on every interactive element, before/after never relies on colour alone (keep text labels and ✓/✕). Plus: rewritten titles must still make sense read out of context by a screen reader. A stated decision ("Moved the rules from the prompt into code") does this better than a question does.

## 8. Enforcement for copy
Extend `scripts/check-copy.mjs` with **warnings** (not failures) so drift shows in `npm run check`:
- italic-serif class (`t-serif-em`) anywhere
- `", not "` count above 10
- a title or hook ending in `?`
- watch-list phrases: "real problem", "honest", "under the brief", "below the brief", "one level", "the call", "make … the product"
- two sentences under 5 words each, back to back, in a `line:` / hook field

## 9. Rollout

| Epic | Contents | Size |
|---|---|---|
| E0 Baseline | Screenshot every route, both modes, 3 widths (§6.0 rule 4) | S |
| E1 Visual rules | §6 on a new branch off `main`, under §6.0: one turquoise accent, serif gone, labels, surfaces, contact, motion. Screenshot diff after. | M |
| E2 Home copy | §4.1, §5.1, remove How I work (§5.2), static hero card | M |
| E3 Case copy | §4.2–4.5 for all five cases, fork titles, outcomes | L |
| E4 Real work first | §5.3 image order per case | M |
| E5 Lock | copy warnings in `check-copy.mjs`; read-aloud pass; screenshot review light/dark | S |

## Open questions

- ~~OQ1 Look and feel~~ Resolved: keep the current look and layouts; restyle in place under §6.0.
- **OQ2 Case 04 timeline:** the case shows "Dec 2025–present". Keep, or change to the two-month build window?
- **OQ3 Real screens:** which cases can show a real anonymised screen first (§5.3) under client confidentiality?
- ~~Visual baseline~~ Resolved: don't restore; old commit deleted.
- ~~Voice sample~~ Resolved: none exists; Claude sets the voice using §3.2.
- ~~Case 04 duration~~ Resolved: two months, built with AI.
- ~~Case 05 metric~~ Resolved: no number; lead with Emiratis and residents.
- ~~How I work~~ Resolved: remove.

## Decision log

| Date | Decision | Reason |
|---|---|---|
| 2026-10-04 | One accent, turquoise, on every page | Sikandar's choice; main visual complaint |
| 2026-10-04 | Scope: all 10 findings, copy first | Sikandar: "get rid of all 10 … and mainly the copy" |
| 2026-10-04 | Fast path | Sikandar's choice |
| 2026-10-04 | Rewrites use only facts already on the site; anything new is marked [confirm] | BMAD rule: never invent project facts |
| 2026-10-04 | Don't restore the earlier design-system work; permanently delete it | Sikandar judged it poor; start the visual layer fresh |
| 2026-10-04 | Claude owns the voice, following §3.2 | Sikandar has no existing writing sample |
| 2026-10-04 | Case 04: two-month rebuild, built with AI | Sikandar's correction; "a year" was wrong |
| 2026-10-04 | Case 05: drop "3.5M"; lead with Emiratis and residents | Sikandar: who it served matters more than the number |
| 2026-10-04 | Remove "How I work" | Repeats the case studies; revisit later |
| 2026-10-04 | Restyle in place: freeze layout geometry, protect connectors and diagrams, screenshot baseline and diff per epic | The rejected attempt removed the fork connectors and misaligned components |
