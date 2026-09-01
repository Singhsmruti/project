import { SITE } from "@/data/site";

export type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  product_interest: string;
  message: string;
};

/**
 * The enquiry as plain text. This is the whole point of the fallback: whatever
 * happens to the database, the buyer still leaves with a message they can send.
 */
export function enquiryText(d: EnquiryPayload, items: string[] = []): string {
  const lines = [
    "Enquiry from 3stechnology.in",
    "",
    `Name: ${d.name}`,
    d.company && `Company: ${d.company}`,
    `Email: ${d.email}`,
    d.phone && `Phone: ${d.phone}`,
    d.product_interest && `Interest: ${d.product_interest}`,
  ].filter(Boolean) as string[];

  if (items.length) {
    lines.push("", `Requested items (${items.length}):`);
    items.forEach((it, i) => lines.push(`  ${i + 1}. ${it}`));
  }

  if (d.message) lines.push("", "Message:", d.message);
  return lines.join("\n");
}

export function whatsappHref(text: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoHref(text: string, subject = "Enquiry from 3stechnology.in"): string {
  return `mailto:${SITE.emails[0]}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(text)}`;
}
