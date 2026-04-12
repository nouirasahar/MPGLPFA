import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { CnButton } from "@/components/CnButton";
import { client } from "../lib/hono-client";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await client.api.auth["reset-password"].$post({
        json: {
          token,
          password,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          "message" in data ? String(data.message) : "Password reset failed"
        );
        return;
      }

      setSuccess("Password reset successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        Reset your password
      </h1>
      <p className="text-muted-foreground mb-8">
        Enter your new password below.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            New Password
          </label>
          <input
            type="password"
            className="cn-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Confirm Password
          </label>
          <input
            type="password"
            className="cn-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <CnButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </CnButton>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Back to{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}