import Link from "next/link";
import { SITE } from "@/data/site";
import { CATEGORIES } from "@/data/products";

export default function Footer() {
  return (
    <footer className="gridpaper-dark border-t border-rule-dark bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-semibold tracking-[-0.02em]">
              <span className="text-signal">3S</span> TECHNOLOGY
            </p>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-ink-faint">
              Manufacturer of heavy-duty pressure and temperature gauges for tough
              and corrosive applications.
            </p>
            <p className="spec mt-6 text-[13px] tracking-[0.12em] text-ink-faint uppercase">
              GSTIN
            </p>
            <p className="spec text-base text-paper/80">{SITE.gstin}</p>
          </div>

          <div>
            <p className="spec text-[13px] tracking-[0.16em] text-ink-faint uppercase">
              Products
            </p>
            <ul className="mt-4 space-y-2.5 text-base">
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <Link
                    href={`/products?category=${c.key}`}
                    className="text-paper/70 transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/applications"
                  className="text-paper/70 transition-colors hover:text-white"
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-paper/70 transition-colors hover:text-white"
                >
                  About us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="spec text-[13px] tracking-[0.16em] text-ink-faint uppercase">
              {SITE.works.label}
            </p>
            <address className="mt-4 text-base leading-relaxed text-paper/70 not-italic">
              {SITE.works.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="spec mt-6 text-[13px] tracking-[0.16em] text-ink-faint uppercase">
              {SITE.office.label}
            </p>
            <address className="mt-4 text-base leading-relaxed text-paper/70 not-italic">
              {SITE.office.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>

          <div>
            <p className="spec text-[13px] tracking-[0.16em] text-ink-faint uppercase">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-base">
              {SITE.phones.map((p) => (
                <li key={p.raw}>
                  <a
                    href={`tel:+${p.raw}`}
                    className="spec text-paper/70 transition-colors hover:text-white"
                  >
                    {p.number}
                  </a>
                </li>
              ))}
              {SITE.emails.map((e) => (
                <li key={e}>
                  <a
                    href={`mailto:${e}`}
                    className="break-all text-paper/70 transition-colors hover:text-white"
                  >
                    {e}
                  </a>
                </li>
              ))}
            </ul>
            <p className="spec mt-6 text-[13px] tracking-[0.16em] text-ink-faint uppercase">
              Hours
            </p>
            <ul className="mt-4 space-y-1 text-base text-paper/70">
              {SITE.hours.map((h) => (
                <li key={h.days}>
                  {h.days}
                  <span className="spec block text-ink-faint">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-rule-dark pt-8 text-base text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} 3S Technology. All rights reserved.
          </p>
          <p className="spec text-[13px] tracking-[0.12em] uppercase">
            {SITE.standards.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
