import { Outlet, Link } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 cn-hero-bg items-center justify-center p-12">
        <div className="max-w-md text-center">
          <Link to="/" className="flex items-center gap-2 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl cn-gradient-bg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
            <span className="font-heading font-bold text-2xl text-foreground">CareNow</span>
          </Link>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Healthcare, at your doorstep
          </h2>
          <p className="text-muted-foreground">
            Join thousands of families who trust CareNow for professional home healthcare services.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-card">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg cn-gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">CareNow</span>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
