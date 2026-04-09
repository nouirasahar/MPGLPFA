import type { Booking } from "@/types";
import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  upcoming: "bg-cn-blue-light text-accent",
  completed: "bg-cn-teal-light text-primary",
  cancelled: "bg-destructive/10 text-destructive",
};

export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="cn-card flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-foreground">{booking.serviceName}</h3>
          <span className={cn("cn-badge capitalize", statusStyles[booking.status])}>
            {booking.status}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{booking.professionalName}</p>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar size={14} /> {booking.date}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {booking.time}</span>
          <span className="flex items-center gap-1"><MapPin size={14} /> {booking.address}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-foreground text-lg">${booking.price}</p>
      </div>
    </div>
  );
}
