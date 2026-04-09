import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export function SectionHeading({ badge, title, subtitle, align = "center", children }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === "center" ? "text-center" : "text-left")}>
      {badge && (
        <span className="cn-badge bg-cn-teal-light text-primary mb-4 inline-block">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-muted-foreground text-lg", align === "center" && "max-w-2xl mx-auto")}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
