# Handoff: portfolio content (updated 2026-10-11)

Read this first in a new session, then docs/ux/DESIGN.md, docs/ux/EXPERIENCE.md and docs/ux/DECISIONS.md.

## How to write copy here
- Always use the human-story-writer-20 skill for any copy (site, case studies, resume, LinkedIn, emails).
- First person, plain words, contractions, medium-length sentences joined with "and", "but", "so".
- No arrows or dash ranges in prose ("from 9 steps to 5", "three or four days", not "9 → 5" or "3–4 days").
- No em dashes, no buzzwords, no clipped slogan lines, no "not X, it's Y".
- Never invent facts, numbers or quotes. If a detail is missing, ask.
- Ali's team calls the pre-testing design check "UX validation", not "design QA".

## Facts that must match everywhere (site, resume, PDFs, LinkedIn, Naukri Gulf)
| Role | Dates | Title |
|---|---|---|
| US health-insurance platform (Mphasis) | Oct 2020 to now ("the last six" years) | Founding UX Designer, now UX Lead. Official title: Technical Delivery Lead |
| Dubai Municipality (Mphasis) | Nov 2019 to Sep 2020, 11 months onsite | Senior UX Designer, onsite in Dubai (worked as lead designer) |
| Jet Airways (Mphasis) | Oct 2015 to Nov 2019 | User Experience Designer, one of several |
| IBN Al QYM, Doha | Mar 2014 to Mar 2015 | User Experience Designer |
| ITAD Learning, Pune | Jan 2012 to Dec 2013 | UX/UI Designer |

Key numbers: 11 years in UX; enrollment from 9 steps to 5; a new client themed in under a day (was weeks); Jira story to screen in three or four days (was one or two weeks); about 40% less design production time; team of four designers, two hired by Ali; 120+ components; nine Dubai Municipality apps into one.

## Confidentiality rules
- Never name the US insurers (check:copy blocks them).
- Dubai Municipality: public-only route. Live-app screenshots (labelled), public app names, and Ali's general process only. Do not name the low-code platform, and do not describe the client's internal behaviour (departments not sharing, stakeholder friction, apps not working). No app store links: the store ratings are poor and about stability after Ali left.
- Jet Airways, Dubai Municipality and Mphasis may be named.

## Case studies
- All six use the story layout: `story.chapters` in src/content/case-studies.ts, rendered by src/components/case/Story.tsx.
- Block kinds: p, exhibit, reframe, note, cards, metrics, stories, links, image.
- Case 05 (Dubai) was rewritten from a fresh interview: "Dubai Municipality: turning nine city apps into one". Its diagrams are in src/components/exhibits/DmDiagrams.tsx.
- Case 04 (Blinkwiser) has a "Live now" panel linking to https://carousel.blinkwiser.com/ (`live` field, LiveLinks.tsx).
- The old five-beat layout is still in the code but unused.

## Resume PDFs
- Content: src/content/resume.ts (variants: general, health-tech).
- General PDF: public/sikandar-ali-abdul-resume.pdf. Health-tech PDF: resumes/sikandar-ali-abdul-resume-health-tech.pdf (not deployed).
- Regenerate after any resume.ts change: open /resume and print to PDF, A4, no background graphics, one page. For health-tech, run with RESUME_VARIANT=health-tech and print at 97% scale to stay on one page (the general one fits at 100%).
- The resume profile is in first person. Experience lines open with the action or the result rather than "I" (a run of "I" openings read as self-focused), and no two in a row open the same way. Dates use months and words ("Oct 2020 to present"), matching LinkedIn.

## Open items
- Optional: replace the repeated fan diagrams in case 02 ("120+ components") with custom metric visuals, as was done for Jet Airways and Dubai.
- LinkedIn Featured card: update the thumbnail to a screenshot of the current home page.
- Drafts already given in chat for LinkedIn (headline, About, experience entries) and Naukri Gulf (headline, summary, job profile). The About and Naukri summary should say "the last six" years.
- Naukri Gulf: functional area should be a design category, not "IT Software"; availability should reflect the 90-day notice; joining month should match LinkedIn (Oct 2015).
