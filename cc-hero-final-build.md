# DropX hero - build from aligned panels

## Status

Three hero panel PNGs are ready, all at matching dimensions (2150×1528) with diagonals aligned. Emma designed these in Photoshop. Your job: place them in HTML/CSS, animate them, handle responsive. Do NOT recreate the diagonals in CSS - they're baked into the PNGs.

## Files

In `dropx-images-web/hero photos/`:

- `hero-panel-1-final.png` - Panel 1 (left, solo jumper with red banner)
- `hero-panel-2-final.png` - Panel 2 (middle, head-down two-way)
- `hero-panel-3-final.png` - Panel 3 (right, rainbow jumper over coastline)

All three are 2150×1528 pixels with transparent areas where no panel content exists. When stacked at the same position, they composite into the complete triptych.

## HTML structure

```html
<section class="hero">
  <div class="stage">

    <div class="panorama">
      <img class="panel panel-1" src="dropx-images-web/hero photos/hero-panel-1-final.png" alt="">
      <img class="panel panel-2" src="dropx-images-web/hero photos/hero-panel-2-final.png" alt="">
      <img class="panel panel-3" src="dropx-images-web/hero photos/hero-panel-3-final.png" alt="">
    </div>

    <nav class="site-nav">
      <!-- existing nav markup -->
    </nav>

    <div class="hero-content">
      <span class="hero-eyebrow">Christchurch, New Zealand</span>
      <h1 class="hero-headline">Welcome to the dream factory.</h1>
      <p class="hero-subhead">Canterbury's home for progression, community, and the jumps you'll talk about for years. Student training, sport coaching, and display skydiving over Christchurch.</p>
      <div class="hero-ctas">
        <a href="community.html" class="cta-arrow">Join the crew <span aria-hidden="true">→</span></a>
        <a href="jump.html" class="cta-arrow">Jump info <span aria-hidden="true">→</span></a>
      </div>
    </div>

  </div>
</section>
```

## CSS

```css
/* ── STAGE: clips the panorama as viewport narrows ── */
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

/* ── PANORAMA: fixed width based on panel aspect ratio
   Panels are 2150×1528 native. At 100vh, we scale width accordingly.
   On standard 16:9 screens (1920×1080), panorama should be ~1519px wide to maintain panel aspect.
   Simpler approach: set panorama to a fixed max width, let panels scale to fill height.
── */
.panorama {
  position: relative;
  width: 100%;
  max-width: 1520px; /* 2150 * (1080/1528) = ~1519 at 100vh=1080 */
  height: 100%;
  margin: 0 auto;
  aspect-ratio: 2150 / 1528;
}

/* Alternative if the fixed-width panorama is preferred for curtain clipping: */
/* .panorama {
  width: 1520px;
  min-width: 1520px;
  max-width: 1520px;
  height: 100%;
  margin: 0 auto;
} */

/* ── PANELS: all three stacked in the same position
   Transparent areas in the PNGs allow them to overlap
   and form the triptych composition.
── */
.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* IMPORTANT: contain, not cover - preserves panel alignment */
  object-position: center;
  pointer-events: none;
  user-select: none;
}

.panel-1 { z-index: 1; }
.panel-2 { z-index: 2; }
.panel-3 { z-index: 3; }

/* ── LOAD ANIMATION: each panel slides in from its own edge
   Panel 1 from left, panel 2 from top, panel 3 from right
── */
.panel-1 {
  animation: slideInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}

.panel-2 {
  animation: slideInTop 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.panel-3 {
  animation: slideInRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

@keyframes slideInTop {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .panel-1, .panel-2, .panel-3 {
    animation: none;
  }
}

/* ── NAV: inside .stage, pinned to visible viewport ── */
.site-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  /* keep existing nav styles from current build */
}

/* ── HERO CONTENT: inside .stage, pinned to visible viewport ── */
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

/* Subtle radial gradient behind text so it's legible over photos */
.hero-content::before {
  content: '';
  position: absolute;
  inset: -2rem -3rem -2rem -2rem;
  background: radial-gradient(ellipse at bottom left,
    rgba(10, 10, 10, 0.65) 0%,
    rgba(10, 10, 10, 0.35) 40%,
    transparent 70%
  );
  z-index: -1;
  pointer-events: none;
}

/* ── MOBILE: below 768px, show only panel 1 full-bleed ── */
@media (max-width: 767px) {
  .panorama {
    width: 100vw;
    max-width: 100vw;
    aspect-ratio: auto;
  }

  .panel-2, .panel-3 { display: none; }

  .panel-1 {
    animation: fadeIn 0.8s ease-out 0.1s both;
    object-fit: cover;
    object-position: center;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .hero-content {
    left: 5%;
    right: 5%;
    max-width: 90vw;
    bottom: 8%;
  }

  .hero-headline {
    font-size: clamp(2rem, 10vw, 3.5rem);
  }
}
```

## Two CSS approaches - pick based on how the hero behaves

The brief above includes both approaches. Pick based on what looks better:

**Approach A (default):** `.panorama` uses `aspect-ratio: 2150 / 1528` with `max-width: 1520px`. The panorama maintains its aspect ratio regardless of viewport. On narrow viewports, it shrinks proportionally. Simpler, no curtain clipping.

**Approach B (curtain clip):** `.panorama` is fixed at `1520px` width. As the viewport narrows, `.stage` clips it from the right, revealing less of panels 2 and 3. This is the Emma McIntosh pattern - more ambitious but harder to tune.

Start with Approach A. If it looks good, ship it. If Emma wants the curtain-clip behaviour, swap to Approach B.

## Critical: object-fit: contain, not cover

The panels have transparent areas. Using `object-fit: cover` will crop the transparent areas and break the composition. Use `object-fit: contain` so each PNG displays at its full aspect ratio within the panorama.

## What NOT to do

- Do NOT apply `clip-path` to the panels. Diagonals are in the PNGs already.
- Do NOT use CSS masks, gradients, or skew to create additional diagonals.
- Do NOT crop the panel PNGs with object-fit: cover. Use contain.
- Do NOT add the 3-layer gradient overlay system from earlier briefs. Emma baked the colour grade into the PNGs.
- Do NOT scale any panel differently from the others. All three scale together.

## Testing

After building:
1. At 1440px+ viewport: verify the three panels form a seamless triptych matching the reference composite `DropX Hero reference.jpg`.
2. Resize from 1440px to 768px: verify the composition scales together (Approach A) or panels 2 and 3 progressively clip (Approach B).
3. Mobile (< 768px): only panel 1 visible, fills viewport.
4. Load animation fires once, each panel slides in with a slight stagger.
5. Headline "Welcome to the dream factory." is readable against the hero. If not, tune the radial gradient behind it.

Show Emma at desktop width first.

## Non-negotiable

- Panels never compress or squish.
- Diagonals come from the PNG transparency, not CSS.
- Nav and content pinned to visible viewport at all times.
- Logo stays white, no recolouring.
- Headline text is `Welcome to the dream factory.` exactly.
- No em dashes in any copy.

## Delete from current build

Delete all of this from the current `index.html`:
- The `.panel-left`, `.panel-middle`, `.panel-right` classes with clip-path polygons
- The existing panel animations
- The existing 3-layer overlay system (if present)
- The existing mobile fallback using panel 35 only

Rebuild the hero block from scratch using the structure in this brief. Everything below the hero stays untouched.
