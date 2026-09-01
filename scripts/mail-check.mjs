/**
 * Proves the enquiry mail path works, without filling in the form.
 *
 *   npm run mail:check          # verify the credentials only
 *   npm run mail:check -- send  # verify, then send one real test email
 *
 * Run this the moment the sending account's app password lands. If it passes,
 * "Send enquiry" on the site delivers; if it fails, the site correctly falls
 * back to WhatsApp/mailto and no lead is lost while you fix it.
 */

import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO } = process.env;
const PORT = Number(SMTP_PORT ?? 465);
const TO = ENQUIRY_TO || "3stechnology2024@gmail.com";

const missing = Object.entries({ SMTP_HOST, SMTP_USER, SMTP_PASS })
  .filter(([, v]) => !v)
  .map(([k]) => k);

console.log("  sending account :", SMTP_USER ?? "(unset)");
console.log("  delivering to   :", TO);
console.log("  server          :", `${SMTP_HOST ?? "(unset)"}:${PORT}`);
console.log("");

if (missing.length) {
  console.log(`FAIL  not configured — missing ${missing.join(", ")} in .env.local`);
  console.log("      the site will fall back to WhatsApp/mailto until these are set.");
  process.exit(1);
}

const t = nodemailer.createTransport({
  host: SMTP_HOST,
  port: PORT,
  secure: PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  connectionTimeout: 15_000,
  greetingTimeout: 15_000,
});

try {
  await t.verify();
  console.log("PASS  credentials accepted — the server will send.");
} catch (err) {
  console.log("FAIL  the server refused these credentials.");
  console.log("      " + (err?.response || err?.message || String(err)));
  if (String(err?.message ?? "").includes("Username and Password not accepted")) {
    console.log("");
    console.log("      Gmail needs an APP PASSWORD, not the account password.");
    console.log("      2-Step Verification must be ON for that account first:");
    console.log("      Google Account > Security > 2-Step Verification > App passwords");
    console.log("      Paste the 16 characters with no spaces.");
  }
  process.exit(1);
}

if (process.argv.includes("send")) {
  const stamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  try {
    const info = await t.sendMail({
      from: { name: "3S Technology website", address: SMTP_USER },
      to: TO,
      replyTo: "Test Buyer <test@example.com>",
      subject: `Test — enquiry form is live (${stamp})`,
      text:
        `This is a test from the 3stechnology.in enquiry form.\n\n` +
        `If you are reading this in ${TO}, the form now delivers straight here\n` +
        `when a visitor presses "Send enquiry".\n\n` +
        `Sent by ${SMTP_USER} at ${stamp}.`,
    });
    console.log(`PASS  test email sent to ${TO} — ${info.response}`);
    console.log("      Check the inbox AND the spam folder.");
    console.log('      If it landed in spam, open it and mark "Not spam" once.');
  } catch (err) {
    console.log("FAIL  authenticated but could not send:", err?.message ?? err);
    process.exit(1);
  }
}

process.exit(0);
