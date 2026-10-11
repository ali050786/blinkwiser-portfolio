# Case study review against the new home page

- **Product:** portfolio.blinkwiser.com
- **Version:** 2
- **Status:** Done. Ali answered the open questions on 2026-10-10 and everything below was built on 2026-10-11.
- **Date:** 2026-10-10, updated 2026-10-11
- **Workflow:** BMAD, UX (Sally), Fast path, review mode
- **Upstream inputs:** the v4 home page as built today, `docs/ux/DESIGN.md`, `docs/ux/EXPERIENCE.md`, `docs/ux/DECISIONS.md`, `docs/HANDOFF.md`, the six case studies in `src/content/case-studies.ts`, the human-story-writer-20 voice rules
- **How it was checked:** every case page rendered at 1440px and 390px, the full visible text of each page read line by line, plus a pattern scan for arrows, dash ranges, "vs", buzzwords, formal words and the "not X" formula

---

## The short answer

The case studies are **not okay yet**, but the work needed is mostly on the surface.

- **Words:** the chapters already sound like you. They're first person, with real moments (opening inspect element to check every color by hand, the dashboard test on your first days in Dubai), and they're honest about cost. The fixes are in labels, diagram captions and metric tiles, not in the stories.
- **Look:** every case page is still on the old v3 style. The home page now speaks with a serif display face, soft tinted cards behind real screens, quiet tabs and calm motion. The case pages still use heavy sans headings, white panels and old line-glyph art. Someone clicking from the home page into a case lands on what feels like a different site.
- **Length:** each case runs 1,500 to 3,000 words and repeats its headline result four to six times. That's the one change that needs your call (see Phase 3).

---

## What the home page now sets as the style

These are the rules the case pages should follow so the site reads as one piece of work:

1. **Display type** is Newsreader (serif, weight about 450) for headlines, section headings and big numbers. Geist stays for body text and labels, Geist Mono for small eyebrows.
2. **Product screens sit on a tinted card.** Each case already has its own tint on the home page (01 sky, 02 sea, 03 lilac, 04 slate, 05 sand, 06 mist).
3. **Captions are printed, not chat-like:** the "Where it started" label with the case's opening line.
4. **Tabs are quiet:** a raised background and a hairline border on the current tab, not a filled blue pill.
5. **Sections alternate** between the canvas and the slightly lighter band surface, with a hairline between them.
6. **Motion is calm:** things fade and rise into place, and nothing moves on its own.

---

## Visual findings (apply to all six unless noted)

| # | Severity | What's wrong | What I'd do |
|---|---|---|---|
| V1 | High | Every heading on the case pages is Geist at weight 500 to 600 (the hook headline, chapter titles, metric numbers, "Next case" title). The home page uses the Newsreader serif for all of these. | Switch case headings and big numbers to the display token. This is a style change only, no copy. |
| V2 | High | Real product screens sit on plain white or grey panels (for example the "Good morning, Michael" dashboard in case 02 and the app screenshots in case 05). On the home page the same screens sit on each case's tint. | Put each case's screens on its own home tint, so a case page looks like it grew out of its card. |
| V3 | High | The "Next case" card at the bottom of every case still uses the old line-glyph art. **Bug:** the Jet Airways glyph is the enrollment diagram ("×3 loop, before 9 steps, after 5 steps"), so case 05's "Next case" promises Jet Airways and shows the enrollment flow. | Reuse the home case card for "Next case": tint, real screenshot and the "Where it started" line. That fixes the bug too. |
| V4 | Medium | The hero tabs (for example "Adding dependents, Switching plans, Visible cost") use a filled blue pill for the current tab. | Use the home tab style. |
| V5 | Medium | Case 05's hero is laid out differently from the other five. It has a line-art panel where the others show a product exhibit, and a "How I worked: Design for the build reality" chip. That phrase is a leftover from the habits section you had removed on 7 October because it read as hype. | Show the real Dashboard screenshot in the hero on its sand tint, and drop the chip. |
| V6 | Medium | The small domain label above each title doesn't match the home page. The cases say "Health insurance platforms" (01 and 02), "AI-driven UI" (03 and 04), "Civic scale" (05) and "Consumer e-commerce" (06). The home cards say Health insurance, White-label SaaS, Design systems, AI product, Civic services and Airline e-commerce. | Use the home labels on the case pages. |
| V7 | Low | Each case page is one long dark surface, so chapters run together. | Alternate canvas and band surfaces between chapters, as on the home page. |
| V8 | Low | Case 04's "Live now" box still has the v3 crosshair corners, and the same box appears twice (near the top and again near the end). | Keep one, in the home style. |

---

## Copy findings against human-story-writer-20

**Overall:** the prose chapters pass. They're your voice, with contractions, medium-length sentences joined with "and", "but" and "so", and specific moments. There are no em dashes, buzzwords or client names (`npm run check` passes). What doesn't pass sits in the small labels, diagrams and metric tiles.

| # | Where | Now | Suggested |
|---|---|---|---|
| C1 | Case 04, exhibits | "v1 vs the rebuild", "v2 vs v1", "Reasoning off vs on" | "v1 against the rebuild", "v2 against v1", "reasoning off against on" |
| C2 | Case 02, theming exhibit | "A new client is a configuration, not a project" | "A new client is set up, not rebuilt" or "Setting up a new client" |
| C2 | Case 04, eval exhibit | "Trade-offs settled by evidence, not taste" | "How I settled the trade-offs: blind tests" |
| C3 | Case 01, metric tiles | "Once", "Every step", "4 flows" | "Asked once", "Cost on every step", "4 flows, one structure" |
| C3 | Case 03, metric tile | "5 and 3" | "5 brands, 3 platforms" |
| C3 | Case 04, summary | "Live, free, pre-revenue." | "It's live and free, with no revenue yet." |
| C4 | Case 01, diagram | "missed in the window → uncovered until the next window or a life event" | "missed in the window, so uncovered until the next window or a life event" |
| C4 | Case 01, flow map | "1 + once per coverage" | "once, then again per coverage" |
| C4 | Case 02, diagrams | "clients signed ≤ re-skins engineering can do" and "Insurer → Employer → Member" | "no more clients than engineering can re-skin" and "Insurer, then employer, then member" |
| C4 | Case 03, diagrams | "which color = link" and "brands A–E" | "which color is a link" and "brands A to E" |
| C5 | All, the Timeline field | "2020–now", "2015–2019", "Jul 2026–now", but case 05 says "Nov 2019 to Sep 2020" | Use words and months that match LinkedIn everywhere: "Oct 2020 to now", "Oct 2015 to Nov 2019", "Jul 2026 to now" |
| C6 | Cases 02 and 03 | "what the team has seen" or "team-observed" appears 8 times in case 02 and 10 times in case 03 | Say it once, plainly, in "What changed", and remove it from the tiles and diagram footnotes. Saying it ten times makes the numbers look weaker than they are. |
| C7 | Case 03 | "a veteran design system", "Compose sanctioned components" | "a six-year-old design system", "Compose approved components" |
| C7 | Case 01 tags, case 05 tags | "Decision modeling", "Regulated flows", "Stakeholder alignment" | "Defaults", "Health insurance", "Card sorting" (plain words, or drop the tag rows) |
| C8 | Case 04, "What I was asked" | "Generation is the product." It was your own brief, so "asked" reads oddly. | Label it "What I assumed" |
| C9 | Case 06, "What I found" | "Help people choose a fare they understand…" reads as a goal, not a finding | "People compare fares by price, and on a phone the grid made every price too small to compare." |
| C10 | Case 01 | Three different demo families on one page: Dennis, Ana and Noor in the hero; You, Sam, Maya and Leo in the grid; Michael, Jane, Harry and Carrie Brown in the screens | Use one family throughout (the Reed family from the trailer) |
| C11 | Case 05, last line | "If I were asked to rebuild it today, I'd be happy to, and I'd build it in React." | **Your call.** For a Lead UX role this reads like a developer's answer. I'd either drop the React part or say why it matters, for example that you'd prototype it in code yourself. |

**Facts check:** roles and dates match the LinkedIn table in `docs/HANDOFF.md`:

- Case 02 says "Founding UX Designer, now UX Lead" and "late 2020".
- Case 05 says Senior UX Designer, Nov 2019 to Sep 2020, 11 months onsite.
- Case 06 keeps "UX Designer, on a larger team", as you confirmed today.
- The team facts (four designers, two of them your hires) are the same in cases 02 and 03 and on the home page.

---

## Verdict per case

| Case | Words | Look | Length |
|---|---|---|---|
| 01 Health-insurance enrollment | Good. Fix C3, C4, C7 and C10. | Needs V1 to V4, V6 and V7 | Longest, at about 2,950 words. The 9-to-5 result is stated six times. |
| 02 White-label platform | Good. Fix C2, C4 and C6. | Needs V1 to V4, V6 and V7 | About 2,600 words |
| 03 AI-readable design system | Good. Fix C3, C4, C6 and C7. | Needs V1 to V4, V6 and V7 | About 2,200 words |
| 04 Blinkwiser AI carousels | Good. Fix C1, C2, C3 and C8. The chat screens are right here, because chat is the product. | Needs V1 to V4 and V6 to V8 | About 2,000 words |
| 05 Dubai Municipality | Good. Your call on C11. | Needs V1 to V3 and V5 to V7 | About 1,500 words. Fine. |
| 06 Jet Airways | Good. Fix C9. | Needs V1 to V4, V6 and V7, plus the V3 glyph bug | About 1,550 words. Fine. |

---

## Proposed plan

**Phase 1, the look (no copy changes).** These are shared components, so one pass covers all six cases: V1, V2, V3 (including the Jet Airways bug), V4, V6, V7 and V8. I'd check every case at desktop and phone width, the same way as the home page.

**Phase 2, the words.** C1 to C10, written with human-story-writer-20. Every change is listed above, so you can strike any you disagree with before I start. C11 waits for your answer.

**Phase 3, length (needs your decision).** Each case states its headline result in the hero, the summary box, the chapters, the metric tiles and the closing paragraph. I'd keep the hero, the chapters and the metric tiles, and cut the summary box. The hero and the first chapter already say what the summary says, and that alone takes 200 to 300 words off each case. If you'd rather keep the summary for hiring managers who skim, we can trim the metric tiles instead.

## Open questions for Ali

1. C11: keep, change or drop the React line in case 05?
2. Phase 3: cut the summary box, or keep it and trim the tiles?
3. Phases 1 and 2 can go ahead together, or one at a time if you want to see the look first. Which do you prefer?

---

## What Ali decided

1. C11: remove the React line. Done.
2. Phase 3: cut the summary box. Done, on all six cases.
3. Look and wording together. Done in one pass.

## What was built (2026-10-11)

**Look.** V1 to V8 are in. Case headings and big numbers use the Newsreader serif. Product screens, the cover and the screen sets sit on each case's home tint. Tabs use the home style. Chapters alternate between canvas and band. The domain label comes from the home card. "Next case" is now the home card (tint, real screen, "Where it started"), which fixes the Jet Airways glyph bug. Case 04 has one "Live now" box with plain rounded corners.

**V5 changed slightly.** Case 05's hero had the same Dashboard screenshot as the cover right under it, so I took the picture out of the hero and kept the cover. The hero now shows the headline number beside the title, and the "How I worked" chip is gone.

**Words.** C1 to C10 are in, with these differences from the table above:

- C2, case 02: the exhibit title is "Setting up a new client, tier by tier".
- C3, case 01: "4 flows" stays as it is, because it already reads as a count. The other two tiles are "Asked once" and "Cost on every step".
- C4, case 02: the arrows inside the "Insurer → Employer → Member" chips stay. They connect boxes in a drawing, they aren't prose.
- C6: "what the team has seen" now appears once in the prose of cases 02 and 03 and nowhere in the tiles or diagram notes.
- C7: case 01 tags are "US health insurance", "Enrollment", "Life events" and "Defaults". Case 05 drops "Stakeholder alignment".
- C10: the whole site uses the Reed family (Dennis, Ana, Leo, Maya, Ivy, and Noor as the newborn). The home cards and tiles that showed the old names were recaptured from the production build.

**Checks.** `npm run check` passes (copy audit, 62 contrast pairs, types). The production build passes. Every case was checked at 1440px and 390px with no sideways scroll and no page errors.

---

## Decision log

| Date | Decision | Reason |
|---|---|---|
| 2026-10-10 | Case studies reviewed against the v4 home page and the human-story-writer-20 rules | Ali asked to adapt the case studies to the new landing page look and his voice |
| 2026-10-10 | Recommended keeping every chapter's prose and fixing only labels, diagrams and tiles | The prose already meets the voice rules; the problems are in the small text |
| 2026-10-10 | Found the Jet Airways "Next case" glyph bug (it shows the enrollment flow) | Seen on the case 05 page; confirmed in `case-studies.ts` (both use glyph "flow") |
| 2026-10-10 | Ali: remove the React line, cut the summary box, do look and words together | His answers to the three open questions |
| 2026-10-11 | Built V1 to V8 and C1 to C11, and cut the summary box on all six cases | As decided |
| 2026-10-11 | Kept "4 flows" and the arrows inside diagram chips | One is a count and the other is a drawing, so neither breaks the voice rules |
| 2026-10-11 | Took the picture out of case 05's hero instead of adding the Dashboard to it | The cover right below already shows that screen |
