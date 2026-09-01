"use client";

import { useState } from "react";
import { useRfq } from "./Rfq";
import { PRODUCTS } from "@/data/products";
import {
  enquiryText,
  mailtoHref,
  whatsappHref,
  type EnquiryPayload,
} from "@/lib/enquiry";

const EMPTY: EnquiryPayload = {
  name: "",
  email: "",
  phone: "",
  company: "",
  product_interest: "",
  message: "",
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  /** `emailed` distinguishes "it is in their inbox" from "it is on record". */
  | { kind: "sent"; emailed: boolean }
  | { kind: "fallback"; text: string; busy: boolean };

export default function EnquiryForm() {
  const { lines, clear } = useRfq();
  const [data, setData] = useState<EnquiryPayload>(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Honeypot. Hidden from people, irresistible to bots.
  const [website, setWebsite] = useState("");

  // Each line carries its quantity and spec note, so the enquiry that reaches
  // the desk is quotable rather than a bare list of names.
  const names = lines
    .map((l) => {
      const p = PRODUCTS.find((x) => x.slug === l.slug);
      if (!p) return null;
      return `${p.name} — qty ${l.qty}${l.note ? ` (${l.note})` : ""}`;
    })
    .filter(Boolean) as string[];

  const set = (k: keyof EnquiryPayload) => (v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  async function submit() {
    const text = enquiryText(data, names);
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items: names, website }),
      });
      const json = (await res.json()) as {
        delivered?: boolean;
        emailed?: boolean;
      };

      // Delivered means a real channel took it — the mail is in their inbox,
      // or the row is in the database. Anything less is not a confirmation.
      if (json.delivered) {
        setStatus({ kind: "sent", emailed: Boolean(json.emailed) });
        setData(EMPTY);
        clear();
        return;
      }
      // Nothing carried it. Do NOT tell the visitor it was sent — hand them a
      // message they can send themselves, right now.
      setStatus({ kind: "fallback", text, busy: false });
    } catch {
      setStatus({ kind: "fallback", text, busy: false });
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void submit();
  }

  if (status.kind === "sent") {
    return (
      <div className="border border-rule bg-white p-8">
        <p className="spec text-[13px] tracking-[0.14em] text-signal uppercase">
          {status.emailed ? "Sent" : "Received"}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
          Thank you — your enquiry is with us.
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">
          {status.emailed
            ? "It has landed in our inbox and we reply within one working day. If it is urgent, WhatsApp is faster."
            : "We reply within one working day. If it is urgent, WhatsApp is faster."}
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="spec mt-6 border border-ink px-5 py-2.5 text-[14px] tracking-[0.08em] uppercase hover:bg-ink hover:text-paper"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative border border-rule bg-white p-6 md:p-8"
    >
      <p className="eyebrow">Request a quotation</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em]">
        Tell us what you need
      </h2>

      {names.length > 0 && (
        <p className="spec mt-4 border border-signal/30 bg-signal/5 px-4 py-3 text-[14px] text-ink-3">
          {names.length} {names.length === 1 ? "item" : "items"} from your enquiry list
          will be included.
        </p>
      )}

      {/* Honeypot: off-screen, not hidden, so bots that skip display:none still fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required value={data.name} onChange={set("name")} />
        <Field
          label="Company"
          value={data.company}
          onChange={set("company")}
          placeholder="Your company"
        />
        <Field
          label="Email"
          type="email"
          required
          value={data.email}
          onChange={set("email")}
          placeholder="you@company.com"
        />
        <Field
          label="Phone"
          type="tel"
          value={data.phone}
          onChange={set("phone")}
          placeholder="+91 …"
        />
      </div>

      <div className="mt-5">
        <Label htmlFor="interest">Product interest</Label>
        <select
          id="interest"
          value={data.product_interest}
          onChange={(e) => set("product_interest")(e.target.value)}
          className="spec mt-2 w-full border border-rule bg-white px-4 py-3 text-base focus:border-ink focus:outline-none"
        >
          <option value="">Select a category</option>
          <option>Pressure Gauges</option>
          <option>Temperature Gauges</option>
          <option>Accessories</option>
          <option>Custom Solution</option>
          <option>General Inquiry</option>
        </select>
      </div>

      <div className="mt-5">
        <Label htmlFor="message" required>
          Message
        </Label>
        <textarea
          id="message"
          required
          rows={5}
          value={data.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Range, media, connection, dial size, quantity…"
          className="mt-2 w-full border border-rule bg-white px-4 py-3 text-base leading-relaxed focus:border-ink focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="spec mt-7 w-full bg-signal px-6 py-4 text-[15px] tracking-[0.1em] text-white uppercase transition-colors hover:bg-signal-2 disabled:cursor-not-allowed disabled:bg-ink-faint"
      >
        {status.kind === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {status.kind === "fallback" && (
        <div className="mt-6 border border-signal/40 bg-signal/5 p-5">
          <p className="spec text-[13px] tracking-[0.14em] text-signal uppercase">
            Could not submit the form
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink-3">
            Rather than lose your enquiry, we have written it out for you. Send it
            straight through — both routes reach the same desk.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappHref(status.text)}
              target="_blank"
              rel="noopener noreferrer"
              className="spec bg-[#25D366] px-5 py-3 text-[14px] tracking-[0.08em] text-white uppercase"
            >
              Send on WhatsApp
            </a>
            <a
              href={mailtoHref(status.text)}
              className="spec border border-ink px-5 py-3 text-[14px] tracking-[0.08em] uppercase hover:bg-ink hover:text-paper"
            >
              Send by email
            </a>
            <button
              type="button"
              disabled={status.busy}
              onClick={() => {
                setStatus({ ...status, busy: true });
                void submit();
              }}
              className="spec border border-rule px-5 py-3 text-[14px] tracking-[0.08em] text-ink-soft uppercase hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.busy ? "Retrying…" : "Try again"}
            </button>
          </div>
          <details className="mt-4">
            <summary className="spec cursor-pointer text-[13px] tracking-[0.08em] text-ink-soft uppercase">
              Show the message
            </summary>
            <pre className="spec mt-3 overflow-x-auto border border-rule bg-paper-2 p-4 text-[14px] whitespace-pre-wrap text-ink-3">
              {status.text}
            </pre>
          </details>
        </div>
      )}
    </form>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="spec block text-[13px] tracking-[0.12em] text-ink-soft uppercase"
    >
      {children}
      {required && <span className="ml-1 text-signal">*</span>}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-rule bg-white px-4 py-3 text-base focus:border-ink focus:outline-none"
      />
    </div>
  );
}
