# portfolio.blinkwiser.com

Sikandar Ali Abdul's portfolio, v2. Five decision-led case studies, interactive exhibits, and a three-tier design-token system, built on Next.js (App Router) and shipped as static HTML with small client islands.

## Run it

```bash
./startup.sh          # frees port 3000, installs deps on first run, starts dev
# or
npm install
npm run dev           # http://localhost:3000
```

`PORT=3001 ./startup.sh` to use a different port. Node 20.9 or newer.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server. Rebuilds tokens first via `predev`. |
| `npm run build` | Production build. Rebuilds tokens first via `prebuild`. |
| `npm start` | Serves the production build. |
| `npm run tokens` | Compiles `tokens/tokens.json` into `src/styles/tokens.css`. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run check:copy` | Fails on em-dashes or blocked client names in shipped copy. |
| `npm run check:contrast` | WCAG 2.2 audit of the token pairs the UI uses. |
| `npm run check` | All three checks. Run before every deploy. |

## Layout

```
src/
  app/          routes: home, /work/[slug], /colophon, OG images, sitemap, robots
  components/
    home/       hero, work list, approach, about, contact
    case/       case-study page furniture
    exhibits/   the interactive demos embedded in case studies
    ui/         primitives
    layout/     header, footer, theme toggle
    motion/     reveal observer, count-up
  content/      all copy and data: site.ts, case-studies.ts, deck.ts, types.ts
  styles/       globals.css, tokens.css (generated, do not edit by hand)
  fonts/        self-hosted IBM Plex Sans Arabic and Geist Mono
tokens/         tokens.json, the source of truth for every colour, space and easing
scripts/        build-tokens, check-copy, check-contrast
```

## Editing content

All copy lives in `src/content/`, never in components.

- `site.ts`: name, role, contact links, proof numbers, principles, capabilities, experience timeline, education, learning.
- `case-studies.ts`: the five studies. Slugs are `ai-readable-design-system`, `designing-trust-into-ai`, `enterprise-platform-from-zero`, `open-enrollment`, `dubai-municipality`. Each slug is a route, so renaming one breaks its URL and its OG image.
- `types.ts`: the shapes the content files have to satisfy. TypeScript catches a malformed study before it renders.

Two content rules are enforced by `check:copy` rather than by review: no em-dashes anywhere in shipped copy, and no client or internal project names. Extend the `BLOCKED` list in `scripts/check-copy.mjs` as that list changes.

## Tokens

`tokens/tokens.json` is W3C DTCG format in three tiers:

1. **primitive**: raw values, `--color-neutral-25`
2. **semantic**: intent, referencing tier 1, `--surface-canvas`
3. **component**: referencing tier 2, `--card-bg`

The build keeps references as `var()` chains instead of flattening them, so overriding one tier-2 token cascades to every component that consumes it. That is what makes dark mode and per-case-study theming a token override rather than a rewrite. Edit `tokens.json` and rerun `npm run tokens`; never edit `src/styles/tokens.css`, it is generated.

## Deploy

Static output from `npm run build`. Run `npm run check` first: a contrast regression or a leaked client name is the kind of thing that only shows up in public.
