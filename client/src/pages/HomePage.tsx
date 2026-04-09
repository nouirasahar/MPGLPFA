import { Link } from "react-router-dom";
import { CnButton } from "@/components/CnButton";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { services } from "@/data/services";
import { testimonials, faqs } from "@/data/testimonials";
import { Shield, Clock, UserCheck, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-illustration.png";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <HowItWorks />
      <TrustSection />
      <TestimonialsSection />
      <HealthUpdates />
      <FAQSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="cn-hero-bg cn-section relative overflow-hidden">
      <div className="cn-container">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <span className="cn-badge bg-primary/10 text-primary mb-6 inline-flex">
              🏥 Trusted by 10,000+ families
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Professional Healthcare,{" "}
              <span className="cn-gradient-text">At Your Doorstep</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Book certified nurses, doctors, physiotherapists, and lab technicians for home visits.
              Quality care, zero hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/services">
                <CnButton size="lg">Book a Service</CnButton>
              </Link>
              <Link to="/about">
                <CnButton variant="outline" size="lg">Learn More</CnButton>
              </Link>
            </div>
          </div>
          <div className="flex-1 max-w-md lg:max-w-lg">
            <img src={heroImg} alt="Nurse caring for patient at home" width={1024} height={768} className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedServices() {
  return (
    <section className="cn-section bg-card">
      <div className="cn-container">
        <SectionHeading
          badge="Our Services"
          title="Healthcare Services You Can Trust"
          subtitle="From nursing care to lab tests, we bring certified healthcare professionals to your home."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services">
            <CnButton variant="outline">View All Services</CnButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { step: "01", title: "Choose a Service", desc: "Browse our range of home healthcare services and select what you need." },
  { step: "02", title: "Pick a Professional", desc: "View profiles, ratings, and reviews to choose your preferred provider." },
  { step: "03", title: "Book & Relax", desc: "Schedule a convenient time and our professional will come to you." },
];

function HowItWorks() {
  return (
    <section className="cn-section">
      <div className="cn-container">
        <SectionHeading
          badge="How It Works"
          title="Getting Care Is Simple"
          subtitle="Three easy steps to professional healthcare at home."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-16 h-16 rounded-2xl cn-gradient-bg flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                {s.step}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const trustItems = [
  { icon: Shield, title: "Verified Professionals", desc: "Every provider is background-checked and license-verified." },
  { icon: Clock, title: "Same-Day Availability", desc: "Book same-day visits for urgent healthcare needs." },
  { icon: UserCheck, title: "Satisfaction Guaranteed", desc: "If you're not satisfied, we'll arrange a follow-up at no cost." },
];

function TrustSection() {
  return (
    <section className="cn-section bg-cn-navy">
      <div className="cn-container">
        <div className="text-center mb-12">
          <span className="cn-badge bg-primary/20 text-cn-teal-light mb-4 inline-block">Your Safety Matters</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-cn-surface mb-4">Why Families Trust CareNow</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-cn-teal-light" size={28} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-cn-surface mb-2">{item.title}</h3>
              <p className="text-cn-surface/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="cn-section bg-card">
      <div className="cn-container">
        <SectionHeading
          badge="Testimonials"
          title="What Our Patients Say"
          subtitle="Real stories from families who trust CareNow."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

const articles = [
  {
    title: "How Home Healthcare Is Changing Patient Recovery",
    summary: "Studies show patients recover faster with professional care in the comfort of their own home.",
    daysAgo: 3,
  },
  {
    title: "5 Signs You Should Book a Home Nurse Visit",
    summary: "Not sure if you need in-home care? Here are the key indicators to watch for.",
    daysAgo: 7,
  },
  {
    title: "The Role of AI in Modern Preventive Healthcare",
    summary: "How technology is helping healthcare providers deliver smarter, earlier interventions.",
    daysAgo: 12,
  },
];

function HealthUpdates() {
  return (
    <section className="cn-section">
      <div className="cn-container">
        <SectionHeading
          badge="Blog"
          title="Latest Health & Medical Updates"
          subtitle="Stay informed with tips, news, and insights from our healthcare experts."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((a) => (
            <article
              key={a.title}
              className="cn-card group flex flex-col justify-between"
            >
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {a.summary}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Published {a.daysAgo} days ago
                </span>
                <button className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="cn-section bg-card">
      <div className="cn-container max-w-3xl">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about CareNow."
        />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="cn-card !p-0 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-muted-foreground transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cn-section cn-hero-bg">
      <div className="cn-container text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready to Experience Better Healthcare?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Join thousands of families who trust CareNow for professional home healthcare.
        </p>
        <Link to="/register">
          <CnButton size="lg">Get Started </CnButton>
        </Link>
      </div>
    </section>
  );
}
