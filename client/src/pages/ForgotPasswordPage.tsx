import { useState } from "react";
import { Link } from "react-router-dom";
import { CnButton } from "@/components/CnButton";
import { client } from "../lib/hono-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await client.api.auth["forgot-password"].$post({
        json: { email },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          "message" in data ? String(data.message) : "Request failed"
        );
        return;
      }

      setSuccess(
        "Password reset request sent successfully. Please check your email."
      );
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        Forgot your password?
      </h1>
      <p className="text-muted-foreground mb-8">
        Enter your email and we will send you a reset link.
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <CnButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </CnButton>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Remember your password?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}