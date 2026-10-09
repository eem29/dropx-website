# copy-tone.md — Skydive DropX

---

## Brand

Skydive DropX is a commercial drop zone in Canterbury, New Zealand (from September 2026).
Tandem skydiving is the main product. AFF (learn to skydive) is second. The sport/club side
(fun jumps, coaching, demos, Messenger community) stays on the site but is not the lead.
Owner: Ben Johnstone — ben@skydivedropx.com / (027) 2929951

---

## Ben's naming system (October 2026)

Ben supplied product copy in a bold voice. Use these names as section labels / product names:

- THE 12,000 and THE 9,000: tandem altitudes (content/tandem.json → altitudes[].name)
- THE FULL SEND (video and photos) and THE MEMORY (video only): camera packages
- THE FIRST STEP: AFF. THE LICENCE: the 'A' licence pathway (content/aff.json)
- THE VIEW: homepage section (content/tandem.json → view)
- THE SHOW: demo jumps. THE GIFT: gift vouchers. THE CLUB: sport skydiving
- THE CREW: staff profiles (crew.html, content/crew.json)

Main nav (Oct 2026, per Ben's email): Tandem · Photo & Video · Learn to Skydive · The Show ·
The Gift · The Club · The Crew · FAQ · About · Contact, plus Book now. Ten items: the nav
switches to the hamburger below 1100px.

Ben's own copy is used verbatim apart from typo fixes. Where Ben has written copy for something,
use his words, not a rewrite.
Short story lines (75 characters or fewer) render as bold display-font "beats" via DX.story().

---

## Tone (updated Oct 2026: follow Ben's voice)

Bold, confident and direct, in the voice of Ben's own product copy (see the naming system above).
Short punchy lines. Big claims are fine when they're true to the product: "One hell of a way to
see Canterbury." Sell the experience: the altitude, the freefall, the view, reliving it.

- Use Ben's words wherever he has written them. Only write new copy where he hasn't, and match his
  voice when you do.
- Words like "unforgettable" or "once in a lifetime" are fine if they suit the product and Ben's
  voice. There is no banned-words list any more.
- Facts stay factual: never invent prices, limits, policies, jump numbers or delivery times.
  Unconfirmed facts go in JSON with "placeholder": true.
- Photography still does the heavy lifting. Copy and photos sit together, never flat text panels.

---

## Copy Rules

- Never use em dashes. Replace with a hyphen, comma, colon, or rewrite the sentence.
- Placeholder copy (unconfirmed facts) must be clearly marked as PLACEHOLDER
- New marketing copy written by us is a draft for Ben to approve

---

## What DropX Offers (commercial, from Sept 2026)

- Tandem skydiving: altitudes, prices, requirements, day steps, location in content/tandem.json
- Photo and video: Handcam / Camera flyer / Both, in content/tandem.json → media
- Gift vouchers, booking terms (content/terms.json)
- AFF course: content/aff.json
- Sport jumping for licensed jumpers: NZ$65, 12,000ft, Messenger group (jump.html)
- Demo jumps (demos.html)

Anything marked "placeholder": true in content JSON shows a visible PLACEHOLDER tag on the page
until Ben confirms the value and unticks it in the CMS. Do not remove a placeholder flag without
Ben's confirmed value.

---

## About Page

PLACEHOLDER — Ben's blurb is still outstanding.
Build the page with clear PLACEHOLDER markers. Do not invent copy about the DropX story.

---

## FAQ

Lives in content/faq.json as groups (Before you book / On the day / Safety and weather /
Photo and video / Learn to skydive / Licensed jumpers). The club Q&As below sit under
"Licensed jumpers".

### Original club questions

1. Can I learn to skydive here? — Yes, AFF coming soon Spring 2026, register interest via contact form
2. Can I book a tandem? — Coming soon Spring 2026, register interest
3. I am a licensed jumper, how do I jump here? — Join the Facebook community, NZ$65 / 12,000ft
4. What sport events do you run? — Canopy coaching, freefly coaching, demos, check events calendar
5. How do I find out who is jumping this weekend? — Join the Facebook Messenger group

---

## Contact Details

- All form submissions go to ben@skydivedropx.com
- Phone: (027) 2929951 — include in contact page and footer
- Facebook Messenger: https://m.me/ch/Abaa9XdSVzir96lk/?send_source=cm:copy_invite_link — link in nav, homepage, community page

---

## Client Notes

- Ben Johnstone is the owner — ben@skydivedropx.com / (027) 2929951
- Two logo variants supplied, both WebP, both for dark backgrounds only
- Social audit: 18 Instagram posts, 350+ Facebook followers. Real crew, action shots, no stock. Site should match this energy.
- About blurb outstanding from Ben — build page with placeholder, do not invent the story
- CMS must be genuinely simple — FAQ and Events are priority collections
- Out of scope: e-commerce, blog, member login
- Booking system: provider not yet named by Ben. Every Book button reads content/site.json → booking.*_url. Until then they point to the contact form enquiry.
- No em dashes anywhere, ever

---

## SEO Copy Notes

- Title format: "[Page description] | Skydive DropX"
- Include "DropX" or "Skydive DropX" in every page title (50-60 chars)
- Meta descriptions: 150-160 chars
- Key terms: "tandem skydive", "Canterbury", "Christchurch", "learn to skydive", "gift voucher", "drop zone"
