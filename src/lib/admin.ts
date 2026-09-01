import crypto from "node:crypto";

/**
 * A deliberately small session scheme for a one-person back office.
 *
 * There is no user table and no password database — one shared password in an
 * environment variable, and a signed cookie so the password itself is never
 * stored in the browser. Enough for an enquiry inbox; NOT enough to put
 * anything sensitive behind. If this ever guards more than read-only leads,
 * replace it with real auth rather than extending it.
 */

const COOKIE = "3s_admin";
const TTL_MS = 12 * 60 * 60 * 1000; // a working day, then sign in again

export const ADMIN_COOKIE = COOKIE;

function secret(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  // A distinct signing key derived from the password, so the cookie is not the
  // password and a leaked cookie cannot be replayed as a login.
  return crypto
    .createHash("sha256")
    .update(`3s-admin-session:${process.env.ADMIN_SESSION_SECRET ?? ""}:${pw}`)
    .digest("hex");
}

export function isConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Constant-time password check — a plain === leaks length and prefix by timing. */
export function checkPassword(candidate: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const a = Buffer.from(crypto.createHash("sha256").update(candidate).digest("hex"));
  const b = Buffer.from(crypto.createHash("sha256").update(pw).digest("hex"));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function mintToken(): string | null {
  const key = secret();
  if (!key) return null;
  const expires = Date.now() + TTL_MS;
  const sig = crypto.createHmac("sha256", key).update(String(expires)).digest("hex");
  return `${expires}.${sig}`;
}

export function verifyToken(token: string | undefined): boolean {
  const key = secret();
  if (!key || !token) return false;

  const [expiresRaw, sig] = token.split(".");
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  const expected = crypto
    .createHmac("sha256", key)
    .update(String(expires))
    .digest("hex");
  const a = Buffer.from(sig ?? "");
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const SESSION_MAX_AGE = TTL_MS / 1000;

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  product_interest: string | null;
  message: string;
  created_at: string;
};

export type InboxResult =
  | { ok: true; enquiries: Enquiry[] }
  | { ok: false; reason: "not-configured" | "upstream" | "unreachable"; detail?: string };

/** Read the inbox straight from Supabase's REST endpoint — no SDK, no key in the browser. */
export async function fetchEnquiries(): Promise<InboxResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return { ok: false, reason: "not-configured" };

  try {
    const res = await fetch(
      `${url}/rest/v1/inquiries?select=*&order=created_at.desc&limit=200`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store",
      },
    );
    if (!res.ok) {
      return { ok: false, reason: "upstream", detail: `${res.status} ${await res.text()}` };
    }
    return { ok: true, enquiries: (await res.json()) as Enquiry[] };
  } catch (err) {
    return { ok: false, reason: "unreachable", detail: String(err) };
  }
}
