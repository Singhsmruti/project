import { PRODUCTS, type Product } from "./products";

/**
 * The selection knowledge — what each instrument is actually FOR, kept separate
 * from products.ts so the spec sheet stays the single source of truth for
 * numbers while this file holds the judgement about service.
 *
 * Traits are deliberately about the *duty*, not the datasheet: a buyer knows
 * their medium is corrosive long before they know they want a diaphragm seal.
 */

export type Measures = "pressure" | "temperature" | "accessory";

export type Service =
  | "general"
  | "corrosive"
  | "viscous"
  | "hygienic"
  | "vibration"
  | "high-pressure"
  | "switching"
  | "calibration"
  | "differential"
  | "gaseous";

export const SERVICES: { key: Service; label: string; hint: string }[] = [
  { key: "general", label: "General industrial", hint: "Compressors, pumps, boilers, hydraulics" },
  { key: "corrosive", label: "Corrosive media", hint: "Chemical, petrochemical, offshore" },
  { key: "viscous", label: "Viscous or crystallizing", hint: "Slurries, resins, media that block a socket" },
  { key: "hygienic", label: "Hygienic / sanitary", hint: "Food, beverage, pharma, biotech" },
  { key: "vibration", label: "Pulsation or vibration", hint: "Reciprocating pumps, compressors" },
  { key: "high-pressure", label: "Very high pressure", hint: "Hydraulic test rigs, high-range service" },
  { key: "switching", label: "Needs electrical switching", hint: "Alarm or trip on a set point" },
  { key: "calibration", label: "Laboratory / calibration", hint: "Reference and test work" },
  { key: "differential", label: "Differential across a filter", hint: "Filter control, flow measurement" },
  { key: "gaseous", label: "Low-pressure gas or air", hint: "Dry gases, draught, ventilation" },
];

type Rule = { measures: Measures; services: Service[]; why: string };

/** slug → what it is for. Every product in PRODUCTS must appear here. */
export const RULES: Record<string, Rule> = {
  "utility-commercial-gauges": {
    measures: "pressure",
    services: ["general"],
    why: "The workhorse: compressors, pumps, boilers and hydraulics at ±2.5% FSD.",
  },
  "stainless-steel-case-liquid-fillable": {
    measures: "pressure",
    services: ["vibration", "corrosive", "general"],
    why: "Glycerine fill kills pointer flutter; stainless case handles the atmosphere.",
  },
  "solid-front-case-liquid-fillable": {
    measures: "pressure",
    services: ["corrosive", "high-pressure", "vibration"],
    why: "Solid front and blow-out back — the safety case for chemical and offshore duty.",
  },
  "differential-gauges": {
    measures: "pressure",
    services: ["differential"],
    why: "Reads the drop across a filter directly, to 6000 psi over-range.",
  },
  "process-gauges": {
    measures: "pressure",
    services: ["corrosive", "general"],
    why: "Heavy-duty 115 mm process case at ±1.0% FSD, IP 65.",
  },
  "contact-gauges": {
    measures: "pressure",
    services: ["switching"],
    why: "Switches a contact ON/OFF at your set point — alarm or trip without a separate switch.",
  },
  "test-gauges": {
    measures: "pressure",
    services: ["calibration"],
    why: "±0.5% FSD with a restricted nozzle, for checking the gauges on the plant.",
  },
  "precision-test-gauges": {
    measures: "pressure",
    services: ["calibration"],
    why: "±0.25% FSD — the reference instrument, with point-to-point certification.",
  },
  "capsule-gauge": {
    measures: "pressure",
    services: ["gaseous"],
    why: "A capsule element reads low gas pressures a bourdon tube cannot resolve.",
  },
  "diaphragm-sealed-gauges": {
    measures: "pressure",
    services: ["viscous", "corrosive", "hygienic"],
    why: "The seal keeps the medium out of the element entirely — the answer when a socket would block.",
  },
  "high-range-pressure-gauge": {
    measures: "pressure",
    services: ["high-pressure"],
    why: "Built for the top of the range, with UNF as well as BSP/NPT connections.",
  },
  "triclover-gauge": {
    measures: "pressure",
    services: ["hygienic"],
    why: "Tri-clamp connection, no crevice, strips down for cleaning.",
  },
  "light-duty-economy-gauge": {
    measures: "pressure",
    services: ["general"],
    why: "When the reading is indicative and the budget is the constraint.",
  },

  "bi-metal-thermometers": {
    measures: "temperature",
    services: ["general"],
    why: "−30 to 400 °C, no capillary, nothing to fill or leak.",
  },
  "all-angle-thermometers": {
    measures: "temperature",
    services: ["corrosive", "general"],
    why: "Rotates 360° on the stem — readable wherever the pocket had to go.",
  },
  "gas-in-metal-thermometers": {
    measures: "temperature",
    services: ["corrosive", "high-pressure"],
    why: "Reaches 650 °C and tolerates media a bi-metal element will not.",
  },
  "gas-with-contact-thermometers": {
    measures: "temperature",
    services: ["switching"],
    why: "Temperature measurement that also trips a contact at the set point.",
  },

  "pulsation-dampeners": {
    measures: "accessory",
    services: ["vibration"],
    why: "Fitted ahead of the gauge, it absorbs the surge that would flatten the element.",
  },
  "pressure-snubbers": {
    measures: "accessory",
    services: ["vibration"],
    why: "Three interchangeable pistons, self-cleaning, tuned to the line.",
  },
  "gauge-savers": {
    measures: "accessory",
    services: ["high-pressure", "vibration"],
    why: "Cuts off above a set pressure — the gauge survives the excursion.",
  },
  thermowells: {
    measures: "accessory",
    services: ["corrosive", "general"],
    why: "Lets the thermometer be pulled without breaking into the process.",
  },
  siphons: {
    measures: "accessory",
    services: ["general"],
    why: "A pigtail of condensate keeps steam off the bourdon tube.",
  },
  "needle-valves": {
    measures: "accessory",
    services: ["general"],
    why: "Isolate the gauge and throttle the fill without disturbing the line.",
  },
  "two-way-gauge-cock": {
    measures: "accessory",
    services: ["general"],
    why: "Isolate and vent in one fitting, so the gauge can be changed live.",
  },
  "cooling-tower": {
    measures: "accessory",
    services: ["general"],
    why: "Evaporative cooling for HVAC, power and process water circuits.",
  },
};

export type Match = { product: Product; score: number; why: string };

/**
 * Score every product against what the buyer told us. Exact service match is
 * worth more than a merely compatible one, and we never return zero results —
 * a buyer who matches nothing still gets the closest thing plus a route to ask.
 */
export function match(measures: Measures | null, services: Service[]): Match[] {
  const scored: Match[] = PRODUCTS.map((product) => {
    const rule = RULES[product.slug];
    if (!rule) return { product, score: 0, why: product.summary };

    let score = 0;
    if (measures && rule.measures === measures) score += 3;
    else if (measures) score -= 2;

    for (const s of services) {
      if (rule.services.includes(s)) score += s === "general" ? 1 : 2;
    }
    // A product that suits exactly one duty beats a generalist for that duty.
    if (services.length && rule.services.length <= 2) score += 0.5;

    return { product, score, why: rule.why };
  });

  return scored.sort((a, b) => b.score - a.score);
}
