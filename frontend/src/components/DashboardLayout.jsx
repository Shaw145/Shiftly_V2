import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./dashboard/TopNavbar";
import Sidebar from "./dashboard/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;