import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, change, icon, className }: StatCardProps) {
  return (
    <div className={cn("cn-card flex items-start gap-4", className)}>
      <div className="w-12 h-12 rounded-xl bg-cn-teal-light flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {change && <p className="text-xs text-cn-green font-medium mt-1">{change}</p>}
      </div>
    </div>
  );
}
