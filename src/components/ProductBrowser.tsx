"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import RfqButton from "./RfqButton";
import { CATEGORIES, PRODUCTS, haystack, spec, type Category } from "@/data/products";

type Filter = Category | "all";

/** The spec facets a buyer actually narrows by, matched against spec text. */
const FACETS = [
  { key: "63mm", label: "63 mm", test: (h: string) => h.includes("63") },
  { key: "100mm", label: "100 mm", test: (h: string) => h.includes("100") },
  { key: "150mm", label: "150 mm", test: (h: string) => h.includes("150") },
  { key: "ip65", label: "IP 65", test: (h: string) => h.includes("ip 65") },
  { key: "ss", label: "Stainless steel", test: (h: string) => /\bss\b|stainless/.test(h) },
  { key: "npt", label: "NPT / BSP", test: (h: string) => h.includes("npt") },
  { key: "filled", label: "Liquid fillable", test: (h: string) => h.includes("fill") },
];

export default function ProductBrowser() {
  const params = useSearchParams();
  const initial = (params.get("category") as Filter) || "all";

  const [category, setCategory] = useState<Filter>(
    CATEGORIES.some((c) => c.key === initial) ? initial : "all",
  );
  const [query, setQuery] = useState("");
  const [facets, setFacets] = useState<string[]>([]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      const h = haystack(p);
      if (q && !h.includes(q)) return false;
      for (const key of facets) {
        const f = FACETS.find((x) => x.key === key);
        if (f && !f.test(h)) return false;
      }
      return true;
    });
  }, [category, query, facets]);

  const toggleFacet = (key: string) =>
    setFacets((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  const clear = () => {
    setQuery("");
    setFacets([]);
    setCategory("all");
  };

  return (
    <div>
      {/* ------------------------------------------------------- the controls */}
      <div className="border-y border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`spec border px-4 py-2.5 text-[14px] tracking-[0.08em] uppercase transition-colors ${
                  category === "all"
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                All ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((c) => {
                const n = PRODUCTS.filter((p) => p.category === c.key).length;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCategory(c.key)}
                    className={`spec border px-4 py-2.5 text-[14px] tracking-[0.08em] uppercase transition-colors ${
                      category === c.key
                        ? "border-ink bg-ink text-paper"
                        : "border-rule text-ink-soft hover:border-ink hover:text-ink"
                    }`}
                  >
                    {c.label} ({n})
                  </button>
                );
              })}
            </div>

            <div className="relative lg:w-80">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search size, accuracy, connection…"
                aria-label="Search products by name or specification"
                className="spec w-full border border-rule bg-white py-2.5 pr-4 pl-10 text-base placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-rule pt-4">
            <span className="spec mr-1 text-[13px] tracking-[0.12em] text-ink-faint uppercase">
              Narrow by
            </span>
            {FACETS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => toggleFacet(f.key)}
                aria-pressed={facets.includes(f.key)}
                className={`spec border px-3 py-1.5 text-[13px] tracking-[0.06em] transition-colors ${
                  facets.includes(f.key)
                    ? "border-signal bg-signal text-white"
                    : "border-rule bg-white text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
            {(facets.length > 0 || query || category !== "all") && (
              <button
                type="button"
                onClick={clear}
                className="spec ml-1 text-[13px] tracking-[0.06em] text-signal underline underline-offset-4"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------- the results */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="spec text-[14px] tracking-[0.1em] text-ink-soft uppercase">
          {results.length} {results.length === 1 ? "instrument" : "instruments"}
        </p>

        {results.length === 0 ? (
          <div className="mt-10 border border-dashed border-rule px-6 py-20 text-center">
            <p className="text-lg font-medium">Nothing matches that yet.</p>
            <p className="mt-2 text-base text-ink-soft">
              We build to specification as well as to catalogue — tell us the range,
              media and connection and we will quote it.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={clear}
                className="spec border border-ink px-5 py-2.5 text-[14px] tracking-[0.08em] uppercase hover:bg-ink hover:text-paper"
              >
                Clear filters
              </button>
              <Link
                href="/contact"
                className="spec bg-signal px-5 py-2.5 text-[14px] tracking-[0.08em] text-white uppercase hover:bg-signal-2"
              >
                Ask for a custom build
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => {
              const accuracy = spec(p, "Accuracy") ?? spec(p, "Accuracy class");
              const sizes = spec(p, "Sizes") ?? spec(p, "Size");
              const range = spec(p, "Range");
              return (
                <article
                  key={p.slug}
                  className="group flex flex-col border border-rule bg-white transition-colors hover:border-ink"
                >
                  <Link href={`/products/${p.slug}`} className="block">
                    <div className="gridpaper relative aspect-4/3 overflow-hidden border-b border-rule">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <Link href={`/products/${p.slug}`}>
                      <h2 className="text-base leading-snug font-semibold tracking-[-0.01em] group-hover:text-signal">
                        {p.name}
                      </h2>
                    </Link>
                    <p className="mt-2 line-clamp-2 text-base leading-relaxed text-ink-soft">
                      {p.summary}
                    </p>

                    <dl className="mt-4 space-y-1.5 border-t border-rule pt-4">
                      {sizes && (
                        <div className="flex gap-3 text-[14px]">
                          <dt className="w-20 shrink-0 text-ink-faint">Sizes</dt>
                          <dd className="spec flex-1 text-ink-3">{sizes}</dd>
                        </div>
                      )}
                      {accuracy && (
                        <div className="flex gap-3 text-[14px]">
                          <dt className="w-20 shrink-0 text-ink-faint">Accuracy</dt>
                          <dd className="spec flex-1 text-ink-3">{accuracy}</dd>
                        </div>
                      )}
                      {range && (
                        <div className="flex gap-3 text-[14px]">
                          <dt className="w-20 shrink-0 text-ink-faint">Range</dt>
                          <dd className="spec flex-1 text-ink-3">{range}</dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-5 flex items-center justify-between gap-3 pt-1">
                      <RfqButton slug={p.slug} />
                      <Link
                        href={`/products/${p.slug}`}
                        className="spec text-[13px] tracking-[0.08em] text-ink-soft uppercase hover:text-signal"
                      >
                        Specs →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
