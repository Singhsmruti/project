import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Vasai (East), Palghar, Maharashtra",
  description:
    "Works at G-9, Rajtilak Industrial Complex, Chinchpada, Vasai (East), Palghar 401208. Phone +91 70289 46617, WhatsApp, or send an enquiry for a quotation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="gridpaper-dark border-b border-rule-dark bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="eyebrow text-ink-faint">Get in touch</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Contact us
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-paper/70">
            Quotations, technical questions, drawings and custom builds. WhatsApp is
            the fastest route — we answer it during working hours.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
        {/* --------------------------------------------------- the details */}
        <div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="spec text-[13px] tracking-[0.16em] text-ink-faint uppercase">
                {SITE.works.label}
              </p>
              <address className="mt-3 text-base leading-relaxed text-ink-3 not-italic">
                {SITE.works.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <p className="spec text-[13px] tracking-[0.16em] text-ink-faint uppercase">
                {SITE.office.label}
              </p>
              <address className="mt-3 text-base leading-relaxed text-ink-3 not-italic">
                {SITE.office.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
          </div>

          <dl className="mt-10 divide-y divide-rule border-y border-rule">
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="spec text-[13px] tracking-[0.12em] text-ink-faint uppercase">
                Phone
              </dt>
              <dd className="space-y-1">
                {SITE.phones.map((p) => (
                  <a
                    key={p.raw}
                    href={`tel:+${p.raw}`}
                    className="spec block text-base text-ink-3 hover:text-signal"
                  >
                    {p.number}
                  </a>
                ))}
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="spec text-[13px] tracking-[0.12em] text-ink-faint uppercase">
                Email
              </dt>
              <dd className="space-y-1">
                {SITE.emails.map((e) => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="block text-base break-all text-ink-3 hover:text-signal"
                  >
                    {e}
                  </a>
                ))}
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="spec text-[13px] tracking-[0.12em] text-ink-faint uppercase">
                Hours
              </dt>
              <dd className="space-y-1 text-base text-ink-3">
                {SITE.hours.map((h) => (
                  <p key={h.days}>
                    {h.days} — <span className="spec">{h.time}</span>
                  </p>
                ))}
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="spec text-[13px] tracking-[0.12em] text-ink-faint uppercase">
                GSTIN
              </dt>
              <dd className="spec text-base text-ink-3">{SITE.gstin}</dd>
            </div>
          </dl>

          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="spec mt-8 inline-block bg-[#25D366] px-6 py-3.5 text-[14px] tracking-[0.08em] text-white uppercase"
          >
            Message us on WhatsApp
          </a>

          <div className="mt-10 aspect-4/3 border border-rule">
            <iframe
              src={SITE.mapEmbed}
              title="3S Technology — Chinchpada, Vasai (East)"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <EnquiryForm />
      </div>
    </>
  );
}
