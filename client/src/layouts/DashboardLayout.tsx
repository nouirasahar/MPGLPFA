import { Outlet, Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD_PATIENT_NAV, DASHBOARD_PRO_NAV } from "@/constants";
import { cn } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

function getInitials(name?: string) {
  if (!name) return "U";

  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase() || "U";
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const isProfessional = user?.role === "professional";
  const navItems = isProfessional ? DASHBOARD_PRO_NAV : DASHBOARD_PATIENT_NAV;

  const currentPageLabel =
    navItems.find((item) => pathname === item.path)?.label ?? "Dashboard";

  const initials = getInitials(user?.name);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-2 px-6 h-16 border-b border-border">
          <Link to="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="w-8 h-8 rounded-lg cn-gradient-bg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              CareNow
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-cn-teal-light text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-border">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-lg border-b border-border h-16 flex items-center px-6 gap-4">
          <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="font-heading font-semibold text-lg text-foreground">
            {currentPageLabel}
          </h1>

          <div className="ml-auto flex items-center gap-3">
            <div className="w-8 h-8 rounded-full cn-gradient-bg flex items-center justify-center text-primary-foreground text-sm font-semibold">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}