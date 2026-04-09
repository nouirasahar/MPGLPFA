import { useSearchParams, Link } from "react-router-dom";
import { services } from "@/data/services";
import { CnButton } from "@/components/CnButton";
import { ArrowLeft } from "lucide-react";

export default function BookingFormPage() {
  const [params] = useSearchParams();
  const serviceId = params.get("service");
  const service = services.find((s) => s.id === serviceId);

  return (
    <section className="cn-section">
      <div className="cn-container max-w-2xl">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Book a Service</h1>
        {service && <p className="text-muted-foreground mb-8">Booking: <strong>{service.title}</strong> — ${service.price}</p>}

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "/booking/confirmation"; }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <input type="text" placeholder="John Doe" className="cn-input" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className="cn-input" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Address</label>
            <input type="text" placeholder="Your full address" className="cn-input" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Date</label>
              <input type="date" className="cn-input" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Time</label>
              <select className="cn-input" required>
                <option value="">Select time</option>
                <option>08:00 AM</option>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Notes (optional)</label>
            <textarea rows={3} placeholder="Any special requirements or notes..." className="cn-input resize-none" />
          </div>
          <CnButton type="submit" className="w-full">Confirm Booking</CnButton>
        </form>
      </div>
    </section>
  );
}
