import { Link } from "react-router-dom";
import { CnButton } from "@/components/CnButton";

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Welcome back</h1>
      <p className="text-muted-foreground mb-8">Sign in to your CareNow account</p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
          <input type="email" placeholder="you@example.com" className="cn-input" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
          <input type="password" placeholder="••••••••" className="cn-input" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
            Remember me
          </label>
          <a href="#" className="text-primary hover:underline">Forgot password?</a>
        </div>
        <CnButton type="submit" className="w-full">Sign In</CnButton>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
