import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CnButton } from "@/components/CnButton";
import { client } from "../lib/hono-client";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await client.api.auth["sign-in"].$post({
        json: {
          email: formData.email,
          password: formData.password,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          "message" in data ? String(data.message) : "Sign-in failed"
        );
        return;
      }

      if ("token" in data && data.token) {
        localStorage.setItem("token", data.token);
      }

      if ("user" in data && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      console.log("Sign-in success:", data);

      if ("user" in data && data.user) {
        const role = data.user.role;

        if (role === "patient") {
         navigate("/dashboard");
      } else if (role === "professional") {
        navigate("/pro/dashboard");
        } else {
         navigate("/");
  }
}
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        Welcome back
      </h1>
      <p className="text-muted-foreground mb-8">
        Sign in to your CareNow account
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="cn-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="cn-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              name="rememberMe"
              className="checkbox checkbox-sm checkbox-primary"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>
          <a href="#" className="text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <CnButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </CnButton>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-primary font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}