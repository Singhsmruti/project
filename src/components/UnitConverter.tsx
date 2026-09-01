"use client";

import { useState } from "react";
import {
  PRESSURE_UNITS,
  TEMP_UNITS,
  convertPressure,
  convertTemp,
  fmt,
  type PressureUnit,
  type TempUnit,
} from "@/lib/units";

/**
 * A buyer's drawing says bar, the plant standard says psi, the old datasheet
 * says kg/cm². This converts once, in front of them, rather than making them
 * leave the site to check.
 */
export default function UnitConverter() {
  const [tab, setTab] = useState<"pressure" | "temperature">("pressure");
  const [raw, setRaw] = useState("10");
  const [pFrom, setPFrom] = useState<PressureUnit>("bar");
  const [tFrom, setTFrom] = useState<TempUnit>("°C");

  const value = Number(raw.replace(",", "."));
  const valid = raw.trim() !== "" && Number.isFinite(value);

  return (
    <div className="border border-rule bg-white">
      <div className="flex border-b border-rule">
        {(["pressure", "temperature"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setRaw(t === "pressure" ? "10" : "100");
            }}
            aria-pressed={tab === t}
            className={`spec flex-1 px-4 py-3 text-[14px] tracking-[0.1em] uppercase transition-colors ${
              tab === t
                ? "bg-ink text-paper"
                : "text-ink-soft hover:bg-paper-2 hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-5">
        <div className="flex gap-3">
          <input
            type="text"
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            aria-label={`Value in ${tab === "pressure" ? pFrom : tFrom}`}
            className="spec w-full border border-rule px-4 py-3 text-lg focus:border-ink focus:outline-none"
          />
          {tab === "pressure" ? (
            <select
              value={pFrom}
              onChange={(e) => setPFrom(e.target.value as PressureUnit)}
              aria-label="Convert from"
              className="spec shrink-0 border border-rule bg-white px-3 py-3 text-base focus:border-ink focus:outline-none"
            >
              {PRESSURE_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={tFrom}
              onChange={(e) => setTFrom(e.target.value as TempUnit)}
              aria-label="Convert from"
              className="spec shrink-0 border border-rule bg-white px-3 py-3 text-base focus:border-ink focus:outline-none"
            >
              {TEMP_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          )}
        </div>

        {!valid ? (
          <p className="mt-4 text-base text-ink-soft">Enter a number.</p>
        ) : (
          <dl className="mt-5 divide-y divide-rule border-t border-rule">
            {tab === "pressure"
              ? PRESSURE_UNITS.filter((u) => u !== pFrom).map((u) => (
                  <div key={u} className="flex items-baseline justify-between py-2.5">
                    <dt className="spec text-[14px] text-ink-soft">{u}</dt>
                    <dd className="spec text-base font-medium text-ink">
                      {fmt(convertPressure(value, pFrom, u))}
                    </dd>
                  </div>
                ))
              : TEMP_UNITS.filter((u) => u !== tFrom).map((u) => (
                  <div key={u} className="flex items-baseline justify-between py-2.5">
                    <dt className="spec text-[14px] text-ink-soft">{u}</dt>
                    <dd className="spec text-base font-medium text-ink">
                      {fmt(convertTemp(value, tFrom, u))}
                    </dd>
                  </div>
                ))}
          </dl>
        )}

        <p className="mt-4 text-[13px] leading-relaxed text-ink-faint">
          inH₂O referenced at 4 °C. Values are rounded for reading — quote the
          original figure on an order.
        </p>
      </div>
    </div>
  );
}
