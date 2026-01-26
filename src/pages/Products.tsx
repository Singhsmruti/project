import { useState } from 'react';
import { ChevronDown, ChevronUp, Image } from 'lucide-react';
import commercialpg from  './images/commercialpg.jpeg';
import ssliquidfillinf from  './images/ssliquidfillinf.png' ;
import magneticdifferetialpg from './images/magneticdifferetialpg.png';
import  processgauge from './images/processgauge.png';
import contactgauge from './images/contactgauge.png';
import testgauge from './images/testgauge.png';
import precisiontest from './images/precisiontest.png';
import capsulepg from './images/capsulepg.jpeg';
import diaphragmseal from './images/diaphragmseal.png';
import hrpg001 from './images/hrpg001.jpeg';
import ricloverguage from './images/ricloverguage.png';
import economy from './images/economy.png';
import bimetal from './images/bimetal.png';
import allangle from './images/allangle.png';
import mnginmetal from './images/mnginmetal.png';
import mngcontact from './images/mngcontact.webp';
import pulsationdampner from './images/pulsationdampner.jpeg';
import PressureSnubber from './images/PressureSnubber.jpg';
import gaugesaver from './images/gaugesaver.jpg';
import Thermowell from './images/Thermowell.jpg';
import suphon from './images/suphon.webp';
import needlevalve from './images/needlevalve.webp';
import twowaygaugecock from './images/twowaygaugecock.jpg';
import coolingtower from './images/coolingtower.jpg';
type ProductCategory = 'pressure' | 'temperature' | 'accessories';

interface Product {
  name: string;
  description: string;
  image?: string;
  features: (string | { [key: string]: string[] })[];
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('pressure');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const pressureGauges: Product[] = [
    {
      name: 'Utility (Commercial) Gauges',
      description: 'General industrial applications such as compressors, pumps, boilers, hydraulic and pneumatic equipment.',
      image: commercialpg,
      features: [
        'Sizes: 40, 50, 63, 80, 100, 150, 250 mm',
        'Accuracy: ±2.5% FSD',
        {
          "Pressure connection": [
            'NS 40,50: 1/8" BSP/NPT, 12mm flats',
            'NS 50,63: 1/8", 1/4" BSP/NPT, 14mm flats',
            'NS 80,100,150: 1/4", 3/8" BSP/NPT, 17mm sq',
            'NS 250: 3/8", 1/2" BSP/NPT, 22mm sq'
          ]
        },
        'Mounting: Bottom or back mounting, back direct, Back mounting with Panel (3 hole), Back mounting with Bracket, Surface Mounting (80, 100, 150, 250mm only)',
        'Special Versions: Refrigerant Gauges with flare connection, Oxygen/Acetylene Gauges, Ammonia Gauges, Special Dials (non-standard ranges, customer artwork)',
        'Also available: SS, Monel, Inconel, Hysteresis gauge'
      ]
    },
    {
      name: 'Stainless Steel Case (Liquid Fillable)',
      description: 'For severe conditions with pulsation or vibration. Glycerine filling protects against vibrations.',
      image: ssliquidfillinf,
      features: [
        'Sizes: 63, 100 and 150mm',
        'Accuracy: ±1.0-1.6% FSD',
        'Enclosure Protection: IP 55 and IP 65',
        {
          "Pressure connection": [
            'Bottom and Back',
            'Threaded entry',
            '63: 1/8", 1/4" BSP NPT, 14mm Flats',
            '100, 150mm: 1/4, 3/8, 1/2" BSP/NPT 22mm flats'
          ]
        },
        'Mounting: Bottom or Back',
        'Special versions: Other Pressure connections, 3-Hole surface mounting flange, With clamp or Panel (back entry only), SS 316 Case, Silicon Oil Fill',
        'Also available: SS, Monel, Inconel, Hysteresis gauge'
      ]
    },
    {
      name: 'Solid Front Case (Liquid Fillable)',
      description: 'All stainless steel construction for chemical/petrochemical, power stations, mining, offshore applications.',
      image: ssliquidfillinf,
      features: [
        'Sizes: 100 and 150mm',
        'EN 837-1 Design',
        'Accuracy: 100, 150mm: ±1.0% FSD',
        'Enclosure Protection: IP 65',
        {
          "Pressure connection": [
            'Bottom',
            'Threaded entry',
            '100, 150mm: 1/4, 1/2" BSP/NPT 22mm'
          ]
        },
        'Mounting: Bottom or Back Mounting',
        'Special Features: Solid-front stainless steel case, Excellent load-cycle stability and shock resistance, All stainless steel construction, Positive pressure ranges to 20,000',
        'Special version: Other Pressure connections'
      ]
    },
    {
      name: 'Differential Gauges (Bellotype, Chamber, Magnetic)',
      description: 'For gases and Liquid media, filter control system and differential flow measurement.',
      image: magneticdifferetialpg,
      features: [
        'Sizes: 63, 100, 115 (4 1/2") and 150mm',
        'Accuracy: ±2.0% FSD',
        'Over-Range Protection: 6000PSI',
        'Enclosure Protection: IP 65',
        {
          "Pressure connection": [
            'Direct or inline 1/4" NPT',
            '1/4", 1/2" BSP/NPT'
          ]
        },
        'Mounting: Bottom, inline',
        'Special Versions: Maximum Pointer, Back connection, Reed Switch, Other Equivalent Units are available'
      ]
    },
    {
      name: 'Process Gauges',
      description: 'Heavy duty construction for tough and corrosive applications in industries, process, power, and nuclear.',
      image: processgauge,
      features: [
        'Size: 115mm (4.5")',
        'Accuracy: ±1.0% FSD',
        'Enclosure Protection: IP 65',
        {
          "Pressure connection": [
            '1/4", 1/2" BSP/NPT Bottom'
          ]
        },
        'Mounting: Bottom',
        'Threaded Entry: 1/4", 1/2" BSP/NPT',
        'Special Version: Special Liquid Filling',
        'Also available: SS, Monel, Inconel, Hysteresis gauge'
      ]
    },
    {
      name: 'Contact Gauges',
      description: 'Measurement and control of pressure by switching electrical contacts ON/OFF.',
      image: contactgauge,
      features: [
        'Sizes: 115mm (4 1/2")',
        'Accuracy: ±1.0% FSD',
        {
          "Pressure connection": [
            '1/4", 1/2" BSP/NPT'
          ]
        },
        'Threaded Entry: 1/4", 1/2" BSP/NPT',
        'Mounting: Bottom',
        'Special Versions: Special Liquid Filling'
      ]
    },
    {
      name: 'Test Gauges',
      description: 'For laboratories and industries for pressure gauge testing and calibration.',
      image: testgauge,
      features: [
        'Sizes: 150, 200 and 250mm',
        'Accuracy: ±0.5% FSD',
        {
          "Pressure connection": [
            'Bottom and Back',
            'Threaded Entry with restricted nozzle',
            '1/2" BSP/NPT 22mm square'
          ]
        },
        'Mounting: Bottom or Back Mounting',
        'Special Versions: Other Pressure connections, Point to Point Calibration Certificate, 3-Hole surface or panel mounting flange'
      ]
    },
    {
      name: 'Precision Test Gauges',
      description: 'Highest accuracy for laboratory measurement and calibration.',
      image: precisiontest,
      features: [
        'Sizes: 150-200mm',
        'Accuracy: ±0.25% FSD',
        {
          "Pressure connection": [
            'Bottom and Back',
            'Threaded Entry with restricted nozzle',
            '1/2" BSP/NPT 22mm flats'
          ]
        },
        'Mounting: Bottom or Back Mounting',
        'Special Versions: Other Pressure connections, Point to Point Calibration Certificate, 3-Hole surface or panel mounting flange, Flush panel mounting with clamp'
      ]
    },
    {
      name: 'Capsule gauge',
      description: 'suitable for dry and gaseous media that will not react with copper alloy parts.',
      image: capsulepg,
      features: [
        'Sizes: 63, 100 and 160mm',
        'Accuracy: ±02.0% FSD',
        {
          "Pressure connection": [
            'Bottom and Back',
            'Threaded Entry ',
            '63: 1/4" BSP / NPT, 14mm flats',
            '100,150mm:3/8",1/2" BSP/NPT 17/22mm'
          ]
        },
        'Mounting: Bottom or Back Mounting',
        'Special Versions: Other Pressure connections, 100/160mm: Panel or surface mouting rigns, 100/160mm: Clamp/Panel or surface mounting'
      ]
    },
    {
      name: 'Diaphragm & Diaphragm Sealed Gauges & Flush type diaphragm',
      description: 'For corrosive, viscous, or crystallizing media where standard connections cannot be used.',
      image: diaphragmseal,
      features: [
        'Sizes: 53 and 63mm (4 1/2")',
        'Accuracy: ±1.6 - 2% FSD',
        {
          "Pressure connection": [
            '3/8", 1/2" BSP/NPT 22mm bottom'
          ]
        },
        'Mounting: Bottom and back'
      ]
    },
    {
      name: 'High Range Pressure Gauge',
      description: 'Accurate measurement of very high pressures in heavy-duty industrial applications.',
      image: hrpg001,
      features: [
        'Sizes: 100mm and 150mm',
        'Accuracy: ±1.0% FSD',
        {
          "Pressure connection": [
            '3/8", 1/2" BSP/NPT bottom and back',
            '9/16-18 unf female and 9/16-18 unf male'
          ]
        },
        'Mounting: Bottom',
        'Also available in: Medium and high pressure range'
      ]
    },
    {
      name: 'Triclover Gauge',
      description: 'Measure pressure in hygienic and sanitary process applications, where easy cleaning, quick installation, and contamination-free operation are required.',
      image: ricloverguage,
      features: [
        'Sizes: 115mm (1/2")',
        'Connection type: BSP',
        'Applications: Food, beverage, pharmaceutical, and biotech industries'
      ]
    },
    {
      name: 'Light duty pressure gauge (Economy)',
      description: 'Designed for basic pressure measurement in general industrial and non-critical applications where high accuracy is not required.',
      image: economy,
      features: [
        'Sizes: 100mm',
        'Connection type: 4" 1/4", 3/8", 1/2" bsp/npt',
        'Complete ss or ss brass'
      ]
    }
  ];

  const temperatureGauges: Product[] = [
    {
      name: 'Bi-Metal Thermometers',
      description: 'For engineering plant, machinery, piping, pressure vessels and industrial heating.',
      image: bimetal,
      features: [
        'Sizes: 63, 100, 115 and 150mm',
        'Range: -30°C to 400°C',
        'Accuracy Class: ±2.0% FSD',
        'IP 56 Protection',
        'Location of Stem: Centre Back / 6mm, 8mm, 10mm',
        {
          "Pressure connection": [
            '1/4", 3/8", 1/2" BSP/NPT',
            'Fix / Adjustable'
          ]
        },
        'Mounting: Bottom or Back Mounting',
        'Weather Protection: IP 56',
        'Special Versions: Surface Mounting, Panel Mounting, Bracket Mounting, with Distance Capillary Alarm Contact Zero, External Zero Adjustment'
      ]
    },
    {
      name: 'All Angle Thermometers',
      description: 'For corrosive medium and chemical environments with 360° rotation capability.',
      image: allangle,
      features: [
        'Sizes: 63, 100, 115 and 150mm',
        'Range: -30°C to 400°C',
        'Accuracy: ±1.0% FSD',
        'IP 55-65 Protection',
        'Stem Dia: 6mm, 8mm, 10mm',
        {
          "Pressure connection": [
            '1/4", 3/8", 1/2" BSP/NPT',
            'Fix / Adjustable'
          ]
        },
        'Mounting: Rotatable on stem 360° at every angle',
        'Weather Protection: IP 55 to IP 65',
        'Special Versions: Surface Mounting, Panel Mounting, Bracket Mounting, with Distance Capillary Alarm Contact Zero, Adjustment on Dial, External Zero Adjustment'
      ]
    },
    {
      name: 'Gas in Metal Thermometers',
      description: 'For corrosive medium and higher temperature measurements.',
      image: mnginmetal,
      features: [
        'Sizes: 63, 100, 115 and 150mm',
        'Range: -50°C to 650°C',
        'Accuracy: ±1.0% FSD',
        'Stem Dia: 6mm, 8mm, 10mm',
        {
          "Pressure connection": [
            '1/4", 3/8", 1/2" BSP/NPT',
            'Fix / Adjustable'
          ]
        },
        'Mounting: Bottom or Back Mounting',
        'Weather Protection: IP 56',
        'Special Versions: Surface Mounting, Panel Mounting, Bracket Mounting, with Distance Capillary Alarm Contact Zero, Adjustment on Dial, External Zero Adjustment'
      ]
    },
    {
      name: 'Gas with Contact Thermometers',
      description: 'Temperature measurement with electrical contact switching capability.',
      image: mngcontact,
      features: [
        'Sizes: 63, 100, 115 and 150mm',
        'Range: -50°C to 650°C',
        'Accuracy: ±2.0% FSD',
        'Stem Dia: 6mm, 8mm, 10mm',
        {
          "Pressure connection": [
            '1/4", 3/8", 1/2" BSP/NPT',
            'Fix / Adjustable'
          ]
        },
        'Mounting: Bottom or Back Mounting',
        'Weather Protection: IP 56',
        'Special Versions: Surface Mounting, Panel Mounting, Bracket Mounting, with Distance Capillary Alarm Contact Zero, Adjustment on Dial, External Zero Adjustment'
      ]
    }
  ];

  const accessories: Product[] = [
    {
      name: 'Pulsation Dampeners',
      description: 'Protects gauges from rapid pressure fluctuations and sudden surge pressure.',
      image: pulsationdampner,
      features: [
        'Compact design',
        'Automatic positive action',
        'In-line installation',
        'Can be used as shut-off valve'
      ]
    },
    {
      name: 'Pressure Snubbers',
      description: 'Saves instruments from severe line pulsations and pressure surges.',
      image: PressureSnubber,
      features: [
        'Three interchangeable pistons',
        'Self-cleaning design',
        'Various materials available',
        'Adjustable dampening'
      ]
    },
    {
      name: 'Gauge Savers',
      description: 'Over-load protector that cuts off pressure rises above desired value.',
      image: gaugesaver,
      features: [
        'Automatic cut-off',
        'Adjustable set pressure',
        '±10% accuracy',
        'Push-rod signaling'
      ]
    },
    {
      name: 'Thermowells',
      description: 'Provides isolation for temperature gauges from wetted material.',
      image: Thermowell,
      features: [
        'SS 304/316/Brass/PVC',
        'Threaded or flanged',
        'Easy gauge replacement',
        'Various lengths available'
      ]
    },
    {
      name: 'Siphons',
      description: 'Protects pressure gauges from high temperature media.',
      image: suphon,
      features: [
        'Cooling effect',
        'Various configurations',
        'Standard and custom designs',
        'Multiple materials'
      ]
    },
    {
      name: 'Needle Valves',
      description: 'Precise flow control and gauge isolation.',
      image: needlevalve,
      features: [
        'Fine adjustment',
        'Multiple connection sizes',
        'Durable construction',
        'Easy operation'
      ]
    },
    {
      name: '2WayGauge Cock',
      description: 'Isolate or vent a pressure gauge from the process line, allowing safe pressure release, gauge protection, and maintenance without disturbing the process.',
      image: twowaygaugecock,
      features: [
        'Gauge isolation',
        'Pressure venting',
        'Surge protection',
        'Easy maintenance'
      ]
    },
    {
      name: 'CoolingTower',
      description: 'Remove heat from water by evaporative cooling, commonly in HVAC, power plants, and industrial processes.',
      image: coolingtower,
      features: [
        'Heat dissipation',
        'Evaporative cooling',
        'Water recirculation',
        'Energy efficient'
      ]
    }
  ];

  const renderFeature = (feature: string | { [key: string]: string[] }, idx: number) => {
    if (typeof feature === 'string') {
      return (
        <li key={idx} className="flex items-start">
          <span className="text-blue-900 mr-2 mt-1">•</span>
          <span className="text-slate-700">{feature}</span>
        </li>
      );
    } else {
      const [key, values] = Object.entries(feature)[0];
      return (
        <li key={idx} className="flex items-start col-span-full">
          <span className="text-blue-900 mr-2 mt-1">•</span>
          <div>
            <span className="font-semibold text-slate-800">{key}:</span>
            <ul className="ml-4 mt-1 space-y-1">
              {values.map((value, vidx) => (
                <li key={vidx} className="flex items-start">
                  <span className="text-blue-700 mr-2">◦</span>
                  <span className="text-slate-600">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      );
    }
  };

  const renderProductList = (products: Product[]) => (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.name} className="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => setExpandedProduct(expandedProduct === product.name ? null : product.name)}
            className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <Image className={`h-8 w-8 text-slate-400 ${product.image ? 'hidden' : ''}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
                <p className="text-slate-600 mt-1">{product.description}</p>
              </div>
            </div>
            {expandedProduct === product.name ? (
              <ChevronUp className="h-6 w-6 text-blue-900 flex-shrink-0 ml-4" />
            ) : (
              <ChevronDown className="h-6 w-6 text-blue-900 flex-shrink-0 ml-4" />
            )}
          </button>
          {expandedProduct === product.name && (
            <div className="px-6 pb-6 bg-slate-50">
              <div className="mb-4">
                <div className="w-full h-64 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`text-center ${product.image ? 'hidden' : ''}`}>
                    <Image className="h-16 w-16 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">Product image</p>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-slate-900 mb-3 text-lg">Key Features:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => renderFeature(feature, idx))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comprehensive range of precision instruments for all measurement needs
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('pressure')}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                activeCategory === 'pressure'
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Pressure Gauges
            </button>
            <button
              onClick={() => setActiveCategory('temperature')}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                activeCategory === 'temperature'
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Temperature Gauges
            </button>
            <button
              onClick={() => setActiveCategory('accessories')}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                activeCategory === 'accessories'
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Accessories
            </button>
          </div>

          {activeCategory === 'pressure' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Pressure Gauges</h2>
              {renderProductList(pressureGauges)}
            </div>
          )}

          {activeCategory === 'temperature' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Temperature Gauges</h2>
              {renderProductList(temperatureGauges)}
            </div>
          )}

          {activeCategory === 'accessories' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Accessories</h2>
              {renderProductList(accessories)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

