import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    // Check token expiration
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decodedToken.exp < currentTime) {
      // Token expired, log the user out
      localStorage.removeItem("token");
      localStorage.removeItem("fullName");
      localStorage.removeItem("rememberMe");
      navigate("/login");
    }
  }, [navigate]);

  const fullName = localStorage.getItem("fullName");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard, {fullName}!</h1>
        <p className="text-gray-700">You are now logged in!</p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("fullName");
            localStorage.removeItem("rememberMe");
            navigate("/login");
          }}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;