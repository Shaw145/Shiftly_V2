import {
  FaUser,
  FaCalendar,
  FaHistory,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const ProfileDropdown = ({ userName }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("rememberMe");
    window.location.href = "/login";
  };

  return (
    <div className="absolute right-4 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
      <div className="p-4 border-b border-gray-200">
        <p className="text-sm font-semibold">Hello, {userName}</p>
      </div>
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
          <FaUser className="w-4 h-4 text-gray-700" />
          <span>My Profile</span>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
          <FaCalendar className="w-4 h-4 text-gray-700" />
          <span>My Bookings</span>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
          <FaHistory className="w-4 h-4 text-gray-700" />
          <span>Transaction History</span>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
          <FaQuestionCircle className="w-4 h-4 text-gray-700" />
          <span>Help Center</span>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
          <FaCog className="w-4 h-4 text-gray-700" />
          <span>Settings</span>
        </li>
        <li
          onClick={handleLogout}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 text-red-500"
        >
          <FaSignOutAlt className="w-4 h-4" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
