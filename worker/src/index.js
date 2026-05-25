// Cloudflare Worker: DropX contact form handler.
// Receives a POST from the contact form, validates, and sends an email
// via the Resend API. Secret RESEND_API_KEY is set via wrangler.

const ALLOWED_ORIGINS = [
  'https://skydivedropx.com',
  'https://www.skydivedropx.com',
  'https://dropx-website.pages.dev',
  'http://localhost:3000',
  'http://localhost:8080',
];

const RESEND_FROM = 'DropX Contact <forms@send.skydivedropx.com>';
const RESEND_TO = ['ben@skydivedropx.com'];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readFields(request) {
  const contentType = request.headers.get('Content-Type') || '';
  const pick = (raw) => (raw == null ? '' : raw.toString().trim());
  if (contentType.includes('application/json')) {
    const data = await request.json();
    return {
      name: pick(data.name),
      email: pick(data.email),
      subject: pick(data.subject),
      message: pick(data.message),
      company: pick(data.company),
    };
  }
  const data = await request.formData();
  return {
    name: pick(data.get('name')),
    email: pick(data.get('email')),
    subject: pick(data.get('subject')),
    message: pick(data.get('message')),
    company: pick(data.get('company')),
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin);
    }

    let fields;
    try {
      fields = await readFields(request);
    } catch (err) {
      return jsonResponse({ error: 'Could not read submission' }, 400, origin);
    }

    // Honeypot. Return success without sending so spammers cannot tell.
    if (fields.company) {
      return jsonResponse({ ok: true }, 200, origin);
    }

    const missing = [];
    if (!fields.name) missing.push('name');
    if (!fields.email) missing.push('email');
    if (!fields.message) missing.push('message');
    if (missing.length) {
      const label = missing.length > 1 ? 'fields' : 'field';
      return jsonResponse({ error: `Missing required ${label}: ${missing.join(', ')}` }, 400, origin);
    }
    if (!isValidEmail(fields.email)) {
      return jsonResponse({ error: 'Email address looks invalid' }, 400, origin);
    }
    if (fields.message.length > 5000 || fields.name.length > 200 || fields.subject.length > 200) {
      return jsonResponse({ error: 'Submission too long' }, 400, origin);
    }

    if (!env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY is not set');
      return jsonResponse({ error: 'Server not configured' }, 500, origin);
    }

    const subject = fields.subject || 'General enquiry';
    const emailSubject = `New DropX enquiry: ${subject} from ${fields.name}`;

    const text = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Subject: ${subject}`,
      '',
      'Message:',
      fields.message,
    ].join('\n');

    const html = `
      <table style="font-family: -apple-system, system-ui, sans-serif; font-size: 14px; line-height: 1.5; border-collapse: collapse;">
        <tr><td style="padding: 2px 12px 2px 0;"><strong>Name</strong></td><td>${escapeHtml(fields.name)}</td></tr>
        <tr><td style="padding: 2px 12px 2px 0;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(fields.email)}">${escapeHtml(fields.email)}</a></td></tr>
        <tr><td style="padding: 2px 12px 2px 0;"><strong>Subject</strong></td><td>${escapeHtml(subject)}</td></tr>
      </table>
      <p style="font-family: -apple-system, system-ui, sans-serif; font-size: 14px; line-height: 1.6; margin-top: 1.5em; white-space: pre-wrap;">${escapeHtml(fields.message)}</p>
    `;

    let resendRes;
    try {
      resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: RESEND_TO,
          reply_to: fields.email,
          subject: emailSubject,
          text,
          html,
        }),
      });
    } catch (err) {
      console.log('Resend fetch failed', err);
      return jsonResponse({ error: 'Could not reach mail service' }, 502, origin);
    }

    if (!resendRes.ok) {
      let detail = '';
      try { detail = await resendRes.text(); } catch (_) { /* ignore */ }
      console.log('Resend error', resendRes.status, detail);
      return jsonResponse({ error: 'Mail service rejected the request' }, 502, origin);
    }

    return jsonResponse({ ok: true }, 200, origin);
  },
};
