# DropX homepage - final brief

## What we're building

A homepage for Skydive DropX that actually feels like a drop zone. Cinematic, image-heavy, bold, unmistakably Canterbury. Not a template. Not a three-card services grid. Not another flag-compositing exercise.

The current homepage is being replaced entirely. Do not try to edit the existing `index.html`. Build fresh.

## The vibe

From Ben's own words: *progression, unforgettable experiences, high energy, community driven, first timers and students, pushes and supports, dream factory.* This is aspirational, inclusive, and future-facing. First-timers, students, and experienced jumpers all feel at home. Tandem and AFF are part of the story even though they launch Spring 2026.

Reference energy: Patagonia films, Red Bull long-form pages, Burton snowboards, a good surf brand site. Bold type, cinematic photography, unexpected layout choices, deliberate rule-breaking. The site should feel like it was built by someone who gives a shit.

What it must NOT feel like: a small business template, a tourist booking site, a gym, a consultancy, a SaaS landing page.

Tone-wise: confident and warm. Aspirational without being a brochure. Inclusive without being generic. Less laconic, more alive.

## Rules

1. **Photos carry the site.** Every section is grounded in a photo. No sections that are just coloured backgrounds with text (except the Dream Factory beat, which is a deliberate breath).
2. **Full-bleed by default.** Edge-to-edge photography. No safe grid containers. Where containers ARE used, they sit on the image intentionally.
3. **Type goes big.** Hero headline 10-15vw. Section headlines 6-9vw. Don't be polite.
4. **Colour-grade the photos via CSS filters.** Cool the blues slightly, add subtle contrast, add grain via SVG noise overlay. Photos should feel filmic, not raw.
5. **Copy rules:** no em dashes, no exclamation marks, no tourist words ("epic", "thrill", "unforgettable-as-cliché", "take to the skies"). Write like a jumper talking to the world.
6. **Mobile must work.** Desktop can be ambitious. Mobile falls back gracefully to a stacked, single-photo-per-section layout. Diagonal splits become straight splits or single images on mobile.
7. **Do not view the image files directly.** Reference paths in HTML/CSS. Use `identify` via bash if you need dimensions.

## The photo assignments

All images live in `dropx-images-web/`. Use these specific files only. Do not freelance photo choices.

- Hero: `Drop_X_Opening_2026-83.webp` (left panel), `Drop_X_Opening_2026-19.webp` (middle panel), `Drop_X_Opening_2026-35.webp` (right panel)
- Fun jumping: `Drop_X_Opening_2026-49.webp`
- Coaching: `Drop_X_Opening_2026-57.webp`
- Demos: `Drop_X_Opening_2026-42.webp`
- Community: `Drop_X_Opening_2026-142.webp`
- Tandem and AFF: `Drop_X_Opening_2026-50.webp`
- Contact: `Drop_X_Opening_2026-144.webp`

The community photo 142 is the best image in the set (golden-hour swooper with jet ski, orange smoke, yellow banner bokeh foreground). Do not crop out the foreground banner bokeh — it's what makes the shot cinematic.

## Section order

1. Hero (triptych)
2. Stat strip
3. Fun jumping
4. Coaching
5. Demos
6. Community
7. Dream Factory beat
8. Tandem and AFF
9. Contact
10. Footer

## Section by section

### 1. Hero — diagonal triptych (desktop) / single image (mobile)

**Desktop:** three full-height panels side by side, divided by two diagonal lines running top-to-bottom across the hero. NOT one dominant panel with two small stacked panels — three equal(ish) tall rectangles, each tilted slightly, butted together. Both diagonal cut lines angle the same direction (sloping upper-left to lower-right) at roughly 25-30° from vertical.

Panel clip-paths (for a 100vw hero):

- **Left panel:** `polygon(0 0, 42% 0, 30% 100%, 0 100%)` — photo `Drop_X_Opening_2026-83.webp` (solo jumper, horizontal red banner, blue sky)
- **Middle panel:** `polygon(43% 0, 74% 0, 62% 100%, 31% 100%)` — photo `Drop_X_Opening_2026-19.webp` (two jumpers head-down over Canterbury Plains with Southern Alps visible, wide panoramic)
- **Right panel:** `polygon(75% 0, 100% 0, 100% 100%, 63% 100%)` — photo `Drop_X_Opening_2026-35.webp` (solo jumper in rainbow suit with green helmet, Canterbury coastline/lake below)

1% gaps between panels (42/43 and 74/75) create subtle dark separation between photos — background colour shows through.

Do not rotate, flip, or reframe the photos. Use them as they are. Tune `object-position` per panel so the subject sits in the visible area:
- 83: `object-position: 45% center`
- 19: `object-position: 55% center` (subjects are in the right half of this wide pano)
- 35: `object-position: 40% center`

Subtle 2-3px dark gap between panels, not a border.

Animate the panels sliding in from their respective edges on first load, meeting in the middle. ~600ms total, ease-out, fires once then static. If this is finicky to get clean, static is acceptable as a fallback — the photo combo is strong enough on its own.

**Mobile:** single full-bleed image, use `Drop_X_Opening_2026-35.webp` — portrait-friendly, single subject works on small screens.

**Content:**
- Eyebrow: `CHRISTCHURCH, NEW ZEALAND` — small caps, wide letter-spacing, accent colour
- Headline: `Welcome to the dream factory.` — 12vw, white, Barlow Condensed, mixed case, tight line-height, anchored bottom-left
- Subhead: `Canterbury's home for progression, community, and the jumps you'll talk about for years. Student training, sport coaching, and display skydiving over Christchurch.`
- CTAs: `Join the crew →` and `Jump info →` — arrow-linked text, not chunky buttons

Alternative headlines if `Welcome to the dream factory.` doesn't land against the imagery (ask Emma before switching):
- `More than just a skydive.`
- `Progression lives here.`
- `Built for the jump and everything after.`

**Nav:** transparent over the hero, minimal. Logo left, nav right. Sticky on scroll with a dark semi-transparent background after 50px.

### 2. Stat strip — directly below hero

Four columns: ALTITUDE / JUMP TICKET / WHO / LOCATION. Push the numbers bigger than the current site — 3-4vw for the values, tiny uppercase labels above them. Dark background, generous padding. Feels like a mission patch, not a pricing table.

- 12,000ft
- NZ$65
- Licensed jumpers
- Canterbury, NZ

### 3. What we do — three asymmetric beats

Do NOT build three equal cards. Build three scroll beats with rhythm.

**Beat 1 — Fun jumping (dominant, image-led)**
- Full-bleed background: `Drop_X_Opening_2026-49.webp`
- Text in lower-left quadrant, overlaid on a darker area of the image. Add a subtle gradient mask if needed (bottom-left dark to transparent) so text is always legible.
- Eyebrow: `EVERY WEEKEND`
- Headline: `Fun jumping.` — 6vw, white
- Body: `Show up, pay your ticket, get in the air. Canterbury sky, open door, all disciplines welcome. Whether you're sharpening your belly flying or pushing into head-down, you'll find the crew here.`
- CTA: `Jump with us →`

**Beat 2 — Coaching (split layout)**
- Two-column split. Left column: image `Drop_X_Opening_2026-57.webp` full height of section. Right column: dark solid background with text, aligned left.
- Eyebrow: `PROGRESSION`
- Headline: `Coaching.` — 6vw
- Body: `One-on-one with experienced coaches. Canopy, freefly, HP approaches, head-down, formation. Pick a discipline, pick a coach, go up.`
- CTA: `Find out more →`

Rhythm shift from Beat 1 (image-dominant overlay) to Beat 2 (split).

**Beat 3 — Demos (compact band)**
- Full-bleed image: `Drop_X_Opening_2026-42.webp`
- Single horizontal band, shorter than beats 1 and 2 (~40vh)
- Text centred or right-aligned, overlaid on darker image area
- Eyebrow: `DISPLAY SKYDIVING`
- Headline: `Demo jumps.` — 5vw
- Body: `Custom flags and banners into events, stadiums, and openings. Past clients include the Blues and Go Media. We turn up and we deliver.`
- CTA: `Enquire →`

### 4. Community — full bleed, the star of the page

This is where the site earns its character. The best photo in the set.

- Full-bleed image: `Drop_X_Opening_2026-142.webp`
- Minimum height: 100vh on desktop, 80vh on mobile
- Text in upper-right or lower-right quadrant, over the darker sky area
- Eyebrow: `THE ENERGY ON THE GROUND`
- Headline: `Where the crew lands.` — 8vw, white
- Body: `DropX isn't just the jump. It's the people you land with, the beers after, the stories you take home. Jump days coordinate through our Messenger community. Come meet the crew.`
- Button: outlined ghost button (`Join the community →`), white border, transparent fill, hover state fills white with dark text. Not cyan, not filled by default.

This section should feel like a breath. Give it more vertical room than any other section.

### 5. Dream Factory beat — NEW, non-negotiable

Ben's tagline is #dreamfactory. It earns a dedicated moment.

- Solid dark background, no image. Deliberate breath after the warmth of Community.
- Centred layout, lots of air above and below
- Single line at absurd scale: `Dream factory.` — 15vw, Barlow Condensed weight 900, mixed case (so it reads as a statement, not a brand shout). Accent colour, not white.
- One line of body text beneath, small, centred, max-width 500px: `We're here to build something different. A drop zone that pushes you, supports you, and keeps you coming back. This is Skydive DropX.`
- No CTA in this section.

Vertical height: 60vh minimum.

### 6. Tandem and AFF — welcoming, not "coming soon" apology

In Ben's framing, first-timers and students are central, not an afterthought. Give this real room.

- Full-bleed image: `Drop_X_Opening_2026-50.webp`
- Height: 70vh
- Text in upper-right or lower-right quadrant
- Eyebrow: `FIRST JUMPS, COMING SPRING 2026`
- Headline: `Your first jump. Or your fiftieth.` — 6vw
- Body: `Tandem skydiving and Accelerated Freefall training launch Spring 2026. Whether you're stepping out of an aircraft for the first time or starting your licence, we'll build the progression around you. Register your interest and be first on the list.`
- CTA: `Register interest →`

### 7. Contact — cinematic close

No generic CTA band. End the page on image.

- Full-bleed image: `Drop_X_Opening_2026-144.webp` — golden-hour companion to photo 142
- Height: 80vh minimum
- Text overlaid in the lower-left quadrant
- Eyebrow: `COME SAY HI`
- Headline: `Get in touch.` — 7vw
- Below headline, tight block: `(027) 2929951` / `ben@skydivedropx.com` / `Canterbury, NZ` — stacked, small, left-aligned
- CTAs: `Contact us →` and `Read the FAQ →`

Page ends on this image. No CTA band between this and the footer.

### 8. Footer

Dark, tight, functional. Three or four columns: wordmark + location + contact, nav links, jump info summary, copyright.

Add this line under jump info: `Open Saturdays and Sundays, weather permitting.`

## Type

- Headlines: Barlow Condensed, weight 700-800, mixed case (not all caps), tight line-height (0.9-0.95)
- Eyebrow labels: Barlow Condensed or Inter, all caps, weight 500-600, letter-spacing 0.15-0.2em, small (12-14px)
- Body: Inter or system sans, weight 400, 16-18px, line-height 1.6
- One accent moment allowed: a handwritten or script font for something small and specific. Used once maximum, or not at all. Do not force it.

## Colour

- Base: near-black (#0a0a0a or similar), not pure black
- Accent: **warm amber / orange**, pulled from the golden-hour shots (142 and 144). Target around `#E8763F` or similar. Ties visually to the community and contact sections, matches Ben's warm aspirational tone.
- Build with CSS custom properties so the accent can be swapped in one place.
- White text on imagery. Subtle dark gradient masks where needed for legibility.

## Logo — do not touch

Do not recolour the DropX wordmark or icon anywhere. The logo stays in its source colour (white). The accent colour applies to eyebrow labels, arrow link hover states, focus rings, Dream Factory text, and small UI moments only. Never to the logo.

## Image treatment

Apply this CSS filter chain to all hero/section images:
- Slight desaturation (0.95-0.98)
- Slight contrast boost (1.05-1.1)
- Subtle cool shift via a 3-5% opacity blue overlay on cool-toned images, or a warm overlay on golden-hour images (142, 144) to push them warmer

Add an SVG noise overlay layer site-wide — a fixed-position div with an SVG turbulence filter at ~3-5% opacity. Gives everything film grain.

## Zest moves — pick 2-3, don't do all

- Hero triptych with diagonal splits (already specified)
- Dream Factory oversized text beat (already specified, non-negotiable)
- Marquee ticker somewhere: thin horizontal band with scrolling text like `12,000FT • NZ$65 PER JUMP • CANTERBURY NZ • LICENSED JUMPERS • SATURDAYS & SUNDAYS • ` repeated. Could sit between stat strip and "what we do," or above the footer.
- Scroll-triggered headline reveals: section headlines slide up from below on intersection observer
- One deliberately cropped image moment: a headline or eyebrow label that runs off the edge of the viewport

Do not do all of these. Pick what serves the energy. Ask Emma before adding zest moves not already specified.

## Complete copy reference

Every piece of copy on the page, in one place:

**Hero**
- Eyebrow: `CHRISTCHURCH, NEW ZEALAND`
- Headline: `Welcome to the dream factory.`
- Subhead: `Canterbury's home for progression, community, and the jumps you'll talk about for years. Student training, sport coaching, and display skydiving over Christchurch.`
- CTAs: `Join the crew →` | `Jump info →`

**Stat strip:** ALTITUDE `12,000ft` | JUMP TICKET `NZ$65` | WHO `Licensed jumpers` | LOCATION `Canterbury, NZ`

**Fun jumping**
- Eyebrow: `EVERY WEEKEND`
- Headline: `Fun jumping.`
- Body: `Show up, pay your ticket, get in the air. Canterbury sky, open door, all disciplines welcome. Whether you're sharpening your belly flying or pushing into head-down, you'll find the crew here.`
- CTA: `Jump with us →`

**Coaching**
- Eyebrow: `PROGRESSION`
- Headline: `Coaching.`
- Body: `One-on-one with experienced coaches. Canopy, freefly, HP approaches, head-down, formation. Pick a discipline, pick a coach, go up.`
- CTA: `Find out more →`

**Demos**
- Eyebrow: `DISPLAY SKYDIVING`
- Headline: `Demo jumps.`
- Body: `Custom flags and banners into events, stadiums, and openings. Past clients include the Blues and Go Media. We turn up and we deliver.`
- CTA: `Enquire →`

**Community**
- Eyebrow: `THE ENERGY ON THE GROUND`
- Headline: `Where the crew lands.`
- Body: `DropX isn't just the jump. It's the people you land with, the beers after, the stories you take home. Jump days coordinate through our Messenger community. Come meet the crew.`
- CTA: `Join the community →`

**Dream Factory**
- Headline: `Dream factory.`
- Body: `We're here to build something different. A drop zone that pushes you, supports you, and keeps you coming back. This is Skydive DropX.`

**Tandem and AFF**
- Eyebrow: `FIRST JUMPS, COMING SPRING 2026`
- Headline: `Your first jump. Or your fiftieth.`
- Body: `Tandem skydiving and Accelerated Freefall training launch Spring 2026. Whether you're stepping out of an aircraft for the first time or starting your licence, we'll build the progression around you. Register your interest and be first on the list.`
- CTA: `Register interest →`

**Contact**
- Eyebrow: `COME SAY HI`
- Headline: `Get in touch.`
- Info: `(027) 2929951` / `ben@skydivedropx.com` / `Canterbury, NZ`
- CTAs: `Contact us →` | `Read the FAQ →`

**Footer tagline addition:** `Open Saturdays and Sundays, weather permitting.`

## Process

1. Read this brief end to end before writing any code.
2. Read `rules/design-system.md`, `rules/copy-tone.md`, and `rules/technical.md` for baseline project rules. This brief overrides where they conflict on layout direction.
3. Confirm the photos exist in `dropx-images-web/` with `ls`. Do not load images into your context.
4. Build the hero only. Show Emma for sign-off before continuing.
5. Build section by section down the page, checking mobile after each section.
6. Final pass: view at desktop, tablet, mobile. Check rhythm — does the page breathe or is it relentless? Adjust vertical spacing.

## Non-negotiable

- No three-card services grid.
- Maximum two flag/banner photos on the page (83 in hero, 42 in demos — that's the limit).
- No solid black empty sections between image sections (the Dream Factory dark beat is the deliberate exception).
- No generic "Get in touch" CTA band with two centered buttons.
- No cyan anything. Amber accent only.
- Dream Factory appears prominently on the page. Non-negotiable.
- Logo is never recoloured.
- Every photo used in the section assigned above. Do not freelance.
- No em dashes anywhere.

## Out of scope

- Inner pages — handle after homepage sign-off
- CMS wiring
- Tandem/AFF booking flow
- About page content (Ben's blurb still needs integration into an About page, not the homepage)

## Deliverable

A homepage that, if someone landed on it cold, would make them say: "this is a proper drop zone, and something's happening here." Something Emma will actually want to show Ben.
