import { Target, Eye, Award, Shield } from 'lucide-react';
import industry from './images/industry.webp';
export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">About 3S Technology</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Leading the industry in precision instrumentation for extreme environments
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
              <p className="text-lg text-slate-600 mb-4">
                3S Technology is a premier manufacturer of heavy-duty pressure and temperature measurement instruments. With decades of experience, well qualified engineers, and skilled workers we specialize in providing robust, reliable gauges designed to perform in the most challenging industrial environments.
              </p>
              <p className="text-lg text-slate-600">
                Our commitment to quality and innovation has made us a trusted partner for industries requiring precision instrumentation that can withstand tough and corrosive applications.
              </p>
            </div>
            <img
  src = {industry}
  alt="Pressure Gauges"
  className="h-80 w-full object-cover"
/>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-blue-900" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-600">
                To deliver world-class instrumentation solutions that ensure safe, efficient, and reliable operations in demanding industrial environments. We are committed to engineering products that exceed international standards and customer expectations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-blue-900" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-lg text-slate-600">
                To be the global leader in precision measurement instrumentation, recognized for innovation, quality, and unwavering commitment to customer success across all industrial sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">Our Commitment to Excellence</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-900 pl-6">
              <div className="flex items-center mb-3">
                <Award className="h-6 w-6 text-blue-900 mr-2" />
                <h3 className="text-2xl font-bold text-slate-900">International Standards</h3>
              </div>
              <p className="text-lg text-slate-600">
                All our products are manufactured in strict adherence to EN 837-1, ASME B40.200, IS:3624 international standards, ensuring consistent quality, accuracy, and reliability. Our gauges undergo rigorous testing and quality control procedures to meet or exceed industry requirements.
              </p>
            </div>

            <div className="border-l-4 border-blue-900 pl-6">
              <div className="flex items-center mb-3">
                <Shield className="h-6 w-6 text-blue-900 mr-2" />
                <h3 className="text-2xl font-bold text-slate-900">Extreme Environment Expertise</h3>
              </div>
              <p className="text-lg text-slate-600">
                We specialize in providing instrumentation for tough and corrosive applications. Our products feature specialized materials, coatings, and construction methods that ensure reliable performance in petrochemical plants, nuclear facilities, offshore platforms, and other demanding environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">Why Choose 3S Technology?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Superior Durability</h3>
              <p className="text-slate-600">
                Heavy-duty construction using premium materials for exceptional longevity in harsh conditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Precision Engineering</h3>
              <p className="text-slate-600">
                Advanced manufacturing processes ensuring accuracy and consistent performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Corrosion Protection</h3>
              <p className="text-slate-600">
                Specialized coatings and materials designed for corrosive environments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Wide Range</h3>
              <p className="text-slate-600">
                Comprehensive product portfolio covering all measurement needs and specifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Solutions</h3>
              <p className="text-slate-600">
                Ability to provide customized instrumentation for unique application requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Support</h3>
              <p className="text-slate-600">
                Technical expertise and customer service to ensure optimal product selection and performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
