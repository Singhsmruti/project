import nodemailer, { type Transporter } from "nodemailer";
import { SITE } from "@/data/site";
import { enquiryText, type EnquiryPayload } from "@/lib/enquiry";

/**
 * Enquiries are emailed to the desk the moment the buyer presses send.
 *
 * The whole reason this exists: v1 lost every lead, and even in v2 the buyer
 * was being handed a mailto and asked to send the message themselves. An Indian
 * SME buyer will not do that — they close the tab. So the server sends it.
 *
 * Credentials are server-only and never reach the browser. If SMTP is not
 * configured, or the send fails, this reports that honestly and the caller
 * falls back to WhatsApp/mailto. We never claim an enquiry was delivered when
 * it was not — that was v1's sin and it is not repeated here.
 */

const HOST = process.env.SMTP_HOST;
const PORT = Number(process.env.SMTP_PORT ?? 465);
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;

/** Where enquiries land. Defaults to the address on the site itself. */
const TO = process.env.ENQUIRY_TO || SITE.emails[0];

export function mailerConfigured(): boolean {
  return Boolean(HOST && USER && PASS);
}

let cached: Transporter | null = null;

function transport(): Transporter {
  // Reused across requests: Gmail throttles hard on connection churn, and a
  // pooled connection keeps a burst of enquiries from tripping it.
  if (!cached) {
    cached = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: PORT === 465, // 465 implicit TLS; 587 upgrades via STARTTLS
      auth: { user: USER, pass: PASS },
      pool: true,
      maxConnections: 1,
      maxMessages: 50,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return cached;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function subjectFor(d: EnquiryPayload, items: string[]): string {
  const who = d.company?.trim() || d.name.trim();
  const what = d.product_interest?.trim() || "Enquiry";
  const count = items.length ? ` · ${items.length} item${items.length === 1 ? "" : "s"}` : "";
  return `${what} — ${who}${count}`;
}

function htmlFor(d: EnquiryPayload, items: string[]): string {
  const row = (k: string, v: string) =>
    v
      ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;font:12px/1.5 -apple-system,Segoe UI,sans-serif;white-space:nowrap;vertical-align:top">${k}</td>` +
        `<td style="padding:6px 0;font:14px/1.5 -apple-system,Segoe UI,sans-serif;color:#141414">${escapeHtml(v)}</td></tr>`
      : "";

  const list = items.length
    ? `<h3 style="margin:24px 0 8px;font:600 13px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6b6b6b">Requested items (${items.length})</h3>
       <ol style="margin:0;padding-left:20px;font:14px/1.7 ui-monospace,SFMono-Regular,Menlo,monospace;color:#141414">
       ${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}
       </ol>`
    : "";

  return `<div style="max-width:640px;margin:0 auto;padding:24px">
  <p style="margin:0 0 4px;font:600 11px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#d03731">New enquiry · 3stechnology.in</p>
  <h2 style="margin:0 0 20px;font:600 22px/1.3 -apple-system,Segoe UI,sans-serif;color:#141414;letter-spacing:-.02em">${escapeHtml(
    subjectFor(d, items),
  )}</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;width:100%">
    ${row("Name", d.name)}
    ${row("Company", d.company)}
    ${row("Email", d.email)}
    ${row("Phone", d.phone)}
    ${row("Interest", d.product_interest)}
  </table>
  ${list}
  ${
    d.message
      ? `<h3 style="margin:24px 0 8px;font:600 13px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6b6b6b">Message</h3>
         <div style="white-space:pre-wrap;font:14px/1.7 -apple-system,Segoe UI,sans-serif;color:#141414">${escapeHtml(
           d.message,
         )}</div>`
      : ""
  }
  <p style="margin:28px 0 0;padding-top:16px;border-top:1px solid #e5e5e5;font:12px/1.6 -apple-system,Segoe UI,sans-serif;color:#8a8a8a">
    Reply to this email and it goes straight to ${escapeHtml(d.email)}.
  </p>
</div>`;
}

export type SendResult = { sent: boolean; reason?: string };

/** Send one enquiry to the desk. Never throws — the caller needs the truth, not an exception. */
export async function sendEnquiryEmail(
  d: EnquiryPayload,
  items: string[] = [],
): Promise<SendResult> {
  if (!mailerConfigured()) return { sent: false, reason: "not-configured" };

  try {
    await transport().sendMail({
      // Gmail rewrites From to the authenticated account anyway, so we name the
      // site rather than spoofing the buyer — which would fail SPF/DMARC.
      from: { name: `${SITE.name} website`, address: USER as string },
      to: TO,
      replyTo: `${d.name} <${d.email}>`, // hitting reply answers the buyer directly
      subject: subjectFor(d, items),
      text: enquiryText(d, items),
      html: htmlFor(d, items),
    });
    return { sent: true };
  } catch (err) {
    console.error("[enquiry] smtp send failed:", err);
    return { sent: false, reason: "smtp-failed" };
  }
}
