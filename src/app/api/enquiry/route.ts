import { NextResponse } from "next/server";
import { sendEnquiryEmail, mailerConfigured } from "@/lib/mailer";
import type { EnquiryPayload } from "@/lib/enquiry";

/**
 * An enquiry leaves here by two independent routes:
 *
 *   1. EMAIL to the desk — the one that actually gets read. This is what makes
 *      "Send enquiry" mean something: the buyer presses the button and the mail
 *      is already in the inbox.
 *   2. SUPABASE — the durable record behind /admin, when it is configured.
 *
 * Either one succeeding means the enquiry is safe, and we say so. If BOTH fail
 * we say that too, and the UI hands the buyer their message for WhatsApp/email.
 * The old site swore the message was sent while silently dropping it; we do not.
 *
 * Keys live only on the server — nothing here is ever shipped to the browser.
 */

export const runtime = "nodejs"; // nodemailer needs Node, not the edge runtime

const URL_KEY = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_KEY;

type Body = Partial<EnquiryPayload> & {
  items?: string[];
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  website?: string;
};

/**
 * Crude per-IP throttle. The form now pushes straight into someone's Gmail, so
 * it is a spam vector in a way a database write never was. In-memory on purpose:
 * a single origin server, and a restart clearing it is not a real cost.
 */
const RATE = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (RATE.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  RATE.set(ip, hits);
  if (RATE.size > 5_000) RATE.clear(); // unbounded-growth guard
  return hits.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}

async function storeInSupabase(d: EnquiryPayload, items: string[]): Promise<boolean> {
  if (!URL_KEY || !SERVICE_KEY) return false;

  const row = {
    name: d.name,
    email: d.email,
    phone: d.phone,
    company: d.company,
    product_interest: d.product_interest,
    message: items.length
      ? `${d.message}\n\nRequested items:\n${items.map((i, n) => `${n + 1}. ${i}`).join("\n")}`
      : d.message,
  };

  try {
    const res = await fetch(`${URL_KEY}/rest/v1/inquiries`, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error("[enquiry] supabase rejected the insert:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[enquiry] could not reach supabase:", err);
    return false;
  }
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ delivered: false, reason: "bad-request" }, { status: 400 });
  }

  // Silently accept and discard bot submissions — telling a bot it failed only
  // teaches it to try again.
  if (body.website?.trim()) {
    return NextResponse.json({ delivered: true, emailed: true, stored: false });
  }

  const d: EnquiryPayload = {
    name: (body.name ?? "").trim(),
    email: (body.email ?? "").trim(),
    phone: (body.phone ?? "").trim(),
    company: (body.company ?? "").trim(),
    product_interest: (body.product_interest ?? "").trim(),
    message: (body.message ?? "").trim(),
  };
  const items = (body.items ?? []).filter((i) => typeof i === "string").slice(0, 50);

  if (!d.name || !d.email || !d.message) {
    return NextResponse.json(
      { delivered: false, reason: "missing-fields" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
    return NextResponse.json({ delivered: false, reason: "bad-email" }, { status: 400 });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ delivered: false, reason: "rate-limited" }, { status: 429 });
  }

  // Both routes at once — a slow Supabase must not delay the email that matters.
  const [mail, stored] = await Promise.all([
    sendEnquiryEmail(d, items),
    storeInSupabase(d, items),
  ]);

  const delivered = mail.sent || stored;

  if (!delivered) {
    console.error(
      "[enquiry] NOTHING captured this lead — email:",
      mail.reason ?? "failed",
      "| supabase:",
      URL_KEY && SERVICE_KEY ? "failed" : "not-configured",
    );
  }

  return NextResponse.json({
    delivered,
    emailed: mail.sent,
    stored,
    reason: delivered ? undefined : (mail.reason ?? "unavailable"),
  });
}

/** Lets us confirm the mail path is wired without sending anything. */
export async function GET() {
  return NextResponse.json({
    email: mailerConfigured() ? "configured" : "not-configured",
    database: URL_KEY && SERVICE_KEY ? "configured" : "not-configured",
  });
}
