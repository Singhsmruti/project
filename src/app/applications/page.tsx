import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES, CAPABILITIES } from "@/data/site";

export const metadata: Metadata = {
  title: "Applications — petrochemical, nuclear, oil & gas, power",
  description:
    "Where 3S Technology gauges are specified: refineries and chemical plants, nuclear facilities, offshore and wellhead, hydraulics and machinery, and thermal power stations.",
  alternates: { canonical: "/applications" },
};

export default function ApplicationsPage() {
  return (
    <>
      <section className="gridpaper-dark border-b border-rule-dark bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="eyebrow text-ink-faint">Industries</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            Where these instruments earn their keep
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-paper/70">
            Five sectors, one requirement: a reading you can act on, taken in
            conditions that punish the instrument taking it.
          </p>
        </div>
      </section>

      {INDUSTRIES.map((ind, i) => (
        <section
          key={ind.slug}
          id={ind.slug}
          className={`scroll-mt-24 border-b border-rule ${
            i % 2 === 1 ? "bg-paper-2" : ""
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <span className="spec text-[14px] tracking-[0.16em] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
                  {ind.name}
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
                  {ind.description}
                </p>
              </div>

              <ul className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
                {ind.applications.map((a) => (
                  <li
                    key={a}
                    className="flex gap-3 border-b border-rule py-3.5 text-base text-ink-3 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <span className="spec shrink-0 text-signal" aria-hidden="true">
                      —
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="eyebrow">Why they hold up</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-balance md:text-4xl">
          What makes an instrument survive these services
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <div key={c.title} className="border-t border-rule pt-5">
              <span className="spec text-[13px] tracking-[0.14em] text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em]">
                {c.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gridpaper-dark border-t border-rule-dark bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.02em] text-balance md:text-4xl">
            Need something the catalogue does not list?
          </h2>
          <Link
            href="/contact"
            className="spec shrink-0 bg-signal px-7 py-3.5 text-[15px] tracking-[0.1em] text-white uppercase hover:bg-signal-2"
          >
            Ask for a custom build
          </Link>
        </div>
      </section>
    </>
  );
}
