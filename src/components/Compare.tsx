"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import RfqButton from "./RfqButton";
import { PRODUCTS, type Product } from "@/data/products";

const MAX = 3;

/**
 * Side-by-side specification comparison. Industrial buyers do this on paper
 * anyway — three datasheets fanned out on a desk — so the table mirrors that:
 * one row per spec label, blank where an instrument simply does not carry it.
 */
export default function Compare() {
  const [picked, setPicked] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const chosen = picked
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean) as Product[];

  /** Every spec label present on any chosen product, in first-seen order. */
  const rows = useMemo(() => {
    const labels: string[] = [];
    for (const p of chosen) {
      for (const s of p.specs) if (!labels.includes(s.label)) labels.push(s.label);
    }
    return labels;
  }, [chosen]);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) => !picked.includes(p.slug) && (!q || p.name.toLowerCase().includes(q)),
    );
  }, [picked, query]);

  const add = (slug: string) => {
    setPicked((prev) => (prev.length >= MAX ? prev : [...prev, slug]));
    setQuery("");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      {/* ---------------------------------------------------------- picker */}
      <div className="border border-rule bg-white p-5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="spec text-[13px] tracking-[0.14em] text-ink-faint uppercase">
            Compare up to {MAX}
          </p>
          {chosen.map((p) => (
            <span
              key={p.slug}
              className="spec inline-flex items-center gap-2 border border-ink px-3 py-1.5 text-[13px]"
            >
              {p.name}
              <button
                type="button"
                onClick={() => setPicked((prev) => prev.filter((s) => s !== p.slug))}
                aria-label={`Remove ${p.name} from comparison`}
                className="text-signal"
              >
                ×
              </button>
            </span>
          ))}
          {picked.length > 0 && (
            <button
              type="button"
              onClick={() => setPicked([])}
              className="spec text-[13px] tracking-[0.06em] text-signal uppercase underline underline-offset-4"
            >
              Clear
            </button>
          )}
        </div>

        {picked.length < MAX && (
          <div className="mt-4 border-t border-rule pt-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find an instrument to add…"
              aria-label="Search instruments to compare"
              className="spec w-full border border-rule px-4 py-2.5 text-base placeholder:text-ink-faint focus:border-ink focus:outline-none sm:max-w-sm"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {options.slice(0, query ? 12 : 8).map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => add(p.slug)}
                  className="spec border border-rule px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  + {p.name}
                </button>
              ))}
              {options.length === 0 && (
                <p className="text-[14px] text-ink-soft">Nothing else matches that.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------- table */}
      {chosen.length === 0 ? (
        <div className="mt-8 border border-dashed border-rule px-6 py-24 text-center">
          <p className="text-lg font-medium">Pick two instruments to compare.</p>
          <p className="mx-auto mt-2 max-w-sm text-base leading-relaxed text-ink-soft">
            Sizes, accuracy, connections and protection, laid out in columns — the
            way you would fan the datasheets out on a desk.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto border border-rule bg-white">
          <table className="w-full min-w-[42rem] border-collapse">
            <caption className="sr-only">
              Specification comparison of {chosen.map((p) => p.name).join(", ")}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-44 border-b border-rule p-4 text-left">
                  <span className="spec text-[13px] tracking-[0.14em] text-ink-faint uppercase">
                    Specification
                  </span>
                </th>
                {chosen.map((p) => (
                  <th
                    key={p.slug}
                    scope="col"
                    className="border-b border-l border-rule p-4 text-left align-top"
                  >
                    <Link href={`/products/${p.slug}`} className="block">
                      <span className="gridpaper relative block h-24 w-full border border-rule">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="200px"
                          className="object-contain p-2"
                        />
                      </span>
                      <span className="mt-3 block text-base leading-snug font-semibold hover:text-signal">
                        {p.name}
                      </span>
                    </Link>
                    <span className="mt-3 block">
                      <RfqButton slug={p.slug} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((label, i) => (
                <tr key={label} className={i % 2 ? "bg-paper-2/60" : ""}>
                  <th
                    scope="row"
                    className="border-b border-rule p-4 text-left align-top text-base font-normal text-ink-faint"
                  >
                    {label}
                  </th>
                  {chosen.map((p) => {
                    const s = p.specs.find((x) => x.label === label);
                    return (
                      <td
                        key={p.slug}
                        className="border-b border-l border-rule p-4 align-top"
                      >
                        {s ? (
                          <span className="spec-value block text-[15px] leading-relaxed">
                            {s.values.length === 1 ? (
                              s.values[0]
                            ) : (
                              <ul className="space-y-1">
                                {s.values.map((v) => (
                                  <li key={v}>{v}</li>
                                ))}
                              </ul>
                            )}
                          </span>
                        ) : (
                          <span className="spec text-ink-faint" aria-label="not applicable">
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th
                  scope="row"
                  className="p-4 text-left text-base font-normal text-ink-faint"
                >
                  HSN code
                </th>
                {chosen.map((p) => (
                  <td key={p.slug} className="border-l border-rule p-4">
                    <span className="spec text-[15px] text-ink-3">{p.hsn}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
