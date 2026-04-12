import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { Calendar, Users, Star, DollarSign } from "lucide-react";
import { authFetch } from "@/lib/authFetch";

type DashboardData = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    governorate: string;
  };
  stats: {
    todayAppointments: number;
    totalPatients: number;
    rating: string;
    earnings: number;
  };
  schedule: Array<{
    _id: string;
    time: string;
    service: string;
    address: string;
    patient?: {
      name: string;
    };
  }>;
};

export default function ProDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await authFetch(
          "http://localhost:3001/api/professional/dashboard"
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load dashboard");
        }

        setData(result);
      } catch (error) {
        console.error("Professional dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading dashboard...</p>;
  }

  if (!data) {
    return <p className="text-muted-foreground">No dashboard data found.</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
          Welcome, {data.user?.name || "Professional"}
        </h2>
        <p className="text-muted-foreground">
          Here's your professional overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Appointments"
          value={data.stats?.todayAppointments || 0}
          icon={<Calendar size={22} />}
        />
        <StatCard
          label="Total Patients"
          value={data.stats?.totalPatients || 0}
          icon={<Users size={22} />}
        />
        <StatCard
          label="Your Rating"
          value={data.stats?.rating || "0"}
          icon={<Star size={22} />}
        />
        <StatCard
          label="Earnings (Month)"
          value={`$${data.stats?.earnings || 0}`}
          icon={<DollarSign size={22} />}
        />
      </div>

      <div className="cn-card">
        <h3 className="font-heading font-semibold text-lg mb-4">
          Today's Schedule
        </h3>

        <div className="space-y-4">
          {data.schedule && data.schedule.length > 0 ? (
            data.schedule.map((appt) => (
              <div
                key={appt._id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
              >
                <div className="text-center shrink-0">
                  <p className="text-sm font-semibold text-primary">
                    {appt.time}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {appt.patient?.name || "Unknown Patient"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {appt.service} • {appt.address}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No appointments scheduled for today.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}