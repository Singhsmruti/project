"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import RfqButton from "./RfqButton";
import { SERVICES, match, type Measures, type Service } from "@/data/selector";
import { spec } from "@/data/products";
import { SITE } from "@/data/site";

const MEASURES: { key: Measures; label: string; hint: string }[] = [
  { key: "pressure", label: "Pressure", hint: "Bourdon, capsule, diaphragm, differential" },
  { key: "temperature", label: "Temperature", hint: "Bi-metal, gas-in-metal, all-angle" },
  { key: "accessory", label: "Protecting a gauge", hint: "Dampeners, snubbers, wells, valves" },
];

export default function Selector() {
  const [measures, setMeasures] = useState<Measures | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  const results = useMemo(() => {
    if (!measures) return [];
    return match(measures, services)
      .filter((m) => m.score > 0)
      .slice(0, 6);
  }, [measures, services]);

  const toggleService = (s: Service) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const askText = `Hello 3S Technology — I am measuring ${
    measures ?? "…"
  }${
    services.length
      ? ` for ${services.map((s) => SERVICES.find((x) => x.key === s)?.label).join(", ").toLowerCase()}`
      : ""
  }. Could you recommend a gauge?`;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
        {/* ------------------------------------------------------ questions */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div>
            <p className="spec text-[13px] tracking-[0.16em] text-ink-faint uppercase">
              Step 1 — what are you measuring?
            </p>
            <div className="mt-4 space-y-2">
              {MEASURES.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => {
                    setMeasures(m.key);
                    setServices([]);
                  }}
                  aria-pressed={measures === m.key}
                  className={`block w-full border px-4 py-3 text-left transition-colors ${
                    measures === m.key
                      ? "border-ink bg-ink text-paper"
                      : "border-rule bg-white hover:border-ink"
                  }`}
                >
                  <span className="block text-base font-semibold">{m.label}</span>
                  <span
                    className={`mt-0.5 block text-[14px] ${
                      measures === m.key ? "text-paper/60" : "text-ink-soft"
                    }`}
                  >
                    {m.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={`mt-10 ${measures ? "" : "pointer-events-none opacity-40"}`}>
            <p className="spec text-[13px] tracking-[0.16em] text-ink-faint uppercase">
              Step 2 — what is the service?
            </p>
            <p className="mt-2 text-[14px] text-ink-soft">
              Pick everything that applies. More detail narrows it further.
            </p>
            <div className="mt-4 space-y-2">
              {SERVICES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => toggleService(s.key)}
                  aria-pressed={services.includes(s.key)}
                  className={`block w-full border px-4 py-2.5 text-left transition-colors ${
                    services.includes(s.key)
                      ? "border-signal bg-signal/5"
                      : "border-rule bg-white hover:border-ink"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`spec inline-flex h-4 w-4 shrink-0 items-center justify-center border text-[12px] ${
                        services.includes(s.key)
                          ? "border-signal bg-signal text-white"
                          : "border-rule"
                      }`}
                      aria-hidden="true"
                    >
                      {services.includes(s.key) ? "✓" : ""}
                    </span>
                    <span className="text-base font-medium">{s.label}</span>
                  </span>
                  <span className="mt-0.5 block pl-6 text-[14px] text-ink-soft">
                    {s.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {(measures || services.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setMeasures(null);
                setServices([]);
              }}
              className="spec mt-6 text-[13px] tracking-[0.08em] text-signal uppercase underline underline-offset-4"
            >
              Start again
            </button>
          )}
        </div>

        {/* -------------------------------------------------------- results */}
        <div>
          {!measures ? (
            <div className="border border-dashed border-rule px-6 py-24 text-center">
              <p className="text-lg font-medium">Answer step 1 to begin.</p>
              <p className="mx-auto mt-2 max-w-sm text-base leading-relaxed text-ink-soft">
                Two questions about the duty, and we will name the instruments built
                for it — with the reason, not just the part.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="spec text-[14px] tracking-[0.1em] text-ink-soft uppercase">
                  {results.length} suited{" "}
                  {results.length === 1 ? "instrument" : "instruments"}
                </p>
                {services.length === 0 && (
                  <p className="text-[14px] text-ink-faint">
                    Add a service in step 2 to rank these properly.
                  </p>
                )}
              </div>

              <ul className="mt-5 space-y-4">
                {results.map(({ product, why }, i) => {
                  const sizes = spec(product, "Sizes") ?? spec(product, "Size");
                  const acc =
                    spec(product, "Accuracy") ?? spec(product, "Accuracy class");
                  return (
                    <li
                      key={product.slug}
                      className="flex flex-col gap-5 border border-rule bg-white p-5 sm:flex-row"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="gridpaper relative h-32 w-full shrink-0 border border-rule sm:h-28 sm:w-28"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 112px"
                          className="object-contain p-2"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-3">
                          {i === 0 && (
                            <span className="spec mt-0.5 shrink-0 bg-signal px-2 py-1 text-[12px] tracking-[0.1em] text-white uppercase">
                              Best fit
                            </span>
                          )}
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="text-base font-semibold hover:text-signal">
                              {product.name}
                            </h3>
                          </Link>
                        </div>

                        <p className="mt-2 text-base leading-relaxed text-ink-3">{why}</p>

                        <p className="spec mt-3 text-[14px] text-ink-soft">
                          {[sizes && `Sizes ${sizes}`, acc && `Accuracy ${acc}`]
                            .filter(Boolean)
                            .join("  ·  ")}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <RfqButton slug={product.slug} />
                          <Link
                            href={`/products/${product.slug}`}
                            className="spec text-[13px] tracking-[0.08em] text-ink-soft uppercase hover:text-signal"
                          >
                            Full specs →
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border border-rule bg-paper-2 p-6">
                <p className="text-base leading-relaxed text-ink-3">
                  Not certain? Tell us the medium, the working pressure or temperature,
                  and the connection — we will specify it for you rather than sell you
                  a catalogue number.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(askText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spec bg-[#25D366] px-5 py-3 text-[14px] tracking-[0.08em] text-white uppercase"
                  >
                    Ask on WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="spec border border-ink px-5 py-3 text-[14px] tracking-[0.08em] uppercase hover:bg-ink hover:text-paper"
                  >
                    Send a specification
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
