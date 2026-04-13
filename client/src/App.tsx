import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import ChatbotComponent from "@/chatbot/static/ChatbotComponent.jsx";

import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import PatientDashboard from "@/pages/PatientDashboard";
import ProDashboard from "@/pages/ProDashboard";
import BookingsPage from "@/pages/BookingsPage";
import ProfilePage from "@/pages/ProfilePage";
import ReviewsPage from "@/pages/ReviewsPage";
import BookingFormPage from "@/pages/BookingFormPage";
import BookingConfirmationPage from "@/pages/BookingConfirmationPage";
import NotFoundPage from "@/pages/NotFoundPage";
import VerificationPage from "@/pages/VerificationPage";

const queryClient = new QueryClient();
const hideChatbotOn = ['/login', '/register'];
const shouldShowChatbot = !hideChatbotOn.some(path => location.pathname.startsWith(path));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      {shouldShowChatbot && <ChatbotComponent />}
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingFormPage />} />
            <Route
              path="/booking/confirmation"
              element={<BookingConfirmationPage />}
            />
          </Route>

          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/professional-verification" element={<VerificationPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Patient dashboard routes */}
          {/*<Route
            element={
              <ProtectedRoute role="patient">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >*/}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Professional dashboard routes */}
          {/* <Route
            element={
              <ProtectedRoute role="professional">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
          */}

          <Route element={<DashboardLayout />}>
            <Route path="/pro/dashboard" element={<ProDashboard />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;