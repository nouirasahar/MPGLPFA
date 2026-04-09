import { StarRating } from "./StarRating";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="cn-card">
      <StarRating rating={testimonial.rating} />
      <p className="text-muted-foreground mt-4 mb-6 text-sm leading-relaxed">
        "{testimonial.comment}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full cn-gradient-bg flex items-center justify-center text-primary-foreground text-sm font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
