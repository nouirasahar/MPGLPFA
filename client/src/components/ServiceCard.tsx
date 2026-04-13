import { Heart, Stethoscope, Activity, TestTube, ShieldCheck } from "lucide-react";
import type { Service } from "@/types";
import { Link } from "react-router-dom";

const iconMap: Record<string, React.ElementType> = {
  Heart, Stethoscope, Activity, TestTube, ShieldCheck,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Heart;

  return (
    <Link to={`/services/${service.id}`} className="cn-card group cursor-pointer block">
      <div className="w-12 h-12 rounded-xl cn-gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="text-primary-foreground" size={24} />
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{service.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-primary">{service.price}TND</span>
        <span className="text-xs text-muted-foreground">{service.duration}</span>
      </div>
    </Link>
  );
}
