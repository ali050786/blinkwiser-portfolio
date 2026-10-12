---
name: portfolio.blinkwiser.com v3
description: Visual identity for Sikandar Ali Abdul's portfolio. Engineered, dark-first, work shown large. Extends the existing three-tier tokens in tokens/tokens.json; only deltas are listed here.
status: built (v4 home, 2026-10-10)
updated: 2026-10-10
source_of_truth_for_values: tokens/tokens.json (this file names intent and deltas; the JSON holds the numbers)
references:
  only: https://deploy.buildfastwithai.com/ (structure, scale and components; Halaska dropped 2026-10-06)
colors:
  # Sourced from deploy.buildfastwithai.com computed styles, 2026-10-06. New primitives; no old accent hues.
  surface-canvas: '#0A0C0F'          # dark is the default mode (decided)
  surface-sunken: '#0D1015'          # inspector workspace, work panels
  surface-raised: '#11151B'          # cards, contact card
  surface-highlight: '#181F2A'       # Deploy's navy: the chosen compare column, selected tabs
  surface-veil: 'rgba(255,255,255,0.02)'  # faint fill on cards and rows
  text-primary: '#E0E6F0'            # cool lavender-white, 15.2:1 on canvas
  text-secondary: '#9AA1AC'          # 7.3:1 on canvas
  text-tertiary: '#888F9B'           # eyebrows, index numerals. 5.9:1 on canvas, 5.1:1 on raised. Replaces Deploy's white 40% (3.8:1, fails)
  line-hairline: 'rgba(151,163,201,0.16)'  # frame rules, card borders, table rules
  line-soft: 'rgba(255,255,255,0.10)'
  accent: '#5A8DDE'                  # Deploy blue; 5.9:1 on canvas
  on-accent: '#080E1A'               # dark navy text on accent buttons, 5.8:1 (white fails at 3.3:1)
  light-mode: 'derive later; dark is the designed mode'  # [ASSUMPTION]
typography:
  display:
    fontFamily: '{primitive.font.family.sans}'       # Geist, kept (Deploy body and mono are also Geist)
    fontWeight: 600                                  # Deploy headings are 600
    letterSpacing: '-0.025em'                        # Deploy: -1.04px at 41.6px
  eyebrow:
    fontFamily: '{primitive.font.family.mono}'       # Geist Mono, promoted to a visible role
    fontSize: '{primitive.font.size.micro}'
    letterSpacing: '{primitive.font.tracking.label}'
    textTransform: uppercase
  index-numeral:
    fontFamily: '{primitive.font.family.mono}'
    fontSize: '{primitive.font.size.micro}'
  body:
    fontFamily: '{primitive.font.family.sans}'
    fontSize: '{primitive.font.size.body-m}'
rounded:
  sm: '{primitive.radius.xs}'      # [ASSUMPTION] engineered feel wants tighter corners than today
  md: '{primitive.radius.sm}'
  lg: '{primitive.radius.md}'
  full: 9999px                     # kept for buttons and nav pill only
spacing:
  frame-inset: '{primitive.layout.gutter}'
  section: '{primitive.space.15}'
components:
  frame:          { line: '{colors.line-hairline}', corner-mark: crosshair, inset: '{spacing.frame-inset}' }
  eyebrow:        { type: '{typography.eyebrow}', color: '{colors.text-tertiary}', prefix: index-numeral }
  headline-split: { line-1: '{colors.text-primary}', line-2: '{colors.accent}' }
  compare-table:  { rule: '{colors.line-hairline}', chosen-column-bg: '{colors.surface-raised}' }
  button-primary: { bg: '{colors.accent}', fg: '{colors.on-accent}', radius: '{rounded.full}' }
  header:         { height: 64px, single line, name left, text links right with accent underline for the current section, hairline divider, Resume text link, no pill containers }
  hero:           { one column, centred: eyebrow, two-line headline (~94px) with the rotating second line, intro, one button; frame lines and ruler }
  process:        { four steps on one hairline with small nodes: number, title, one plain sentence }
  case-card:      { size: 380 x 470, radius: 16px, art: line glyph 190px, tag: mono pill, title: 20px/600, facts: 3, footer: 'Full story' mono }
  framed-grid:    { border: '{colors.line-hairline}', corners: crosshair, used by: proof list, habits panel, capabilities, call box }
layout:
  content: 1120px
  section-padding: 128px
  h1: 78px / 600 / -0.025em
  h2: 54px / 600 / -0.025em
  intro: 17px / 1.6
---

# DESIGN.md

## Numbering (2026-10-12)
No decorative numbers: no "01 ·" on deck cards, chapters or the side rail, and the case label is the domain, not "Case 04". Numbers only where they show position or order: the homepage deck rail is dashes only, one per case, the current one longer and in the accent and the colophon build layers.

## Labels (2026-10-12)
Sentence case in the body font, no letter-spacing. No uppercase mono eyebrows, tags or footer labels on the site itself; uppercase stays only inside the demo product screens.

## Type (2026-10-12)
Libre Caslon Display for the largest headlines only (home hero, case opening lines, page titles); Libre Caslon Text (`--font-family-heading`) for section, chapter and card headings. Originally Libre Caslon Display for every title and heading (`--font-family-display`; `.t-display-*` use it at weight 400). It is cut for large sizes, so the small case title above each hero stays in the body font. Chosen by Ali over Newsreader, Philosopher (its capital I reads as a lowercase l) and Quintus (commercial, no files). Atkinson Hyperlegible Next for body, UI and labels (`--font-family-sans`). Atkinson Hyperlegible Mono for code and tokens (`--font-family-mono`). Geist only inside the demo product screens (`--font-product`). This overrides the older type notes below.

## Case pages follow the v4 home (2026-10-11)
- Display serif for story headings, hook lines, metric numbers and the next-case title; sans for diagram and screen UI.
- `--case-tint` (set per case from its home deck tint) is the surface behind every product screen, video and screenshot on a case page. Text on the tint uses `deck.on-tint`.
- Quiet tabs (raised fill and hairline on the current tab), canvas and band alternating per chapter, no crosshair frames.

## v4 home (2026-10-10): what changed
Ali asked for the home page to follow the structure and motion of the claude.com product overview page, in our own colours. Only the structure and the motion patterns are borrowed. The brand, type, colours, copy and imagery are ours.
- **Display type:** Newsreader (OFL, self-hosted, `--font-family-display`) for the hero, section headings, case titles, the capability map and the hiring sentence. Geist stays for body, UI and labels; Geist Mono for eyebrows. The rule "Instrument Serif retired" still holds.
- **Colours:** palette unchanged (canvas, text, one blue accent). New tokens: `surface.band` (dark `#10141A`, light `#ECEEF3`) for alternating sections, and six card tints (`deck.tint-1` to `-6`: sky, sea, lilac, slate, sand, mist) that sit behind product screens. Tints are surfaces only; text on a tint uses `deck.on-tint` (above 11:1). Hero headline line two and the hiring sentence's underline keep the accent's one job.
- **Shadows:** allowed on the tinted cards and the product screens on them, because those are light objects. Still none on dark surfaces themselves.
- **Work shown large:** every tile and card shows a real screen: rebuilt screens in the demo brand (captured from `components/screens`) or live-app screenshots for Dubai Municipality and Jet Airways. Assets in `public/work/tiles` (square crops) and `public/work/deck`.
- The v3 frame language (crosshairs, ruler) now only survives in the contact box.

## Brand & Style
A senior designer who also understands the business, shown through the craft of the page itself, not claimed in copy. The posture is engineered: the page reads like a well-specified system, with visible structure (frame lines, crosshair corners, a ruler, numbered sections). Text is short and confident. Single reference: Deploy, followed section for section. Halaska was dropped because mixing the two read as messy.

What it is not: a SaaS template (today's look), and not an Awwwards experiment that undercuts a regulated-enterprise buyer.

## Colors
Taken from Deploy's live styles, then re-hued so every dark surface and text colour sits on the brand blue's hue (217deg); lightness and contrast unchanged.
- **Canvas** `#0A0C0F`, near-black with a cool cast. Dark is the default; light mode is secondary and gets derived later. [ASSUMPTION]
- **Text** is cool, not neutral: `#E0E6F0` primary, `#9AA1AC` secondary. Tertiary is `#888F9B`, a solid cool grey. Deploy uses white at 40% here, which fails at 3.8:1; ours keeps the same look and passes on both canvas and raised.
- **Accent** `#5A8DDE` does one job: second line of split headlines, the primary button, active and focus states. Text on the accent button is dark navy `#080E1A` (5.8:1). White on this blue fails (3.3:1), and darkening the blue enough for white text drops the blue headline line below 4.5:1 on canvas, so one blue with dark button text is the only option that passes everywhere.
- **Hairlines** `rgba(151,163,201,0.16)`: a blue-grey line at low opacity. This carries the engineered feel and replaces shadows.
- **Raised** `#11151B` for cards; **highlight** `#181F2A` (Deploy's navy) for the chosen column in the compare table and selected tabs.
- **Light mode** (secondary): canvas `#F5F6F9`, text `#10131A` / `#4B5060` / `#5D6272`, accent `#2F62B8` with white text (5.9:1). All pairs pass AA; `npm run check:contrast` covers both modes.
- **Inspector redlines** sit on the light product screens, not the site chrome: selection `#3D74D4`, size label `#2F62B8`, spacing `#C8335E`, all with white text at 4.5:1 or better.
- The old turquoise, ultramarine, violet and vermilion primitives are retired from shipped surfaces.

## Typography
- Geist for display and body (kept). Headings move to weight 600, matching Deploy. Deploy's own heading face is a custom font that couldn't be identified from its live styles; Geist 600 is the stand-in. [ASSUMPTION] Geist Mono promoted from incidental to structural: every section eyebrow and index numeral.
- Split headlines: line one in primary text, line two in accent. Same family and weight on both lines; colour does the emphasis.
- Instrument Serif retired from shipped surfaces. [ASSUMPTION] It is only in the colophon today.

## Layout & Spacing
- A visible frame: hairline vertical rules at the gutter, crosshair marks at section corners, a tick ruler at the hero's base.
- Sections numbered with a mono eyebrow: `01 · SELECTED WORK`.
- Existing spacing scale and 1320px max kept.

## Elevation & Depth
No drop shadows on dark. Depth comes from surface steps (canvas, raised, sunken) and hairlines. [ASSUMPTION]

## Shapes
Tighter radii than today on cards and panels. Pills only for buttons, chips and the nav.

## Components
| Component | Anatomy | Colour | Notes |
|---|---|---|---|
| Frame | gutter rules, corner crosshairs, hero ruler | line-hairline, line-tick | decorative, aria-hidden |
| Eyebrow | index numeral, dot, uppercase label | text-tertiary | Geist Mono |
| Split headline | two lines | primary then accent | max two lines on desktop |
| Compare table | "assumed" column vs "what I did" column | chosen column raised | reuses today's Reframe / Fork content |
| Nav | floating pill, centred | surface-raised + hairline | |

## Do's and Don'ts
- Don't mix references. If a pattern isn't in Deploy, it needs a reason in DECISIONS.md.
- Do keep one accent. Don't use accent for decoration.
- Don't use shadows on dark surfaces.
- Every text colour passes WCAG 2.2 AA (4.5:1) on both canvas and raised. No opacity-based text colours.
- Don't use em dashes (enforced by check:copy).
- Don't name clients (enforced by check:copy).
