import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CnButton } from "@/components/CnButton";

const specialties = [
  "Nursing Care",
  "Doctor Visit",
  "Physiotherapy",
  "Lab & Samples",
  "Post-Op Care",
];

export default function VerificationPage() {
  const navigate = useNavigate();

  const [specialty, setSpecialty] = useState("");
  const [role, setRole] = useState("");
  const [price, setPrice] = useState("");
  const [idImage, setIdImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid =
    specialty && role.trim() && price && idImage;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setIdImage(file);
  };

  const handleSubmit = async () => {
    setError("");

    if (!isValid) {
      setError("Please fill all fields and upload your ID.");
      return;
    }

    try {
      setLoading(true);

      const baseData = JSON.parse(
        localStorage.getItem("registerData") || "{}"
      );

      // Convert image to base64 (temporary until backend)
      const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });

      const idImageBase64 = await toBase64(idImage);

      const professionalData = {
        ...baseData,
        specialty,
        role,
        price,
        idImage: idImageBase64,
      };

      localStorage.setItem(
        "professionalProfile",
        JSON.stringify(professionalData)
      );

      navigate("/pro/dashboard");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Professional Verification
      </h1>
      <p className="text-muted-foreground mb-6">
        Complete your profile to start working on CareNow
      </p>

      <div className="space-y-4">
        {/* Specialty */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Specialty
          </label>
          <select
            className="cn-input"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">Select specialty</option>
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Exact Role */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Your exact role
          </label>
          <input
            className="cn-input"
            placeholder="e.g. Registered Nurse, Physiotherapist..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Price per visit (TND)
          </label>
          <input
            type="number"
            className="cn-input"
            placeholder="50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* ID Upload */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Upload ID / Professional Document
          </label>
          <input
            type="file"
            accept="image/*"
            className="cn-input"
            onChange={handleFileChange}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Confirm Button */}
        <CnButton
          className="w-full"
          onClick={handleSubmit}
          disabled={!isValid || loading}
        >
          {loading ? "Verifying..." : "Confirm & Continue"}
        </CnButton>
      </div>
    </div>
  );
}