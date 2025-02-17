import { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  // Check username availability in real-time
  useEffect(() => {
    if (username) {
      const checkUsername = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/auth/check-username?username=${username}`);
          const data = await response.json();
          setIsUsernameAvailable(data.isAvailable);
        } catch (error) {
          console.error("Error checking username:", error);
        }
      };

      const debounceTimer = setTimeout(() => {
        checkUsername();
      }, 500); // Debounce to avoid too many requests

      return () => clearTimeout(debounceTimer);
    } else {
      setIsUsernameAvailable(null); // Reset if username is empty
    }
  }, [username]);

  const validatePassword = (value) => {
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    if (value.length < 6 || !hasNumber || !hasLetter) {
      setPasswordError("Password must be at least 6 characters with 1 number and 1 letter");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    if (isUsernameAvailable === false) {
      setUsernameError("Username already in use");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Verify Email page with email as query parameter
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setError(error.message || "Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('src/assets/auth-bg.jpg')" }}>
      <div className="w-full max-w-md bg-[#151616af] p-8 rounded-lg shadow-lg mx-4 mt-29 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* <div className="flex items-center justify-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-white lg:text-lg">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-white">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-white"
              required
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <FaTimes className="mr-1" /> {usernameError}
              </p>
            )}
            {isUsernameAvailable === true && (
              <p className="text-green-500 text-sm mt-1 flex items-center">
                <FaCheck className="mr-1" /> Username is available
              </p>
            )}
            {isUsernameAvailable === false && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <FaTimes className="mr-1" /> Username already in use
              </p>
            )}
          </div>
          <div>
            <label className="block text-base font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg text-white"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <FaTimes className="mr-1" /> {passwordError}
              </p>
            )}
            {!passwordError && password.length > 0 && (
              <p className="text-green-500 text-sm mt-1 flex items-center">
                <FaCheck className="mr-1" /> Password is valid
              </p>
            )}
          </div>
          <div>
            <label className="block text-base font-medium text-white">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg text-white"
              required
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <FaTimes className="mr-1" /> {confirmPasswordError}
              </p>
            )}
            {!confirmPasswordError && confirmPassword.length > 0 && (
              <p className="text-green-500 text-sm mt-1 flex items-center">
                <FaCheck className="mr-1" /> Passwords match
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2 cursor-pointer"
              required
            />
            <span className="text-base text-white">
              I accept the{" "}
              <a href="/terms" className="text-red-500 hover:underline">
                terms and conditions
              </a>
            </span>
          </div>
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 cursor-pointer" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-base text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;