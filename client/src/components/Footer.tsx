import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-cn-navy text-cn-surface/80">
      <div className="cn-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg cn-gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-heading font-bold text-xl text-cn-surface">CareNow</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              Professional healthcare services delivered to your doorstep. Trusted by thousands of families.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-cn-surface mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/services" className="hover:opacity-100 transition-opacity">Home Nursing</Link></li>
              <li><Link to="/services" className="hover:opacity-100 transition-opacity">Doctor Visits</Link></li>
              <li><Link to="/services" className="hover:opacity-100 transition-opacity">Physiotherapy</Link></li>
              <li><Link to="/services" className="hover:opacity-100 transition-opacity">Lab Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-cn-surface mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Careers</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-cn-surface mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>support@carenow.com</li>
              <li>1-800-CARE-NOW</li>
              <li>Mon–Sat, 8am–8pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cn-surface/10 mt-12 pt-8 text-sm text-center opacity-50">
          © {new Date().getFullYear()} CareNow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
