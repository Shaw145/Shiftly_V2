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

const AppWrapper = () => {
  const location = useLocation();
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/book-transport") ||
    location.pathname.startsWith("/my-bookings");

  // Check if the current route exists in our defined routes
  // const isNotFoundPage = ![
  //   "/",
  //   "/login",
  //   "/signup",
  //   "/verify-email",
  //   "/forgot-password",
  //   "/reset-password",
  //   "/dashboard",
  //   "/book-transport",
  //   "/my-bookings",
  // ].includes(location.pathname);
  const isNotFoundPage = location.pathname === "/404";

  return (
    <>
      {!isDashboardRoute && !isNotFoundPage && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-transport" element={<BookTransport />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route
            path="/my-bookings/:bookingId"
            element={<BookingDetailPage />}
          />
          {/* <Route 
            path="/new-protected-path" 
            element={
              <ProtectedRoute>
                <YourComponent />
              </ProtectedRoute>
            } 
          /> */}
        </Route>

        {/* 404 Page - This route will catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboardRoute && !isNotFoundPage && <Footer />}
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
