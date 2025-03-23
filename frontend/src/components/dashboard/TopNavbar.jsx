import { useState, useEffect, useRef } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import SearchBar from "./SearchBar";
import NotificationModal from "./NotificationModal";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../../assets/Shiftly_logo.png";
import profilePic from "../../assets/profile.png";

// eslint-disable-next-line react/prop-types
const TopNavbar = ({ toggleSidebar }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Dynamic notification count
  const userName = localStorage.getItem("fullName") || "User"; // Real user name

  // Close modals when clicking outside
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Left Side: Hamburger Icon (Mobile) and Logo */}
        <div className="flex items-center space-x-6">
          <button onClick={toggleSidebar} className="md:hidden">
            <FaBars className="w-6 h-6 text-gray-700" />
          </button>
          <div className="hidden md:flex items-center space-x-10">
            <div className="w-12 h-12 flex items-center justify-center">
              <a href="/">
                <img src={logo} alt="Shiftly Logo" className="h-10" />
              </a>
            </div>
            <span className="text-lg font-semibold text-gray-500">
              Welcome, {userName}
            </span>
          </div>
        </div>

        {/* Middle: Search Bar (Visible on Small Screens) */}
        <div className="flex-1 mx-4 sm:hidden">
          <SearchBar />
        </div>

        {/* Right Side: Search Bar (Desktop), Notification, and Profile */}
        <div className="flex items-center space-x-4 md:space-x-6 mr-4">
          {/* Search Bar (Hidden on Small Screens) */}
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          {/* Notification Icon */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 rounded-full hover:bg-red-200 relative cursor-pointer"
            >
              <FaBell className="w-6 h-6 text-gray-700 cursor-pointer" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notification Modal */}
            {isNotificationOpen && (
              <NotificationModal
                onClose={() => setIsNotificationOpen(false)}
                setNotificationCount={setNotificationCount}
              />
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center focus:outline-none cursor-pointer"
            >
              <img
                src={profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-solid border-red-500"
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <ProfileDropdown
                userName={userName}
                onClose={() => setIsProfileOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
