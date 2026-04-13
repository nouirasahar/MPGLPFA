import { useParams, Link } from "react-router-dom";
import { services } from "@/data/services";
import { CnButton } from "@/components/CnButton";
import { Clock, DollarSign, ArrowLeft, CheckCircle } from "lucide-react";

const benefits = [
  "Certified & verified professional",
  "Service at your preferred time",
  "No hidden fees or charges",
  "Post-service follow-up included",
  "100% satisfaction guaranteed",
];

export default function ServiceDetailPage() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="cn-section cn-container text-center">
        <h2 className="font-heading text-2xl font-bold mb-4">Service Not Found</h2>
        <Link to="/services"><CnButton variant="outline">Back to Services</CnButton></Link>
      </div>
    );
  }

  return (
    <section className="cn-section">
      <div className="cn-container max-w-4xl">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <span className="cn-badge bg-cn-teal-light text-primary mb-4 inline-block capitalize">{service.category}</span>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">{service.title}</h1>
            <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>

            <h3 className="font-heading font-semibold text-lg mb-4">What's Included</h3>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle size={18} className="text-cn-green shrink-0" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="cn-card sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-foreground">{service.price} TND</span>
              </div>
              <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
                <Clock size={18} /> {service.duration}
              </div>
              <Link to={`/booking?service=${service.id}`}>
                <CnButton className="w-full">Book This Service</CnButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
