import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  role?: "patient" | "professional";
};

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}