# DropX hero - rework using curtain-clip pattern

## What's wrong with the current build

Equal-width clip-paths crop subjects out of frame when the viewport resizes. Photo 83's jumper ends up in the right-half bleed, photo 19's two subjects get cut apart. As soon as the viewport shifts, the composition breaks. Also, on resize the panels compress and distort the photos.

## The fix - curtain clip pattern

Proven pattern from Emma McIntosh's portfolio hero. Inner canvas stays a fixed width (1440px), outer wrapper clips the canvas from the right as the viewport narrows. Panels never compress - they peel away right-to-left like a curtain being drawn.

**Reference files (read these if accessible):**
- `~/clients/Emma McIntosh/brand_assets/emma-hero-final.html`
- `~/clients/Emma McIntosh/brand_assets/emma-hero-responsive.html` OR `emma-hero-curtain.html` (whichever is present)

If those files aren't accessible from the DropX project, the full CSS is inlined below.

## Structure

```html
<section class="hero">
  <div class="stage">

    <!-- Fixed 1440px panorama - never compresses -->
    <div class="panorama">
      <div class="panel panel-1"></div>
      <div class="panel panel-2"></div>
      <div class="panel panel-3"></div>

      <!-- 3-layer overlay system, inside panorama -->
      <div class="hero-overlay"></div>
      <div class="hero-depth"></div>
      <div class="hero-vignette"></div>
    </div>

    <!-- Nav and content positioned inside .stage, NOT .panorama -->
    <!-- They stay pinned to the visible viewport at all widths -->
    <nav class="site-nav">...</nav>
    <div class="hero-content">
      <span class="hero-eyebrow">Christchurch, New Zealand</span>
      <h1 class="hero-headline">Welcome to the dream factory.</h1>
      <p class="hero-subhead">...</p>
      <div class="hero-ctas">...</div>
    </div>

  </div>
</section>
```

## CSS - inline, use as-is

```css
/* ── STAGE
   Always 100vw × 100vh. Overflow hidden.
   This is the curtain that clips the panorama.
── */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  background: #0a0a0a;
}

.stage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* ── PANORAMA
   Fixed at exactly 1440px. Never shrinks or stretches.
   As the viewport narrows, .stage clips it from the right.
   As the viewport widens past 1440px, it stays centred with
   dark bars on either side (set on .hero background).
── */
.panorama {
  position: relative;
  width: 1440px;
  min-width: 1440px;
  max-width: 1440px;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  margin: 0 auto;
}

/* ── PANELS
   Fixed proportions. Asymmetric.
   Never compress at any viewport width.
── */
.panel {
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel:hover {
  transform: scale(1.015);
}

.panel::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.06);
  z-index: 2;
}

.panel:last-child::after { display: none; }

/* Panel photos - tune flex ratios and background-position per subject */
.panel-1 {
  flex: 1.1;
  background-image: url('dropx-images-web/Drop X Opening 2026-83.webp');
  background-position: 50% center;
}

.panel-2 {
  flex: 1.3;
  background-image: url('dropx-images-web/Drop X Opening 2026-19.webp');
  background-position: 60% center;
}

.panel-3 {
  flex: 0.9;
  background-image: url('dropx-images-web/Drop X Opening 2026-35.webp');
  background-position: 45% center;
}

/* ── DIAGONAL SPLITS via clip-path
   Slope direction: upper-right to lower-left.
   Each panel's bottom-right corner is pulled LEFT to create the slope.
   Overlap via negative margin so diagonals butt against each other.
── */
.panel-1 {
  clip-path: polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%);
}

.panel-2 {
  clip-path: polygon(40px 0, 100% 0, calc(100% - 40px) 100%, 0 100%);
  margin-left: -40px;
}

.panel-3 {
  clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%);
  margin-left: -40px;
}

/* ── OVERLAYS - three layers inside panorama
   Do not simplify to one gradient.
── */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(to bottom,
    rgba(10, 10, 10, 0.60) 0%,
    rgba(10, 10, 10, 0.15) 25%,
    rgba(10, 10, 10, 0.00) 45%,
    rgba(10, 10, 10, 0.60) 72%,
    rgba(10, 10, 10, 0.94) 100%
  );
}

.hero-depth {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background: linear-gradient(160deg,
    rgba(10, 10, 10, 0.00) 0%,
    rgba(10, 10, 10, 0.00) 55%,
    rgba(10, 10, 10, 0.35) 100%
  );
}

.hero-vignette {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background: linear-gradient(to right,
    rgba(10, 10, 10, 0.45) 0%,
    transparent 14%,
    transparent 86%,
    rgba(10, 10, 10, 0.45) 100%
  );
}

/* ── NAV - positioned inside .stage, NOT .panorama
   left: 0 / right: 0 relative to stage = always in visible viewport
── */
.site-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

/* ── HERO CONTENT - positioned inside .stage, NOT .panorama
   Always pinned to the visible viewport.
── */
.hero-content {
  position: absolute;
  bottom: 10%;
  left: 5%;
  z-index: 10;
  max-width: min(52vw, 680px);
}

.hero-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin-bottom: 1.75rem;
}

/* ── LOAD ANIMATION ── */
.hero { animation: heroFade 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.hero-content { animation: contentRise 1.2s 0.3s cubic-bezier(0.4, 0, 0.2, 1) both; }

@keyframes heroFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes contentRise {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── MOBILE - below 768px
   Panorama becomes viewport width, panels 2 and 3 hide,
   panel 1 fills the screen with normal responsive behaviour.
── */
@media (max-width: 767px) {
  .site-nav { padding: 1.25rem 1.5rem; }

  .panorama {
    width: 100vw;
    min-width: 0;
    max-width: 100vw;
  }

  .panel-2, .panel-3 { display: none; }

  .panel-1 {
    flex: 1;
    clip-path: none;
    margin-left: 0;
    background-position: center center;
  }

  .hero-content {
    left: 5%;
    right: 5%;
    max-width: 90vw;
  }

  .hero-headline {
    font-size: clamp(2rem, 10vw, 3.5rem);
  }
}
```

## Diagonal direction - critical

The diagonal splits slope from **upper-right to lower-left**. Top of each divider is to the RIGHT, bottom is to the LEFT.

In the clip-path polygons, this is expressed as `calc(100% - 40px) 100%` on the bottom-right corner - pulling the bottom-right LEFT by 40px to create the slope. Adjust the 40px value up or down (30px shallower, 60px steeper) to tune the angle.

If the diagonals end up going top-left to bottom-right, that's WRONG - the direction is inverted. Flip the clip-paths.

## What to test

Drag the browser window slowly from 1440px down to 480px. At every width:

- Panels must NOT compress. A panel at 1200px viewport should look identical to the same panel at 1440px viewport, just with less of panel 3 visible.
- Subjects stay visible inside each panel (jumper in 83, both jumpers in 19, jumper in 35).
- Nav and headline stay pinned to the left of the viewport. They never scroll off screen.
- Panel 3 disappears first (clipped right). Then panel 2. Then only panel 1 remains.
- At exactly 767px the mobile breakpoint kicks in, panel 1 fills the viewport normally.

On ultrawide (>1440px), the panorama stays centred at 1440px with dark bars (#0a0a0a) on either side. Nav and content pin to the visible viewport (not the panorama edges).

## Tuning

Flex ratios (1.1 / 1.3 / 0.9) and background-positions (50% / 60% / 45%) are starting points. Once built, Emma will eyeball each panel at full width and adjust. Make these easy to tweak - keep them at the top of the panel CSS rules, commented clearly.

The 40px diagonal offset is also tuneable. If the splits look too steep or too shallow at 1440px wide, adjust up or down.

## Process

1. Read Emma McIntosh hero reference files if accessible. Otherwise use the CSS above verbatim.
2. Delete the current hero's clip-path polygon approach entirely. Rebuild from scratch using the structure above.
3. Keep the current nav styles, film grain overlay, font imports. Only the hero internals change.
4. Test by resizing the browser window slowly. Fix any compression before showing Emma.
5. Show Emma at desktop width first. She'll resize to check the curtain behaviour.

## Non-negotiable

- Panels must NOT compress as the viewport narrows. If you see panels shrink, the pattern is wrong.
- Subjects must stay in their panels at every viewport width.
- Diagonal slope: upper-right to lower-left. Do not invert.
- Nav and hero-content pinned to visible viewport at all times.
- Logo stays white, no recolouring.
- Headline is clamp(2.5rem, 7vw, 6rem), not 12vw.
