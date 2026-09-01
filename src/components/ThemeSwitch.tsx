"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  type ThemeKey,
} from "@/data/themes";

/**
 * A PREVIEW control, not a customer feature — it exists so the theme table can
 * be compared on the real pages instead of in swatches. Delete this component
 * and its import in layout.tsx before deploy; the themes themselves live in
 * globals.css and survive without it.
 */
export default function ThemeSwitch() {
  const [theme, setTheme] = useState<ThemeKey>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeKey | null;
    if (saved && THEMES.some((t) => t.key === saved)) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* not worth breaking a page over */
    }
  }, [theme]);

  const current = THEMES.find((t) => t.key === theme) ?? THEMES[0];

  return (
    <div className="no-print fixed bottom-5 left-5 z-40">
      {open && (
        <div className="mb-2 w-72 border border-rule bg-white shadow-lg shadow-black/10">
          <p className="spec border-b border-rule px-4 py-2.5 text-[12px] tracking-[0.16em] text-ink-faint uppercase">
            Theme preview — not shipped
          </p>
          <ul>
            {THEMES.map((t) => (
              <li key={t.key}>
                <button
                  type="button"
                  onClick={() => setTheme(t.key)}
                  aria-pressed={t.key === theme}
                  className={`flex w-full items-start gap-3 border-b border-rule px-4 py-3 text-left transition-colors last:border-b-0 ${
                    t.key === theme ? "bg-paper-2" : "hover:bg-paper-2"
                  }`}
                >
                  <span className="mt-0.5 flex shrink-0 border border-rule">
                    {t.swatch.map((c) => (
                      <span
                        key={c}
                        className="block h-5 w-4"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-base font-semibold">{t.name}</span>
                      {t.key === theme && (
                        <span className="spec text-[12px] tracking-[0.1em] text-signal uppercase">
                          on
                        </span>
                      )}
                    </span>
                    <span className="spec mt-0.5 block text-[12px] tracking-[0.06em] text-ink-faint uppercase">
                      {t.origin}
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-snug text-ink-soft">
                      {t.note}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="spec flex h-11 items-center gap-2.5 border border-ink bg-white pr-4 pl-3 text-[13px] tracking-[0.1em] uppercase shadow-md shadow-black/10"
      >
        <span className="flex border border-rule">
          {current.swatch.map((c) => (
            <span key={c} className="block h-4 w-3" style={{ backgroundColor: c }} />
          ))}
        </span>
        {current.name}
      </button>
    </div>
  );
}
