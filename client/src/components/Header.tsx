import { Link, useLocation } from "react-router-dom";
import { PUBLIC_NAV_ITEMS } from "@/constants";
import { CnButton } from "@/components/CnButton";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="cn-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg cn-gradient-bg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground">CareNow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.path
                  ? "text-primary bg-cn-teal-light"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <CnButton variant="ghost" size="sm">Log In</CnButton>
          </Link>
          <Link to="/register">
            <CnButton size="sm">Get Started</CnButton>
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-2">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link to="/login" onClick={() => setOpen(false)}>
              <CnButton variant="outline" size="sm" className="w-full">Log In</CnButton>
            </Link>
            <Link to="/register" onClick={() => setOpen(false)}>
              <CnButton size="sm" className="w-full">Get Started</CnButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
