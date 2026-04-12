import { StatCard } from "@/components/StatCard";
import { BookingCard } from "@/components/BookingCard";
import { sampleBookings } from "@/data/testimonials";
import { Calendar, Activity, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { CnButton } from "@/components/CnButton";

export default function PatientDashboard() {
  const upcoming = sampleBookings.filter((b) => b.status === "upcoming");
const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Welcome back, {user?.name || "User"}</h2>
        <p className="text-muted-foreground">Here's an overview of your healthcare activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Upcoming Visits" value={1} icon={<Calendar size={22} />} />
        <StatCard label="Completed" value={8} change="+2 this month" icon={<Activity size={22} />} />
        <StatCard label="Avg. Rating Given" value="4.8" icon={<Star size={22} />} />
        <StatCard label="Total Spent" value="$1,230" icon={<Clock size={22} />} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg">Upcoming Appointments</h3>
          <Link to="/bookings"><CnButton variant="ghost" size="sm">View All</CnButton></Link>
        </div>
        <div className="space-y-3">
          {upcoming.length > 0 ? (
            upcoming.map((b) => <BookingCard key={b.id} booking={b} />)
          ) : (
            <p className="text-muted-foreground text-sm">No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
}
