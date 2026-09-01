"use client";

import { useRfq } from "./Rfq";

export default function RfqButton({
  slug,
  size = "sm",
}: {
  slug: string;
  size?: "sm" | "lg";
}) {
  const { has, toggle, ready } = useRfq();
  const added = ready && has(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={added}
      className={`spec inline-flex items-center gap-2 border tracking-[0.08em] uppercase transition-colors ${
        size === "lg" ? "px-6 py-3.5 text-[15px]" : "px-3 py-2 text-[13px]"
      } ${
        added
          ? "border-signal bg-signal text-white"
          : "border-ink text-ink hover:bg-ink hover:text-paper"
      }`}
    >
      <span aria-hidden="true">{added ? "✓" : "+"}</span>
      {added ? "In enquiry list" : "Add to enquiry"}
    </button>
  );
}
