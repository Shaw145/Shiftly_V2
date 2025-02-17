// frontend/src/pages/VerifyEmail.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otpCode,
        }),
      });

      const text = await response.text();
      console.log("Response:", text);

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }

      const data = JSON.parse(text);
      localStorage.setItem("token", data.token);
      localStorage.setItem("fullName", data.fullName);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('src/assets/auth-bg.jpg')" }}>
      <div className="w-full max-w-md bg-[#151616af] p-8 rounded-lg shadow-lg mx-4 mt-29 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Verify Email</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg text-white"
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center cursor-pointer"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-base text-white">
          <a href="/signup" className="text-red-500 hover:underline">
            Go Back
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;