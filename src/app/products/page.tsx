import type { Metadata } from "next";
import { Suspense } from "react";
import ProductBrowser from "@/components/ProductBrowser";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Products — Pressure & Temperature Gauges and Accessories",
  description: `All ${PRODUCTS.length} instruments: utility, stainless steel, process, test and precision pressure gauges from 40 to 250 mm, bi-metal and gas-in-metal thermometers from −50 to 650 °C, plus dampeners, snubbers, thermowells and valves.`,
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="gridpaper-dark border-b border-rule-dark bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="eyebrow text-ink-faint">Catalogue</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            Every instrument we build
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-paper/70">
            Search by size, accuracy or connection. Add what you need to an enquiry
            list and send the whole list in one message.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="spec text-base text-ink-soft">Loading catalogue…</p>
          </div>
        }
      >
        <ProductBrowser />
      </Suspense>
    </>
  );
}
