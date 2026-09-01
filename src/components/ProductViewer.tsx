"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The instrument itself, turnable — with the photograph one click away.
 *
 * Onkar's rule, 2026-08-29: a confirmed model goes on that product's own page
 * as the PRIMARY view, with a switch back to the photograph for anyone who
 * wants it. Not a gallery, not a separate page.
 *
 * The photograph is never merely an alternative here — it is also the poster
 * and the fallback. It paints instantly from Next's optimiser while ~1.2 MB of
 * GLB arrives, and it is what stays on screen if the model never arrives at
 * all: no WebGL, a blocked request, a phone that gives up. An SME buyer on
 * mobile data must never be shown an empty grey box where the product was.
 */

type Props = {
  slug: string;
  model: string;
  image: string;
  name: string;
  summary: string;
};

type Mode = "model" | "photo";

export default function ProductViewer({ slug, model, image, name, summary }: Props) {
  const [mode, setMode] = useState<Mode>("model");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const host = useRef<HTMLDivElement>(null);

  // The custom element is loaded on the client only and only once per session.
  // It is ~350 KB, so it must never be part of the server bundle or of a page
  // that has no model to show.
  useEffect(() => {
    let alive = true;
    import("@google/model-viewer")
      .then(() => alive && setReady(true))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  // <model-viewer> is a custom element, so React sets unknown props as
  // attributes but will not attach listeners for its non-bubbling events.
  // Bind them by hand, and treat any load error as "show the photograph".
  useEffect(() => {
    const el = host.current?.querySelector("model-viewer");
    if (!el) return;
    const onError = () => setFailed(true);
    el.addEventListener("error", onError);
    return () => el.removeEventListener("error", onError);
  }, [ready]);

  const showModel = mode === "model" && ready && !failed;
  const alt = `${name} — ${summary}`;

  return (
    <div className="self-start">
      <div
        ref={host}
        className="gridpaper relative aspect-square border border-rule"
      >
        {/* The photograph is always mounted: it is the poster while the model
            loads, the fallback if it fails, and the alternate view on demand.
            Unmounting it would make the switch flash white on a slow phone. */}
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-contain p-10 transition-opacity duration-300 ${
            showModel ? "opacity-0" : "opacity-100"
          }`}
          priority
        />

        {ready && !failed && (
          <model-viewer
            src={model}
            alt={`Rotatable 3D model of the ${name}`}
            camera-controls={mode === "model" ? true : undefined}
            touch-action="pan-y"
            shadow-intensity="0.35"
            exposure="1.05"
            environment-image="neutral"
            interaction-prompt="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              opacity: showModel ? 1 : 0,
              pointerEvents: showModel ? "auto" : "none",
              transition: "opacity 300ms",
            }}
          />
        )}

        {showModel && (
          <p className="spec pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[12px] tracking-[0.08em] text-ink-soft uppercase">
            Drag to rotate · scroll to zoom
          </p>
        )}
      </div>

      {/* Only offered once the model can actually be shown. A dead toggle is
          worse than no toggle. */}
      {ready && !failed && (
        <div
          className="no-print mt-3 flex flex-wrap items-center gap-x-3 gap-y-2"
          role="group"
          aria-label={`How to view the ${name}`}
        >
          {(
            [
              ["model", "3D model"],
              ["photo", "Photograph"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              aria-pressed={mode === key}
              className={`spec cursor-pointer border px-3 py-1.5 text-[13px] tracking-[0.08em] uppercase transition-colors ${
                mode === key
                  ? "border-ink bg-ink text-paper"
                  : "border-rule text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
          {/* w-full drops this onto its own line on a phone; beside the buttons
              it wrapped to four lines and made the toggle look like a caption */}
          <span className="spec w-full text-[12px] tracking-[0.06em] text-ink-soft uppercase sm:ml-auto sm:w-auto">
            Reconstructed from 3S&apos;s own photograph of the {name.toLowerCase()}
          </span>
        </div>
      )}
    </div>
  );
}
