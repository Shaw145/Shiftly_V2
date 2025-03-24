import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import BookTransport from "./pages/BookTransport";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import BookingDetailPage from "./pages/BookingDetailPage";
import NotFound from "./pages/NotFound";
import ConditionalRoute from "./components/ConditionalRoute";
import { isDashboardPath } from "./utils/routeUtils";

const AppWrapper = () => {
  const location = useLocation();

  // Simplified dashboard route check
  const isDashboardRoute = isDashboardPath(location.pathname);

  // Get email and token from URL for verification
  const verifyEmail = new URLSearchParams(location.search).get("email");
  const resetToken = new URLSearchParams(location.search).get("token");

  return (
    <>
      {/* Show Navbar for all routes except dashboard routes */}
      {!isDashboardRoute && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Email Verification Route */}
        <Route
          path="/verify-email"
          element={
            <ConditionalRoute
              element={<VerifyEmail />}
              condition={!!verifyEmail}
              redirectTo="/signup"
            />
          }
        />

        {/* Protected Password Reset Route */}
        <Route
          path="/reset-password"
          element={
            <ConditionalRoute
              element={<ResetPassword />}
              condition={!!resetToken}
              redirectTo="/forgot-password"
            />
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/book-transport/*" element={<BookTransport />} />
          <Route path="/my-bookings/*" element={<MyBookings />} />
          <Route
            path="/my-bookings/:bookingId"
            element={<BookingDetailPage />}
          />
        </Route>

        {/* 404 Page - This route will catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Show Footer for all routes except dashboard routes */}
      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Footer from "./components/Footer";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }
