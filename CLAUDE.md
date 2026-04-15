# CLAUDE.md — Skydive DropX

---

## Project

- Business: Skydive DropX
- Type: Sport drop zone / club — community site (not commercial booking yet)
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

- index.html         — Homepage
- about.html         — About DropX / the people / why it was set up (PLACEHOLDER — waiting on Ben's blurb)
- jump.html          — Jump With Us (sport jumping, coaching, demos, coming soon teaser)
- events.html        — Upcoming events calendar
- community.html     — Facebook Messenger group / how the community works
- faq.html           — FAQ (managed via CMS)
- contact.html       — Contact form
- thank-you.html     — Form submission confirmation
- 404.html           — Not found
- admin/index.html   — Decap CMS admin panel

Content files:
- content/faq.json         — FAQ questions and answers
- content/events.json      — Upcoming events
- content/jump.json        — Jump ticket prices, altitudes, coaching types
- content/site.json        — Global: nav, footer, social links, Facebook group URL

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
- Do not add FareHarbor or any booking system
- Do not use transition-all
- Do not use default Tailwind blue or indigo as primary color
- Do not hardcode content that should come from JSON
- Do not use a <div> where a semantic element belongs
- Do not add an image over 500KB without flagging it
- Do not commit with a vague message
- Do not invent copy for the About page — placeholder only
- Do not stop after one screenshot pass
