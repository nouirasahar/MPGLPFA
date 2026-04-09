import { StarRating } from "@/components/StarRating";
import { sampleReviews } from "@/data/testimonials";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-foreground">Your Reviews</h2>

      <div className="space-y-4">
        {sampleReviews.map((r) => (
          <div key={r.id} className="cn-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">{r.serviceName}</h3>
              <span className="text-xs text-muted-foreground">{r.date}</span>
            </div>
            <StarRating rating={r.rating} />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
