import { SectionHeading } from "@/components/SectionHeading";
import { Shield, Users, Heart, Award } from "lucide-react";
import aboutImg from "@/assets/about-illustration.png";

const stats = [
  { value: "10,000+", label: "Families Served" },
  { value: "500+", label: "Certified Professionals" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  { icon: Heart, title: "Compassion First", desc: "Every interaction is guided by genuine care for our patients' wellbeing." },
  { icon: Shield, title: "Safety & Trust", desc: "Rigorous verification ensures only the best professionals join our platform." },
  { icon: Users, title: "Accessibility", desc: "Quality healthcare should be accessible to everyone, everywhere." },
  { icon: Award, title: "Excellence", desc: "We continuously raise the bar for home healthcare standards." },
];

export default function AboutPage() {
  return (
    <>
      <section className="cn-hero-bg cn-section">
        <div className="cn-container">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <SectionHeading
                badge="About Us"
                title="Redefining Home Healthcare"
                subtitle="CareNow was founded with a simple mission: bring professional, compassionate healthcare to every home. We connect patients with certified professionals for convenient, high-quality care."
                align="left"
              />
            </div>
            <div className="flex-1 max-w-sm">
              <img src={aboutImg} alt="Doctor visiting patient at home" loading="lazy" width={800} height={640} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="cn-section bg-card">
        <div className="cn-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold cn-gradient-text">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cn-section">
        <div className="cn-container">
          <SectionHeading badge="Our Values" title="What Drives Us" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="cn-card flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-cn-teal-light flex items-center justify-center shrink-0">
                  <v.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
