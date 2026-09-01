"use client";

import Image from "next/image";
import Link from "next/link";
import { useRfq } from "./Rfq";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export default function EnquiryList() {
  const { lines, remove, clear, setQty, setNote, ready } = useRfq();

  if (!ready) {
    return <p className="spec text-base text-ink-soft">Loading your list…</p>;
  }

  const rows = lines
    .map((l) => ({ line: l, product: PRODUCTS.find((p) => p.slug === l.slug) }))
    .filter((r) => r.product);

  if (rows.length === 0) {
    return (
      <div className="no-print border border-dashed border-rule px-6 py-16 text-center">
        <p className="text-lg font-medium">Your enquiry list is empty.</p>
        <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-ink-soft">
          Add gauges as you browse — across categories — then send the whole list in
          one message instead of writing them out one at a time.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="spec bg-signal px-6 py-3 text-[14px] tracking-[0.08em] text-white uppercase hover:bg-signal-2"
          >
            Browse products
          </Link>
          <Link
            href="/selector"
            className="spec border border-ink px-6 py-3 text-[14px] tracking-[0.08em] uppercase hover:bg-ink hover:text-paper"
          >
            Help me choose
          </Link>
        </div>
      </div>
    );
  }

  const waText = `Hello 3S Technology — I would like a quotation for:\n${rows
    .map(
      ({ line, product }, i) =>
        `${i + 1}. ${product!.name} — qty ${line.qty}${line.note ? ` (${line.note})` : ""}`,
    )
    .join("\n")}`;

  const totalUnits = rows.reduce((n, r) => n + r.line.qty, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="spec text-[14px] tracking-[0.1em] text-ink-soft uppercase">
          {rows.length} {rows.length === 1 ? "line" : "lines"} · {totalUnits}{" "}
          {totalUnits === 1 ? "unit" : "units"}
        </p>
        <div className="no-print flex items-center gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="spec text-[13px] tracking-[0.08em] text-ink-soft uppercase underline underline-offset-4 hover:text-ink"
          >
            Print / save as PDF
          </button>
          <button
            type="button"
            onClick={clear}
            className="spec text-[13px] tracking-[0.08em] text-signal uppercase underline underline-offset-4"
          >
            Clear list
          </button>
        </div>
      </div>

      {/* Only shows on paper: the header a printed RFQ needs to stand alone. */}
      <div className="hidden print:mb-6 print:block">
        <p className="text-xl font-semibold">Request for quotation</p>
        <p className="spec mt-1 text-[14px] text-ink-soft">
          3S Technology · {SITE.emails[0]} · {SITE.phones[0].number} · GSTIN{" "}
          {SITE.gstin}
        </p>
      </div>

      <ul className="mt-4 divide-y divide-rule border-y border-rule">
        {rows.map(({ line, product }) => (
          <li key={line.slug} className="py-4">
            <div className="flex items-start gap-4">
              <div className="gridpaper relative h-16 w-16 shrink-0 border border-rule">
                <Image
                  src={product!.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                />
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${product!.slug}`}
                  className="text-base font-medium hover:text-signal"
                >
                  {product!.name}
                </Link>
                <p className="spec mt-0.5 text-[13px] tracking-[0.08em] text-ink-faint uppercase">
                  HSN {product!.hsn}
                </p>
              </div>

              <div className="no-print flex shrink-0 items-center border border-rule">
                <button
                  type="button"
                  onClick={() => setQty(line.slug, line.qty - 1)}
                  disabled={line.qty <= 1}
                  aria-label={`Decrease quantity of ${product!.name}`}
                  className="spec h-9 w-9 text-ink-soft disabled:opacity-30"
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  value={line.qty}
                  onChange={(e) => {
                    const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
                    setQty(line.slug, Number.isFinite(n) ? n : 1);
                  }}
                  aria-label={`Quantity of ${product!.name}`}
                  className="spec h-9 w-12 border-x border-rule text-center text-base focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQty(line.slug, line.qty + 1)}
                  aria-label={`Increase quantity of ${product!.name}`}
                  className="spec h-9 w-9 text-ink-soft"
                >
                  +
                </button>
              </div>

              <span className="spec hidden shrink-0 text-base print:block">
                Qty {line.qty}
              </span>

              <button
                type="button"
                onClick={() => remove(line.slug)}
                aria-label={`Remove ${product!.name} from the enquiry list`}
                className="no-print spec shrink-0 border border-rule px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:border-signal hover:text-signal"
              >
                Remove
              </button>
            </div>

            <input
              type="text"
              value={line.note}
              onChange={(e) => setNote(line.slug, e.target.value)}
              placeholder="Range, connection, material, dial size…"
              aria-label={`Specification note for ${product!.name}`}
              className="no-print mt-3 ml-20 w-[calc(100%-5rem)] border border-rule px-3 py-2 text-[15px] placeholder:text-ink-faint focus:border-ink focus:outline-none"
            />
            {line.note && (
              <p className="spec mt-2 ml-20 hidden text-[14px] text-ink-3 print:block">
                {line.note}
              </p>
            )}
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="no-print spec mt-6 inline-block bg-[#25D366] px-6 py-3.5 text-[14px] tracking-[0.08em] text-white uppercase"
      >
        Send this list on WhatsApp
      </a>
      <p className="no-print mt-3 text-[15px] text-ink-soft">
        …or fill in the form and the whole list — quantities and notes included —
        goes with it.
      </p>
    </div>
  );
}
