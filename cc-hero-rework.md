# Hero triptych rework - correction

## Problem with current build

Two issues:

1. Wrong photo in the bottom-right panel. Should be 35, not 92.
2. The diagonal split angle is wrong. Current ~15° is too shallow and the splits fight the compositions.

## The correct treatment

The hero is three full-height panels, side by side, divided by diagonal lines. Think of it as three tall rectangles, each tilted slightly, butted together. Not a big left panel with two small right panels stacked vertically - that's what you built and it's wrong.

Three panels, three photos, each panel takes roughly equal width, separated by two diagonal cuts running top-to-bottom across the hero.

## Photos (final)

- **Left panel:** `Drop_X_Opening_2026-83.webp` — solo jumper, horizontal red banner, blue sky
- **Middle panel:** `Drop_X_Opening_2026-19.webp` — two jumpers head-down over Canterbury Plains with Southern Alps visible (this is a wide panoramic shot)
- **Right panel:** `Drop_X_Opening_2026-35.webp` — solo jumper in rainbow suit with green helmet, Canterbury coastline/lake below

Do not rotate, flip, or reframe the photos. Use them as they are. Object-position each photo within its clip-path to make sure the subject is visible in the panel's visible area.

## The diagonals

Two diagonal cut lines run top-to-bottom across the hero. Both diagonals angle the same way - sloping from upper-left to lower-right - at roughly 25-30° from vertical (steeper than the current ~15°).

Panel boundaries for a 100vw hero, using clip-path polygons:

**Left panel:** occupies leftmost section, right edge is the first diagonal
- Clip-path polygon: `polygon(0 0, 42% 0, 30% 100%, 0 100%)`

**Middle panel:** between the two diagonals
- Clip-path polygon: `polygon(43% 0, 74% 0, 62% 100%, 31% 100%)`

**Right panel:** rightmost section, left edge is the second diagonal
- Clip-path polygon: `polygon(75% 0, 100% 0, 100% 100%, 63% 100%)`

The 1% gaps between panels (42/43 and 74/75) create subtle dark separation between photos. Background color shows through.

## Object-position tuning per panel

Each photo needs to be positioned within its clip-path so the subject sits in the visible area:

- **83 (left panel):** `object-position: 45% center` — keeps the jumper and banner framed within the slanted panel
- **19 (middle panel):** `object-position: 55% center` — this is a wide pano, need to sit it so both jumpers sit within the middle slice. The two jumpers are in the right half of the original photo.
- **35 (right panel):** `object-position: 40% center` — keeps the jumper centred in the panel

CC should check each panel visually and adjust object-position if subjects are clipped.

## Why this works

The left-to-right-sloping diagonals create a consistent forward motion across the hero. The three photos all face different directions (83 faces right toward banner, 19 faces down, 35 faces camera) which gives visual variety without needing the cuts to match each photo's internal lines perfectly.

## What I don't want

- Do not try to match the clip-path angle to specific internal lines of each photo (banner edge, body angle, etc). That's over-engineering and it won't land cleanly with these three compositions.
- Do not rotate photos.
- Do not make one panel dominant and two stacked. Three equal(ish) vertical panels.
- Do not change the photos again.

## Mobile

On mobile (<768px), show only the middle panel (photo 19) as a single full-bleed hero. Photo 19 has the strongest "Canterbury drop zone" identity - two jumpers + Plains + Alps. Hide left and right panels.

Actually on reflection: use `Drop_X_Opening_2026-35.webp` for mobile. It's portrait-friendly and the single subject works better on small screens. Override the middle panel on mobile.

## Animation

Keep the existing slide-in animation from the edges. Three panels slide in from their respective edges (left from left, middle from top, right from right) and meet in the middle. Or all three from bottom if that feels better. Whatever CC thinks lands.

## Everything else stays

- Headline still `Welcome to the dream factory.` (updated - see below)
- Eyebrow: `CHRISTCHURCH, NEW ZEALAND`
- Subhead: unchanged
- CTAs: unchanged
- Text anchoring: bottom-left of hero
- Gradient for legibility: unchanged

## One copy update

Hero headline changes from `More than just a skydive.` to `Welcome to the dream factory.`

Reason: it's Ben's tagline and it belongs in the hero, not buried mid-page. The Dream Factory beat further down still uses `Dream factory.` at 15vw as the oversized statement. Repetition is deliberate.
