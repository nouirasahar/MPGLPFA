import { useState } from "react";
import { services } from "@/data/services";
import { SERVICE_CATEGORIES } from "@/constants";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
  const [active, setActive] = useState<string>("all");

  const filtered = active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <section className="cn-section">
      <div className="cn-container">
        <SectionHeading
          badge="Services"
          title="Our Healthcare Services"
          subtitle="Browse our comprehensive range of home healthcare services."
        />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActive("all")}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
              active === "all" ? "cn-gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                active === cat.id ? "cn-gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
