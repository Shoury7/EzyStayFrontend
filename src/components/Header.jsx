import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Dispatch Redux action to clear user state
    dispatch(removeUser());
    toast.success("Logout successful. Have a great day!");
    navigate("/listings");
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-lg border-b border-gray-700 sticky top-0 z-50 mb-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="/">
            <span className="text-3xl font-extrabold text-yellow-300 italic cursor-pointer hover:text-yellow-400 transition-all">
              EZYSTAY
            </span>
          </a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu on click
            className="text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href="/"
            className="hover:text-blue-400 transition text-lg px-3 py-2 rounded-md "
          >
            Home
          </a>
          <a
            href="/features"
            className="hover:text-blue-400 transition text-lg px-3 py-2 rounded-md"
          >
            Features
          </a>
          <a
            href="/contact"
            className="hover:text-blue-400 transition text-lg px-3 py-2 rounded-md"
          >
            Contact
          </a>

          {/* Show Manage Properties link only if the user is an admin */}
          {user?.role === "admin" && (
            <a
              href="/manageproperties"
              className="hover:text-blue-400 transition text-lg px-3 py-2 rounded-md"
            >
              Host a Property
            </a>
          )}
          {user?.role === "admin" && (
            <a
              href="/dashboard"
              className="hover:text-blue-400 transition text-lg px-3 py-2 rounded-md"
            >
              Dashboard
            </a>
          )}
        </nav>

        {/* Desktop Login/Logout Button */}
        <div className="hidden md:block">
          {user && user.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md text-sm font-medium transition flex items-center"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          ) : (
            <a href="/login">
              <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-sm font-medium transition">
                Login
              </button>
            </a>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 rounded-md mt-4">
          <a
            href="/"
            className="block text-white hover:text-blue-400 py-2 px-3"
          >
            Home
          </a>
          <a
            href="/features"
            className="block text-white hover:text-blue-400 py-2 px-3"
          >
            Features
          </a>
          <a
            href="/contact"
            className="block text-white hover:text-blue-400 py-2 px-3"
          >
            Contact
          </a>

          {/* Show Manage Properties link only if the user is an admin */}
          {user?.role === "admin" && (
            <a
              href="/manageproperties"
              className="block text-white hover:text-blue-400 py-2 px-3"
            >
              Host a property
            </a>
          )}
          {user?.role === "admin" && (
            <a
              href="/dashboard"
              className="block text-white hover:text-blue-400 py-2 px-3"
            >
              Dashboard
            </a>
          )}
          {/* Mobile Login/Logout Button */}
          <div className="mt-4">
            {user && user.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            ) : (
              <a href="/login">
                <button className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-sm font-medium transition">
                  Login
                </button>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
