import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE, CAPABILITIES } from "@/data/site";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "About — heavy-duty gauge manufacturer in Vasai",
  description:
    "3S Technology manufactures pressure and temperature instruments for tough and corrosive service, to EN 837-1, IS:3624 and ASME B40.200, from Vasai (East), Palghar, Maharashtra.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="gridpaper-dark border-b border-rule-dark bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="eyebrow text-ink-faint">Who we are</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            Instruments that still read true after a year on the line
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="text-lg leading-relaxed text-ink-3">
              3S Technology manufactures heavy-duty pressure and temperature measuring
              instruments. Decades of experience, qualified engineers and skilled
              workers go into gauges built to hold their accuracy in the environments
              that destroy ordinary ones — pulsation, corrosion, vibration and heat.
            </p>
            <p className="mt-5 leading-relaxed text-ink-soft">
              We work to EN 837-1, IS:3624 and ASME B40.200, and we build to
              specification as readily as to catalogue: non-standard ranges, customer
              dial artwork, SS 316, Monel and Inconel wetted parts, diaphragm seals
              and silicone fills.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-rule pt-8">
              <div>
                <dd className="spec text-3xl leading-none font-medium">
                  {PRODUCTS.length}
                </dd>
                <dt className="mt-2 text-[14px] tracking-[0.1em] text-ink-soft uppercase">
                  Instruments in the range
                </dt>
              </div>
              <div>
                <dd className="spec text-3xl leading-none font-medium">3</dd>
                <dt className="mt-2 text-[14px] tracking-[0.1em] text-ink-soft uppercase">
                  International standards
                </dt>
              </div>
            </dl>
          </div>

          <div className="relative aspect-4/3 border border-rule">
            <Image
              src="/industry.webp"
              alt="Industrial plant of the kind 3S Technology instruments are specified for"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow">Mission</p>
              <p className="mt-5 text-lg leading-relaxed text-ink-3">
                To deliver instrumentation that makes an operation safe, efficient and
                predictable — products that meet international standards rather than
                merely reference them.
              </p>
            </div>
            <div>
              <p className="eyebrow">Vision</p>
              <p className="mt-5 text-lg leading-relaxed text-ink-3">
                To be the name specified when the service is hard: corrosive media,
                extreme range, and a duty cycle that will not forgive a bad gauge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="eyebrow">Our commitment</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-balance md:text-4xl">
          What we hold ourselves to
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

        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-rule pt-10">
          <p className="spec text-[14px] tracking-[0.12em] text-ink-soft uppercase">
            {SITE.standards.join("  ·  ")}
          </p>
          <Link
            href="/products"
            className="spec ml-auto border-b border-signal pb-1 text-[15px] tracking-[0.08em] uppercase hover:text-signal"
          >
            See the range →
          </Link>
        </div>
      </section>
    </>
  );
}
