# Revvi Homepage — Master Build Brief

Status: Design complete and reviewed through multiple rounds (internal + external CRO feedback). Ready to build, pending Mark's sign-off on 4 flagged items below.

---

## GLOBAL RULES — apply everywhere, no exceptions

1. **No em dashes (—) anywhere in shipping copy.** They read as AI-generated
   writing. Use a comma, a period, a colon, or split into two sentences
   instead. This applies to every page, not just Home — check any copy
   Claude Code generates on its own too, not just what's specified here.

2. **Mobile-first, tested down to 320px width, not just "responsive."**
   Past experience on this project: relying on flexbox auto-wrap alone
   caused a real bug where content silently collapsed to near-invisible on
   mobile instead of stacking. Don't repeat that pattern. For every
   multi-column section below:
   - Force explicit `flex-direction: column` at the mobile breakpoint —
     don't rely on `flex-wrap` alone to trigger stacking.
   - Breakpoints: 860px (tablet), 480px (phone), 340px (small phone).
   - Test every section at exactly 320px width before calling it done.
   - Buttons go full-width on mobile.
   - Any side-by-side image+text section stacks image-on-top,
     text-below on mobile.

3. **Poppins for headings only. Inter for everything else.** Never mixed
   within the same text block.

4. **Colour system:**
   - Purple `#7B3DFF` — primary, buttons, links, active states. Used
     sparingly, not as a dominant fill colour.
   - Navy `#0D162B` — dark section backgrounds (hero, stat sections,
     security, footer, final CTA).
   - Green `#1F9E5A` — reserved for measurable positive outcomes only
     (savings figures, calculator results). Never a general brand colour.
   - Off-white `#F8F9FB` — light section backgrounds.
   - Soft lavender `#F1EBFF` — icon backgrounds, small accents only.

5. **Motion principles:**
   - Fade + translate reveals: 400-600ms, ease-out.
   - Hover states: 200ms.
   - Number counters (stat rings, calculator): 800-1200ms, ease-out.
   - Hero story rotation: 6-8 seconds per story (already built).
   - No bounce, no spin, no aggressive parallax, no animating body text.
   - Every animation must respect `prefers-reduced-motion` — fall back to
     static/instant states. `reveal.css` already has this built in; extend
     the same pattern to any new animation, don't build a separate system.

---

## PAGE STRUCTURE — Home, in order

1. Nav + Hero (dark)
2. Where Revvi Finds Opportunities (light) — **flagged, see below**
3. Stat 1 — Save Time, 79% (dark)
4. Interactive Savings Calculator (light grey)
5. Stat 2 — Make Money, 43% (dark)
6. [Reserved: Case Study placeholder] (light)
7. Start Small — 4 steps (light) — **flagged, see below**
8. How Revvi Works (light grey)
9. Security & Control, with architecture visual (dark) — **flagged, see below**
10. Industries (light)
11. FAQ (light grey)
12. Final CTA (dark) — **flagged, see below**
13. Footer (dark)

No two adjacent sections share the same layout pattern — this was
deliberately checked section-by-section during design.

---

## FLAGGED ITEMS — confirm with Mark before/while building

These four points came from external CRO feedback and directly override
decisions Mark made explicitly earlier in this project. Implement them as
specified below since that's been agreed, but Mark hasn't seen or
confirmed these specific changes yet — flag clearly when this goes to him.

**1. Pillar renaming (Section 2)**
Was: "Three Areas We Focus On" with pillar names Finance & Admin / Sales &
Leads / Operations & Workflow as the primary headline.
Now: Renamed to "Where Revvi Finds Opportunities" with outcome-led
headlines (Save Time / Capture Revenue / Streamline Operations). Original
pillar names kept as sub-text for consistency with the Solutions page.

**2. Start Small restructured (Section 7)**
Was: Mark's own confirmed wording, 3 steps — Start / Prove / Expand.
Now: A new 4-step framework — Identify / Automate / Prove / Expand.

**3. Security & Control moved down (Section 9)**
Was: Mark explicitly asked for this section moved HIGHER up the page,
with stated reasoning — it should answer "is this an AI company taking my
data?" before asking for more engagement.
Now: Moved lower (position 9 of 12), per CRO sequencing logic (build
interest before addressing security).

**4. Final CTA is single-button only (Section 12)**
Was: A real contact form was explicitly requested and added in a prior
round, overriding the original "single CTA" rule.
Now: Reverted back to single-CTA-only, no form. This is the *second*
reversal on this exact question — worth deciding once with Mark rather
than flipping again later.

---

## SECTION-BY-SECTION SPEC

### 1. Nav + Hero (dark, `#0D162B`)

**Nav:** Logo (use `revvi-logo-lockup-dark-bg.png` from `/docs/logo/`) left,
menu links (How It Works / Solutions / About) centre, CTA button right.

**Hero headline:** "Where is your business losing time or money?"

**Hero subtext:** "Revvi finds and automates the repetitive work costing
your business time and money, using the software you already have."

**CTA button text (used consistently everywhere on the page):**
"Find My Automation Opportunities"

**Trust row:** Free · 15 minutes · No obligation

**Hero visual:** Animated workflow diagram — already built in
`/docs/hero-animation.html`. Reuse that file's `.diagram` markup, CSS, and
JS exactly (see prior handoff notes for merge instructions — pull in only
the `.diagram` block, not the nav/hero copy from that file, since real
versions of those already exist here).

**New addition this round:** Add a subtle "breathing" glow behind the
Revvi node — radial box-shadow pulsing between 0.4 and 0.6 opacity, ~3
second ease-in-out loop, respecting `prefers-reduced-motion`.

---

### 2. Where Revvi Finds Opportunities (light, `#fff`)

**Heading:** "Where Revvi finds opportunities"
**Subtext:** "Three places most businesses are losing time, money, or both."

Three cards, equal width, icon + heading + one line, `#F8F9FB` background,
14px border-radius:

| Icon | Heading | Sub-text |
|---|---|---|
| $ | Save time | Finance & Admin: invoices, data entry, reporting |
| ↗ | Capture revenue | Sales & Leads: follow-ups, quotes, CRM |
| ⚙ | Streamline operations | Operations & Workflow: jobs, approvals, compliance |

**Animation:** On hover, icon lifts slightly + subtle glow (200ms). Cards
fade in on scroll using the existing `reveal` class with staggered
`data-delay="1/2/3"`.

---

### 3. Stat 1 — Save Time (dark, `#0D162B`, dot-grid texture)

**Label:** SAVE TIME (purple, `#7B3DFF`)
**Headline:** "79% of Australian SMBs using AI say it has improved their
productivity."
**Source:** "Source: Intuit QuickBooks, 2026 AI Impact Report"

**Visual:** Circular progress ring, purple stroke, 79% filled.

**Animation:** On scroll into view (once only): ring draws from 0% to 79%,
number counts up from 0 to 79, both over 800-1200ms.

**Accuracy note:** copy says "say it has improved their productivity" —
this is an attitudinal self-report from the source survey, not a measured
productivity increase. Don't strengthen this wording.

---

### 4. Interactive Savings Calculator (light grey, `#F8F9FB`)

**Heading:** "What is repetitive work costing your business?"
**Subtext:** "Adjust the numbers below to see your potential."

**Real, functional inputs (not static):**
- People doing the work (number input, default 5)
- Hours per week, per person (number input, default 10)
- Average hourly cost, incl. super (number input, default $45)

**Formula:** `people × hours/week × hourly rate × 52 weeks = annual value`
(1,820 hours/year of team capacity at the default values = $81,900)

**Result display:**
- Label: "Potential value of staff capacity recovered per year"
- Big number, green (`#1F9E5A`), Poppins bold, largest text on the page
- Sub-line: "[X] hours/year of team capacity"
- CTA button: "Find My Savings Opportunities"
- Disclaimer below: "Results are indicative only. Actual outcomes depend
  on the process, systems and implementation."

**Animation:** As any input changes, the result number smoothly counts
up/down to the new value (800-1200ms, ease-out). This is the single most
important interaction on the page — get this one right even if others
slip.

**Cross-page continuity (build this precisely):**
1. Whenever the calculator result changes, store it in `sessionStorage`
   under key `revvi_calc_result` as `{ annualValue: <number>, hoursPerYear: <number> }`.
2. All CTA buttons linking to the Free Assessment page link normally —
   no URL parameters needed.
3. On `free-assessment.html` load, check `sessionStorage` for
   `revvi_calc_result`:
   - If present: show "You could have approximately $[annualValue] of
     staff capacity tied up in repetitive work. Let's find where it's
     going." (formatted with commas)
   - If absent (direct navigation, no calculator interaction): fall back
     to the default confirmed intro copy: "A simple, low-risk way to see
     where your business could save time and capture more revenue, with
     no obligation."
4. Clear `revvi_calc_result` from sessionStorage once the assessment form
   is successfully submitted.

---

### 5. Stat 2 — Make Money (dark, `#0D162B`, dot-grid texture)

**Label:** MAKE MONEY (green, `#1F9E5A`)
**Headline:** "43% of Australian SMBs using AI report increased revenue."
**Source:** "Source: Intuit QuickBooks, 2026 AI Impact Report"

Same visual/animation treatment as Stat 1, green ring instead of purple.

---

### 6. Reserved: Case Study (light, `#fff`)

Dashed-border placeholder box, NOT real content. Text inside: "Reserved —
real case study once you have 2-3 clients." Example format to use once
real: "12 hrs/week → 3 hrs/week — how Revvi automated invoice processing
for a [real client]." Do not populate with fabricated content.

---

### 7. Start Small (light, `#fff`)

**Heading:** "Start small. Prove the value. Expand from there."

Four steps, horizontal row with arrow separators, no cards — just
label + one line each:

| Step | Label | Description |
|---|---|---|
| 01 | IDENTIFY | Find one high-value repetitive process. |
| 02 | AUTOMATE | Build and test it around your existing systems. |
| 03 | PROVE | Measure the time or money recovered. |
| 04 | EXPAND | Only automate more once the value is clear. |

**Animation:** Connecting line between steps draws in on scroll into view.

**Real photo:** `/docs/team_final_v2.jpg` — if used in this section (or
wherever the final layout places it), container must be a **fixed
380×280px box, object-fit: cover, NOT a flex ratio** (a flex-ratio
container previously caused this exact photo to distort — use explicit
pixel dimensions).

---

### 8. How Revvi Works (light grey, `#F8F9FB`)

**Heading:** "How Revvi works"

Five steps, connecting line through all of them, step 2 shown elevated
with a filled circle as the "hover" reference state. Every step has a
short caption visible at rest (not just on hover):

| # | Label | Caption |
|---|---|---|
| 1 | Assess | Find where time and money are being lost. |
| 2 | Recommend | What can realistically be automated, and what it's worth. |
| 3 | Build | Connect it to your existing systems. |
| 4 | Test & Approve | Your team reviews it before it goes live. |
| 5 | Support | We maintain and improve it as you grow. |

**Animation:** Steps activate sequentially on scroll into view (staggered,
reuse the `data-delay` pattern from `reveal.js`). Each step gets a subtle
purple glow when active. Hover state (desktop) still lifts + fills solid,
as already built — this is additive to the always-visible captions, not
the only way to see them.

---

### 9. Security & Control (dark, `#0D162B`)

**Heading:** "Built inside your systems. Controlled by your business."
**Subtext:** "Your business retains ownership of its accounts, systems and
data. Revvi receives only the access required to build and maintain your
automation, and you can change or revoke that access."

**Trust points (icon + label, stacked):**
- 🔒 You retain control
- 🛡 We use only what's needed
- ✓ Human approval where it matters

**New architecture visual (beside the text):**
```
YOUR BUSINESS
[Outlook] [Xero] [CRM] [SharePoint]
        ↓ secure connections
       (revvi)
        ↓ prepares the work
   [✓ Human approval]
   stays between Revvi and any final action
```
Reference build: `/docs/security_visual.png` for exact layout/spacing.

**Animation:** Connection lines from the 4 system nodes pulse gently
toward the Revvi node (not the reverse — data flows in for review, not
out unsupervised). The "Human approval" badge stays static/solid, not
animated — it's the fixed point of trust in the diagram, not something
in motion.

---

### 10. Industries (light, `#fff`)

**Heading:** "Industries"
**Subtext:** "A few industries we focus on, though any business with
manual, repetitive work is a good fit."

Pills (not cards), icon circle + label, rounded-full, subtle shadow,
`#F8F9FB` background:

Construction & Property · Accounting & Bookkeeping · Professional
Services & Legal · Recruitment · Real Estate · Manufacturing

**Future note (not now):** once there's conversion data, consider
replacing generic pills with per-industry proof links (e.g. "Construction
→ See how we automate job administration"). Not for this build.

---

### 11. FAQ (light grey, `#F8F9FB`)

Accordion, one open at a time.

- Does automation replace staff? → No. It removes repetitive work so your
  team can focus on higher-value tasks.
- Do we need new software? → Not necessarily. Revvi is designed to work
  with the systems you already use wherever practical.
- Do staff need to learn anything new? → Most automations run in the
  background. Your team can keep using their existing systems and simply
  review and approve work where required.
- Is everything automatic? → Only if you want it to be. Many clients
  choose a review-and-approve workflow for anything important.

---

### 12. Final CTA (dark, `#0D162B`)

**Headline:** "Where could your business save time or capture more
revenue? We'll help you find out."
**Button:** "Find My Automation Opportunities"
**Trust row:** 15 minutes · No obligation · Practical recommendations

**Animation:** Subtle purple glow/gradient movement behind the button
(slow, not distracting).

---

### Footer (dark, `#0D162B`)

Logo (dark-bg version) left, "Revvi Media · Gold Coast, Australia ·
revvi.com.au" right.

---

## ASSETS REFERENCE

All in `/docs/`:
- `copy.docx` — original confirmed copy doc (note: this homepage brief
  supersedes the Home page section of that doc; other pages unchanged)
- `brand-direction.docx` — full brand system reference
- `logo/revvi-logo-lockup-dark-bg.png` — nav and footer logo
- `logo/revvi-icon-purple-on-white.png` — favicon source
- `hero-animation.html` — reference implementation for the hero diagram
- `team_final_v2.jpg` — real photo, fixed 380×280px container required
- `security_visual.png` — reference layout for the architecture diagram
- `reveal.css` / `reveal.js` — scroll animation system, extend don't replace

## IMAGE SOURCING NOTE

Avoid AI-generated-looking stock imagery site-wide (glitchy renders,
uncanny-perfect environments, stray artifacts). Prefer real, authentic
Australian SME photography over generic tech-office stock. Use very
little photography overall — the workflow diagrams and icon system are
doing most of the visual work; more photos would dilute rather than
strengthen it.
