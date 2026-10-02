# UX Spec: Homepage Work Section

- **Product:** Sikandar Ali portfolio, homepage "Selected work"
- **Version:** 1.0 · **Status:** Final · **Date:** 2026-10-02
- **Workflow:** CU, UX spec (Sally), Fast path, built the same day
- **Upstream inputs:** `ux-spec-hero.md` v1.6, current build

## Problems found (ranked)
1. The preview's "The call" repeated the hero's marked-up briefs word for word.
2. Case previews appeared only on hover (not discoverable, absent on touch); the preview card had a large empty area.
3. Two visual languages: a real screen for case 01, abstract icon widgets for 02–05.
4. Group labels ("Health insurance platforms", "AI-driven UI", "Civic scale") labelled single cases and split the list.
5. The metric column mixed measures ("< 24 h") with phrases ("Plan → Reflect").

## Design
- **Case 01** stays the large featured card.
- **Cases 02–05** become a 2×2 grid of equal cards (one column ≤ 760px). Each card, top to bottom: the real screen (framed, cropped to a fixed height), "0X · domain" in the case accent, title, one outcome (value + one plain line), role · dates, "Read →". The whole card is the link.
- No "The call" and no group headings in this section (the hero carries the call; the domain tag replaces the groups).
- Outcomes: 02 "< 24 h", to theme a new client, down from weeks · 03 "3–4 days", Jira-story turnaround, down from 1–2 weeks · 04 "Every edit", undoable, and honest about what changed · 05 "3.5M", residents, with city services organised by need, not department. All from the case studies.
- Hover: border takes the case accent, the screen lifts 4px, the arrow nudges. Nothing is hover-only.

## Decision log
| Date | Decision | Reason |
|---|---|---|
| 2026-10-02 | List + hover preview → 2×2 card grid | Removes hover-only content and repetition with the hero; every case shows real work |
| 2026-10-02 | Drop group headings and "The call" | Single-item groups were noise; the call now lives in the hero |
