import { BookingCard } from "@/components/BookingCard";
import { sampleBookings } from "@/data/testimonials";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["all", "upcoming", "completed", "cancelled"] as const;

export default function BookingsPage() {
  const [active, setActive] = useState<string>("all");

  const filtered = active === "all" ? sampleBookings : sampleBookings.filter((b) => b.status === active);

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-foreground">Booking History</h2>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors",
              active === tab ? "cn-gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((b) => <BookingCard key={b.id} booking={b} />)
        ) : (
          <p className="text-muted-foreground text-sm py-8 text-center">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
