/**
 * Unit conversion for the two quantities this catalogue is about.
 *
 * A buyer's drawing says bar, the plant standard says psi, the datasheet says
 * kg/cm², and the enquiry arrives in whichever one they were holding. Getting
 * that wrong is not a rounding error — it is the wrong gauge.
 */

export type PressureUnit = "bar" | "psi" | "kPa" | "MPa" | "kg/cm²" | "mmHg" | "inH₂O";

/** Every pressure unit expressed in pascals, so conversion is one hop through SI. */
const PA_PER: Record<PressureUnit, number> = {
  bar: 100_000,
  psi: 6_894.757_293_168_36,
  kPa: 1_000,
  MPa: 1_000_000,
  "kg/cm²": 98_066.5,
  mmHg: 133.322_387_415,
  "inH₂O": 249.088_908_333, // at 4 °C, the conventional reference
};

export const PRESSURE_UNITS = Object.keys(PA_PER) as PressureUnit[];

export function convertPressure(
  value: number,
  from: PressureUnit,
  to: PressureUnit,
): number {
  return (value * PA_PER[from]) / PA_PER[to];
}

export type TempUnit = "°C" | "°F" | "K";
export const TEMP_UNITS: TempUnit[] = ["°C", "°F", "K"];

export function convertTemp(value: number, from: TempUnit, to: TempUnit): number {
  // via celsius
  const c = from === "°C" ? value : from === "°F" ? (value - 32) * (5 / 9) : value - 273.15;
  if (to === "°C") return c;
  if (to === "°F") return c * (9 / 5) + 32;
  return c + 273.15;
}

/**
 * Significant-figure formatting. A converted 100 bar is 1450.377 psi, and
 * printing all of that implies a precision the original number never had.
 */
export function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs === 0) return "0";
  if (abs >= 1000) return n.toLocaleString("en-IN", { maximumFractionDigits: 1 });
  if (abs >= 100) return n.toFixed(1);
  if (abs >= 1) return n.toFixed(2);
  if (abs >= 0.01) return n.toFixed(4);
  return n.toExponential(2);
}
