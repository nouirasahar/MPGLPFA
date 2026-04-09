import { Link } from "react-router-dom";
import { CnButton } from "@/components/CnButton";
import { CheckCircle } from "lucide-react";

export default function BookingConfirmationPage() {
  return (
    <section className="cn-section">
      <div className="cn-container max-w-lg text-center">
        <div className="w-20 h-20 rounded-full bg-cn-teal-light flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-primary" size={40} />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Your appointment has been successfully booked. You'll receive a confirmation email shortly with all the details.
        </p>
        <div className="cn-card text-left mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID</span>
              <span className="font-medium text-foreground">#CN-2026-0042</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="cn-badge bg-cn-teal-light text-primary">Confirmed</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard"><CnButton>Go to Dashboard</CnButton></Link>
          <Link to="/services"><CnButton variant="outline">Browse Services</CnButton></Link>
        </div>
      </div>
    </section>
  );
}
