import { Link } from "react-router-dom";
import { CnButton } from "@/components/CnButton";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-7xl font-bold cn-gradient-text mb-4">404</h1>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/"><CnButton>Back to Home</CnButton></Link>
      </div>
    </div>
  );
}
