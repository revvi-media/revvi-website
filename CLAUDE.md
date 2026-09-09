# Revvi Website

## Tech stack
- Plain HTML5, CSS3, vanilla JavaScript — no framework, no build step
- One shared CSS file for colours, fonts, spacing across all pages
- Hosted on Vercel, deployed via this GitHub repo (auto-deploys on push to main)

## Brand
- Primary colour: Purple #7B3DFF (buttons, links, active states — used sparingly)
- Dark background: Navy #0D162B (hero, footer, and alternating dark sections)
- Success/results colour: Green #1F9E5A (savings figures, positive outcomes ONLY — never a general brand colour)
- Light section background: Off-white #F8F9FB
- CTA section background: Soft lavender #F1EBFF
- Headings font: Poppins (headings only, strict — never used for body text)
- Body/UI font: Inter (everything else — paragraphs, buttons, nav, labels)
- Both fonts loaded via Google Fonts
- Direction: dark-led, alternating with light/soft-grey sections down each page (see rhythm below)

## Page rhythm (established pattern for Home, roughly applies site-wide)
Navy hero → white section → soft grey section → navy section → white section → soft lavender CTA → navy footer

## Site map (5 pages)
1. Home (index.html) — main sales page
2. How It Works (how-it-works.html)
3. Solutions (solutions.html)
4. About (about.html)
5. Free Assessment (free-assessment.html) — includes the 5-question lead form

## Assets already provided
- /docs/copy.docx — final confirmed copy for all 5 pages, tagged by component type ([TEXT], [ICON], [TIMELINE], [FORM] etc.)
- /docs/brand-direction.docx — full brand decisions, typography samples, page-rhythm mockups
- /docs/logo/ — logo lockup PNGs (dark-bg and light-bg versions) and icon-only variants. NOTE: these are raster working files, not final vector art — flag if a true SVG logo is needed later

## Hero animation — pending
The animated hero (3-story rotating workflow diagram: Sales/Finance/Operations) is not yet added to the project. Until the real animation file is provided, the Home page hero should use a simple static placeholder background — no animation.

## Key confirmed decisions — do not deviate without asking
- Hero headline: "Where is your business losing time or money?"
- Hero CTA button text: "Get My Free Business Assessment" (nav CTA is shorter: "Get Free Assessment")
- No AI/robot imagery anywhere — the hero uses the animated workflow diagram instead
- No pricing shown except the specific worked examples confirmed in the copy doc
- Calculator formula: people × hours/week × hourly rate × 52 weeks = annual value (confirmed)
  - 52 weeks, not 48: Australian annual leave is paid, so an hourly rate already reflects cost across the full year
  - The people multiplier is intended: the calculator has a "People doing the work" field and the result is total team capacity, not one person's
  - This supersedes the earlier "48 weeks, no people multiplier" note, which was an early rough estimate, not a confirmed figure
