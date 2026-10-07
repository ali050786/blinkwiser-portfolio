# Project rules for AI agents

## Design source of truth
- `docs/ux/DESIGN.md` (visual tokens) and `docs/ux/EXPERIENCE.md` (structure, behaviour, accessibility) are the contract. `docs/ux/DECISIONS.md` logs why.
- They win over any skill, mock or suggestion, including the installed Taste Skill skills (`design-taste-frontend`, `redesign-existing-projects`). Use those skills as a quality check against the specs, not to choose direction.
- If a skill rule conflicts with the specs, follow the specs and say which rule you skipped.

## Taste Skill overrides for this repo
- No Tailwind. Styling is CSS modules plus tokens from `tokens/tokens.json` (run `npm run tokens`; never edit `src/styles/tokens.css`).
- Ignore Taste Skill's dial baselines and colour rules. Palette, type and motion come from DESIGN.md.
- Keep URLs, slugs and nav labels unchanged.

## Non-negotiables
- No em dashes in shipped copy. No client or internal project names. `npm run check` must pass before deploy.
- Every text colour passes WCAG 2.2 AA (4.5:1) on canvas and raised surfaces. No opacity-based text colours.
