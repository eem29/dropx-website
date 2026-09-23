# technical.md — Skydive DropX

---

## Output Defaults

- One .html file per page. Shared tokens, nav, footer, buttons and section patterns live in css/site.css
  and js/site.js (added for the commercial build: 13 pages share the nav with the Book button).
  Page-specific styles stay in an inline <style> block loaded after css/site.css.
- Tailwind CDN only on 404.html and thank-you.html (legacy)
- Mobile-first responsive
- Breakpoints: 375px (mobile) / 768px (tablet) / 1280px (desktop)
- Placeholder images: https://placehold.co/WIDTHxHEIGHT

---

## Integrations

- **Domain:** skydivedropx.com — confirm DNS location with Ben before enabling Plausible
- **Repo:** create github.com/eem29/dropx-website on first session
- **Contact form (Web3Forms):** NOT YET — set up before building contact form, submits to ben@skydivedropx.com
- **CMS (Decap):** collections for faq, tandem, aff, terms, site, jump, events — Ben manages these himself
- **CMS auth:** Cloudflare Access — no third-party login required
- **Analytics (Plausible):** NOT YET — add after domain is confirmed with Ben
- **Facebook Messenger:** https://m.me/ch/Abaa9XdSVzir96lk/?send_source=cm:copy_invite_link
- **Booking:** provider TBC (Ben). All Book links use `data-book="tandem|vouchers|aff"` and are rewired by js/site.js from content/site.json → booking. Change the URL there, not in pages.

---

## Data and CMS

- Content lives in JSON files in content/
- Pages fetch JSON and render dynamically — never hardcode editable content in HTML
- Every fetch must handle failure: minimal fallback state, never a blank page
- CMS manages JSON files — do not bypass it after CMS is live
- Priority collections: FAQ, Events. Secondary: jump ticket info

Content files:
- content/faq.json         — FAQ questions and answers
- content/events.json      — Upcoming events
- content/jump.json        — Jump ticket prices, altitudes, coaching types
- content/site.json        — Global: booking links, nav, footer, social links, reviews
content/tandem.json      — Tandem altitudes, prices, requirements, day steps, location, camera packages
content/aff.json         — AFF course intro, price, stages
content/terms.json       — Booking terms sections

---

## Images

- All images are pre-compressed WebP in dropx-images-web/ — use these only, never the originals
- Never add an uncompressed image to the project
- Do not proceed with any image over 500KB without flagging it
- Always set explicit width and height on <img> tags
- loading="lazy" on all below-fold images
- alt on every meaningful image, alt="" on decorative

---

## File Size

Flag any single HTML file that exceeds 500 lines before continuing.

---

## SEO

Add to every page automatically:
- Unique <title> (50-60 chars, includes "DropX" or "Skydive DropX")
- <meta name="description"> (150-160 chars)
- og:title, og:description, og:image (1200x630px), og:url, og:type
- One <h1> per page, logical h2/h3 hierarchy
- alt on every meaningful image, alt="" on decorative
- Explicit width and height on all <img> tags
- loading="lazy" on all below-fold images
- Plausible script in <head> (placeholder comment until domain confirmed)
- sitemap.xml and robots.txt in project root (once only, on first build)

---

## Accessibility

- Semantic HTML throughout: <button>, <a>, <nav>, <main>, <footer>, <section>
- Never <div> with onClick where a button or link belongs
- Every form input has a visible <label>
- Every clickable element has hover, focus-visible, and active states
- Focus order follows visual order — no tabindex above 0

---

## Background images in inline styles

Section backgrounds are set with CSS custom properties on the section, e.g.
`style="--bg: url('/dropx-images-web/tandem/tandem-7.webp')"`. Use root-absolute paths (leading /):
a relative url() inside a custom property resolves against css/site.css, not the page.
