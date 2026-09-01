import Link from "next/link";
import Dial from "@/components/Dial";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center">
      <Dial className="h-32 w-32 text-ink-faint" needle={330} />
      <p className="eyebrow mt-10">Error 404</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em]">
        Off the scale
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
        That page does not exist. The catalogue does — 25 instruments, all of them
        searchable by size, accuracy and connection.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/products"
          className="spec bg-signal px-6 py-3.5 text-[15px] tracking-[0.08em] text-white uppercase hover:bg-signal-2"
        >
          Browse products
        </Link>
        <Link
          href="/"
          className="spec border border-ink px-6 py-3.5 text-[15px] tracking-[0.08em] uppercase hover:bg-ink hover:text-paper"
        >
          Home
        </Link>
      </div>
    </section>
  );
}
