# technical.md — Skydive DropX

---

## Output Defaults

- Single .html file per page, all styles inline in a <style> block
- Tailwind CSS loaded via CDN
- Mobile-first responsive
- Breakpoints: 375px (mobile) / 768px (tablet) / 1280px (desktop)
- Placeholder images: https://placehold.co/WIDTHxHEIGHT

---

## Integrations

- **Domain:** skydivedropx.com — confirm DNS location with Ben before enabling Plausible
- **Repo:** create github.com/eem29/dropx-website on first session
- **Contact form (Web3Forms):** NOT YET — set up before building contact form, submits to ben@skydivedropx.com
- **CMS (Decap):** configure for faq.json, events.json, jump.json — Ben manages these himself
- **CMS auth:** Cloudflare Access — no third-party login required
- **Analytics (Plausible):** NOT YET — add after domain is confirmed with Ben
- **Facebook Messenger:** https://m.me/ch/Abaa9XdSVzir96lk/?send_source=cm:copy_invite_link
- **FareHarbor:** NOT YET — added when tandem/AFF launches Spring 2026, do not build toward it now

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
- content/site.json        — Global: nav, footer, social links, Facebook group URL

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
