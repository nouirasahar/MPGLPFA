import type { NavItem } from "@/types";

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];
export const DASHBOARD_PATIENT_NAV = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Appointments", path: "/bookings" },
  { label: "Reviews", path: "/reviews" },
  { label: "Profile", path: "/profile" },
];

export const DASHBOARD_PRO_NAV = [
  { label: "Dashboard", path: "/pro/dashboard" },
  { label: "Appointments", path: "/pro/appointments" },
  { label: "Reviews", path: "/pro/reviews" },
  { label: "Profile", path: "/pro/profile" },
];

export const SERVICE_CATEGORIES = [
  { id: "nursing", label: "Nursing Care", icon: "Heart" },
  { id: "doctor", label: "Doctor Visit", icon: "Stethoscope" },
  { id: "physiotherapy", label: "Physiotherapy", icon: "Activity" },
  { id: "lab", label: "Lab & Samples", icon: "TestTube" },
  { id: "postop", label: "Post-Op Care", icon: "ShieldCheck" },
] as const;
