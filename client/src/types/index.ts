export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  duration: string;
  category: ServiceCategory;
}

export type ServiceCategory = "nursing" | "doctor" | "physiotherapy" | "lab" | "postop";

export interface Professional {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  professionalName: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: number;
  address: string;
}

export type BookingStatus = "upcoming" | "completed" | "cancelled";

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "patient" | "professional";
  avatar?: string;
}
