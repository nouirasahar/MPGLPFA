import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CnButton } from "@/components/CnButton";
import { client } from "../lib/hono-client";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    governorate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.role &&
    formData.governorate;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signUpUser = async () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const response = await client.api.auth["sign-up"].$post({
      json: {
        name: fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role as "patient" | "professional",
        governorate: formData.governorate,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        "message" in data ? String(data.message) : "Registration failed"
      );
    }

    if ("token" in data && data.token) {
      localStorage.setItem("token", data.token);
    }

    if ("user" in data && data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isFormValid) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await signUpUser();

      setSuccess("Account created successfully.");
      console.log("Sign-up success:", data);

      if (formData.role === "patient") {
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else if (formData.role === "professional") {
        setTimeout(() => {
          navigate("/professional-verification");
        }, 800);
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
        Create your account
      </h1>
      <p className="text-muted-foreground mb-8">
        Join CareNow and access quality home healthcare
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Mohamed"
              className="cn-input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Saad"
              className="cn-input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

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
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+216 00 000 000"
            className="cn-input"
            value={formData.phone}
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

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            I am a
          </label>
          <select
            className="cn-input"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="patient">Patient</option>
            <option value="professional">Healthcare Professional</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Governorate
          </label>
          <select
            className="cn-input"
            name="governorate"
            value={formData.governorate}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your governorate
            </option>
            <option value="Ariana">Ariana</option>
            <option value="Béja">Béja</option>
            <option value="Ben Arous">Ben Arous</option>
            <option value="Bizerte">Bizerte</option>
            <option value="Gabès">Gabès</option>
            <option value="Gafsa">Gafsa</option>
            <option value="Jendouba">Jendouba</option>
            <option value="Kairouan">Kairouan</option>
            <option value="Kasserine">Kasserine</option>
            <option value="Kébili">Kébili</option>
            <option value="Le Kef">Le Kef</option>
            <option value="Mahdia">Mahdia</option>
            <option value="La Manouba">La Manouba</option>
            <option value="Médenine">Médenine</option>
            <option value="Monastir">Monastir</option>
            <option value="Nabeul">Nabeul</option>
            <option value="Sfax">Sfax</option>
            <option value="Sidi Bouzid">Sidi Bouzid</option>
            <option value="Siliana">Siliana</option>
            <option value="Sousse">Sousse</option>
            <option value="Tataouine">Tataouine</option>
            <option value="Tozeur">Tozeur</option>
            <option value="Tunis">Tunis</option>
            <option value="Zaghouan">Zaghouan</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <CnButton
          type="submit"
          className="w-full"
          disabled={loading || !isFormValid}
        >
          {loading
            ? "Creating..."
            : formData.role === "professional"
            ? "Next"
            : "Create Account"}
        </CnButton>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}