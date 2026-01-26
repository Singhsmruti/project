import { ArrowRight, Award, Shield, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import commercialpg from "./images/commercialpg.jpeg";
import bimetal from "./images/bimetal.png";
import FlangedThermowell from "src/images/FlangedThermowell.jpg";
export default function Home() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              High Accuracy Instrumentation for Extreme Conditions
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Precision pressure and temperature gauges engineered for tough and corrosive applications in demanding industrial environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
              >
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Heavy Duty Construction</h3>
              <p className="text-slate-600">
                Built to withstand the harshest industrial environments with superior durability and reliability.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">EN 837-1, IS:3624, ASME B40.200 Certified</h3>
              <p className="text-slate-600">
                All products meet international standards for accuracy and performance in critical applications.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gauge className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Corrosion Resistant</h3>
              <p className="text-slate-600">
                Specialized materials and coatings for exceptional performance in corrosive environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Product Range</h2>
            <p className="text-xl text-slate-600">
              Comprehensive instrumentation solutions for every industrial need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
  src= {commercialpg}
  alt="Pressure Gauges"
  className="h-100 w-full object-cover"
/>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pressure Gauges</h3>
                <p className="text-slate-600 mb-4">
                  Utility, stainless steel, process, test, and precision gauges for all pressure measurement needs. HSN CODE : 90262000.
                </p>
                <Link
                  to="/products"
                  className="text-blue-900 font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
  src= {bimetal}
  alt="Pressure Gauges"
  className="h-100 w-full object-cover"
/>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Temperature Gauges</h3>
                <p className="text-slate-600 mb-4">
                  Bi-metal, gas-filled, and all-angle thermometers for accurate temperature monitoring. HSN CODE : 90262000.
                </p>
                <Link
                  to="/products"
                  className="text-blue-900 font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
  src= {FlangedThermowell} 
  alt="Pressure Gauges"
  className="h-100 w-full object-cover"
/>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Accessories</h3>
                <p className="text-slate-600 mb-4">
                  Pulsation dampeners, snubbers, thermowells, and protective devices for optimal performance. HSN CODE : 90269000.
                </p>
                <Link
                  to="/products"
                  className="text-blue-900 font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Trusted by Industries Worldwide</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Serving petrochemical, nuclear, oil, machinery, and power station industries with reliable instrumentation solutions.
          </p>
          <Link
            to="/applications"
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            View Applications
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
