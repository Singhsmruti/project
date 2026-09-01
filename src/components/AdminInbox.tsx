"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Enquiry, InboxResult } from "@/lib/admin";

const READ_KEY = "3s.admin.read.v1";

function readSet(): Set<string> {
  try {
    const raw = window.localStorage.getItem(READ_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

/** dd Mon yyyy, HH:mm — fixed locale so the server and this agree. */
function when(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminInbox({ result }: { result: InboxResult }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [read, setRead] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Read-state is per-device and deliberately local: marking a lead read must
  // never write to the client's own database.
  useEffect(() => {
    setRead(readSet());
    setHydrated(true);
  }, []);

  const markRead = (id: string) => {
    setRead((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(READ_KEY, JSON.stringify([...next]));
      } catch {
        /* nothing worth breaking the page over */
      }
      return next;
    });
  };

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const enquiries: Enquiry[] = result.ok ? result.enquiries : [];

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enquiries;
    return enquiries.filter((e) =>
      [e.name, e.email, e.phone, e.company, e.product_interest, e.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [enquiries, query]);

  const unread = enquiries.filter((e) => !read.has(e.id)).length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Back office</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em]">
            Enquiry inbox
          </h1>
          {result.ok && (
            <p className="spec mt-2 text-[14px] tracking-[0.08em] text-ink-soft uppercase">
              {enquiries.length} total
              {hydrated && unread > 0 && (
                <span className="text-signal"> · {unread} unread</span>
              )}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="spec border border-rule px-4 py-2.5 text-[13px] tracking-[0.08em] uppercase hover:border-ink"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={signOut}
            className="spec border border-ink px-4 py-2.5 text-[13px] tracking-[0.08em] uppercase hover:bg-ink hover:text-paper"
          >
            Sign out
          </button>
        </div>
      </div>

      {!result.ok ? (
        <div className="mt-10 border border-signal/40 bg-signal/5 p-6">
          <p className="spec text-[13px] tracking-[0.14em] text-signal uppercase">
            {result.reason === "not-configured"
              ? "Database not configured"
              : "Could not read the inbox"}
          </p>
          <p className="mt-3 text-base leading-relaxed text-ink-3">
            {result.reason === "not-configured" ? (
              <>
                Set <code className="spec">SUPABASE_URL</code> and{" "}
                <code className="spec">SUPABASE_KEY</code> on the server. Until then
                the site still takes enquiries — the form falls back to WhatsApp and
                email rather than losing them.
              </>
            ) : (
              <>
                Supabase answered, but not with data. Nothing has been lost; the
                form&rsquo;s fallback still routes enquiries to WhatsApp and email.
              </>
            )}
          </p>
          {result.detail && (
            <pre className="spec mt-4 overflow-x-auto border border-rule bg-white p-4 text-[13px] whitespace-pre-wrap text-ink-soft">
              {result.detail}
            </pre>
          )}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="mt-10 border border-dashed border-rule px-6 py-20 text-center">
          <p className="text-lg font-medium">No enquiries yet.</p>
          <p className="mx-auto mt-2 max-w-sm text-base leading-relaxed text-ink-soft">
            The table is reachable and empty — which is the answer to whether any
            were ever stored.
          </p>
        </div>
      ) : (
        <>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, company, product, message…"
            aria-label="Search enquiries"
            className="spec mt-8 w-full border border-rule bg-white px-4 py-3 text-base placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />

          <ul className="mt-6 space-y-4">
            {shown.map((e) => {
              const isRead = hydrated && read.has(e.id);
              const reply = `Hello ${e.name}, thank you for your enquiry to 3S Technology.`;
              return (
                <li
                  key={e.id}
                  className={`border bg-white p-5 ${
                    isRead ? "border-rule opacity-70" : "border-ink"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {e.name}
                        {e.company && (
                          <span className="font-normal text-ink-soft"> · {e.company}</span>
                        )}
                      </p>
                      <p className="spec mt-1 text-[14px] text-ink-soft">
                        {when(e.created_at)}
                        {e.product_interest && (
                          <span className="text-signal"> · {e.product_interest}</span>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => markRead(e.id)}
                      className="spec border border-rule px-3 py-1.5 text-[13px] tracking-[0.06em] uppercase hover:border-ink"
                    >
                      {isRead ? "Mark unread" : "Mark read"}
                    </button>
                  </div>

                  <p className="mt-4 border-y border-rule py-4 text-base leading-relaxed whitespace-pre-wrap text-ink-3">
                    {e.message}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={`mailto:${e.email}?subject=${encodeURIComponent(
                        "Re: your enquiry to 3S Technology",
                      )}&body=${encodeURIComponent(reply)}`}
                      className="spec text-[14px] text-ink-3 underline underline-offset-4 hover:text-signal"
                    >
                      {e.email}
                    </a>
                    {e.phone && (
                      <>
                        <a
                          href={`tel:${e.phone}`}
                          className="spec text-[14px] text-ink-3 underline underline-offset-4 hover:text-signal"
                        >
                          {e.phone}
                        </a>
                        <a
                          href={`https://wa.me/${e.phone.replace(/\D/g, "")}?text=${encodeURIComponent(reply)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="spec text-[14px] text-[#128C4A] underline underline-offset-4"
                        >
                          WhatsApp
                        </a>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {shown.length === 0 && (
            <p className="mt-8 text-base text-ink-soft">Nothing matches that search.</p>
          )}
        </>
      )}
    </div>
  );
}
