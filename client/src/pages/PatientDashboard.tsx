import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { BookingCard } from "@/components/BookingCard";
import { Calendar, Activity, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { CnButton } from "@/components/CnButton";
import { authFetch } from "@/lib/authFetch";

export default function PatientDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await authFetch("http://localhost:3001/api/patient/dashboard");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No dashboard data found.</p>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
          Welcome back, {data.user?.name}
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your healthcare activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Upcoming Visits" value={data.stats?.upcomingVisits || 0} icon={<Calendar size={22} />} />
        <StatCard label="Completed" value={data.stats?.completed || 0} icon={<Activity size={22} />} />
        <StatCard label="Avg. Rating Given" value={data.stats?.avgRatingGiven || 0} icon={<Star size={22} />} />
        <StatCard label="Total Spent" value={`$${data.stats?.totalSpent || 0}`} icon={<Clock size={22} />} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg">Upcoming Appointments</h3>
          <Link to="/bookings">
            <CnButton variant="ghost" size="sm">View All</CnButton>
          </Link>
        </div>

        <div className="space-y-3">
          {data.upcomingBookings?.length > 0 ? (
            data.upcomingBookings.map((b: any) => (
              <BookingCard key={b._id} booking={b} />
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
}