import Image from "next/image";
import Link from "next/link";
import Dial from "@/components/Dial";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { INDUSTRIES, SITE, CAPABILITIES } from "@/data/site";

const FACTS = [
  { value: "40 – 250", unit: "mm", label: "Dial sizes" },
  { value: "±0.25", unit: "% FSD", label: "Best accuracy" },
  { value: "−50…650", unit: "°C", label: "Temperature range" },
  { value: "40,000", unit: "psi", label: "Max pressure" },
];

const CATEGORY_IMAGE: Record<string, string> = {
  pressure: "/products/commercialpg.webp",
  temperature: "/products/bimetal.webp",
  accessories: "/products/flangedthermowell.webp",
};

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="gridpaper-dark relative overflow-hidden bg-ink text-paper">
        <Dial
          needleOpacity={0.3}
          className="pointer-events-none absolute -right-40 -bottom-40 h-[30rem] w-[30rem] text-white/[0.07] md:-right-10 md:-bottom-32 md:h-[42rem] md:w-[42rem]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="eyebrow text-ink-faint">Vasai, Maharashtra · since inception</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
            High accuracy instrumentation for extreme conditions
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            Pressure and temperature gauges built for pulsation, corrosion and heat —
            the places a commercial gauge fails inside a month.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="spec bg-signal px-7 py-3.5 text-[15px] tracking-[0.1em] text-white uppercase transition-colors hover:bg-signal-2"
            >
              View all {PRODUCTS.length} products
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="spec border border-paper/30 px-7 py-3.5 text-[15px] tracking-[0.1em] text-paper uppercase transition-colors hover:bg-paper hover:text-ink"
            >
              WhatsApp us
            </a>
          </div>

          <dl className="mt-20 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-rule-dark pt-10 md:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dd className="spec text-2xl leading-none font-medium whitespace-nowrap text-paper md:text-[1.75rem]">
                  {f.value}
                  <span className="ml-1 text-base text-ink-faint">{f.unit}</span>
                </dd>
                <dt className="mt-2 text-[14px] tracking-[0.1em] text-ink-faint uppercase">
                  {f.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------- categories */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The range</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              Three families, {PRODUCTS.length} instruments
            </h2>
          </div>
          <Link
            href="/products"
            className="spec border-b border-signal pb-1 text-[15px] tracking-[0.08em] uppercase transition-colors hover:text-signal"
          >
            Browse everything →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.key).length;
            return (
              <Link
                key={c.key}
                href={`/products?category=${c.key}`}
                className="group border border-rule bg-white transition-colors hover:border-ink"
              >
                <div className="gridpaper relative aspect-4/3 overflow-hidden border-b border-rule">
                  <Image
                    src={CATEGORY_IMAGE[c.key]}
                    alt={c.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="spec absolute top-3 right-3 border border-rule bg-paper px-2 py-1 text-[13px] tracking-[0.08em] text-ink-soft">
                    {count} items
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.01em]">{c.label}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-soft">{c.blurb}</p>
                  <p className="spec mt-4 text-[13px] tracking-[0.1em] text-ink-faint uppercase">
                    HSN {c.hsn}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------- capabilities */}
      <section className="border-y border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow">Why they survive</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-balance md:text-4xl">
            Everything here is built for the duty that kills ordinary gauges
          </h2>

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* -------------------------------------------------------- industries */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Where they run</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              Industries we serve
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              Refineries, reactors, wellheads, hydraulics and boiler houses. The
              specification changes; the requirement — that it still reads true after
              a year on the line — does not.
            </p>
            <Link
              href="/applications"
              className="spec mt-8 inline-block border-b border-signal pb-1 text-[15px] tracking-[0.08em] uppercase transition-colors hover:text-signal"
            >
              See all applications →
            </Link>
          </div>

          <ul className="divide-y divide-rule border-y border-rule">
            {INDUSTRIES.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/applications#${ind.slug}`}
                  className="group flex items-baseline gap-6 py-5 transition-colors hover:bg-paper-2"
                >
                  <span className="spec w-8 shrink-0 text-[14px] text-ink-faint">
                    {String(INDUSTRIES.indexOf(ind) + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-medium tracking-[-0.01em]">
                      {ind.name}
                    </span>
                    <span className="mt-1 block text-base text-ink-soft">
                      {ind.description}
                    </span>
                  </span>
                  <span className="text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section className="gridpaper-dark border-t border-rule-dark bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.02em] text-balance md:text-4xl">
              Send us the range, the media and the connection.
            </h2>
            <p className="mt-4 max-w-lg text-paper/70">
              Build a list as you browse and send the whole thing at once — or just
              message us. We quote against a specification, not a catalogue number.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/contact"
              className="spec bg-signal px-7 py-3.5 text-[15px] tracking-[0.1em] text-white uppercase transition-colors hover:bg-signal-2"
            >
              Request a quote
            </Link>
            <a
              href={`tel:+${SITE.phones[0].raw}`}
              className="spec border border-paper/30 px-7 py-3.5 text-[15px] tracking-[0.1em] uppercase transition-colors hover:bg-paper hover:text-ink"
            >
              {SITE.phones[0].number}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
