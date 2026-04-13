import type { Testimonial, FAQ, Booking, Review } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mohamed Saad",
    role: "Patient",
    comment: "CareNow made it so easy to get nursing care for my mother. The nurse was professional, compassionate, and thorough. Highly recommend!",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: "2",
    name: "Ahmed Boughzela",
    role: "Patient",
    comment: "After my knee surgery, the physiotherapy sessions at home were a game-changer. I recovered faster without the hassle of traveling.",
    rating: 5,
    avatar: "MC",
  },
  {
    id: "3",
    name: "Serine Miled",
    role: "Patient",
    comment: "Blood sample collection at home saved me hours of waiting. Results were quick and the phlebotomist was excellent.",
    rating: 4,
    avatar: "ER",
  },
];

export const faqs: FAQ[] = [
  {
    question: "How quickly can I book a home visit?",
    answer: "You can book a same-day visit for most services. Emergency nursing care can be arranged within 2 hours depending on availability in your area.",
  },
  {
    question: "Are all professionals verified?",
    answer: "Yes. Every healthcare professional on CareNow undergoes thorough background checks, license verification, and credential validation before joining our platform.",
  },
  {
    question: "What areas do you cover?",
    answer: "We currently serve major metropolitan areas and are expanding rapidly. Enter your zip code during booking to check availability in your area.",
  },
  {
    question: "How does payment work?",
    answer: "We accept all major credit cards, insurance, and HSA/FSA payments. You're only charged after the service is completed to your satisfaction.",
  },
  {
    question: "Can I choose my healthcare provider?",
    answer: "Absolutely. You can browse professional profiles, read reviews, and select your preferred provider when booking a service.",
  },
];

export const sampleBookings: Booking[] = [
  {
    id: "B001",
    serviceId: "1",
    serviceName: "Home Nursing Care",
    professionalName: "Nurse Patricia Adams",
    date: "2026-04-10",
    time: "09:00 AM",
    status: "upcoming",
    price: 150,
    address: "123 Oak Street, Apt 4B",
  },
  {
    id: "B002",
    serviceId: "3",
    serviceName: "Physiotherapy Session",
    professionalName: "Dr. James Liu",
    date: "2026-03-28",
    time: "02:00 PM",
    status: "completed",
    price: 200,
    address: "123 Oak Street, Apt 4B",
  },
  {
    id: "B003",
    serviceId: "4",
    serviceName: "Blood Sample Collection",
    professionalName: "Tech. Maria Santos",
    date: "2026-03-15",
    time: "07:30 AM",
    status: "completed",
    price: 80,
    address: "123 Oak Street, Apt 4B",
  },
  {
    id: "B004",
    serviceId: "2",
    serviceName: "Doctor Home Visit",
    professionalName: "Dr. Robert Kim",
    date: "2026-03-10",
    time: "11:00 AM",
    status: "cancelled",
    price: 300,
    address: "456 Maple Avenue",
  },
];

export const sampleReviews: Review[] = [
  {
    id: "R001",
    author: "You",
    rating: 5,
    comment: "Nurse Patricia was incredibly professional and caring. She made my mother feel comfortable throughout the entire visit.",
    date: "2026-03-29",
    serviceName: "Home Nursing Care",
  },
  {
    id: "R002",
    author: "You",
    rating: 4,
    comment: "Great physiotherapy session. Dr. Liu explained every exercise clearly and adjusted the plan based on my progress.",
    date: "2026-03-28",
    serviceName: "Physiotherapy Session",
  },
];
