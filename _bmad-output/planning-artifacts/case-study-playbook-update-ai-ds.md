# Case Study Playbook: update from the AI-Readable Design System session

- **Version:** 1.0 · **Status:** Final · **Date:** 2026-10-03
- **Branch:** case-studies (all case study work, Enrollment and AI design system, on one branch)
- **Read with:** the "Playbook for the remaining case studies" in the Case Study Hook Brainstorm doc. Where they differ, this file wins.

## 1. Pick the hero by the 10-second test

A recruiter gives the first screen about 10 seconds: a title, one number, one picture. Text they have to read does not count.

| If the story is... | Use | Example |
|---|---|---|
| Felt by anyone instantly (a person, a deadline, money) | Story-first hero (`opener`) | Enrollment: "Dennis had a baby. 31 days." |
| An insider detail (a button side, a colour token, a docs count) | Picture-first hero (`hook`) | AI design system |

**Picture-first hero, the agreed shape:**
- Left: small case title, one big line ("Same AI. Same components."), one short second line, then the one headline number with its label (walked / demo / team-observed).
- Right: story tabs above ONE before/after picture. Each tab highlights its numbered mark on the picture; the others fade. Under the picture, one line of the old system's own words for the active tab.
- No lead paragraph, no quote block, no scope line, no big story headline in the hero.
- Every tab must have a mark on the picture. If a finding can't be drawn on the screen, show its consequence (the audit became "side nav left out").

## 2. Copy budget (the user's bar is short and crisp everywhere)

- Snapshot rows: one or two sentences, about 20 words each.
- Frame: assumed and real problem, one short sentence each. Body: at most 3 lines.
- Stakes cards: one line each.
- Fork: tension, option details and cost one sentence each; "why" at most two short sentences.
- Outcome points: three, one sentence each. Ownership: one line per point.
- Write it short the first time. The user should not have to ask.

## 3. Voice rules learned this session

- Never make a named colleague the one who was wrong ("my senior said..."). If a verdict matters, make it shared ("what we all concluded") or cut it.
- Don't say the same beat twice ("I went looking for why" plus "I wanted to know why").
- Avoid overclaims in titles and cards ("builds itself" became "a design system AI can read").
- Every case gets its own hero headline, taken from its own story. Never reuse another case's formula ("Same X. Same Y." belongs to case 03 only), and vary the chips too.

## 4. Visuals

- Every text-only section gets a glyph-style diagram. Shared parts: `Diagram` and `T` exported from `src/components/exhibits/Diagrams.tsx`. Put a case's own diagrams in its own file (this case: `DsDiagrams.tsx`) and register the ids in `ExhibitSlot.tsx` and `types.ts`.
- Outcome cards use `MetricVisual` (blocks per hour or day, dashed for the top of a range; a freed-time bar; a brand by platform grid). Label every one team-observed, walked or demo.
- Snapshot: when the hero already shows the number, the snapshot shows the glyph only (handled in `Snapshot.tsx`).
- Illustrations use a demo brand and generic names; say so in one line under the picture.

## 5. Build mechanics

- `hook` in `types.ts` switches `CaseHero` to the picture-first layout. The `opener.stories` feed its tabs (`SameRequest.tsx` is this case's picture).
- `HeroStories` has a `compact` mode for showing full story tabs inside a beat.
- Check desktop, 1100px, phone, dark (localStorage `theme=dark`) and reduced motion before sending screenshots.
- Commit after each approved change, on the `case-studies` branch.

## 6. Session process

- Copying files to the Mac can silently write an older version when the same file was sent before. After every copy, compare checksums on the Mac against the working copy; stage under a fresh file name if they differ.
- One question at a time; when the user asks for a view, give it straight.

## 7. Cases 02, 04 and 05 (built 2026-10-03, same session)

- All three now use the picture-first hero. The hero is data-driven: `hook` in `case-studies.ts` holds the line, the turn, an optional `number`, the picture's labels and legends, and one finding per tab. Only words copied verbatim from the old system get `quoted: true`; everything else shows as a plain statement with its source.
- Each picture's two screens live in `src/components/case/hook/screens.tsx` (registered by `HookVisualId`); `HookFrame.tsx` does the tabs, marks, legends and evidence line for every case.
- Outcome cards can take a data-driven `viz` (blocks, dots, compare, fan, timeline, ticks) instead of one-off code. Every viz carries its provenance note.
- New diagrams for every text-only section live in `src/components/exhibits/CaseDiagrams.tsx`.
- Numbers chosen for the heroes: 02 `< 24 h` to theme a new client; 04 `7 in 10` blind head-to-heads (own harness, AI judge); 05 `3.5M` residents.
- Copy across all three was cut to the budget in section 2. No facts or numbers were added.

## Open item for this case

- The full story tabs also appear inside Frame ("Three things the AI got wrong") and now repeat the hero tabs. Recommendation: remove the Frame copy. Awaiting the user's call.
