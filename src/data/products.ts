export type Category = "pressure" | "temperature" | "accessories";

export type Spec = { label: string; values: string[] };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  image: string;
  summary: string;
  hsn: string;
  specs: Spec[];
};

export const CATEGORIES: { key: Category; label: string; blurb: string; hsn: string }[] = [
  {
    key: "pressure",
    label: "Pressure Gauges",
    blurb:
      "Utility, stainless steel, process, test and precision gauges — 40 mm to 250 mm, ±0.25% to ±2.5% FSD.",
    hsn: "90262000",
  },
  {
    key: "temperature",
    label: "Temperature Gauges",
    blurb:
      "Bi-metal, gas-in-metal and all-angle thermometers — −50 °C to 650 °C, IP 55 to IP 65.",
    hsn: "90262000",
  },
  {
    key: "accessories",
    label: "Accessories",
    blurb:
      "Dampeners, snubbers, savers, thermowells, siphons and valves — everything that keeps a gauge alive.",
    hsn: "90269000",
  },
];

export const PRODUCTS: Product[] = [
  // ---------------------------------------------------------------- pressure
  {
    slug: "utility-commercial-gauges",
    name: "Utility (Commercial) Gauges",
    category: "pressure",
    image: "/products/commercialpg.webp",
    hsn: "90262000",
    summary:
      "General industrial applications such as compressors, pumps, boilers, hydraulic and pneumatic equipment.",
    specs: [
      { label: "Sizes", values: ["40, 50, 63, 80, 100, 150, 250 mm"] },
      { label: "Accuracy", values: ["±2.5% FSD"] },
      {
        label: "Pressure connection",
        values: [
          'NS 40,50: 1/8" BSP/NPT, 12mm flats',
          'NS 50,63: 1/8", 1/4" BSP/NPT, 14mm flats',
          'NS 80,100,150: 1/4", 3/8" BSP/NPT, 17mm sq',
          'NS 250: 3/8", 1/2" BSP/NPT, 22mm sq',
        ],
      },
      {
        label: "Mounting",
        values: [
          "Bottom or back mounting, back direct, Back mounting with Panel (3 hole), Back mounting with Bracket, Surface Mounting (80, 100, 150, 250mm only)",
        ],
      },
      {
        label: "Special versions",
        values: [
          "Refrigerant Gauges with flare connection, Oxygen/Acetylene Gauges, Ammonia Gauges, Special Dials (non-standard ranges, customer artwork)",
        ],
      },
      { label: "Also available", values: ["SS, Monel, Inconel, Hysteresis gauge"] },
    ],
  },
  {
    slug: "stainless-steel-case-liquid-fillable",
    name: "Stainless Steel Case (Liquid Fillable)",
    category: "pressure",
    image: "/products/ssliquidfillinf.webp",
    hsn: "90262000",
    summary:
      "For severe conditions with pulsation or vibration. Glycerine filling protects against vibrations.",
    specs: [
      { label: "Sizes", values: ["63, 100 and 150mm"] },
      { label: "Accuracy", values: ["±1.0-1.6% FSD"] },
      { label: "Enclosure protection", values: ["IP 55 and IP 65"] },
      {
        label: "Pressure connection",
        values: [
          "Bottom and Back",
          "Threaded entry",
          '63: 1/8", 1/4" BSP NPT, 14mm Flats',
          '100, 150mm: 1/4, 3/8, 1/2" BSP/NPT 22mm flats',
        ],
      },
      { label: "Mounting", values: ["Bottom or Back"] },
      {
        label: "Special versions",
        values: [
          "Other Pressure connections, 3-Hole surface mounting flange, With clamp or Panel (back entry only), SS 316 Case, Silicon Oil Fill",
        ],
      },
      { label: "Also available", values: ["SS, Monel, Inconel, Hysteresis gauge"] },
    ],
  },
  {
    slug: "solid-front-case-liquid-fillable",
    name: "Solid Front Case (Liquid Fillable)",
    category: "pressure",
    image: "/products/liquidfillinf.webp",
    hsn: "90262000",
    summary:
      "All stainless steel construction for chemical/petrochemical, power stations, mining and offshore applications.",
    specs: [
      { label: "Sizes", values: ["100 and 150mm"] },
      { label: "Design", values: ["EN 837-1"] },
      { label: "Accuracy", values: ["100, 150mm: ±1.0% FSD"] },
      { label: "Enclosure protection", values: ["IP 65"] },
      {
        label: "Pressure connection",
        values: ["Bottom", "Threaded entry", '100, 150mm: 1/4, 1/2" BSP/NPT 22mm'],
      },
      { label: "Mounting", values: ["Bottom or Back Mounting"] },
      {
        label: "Special features",
        values: [
          "Solid-front stainless steel case",
          "Excellent load-cycle stability and shock resistance",
          "All stainless steel construction",
          "Positive pressure ranges to 20,000",
        ],
      },
      { label: "Special versions", values: ["Other Pressure connections"] },
    ],
  },
  {
    slug: "differential-gauges",
    name: "Differential Gauges (Bellotype, Chamber, Magnetic)",
    category: "pressure",
    image: "/products/magneticdifferetialpg.webp",
    hsn: "90262000",
    summary:
      "For gases and liquid media, filter control systems and differential flow measurement.",
    specs: [
      { label: "Sizes", values: ['63, 100, 115 (4 1/2") and 150mm'] },
      { label: "Accuracy", values: ["±2.0% FSD"] },
      { label: "Over-range protection", values: ["6000 PSI"] },
      { label: "Enclosure protection", values: ["IP 65"] },
      {
        label: "Pressure connection",
        values: ['Direct or inline 1/4" NPT', '1/4", 1/2" BSP/NPT'],
      },
      { label: "Mounting", values: ["Bottom, inline"] },
      {
        label: "Special versions",
        values: [
          "Maximum Pointer, Back connection, Reed Switch, Other equivalent units available",
        ],
      },
    ],
  },
  {
    slug: "process-gauges",
    name: "Process Gauges",
    category: "pressure",
    image: "/products/processgauge.webp",
    hsn: "90262000",
    summary:
      "Heavy duty construction for tough and corrosive applications in process, power and nuclear industries.",
    specs: [
      { label: "Size", values: ['115mm (4.5")'] },
      { label: "Accuracy", values: ["±1.0% FSD"] },
      { label: "Enclosure protection", values: ["IP 65"] },
      { label: "Pressure connection", values: ['1/4", 1/2" BSP/NPT Bottom'] },
      { label: "Mounting", values: ["Bottom"] },
      { label: "Threaded entry", values: ['1/4", 1/2" BSP/NPT'] },
      { label: "Special version", values: ["Special Liquid Filling"] },
      { label: "Also available", values: ["SS, Monel, Inconel, Hysteresis gauge"] },
    ],
  },
  {
    slug: "contact-gauges",
    name: "Contact Gauges",
    category: "pressure",
    image: "/products/contactgauge.webp",
    hsn: "90262000",
    summary:
      "Measurement and control of pressure by switching electrical contacts ON/OFF.",
    specs: [
      { label: "Sizes", values: ['115mm (4 1/2")'] },
      { label: "Accuracy", values: ["±1.0% FSD"] },
      { label: "Pressure connection", values: ['1/4", 1/2" BSP/NPT'] },
      { label: "Threaded entry", values: ['1/4", 1/2" BSP/NPT'] },
      { label: "Mounting", values: ["Bottom"] },
      { label: "Special versions", values: ["Special Liquid Filling"] },
    ],
  },
  {
    slug: "test-gauges",
    name: "Test Gauges",
    category: "pressure",
    image: "/products/testgauge.webp",
    hsn: "90262000",
    summary:
      "For laboratories and industries for pressure gauge testing and calibration.",
    specs: [
      { label: "Sizes", values: ["150, 200 and 250mm"] },
      { label: "Accuracy", values: ["±0.5% FSD"] },
      {
        label: "Pressure connection",
        values: [
          "Bottom and Back",
          "Threaded entry with restricted nozzle",
          '1/2" BSP/NPT 22mm square',
        ],
      },
      { label: "Mounting", values: ["Bottom or Back Mounting"] },
      {
        label: "Special versions",
        values: [
          "Other Pressure connections, Point to Point Calibration Certificate, 3-Hole surface or panel mounting flange",
        ],
      },
    ],
  },
  {
    slug: "precision-test-gauges",
    name: "Precision Test Gauges",
    category: "pressure",
    image: "/products/precisiontest.webp",
    hsn: "90262000",
    summary: "Highest accuracy for laboratory measurement and calibration.",
    specs: [
      { label: "Sizes", values: ["150-200mm"] },
      { label: "Accuracy", values: ["±0.25% FSD"] },
      {
        label: "Pressure connection",
        values: [
          "Bottom and Back",
          "Threaded entry with restricted nozzle",
          '1/2" BSP/NPT 22mm flats',
        ],
      },
      { label: "Mounting", values: ["Bottom or Back Mounting"] },
      {
        label: "Special versions",
        values: [
          "Other Pressure connections, Point to Point Calibration Certificate, 3-Hole surface or panel mounting flange, Flush panel mounting with clamp",
        ],
      },
    ],
  },
  {
    slug: "capsule-gauge",
    name: "Capsule Gauge",
    category: "pressure",
    image: "/products/capsulepg.webp",
    hsn: "90262000",
    summary:
      "Suitable for dry and gaseous media that will not react with copper alloy parts.",
    specs: [
      { label: "Sizes", values: ["63, 100 and 160mm"] },
      { label: "Accuracy", values: ["±2.0% FSD"] },
      {
        label: "Pressure connection",
        values: [
          "Bottom and Back",
          "Threaded entry",
          '63: 1/4" BSP / NPT, 14mm flats',
          '100,150mm: 3/8", 1/2" BSP/NPT 17/22mm',
        ],
      },
      { label: "Mounting", values: ["Bottom or Back Mounting"] },
      {
        label: "Special versions",
        values: [
          "Other Pressure connections, 100/160mm: Panel or surface mounting rings, 100/160mm: Clamp/Panel or surface mounting",
        ],
      },
    ],
  },
  {
    slug: "diaphragm-sealed-gauges",
    name: "Diaphragm & Diaphragm Sealed Gauges, Flush Type Diaphragm",
    category: "pressure",
    image: "/products/diaphragmseal.webp",
    hsn: "90262000",
    summary:
      "For corrosive, viscous or crystallizing media where standard connections cannot be used.",
    specs: [
      { label: "Sizes", values: ['53 and 63mm (4 1/2")'] },
      { label: "Accuracy", values: ["±1.6 - 2% FSD"] },
      { label: "Pressure connection", values: ['3/8", 1/2" BSP/NPT 22mm bottom'] },
      { label: "Mounting", values: ["Bottom and back"] },
    ],
  },
  {
    slug: "high-range-pressure-gauge",
    name: "High Range Pressure Gauge",
    category: "pressure",
    image: "/products/hrpg001.webp",
    hsn: "90262000",
    summary:
      "Accurate measurement of very high pressures in heavy-duty industrial applications.",
    specs: [
      { label: "Sizes", values: ["100mm and 150mm"] },
      { label: "Accuracy", values: ["±1.0% FSD"] },
      {
        label: "Pressure connection",
        values: [
          '3/8", 1/2" BSP/NPT bottom and back',
          "9/16-18 UNF female and 9/16-18 UNF male",
        ],
      },
      { label: "Mounting", values: ["Bottom"] },
      { label: "Also available in", values: ["Medium and high pressure range"] },
    ],
  },
  {
    slug: "triclover-gauge",
    name: "Triclover Gauge",
    category: "pressure",
    image: "/products/ricloverguage.webp",
    hsn: "90262000",
    summary:
      "Measures pressure in hygienic and sanitary process applications, where easy cleaning, quick installation and contamination-free operation are required.",
    specs: [
      { label: "Sizes", values: ['115mm (1/2")'] },
      { label: "Connection type", values: ["BSP"] },
      {
        label: "Applications",
        values: ["Food, beverage, pharmaceutical and biotech industries"],
      },
    ],
  },
  {
    slug: "light-duty-economy-gauge",
    name: "Light Duty Pressure Gauge (Economy)",
    category: "pressure",
    image: "/products/economy.webp",
    hsn: "90262000",
    summary:
      "Designed for basic pressure measurement in general industrial and non-critical applications where high accuracy is not required.",
    specs: [
      { label: "Sizes", values: ["100mm"] },
      { label: "Connection type", values: ['4" 1/4", 3/8", 1/2" BSP/NPT'] },
      { label: "Construction", values: ["Complete SS or SS brass"] },
    ],
  },

  // ------------------------------------------------------------- temperature
  {
    slug: "bi-metal-thermometers",
    name: "Bi-Metal Thermometers",
    category: "temperature",
    image: "/products/bimetal.webp",
    hsn: "90262000",
    summary:
      "For engineering plant, machinery, piping, pressure vessels and industrial heating.",
    specs: [
      { label: "Sizes", values: ["63, 100, 115 and 150mm"] },
      { label: "Range", values: ["−30 °C to 400 °C"] },
      { label: "Accuracy class", values: ["±2.0% FSD"] },
      { label: "Enclosure protection", values: ["IP 56"] },
      { label: "Location of stem", values: ["Centre Back / 6mm, 8mm, 10mm"] },
      {
        label: "Pressure connection",
        values: ['1/4", 3/8", 1/2" BSP/NPT', "Fix / Adjustable"],
      },
      { label: "Mounting", values: ["Bottom or Back Mounting"] },
      {
        label: "Special versions",
        values: [
          "Surface Mounting, Panel Mounting, Bracket Mounting, with Distance Capillary Alarm Contact Zero, External Zero Adjustment",
        ],
      },
    ],
  },
  {
    slug: "all-angle-thermometers",
    name: "All Angle Thermometers",
    category: "temperature",
    image: "/products/allangle.webp",
    hsn: "90262000",
    summary:
      "For corrosive medium and chemical environments, with 360° rotation capability.",
    specs: [
      { label: "Sizes", values: ["63, 100, 115 and 150mm"] },
      { label: "Range", values: ["−30 °C to 400 °C"] },
      { label: "Accuracy", values: ["±1.0% FSD"] },
      { label: "Enclosure protection", values: ["IP 55 to IP 65"] },
      { label: "Stem dia", values: ["6mm, 8mm, 10mm"] },
      {
        label: "Pressure connection",
        values: ['1/4", 3/8", 1/2" BSP/NPT', "Fix / Adjustable"],
      },
      { label: "Mounting", values: ["Rotatable on stem, 360° at every angle"] },
      {
        label: "Special versions",
        values: [
          "Surface Mounting, Panel Mounting, Bracket Mounting, with Distance Capillary Alarm Contact Zero, Adjustment on Dial, External Zero Adjustment",
        ],
      },
    ],
  },
  {
    slug: "gas-in-metal-thermometers",
    name: "Gas in Metal Thermometers",
    category: "temperature",
    image: "/products/mnginmetal.webp",
    hsn: "90262000",
    summary: "For corrosive medium and higher temperature measurements.",
    specs: [
      { label: "Sizes", values: ["63, 100, 115 and 150mm"] },
      { label: "Range", values: ["−50 °C to 650 °C"] },
      { label: "Accuracy", values: ["±1.0% FSD"] },
      { label: "Stem dia", values: ["6mm, 8mm, 10mm"] },
      {
        label: "Pressure connection",
        values: ['1/4", 3/8", 1/2" BSP/NPT', "Fix / Adjustable"],
      },
      { label: "Mounting", values: ["Bottom or Back Mounting"] },
      { label: "Enclosure protection", values: ["IP 56"] },
      {
        label: "Special versions",
        values: [
          "Surface Mounting, Panel Mounting, Bracket Mounting, with Distance Capillary Alarm Contact Zero, Adjustment on Dial, External Zero Adjustment",
        ],
      },
    ],
  },
  {
    slug: "gas-with-contact-thermometers",
    name: "Gas with Contact Thermometers",
    category: "temperature",
    image: "/products/mngcontact.webp",
    hsn: "90262000",
    summary: "Temperature measurement with electrical contact switching capability.",
    specs: [
      { label: "Sizes", values: ["63, 100, 115 and 150mm"] },
      { label: "Range", values: ["−50 °C to 650 °C"] },
      { label: "Accuracy", values: ["±2.0% FSD"] },
      { label: "Stem dia", values: ["6mm, 8mm, 10mm"] },
      {
        label: "Pressure connection",
        values: ['1/4", 3/8", 1/2" BSP/NPT', "Fix / Adjustable"],
      },
      { label: "Mounting", values: ["Bottom or Back Mounting"] },
      { label: "Enclosure protection", values: ["IP 56"] },
      {
        label: "Special versions",
        values: [
          "Surface Mounting, Panel Mounting, Bracket Mounting, with Distance Capillary Alarm Contact Zero, Adjustment on Dial, External Zero Adjustment",
        ],
      },
    ],
  },

  // ------------------------------------------------------------- accessories
  {
    slug: "pulsation-dampeners",
    name: "Pulsation Dampeners",
    category: "accessories",
    image: "/products/pulsationdampner.webp",
    hsn: "90269000",
    summary:
      "Protects gauges from rapid pressure fluctuations and sudden surge pressure.",
    specs: [
      {
        label: "Features",
        values: [
          "Compact design",
          "Automatic positive action",
          "In-line installation",
          "Can be used as shut-off valve",
        ],
      },
    ],
  },
  {
    slug: "pressure-snubbers",
    name: "Pressure Snubbers",
    category: "accessories",
    image: "/products/pressuresnubber.webp",
    hsn: "90269000",
    summary: "Saves instruments from severe line pulsations and pressure surges.",
    specs: [
      {
        label: "Features",
        values: [
          "Three interchangeable pistons",
          "Self-cleaning design",
          "Various materials available",
          "Adjustable dampening",
        ],
      },
    ],
  },
  {
    slug: "gauge-savers",
    name: "Gauge Savers",
    category: "accessories",
    image: "/products/gaugesaver.webp",
    hsn: "90269000",
    summary:
      "Over-load protector that cuts off pressure rises above a desired value.",
    specs: [
      {
        label: "Features",
        values: [
          "Automatic cut-off",
          "Adjustable set pressure",
          "±10% accuracy",
          "Push-rod signaling",
        ],
      },
    ],
  },
  {
    slug: "thermowells",
    name: "Thermowells",
    category: "accessories",
    image: "/products/thermowell.webp",
    hsn: "90269000",
    summary: "Provides isolation for temperature gauges from the wetted material.",
    specs: [
      {
        label: "Features",
        values: [
          "SS 304/316/Brass/PVC",
          "Threaded or flanged",
          "Easy gauge replacement",
          "Various lengths available",
        ],
      },
    ],
  },
  {
    slug: "siphons",
    name: "Siphons",
    category: "accessories",
    image: "/products/suphon.webp",
    hsn: "90269000",
    summary: "Protects pressure gauges from high temperature media.",
    specs: [
      {
        label: "Features",
        values: [
          "Cooling effect",
          "Various configurations",
          "Standard and custom designs",
          "Multiple materials",
        ],
      },
    ],
  },
  {
    slug: "needle-valves",
    name: "Needle Valves",
    category: "accessories",
    image: "/products/needlevalve.webp",
    hsn: "90269000",
    summary: "Precise flow control and gauge isolation.",
    specs: [
      {
        label: "Features",
        values: [
          "Fine adjustment",
          "Multiple connection sizes",
          "Durable construction",
          "Easy operation",
        ],
      },
    ],
  },
  {
    slug: "two-way-gauge-cock",
    name: "2-Way Gauge Cock",
    category: "accessories",
    image: "/products/twowaygaugecock.webp",
    hsn: "90269000",
    summary:
      "Isolate or vent a pressure gauge from the process line — safe pressure release, gauge protection and maintenance without disturbing the process.",
    specs: [
      {
        label: "Features",
        values: [
          "Gauge isolation",
          "Pressure venting",
          "Surge protection",
          "Easy maintenance",
        ],
      },
    ],
  },
  {
    slug: "cooling-tower",
    name: "Cooling Tower",
    category: "accessories",
    image: "/products/coolingtower.webp",
    hsn: "90269000",
    summary:
      "Removes heat from water by evaporative cooling — HVAC, power plants and industrial processes.",
    specs: [
      {
        label: "Features",
        values: [
          "Heat dissipation",
          "Evaporative cooling",
          "Water recirculation",
          "Energy efficient",
        ],
      },
    ],
  },
];

export function bySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function byCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

/** The searchable text of a product — name, summary and every spec value. */
export function haystack(p: Product): string {
  return [p.name, p.summary, ...p.specs.flatMap((s) => [s.label, ...s.values])]
    .join(" ")
    .toLowerCase();
}

/** Pull a single spec value out for the card rail, e.g. "Accuracy". */
export function spec(p: Product, label: string): string | undefined {
  const hit = p.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
  return hit?.values[0];
}
