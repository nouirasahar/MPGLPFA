import { useEffect, useMemo, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { Calendar, Users, Star, DollarSign } from "lucide-react";
import { authFetch } from "@/lib/authFetch";

type DashboardData = {
  user: {
    id?: string;
    name: string;
    email?: string;
    role?: string;
    governorate?: string;
    specialty?: string;
    price?: number;
    verificationStatus?: string;
    detectedRole?: string;
    isVerified?: boolean;
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
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const fallbackData: DashboardData = useMemo(
    () => ({
      user: {
        id: storedUser?.id || "",
        name: storedUser?.name || "Professional",
        email: storedUser?.email || "",
        role: storedUser?.role || "professional",
        governorate: storedUser?.governorate || "",
        specialty: storedUser?.specialty || "",
        price: storedUser?.price || 0,
        verificationStatus: storedUser?.verificationStatus || "NOT_VERIFIED",
        detectedRole: storedUser?.detectedRole || "",
        isVerified: storedUser?.isVerified || false,
      },
      stats: {
        todayAppointments: 0,
        totalPatients: 0,
        rating: "0",
        earnings: 0,
      },
      schedule: [],
    }),
    [storedUser]
  );

  const [data, setData] = useState<DashboardData>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

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

        setData({
          user: {
            ...fallbackData.user,
            ...(result.user || {}),
          },
          stats: {
            todayAppointments: result.stats?.todayAppointments || 0,
            totalPatients: result.stats?.totalPatients || 0,
            rating: result.stats?.rating || "0",
            earnings: result.stats?.earnings || 0,
          },
          schedule: Array.isArray(result.schedule) ? result.schedule : [],
        });
        setUsingFallback(false);
      } catch (error) {
        console.error("Professional dashboard error:", error);
        setData(fallbackData);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [fallbackData]);

  const firstName = useMemo(() => {
    const fullName = data.user?.name || "Professional";
    return fullName.split(" ")[0] || "Professional";
  }, [data.user?.name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
          Hello, {firstName}
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your professional activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Appointments"
          value={data.stats.todayAppointments}
          icon={<Calendar size={22} />}
        />
        <StatCard
          label="Total Patients"
          value={data.stats.totalPatients}
          icon={<Users size={22} />}
        />
        <StatCard
          label="Your Rating"
          value={data.stats.rating}
          icon={<Star size={22} />}
        />
        <StatCard
          label="Earnings (Month)"
          value={`$${data.stats.earnings}`}
          icon={<DollarSign size={22} />}
        />
      </div>

      <div className="cn-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading font-semibold text-lg">
              Professional Summary
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {data.user.specialty
                ? `${data.user.specialty} • ${data.user.governorate || "Tunisia"}`
                : `${data.user.governorate || "Tunisia"}`}
            </p>
          </div>

          {data.user.isVerified ? (
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
              Verified
            </span>
          ) : (
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
              Pending verification
            </span>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">
          Today's Schedule
        </h3>

        <div className="space-y-3">
          {data.schedule.length > 0 ? (
            data.schedule.map((appt) => (
              <div key={appt._id} className="cn-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-foreground">
                    {appt.patient?.name || "Patient"}
                  </p>
                  <span className="text-sm text-primary">{appt.time}</span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {appt.service} • {appt.address}
                </p>
              </div>
            ))
          ) : (
            <div className="cn-card">
              <p className="font-medium text-foreground mb-1">
                No appointments scheduled for today
              </p>
              <p className="text-sm text-muted-foreground">
                Your upcoming visits will appear here once patients book your
                services.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}