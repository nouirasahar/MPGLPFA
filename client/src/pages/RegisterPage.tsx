import { Link } from "react-router-dom";
import { CnButton } from "@/components/CnButton";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Create your account</h1>
      <p className="text-muted-foreground mb-8">Join CareNow and access quality home healthcare</p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
            <input type="text" placeholder="John" className="cn-input" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
            <input type="text" placeholder="Doe" className="cn-input" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
          <input type="email" placeholder="you@example.com" className="cn-input" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
          <input type="tel" placeholder="+1 (555) 000-0000" className="cn-input" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
          <input type="password" placeholder="••••••••" className="cn-input" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">I am a</label>
          <select className="cn-input">
            <option>Patient</option>
            <option>Healthcare Professional</option>
          </select>
        </div>
        <CnButton type="submit" className="w-full">Create Account</CnButton>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
