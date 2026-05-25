# DropX contact Worker

Cloudflare Worker that receives a POST from the DropX contact form
(`contact.html`) and sends the enquiry to ben@skydivedropx.com via
Resend.

## Setup

```sh
cd worker
npx wrangler login           # one-off, opens browser
npx wrangler secret put RESEND_API_KEY
# paste the Resend API key when prompted, then enter

npx wrangler deploy
```

`wrangler deploy` will print the deployed URL, something like
`https://dropx-contact.<your-subdomain>.workers.dev`. Use that URL as
the form endpoint in `contact.html`.

## Config

- `from`: forms@send.skydivedropx.com (must be a verified Resend sender)
- `to`: ben@skydivedropx.com
- `reply_to`: the submitter's email so Ben can reply directly

Allowed CORS origins are listed at the top of `src/index.js`. Add the
custom subdomain (e.g. `https://forms.skydivedropx.com`) there once
that DNS is in place.

## Local dev

```sh
RESEND_API_KEY=... npx wrangler dev
```

Then POST a form-encoded body to `http://localhost:8787`.

## Honeypot

Form ships a hidden `company` field. If it is non-empty the Worker
returns 200 without sending so bots cannot tell they were filtered.
