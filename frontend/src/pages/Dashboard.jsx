import { useState } from "react";
import TopNavbar from "../components/dashboard/TopNavbar";
import Sidebar from "../components/dashboard/Sidebar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import QuickActions from "../components/dashboard/QuickActions";
import LiveTrackingCard from "../components/dashboard/LiveTrackingCard";
import UpcomingBookings from "../components/dashboard/UpcomingBookings";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 mt-20 lg:ml-24 md:ml-20 lg:mr-5 md:mr-20">
          {/* Welcome Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mb-4 sm:mb-6">
            <div className="lg:col-span-2">
              <WelcomeCard />
            </div>
            <div className="lg:col-span-1 lg:order-2">
              <StatisticsCard />
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mb-4 sm:mb-6">
            <QuickActions />
          </div>

          {/* Live Tracking and Upcoming Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <LiveTrackingCard />
            <UpcomingBookings />
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <RecentOrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login"); // Redirect to login if no token
//       return;
//     }

//     // Check token expiration
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000; // Convert to seconds

//     if (decodedToken.exp < currentTime) {
//       // Token expired, log the user out
//       localStorage.removeItem("token");
//       localStorage.removeItem("fullName");
//       localStorage.removeItem("rememberMe");
//       navigate("/login");
//     }
//   }, [navigate]);

//   const fullName = localStorage.getItem("fullName");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//         <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard, {fullName}!</h1>
//         <p className="text-gray-700">You are now logged in!</p>
//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             localStorage.removeItem("fullName");
//             localStorage.removeItem("rememberMe");
//             navigate("/login");
//           }}
//           className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700"
//         >
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
