# CLAUDE.md — Skydive DropX

---

## Project

- Business: Skydive DropX
- Type: Commercial drop zone (tandem first, AFF second) with the sport/club side kept secondary
- Track: Phases 0-8 only
- Domain: skydivedropx.com (confirm DNS location with Ben before Plausible)
- Repo: create github.com/eem29/dropx-website on first session
- Contact: ben@skydivedropx.com / (027) 2929951

---

## Always Do First

At the start of every session, before writing any code:
1. Load the frontend-design skill
2. Load the web-build-standards skill
3. Read this file in full
4. Read `rules/design-system.md` — colors, logo, typography, image art direction, anti-generic guardrails
5. Read `rules/copy-tone.md` — voice, content notes, FAQ, client notes
6. Read `rules/technical.md` — integrations, CMS, SEO, accessibility
7. Read `brand_assets/` — logo variants, palette, any guidelines
8. Read the relevant JSON file in `content/` for the page being worked on
9. Do not begin any HTML until all relevant steps are complete

---

## Pages

- index.html         — Homepage (tandem-first)
- tandem.html        — Tandem skydiving: altitudes, prices, requirements, the day, location
- media.html         — Photo and video packages
- learn.html         — Learn to skydive (AFF)
- vouchers.html      — Gift vouchers
- terms.html         — Booking terms (content from terms.json)
- faq.html           — FAQ (grouped, CMS-managed)
- contact.html       — Contact + tandem booking enquiry form (?topic=tandem|voucher|aff)
- about.html         — About DropX
- jump.html          — Sport jumping (licensed jumpers)
- demos.html         — Demo jumps
- thank-you.html     — Form submission confirmation
- 404.html           — Not found
- admin/index.html   — Decap CMS admin panel

Content files:
- content/site.json    — Booking links, nav, footer, social, reviews
- content/tandem.json  — Altitudes, prices, requirements, day steps, location, camera packages
- content/aff.json     — AFF course
- content/faq.json     — FAQ groups
- content/terms.json   — Booking terms
- content/jump.json    — Sport jumping ticket + activities
- content/events.json  — Events (unused)

Photos: raw tandem originals in `SDX Tandems/` (gitignored). Web versions in `dropx-images-web/tandem/`
as tandem-N.webp (desktop), tandem-N-mobile.webp (portrait crop), tandem-N-tile.webp (800w).

---

## Local Server

- Always preview on localhost — never from file:/// path
- Start: `node serve.mjs` (http://localhost:3000)
- Start in background before screenshots
- Do not start a second instance if one is already running

---

## Screenshot Workflow

After every meaningful change, screenshot and read before continuing.

- `node screenshot.mjs http://localhost:3000`
- `node screenshot.mjs http://localhost:3000 label-name`
- `node screenshot.mjs http://localhost:3000 mobile --width=375`

Minimum 2 rounds of screenshot/compare/fix before moving on.
Take a 375px mobile screenshot of every page before marking it done.

---

## Commits

After every completed section or feature. No batching unrelated changes.

Format: short imperative sentence.
- Good: "Add hero section with mobile layout"
- Good: "Wire Web3Forms to contact form"
- Bad: "updates" / "fix" / "wip"

---

## Hard Rules

- Do not add sections or content not in this brief
- Do not write tourist copy ("epic", "thrill of a lifetime", "unforgettable")
- Do not use em dashes anywhere
- Do not hardcode booking URLs: every Book link uses data-book and content/site.json → booking
- Do not use transition-all
- Do not use default Tailwind blue or indigo as primary color
- Do not hardcode content that should come from JSON
- Do not use a <div> where a semantic element belongs
- Do not add an image over 500KB without flagging it
- Do not commit with a vague message
- Do not invent prices, limits or policies: keep them in JSON with "placeholder": true until Ben confirms
- Do not stop after one screenshot pass
