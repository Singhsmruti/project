import type { Metadata } from "next";
import Compare from "@/components/Compare";

export const metadata: Metadata = {
  title: "Compare instruments side by side",
  description:
    "Put up to three 3S Technology gauges in columns and read their sizes, accuracy, connections and enclosure protection against each other.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <>
      <section className="gridpaper-dark border-b border-rule-dark bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="eyebrow text-ink-faint">Compare</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            Three datasheets, one table
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-paper/70">
            Every specification lined up in columns, blank where an instrument simply
            does not carry it.
          </p>
        </div>
      </section>

      <Compare />
    </>
  );
}
