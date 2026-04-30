# design-system.md — Skydive DropX

---

## Brand Colors

Define as CSS custom properties inside :root {} on every page.
Never introduce a color not listed here. Derive all tints, overlays, and hover states from these values only.
Cyan picked from the logo X (Drop X Horiz - White - PNG.webp).

```css
:root {
  --color-accent:        #00C8FF;  /* cyan, the X in the logo */
  --color-text:          #FFFFFF;
  --color-text-muted:    #999999;
  --color-bg:            #000000;  /* pure black — matches logo background */
  --color-surface:       #111111;  /* slightly lifted for cards, sections */
}
```

Color use rules:
- --color-accent is the single brand accent — never use as a full section background fill
- Page and nav background: --color-bg (#000)
- Cards and sections: --color-surface (#111)
- Muted text only for secondary/supporting copy
- Never default Tailwind palette — everything from these tokens only

---

## Logo

Two variants — both WebP, both white/cyan on transparent:
- Horizontal: Drop_X_Horiz_-_White_-_PNG.webp — use in nav
- Stacked: Drop_X_Stacked_-_White-_PNG.webp — use for hero or square contexts

Rules:
- Dark backgrounds only — never place logo on white or light background
- Do not recolour, crop, or stretch either variant

---

## Typography

NOT YET CONFIRMED — no brand guidelines supplied. Infer from logo style.

Logo uses tight, bold, geometric sans-serif for the DROPX wordmark. Match this energy:
- Display/headings: a bold geometric sans (e.g. Barlow Condensed, Oswald, or similar — confirm with Emma)
- Body: clean readable sans-serif, not the same family as headings
- Tight letter-spacing on headings (-0.02em to -0.04em)
- Generous line-height on body (1.6 to 1.75)
- Never substitute with Inter, Roboto, Arial, or system fonts unless explicitly specified

---

## Image Art Direction

All images are pre-compressed WebP in dropx-images-web/. Use these only, never the originals.

### Hero candidates (homepage / major section headers)
Do NOT use the pink/striped canopy (20/21 series) as a hero — it is already DropX's Facebook cover photo.

Best options:
- Drop_X_Opening_2026-41.webp — Two jumpers, SKYDIVEDROPX banner, storm cloud backdrop. Strongest image.
- Drop_X_Opening_2026-40.webp — Jumper with red banner, dramatic clouds, Canterbury Plains
- Drop_X_Opening_2026-3.webp — Canopy over DZ, DROPX mown into the grass below
- Drop_X_Opening_2026-19.webp — Two freeflyers panoramic, Canterbury Plains, mountains
- Drop_X_Opening_2026-35.webp — Rainbow kit jumper, Canterbury tidal flats, wide
- Drop_X_Opening_2026-144.webp — River landing, jet ski, smoke, golden hour

### Sport jumping / action
14, 16, 18, 42, 44, 52, 54, 57, 58, 82, 83, 84, 85, 89, 91, 92, 97, 98, 107, 108

### Canopy / coaching
20, 21, 22, 49, 127, 128, 129, 132, 134, 143, 146, 150, 151

### People / community
5, 11, 12, 23, 24, 25, 26, 32, 63, 80, 96, 99, 116, 118, 119, 121, 137, 139, 140, 148, 149, 152, 153

### Demos
39, 45, 47, 88, 90, 93

### DZ / location / about
36, 37, 50, 94, 115

### NZ flag demo shots
IMG_3595.webp, IMG_3639.webp, IMG_3643.webp, IMG_3647.webp, IMG_3648.webp

---

## Anti-Generic Guardrails

- Colors: derive from brand tokens, never default Tailwind palette
- Shadows: layered, color-tinted (use --color-accent at low opacity), never flat shadow-md
- Typography: tight tracking on headings, generous line-height on body
- Gradients: layer multiple radial gradients, grain/texture via SVG noise where appropriate
- Animations: transform and opacity only, never transition-all, spring easing
- Images: gradient overlay and subtle color treatment on action photos
- Spacing: consistent tokens, not arbitrary Tailwind steps
- Depth: layering system (base / elevated / floating)
