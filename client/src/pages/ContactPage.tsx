import { CnButton } from "@/components/CnButton";
import { SectionHeading } from "@/components/SectionHeading";
import { Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@carenow.com" },
  { icon: Phone, label: "Phone", value: "1-800-CARE-NOW" },
  { icon: MapPin, label: "Address", value: "123 Health Street, Medical District" },
];

export default function ContactPage() {
  return (
    <section className="cn-section">
      <div className="cn-container max-w-5xl">
        <SectionHeading
          badge="Contact"
          title="Get In Touch"
          subtitle="Have questions? We'd love to hear from you."
        />

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="cn-input" />
                <input type="text" placeholder="Last Name" className="cn-input" />
              </div>
              <input type="email" placeholder="Email Address" className="cn-input" />
              <input type="text" placeholder="Subject" className="cn-input" />
              <textarea rows={5} placeholder="Your Message" className="cn-input resize-none" />
              <CnButton type="submit">Send Message</CnButton>
            </form>
          </div>

          <div className="md:col-span-2 space-y-6">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-cn-teal-light flex items-center justify-center shrink-0">
                  <c.icon className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="font-medium text-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
