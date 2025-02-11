import { useState } from "react";
import { FaBars, FaTimes, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative w-full h-20 flex items-center justify-between bg-white shadow-md border-b border-gray-200 z-50">
      {/* Left Section: Logo with Dark Blue Background */}
      <div className="h-full flex items-center bg-body-dark pl-30 pr-16 xxs:pl-15 xs:pl-20 clip-path-angle relative">
        {/* <div className="w-30 font-bold text-white"><img src="src\assets\logo-light.png" alt="logo"  /></div> */}
        {/* Logo Image */}
        <img
          src="src/assets/logo-light.png" // Replace with your logo path
          alt="Shiftly Logo"
          className="h-10 xs:h-13 md:h-14 lg:h-12" // Adjust height for different screen sizes
        />
        {/* Red Strip Separator */}
        <div className="absolute right-0 top-0 h-full w-3 bg-primary transform -skew-x-160 mr-6 xs:-skew-x-156 sm:mr-7 sm:-skew-x-156 md:mr-8 md:-skew-x-154 lg:mr-7 lg:-skew-x-156"></div>
      </div>

      {/* Middle Section: Page Links */}
      <div className="hidden lg2:flex space-x-8 items-center">
        <a
          href="#home"
          className="text-dark font-bold text-lg hover:text-primary transition-all relative group"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </a>
        <a
          href="#about"
          className="text-dark font-bold text-lg hover:text-primary transition-all relative group"
        >
          About Us
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </a>
        <a
          href="#services"
          className="text-dark font-bold text-lg hover:text-primary transition-all relative group"
        >
          Our Services
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </a>
        <a
          href="#price"
          className="text-dark font-bold text-lg hover:text-primary transition-all relative group"
        >
          Calculate Price
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </a>
        <a
          href="#contact"
          className="text-dark font-bold text-lg hover:text-primary transition-all relative group"
        >
          Contact Us
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </a>
      </div>

      {/* Right Section: Login/Signup Button */}
      <div className="hidden lg2:flex items-center pr-10">
        <motion.button
          whileHover={{ x: 10, backgroundColor: "#04223E" }}
          transition={{ duration: 0.3 }}
          className="flex items-center bg-primary text-white px-6 py-3 rounded-lg space-x-2 text-lg font-bold cursor-pointer"
        >
          <FaTruck className="text-xl" />
          <span>Login/Signup</span>
        </motion.button>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="lg2:hidden pr-8">
        <button onClick={toggleMenu} className="text-dark focus:outline-none">
          {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full bg-white shadow-lg lg2:hidden z-50"
        >
          <a
            href="#home"
            className="block px-6 py-3 text-dark font-bold text-lg hover:bg-accent relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a
            href="#about"
            className="block px-6 py-3 text-dark font-bold text-lg hover:bg-accent relative group"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a
            href="#services"
            className="block px-6 py-3 text-dark font-bold text-lg hover:bg-accent relative group"
          >
            Our Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a
            href="#price"
            className="block px-6 py-3 text-dark font-bold text-lg hover:bg-accent relative group"
          >
            Calculate Price
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a
            href="#contact"
            className="block px-6 py-3 text-dark font-bold text-lg hover:bg-accent relative group"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          {/* Add gap between Contact Us and the button */}
          <div className="mt-4 px-6 mb-4">
            <motion.button
              whileHover={{ x: 10, backgroundColor: "#04223E" }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center bg-primary text-white px-6 py-3 space-x-2 hover:bg-body-dark transition-all text-lg font-bold rounded-lg"
            >
              <FaTruck className="text-xl" />
              <span>Login/Signup</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}