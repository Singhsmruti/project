import { Factory, Zap, Droplet, Cog, Flame } from 'lucide-react';

export default function Applications() {
  const industries = [
    {
      name: 'Petrochemical',
      icon: Flame,
      description: 'Comprehensive instrumentation solutions for refineries, chemical processing plants, and petrochemical facilities.',
      applications: [
        'Process monitoring in refining operations',
        'Corrosive chemical handling',
        'High-pressure steam systems',
        'Catalyst reactors and distillation columns',
        'Storage tank pressure monitoring',
        'Pipeline pressure and temperature measurement'
      ]
    },
    {
      name: 'Nuclear',
      icon: Zap,
      description: 'Precision instruments meeting stringent safety and reliability requirements for nuclear power facilities.',
      applications: [
        'Reactor cooling system monitoring',
        'Containment pressure measurement',
        'Steam generator instrumentation',
        'Auxiliary system monitoring',
        'Safety-critical pressure measurement',
        'Radiation-resistant gauge options'
      ]
    },
    {
      name: 'Oil & Gas',
      icon: Droplet,
      description: 'Robust gauges designed for offshore platforms, drilling operations, and production facilities.',
      applications: [
        'Wellhead pressure monitoring',
        'Offshore platform instrumentation',
        'Pipeline monitoring systems',
        'Separator and tank instrumentation',
        'Drilling mud pressure measurement',
        'Production facility monitoring'
      ]
    },
    {
      name: 'Machinery',
      icon: Cog,
      description: 'Reliable pressure and temperature measurement for manufacturing and heavy machinery operations.',
      applications: [
        'Hydraulic system monitoring',
        'Pneumatic equipment pressure control',
        'Compressor instrumentation',
        'Machine tool coolant systems',
        'Industrial pump monitoring',
        'Lubrication system pressure'
      ]
    },
    {
      name: 'Power Stations',
      icon: Factory,
      description: 'Critical instrumentation for thermal, combined cycle, and co-generation power plants.',
      applications: [
        'Boiler pressure and temperature monitoring',
        'Steam turbine instrumentation',
        'Condenser vacuum measurement',
        'Feedwater system monitoring',
        'Auxiliary equipment pressure control',
        'Cooling tower instrumentation'
      ]
    }
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Applications</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Trusted instrumentation solutions across critical industries worldwide
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our heavy-duty instruments are engineered to meet the demanding requirements of the world's most challenging industrial environments.
            </p>
          </div>

          <div className="space-y-12">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.name}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 items-center bg-slate-50 rounded-2xl p-8`}
                >
                  <div className="lg:w-1/3">
                    <div className="bg-blue-900 w-24 h-24 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">{industry.name}</h3>
                    <p className="text-lg text-slate-600">{industry.description}</p>
                  </div>

                  <div className="lg:w-2/3">
                    <h4 className="text-xl font-semibold text-slate-900 mb-4">Typical Applications:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {industry.applications.map((application) => (
                        <div key={application} className="flex items-start bg-white p-4 rounded-lg">
                          <span className="text-blue-900 font-bold mr-2">•</span>
                          <span className="text-slate-600">{application}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">Why Our Instruments Excel in These Industries</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Corrosion Resistance</h3>
              <p className="text-slate-600">
                Specialized materials including SS 316, Monel, and Hastelloy with PTFE coatings for maximum protection against aggressive chemicals and corrosive environments.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">High Pressure Capability</h3>
              <p className="text-slate-600">
                Robust construction capable of handling extreme pressures up to 20,000 psi with 130% over-range protection for safety in critical applications.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Temperature Extremes</h3>
              <p className="text-slate-600">
                Wide temperature range capability from -50°C to 650°C with specialized sensors and materials designed for extreme thermal conditions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Vibration Protection</h3>
              <p className="text-slate-600">
                Liquid-fillable cases with glycerine or silicon oil to dampen vibrations and pulsations common in industrial machinery and process equipment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Precision Accuracy</h3>
              <p className="text-slate-600">
                Accuracy classes from ±0.25% to ±2.5% FSD depending on application requirements, all meeting or exceeding EN 837-1, IS:3624, EN 837 standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Safety Compliance</h3>
              <p className="text-slate-600">
                Full compliance with international safety standards, IP protection ratings up to IP 65, and options for hazardous area certifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our engineering team can design custom instrumentation solutions tailored to your specific application requirements.
          </p>
          <a
            href="/contact"
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Contact Our Experts
          </a>
        </div>
      </section>
    </div>
  );
}
