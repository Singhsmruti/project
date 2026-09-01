import type { Metadata } from "next";
import Selector from "@/components/Selector";
import UnitConverter from "@/components/UnitConverter";

export const metadata: Metadata = {
  title: "Find the right gauge — selector by service and duty",
  description:
    "Answer two questions about what you are measuring and the service it runs in, and we will name the pressure or temperature instruments built for it — with the reason, not just the part number.",
  alternates: { canonical: "/selector" },
};

export default function SelectorPage() {
  return (
    <>
      <section className="gridpaper-dark border-b border-rule-dark bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="eyebrow text-ink-faint">Selector</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            Find the right gauge for the duty
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-paper/70">
            Not by part number — by what the instrument has to survive. Two
            questions, and every recommendation carries its reason.
          </p>
        </div>
      </section>

      <Selector />

      <section className="border-t border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-16">
            <div>
              <p className="eyebrow">Working tool</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em]">
                Pressure &amp; temperature converter
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                The drawing says bar, the plant standard says psi, the old datasheet
                says kg/cm². Convert it here rather than leaving the page — and quote
                the original figure on the order.
              </p>
            </div>
            <UnitConverter />
          </div>
        </div>
      </section>
    </>
  );
}
