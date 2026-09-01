import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-red-600">3S</span> TECHNOLOGY
            </h3>
            <p className="text-slate-400">
              Leading manufacturer of high accuracy pressure and temperature gauges for tough and corrosive applications.
            </p>
            <p className="text-slate-400">
              
              GSTIN : 27BPMPB9077E1ZN
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/applications" className="hover:text-white transition-colors">Applications</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                <span>G-9, Rajtilak Indl Complex, Opp. Buddhi Sagar, Chinchpada, Vasai(East), Dist. Palghar - 401208
                  India,
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+91 7028946617</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>3stechnology2024@gmail.com
                  threestechnology2024@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {2025} 3S Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
