export const SITE = {
  name: "3S Technology",
  tagline: "High accuracy instrumentation for extreme conditions",
  description:
    "Manufacturer of heavy-duty pressure and temperature gauges for tough and corrosive applications. EN 837-1, IS:3624 and ASME B40.200. Vasai, Maharashtra.",
  url: "https://3stechnology.in",
  gstin: "27BPMPB9077E1ZN",
  founded: "Vasai (East), Palghar, Maharashtra",

  phones: [
    { label: "Sales", number: "+91 70289 46617", raw: "917028946617" },
    { label: "Sales", number: "+91 70661 70530", raw: "917066170530" },
  ],
  whatsapp: "917028946617",

  emails: ["3stechnology2024@gmail.com", "threestechnology2024@gmail.com"],

  works: {
    label: "Works",
    lines: [
      "G-9, Rajtilak Indl Complex",
      "Opp. Buddhi Sagar, Chinchpada",
      "Vasai (East), Dist. Palghar — 401208",
      "Maharashtra, India",
    ],
  },
  office: {
    label: "Office",
    lines: [
      "A-wing, 705, Sterling Heights",
      "Yashwant Smart City, Madhuban",
      "Near Boxstreet, Vasai (East)",
      "Maharashtra, India",
    ],
  },

  hours: [
    { days: "Monday — Saturday", time: "9:00 AM – 6:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],

  standards: ["EN 837-1", "IS:3624", "ASME B40.200"],

  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1881.5317702067023!2d72.85274328946556!3d19.409660399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a946d0c21911%3A0x298b7bd5d4594483!2sChinchpada%20naka!5e0!3m2!1sen!2sin!4v1769010269310!5m2!1sen!2sin",
} as const;

export const INDUSTRIES = [
  {
    slug: "petrochemical",
    name: "Petrochemical",
    description:
      "Comprehensive instrumentation for refineries, chemical processing plants and petrochemical facilities.",
    applications: [
      "Process monitoring in refining operations",
      "Corrosive chemical handling",
      "High-pressure steam systems",
      "Catalyst reactors and distillation columns",
      "Storage tank pressure monitoring",
      "Pipeline pressure and temperature measurement",
    ],
  },
  {
    slug: "nuclear",
    name: "Nuclear",
    description:
      "Precision instruments meeting stringent safety and reliability requirements for nuclear power facilities.",
    applications: [
      "Reactor cooling system monitoring",
      "Containment pressure measurement",
      "Steam generator instrumentation",
      "Auxiliary system monitoring",
      "Safety-critical pressure measurement",
      "Radiation-resistant gauge options",
    ],
  },
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    description:
      "Robust gauges designed for offshore platforms, drilling operations and production facilities.",
    applications: [
      "Wellhead pressure monitoring",
      "Offshore platform instrumentation",
      "Pipeline monitoring systems",
      "Separator and tank instrumentation",
      "Drilling mud pressure measurement",
      "Production facility monitoring",
    ],
  },
  {
    slug: "machinery",
    name: "Machinery",
    description:
      "Reliable pressure and temperature measurement for manufacturing and heavy machinery operations.",
    applications: [
      "Hydraulic system monitoring",
      "Pneumatic equipment pressure control",
      "Compressor instrumentation",
      "Machine tool coolant systems",
      "Industrial pump monitoring",
      "Lubrication system pressure",
    ],
  },
  {
    slug: "power-stations",
    name: "Power Stations",
    description:
      "Critical instrumentation for thermal, combined cycle and co-generation power plants.",
    applications: [
      "Boiler pressure and temperature monitoring",
      "Steam turbine instrumentation",
      "Condenser vacuum measurement",
      "Feedwater system monitoring",
      "Auxiliary equipment pressure control",
      "Cooling tower instrumentation",
    ],
  },
] as const;

export const CAPABILITIES = [
  {
    title: "Corrosion resistance",
    body: "SS 316, Monel and Inconel wetted parts, and diaphragm seals for media that would eat a brass movement alive.",
  },
  {
    title: "High pressure capability",
    body: "Positive pressure ranges to 20,000 with solid-front cases and load-cycle stability that survives the duty.",
  },
  {
    title: "Temperature extremes",
    body: "−50 °C to 650 °C across bi-metal, gas-in-metal and all-angle thermometers, with thermowells to match.",
  },
  {
    title: "Vibration protection",
    body: "Glycerine and silicone-filled cases, pulsation dampeners and snubbers for pumps, compressors and hydraulics.",
  },
  {
    title: "Precision accuracy",
    body: "±0.25% FSD on precision test gauges, point-to-point calibration certificates on request.",
  },
  {
    title: "Safety compliance",
    body: "EN 837-1 design, IS:3624 and ASME B40.200 — solid front, blow-out back, IP 65 enclosure.",
  },
] as const;
