"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const KEY = "3s.rfq.v1";

export type RfqLine = { slug: string; qty: number; note: string };

type RfqCtx = {
  lines: RfqLine[];
  /** just the slugs, for the places that only care whether a thing is in */
  items: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  setNote: (slug: string, note: string) => void;
  clear: () => void;
  ready: boolean;
};

const Ctx = createContext<RfqCtx | null>(null);

/**
 * Reads both the current shape and the original string[] one, so a buyer who
 * built a list before quantities existed does not silently lose it.
 */
function parse(raw: string): RfqLine[] {
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) return [];
  return data
    .map((entry): RfqLine | null => {
      if (typeof entry === "string") return { slug: entry, qty: 1, note: "" };
      if (entry && typeof entry === "object" && "slug" in entry) {
        const e = entry as Partial<RfqLine>;
        return {
          slug: String(e.slug),
          qty: Number.isFinite(e.qty) && Number(e.qty) > 0 ? Number(e.qty) : 1,
          note: typeof e.note === "string" ? e.note : "",
        };
      }
      return null;
    })
    .filter(Boolean) as RfqLine[];
}

export function RfqProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<RfqLine[]>([]);
  const [ready, setReady] = useState(false);

  // Hydrate after mount — a buyer who browses on Monday and sends on Wednesday
  // still has their list.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setLines(parse(raw));
    } catch {
      /* private mode, quota, corrupt JSON — an empty list is fine */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* nothing worth breaking the page over */
    }
  }, [lines, ready]);

  const items = useMemo(() => lines.map((l) => l.slug), [lines]);

  const has = useCallback(
    (slug: string) => lines.some((l) => l.slug === slug),
    [lines],
  );

  const toggle = useCallback((slug: string) => {
    setLines((prev) =>
      prev.some((l) => l.slug === slug)
        ? prev.filter((l) => l.slug !== slug)
        : [...prev, { slug, qty: 1, note: "" }],
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l)),
    );
  }, []);

  const setNote = useCallback((slug: string, note: string) => {
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, note } : l)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, items, has, toggle, remove, setQty, setNote, clear, ready }),
    [lines, items, has, toggle, remove, setQty, setNote, clear, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRfq(): RfqCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRfq must be used inside <RfqProvider>");
  return ctx;
}
