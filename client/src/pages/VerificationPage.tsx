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
  const [result, setResult] = useState<any>(null);

  const isValid = !!(specialty && role.trim() && price && idImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setIdImage(file);
  };

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    if (!isValid || !idImage) {
      setError("Please fill all fields and upload your ID.");
      return;
    }

    try {
      setLoading(true);

      const baseData = JSON.parse(
        localStorage.getItem("registerData") || "{}"
      );

      const formData = new FormData();
      formData.append("firstName", baseData.firstName || "");
      formData.append("lastName", baseData.lastName || "");
      formData.append("email", baseData.email || "");
      formData.append("phone", baseData.phone || "");
      formData.append("governorate", baseData.governorate || "");
      formData.append("userType", baseData.userType || "");
      formData.append("specialty", specialty);
      formData.append("exactRole", role);
      formData.append("pricePerVisit", price);
      formData.append("document", idImage);

      // Step 1: verify document with Flask
      const verifyResponse = await fetch("http://127.0.0.1:5000/verify-document", {
        method: "POST",
        body: formData,
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.message || "Verification failed");
      }

      // Step 2: save professional data to main backend
      if (verifyData.verification_status === "BASIC_VERIFIED") {
        const saveResponse = await fetch(
          "http://localhost:3001/api/professional/complete-profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: baseData.email,
              specialty,
              price,
              verificationStatus: verifyData.verification_status,
              detectedRole: verifyData.detected_role,
            }),
          }
        );

        const saveData = await saveResponse.json();

        if (!saveResponse.ok) {
          throw new Error(saveData.message || "Failed to save profile");
        }

        setResult({
          verification_status: verifyData.verification_status,
          detected_role: verifyData.detected_role,
          message: "Your profile has been verified and saved successfully.",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        setResult(verifyData);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
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

        {result && (
          <div className="rounded-xl border p-4 text-sm space-y-2">
            {result.verification_status === "BASIC_VERIFIED" && (
              <p className="text-green-600 font-semibold">
                Your professional document has been verified successfully.
              </p>
            )}

            {result.verification_status === "REJECTED" && (
              <p className="text-red-600 font-semibold">
                Verification failed: {result.message}
              </p>
            )}

            {result.verification_status === "UNVERIFIED" && (
              <p className="text-yellow-600 font-semibold">
                We could not verify your document. Please try again.
              </p>
            )}

            <p>
              <strong>Detected role:</strong>{" "}
              {result.detected_role || "None"}
            </p>

            {result.verification_status === "BASIC_VERIFIED" && (
              <p className="text-muted-foreground">
                Redirecting to login...
              </p>
            )}
          </div>
        )}

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