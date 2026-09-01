"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRfq } from "./Rfq";
import { SITE } from "@/data/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/selector", label: "Find a gauge" },
  { href: "/applications", label: "Applications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { items, ready } = useRfq();

  useEffect(() => setOpen(false), [pathname]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur">
      {/* The thin ink strip — phone number always reachable, the way a buyer wants it */}
      <div className="hidden border-b border-rule bg-ink text-paper md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <p className="spec text-[13px] tracking-[0.14em] text-ink-faint uppercase">
            EN 837-1 · IS:3624 · ASME B40.200 — Vasai, Maharashtra
          </p>
          <div className="spec flex items-center gap-5 text-[14px]">
            {SITE.phones.map((p) => (
              <a
                key={p.raw}
                href={`tel:+${p.raw}`}
                className="text-paper/80 transition-colors hover:text-white"
              >
                {p.number}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* The original mark — flame, the 3S, and the gauge needle drawn through
            it — with only the "TECHNOLOGY" line cropped off, because the PNG's own
            lettering is illegible at header size and was printing the name twice.
            The word is set in the site's typeface instead. */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="3S Technology — home"
        >
          <Image
            src="/3s-lockup.png"
            alt=""
            width={552}
            height={453}
            className="h-11 w-auto"
            priority
          />
          <span className="text-xl leading-none font-semibold tracking-[0.02em] text-ink">
            TECHNOLOGY
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`spec relative py-1 text-[15px] tracking-[0.08em] uppercase transition-colors ${
                active(l.href)
                  ? "text-ink"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {l.label}
              {active(l.href) && (
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-signal" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/enquiry"
            className="spec relative hidden items-center gap-2 border border-ink px-4 py-2.5 text-[14px] tracking-[0.1em] uppercase transition-colors hover:bg-ink hover:text-paper sm:inline-flex"
          >
            Enquiry list
            {ready && items.length > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-signal px-1.5 text-[13px] leading-none text-white">
                {items.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center border border-rule lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[2px] w-5 bg-ink transition-transform ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-5 bg-ink transition-transform ${
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-rule bg-paper lg:hidden">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`spec block border-b border-rule px-6 py-4 text-[15px] tracking-[0.08em] uppercase ${
                active(l.href) ? "bg-paper-2 text-ink" : "text-ink-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/enquiry"
            className="spec flex items-center justify-between px-6 py-4 text-[15px] tracking-[0.08em] uppercase"
          >
            Enquiry list
            {ready && items.length > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-signal px-1.5 text-[13px] leading-none text-white">
                {items.length}
              </span>
            )}
          </Link>
        </nav>
      )}
    </header>
  );
}
