import { StatCard } from "@/components/StatCard";
import { Calendar, Users, Star, DollarSign } from "lucide-react";

export default function ProDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Welcome, Dr. Smith</h2>
        <p className="text-muted-foreground">Here's your professional overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's Appointments" value={3} icon={<Calendar size={22} />} />
        <StatCard label="Total Patients" value={142} change="+12 this month" icon={<Users size={22} />} />
        <StatCard label="Your Rating" value="4.9" icon={<Star size={22} />} />
        <StatCard label="Earnings (Month)" value="$4,200" change="+8%" icon={<DollarSign size={22} />} />
      </div>

      <div className="cn-card">
        <h3 className="font-heading font-semibold text-lg mb-4">Today's Schedule</h3>
        <div className="space-y-4">
          {[
            { time: "09:00 AM", patient: "Sarah Johnson", service: "Home Nursing Care", address: "123 Oak St" },
            { time: "11:30 AM", patient: "Michael Chen", service: "Post-Surgery Follow-Up", address: "456 Maple Ave" },
            { time: "02:00 PM", patient: "Emily Rodriguez", service: "Home Nursing Care", address: "789 Pine Rd" },
          ].map((appt) => (
            <div key={appt.time} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="text-center shrink-0">
                <p className="text-sm font-semibold text-primary">{appt.time}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{appt.patient}</p>
                <p className="text-sm text-muted-foreground">{appt.service} • {appt.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
